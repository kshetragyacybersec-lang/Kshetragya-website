import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

function SkeletonCard() {
  return (
    <div className="content-skeleton">
      <div className="content-skeleton-cover" />
      <div className="content-skeleton-body">
        <div className="content-skeleton-line" />
        <div className="content-skeleton-line" />
        <div className="content-skeleton-line" />
        <div className="content-skeleton-line" />
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Case Studies | Kshetragya Cybersec';
    fetch('/api/case-studies')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Failed to fetch case studies'))))
      .then((data) => setCaseStudies(data.caseStudies || []))
      .catch(() => setCaseStudies([]))
      .finally(() => setLoading(false));
    return () => { document.title = prevTitle; };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={mountFadeClass}>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="eyebrow">Past Engagements</div>
        <h1 className="page-hero-title">Case Studies</h1>
        <p className="page-hero-sub">
          Summaries of network deployments, firewall configurations, and penetration testing projects.
        </p>
      </section>

      <div className="content-page">
        <div className="content-grid">
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {!loading && caseStudies.length === 0 && (
            <div className="content-empty">
              <div className="content-empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 32, height: 32, color: 'var(--blue)' }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="content-empty-title">Case studies coming soon</h2>
              <p className="content-empty-desc">Case summaries will be published here following client review and data redaction.</p>
            </div>
          )}

          {caseStudies.map((cs) => (
            <Link key={cs.slug} to={`/case-studies/${cs.slug}`} className="content-card">
              <div className="content-card-cover">
                {cs.cover ? (
                  <img src={cs.cover} alt={cs.title} />
                ) : (
                  <span className="content-card-placeholder">Case Study</span>
                )}
              </div>
              <div className="content-card-body">
                {cs.client && <div className="content-card-meta">{cs.client}</div>}
                <h2 className="content-card-title">{cs.title}</h2>
                {cs.excerpt && <p className="content-card-excerpt">{cs.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
