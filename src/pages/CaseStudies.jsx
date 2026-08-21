import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Case Studies | Kshetragya Cybersec';
    fetch('/api/case-studies')
      .then((r) => r.json())
      .then((data) => setCaseStudies(data.caseStudies || []))
      .finally(() => setLoading(false));
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">Our Work</div>
      <h1 className="sec-h dark svc-detail-title">Case Studies</h1>

      {!loading && caseStudies.length === 0 && (
        <p className="svc-detail-full">No case studies yet. Check back soon.</p>
      )}

      <div className="svc-detail-deliv">
        <ul className="svc-detail-deliv-list">
          {caseStudies.map((cs) => (
            <li key={cs.slug} className="svc-detail-deliv-item">
              <Link to={`/case-studies/${cs.slug}`} className="svc-related-link">
                <strong>{cs.title}</strong>
                {cs.client && <> — {cs.client}</>}
                {cs.excerpt && <div>{cs.excerpt}</div>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
