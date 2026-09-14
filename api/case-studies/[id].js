import { sql, noStore } from '../../lib/db.js';
import { requireAuth, getSessionFromRequest } from '../../lib/auth.js';

export default async function handler(req, res) {
  noStore(res);
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const isNumeric = /^\d+$/.test(id);
      const { rows } = isNumeric
        ? await sql`SELECT * FROM case_studies WHERE id = ${id}`
        : await sql`SELECT * FROM case_studies WHERE slug = ${id}`;

      const cs = rows[0];
      if (cs) {
        if (!cs.published) {
          const session = await getSessionFromRequest(req);
          if (!session) {
            res.status(404).json({ error: 'Not found' });
            return;
          }
        }
        res.status(200).json({ caseStudy: cs });
        return;
      }
    } catch (err) {
      console.warn('Postgres query failed, falling back to seed case study:', err?.message || err);
    }

    const { seedCaseStudies } = await import('../../src/data.js');
    const cs = seedCaseStudies.find((c) => String(c.id) === String(id) || c.slug === id);
    if (!cs) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.status(200).json({ caseStudy: cs });
    return;
  }

  if (req.method === 'PUT') {
    const session = await requireAuth(req, res);
    if (!session) return;

    const { title, client, excerpt, cover, body, date, published } = req.body || {};
    const { rows } = await sql`
      UPDATE case_studies
      SET title = COALESCE(${title}, title),
          client = COALESCE(${client}, client),
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
    res.status(200).json({ caseStudy: rows[0] });
    return;
  }

  if (req.method === 'DELETE') {
    const session = await requireAuth(req, res);
    if (!session) return;

    await sql`DELETE FROM case_studies WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
