import { Reveal } from './Reveal.jsx';

function IconFounder() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="approach-icon-svg" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconEvidence() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="approach-icon-svg" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      <path d="m8 11 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFixFirst() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="approach-icon-svg" aria-hidden="true">
      <path d="m14.7 6.3 3 3-9.4 9.4H5.3v-3z" strokeLinejoin="round" />
      <path d="M18.4 2.6a2.12 2.12 0 0 1 3 3l-1.7 1.7-3-3 1.7-1.7z" strokeLinejoin="round" />
      <path d="m2 22 3-3" strokeLinecap="round" />
    </svg>
  );
}

function IconConfidential() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="approach-icon-svg" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  );
}

const PRINCIPLES = [
  {
    id: 'hands-on',
    num: '01',
    title: 'Founder-Led, Hands-On',
    desc: 'Every engagement, from a firewall rollout to a full VAPT, is led directly by our founding technical partners.',
    Icon: IconFounder,
  },
  {
    id: 'evidence-based',
    num: '02',
    title: 'Evidence, Not Assumptions',
    desc: 'We test and verify configurations rather than assume best practice was followed. Findings are backed by reproducible proof-of-concept steps.',
    Icon: IconEvidence,
  },
  {
    id: 'fix-first',
    num: '03',
    title: 'Fix-First Mindset',
    desc: "A report that just lists problems isn't enough. Every finding comes with a concrete, prioritized remediation path your team can act on immediately.",
    Icon: IconFixFirst,
  },
  {
    id: 'confidential',
    num: '04',
    title: 'Confidential by Default',
    desc: 'Every engagement begins with a mutual NDA and agreed Rules of Engagement before any testing packets touch your network.',
    Icon: IconConfidential,
  },
];

export default function SecurityApproach() {
  return (
    <section id="approach" aria-labelledby="approach-heading">
      <div className="approach-inner">
        <div className="approach-head">
          <div>
            <div className="eyebrow">How We Work</div>
            <h2 className="sec-h dark" id="approach-heading">
              A direct, evidence-based
              <br />
              <em>approach to security.</em>
            </h2>
          </div>
          <p className="approach-note">
            Our engineering principles define how we scope, test, and deliver every engagement.
            Zero outsourced labor, zero generic checklist scans, and complete transparency from day one.
          </p>
        </div>

        <Reveal className="approach-grid">
          {PRINCIPLES.map((p) => {
            const Icon = p.Icon;
            return (
              <Reveal.Item key={p.id} className="approach-card">
                <div className="approach-card-top">
                  <div className="approach-icon-badge">
                    <Icon />
                  </div>
                  <span className="approach-card-num">{p.num}</span>
                </div>
                <h3 className="approach-card-title">{p.title}</h3>
                <p className="approach-card-desc">{p.desc}</p>
              </Reveal.Item>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
