import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

// Shared 404 page: used both as the catch-all route in App.jsx and as the
// fallback rendered by ServiceDetail.jsx when a /services/:slug doesn't
// match any known service.
export default function NotFound() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Page Not Found | Kshetragya Cybersec';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={`svc-detail svc-detail-empty ${mountFadeClass}`}>
      <div className="eyebrow">404</div>
      <h1 className="sec-h dark svc-detail-title">Page Not Found</h1>
      <p className="svc-detail-full">
        Sorry, we couldn't find the page you were looking for. It may have moved, or the link may
        be out of date.
      </p>
      <Link to="/" className="svc-detail-cta">
        Back to home
      </Link>
    </div>
  );
}
