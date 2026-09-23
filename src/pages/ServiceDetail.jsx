import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { serviceGroups } from '../data.js';
import NotFound from './NotFound.jsx';
import { usePageFadeIn } from '../usePageFadeIn.js';
import { useScrollReveal } from '../useScrollReveal.js';
import { usePageMeta } from '../usePageMeta.js';
import { serviceMeta } from '../pageMeta.js';

// Finds a service by its slug across all 4 groups.
function findService(slug) {
  for (const group of serviceGroups) {
    const service = group.services.find((s) => s.id === slug);
    if (service) return { group, service };
  }
  return null;
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Horizontal numbered stepper for "Our Process"
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
      <AnimatePresence mode="wait">
        <motion.div
          key={step.title}
          className="svc-stepper-panel"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Accordion FAQ list
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
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="svc-faq-row-a"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const match = findService(slug);

  usePageMeta(match ? serviceMeta(match.service) : null);

  const mountFadeClass = usePageFadeIn([slug]);
  const benefitsRef = useScrollReveal('.svc-benefit-card');

  if (!match) {
    return <NotFound />;
  }

  const { group, service } = match;
  const faqList = service.faq || service.faqs || [];
  const relatedList = service.related || [];

  return (
    <div className={mountFadeClass}>
      {/* Service Hero Banner */}
      <section className="svc-hero">
        <div className="svc-hero-inner">
          <div className="svc-breadcrumb">
            <Link to="/">Home</Link>
            <span className="svc-breadcrumb-sep">/</span>
            <Link to="/#services">Services</Link>
            <span className="svc-breadcrumb-sep">/</span>
            <span className="svc-breadcrumb-curr">{service.name}</span>
          </div>

          <div className="svc-hero-badge-row">
            <span className="svc-hero-cat">{group.name}</span>
            <span className="svc-hero-pill">Founding Partners Direct</span>
          </div>

          <h1 className="svc-hero-title">{service.name}</h1>

          {service.short && (
            <p className="svc-hero-sub">{service.short}</p>
          )}

          {/* Standards & Methodologies Badges */}
          {service.standards && service.standards.length > 0 && (
            <div className="svc-standards-bar">
              <span className="svc-standards-lbl">STANDARDS &amp; FRAMEWORKS:</span>
              <div className="svc-standards-list">
                {service.standards.map((std) => (
                  <span key={std} className="svc-std-chip">
                    {std}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Engagement Meta Highlights */}
          <div className="svc-hero-meta-grid">
            <div className="svc-hero-meta-item">
              <span className="svc-meta-label">DEPLOYMENT REGION</span>
              <span className="svc-meta-val">On-Site Gujarat &amp; Pan-India</span>
            </div>
            <div className="svc-hero-meta-item">
              <span className="svc-meta-label">EXECUTION MODEL</span>
              <span className="svc-meta-val">3 Founding Partners Direct</span>
            </div>
            <div className="svc-hero-meta-item">
              <span className="svc-meta-label">SCOPING TURNAROUND</span>
              <span className="svc-meta-val">&lt; 24 Hours with Mutual NDA</span>
            </div>
          </div>
        </div>
      </section>

      <div className="svc-detail-body">
        {/* Section 1: Overview Narrative */}
        <section className="svc-detail-section" id="overview">
          <div className="svc-narrative-card">
            <div className="svc-narrative-header">
              <div className="eyebrow">Engineering Architecture</div>
              <h2 className="svc-narrative-title">Operational Overview &amp; Technical Approach</h2>
            </div>
            <div className="svc-narrative-content">
              <p className="svc-detail-full">{service.full}</p>
            </div>
            <div className="svc-narrative-footer">
              <div className="svc-narrative-feat">
                <span className="svc-feat-dot" />
                <span>Engineered for low latency &amp; high availability</span>
              </div>
              <div className="svc-narrative-feat">
                <span className="svc-feat-dot" />
                <span>Led directly by our founding partners</span>
              </div>
              <div className="svc-narrative-feat">
                <span className="svc-feat-dot" />
                <span>Full as-built technical documentation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Technical Attack Vectors / Core Capability Pillars */}
        {service.vectors && service.vectors.length > 0 && (
          <section className="svc-detail-section" id="vectors">
            <div className="svc-section-head">
              <div className="eyebrow">Technical Scope</div>
              <h2 className="svc-detail-section-h">Core Pillars &amp; Defense Layers</h2>
              <p className="svc-section-sub">
                We check, segment, and harden every component so the setup stays reliable and resilient.
              </p>
            </div>
            <div className="svc-vectors-grid">
              {service.vectors.map((vec, idx) => (
                <div key={vec.title} className="svc-vector-card">
                  <div className="svc-vector-top">
                    <span className="svc-vector-idx">0{idx + 1}</span>
                    <span className="svc-vector-badge">{vec.badge}</span>
                  </div>
                  <h3 className="svc-vector-title">{vec.title}</h3>
                  <p className="svc-vector-desc">{vec.desc}</p>
                  <div className="svc-vector-checks">
                    <span className="svc-checks-title">CORE CHECKS &amp; VALIDATION:</span>
                    <ul className="svc-checks-list">
                      {vec.checks.map((chk) => (
                        <li key={chk} className="svc-check-item">
                          <span className="svc-check-bullet">▹</span>
                          <span>{chk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Tangible Deliverables */}
        {service.deliverables && service.deliverables.length > 0 && (
          <section className="svc-detail-section" id="deliverables">
            <div className="svc-section-head">
              <div className="eyebrow">Engagement Outputs</div>
              <h2 className="svc-detail-section-h">What You Receive</h2>
              <p className="svc-section-sub">
                Every project concludes with verified documentation, as-built network diagrams, and direct partner handoff.
              </p>
            </div>
            <div className="svc-detail-deliv-card">
              <div className="svc-deliv-top-badge">
                <span className="svc-deliv-count">{service.deliverables.length} Key Deliverables</span>
                <span className="svc-deliv-assurance">Verified &amp; Documented by Founding Partners</span>
              </div>
              <ul className="svc-detail-deliv-grid">
                {service.deliverables.map((item, i) => (
                  <li key={item} className="svc-detail-deliv-item">
                    <span className="deliv-icon-wrap" aria-hidden="true">
                      <IconCheck />
                    </span>
                    <div className="deliv-text-wrap">
                      <span className="deliv-item-idx">OUTPUT 0{i + 1}</span>
                      <span className="deliv-item-text">{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Section 5: Methodology Stepper (if present) */}
        {service.process && service.process.length > 0 && (
          <section className="svc-detail-section" id="process">
            <div className="svc-section-head">
              <div className="eyebrow">Methodology</div>
              <h2 className="svc-detail-section-h">Our 5-Stage Testing Process</h2>
              <p className="svc-section-sub">
                Structured, non-disruptive execution with full transparency and verified evidence at each phase.
              </p>
            </div>
            <ProcessStepper steps={service.process} />
          </section>
        )}

        {/* Section 6: Benefits Grid (if present) */}
        {service.benefits && service.benefits.length > 0 && (
          <section className="svc-detail-section" id="benefits">
            <div className="svc-section-head">
              <div className="eyebrow">Value &amp; Assurance</div>
              <h2 className="svc-detail-section-h">Engagement Benefits</h2>
              <p className="svc-section-sub">
                Direct partner engineering means less red-tape, verified findings, and a focus on long-term infrastructure stability.
              </p>
            </div>
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
                  <h3 className="svc-benefit-title">{b.title}</h3>
                  <p className="svc-benefit-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: Quick Answer & FAQ Accordion */}
        {faqList.length > 0 && (
          <section className="svc-detail-section" id="faq">
            <div className="svc-qa-split">
              <div className="svc-qa-left">
                <div className="eyebrow">Technical FAQ</div>
                <h2 className="svc-qa-heading">Frequently Asked Questions</h2>
                {service.quickAnswer ? (
                  <p className="svc-qa-text">{service.quickAnswer}</p>
                ) : (
                  <p className="svc-qa-text">
                    Have specific environmental constraints, multi-site branches, or regulatory deadlines? Speak directly with our founding technical team.
                  </p>
                )}
                <div className="svc-qa-contact-box">
                  <span className="svc-qa-box-lbl">NEED DIRECT SCOPING?</span>
                  <p className="svc-qa-box-desc">
                    We review site layouts and network topologies within 24 hours on business days, under NDA.
                  </p>
                  <Link to="/#contact" className="svc-qa-box-link">
                    Request Scope Review ↗
                  </Link>
                </div>
              </div>
              <div className="svc-qa-right">
                <FaqAccordion items={faqList} />
              </div>
            </div>
          </section>
        )}

        {/* Section 8: Related Practices */}
        {relatedList.length > 0 && (
          <section className="svc-detail-section" id="related">
            <div className="svc-section-head">
              <div className="eyebrow">Related Disciplines</div>
              <h2 className="svc-detail-section-h">Complementary Engineering Practices</h2>
              <p className="svc-section-sub">
                Integrated services that strengthen physical infrastructure, routing performance, and cybersecurity posture.
              </p>
            </div>
            <div className="svc-related-grid">
              {relatedList.map((relId) => {
                const relMatch = findService(relId);
                if (!relMatch) return null;
                return (
                  <Link key={relId} to={`/services/${relId}`} className="svc-related-card">
                    <div className="svc-related-top">
                      <span className="svc-related-group">{relMatch.group.name}</span>
                      <span className="svc-related-arrow" aria-hidden="true">↗</span>
                    </div>
                    <h3 className="svc-related-name">{relMatch.service.name}</h3>
                    <p className="svc-related-desc">{relMatch.service.short}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 9: Primary Conversion CTA Banner */}
        <div className="svc-cta-banner">
          <div className="svc-cta-badge">DIRECT FOUNDING PARTNER ENGAGEMENT</div>
          <h2 className="svc-cta-title">Ready to engineer or secure your {service.name.toLowerCase()}?</h2>
          <p className="svc-cta-desc">
            Direct partner consultation. Mutual NDA executed prior to any testing or site survey. Scoping proposal within 24 hours on business days.
          </p>
          <div className="svc-cta-actions">
            <Link to="/#contact" className="svc-detail-cta">
              Request Free Assessment ↗
            </Link>
            <a href="mailto:info@kshetragyacybersec.com" className="svc-cta-secondary-btn">
              Email Engineering Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
