// Generates a real static HTML file per service route (dist/services/<slug>/index.html)
// with correct title, meta description, canonical URL, Open Graph / Twitter tags, and a
// per-page Service JSON-LD block already baked into the raw HTML — before any JavaScript
// runs. This runs after `vite build`, using dist/index.html as the base template.
//
// The React app still loads on top and takes over for interactivity once the page opens,
// exactly as it does today for a normal SPA navigation.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const siteUrl = 'https://www.kshetragyacybersec.com';

const { serviceGroups } = await import(path.join(root, 'src/data.js'));

const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function buildPageHtml(service, group) {
  const title = `${service.name} in Gujarat & India | Kshetragya Cybersec`;
  const description = service.short;
  const pageUrl = `${siteUrl}/services/${service.id}`;

  let html = template;

  // <title>
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);

  // meta description
  html = html.replace(
    /<meta name="description" content=".*?"\/>/s,
    `<meta name="description" content="${escapeHtml(description)}"/>`
  );

  // og:title / og:description / og:url
  html = html.replace(
    /<meta property="og:title" content=".*?"\/>/s,
    `<meta property="og:title" content="${escapeHtml(title)}"/>`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?"\/>/s,
    `<meta property="og:description" content="${escapeHtml(description)}"/>`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?"\/>/s,
    `<meta property="og:url" content="${pageUrl}"/>`
  );

  // twitter:title / twitter:description
  html = html.replace(
    /<meta name="twitter:title" content=".*?"\/>/s,
    `<meta name="twitter:title" content="${escapeHtml(title)}"/>`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?"\/>/s,
    `<meta name="twitter:description" content="${escapeHtml(description)}"/>`
  );

  // canonical — the template already carries a self-canonical for "/",
  // so replace it with the per-page URL rather than appending a second tag.
  html = html.replace(
    /<link rel="canonical" href=".*?"\/>/s,
    `<link rel="canonical" href="${pageUrl}"/>`
  );

  // per-page Service JSON-LD, added alongside the existing LocalBusiness block
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.full || service.short,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Kshetragya Cybersec',
      url: siteUrl,
    },
    areaServed: [
      { '@type': 'State', name: 'Gujarat' },
      { '@type': 'Country', name: 'India' },
    ],
    url: pageUrl,
    category: group.name,
  };
  const serviceJsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(serviceJsonLd, null, 2)}\n</script>`;
  html = html.replace('</head>', `  ${serviceJsonLdTag}\n</head>`);

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let count = 0;
for (const group of serviceGroups) {
  for (const service of group.services) {
    const outDir = path.join(distDir, 'services', service.id);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, 'index.html'), buildPageHtml(service, group), 'utf-8');
    count++;
  }
}

console.log(`Prerendered ${count} service pages with per-page meta tags and JSON-LD.`);
