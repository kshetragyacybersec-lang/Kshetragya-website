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

  const html = DOMPurify.sanitize(marked.parse(post.body || ''));

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">Blog {post.date && `· ${post.date.slice(0, 10)}`}</div>
      <h1 className="sec-h dark svc-detail-title">{post.title}</h1>
      {post.cover && (
        <img
          src={post.cover}
          alt={post.title}
          style={{ width: '100%', borderRadius: '12px', margin: '1rem 0' }}
        />
      )}
      <div className="svc-detail-full" dangerouslySetInnerHTML={{ __html: html }} />
      <Link to="/blog" className="svc-detail-cta">
        Back to Blog
      </Link>
    </div>
  );
}
