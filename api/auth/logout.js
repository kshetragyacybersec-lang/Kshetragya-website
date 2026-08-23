import { clearSessionCookie } from '../../lib/auth.js';
import { noStore } from '../../lib/db.js';

export default function handler(req, res) {
  noStore(res);
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  clearSessionCookie(res);
  res.status(200).json({ ok: true });
}
