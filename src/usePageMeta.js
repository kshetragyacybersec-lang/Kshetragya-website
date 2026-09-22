import { useEffect } from 'react';
import { SITE_URL } from './pageMeta.js';

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const JSON_LD_ID = 'page-jsonld';

/**
 * Keeps the tab title, description, canonical URL, robots and social tags in sync
 * with the page being shown. The static HTML already carries the right tags for
 * pages that were prerendered; this hook fixes them when the visitor moves between
 * pages inside the app, and for pages that are built from the database (blog posts,
 * case studies).
 *
 * Pass `null` while data is still loading. `noindex` tells search engines to skip
 * the page (404, admin, empty list pages). `jsonLd` adds page-specific structured data.
 */
export function usePageMeta(meta) {
  const { title, description, path, noindex, jsonLd } = meta || {};
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    if (!meta) return;
    if (title) {
      document.title = title;
      setMeta('property', 'og:title', title);
      setMeta('name', 'twitter:title', title);
    }
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }
    const url = path ? `${SITE_URL}${path === '/' ? '/' : path}` : '';
    setCanonical(noindex ? '' : url);
    if (url) setMeta('property', 'og:url', url);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    let script = document.getElementById(JSON_LD_ID);
    if (jsonLdText) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = JSON_LD_ID;
        document.head.appendChild(script);
      }
      script.textContent = jsonLdText;
    } else if (script) {
      script.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(meta), title, description, path, noindex, jsonLdText]);
}
