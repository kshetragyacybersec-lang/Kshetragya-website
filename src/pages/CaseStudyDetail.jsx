import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { usePageFadeIn } from '../usePageFadeIn.js';
import NotFound from './NotFound.jsx';
import { usePageMeta } from '../usePageMeta.js';
import { plainDescription, SITE_NAME, SITE_URL } from '../pageMeta.js';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [cs, setCs] = useState(undefined);
  const mountFadeClass = usePageFadeIn([slug]);

  useEffect(() => {
    setCs(undefined);
    fetch(`/api/case-studies/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setCs(data && data.caseStudy ? data.caseStudy : null))
      .catch(() => setCs(null));
  }, [slug]);

  usePageMeta(
    cs
      ? {
          path: `/case-studies/${slug}`,
          title: `${cs.title} | Kshetragya Cybersec Case Studies`,
          description: cs.excerpt || plainDescription(cs.body),
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: cs.title,
            description: cs.excerpt || plainDescription(cs.body),
            datePublished: cs.date ? String(cs.date).slice(0, 10) : undefined,
            dateModified: cs.updated_at || undefined,
            image: cs.cover || undefined,
            author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
            publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/case-studies/${slug}` },
          },
        }
      : null
  );

  if (cs === undefined) return null;
  if (cs === null) return <NotFound />;

  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(cs.body || '');
  const html = DOMPurify.sanitize(
    looksLikeHtml ? cs.body || '' : marked.parse(cs.body || '')
  );

  return (
    <div className={mountFadeClass}>
      <section className="page-hero">
        <div className="svc-breadcrumb">
          <Link to="/">Home</Link>
          <span className="svc-breadcrumb-sep">/</span>
          <Link to="/case-studies">Case Studies</Link>
          <span className="svc-breadcrumb-sep">/</span>
          <span>{cs.title}</span>
        </div>
        <div className="eyebrow">Case Study {cs.client && `\u00b7 ${cs.client}`}</div>
        <h1 className="page-hero-title">{cs.title}</h1>
      </section>

      <div className="svc-detail-body">
        {cs.cover && (
          <img
            src={cs.cover}
            alt={cs.title}
            style={{ width: '100%', borderRadius: '12px', margin: '0 0 2rem' }}
          />
        )}
        <div className="svc-detail-full" dangerouslySetInnerHTML={{ __html: html }} />
        <Link to="/case-studies" className="svc-detail-cta" style={{ marginTop: '2rem' }}>
          ← Back to Case Studies
        </Link>
      </div>
    </div>
  );
}
