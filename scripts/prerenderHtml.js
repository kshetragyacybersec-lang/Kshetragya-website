// Pure HTML-templating helpers used by scripts/prerender.js, split into
// their own module so they can be unit-tested (see scripts/prerenderHtml.test.js)
// without needing a real Vite build output on disk.

// Runs html.replace(regex, replacement) but throws loudly if the regex
// didn't match anything in the template. Without this, a future edit to
// index.html's markup (attribute order, missing self-closing slash, etc.)
// would make these substitutions silently no-op, and every prerendered
// service page would quietly ship with the homepage's default meta tags
// instead of failing the build.
export function safeReplace(html, regex, replacement, label) {
  if (!regex.test(html)) {
    throw new Error(
      `prerender.js: expected to find and replace "${label}" in dist/index.html, but the pattern ${regex} did not match. ` +
        `index.html's markup may have changed in a way that broke this substitution.`
    );
  }
  return html.replace(regex, replacement);
}

export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildPageHtml(template, service, group, siteUrl) {
  const title = `${service.name} in Gujarat & India | Kshetragya Cybersec`;
  const description = service.short;
  const pageUrl = `${siteUrl}/services/${service.id}`;

  let html = template;

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
