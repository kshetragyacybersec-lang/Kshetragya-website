import { useEffect } from 'react';
import { usePageFadeIn } from '../usePageFadeIn.js';

export default function About() {
  // Per-route document title, since index.html only sets one static title/meta
  // shared across all routes otherwise (same pattern as Careers.jsx / ServiceDetail.jsx).
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'About Us | Kshetragya Cybersec';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">Who We Are</div>
      <h1 className="sec-h dark svc-detail-title">
        Making Gujarat India's benchmark for cyber security.
      </h1>
      <p className="svc-detail-full">
        Kshetragya Cybersec was started to close a gap: Gujarat businesses needed real network
        and cyber security help, and weren't getting it from generic IT providers.
      </p>
      <p className="svc-detail-full">
        We're run by three partners, and between the three of us, we handle everything
        ourselves, from the first site visit to the final report. No handing you off to a call
        center, no layers of account managers. The people who scope the work are the same
        people who do it.
      </p>
      <p className="svc-detail-full">
        What we offer is on this site: network infrastructure, firewall and network security,
        SOC monitoring, incident response, security hardening, VAPT for networks and web
        applications, GRC and compliance audits, and cloud security review.
      </p>
      <p className="svc-detail-full">
        We're based in Ahmedabad, and our goal isn't just to serve Gujarat businesses well,
        it's to make Gujarat the strongest, most secure business ecosystem in India. We're
        taking that same standard across India as we grow.
      </p>
    </div>
  );
}
