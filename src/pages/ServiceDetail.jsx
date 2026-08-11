import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceGroups } from '../data.js';
import NotFound from './NotFound.jsx';
import { usePageFadeIn } from '../usePageFadeIn.js';

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
    if (!match) return;
    const prevTitle = document.title;
    document.title = `${match.service.name} in Gujarat & India | Kshetragya Cybersec`;
    return () => {
      document.title = prevTitle;
    };
  }, [match]);

  const mountFadeClass = usePageFadeIn([slug]);

  if (!match) {
    return <NotFound />;
  }

  const { group, service } = match;

  return (
    <div className={`svc-detail ${mountFadeClass}`}>
      <div className="eyebrow">{group.name}</div>
      <h1 className="sec-h dark svc-detail-title">{service.name}</h1>
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
        Request Free Assessment
      </Link>
    </div>
  );
}
