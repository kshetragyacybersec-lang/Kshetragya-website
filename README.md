# Kshetragya Cybersec — Website

Marketing website for Kshetragya Cybersec, built with React 19 + Vite, deployed on Vercel.

There is no database and no admin panel — everything is either static
frontend content or a plain file you edit by hand and redeploy.

## Stack

- **Frontend:** React 19, React Router 7, Vite, `motion` (Framer Motion)
- **Contact form:** one Vercel serverless function (`api/contact.js`) that
  validates the submission, rate-limits by IP, and (optionally) forwards it
  to a webhook — it does not store anything itself
- **SEO:** `scripts/prerender.js` bakes per-page meta tags and JSON-LD into
  `dist/` after build

## Getting started

```bash
npm install
npm run dev
```

## Publishing a blog post or case study

Open `src/data.js` and add an entry to the `blogPosts` or `caseStudies`
array — there's a commented example at the top of each showing the fields.
`body` accepts Markdown or raw HTML. Commit and redeploy; the new
page appears automatically at `/blog/<slug>` or `/case-studies/<slug>`.

## Environment variables

Set this in your Vercel Project Settings if you want form submissions
forwarded somewhere (Slack, email service, etc.) instead of only appearing
in the function logs:

| Variable | Purpose |
|---|---|
| `CONTACT_WEBHOOK_URL` | If set, the contact form also POSTs each submission here as JSON. |

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build, then runs `scripts/prerender.js` to generate static, SEO-friendly HTML for service pages and other key routes
- `npm run lint` — run Oxlint
- `npm run preview` — preview the production build locally
