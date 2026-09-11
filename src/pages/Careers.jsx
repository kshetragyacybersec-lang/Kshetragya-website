import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

function IconImpact() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function IconLearn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function IconCulture() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function Careers() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Careers | Kshetragya Cybersec';
    return () => { document.title = prevTitle; };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={mountFadeClass}>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="eyebrow">Careers</div>
        <h1 className="page-hero-title">Careers at Kshetragya</h1>
        <p className="page-hero-sub">
          We work directly on network infrastructure, firewall deployments, and offensive security testing across Gujarat and India.
        </p>
      </section>

      <div className="careers-content">
        {/* Benefits */}
        <div className="careers-benefits-grid">
          <div className="careers-benefit-card">
            <div className="careers-benefit-icon"><IconImpact /></div>
            <h3 className="careers-benefit-title">Live Technical Engagements</h3>
            <p className="careers-benefit-desc">
              Work on live enterprise networks, managed switches, next-gen firewalls, network VA, and web VAPT assessments.
            </p>
          </div>
          <div className="careers-benefit-card">
            <div className="careers-benefit-icon"><IconLearn /></div>
            <h3 className="careers-benefit-title">Direct Partner Mentorship</h3>
            <p className="careers-benefit-desc">
              Collaborate directly alongside technical founders across infrastructure design, defensive monitoring, and penetration testing.
            </p>
          </div>
          <div className="careers-benefit-card">
            <div className="careers-benefit-icon"><IconCulture /></div>
            <h3 className="careers-benefit-title">Continuous Skill Development</h3>
            <p className="careers-benefit-desc">
              Gain deep practical experience across structured networking, Active Directory auditing, and cloud security frameworks.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="careers-positions">
          <div className="eyebrow">Opportunities</div>
          <h2 className="sec-h dark">Current openings</h2>
          <div className="careers-empty-card">
            <div className="careers-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 32, height: 32, color: 'var(--blue)' }}>
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" />
                <path d="M9 12h6M9 16h6" />
              </svg>
            </div>
            <h3 className="careers-empty-title">No current open positions</h3>
            <p className="careers-empty-desc">
              We are currently executing projects with our core team. If you are an experienced network engineer, systems administrator, or penetration tester based in Gujarat and would like to connect for future project requirements, please feel free to reach out.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="careers-cta">
          <p className="careers-cta-text">
            Send your background and areas of expertise to our team.
          </p>
          <Link to="/#contact" className="svc-detail-cta">Get in Touch ↗</Link>
        </div>
      </div>
    </div>
  );
}
