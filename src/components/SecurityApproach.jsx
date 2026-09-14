import { Reveal } from './Reveal.jsx';

const PRINCIPLES = [
  {
    id: 'hands-on',
    title: 'Founder-Led, Hands-On',
    desc: 'Every engagement, from a firewall rollout to a full VAPT, is handled directly by our founding technical partners. No subcontracted labor, no handoffs.',
  },
  {
    id: 'evidence-based',
    title: 'Evidence, Not Assumptions',
    desc: 'We test and verify configurations rather than assume best practice was followed. Findings are backed by reproducible proof-of-concept steps.',
  },
  {
    id: 'fix-first',
    title: 'Fix-First Mindset',
    desc: "A report that just lists problems isn't enough. Every finding comes with a concrete, prioritized remediation path your team can act on immediately.",
  },
  {
    id: 'confidential',
    title: 'Confidential by Default',
    desc: 'Every engagement begins with a mutual NDA and an agreed Rules of Engagement before any testing or configuration work starts.',
  },
];

export default function SecurityApproach() {
  return (
    <section id="approach" aria-labelledby="approach-heading" style={{ padding: '5rem 0' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="eyebrow">How We Work</div>
        <h2 className="sec-h dark" id="approach-heading">
          A direct, evidence-based approach to security.
        </h2>
      </div>

      <Reveal
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {PRINCIPLES.map((p) => (
          <Reveal.Item
            key={p.id}
            style={{
              padding: '1.75rem',
              borderRadius: '14px',
              border: '1px solid var(--line, rgba(0,0,0,0.08))',
              background: 'var(--card-bg, #fff)',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.6rem' }}>{p.title}</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--muted, #555)' }}>
              {p.desc}
            </p>
          </Reveal.Item>
        ))}
      </Reveal>
    </section>
  );
}
