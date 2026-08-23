import { getSessionFromRequest } from '../../lib/auth.js';
import { noStore } from '../../lib/db.js';

export default function handler(req, res) {
  noStore(res);
  const session = getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.status(200).json({ user: session });
}
