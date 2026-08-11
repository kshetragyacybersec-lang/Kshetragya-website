import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Careers() {
  // Per-route document title, since index.html only sets one static title/meta
  // shared across all routes otherwise (same pattern as ServiceDetail.jsx).
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Careers | Kshetragya Cybersec';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // Brief fade-in on mount, same pattern used on ServiceDetail.jsx.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const mountFadeClass = `page-fade${visible ? ' page-fade-in' : ''}`;

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">Join Us</div>
      <h1 className="sec-h dark svc-detail-title">Careers at Kshetragya Cybersec</h1>
      <p className="svc-detail-full">
        We don't have any open positions right now, but we're growing, and that's expected to
        change. If you work in network infrastructure, cybersecurity, or related fields and want
        to be on our radar for when a role opens, we'd like to hear from you.
      </p>
      <div className="svc-detail-deliv">
        <h2 className="svc-detail-deliv-h">How It Works</h2>
        <ul className="svc-detail-deliv-list">
          <li className="svc-detail-deliv-item">
            Send us your background using the form below, select "Careers / Future Opportunities"
          </li>
          <li className="svc-detail-deliv-item">
            We'll keep it on file and reach out when a relevant position opens
          </li>
          <li className="svc-detail-deliv-item">No open roles today, that's the honest state</li>
        </ul>
      </div>
      <Link to="/#contact" className="svc-detail-cta">
        Get in Touch
      </Link>
    </div>
  );
}
