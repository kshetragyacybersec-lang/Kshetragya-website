// Best-effort in-memory rate limiter. Serverless functions can spin up
// fresh instances at any time (cold starts reset this Map), so this is
// not a hard guarantee — but it stops the common case of a single warm
// instance being hammered with rapid-fire requests, at zero infra cost.
// For a hard guarantee across all instances, this would need a shared
// store like Redis/Vercel KV.

const buckets = new Map();

/**
 * @param {string} key - unique key per caller, e.g. `upload:${userId}`
 * @param {number} max - max requests allowed within the window
 * @param {number} windowMs - window size in milliseconds
 * @returns {boolean} true if the request is allowed, false if rate-limited
 */
export function checkRateLimit(key, max, windowMs) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    buckets.set(key, { windowStart: now, count: 1 });
    return true;
  }

  if (entry.count >= max) {
    return false;
  }

  entry.count += 1;
  return true;
}
