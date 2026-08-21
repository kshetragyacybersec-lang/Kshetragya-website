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
    const session = getSessionFromRequest(req);
    const includeDrafts = Boolean(session) && req.query.all === '1';

    const { rows } = includeDrafts
      ? await sql`SELECT * FROM case_studies ORDER BY date DESC, created_at DESC`
      : await sql`SELECT * FROM case_studies WHERE published = true ORDER BY date DESC, created_at DESC`;

    res.status(200).json({ caseStudies: rows });
    return;
  }

  if (req.method === 'POST') {
    const session = requireAuth(req, res);
    if (!session) return;

    const { title, client, excerpt, cover, body, date, published } = req.body || {};
    if (!title || !body) {
      res.status(400).json({ error: 'Title and body are required' });
      return;
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let suffix = 1;
    while (true) {
      const { rows } = await sql`SELECT id FROM case_studies WHERE slug = ${slug}`;
      if (rows.length === 0) break;
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }

    const { rows } = await sql`
      INSERT INTO case_studies (title, slug, client, excerpt, cover, body, date, published, author_id, author_name)
      VALUES (${title}, ${slug}, ${client || ''}, ${excerpt || ''}, ${cover || ''}, ${body}, ${date || new Date().toISOString().slice(0, 10)}, ${published !== false}, ${session.id}, ${session.name})
      RETURNING *
    `;
    res.status(201).json({ caseStudy: rows[0] });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
