import { useState } from 'react';
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
                  <Link to={meta.primaryCta} className="svc-card-primary-btn">
                    <span>Explore {group.name}</span>
                    <span className="svc-btn-arrow" aria-hidden="true">↗</span>
                  </Link>
                  <a href="#contact" className="svc-card-scope-link">
                    Request Scope Proposal →
                  </a>
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
    </section>
  );
}
