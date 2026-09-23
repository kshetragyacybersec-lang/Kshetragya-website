// Single source of truth for page titles, descriptions and URLs.
// Used by the browser (usePageMeta.js) AND by the build step (scripts/prerender.js),
// so the text search engines read in the raw HTML always matches what the page
// shows after it loads.

export const SITE_URL = 'https://www.kshetragyacybersec.com';
export const SITE_NAME = 'Kshetragya Cybersec';

// Must match the default <title> and description in index.html.
export const HOME_META = {
  path: '/',
  title: 'Cybersecurity, Network Infrastructure & CCTV Services in Gujarat | Kshetragya Cybersec',
  description:
    'Kshetragya Cybersec provides structured network cabling, firewall configuration, CCTV surveillance, 24/7 SOC monitoring, manual VAPT, and cloud security audits. Founded and operated directly by 3 technical partners in Ahmedabad, Gujarat.',
};

export const PAGE_META = {
  about: {
    path: '/about',
    title: 'About Us | Kshetragya Cybersec',
    description:
      'Kshetragya Cybersec is run by three partners who handle every engagement themselves, ' +
      'from scoping to the final report. Based in Ahmedabad, working across Gujarat and India.',
  },
  careers: {
    path: '/careers',
    title: 'Careers | Kshetragya Cybersec',
    description:
      'Work directly on live enterprise network infrastructure, firewall deployments, and offensive security testing across Gujarat and India.',
  },
  blog: {
    path: '/blog',
    title: 'Blog | Kshetragya Cybersec',
    description:
      'Practical notes, network architecture guides, and cybersecurity analysis written by our founding engineers.',
  },
  'case-studies': {
    path: '/case-studies',
    title: 'Case Studies | Kshetragya Cybersec',
    description:
      'Summaries of network deployments, firewall configurations, and penetration testing projects across Gujarat and India.',
  },
  'privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy | Kshetragya Cybersec',
    description: 'How Kshetragya Cybersec collects, uses, and protects your information.',
  },
  'terms-of-service': {
    path: '/terms-of-service',
    title: 'Terms of Service | Kshetragya Cybersec',
    description: 'The terms that govern use of the Kshetragya Cybersec website and services.',
  },
  'responsible-disclosure': {
    path: '/responsible-disclosure',
    title: 'Responsible Disclosure | Kshetragya Cybersec',
    description: 'How to report a security vulnerability to Kshetragya Cybersec.',
  },
};

export const NOT_FOUND_META = {
  title: `404: Page Not Found | ${SITE_NAME}`,
  description: 'The page you are looking for does not exist or has been moved.',
  noindex: true,
};

export function serviceMeta(service) {
  return {
    path: `/services/${service.id}`,
    title: `${service.name} in Gujarat & India | ${SITE_NAME}`,
    description: service.short,
  };
}

// Turns stored post text (HTML or markdown) into a short plain-text description.
export function plainDescription(text, max = 155) {
  const clean = String(text || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>~|[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 60)).trim() + '…';
}
