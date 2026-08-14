import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceGroups } from '../data.js';
import NotFound from './NotFound.jsx';
import { usePageFadeIn } from '../usePageFadeIn.js';
import { useScrollReveal } from '../useScrollReveal.js';
import { useThrottledScroll } from '../useThrottledScroll.js';

// Finds a service by its slug across all 4 groups.
function findService(slug) {
  for (const group of serviceGroups) {
    const service = group.services.find((s) => s.id === slug);
    if (service) return { group, service };
  }
  return null;
}

// Small inline icons, no external icon library needed so nothing new to install.
function IconCheck() {
  return (
    <svg className="svc-detail-card-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="svc-detail-card-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Sections that appear on the page, in order, used to build the jump-nav.
// Only rendered as an anchor link when that section actually has data.
const SECTION_DEFS = [
  { key: 'quickAnswer', id: 'quick-answer', label: 'Quick Answer' },
  { key: 'deliverables', id: 'what-you-get', label: 'What You Get' },
  { key: 'process', id: 'process', label: 'Process' },
  { key: 'benefits', id: 'benefits', label: 'Benefits' },
  { key: 'whyUs', id: 'why-us', label: 'Why Us' },
  { key: 'faq', id: 'faq', label: 'FAQ' },
  { key: 'related', id: 'related', label: 'Related' },
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const match = findService(slug);

  // Per-route document title, since index.html only sets one static title/meta
  // shared across all routes otherwise.
  useEffect(() => {
    if (!match) return;
    const prevTitle = document.title;
    document.title = `${match.service.name} in Gujarat & India | Kshetragya Cybersec`;
    return () => {
      document.title = prevTitle;
    };
  }, [match]);

  const mountFadeClass = usePageFadeIn([slug]);

  // Fade/slide-in reveal for benefit + why-us cards and FAQ rows as they scroll into view,
  // matching the same effect used on the homepage Services/Areas/Process sections.
  const benefitsRef = useScrollReveal('.svc-detail-grid-card');
  const whyUsRef = useScrollReveal('.svc-detail-grid-card');
  const faqRef = useScrollReveal('.svc-detail-faq-item');

  // Connector line down the process step numbers fills in as the list scrolls
  // through view, same effect as the homepage "Our Method" timeline.
  const processRef = useScrollReveal('.svc-detail-process-item');
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion && processRef.current) {
      processRef.current.style.setProperty('--proc-progress', 1);
    }
  }, [processRef]);
  useThrottledScroll(
    () => {
      const el = processRef.current;
      if (!el) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh * 0.85 - rect.top) / rect.height, 0), 1);
      el.style.setProperty('--proc-progress', progress);
    },
    { onResize: true }
  );

  if (!match) {
    return <NotFound />;
  }

  const { group, service } = match;

  const activeSections = SECTION_DEFS.filter((s) => {
    const val = service[s.key];
    return Array.isArray(val) ? val.length > 0 : Boolean(val);
  });

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">{group.name}</div>
      <h1 className="sec-h dark svc-detail-title">{service.name}</h1>
      <p className="svc-detail-full">{service.full}</p>

      {activeSections.length > 1 && (
        <nav className="svc-detail-jumpnav" aria-label="Sections on this page">
          {activeSections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="svc-detail-jumpnav-link">
              {s.label}
            </a>
          ))}
        </nav>
      )}

      {service.quickAnswer && (
        <div className="svc-detail-qa" id="quick-answer">
          <h2 className="svc-detail-qa-h">Quick Answer</h2>
          <p className="svc-detail-qa-p">{service.quickAnswer}</p>
        </div>
      )}

      {service.deliverables && service.deliverables.length > 0 && (
        <div className="svc-detail-deliv" id="what-you-get">
          <h2 className="svc-detail-deliv-h">What You Get</h2>
          <ul className="svc-detail-deliv-list">
            {service.deliverables.map((item) => (
              <li key={item} className="svc-detail-deliv-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.process && service.process.length > 0 && (
        <div className="svc-detail-section" id="process">
          <h2 className="svc-detail-section-h">Our Process</h2>
          <ol className="svc-detail-process-list" ref={processRef}>
            <span className="svc-detail-process-connector" aria-hidden="true">
              <span className="svc-detail-process-connector-fill"></span>
            </span>
            {service.process.map((step, i) => (
              <li key={step.title} className="svc-detail-process-item">
                <span className="svc-detail-process-num">{i + 1}</span>
                <div>
                  <div className="svc-detail-process-title">{step.title}</div>
                  <div className="svc-detail-process-desc">{step.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {service.benefits && service.benefits.length > 0 && (
        <div className="svc-detail-section" id="benefits">
          <h2 className="svc-detail-section-h">Benefits</h2>
          <div className="svc-detail-grid" ref={benefitsRef}>
            {service.benefits.map((b, i) => (
              <div
                key={b.title}
                className="svc-detail-grid-card"
                style={{ '--stagger': `${i * 60}ms` }}
              >
                <IconCheck />
                <div className="svc-detail-grid-card-title">{b.title}</div>
                <div className="svc-detail-grid-card-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.whyUs && service.whyUs.length > 0 && (
        <div className="svc-detail-section" id="why-us">
          <h2 className="svc-detail-section-h">Why Choose Us</h2>
          <div className="svc-detail-grid" ref={whyUsRef}>
            {service.whyUs.map((w, i) => (
              <div
                key={w.title}
                className="svc-detail-grid-card"
                style={{ '--stagger': `${i * 60}ms` }}
              >
                <IconShield />
                <div className="svc-detail-grid-card-title">{w.title}</div>
                <div className="svc-detail-grid-card-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.faq && service.faq.length > 0 && (
        <div className="svc-detail-section" id="faq">
          <h2 className="svc-detail-section-h">FAQ</h2>
          <div className="svc-detail-faq-list" ref={faqRef}>
            {service.faq.map((item, i) => (
              <div
                key={item.q}
                className="svc-detail-faq-item"
                style={{ '--stagger': `${i * 50}ms` }}
              >
                <div className="svc-detail-faq-q">{item.q}</div>
                <div className="svc-detail-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.related && service.related.length > 0 && (
        <div className="svc-detail-section" id="related">
          <h2 className="svc-detail-section-h">Related Services</h2>
          <div className="svc-detail-related-list">
            {service.related.map((relId) => {
              const relMatch = findService(relId);
              if (!relMatch) return null;
              return (
                <Link
                  key={relId}
                  to={`/services/${relId}`}
                  className="svc-detail-related-link"
                >
                  {relMatch.service.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <Link to="/#contact" className="svc-detail-cta">
        Request Free Assessment
      </Link>
    </div>
  );
}
