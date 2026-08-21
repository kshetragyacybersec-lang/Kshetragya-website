import bcrypt from 'bcryptjs';
import { sql } from '../../lib/db.js';
import { signSession, setSessionCookie } from '../../lib/auth.js';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  const { rows } = await sql`
    SELECT id, name, email, password_hash, failed_attempts, locked_until
    FROM admin_users
    WHERE email = ${normalizedEmail}
  `;
  const user = rows[0];

  // Same generic error whether the email doesn't exist or the password is
  // wrong, so an attacker can't use this to discover valid HR emails.
  const genericError = () =>
    res.status(401).json({ error: 'Invalid email or password' });

  if (!user) {
    genericError();
    return;
  }

  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    res.status(423).json({
      error: `Too many failed attempts. Try again in a few minutes.`,
    });
    return;
  }

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    const attempts = (user.failed_attempts || 0) + 1;
    if (attempts >= MAX_ATTEMPTS) {
      await sql`
        UPDATE admin_users
        SET failed_attempts = 0,
            locked_until = NOW() + make_interval(mins => ${LOCKOUT_MINUTES})
        WHERE id = ${user.id}
      `;
    } else {
      await sql`
        UPDATE admin_users SET failed_attempts = ${attempts} WHERE id = ${user.id}
      `;
    }
    genericError();
    return;
  }

  await sql`
    UPDATE admin_users
    SET failed_attempts = 0, locked_until = NULL, last_login = NOW()
    WHERE id = ${user.id}
  `;

  const token = signSession(user);
  setSessionCookie(res, token);
  res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email },
  });
}
