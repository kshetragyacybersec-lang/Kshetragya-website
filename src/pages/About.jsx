import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

function IconDirect() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17 8l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function About() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'About Us | Kshetragya Cybersec';
    return () => { document.title = prevTitle; };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={mountFadeClass}>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="eyebrow">About Kshetragya</div>
        <h1 className="page-hero-title">Direct technical expertise.<br />Founded in Ahmedabad.</h1>
        <p className="page-hero-sub">
          Kshetragya Cybersec was founded by 3 technical partners in Ahmedabad to provide reliable
          network infrastructure and cybersecurity services across Gujarat and India.
        </p>
      </section>

      <div className="about-content">
        {/* Mission */}
        <div className="about-mission">
          <p className="about-mission-text">
            Our objective is straightforward: provide direct, hands-on network engineering and security testing without middle management or subcontracted work.
          </p>
        </div>

        {/* Story + Facts */}
        <div className="about-story">
          <div className="about-story-text">
            <p>
              We are three founding partners with backgrounds in network engineering, systems administration, and offensive security testing. When you engage Kshetragya, you communicate and work directly with the partners executing your project, from the initial technical scoping meeting and physical site survey to the final configuration and testing report.
            </p>
            <p>
              Our practice covers the full lifecycle of business networks: structured physical cabling and server rack deployments, L2/L3 switching and routing, CCTV surveillance networks, next-gen firewall configurations, 24/7 SOC monitoring, incident response, OS security hardening, network vulnerability assessments (VA), web application VAPT, GRC compliance readiness (including India's DPDP Act 2023), and cloud security reviews.
            </p>
            <p>
              Headquartered in Ahmedabad, we actively serve clients across Ahmedabad, Surat, Vadodara, Rajkot, and all industrial regions of Gujarat, alongside project delivery across India and remote consulting for international clients.
            </p>
          </div>
          <div className="about-facts">
            <div className="about-fact">
              <div className="about-fact-label">Location</div>
              <div className="about-fact-value">Ahmedabad, Gujarat</div>
            </div>
            <div className="about-fact">
              <div className="about-fact-label">Leadership</div>
              <div className="about-fact-value">3 Technical Partners</div>
            </div>
            <div className="about-fact">
              <div className="about-fact-label">Core Services</div>
              <div className="about-fact-value">11 Practice Areas</div>
            </div>
            <div className="about-fact">
              <div className="about-fact-label">Delivery Scope</div>
              <div className="about-fact-value">On-Site Gujarat &amp; Pan-India</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="about-values">
          <div className="eyebrow">Operating Principles</div>
          <h2 className="sec-h dark">How we work.</h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon"><IconDirect /></div>
              <h3 className="about-value-title">Direct Partner Delivery</h3>
              <p className="about-value-desc">
                No intermediary account managers or third-party contractors. You work directly with the technical founders responsible for your project.
              </p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><IconEye /></div>
              <h3 className="about-value-title">Evidence-Based Reporting</h3>
              <p className="about-value-desc">
                Every test and assessment produces clear, reproducible proof-of-concept steps and practical configuration fixes for your engineers.
              </p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><IconMap /></div>
              <h3 className="about-value-title">Practical Engineering</h3>
              <p className="about-value-desc">
                We configure networks and security controls that protect your systems while keeping daily business operations fast and uninterrupted.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta-banner">
          <h2 className="about-cta-title">Discuss your network or security requirements.</h2>
          <Link to="/#contact" className="about-cta-btn">Request Free Assessment ↗</Link>
        </div>
      </div>
    </div>
  );
}
