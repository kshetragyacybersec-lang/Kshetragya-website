import { sql } from '@vercel/postgres';

export { sql };

// All API responses are dynamic (change whenever content is published,
// edited, or deleted through the admin panel), so nothing here should ever
// be cached by the browser or by Vercel's edge network.
export function noStore(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
}
