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

      {service.quickAnswer && (
        <div className="svc-detail-qa">
          <h2 className="svc-detail-qa-h">Quick Answer</h2>
          <p className="svc-detail-qa-p">{service.quickAnswer}</p>
        </div>
      )}

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

      {service.process && service.process.length > 0 && (
        <div className="svc-detail-section">
          <h2 className="svc-detail-section-h">Our Process</h2>
          <ol className="svc-detail-process-list">
            {service.process.map((step, i) => (
              <li key={step.title} className="svc-detail-process-item">
                <span className="svc-detail-process-num">{i + 1}</span>
                <div>
                  <div className="svc-detail-process-title">{step.title}</div>
                  <div className="svc-detail-process-desc">{step.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {service.benefits && service.benefits.length > 0 && (
        <div className="svc-detail-section">
          <h2 className="svc-detail-section-h">Benefits</h2>
          <div className="svc-detail-grid">
            {service.benefits.map((b) => (
              <div key={b.title} className="svc-detail-grid-card">
                <div className="svc-detail-grid-card-title">{b.title}</div>
                <div className="svc-detail-grid-card-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.whyUs && service.whyUs.length > 0 && (
        <div className="svc-detail-section">
          <h2 className="svc-detail-section-h">Why Choose Us</h2>
          <div className="svc-detail-grid">
            {service.whyUs.map((w) => (
              <div key={w.title} className="svc-detail-grid-card">
                <div className="svc-detail-grid-card-title">{w.title}</div>
                <div className="svc-detail-grid-card-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.faq && service.faq.length > 0 && (
        <div className="svc-detail-section">
          <h2 className="svc-detail-section-h">FAQ</h2>
          <div className="svc-detail-faq-list">
            {service.faq.map((item) => (
              <div key={item.q} className="svc-detail-faq-item">
                <div className="svc-detail-faq-q">{item.q}</div>
                <div className="svc-detail-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.related && service.related.length > 0 && (
        <div className="svc-detail-section">
          <h2 className="svc-detail-section-h">Related Services</h2>
          <div className="svc-detail-related-list">
            {service.related.map((relId) => {
              const relMatch = findService(relId);
              if (!relMatch) return null;
              return (
                <Link
                  key={relId}
                  to={`/services/${relId}`}
                  className="svc-detail-related-link"
                >
                  {relMatch.service.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <Link to="/#contact" className="svc-detail-cta">
        Request Free Assessment
      </Link>
    </div>
  );
}
