import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { usePageFadeIn } from '../usePageFadeIn.js';
import NotFound from './NotFound.jsx';
import { usePageMeta } from '../usePageMeta.js';
import { plainDescription, SITE_NAME, SITE_URL } from '../pageMeta.js';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined); // undefined = loading, null = not found
  const mountFadeClass = usePageFadeIn([slug]);

  useEffect(() => {
    setPost(undefined);
    fetch(`/api/posts/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setPost(data.post))
      .catch(() => setPost(null));
  }, [slug]);

  usePageMeta(
    post
      ? {
          path: `/blog/${slug}`,
          title: `${post.title} | Kshetragya Cybersec Blog`,
          description: post.excerpt || plainDescription(post.body),
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt || plainDescription(post.body),
            datePublished: post.date ? String(post.date).slice(0, 10) : undefined,
            dateModified: post.updated_at || undefined,
            image: post.cover || undefined,
            author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
            publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
          },
        }
      : null
  );

  if (post === undefined) return null;
  if (post === null) return <NotFound />;

  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(post.body || '');
  const html = DOMPurify.sanitize(
    looksLikeHtml ? post.body || '' : marked.parse(post.body || '')
  );

  return (
    <div className={mountFadeClass}>
      <section className="page-hero">
        <div className="svc-breadcrumb">
          <Link to="/">Home</Link>
          <span className="svc-breadcrumb-sep">/</span>
          <Link to="/blog">Blog</Link>
          <span className="svc-breadcrumb-sep">/</span>
          <span>{post.title}</span>
        </div>
        <div className="eyebrow">Blog {post.date && `\u00b7 ${post.date.slice(0, 10)}`}</div>
        <h1 className="page-hero-title">{post.title}</h1>
      </section>

      <div className="svc-detail-body">
        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            style={{ width: '100%', borderRadius: '12px', margin: '0 0 2rem' }}
          />
        )}
        <div className="svc-detail-full" dangerouslySetInnerHTML={{ __html: html }} />
        <Link to="/blog" className="svc-detail-cta" style={{ marginTop: '2rem' }}>
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
