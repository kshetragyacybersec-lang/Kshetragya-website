import { getSessionFromRequest } from '../../lib/auth.js';

export default function handler(req, res) {
  const session = getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.status(200).json({ user: session });
}
