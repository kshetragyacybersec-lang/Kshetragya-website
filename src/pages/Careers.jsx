import { useEffect } from 'react';
import { usePageFadeIn } from '../usePageFadeIn.js';

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

  const mountFadeClass = usePageFadeIn();

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
            No open positions right now, we'll post here as soon as that changes
          </li>
        </ul>
      </div>
    </div>
  );
}
