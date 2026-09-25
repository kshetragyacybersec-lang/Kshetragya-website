import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceGroups } from '../data.js';

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 15, height: 15 }}>
      <path d="M12 2C8.5 2 5.5 5 5.5 8.5c0 4.5 6.5 13.5 6.5 13.5s6.5-9 6.5-13.5C18.5 5 15.5 2 12 2z" />
      <circle cx="12" cy="8.5" r="2.5" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 15, height: 15 }}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 15, height: 15 }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [openGroup, setOpenGroup] = useState(null);

  useEffect(() => {
    if (!openGroup) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenGroup(null);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openGroup]);

  return (
    <footer className="footer-main">
      <div className="footer-top">
        {/* Column 1: Brand */}
        <div className="footer-brand">
          <span className="ft-name">Kshetragya Cybersec</span>
          <span className="ft-tag">क्षेत्रज्ञ · Network &amp; Security Engineering</span>
          <p className="footer-brand-desc">
            Network infrastructure design, firewall engineering, and cybersecurity services based in Ahmedabad, Gujarat. Delivering on-site across Gujarat and India.
          </p>
        </div>

        {/* Column 2: Services */}
        <div>
          <div className="footer-col-title">Services</div>
          <ul className="footer-col-list">
            {serviceGroups.map((group) => (
              <li key={group.id}>
                <button
                  type="button"
                  className="footer-disc-btn"
                  onClick={() => setOpenGroup(group)}
                  aria-haspopup="dialog"
                >
                  {group.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-col-list">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
            <li><Link to="/#process">Our Process</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <div className="footer-col-title">Contact</div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon" aria-hidden="true"><IconPin /></span>
            <span className="footer-contact-text">Ahmedabad, Gujarat, India</span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon" aria-hidden="true"><IconMail /></span>
            <span className="footer-contact-text">
              <a href="mailto:info@kshetragyacybersec.com">info@kshetragyacybersec.com</a>
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon" aria-hidden="true"><IconGlobe /></span>
            <span className="footer-contact-text">Gujarat &amp; India (On-Site + Remote) · Global (Remote)</span>
          </div>
          <Link to="/#contact" className="footer-cta-btn">
            Request Free Assessment
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span className="footer-copy">© {year} Kshetragya Cybersec · All rights reserved</span>
          <span className="footer-copy-sep">·</span>
          <Link to="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
          <span className="footer-copy-sep">·</span>
          <Link to="/terms-of-service" className="footer-legal-link">Terms of Service</Link>
          <span className="footer-copy-sep">·</span>
          <Link to="/responsible-disclosure" className="footer-legal-link">Responsible Disclosure</Link>
        </div>
        <button
          className="footer-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>

      {openGroup && (
        <div
          className="disc-modal-backdrop"
          onClick={() => setOpenGroup(null)}
          role="presentation"
        >
          <div
            className="disc-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="disc-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="disc-modal-close"
              onClick={() => setOpenGroup(null)}
              aria-label="Close"
              autoFocus
            >
              ×
            </button>
            <div className="disc-modal-eyebrow">Discipline</div>
            <h3 id="disc-modal-title" className="disc-modal-title">{openGroup.name}</h3>
            <ul className="disc-modal-list">
              {openGroup.services.map((svc) => (
                <li key={svc.id}>
                  <Link
                    to={`/services/${svc.id}`}
                    className="disc-modal-link"
                    onClick={() => setOpenGroup(null)}
                  >
                    <span className="disc-modal-name">
                      {svc.name}
                      {svc.comingSoon && <span className="disc-modal-soon">Coming Soon</span>}
                    </span>
                    <span className="disc-modal-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </footer>
  );
}
