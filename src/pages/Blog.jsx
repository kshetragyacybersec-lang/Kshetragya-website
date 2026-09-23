import { Link } from 'react-router-dom';
import { blogPosts } from '../data.js';
import { usePageFadeIn } from '../usePageFadeIn.js';
import { usePageMeta } from '../usePageMeta.js';
import { PAGE_META } from '../pageMeta.js';

export default function Blog() {
  usePageMeta({ ...PAGE_META.blog, noindex: blogPosts.length === 0 });

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={mountFadeClass}>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="eyebrow">Technical Articles</div>
        <h1 className="page-hero-title">Engineering Blog</h1>
        <p className="page-hero-sub">
          Practical notes, architecture guides, and security analysis written by our founding engineers.
        </p>
      </section>

      <div className="content-page">
        <div className="content-grid">
          {blogPosts.length === 0 && (
            <div className="content-empty">
              <div className="content-empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 32, height: 32, color: 'var(--blue)' }}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <h2 className="content-empty-title">Articles coming soon</h2>
              <p className="content-empty-desc">We publish technical write-ups and security notes periodically. Please check back soon.</p>
            </div>
          )}

          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="content-card">
              <div className="content-card-cover">
                {post.cover ? (
                  <img src={post.cover} alt={post.title} />
                ) : (
                  <span className="content-card-placeholder">Kshetragya Blog</span>
                )}
              </div>
              <div className="content-card-body">
                {post.date && <div className="content-card-meta">{post.date.slice(0, 10)}</div>}
                <h2 className="content-card-title">{post.title}</h2>
                {post.excerpt && <p className="content-card-excerpt">{post.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
