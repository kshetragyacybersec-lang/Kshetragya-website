import { sql } from '../../lib/db.js';
import { requireAuth, getSessionFromRequest } from '../../lib/auth.js';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Accept either a numeric id (admin editing) or a slug (public page).
    const isNumeric = /^\d+$/.test(id);
    const { rows } = isNumeric
      ? await sql`SELECT * FROM blog_posts WHERE id = ${id}`
      : await sql`SELECT * FROM blog_posts WHERE slug = ${id}`;

    const post = rows[0];
    if (!post) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    if (!post.published) {
      const session = getSessionFromRequest(req);
      if (!session) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
    }
    res.status(200).json({ post });
    return;
  }

  if (req.method === 'PUT') {
    const session = requireAuth(req, res);
    if (!session) return;

    const { title, excerpt, cover, body, date, published } = req.body || {};
    const { rows } = await sql`
      UPDATE blog_posts
      SET title = COALESCE(${title}, title),
          excerpt = COALESCE(${excerpt}, excerpt),
          cover = COALESCE(${cover}, cover),
          body = COALESCE(${body}, body),
          date = COALESCE(${date}, date),
          published = COALESCE(${published}, published),
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    if (rows.length === 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.status(200).json({ post: rows[0] });
    return;
  }

  if (req.method === 'DELETE') {
    const session = requireAuth(req, res);
    if (!session) return;

    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
