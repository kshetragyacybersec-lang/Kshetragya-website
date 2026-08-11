// Generates a real static HTML file per service route (dist/services/<slug>/index.html)
// with correct title, meta description, canonical URL, Open Graph / Twitter tags, and a
// per-page Service JSON-LD block already baked into the raw HTML — before any JavaScript
// runs. This runs after `vite build`, using dist/index.html as the base template.
//
// The React app still loads on top and takes over for interactivity once the page opens,
// exactly as it does today for a normal SPA navigation.
//
// The actual HTML-templating logic lives in ./prerenderHtml.js so it can be unit-tested
// (scripts/prerenderHtml.test.js) without needing a real Vite build on disk.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { buildPageHtml } from './prerenderHtml.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const siteUrl = 'https://www.kshetragyacybersec.com';

const { serviceGroups } = await import(path.join(root, 'src/data.js'));

const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

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
    writeFileSync(
      path.join(outDir, 'index.html'),
      buildPageHtml(template, service, group, siteUrl),
      'utf-8'
    );
    count++;
  }
}

console.log(`Prerendered ${count} service pages with per-page meta tags and JSON-LD.`);
