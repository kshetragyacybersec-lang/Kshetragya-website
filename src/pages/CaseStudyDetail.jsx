import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { usePageFadeIn } from '../usePageFadeIn.js';
import NotFound from './NotFound.jsx';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [cs, setCs] = useState(undefined);
  const mountFadeClass = usePageFadeIn([slug]);

  useEffect(() => {
    setCs(undefined);
    fetch(`/api/case-studies/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setCs(data.caseStudy))
      .catch(() => setCs(null));
  }, [slug]);

  useEffect(() => {
    if (!cs) return;
    const prevTitle = document.title;
    document.title = `${cs.title} | Kshetragya Cybersec Case Studies`;
    return () => {
      document.title = prevTitle;
    };
  }, [cs]);

  if (cs === undefined) return null;
  if (cs === null) return <NotFound />;

  const html = DOMPurify.sanitize(marked.parse(cs.body || ''));

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">Case Study {cs.client && `· ${cs.client}`}</div>
      <h1 className="sec-h dark svc-detail-title">{cs.title}</h1>
      {cs.cover && (
        <img
          src={cs.cover}
          alt={cs.title}
          style={{ width: '100%', borderRadius: '12px', margin: '1rem 0' }}
        />
      )}
      <div className="svc-detail-full" dangerouslySetInnerHTML={{ __html: html }} />
      <Link to="/case-studies" className="svc-detail-cta">
        Back to Case Studies
      </Link>
    </div>
  );
}
