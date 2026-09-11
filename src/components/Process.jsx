import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useThrottledScroll } from '../useThrottledScroll.js';

const STEPS = [
  {
    num: '01',
    phase: 'Discovery',
    timeline: 'Day 1',
    title: 'Scope Definition & Site Walkthrough',
    desc: 'We map out your target infrastructure, compliance obligations, and agree on test boundaries before any tool runs or cabling begins.',
    partnerExecution: 'Founding partners review your IP assets, cloud accounts, or visit your Gujarat facility for a physical premises walkthrough.',
    clientDeliverable: 'Asset Inventory & Scoping SOW Proposal',
    clientInputs: 'IP ranges, web domains, floor plans, or desired compliance targets.',
  },
  {
    num: '02',
    phase: 'Protection',
    timeline: 'Day 1 - 2',
    title: 'Mutual NDA & Rules of Engagement',
    desc: 'A bilateral legal agreement is signed and communication channels are locked down before any testing packets touch your network.',
    partnerExecution: 'We draft and sign a strict mutual NDA guaranteeing full confidentiality of all proprietary architectures and findings.',
    clientDeliverable: 'Signed Bilateral NDA & Fixed Written SOW',
    clientInputs: 'Authorized signatory approval and emergency contact points.',
  },
  {
    num: '03',
    phase: 'Execution',
    timeline: 'Day 2 - 5',
    title: 'Active Deployment & Manual Pentest',
    desc: 'Hands-on engineering: physical rack cabling, firewall policy tuning, and deep manual OWASP/MITRE penetration testing.',
    partnerExecution: 'Partners perform real exploitation attempts with zero automated scanner dumps, testing logic flaws and perimeter defenses.',
    clientDeliverable: 'Live Vulnerability Log & Work-in-Progress Briefing',
    clientInputs: 'Test credentials / whitelisted testing IPs (if grey-box).',
  },
  {
    num: '04',
    phase: 'Delivery',
    timeline: 'Day 5 - 7',
    title: 'Executive & Developer Report Handover',
    desc: 'A high-level risk summary for leadership paired with a step-by-step technical remediation guide for your developers and IT team.',
    partnerExecution: 'We write clear, evidence-backed reports with reproducible PoCs and exact configuration fixes for your engineers.',
    clientDeliverable: 'Executive Summary + Comprehensive Tech Remediation Report',
    clientInputs: '30-minute debrief meeting with technical and executive teams.',
  },
  {
    num: '05',
    phase: 'Assurance',
    timeline: 'Day 14 - 21',
    title: 'Remediation Verification & Free Retest',
    desc: 'After your team patches the discovered vulnerabilities, we retest all affected endpoints for free to guarantee complete remediation.',
    partnerExecution: 'Partners personally re-verify every finding to validate that patches hold against real-world attack methods.',
    clientDeliverable: 'Letter of Attestation & Final Clean Retest Report',
    clientInputs: 'Confirmation that development and IT teams applied the fixes.',
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion && containerRef.current) {
      containerRef.current.style.setProperty('--proc-progress', 1);
    }
  }, []);

  useThrottledScroll(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(Math.max((vh * 0.85 - rect.top) / rect.height, 0), 1);
    el.style.setProperty('--proc-progress', progress);
  });

  const current = STEPS[activeStep];

  return (
    <section id="process" aria-labelledby="process-heading">
      <div className="proc-head">
        <div>
          <div className="eyebrow">Our Methodology</div>
          <h2 className="sec-h dark" id="process-heading">
            Five clear steps.
            <br />
            <em>Zero ambiguity.</em>
          </h2>
        </div>
        <p className="proc-note">
          A structured, direct-partner methodology from kickoff to retest. The same 3 partners who
          scope your project execute the work and author your reports.
        </p>
      </div>

      <div className="sleek-process-wrapper" ref={containerRef}>
        {/* Step Indicator Progress Stepper Bar */}
        <div className="proc-stepper-bar" role="tablist">
          {STEPS.map((s, idx) => (
            <button
              key={s.num}
              className={`proc-stepper-node ${activeStep === idx ? 'is-active' : ''} ${idx < activeStep ? 'is-completed' : ''}`}
              onClick={() => setActiveStep(idx)}
              role="tab"
              aria-selected={activeStep === idx}
              style={{ position: 'relative' }}
            >
              {activeStep === idx && (
                <motion.span
                  layoutId="activeProcNodePill"
                  className="proc-node-active-bg"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12px',
                    background: 'rgba(23, 20, 18, 0.95)',
                    border: '1px solid var(--blue)',
                    boxShadow: '0 8px 24px rgba(229, 67, 42, 0.25)',
                    zIndex: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <div className="node-indicator" style={{ position: 'relative', zIndex: 1 }}>
                <span className="node-dot" />
                <span className="node-num">{s.num}</span>
              </div>
              <div className="node-text-wrap" style={{ position: 'relative', zIndex: 1 }}>
                <span className="node-phase">{s.phase}</span>
                <span className="node-timeline">{s.timeline}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Polished Active Stage Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.num}
            className="proc-card-display"
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
              {/* Header */}
              <div className="pcd-header">
                <div className="pcd-meta-left">
                  <span className="pcd-icon">{current.icon}</span>
                  <div>
                    <span className="pcd-pill-phase">PHASE {current.num} · {current.phase.toUpperCase()}</span>
                    <h3 className="pcd-title">{current.title}</h3>
                  </div>
                </div>
                <div className="pcd-pill-sla">
                  <span className="pcd-sla-dot" />
                  <span>TIMELINE: {current.timeline}</span>
                </div>
              </div>

              <p className="pcd-desc">{current.desc}</p>

              {/* 2-Column Details Breakdown */}
              <div className="pcd-body-grid">
                <div className="pcd-col-box">
                  <span className="pcd-box-label">PARTNER EXECUTION</span>
                  <p className="pcd-box-text">{current.partnerExecution}</p>
                </div>

                <div className="pcd-col-box deliverable-col">
                  <span className="pcd-box-label">KEY DELIVERABLE</span>
                  <p className="pcd-box-text deliv-highlight">{current.clientDeliverable}</p>
                  <div className="pcd-input-note">
                    <span className="input-lbl">Required inputs:</span> {current.clientInputs}
                  </div>
                </div>
              </div>

              {/* Footer Action & Assurance */}
              <div className="pcd-footer">
                <span className="pcd-nda-guarantee">
                  Direct Partner Delivery · Mutual NDA Protected
                </span>
                <a href="#contact" className="pcd-cta-btn">
                  Initiate Free Scoping ↗
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

        {/* Zero Outsourcing Guarantee Strip */}
        <div className="proc-guarantee-strip">
          <span className="guarantee-shield-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <path d="M12 2.5l8 3.5v6c0 5-3.5 9.5-8 10.5-4.5-1-8-5.5-8-10.5V6L12 2.5z" strokeLinejoin="round" />
              <path d="M8.5 12l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="guarantee-text">
            <strong>Direct Partner Execution:</strong> All 5 stages are handled directly by our 3 founding partners in Gujarat — zero subcontracting or third-party handoffs.
          </div>
        </div>
      </div>
    </section>
  );
}
