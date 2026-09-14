// The login response sets a non-HttpOnly `admin_csrf` cookie (unlike the
// session cookie, this one is readable by JS on purpose) so the admin
// panel can echo its value back as a request header on every write. The
// server (lib/auth.js) checks that the header matches the cookie before
// allowing POST/PUT/DELETE: a cross-site page can make the browser send
// the cookie automatically, but same-origin policy stops it from reading
// the cookie's value to also set the matching header, so forged
// cross-site requests are rejected.

function readCsrfCookie() {
  const match = document.cookie.match(/(?:^|;\s*)admin_csrf=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// Drop-in replacement for fetch() for admin panel requests. Adds the CSRF
// header automatically for state-changing methods; GET/HEAD/OPTIONS pass
// through untouched.
export function csrfFetch(url, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const isStateChanging = !['GET', 'HEAD', 'OPTIONS'].includes(method);
  const token = isStateChanging ? readCsrfCookie() : null;

  if (!token) {
    return fetch(url, options);
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-csrf-token': token,
    },
  });
}
