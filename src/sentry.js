import * as Sentry from '@sentry/react';

// Error monitoring: catches JS errors in production (e.g. a component
// crashing, the contact-form fetch throwing) that would otherwise only be
// noticed if a user happened to email us about it.
//
// This is a safe no-op until VITE_SENTRY_DSN is set — nothing is sent to
// Sentry, and no third-party network requests are made, unless the site
// owner has:
//   1. Created a free project at https://sentry.io
//   2. Added VITE_SENTRY_DSN=<your dsn> as an environment variable in
//      Vercel (Project Settings → Environment Variables) and locally in a
//      .env file (not committed — see .gitignore).
const dsn = import.meta.env.VITE_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    // Keep this low; it only affects performance-trace sampling, not error
    // capture — errors are always captured regardless of this value.
    tracesSampleRate: 0.1,
  });
}
