import { useParams } from 'react-router-dom';

// Placeholder only — real content wiring happens in a later step.
export default function ServiceDetail() {
  const { slug } = useParams();
  return (
    <div style={{ padding: '8rem 5vw 4rem' }}>
      <p>Service detail page placeholder for: <strong>{slug}</strong></p>
    </div>
  );
}
