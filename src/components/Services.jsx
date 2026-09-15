import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { serviceGroups } from '../data.js';

// Dedicated SVG Cyber Icons for each discipline
function IconInfrastructure() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="disc-icon-svg" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconDefence() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="disc-icon-svg" aria-hidden="true">
      <path d="M12 2.5l8 3.5v6c0 5-3.5 9.5-8 10.5-4.5-1-8-5.5-8-10.5V6L12 2.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTesting() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="disc-icon-svg" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.5 9.5l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconGovernance() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="disc-icon-svg" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const DISCIPLINE_META = {
  'infrastructure-solutions': {
    index: '01',
    badge: 'LAYER 1-3 HARDWARE & PHYSICAL NETWORKS',
    headline: 'Structured cabling, server room deployment & enterprise switching.',
    desc: 'Cat6A/10G structured cabling, managed L2/L3 switch segregation, and isolated surveillance networks installed on-site with zero loose ends.',
    Icon: IconInfrastructure,
    tags: ['Cat6A / 10G Fiber', 'L2/L3 Routing', 'Isolated CCTV', 'Fluke Certified'],
    primaryCta: '/services/network-infrastructure',
  },
  'cyber-defence': {
    index: '02',
    badge: '24/7 PERIMETER MONITORING & HARDENING',
    headline: 'Next-gen firewall architecture, SIEM triage & rapid incident containment.',
    desc: 'Proactive UTM firewall tuning, 24/7 Wazuh SIEM log monitoring, DFIR containment, and CIS Benchmark system hardening handled directly by founders.',
    Icon: IconDefence,
    tags: ['FortiGate / Sophos', 'Wazuh 24/7 SIEM', 'DFIR Forensics', 'CIS Hardening'],
    primaryCta: '/services/firewall-network-security',
  },
  'security-testing': {
    index: '03',
    badge: 'OFFENSIVE PENETRATION TESTING & AUDITS',
    headline: 'Real-world adversary simulation to discover critical vulnerabilities.',
    desc: 'Comprehensive manual penetration testing for web apps, APIs, and network perimeters with zero automated fluff and free verification re-scans.',
    Icon: IconTesting,
    tags: ['OWASP Top 10', 'Network VA', 'REST/GraphQL APIs', 'Free Re-Scan'],
    primaryCta: '/services/network-va',
  },
  'governance-cloud': {
    index: '04',
    badge: 'REGULATORY COMPLIANCE & MULTI-CLOUD',
    headline: 'Executive compliance readiness & multi-cloud architecture review.',
    desc: 'Aligning your operations with the DPDP Act 2023, ISO 27001 readiness, CERT-In reporting, and AWS/Azure least-privilege cloud hardening.',
    Icon: IconGovernance,
    tags: ['DPDP Act 2023', 'ISO 27001 ISMS', 'AWS / Azure Security', 'CERT-In Baseline'],
    primaryCta: '/services/grc-compliance-audit',
  },
};

export default function Services() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [activeModalIdx, setActiveModalIdx] = useState(null);

  useEffect(() => {
    if (activeModalIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeModalIdx]);

  const visibleGroups =
    selectedTab === 'all'
      ? serviceGroups
      : serviceGroups.filter((g) => g.id === selectedTab);

  return (
    <section id="services" className="services-section" aria-labelledby="services-heading">
      <div className="svc-head">
        <div className="svc-head-title-col">
          <div className="eyebrow">Direct Engineering Practice</div>
          <h2 className="sec-h dark" id="services-heading">
            Four disciplines.
            <br />
            <em>Direct Engineering Practice.</em>
          </h2>
        </div>
        <div className="svc-head-desc-col">
          <p className="svc-note">
            From physical cabling and server rack setups up through firewall architecture, offensive
            VAPT, and regulatory compliance. Every engagement is executed directly by founding partners with
            zero subcontracting.
          </p>

          {/* Tactical Discipline Switcher */}
          <div className="svc-tactical-tabs" role="tablist" aria-label="Filter service disciplines">
            <button
              className={`svc-tac-tab ${selectedTab === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedTab('all')}
            >
              <span className="tac-tab-dot" />
              <span>All Disciplines (4)</span>
            </button>
            {serviceGroups.map((g) => {
              const meta = DISCIPLINE_META[g.id] || {};
              return (
                <button
                  key={g.id}
                  className={`svc-tac-tab ${selectedTab === g.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedTab(g.id)}
                >
                  <span className="tac-tab-dot" />
                  <span className="tac-tab-num">{meta.index || '01'}</span>
                  <span>{g.name.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cyber Grid Container */}
      <div className="svc-cyber-grid">
        <AnimatePresence mode="popLayout">
          {visibleGroups.map((group) => {
            const meta = DISCIPLINE_META[group.id] || DISCIPLINE_META['infrastructure-solutions'];
            const IconComponent = meta.Icon;

            return (
              <motion.div
                key={group.id}
                id={group.id}
                className="svc-cyber-card"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                {/* Discipline Header */}
                <div className="svc-card-header">
                  <div className="svc-card-top-row">
                    <div className="svc-icon-badge">
                      <IconComponent />
                    </div>
                    <span className="svc-tac-badge">{meta.badge}</span>
                    <span className="svc-card-index">{meta.index}</span>
                  </div>

                  <h3 className="svc-card-name">{group.name}</h3>
                  <p className="svc-card-headline">{meta.headline}</p>
                  <p className="svc-card-summary">{meta.desc}</p>

                  {/* Discipline Capability Tags */}
                  <div className="svc-tags-strip">
                    {meta.tags.map((tag, tIdx) => (
                      <span className="svc-tac-chip" key={tIdx}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="svc-card-footer">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = serviceGroups.findIndex((g) => g.id === group.id);
                      setActiveModalIdx(idx !== -1 ? idx : 0);
                    }}
                    className="svc-card-primary-btn"
                  >
                    <span>Explore {group.name}</span>
                    <span className="svc-btn-arrow" aria-hidden="true">↗</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Cross-Discipline Custom Scoping Banner */}
      <div className="svc-scoping-banner">
        <div className="svc-banner-left">
          <span className="svc-banner-badge">DIRECT FOUNDER ENGAGEMENT</span>
          <h3 className="svc-banner-title">Need an end-to-end infrastructure &amp; cybersecurity audit?</h3>
          <p className="svc-banner-desc">
            We scope custom multi-discipline engagements tailored to your exact requirements, from structured cabling and firewalls to offensive VAPT and DPDP compliance. Handled directly by our founding partners in Ahmedabad.
          </p>
        </div>
        <div className="svc-banner-right">
          <a href="#contact" className="btn-v btn-shimmer">
            <span className="btn-shimmer-ray" aria-hidden="true" />
            <span>Request Assessment Proposal ↗</span>
          </a>
        </div>
      </div>

      {/* Interactive Service Directory Modal */}
      <AnimatePresence>
        {activeModalIdx !== null && (
          <div
            className="svc-modal-portal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="svc-modal-title"
          >
            <motion.div
              className="svc-modal-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveModalIdx(null)}
              aria-hidden="true"
            />
            <div className="svc-modal-wrapper">
              <motion.div
                className="svc-modal-dialog"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.26, ease: [0.2, 0.9, 0.25, 1] }}
              >
                <button
                  type="button"
                  className="svc-modal-close-btn"
                  onClick={() => setActiveModalIdx(null)}
                  aria-label="Close service directory modal"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Left Column: 4 Disciplines */}
                <div className="svc-modal-list">
                  <div className="svc-modal-list-eyebrow">Disciplines</div>
                  {serviceGroups.map((g, i) => (
                    <button
                      key={g.id}
                      type="button"
                      className={`svc-modal-item${activeModalIdx === i ? ' active' : ''}`}
                      onClick={() => setActiveModalIdx(i)}
                    >
                      <span>{g.name}</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M5 2.5L9.5 7L5 11.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}
                </div>

                {/* Right Column: Active Discipline Services */}
                <div className="svc-modal-detail" key={activeModalIdx}>
                  <span className="svc-modal-detail-cat">
                    {serviceGroups[activeModalIdx].services.length} services
                  </span>
                  <h3 id="svc-modal-title" className="svc-modal-detail-title">
                    {serviceGroups[activeModalIdx].name}
                  </h3>
                  <ul className="svc-modal-svc-list">
                    {serviceGroups[activeModalIdx].services.map((s) => (
                      <li key={s.id} className="svc-modal-svc-item">
                        <Link
                          to={`/services/${s.id}`}
                          className="svc-modal-svc-link"
                          onClick={() => setActiveModalIdx(null)}
                        >
                          <span className="svc-modal-svc-name">{s.name}</span>
                          <span className="svc-modal-link-arrow" aria-hidden="true">↗</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="svc-modal-detail-cta"
                    onClick={() => setActiveModalIdx(null)}
                  >
                    Request Free Assessment
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
