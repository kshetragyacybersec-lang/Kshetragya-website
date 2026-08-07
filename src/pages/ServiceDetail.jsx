import { useParams, Link } from 'react-router-dom';
import { serviceGroups } from '../data.js';

// Finds a service by its slug across all 4 groups.
function findService(slug) {
  for (const group of serviceGroups) {
    const service = group.services.find(s => s.id === slug);
    if (service) return { group, service };
  }
  return null;
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const match = findService(slug);

  if (!match) {
    return (
      <div style={{ padding: '8rem 5vw 4rem' }}>
        <p>Sorry, we couldn't find that service.</p>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  const { group, service } = match;

  return (
    <div style={{ padding: '8rem 5vw 4rem', maxWidth: '760px', margin: '0 auto' }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '0.75rem' }}>
        {group.name}
      </p>
      <h1 style={{ fontFamily: 'var(--f-s)', fontSize: '2.2rem', marginBottom: '1.25rem', color: 'var(--ink)' }}>
        {service.name}
      </h1>
      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--ink-mut)' }}>
        {service.full}
      </p>
    </div>
  );
}
