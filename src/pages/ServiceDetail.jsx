import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceGroups } from '../data.js';
import NotFound from './NotFound.jsx';
import { usePageFadeIn } from '../usePageFadeIn.js';
import { useScrollReveal } from '../useScrollReveal.js';

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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Horizontal numbered stepper for "Our Process" — click a step to switch
// the panel below it, with a progress underline that slides to match.
function ProcessStepper({ steps }) {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const isLast = active === steps.length - 1;

  return (
    <div className="svc-stepper">
      <div className="svc-stepper-rail" style={{ '--step-count': steps.length }}>
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            className={`svc-stepper-step ${i === active ? 'is-active' : ''} ${
              i < active ? 'is-done' : ''
            }`}
            onClick={() => setActive(i)}
          >
            <span className="svc-stepper-num">{i + 1}</span>
            <span className="svc-stepper-label">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="svc-stepper-panel">
        <div className="svc-stepper-panel-text">
          <div className="svc-stepper-panel-title">{step.title}</div>
          <p className="svc-stepper-panel-desc">{step.desc}</p>
        </div>
        <button
          type="button"
          className="svc-stepper-next"
          onClick={() => setActive(isLast ? 0 : active + 1)}
        >
          <span className="svc-stepper-next-label">
            {isLast ? 'Restart' : 'Next Step'}
          </span>
          <span className="svc-stepper-next-title">
            {isLast ? steps[0].title : steps[active + 1].title}
          </span>
        </button>
      </div>
    </div>
  );
}

// Accordion FAQ list — first item open by default, click a row to toggle it.
function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="svc-faq-accordion">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className={`svc-faq-row ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="svc-faq-row-head"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="svc-faq-row-icon" aria-hidden="true">
                ?
              </span>
              <span className="svc-faq-row-q">{item.q}</span>
              <span className="svc-faq-row-toggle" aria-hidden="true">
                {isOpen ? '\u2212' : '+'}
              </span>
            </button>
            {isOpen && <div className="svc-faq-row-a">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

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

  // Fade/slide-in reveal for benefit cards and why-us cells as they scroll into view,
  // matching the same effect used on the homepage Services/Areas/Process sections.
  const benefitsRef = useScrollReveal('.svc-benefit-card');
  const whyUsRef = useScrollReveal('.svc-whyus-cell');

  if (!match) {
    return <NotFound />;
  }

  const { group, service } = match;

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">{group.name}</div>
      <h1 className="sec-h dark svc-detail-title">{service.name}</h1>
      <p className="svc-detail-full">{service.full}</p>

      {service.deliverables && service.deliverables.length > 0 && (
        <div className="svc-detail-deliv">
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
          <ProcessStepper steps={service.process} />
        </div>
      )}

      {service.benefits && service.benefits.length > 0 && (
        <div className="svc-detail-section" id="benefits">
          <h2 className="svc-detail-section-h">Benefits</h2>
          <div className="svc-benefit-grid" ref={benefitsRef}>
            {service.benefits.map((b, i) => (
              <div
                key={b.title}
                className="svc-benefit-card"
                style={{ '--stagger': `${i * 60}ms` }}
              >
                <span className="svc-benefit-icon">
                  <IconCheck />
                </span>
                <div className="svc-benefit-title">{b.title}</div>
                <div className="svc-benefit-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.whyUs && service.whyUs.length > 0 && (
        <div className="svc-detail-section" id="why-us">
          <h2 className="svc-detail-section-h">Why Choose Us</h2>
          <div className="svc-whyus-grid" ref={whyUsRef}>
            {service.whyUs.map((w, i) => (
              <div
                key={w.title}
                className="svc-whyus-cell"
                style={{ '--stagger': `${i * 60}ms` }}
              >
                <span className="svc-whyus-icon">
                  <IconShield />
                </span>
                <div className="svc-whyus-title">{w.title}</div>
                <div className="svc-whyus-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.faq && service.faq.length > 0 && (
        <div className="svc-detail-section" id="quick-answer">
          <div className="svc-qa-split">
            <div className="svc-qa-left">
              <h2 className="svc-qa-heading">Quick Answer</h2>
              {service.quickAnswer && (
                <p className="svc-qa-text">{service.quickAnswer}</p>
              )}
            </div>
            <div className="svc-qa-right">
              <FaqAccordion items={service.faq} />
            </div>
          </div>
        </div>
      )}

      {service.related && service.related.length > 0 && (
        <div className="svc-detail-section" id="related">
          <h2 className="svc-detail-section-h">Explore Next</h2>
          <div className="svc-related-col">
            <div className="svc-related-col-h">Related Services</div>
            {service.related.map((relId) => {
              const relMatch = findService(relId);
              if (!relMatch) return null;
              return (
                <Link key={relId} to={`/services/${relId}`} className="svc-related-link">
                  {relMatch.service.name}
                  <IconChevron />
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
