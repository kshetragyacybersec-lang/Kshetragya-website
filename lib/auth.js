import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { sql } from './db.js';

const COOKIE_NAME = 'admin_session';
const CSRF_COOKIE_NAME = 'admin_csrf';
const CSRF_HEADER_NAME = 'x-csrf-token';
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET environment variable is not set');
  }
  return secret;
}

// tokenVersion is stamped into the JWT and re-checked against the database
// on every authenticated request. Bumping admin_users.token_version (e.g.
// via a script, or automatically on password reset) instantly invalidates
// every JWT already issued for that user, even ones that haven't expired
// yet — this is what lets a compromised session be revoked remotely instead
// of just waiting out the 8 hour expiry.
export function signSession(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      tokenVersion: user.token_version || 0,
    },
    getSecret(),
    { expiresIn: SESSION_DURATION_SECONDS }
  );
}

function verifyJwt(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    out[key] = decodeURIComponent(value);
  }
  return out;
}

// Verifies the JWT's signature/expiry, then confirms its tokenVersion still
// matches what's in the database, so a revoked session (e.g. after a forced
// logout or password reset) stops working immediately instead of staying
// valid until it expires on its own.
export async function getSessionFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[COOKIE_NAME];
  if (!token) return null;

  const payload = verifyJwt(token);
  if (!payload) return null;

  const { rows } = await sql`
    SELECT token_version FROM admin_users WHERE id = ${payload.id}
  `;
  const currentVersion = rows[0]?.token_version || 0;
  if (currentVersion !== (payload.tokenVersion || 0)) return null;

  return payload;
}

export function setSessionCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    `Max-Age=${SESSION_DURATION_SECONDS}`,
    'SameSite=Strict',
  ];
  if (isProd) parts.push('Secure');
  return parts.join('; ');
}

export function clearSessionCookie() {
  const isProd = process.env.NODE_ENV === 'production';
  const parts = [`${COOKIE_NAME}=`, 'Path=/', 'HttpOnly', 'Max-Age=0', 'SameSite=Strict'];
  if (isProd) parts.push('Secure');
  return parts.join('; ');
}

// --- CSRF (double-submit cookie) ---------------------------------------
// On login we set a random token in a *non*-HttpOnly cookie so the admin
// frontend's JS can read it and echo it back as a header on every
// state-changing request. A cross-site page can make the browser send the
// cookie automatically, but it cannot read the cookie's value to also set
// the matching header (blocked by same-origin policy) — so forged
// cross-site requests fail this check even though SameSite=Strict already
// blocks most of them on its own. Belt and suspenders.

export function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function setCsrfCookie(csrfToken) {
  const isProd = process.env.NODE_ENV === 'production';
  const parts = [
    `${CSRF_COOKIE_NAME}=${csrfToken}`,
    'Path=/',
    `Max-Age=${SESSION_DURATION_SECONDS}`,
    'SameSite=Strict',
  ];
  if (isProd) parts.push('Secure');
  return parts.join('; ');
}

export function clearCsrfCookie() {
  const isProd = process.env.NODE_ENV === 'production';
  const parts = [`${CSRF_COOKIE_NAME}=`, 'Path=/', 'Max-Age=0', 'SameSite=Strict'];
  if (isProd) parts.push('Secure');
  return parts.join('; ');
}

// Combines the session cookie + CSRF cookie into a single Set-Cookie
// response header set (Node/Vercel functions support multiple Set-Cookie
// values as an array).
export function setAuthCookies(res, token, csrfToken) {
  res.setHeader('Set-Cookie', [setSessionCookie(token), setCsrfCookie(csrfToken)]);
}

export function clearAuthCookies(res) {
  res.setHeader('Set-Cookie', [clearSessionCookie(), clearCsrfCookie()]);
}

function verifyCsrf(req) {
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies[CSRF_COOKIE_NAME];
  const headerToken = req.headers[CSRF_HEADER_NAME];
  if (!cookieToken || !headerToken) return false;
  if (cookieToken.length !== headerToken.length) return false;
  return crypto.timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken));
}

// Call at the top of any protected API route that changes data. Returns
// the session or writes a 401/403 and returns null. Checks CSRF for
// state-changing methods (anything other than GET/HEAD/OPTIONS).
export async function requireAuth(req, res) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return null;
  }

  const method = (req.method || 'GET').toUpperCase();
  const isStateChanging = !['GET', 'HEAD', 'OPTIONS'].includes(method);
  if (isStateChanging && !verifyCsrf(req)) {
    res.status(403).json({ error: 'Invalid or missing CSRF token' });
    return null;
  }

  return session;
}
