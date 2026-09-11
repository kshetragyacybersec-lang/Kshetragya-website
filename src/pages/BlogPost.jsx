import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { usePageFadeIn } from '../usePageFadeIn.js';
import NotFound from './NotFound.jsx';

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

  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    document.title = `${post.title} | Kshetragya Cybersec Blog`;
    return () => {
      document.title = prevTitle;
    };
  }, [post]);

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
