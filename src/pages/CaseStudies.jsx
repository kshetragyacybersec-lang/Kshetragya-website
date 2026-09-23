import { Link } from 'react-router-dom';
import { caseStudies } from '../data.js';
import { usePageFadeIn } from '../usePageFadeIn.js';
import { usePageMeta } from '../usePageMeta.js';
import { PAGE_META } from '../pageMeta.js';

export default function CaseStudies() {
  usePageMeta({ ...PAGE_META['case-studies'], noindex: caseStudies.length === 0 });

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
          {caseStudies.length === 0 && (
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
