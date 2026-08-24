import { put } from '@vercel/blob';
import { requireAuth } from '../lib/auth.js';
import { noStore } from '../lib/db.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export default async function handler(req, res) {
  noStore(res);
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const session = requireAuth(req, res);
  if (!session) return;

  const filename = req.headers['x-filename'] || 'upload';
  const contentType = req.headers['content-type'] || '';

  if (!ALLOWED_TYPES.includes(contentType)) {
    res.status(400).json({ error: 'Only JPG, PNG, WEBP, or GIF images are allowed' });
    return;
  }

  const chunks = [];
  let totalBytes = 0;
  let tooLarge = false;

  await new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BYTES) {
        tooLarge = true;
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', resolve);
    req.on('error', reject);
  }).catch(() => {});

  if (tooLarge) {
    res.status(413).json({ error: 'Image must be under 8 MB' });
    return;
  }

  const buffer = Buffer.concat(chunks);
  const safeName = `${Date.now()}-${filename}`.replace(/[^a-zA-Z0-9.\-_]/g, '_');

  try {
    const blob = await put(safeName, buffer, {
      access: 'public',
      contentType,
    });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed. Image storage may not be set up yet.' });
  }
}
