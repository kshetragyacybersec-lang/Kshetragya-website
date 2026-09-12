# Kshetragya Cybersec — Website

Marketing website for Kshetragya Cybersec, built with React 19 + Vite, with a
small custom CMS (blog + case studies) backed by Vercel Postgres and Vercel
Blob, deployed on Vercel.

## Stack

- **Frontend:** React 19, React Router 7, Vite, `motion` (Framer Motion)
- **Backend:** Vercel serverless functions (`/api`), `@vercel/postgres`, `@vercel/blob`
- **Auth:** JWT session cookie + CSRF double-submit cookie, bcrypt password hashing
- **SEO:** `scripts/prerender.js` bakes per-page meta tags and JSON-LD into `dist/` after build

## Getting started

\`\`\`bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
\`\`\`

## Environment variables

Copy `.env.example` to `.env.local` for local development, or set these in
your Vercel Project Settings for deployment:

| Variable | Purpose |
|---|---|
| `ADMIN_JWT_SECRET` | Signs admin session tokens. Generate with `openssl rand -hex 32`. |
| `POSTGRES_URL` | Vercel Postgres connection string. Required for blog & case studies. |
| `POSTGRES_PRISMA_URL` | Pooled connection string (set by Vercel Postgres integration). |
| `POSTGRES_URL_NON_POOLING` | Direct connection string (set by Vercel Postgres integration). |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token. Required for image uploads in the admin panel. |

## Admin panel

The admin panel lives at `/admin` and lets you create/edit/publish blog posts
and case studies without touching code.

**One-time setup** (after configuring the env vars above):

\`\`\`bash
node scripts/setup-db.js                                    # creates tables
node scripts/add-admin-user.js "Full Name" "email@x.com" "password"   # creates your first admin account
\`\`\`

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build, then runs `scripts/prerender.js` to generate static, SEO-friendly HTML for service pages and other key routes
- `npm run lint` — run Oxlint
- `npm run preview` — preview the production build locally
