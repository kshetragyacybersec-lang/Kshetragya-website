// Adds an admin account (or resets its password if the email already
// exists). Run locally with:
//   node scripts/add-admin-user.js "Full Name" "email@example.com" "a-strong-password"
// Requires the database connection env vars — see setup-db.js.
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

async function main() {
  const [name, email, password] = process.argv.slice(2);
  if (!name || !email || !password) {
    console.error(
      'Usage: node scripts/add-admin-user.js "Full Name" "email@example.com" "password"'
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const hash = await bcrypt.hash(password, 12);

  await sql`
    INSERT INTO admin_users (name, email, password_hash)
    VALUES (${name}, ${normalizedEmail}, ${hash})
    ON CONFLICT (email)
    DO UPDATE SET password_hash = ${hash}, name = ${name}, failed_attempts = 0, locked_until = NULL
  `;

  console.log(`Account ready for ${normalizedEmail}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
