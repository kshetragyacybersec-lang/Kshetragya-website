import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceGroups } from '../data.js';

// Finds a service by its slug across all 4 groups.
function findService(slug) {
  for (const group of serviceGroups) {
    const service = group.services.find((s) => s.id === slug);
    if (service) return { group, service };
  }
  return null;
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const match = findService(slug);

  // Per-route document title, since index.html only sets one static title/meta
  // shared across all routes otherwise.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = match
      ? `${match.service.name} | Kshetragya Cybersec`
      : 'Service Not Found | Kshetragya Cybersec';
    return () => {
      document.title = prevTitle;
    };
  }, [match]);

  // Brief fade-in on mount so navigating here from a service card doesn't
  // feel like an abrupt jump. Skipped for prefers-reduced-motion.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [slug]);

  const mountFadeClass = `page-fade${visible ? ' page-fade-in' : ''}`;

  if (!match) {
    return (
      <div className={`svc-detail svc-detail-empty ${mountFadeClass}`}>
        <p>Sorry, we couldn't find that service.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  const { group, service } = match;

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <p className="svc-detail-group">{group.name}</p>
      <h1 className="svc-detail-title">{service.name}</h1>
      <p className="svc-detail-full">{service.full}</p>
      {service.deliverables && service.deliverables.length > 0 && (
        <div className="svc-detail-deliv">
          <h2 className="svc-detail-deliv-h">What You Get</h2>
          <ul className="svc-detail-deliv-list">
            {service.deliverables.map((item) => (
              <li key={item} className="svc-detail-deliv-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/#contact" className="svc-detail-cta">
        Request this assessment
      </Link>
    </div>
  );
}
