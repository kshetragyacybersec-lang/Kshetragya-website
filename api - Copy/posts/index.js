import { sql } from '../../lib/db.js';
import { requireAuth, getSessionFromRequest } from '../../lib/auth.js';

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Public: only published posts, unless a valid admin session asks for all.
    const session = getSessionFromRequest(req);
    const includeDrafts = Boolean(session) && req.query.all === '1';

    const { rows } = includeDrafts
      ? await sql`SELECT * FROM blog_posts ORDER BY date DESC, created_at DESC`
      : await sql`SELECT * FROM blog_posts WHERE published = true ORDER BY date DESC, created_at DESC`;

    res.status(200).json({ posts: rows });
    return;
  }

  if (req.method === 'POST') {
    const session = requireAuth(req, res);
    if (!session) return;

    const { title, excerpt, cover, body, date, published } = req.body || {};
    if (!title || !body) {
      res.status(400).json({ error: 'Title and body are required' });
      return;
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let suffix = 1;
    // Ensure slug uniqueness so two posts never collide on the same URL.
    while (true) {
      const { rows } = await sql`SELECT id FROM blog_posts WHERE slug = ${slug}`;
      if (rows.length === 0) break;
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }

    const { rows } = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, cover, body, date, published, author_id, author_name)
      VALUES (${title}, ${slug}, ${excerpt || ''}, ${cover || ''}, ${body}, ${date || new Date().toISOString().slice(0, 10)}, ${published !== false}, ${session.id}, ${session.name})
      RETURNING *
    `;
    res.status(201).json({ post: rows[0] });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
