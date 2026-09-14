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

const { serviceGroups, seedCaseStudies } = await import(path.join(root, 'src/data.js'));

const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Runs html.replace(regex, replacement) but throws loudly if the regex didn't match
// anything in the template, instead of silently no-op-ing (which would otherwise ship
// every service page with the homepage's default meta tags with no warning).
function safeReplace(html, regex, replacement, label) {
  if (!regex.test(html)) {
    throw new Error(
      `prerender.js: expected to find and replace "${label}" in dist/index.html, but the pattern ${regex} did not match. ` +
        `index.html's markup may have changed in a way that broke this substitution.`
    );
  }
  return html.replace(regex, replacement);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Applies title/description/canonical/OG/Twitter meta tags shared by every prerendered
// page. Callers pass the fully-formed title/description/pageUrl for their page type
// (service page, About page, etc.) and optionally append their own JSON-LD afterward.
function applyCommonMeta(html, { title, description, pageUrl }) {

  html = safeReplace(html, /<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`, 'title');

  html = safeReplace(
    html,
    /<meta name="description" content=".*?"\/>/s,
    `<meta name="description" content="${escapeHtml(description)}"/>`,
    'meta description'
  );

  html = safeReplace(
    html,
    /<meta property="og:title" content=".*?"\/>/s,
    `<meta property="og:title" content="${escapeHtml(title)}"/>`,
    'og:title'
  );
  html = safeReplace(
    html,
    /<meta property="og:description" content=".*?"\/>/s,
    `<meta property="og:description" content="${escapeHtml(description)}"/>`,
    'og:description'
  );
  html = safeReplace(
    html,
    /<meta property="og:url" content=".*?"\/>/s,
    `<meta property="og:url" content="${pageUrl}"/>`,
    'og:url'
  );

  html = safeReplace(
    html,
    /<meta name="twitter:title" content=".*?"\/>/s,
    `<meta name="twitter:title" content="${escapeHtml(title)}"/>`,
    'twitter:title'
  );
  html = safeReplace(
    html,
    /<meta name="twitter:description" content=".*?"\/>/s,
    `<meta name="twitter:description" content="${escapeHtml(description)}"/>`,
    'twitter:description'
  );

  // canonical — the template already carries a self-canonical for "/",
  // so replace it with the per-page URL rather than appending a second tag.
  html = safeReplace(
    html,
    /<link rel="canonical" href=".*?"\/>/s,
    `<link rel="canonical" href="${pageUrl}"/>`,
    'canonical link'
  );

  return html;
}

function buildServicePageHtml(service, group) {
  const title = `${service.name} in Gujarat & India | Kshetragya Cybersec`;
  const description = service.short;
  const pageUrl = `${siteUrl}/services/${service.id}`;

  let html = applyCommonMeta(template, { title, description, pageUrl });

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

function buildAboutPageHtml() {
  const title = 'About Us | Kshetragya Cybersec';
  const description =
    'Kshetragya Cybersec is run by three partners who handle every engagement themselves, ' +
    'from scoping to the final report. Based in Ahmedabad, working across Gujarat and India.';
  const pageUrl = `${siteUrl}/about`;

  let html = applyCommonMeta(template, { title, description, pageUrl });

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description,
    url: pageUrl,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Kshetragya Cybersec',
      url: siteUrl,
      areaServed: [
        { '@type': 'State', name: 'Gujarat' },
        { '@type': 'Country', name: 'India' },
      ],
    },
  };
  const aboutJsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(aboutJsonLd, null, 2)}\n</script>`;
  html = html.replace('</head>', `  ${aboutJsonLdTag}\n</head>`);
  return html;
}

function buildCareersPageHtml() {
  const title = 'Careers | Kshetragya Cybersec';
  const description =
    'Work directly on live enterprise network infrastructure, firewall deployments, and offensive security testing across Gujarat and India.';
  const pageUrl = `${siteUrl}/careers`;

  let html = applyCommonMeta(template, { title, description, pageUrl });

  const careersJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: pageUrl,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Kshetragya Cybersec',
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    },
  };
  const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(careersJsonLd, null, 2)}\n</script>`;
  html = html.replace('</head>', `  ${jsonLdTag}\n</head>`);
  return html;
}

function buildBlogPageHtml() {
  const title = 'Blog | Kshetragya Cybersec';
  const description =
    'Practical notes, network architecture guides, and cybersecurity analysis written by our founding engineers.';
  const pageUrl = `${siteUrl}/blog`;

  let html = applyCommonMeta(template, { title, description, pageUrl });

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: title,
    description,
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Kshetragya Cybersec',
      url: siteUrl,
    },
  };
  const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(blogJsonLd, null, 2)}\n</script>`;
  html = html.replace('</head>', `  ${jsonLdTag}\n</head>`);
  return html;
}

function buildCaseStudiesPageHtml() {
  const title = 'Case Studies | Kshetragya Cybersec';
  const description =
    'Summaries of network deployments, firewall configurations, and penetration testing projects across Gujarat and India.';
  const pageUrl = `${siteUrl}/case-studies`;

  let html = applyCommonMeta(template, { title, description, pageUrl });

  const csJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: pageUrl,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Kshetragya Cybersec',
      url: siteUrl,
    },
  };
  const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(csJsonLd, null, 2)}\n</script>`;
  html = html.replace('</head>', `  ${jsonLdTag}\n</head>`);
  return html;
}

let count = 0;
const seenIds = new Set();
for (const group of serviceGroups) {
  for (const service of group.services) {
    if (seenIds.has(service.id)) {
      throw new Error(
        `prerender.js: duplicate service id "${service.id}" found across serviceGroups in src/data.js. ` +
          `Two services would overwrite the same dist/services/${service.id}/index.html.`
      );
    }
    seenIds.add(service.id);

    const outDir = path.join(distDir, 'services', service.id);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, 'index.html'), buildServicePageHtml(service, group), 'utf-8');
    count++;
  }
}

function buildSimpleLegalPageHtml({ title, description, slug }) {
  const pageUrl = `${siteUrl}/${slug}`;
  let html = applyCommonMeta(template, { title, description, pageUrl });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: pageUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Kshetragya Cybersec',
      url: siteUrl,
    },
  };
  const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;
  html = html.replace('</head>', `  ${jsonLdTag}\n</head>`);
  return html;
}

// Prerender static standalone pages
const staticPages = [
  { dir: 'about', html: buildAboutPageHtml() },
  { dir: 'careers', html: buildCareersPageHtml() },
  { dir: 'blog', html: buildBlogPageHtml() },
  { dir: 'case-studies', html: buildCaseStudiesPageHtml() },
  { dir: 'privacy-policy', html: buildSimpleLegalPageHtml({
      title: 'Privacy Policy | Kshetragya Cybersec',
      description: 'How Kshetragya Cybersec collects, uses, and protects your information.',
      slug: 'privacy-policy',
    }) },
  { dir: 'terms-of-service', html: buildSimpleLegalPageHtml({
      title: 'Terms of Service | Kshetragya Cybersec',
      description: 'The terms that govern use of the Kshetragya Cybersec website and services.',
      slug: 'terms-of-service',
    }) },
  { dir: 'responsible-disclosure', html: buildSimpleLegalPageHtml({
      title: 'Responsible Disclosure | Kshetragya Cybersec',
      description: 'How to report a security vulnerability to Kshetragya Cybersec.',
      slug: 'responsible-disclosure',
    }) },
];

for (const p of staticPages) {
  const outDir = path.join(distDir, p.dir);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), p.html, 'utf-8');
}

function buildCaseStudyDetailPageHtml(cs) {
  const title = `${cs.title} | Kshetragya Cybersec Case Studies`;
  const description = cs.excerpt;
  const pageUrl = `${siteUrl}/case-studies/${cs.slug}`;

  let html = applyCommonMeta(template, { title, description, pageUrl });

  const csJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.excerpt,
    datePublished: cs.date,
    author: {
      '@type': 'Organization',
      name: 'Kshetragya Cybersec',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kshetragya Cybersec',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
  const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(csJsonLd, null, 2)}\n</script>`;
  html = html.replace('</head>', `  ${jsonLdTag}\n</head>`);
  return html;
}

let csCount = 0;
for (const cs of (seedCaseStudies || [])) {
  const outDir = path.join(distDir, 'case-studies', cs.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), buildCaseStudyDetailPageHtml(cs), 'utf-8');
  csCount++;
}

console.log(
  `Prerendered ${count} service pages, ${csCount} case studies, and ${staticPages.length} static pages with per-page meta tags and JSON-LD.`
);
