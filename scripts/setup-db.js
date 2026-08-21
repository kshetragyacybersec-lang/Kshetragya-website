// One-time setup script — creates the tables the admin panel needs.
// Run locally with: node scripts/setup-db.js
// Requires POSTGRES_URL (or the Vercel-provided equivalent) to be set in
// your environment — pull it with `vercel env pull` first, or paste it
// into a local .env file (never commit that file).
import { sql } from '@vercel/postgres';

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      failed_attempts INT DEFAULT 0,
      locked_until TIMESTAMPTZ,
      last_login TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT DEFAULT '',
      cover TEXT DEFAULT '',
      body TEXT NOT NULL,
      date DATE NOT NULL,
      published BOOLEAN DEFAULT true,
      author_id INT REFERENCES admin_users(id),
      author_name TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS case_studies (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      client TEXT DEFAULT '',
      excerpt TEXT DEFAULT '',
      cover TEXT DEFAULT '',
      body TEXT NOT NULL,
      date DATE NOT NULL,
      published BOOLEAN DEFAULT true,
      author_id INT REFERENCES admin_users(id),
      author_name TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log('Tables created successfully.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
