import { Link } from 'react-router-dom';
import { usePageMeta } from '../usePageMeta.js';
import { NOT_FOUND_META } from '../pageMeta.js';

export default function NotFound() {
  usePageMeta(NOT_FOUND_META);

  return (
    <div className="not-found">
      <div className="not-found-code" aria-hidden="true">404</div>
      <h1 className="not-found-msg">Page not found</h1>
      <p className="not-found-desc">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="not-found-cta">
        <Link to="/" className="btn-v">Go Back Home</Link>
      </div>
    </div>
  );
}
