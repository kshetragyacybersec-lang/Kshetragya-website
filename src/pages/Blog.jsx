import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Blog | Kshetragya Cybersec';
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .finally(() => setLoading(false));
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">Insights</div>
      <h1 className="sec-h dark svc-detail-title">Blog</h1>

      {!loading && posts.length === 0 && (
        <p className="svc-detail-full">No posts yet. Check back soon.</p>
      )}

      <div className="svc-detail-deliv">
        <ul className="svc-detail-deliv-list">
          {posts.map((post) => (
            <li key={post.slug} className="svc-detail-deliv-item">
              <Link to={`/blog/${post.slug}`} className="svc-related-link">
                <strong>{post.title}</strong>
                {post.date && <> — {post.date.slice(0, 10)}</>}
                {post.excerpt && <div>{post.excerpt}</div>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
