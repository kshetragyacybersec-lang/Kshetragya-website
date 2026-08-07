import { useParams } from 'react-router-dom';
import { serviceGroups } from '../data.js';

// STEP 2 (partial): wired up for "Infrastructure Solutions" services only.
// Other categories still fall back to the placeholder until we do them next.
const WIRED_GROUP_ID = 'infrastructure-solutions';

export default function ServiceDetail() {
  const { slug } = useParams();

  const group = serviceGroups.find(g => g.id === WIRED_GROUP_ID);
  const service = group?.services.find(s => s.id === slug);

  if (!service) {
    return (
      <div style={{ padding: '8rem 5vw 4rem' }}>
        <p>Service detail page placeholder for: <strong>{slug}</strong></p>
      </div>
    );
  }

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
