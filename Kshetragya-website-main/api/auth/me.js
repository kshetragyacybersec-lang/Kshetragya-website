import { getSessionFromRequest } from '../../lib/auth.js';
import { noStore } from '../../lib/db.js';

export default async function handler(req, res) {
  noStore(res);
  const session = await getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.status(200).json({ user: session });
}
