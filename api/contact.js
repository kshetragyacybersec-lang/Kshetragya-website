import { checkRateLimit } from '../lib/rateLimit.js';

function noStore(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export default async function handler(req, res) {
  noStore(res);

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Identify client IP for rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket?.remoteAddress) || 'unknown';

  if (!checkRateLimit(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    res.status(429).json({ error: 'Too many requests. Please wait a few minutes before submitting again.' });
    return;
  }

  // Parse body (handles both JSON and parsed urlencoded/multipart)
  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      // urlencoded fallback if needed
      body = Object.fromEntries(new URLSearchParams(body));
    }
  }

  // Honeypot spam trap
  if (body._honey && String(body._honey).trim().length > 0) {
    // Silently drop bot submissions
    res.status(200).json({ ok: true, message: "Request received, we'll be in touch within 24 hours on business days." });
    return;
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '';
  const company = typeof body.company === 'string' ? body.company.trim().slice(0, 120) : '';
  const country = typeof body.country === 'string' ? body.country.trim().slice(0, 100) : '';
  const service = typeof body.service === 'string' ? body.service.trim().slice(0, 150) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 3000) : '';

  if (!name || name.length < 2) {
    res.status(400).json({ error: 'Please provide a valid full name.' });
    return;
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    res.status(400).json({ error: 'Please provide a valid business email address.' });
    return;
  }

  const submission = {
    receivedAt: new Date().toISOString(),
    ip,
    name,
    email,
    company,
    country,
    service,
    message,
  };

  // Optional: forward to Webhook or Email Notification service if configured
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `*New Assessment Request*\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company || 'N/A'}\n*Service:* ${service || 'General'}\n*Message:* ${message || 'None'}`,
          ...submission,
        }),
      });
    } catch (webhookErr) {
      console.error('Contact form webhook forward failed:', webhookErr);
    }
  }

  console.log('[Contact Submission]', JSON.stringify(submission));

  res.status(200).json({
    ok: true,
    message: "Request sent, we'll be in touch within 24 hours on business days.",
  });
}
