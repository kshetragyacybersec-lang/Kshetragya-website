// Vercel serverless function: /api/contact
//
// The contact form on the site posts here instead of directly to FormSubmit.
// This function:
//   1. Verifies the Cloudflare Turnstile token server-side. This is the part
//      that actually stops bots — a widget that only runs in the browser can
//      be skipped entirely by anyone who posts straight to an endpoint, so
//      the token must be checked here, not just rendered on the page.
//   2. Rejects anything with the honeypot field filled in.
//   3. Forwards genuine submissions to FormSubmit (which continues to do the
//      actual emailing), with _captcha disabled there since we've already
//      done real verification here.
//
// Setup required (safe no-op until these are set):
//   - TURNSTILE_SECRET_KEY: from https://dash.cloudflare.com/?to=/:account/turnstile
//     Add it in Vercel: Project Settings -> Environment Variables.
//   - The site key (public, safe to expose) goes in the frontend as
//     VITE_TURNSTILE_SITE_KEY, see src/components/Contact.jsx.
//
// Until TURNSTILE_SECRET_KEY is set, this function forwards submissions
// without Turnstile verification (same protection level as before) rather
// than breaking the form for site visitors.

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/info@kshetragyacybersec.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body || {};

  // Honeypot: a real visitor never sees or fills this field.
  if (body._honey) {
    // Pretend success so bots don't learn the honeypot was detected.
    return res.status(200).json({ ok: true });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  const token = body['cf-turnstile-response'];

  if (secret) {
    if (!token) {
      return res.status(400).json({ ok: false, error: 'Missing Turnstile token' });
    }

    try {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: req.headers['x-forwarded-for'],
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return res.status(400).json({ ok: false, error: 'Turnstile verification failed' });
      }
    } catch (err) {
      console.error('Turnstile verification request failed:', err);
      return res.status(502).json({ ok: false, error: 'Verification service unavailable' });
    }
  }

  // Strip internal-only fields before forwarding the actual form content.
  const { _honey, 'cf-turnstile-response': _token, ...formFields } = body;

  try {
    const forwardRes = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(formFields),
    });
    if (!forwardRes.ok) {
      throw new Error(`FormSubmit responded with ${forwardRes.status}`);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Forwarding to FormSubmit failed:', err);
    return res.status(502).json({ ok: false, error: 'Could not deliver message' });
  }
}
