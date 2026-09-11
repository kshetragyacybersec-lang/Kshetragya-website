import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = '404 — Page Not Found | Kshetragya Cybersec';
    return () => { document.title = prevTitle; };
  }, []);

  return (
    <main className="not-found">
      <div className="not-found-code" aria-hidden="true">404</div>
      <h1 className="not-found-msg">Page not found</h1>
      <p className="not-found-desc">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="not-found-cta">
        <Link to="/" className="btn-v">Go Back Home</Link>
      </div>
    </main>
  );
}
