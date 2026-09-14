import { Reveal } from './Reveal.jsx';

const INSIGHTS = [
  {
    id: 'perimeter',
    stat: '4',
    label: 'Core Disciplines',
    desc: 'From structured cabling and firewalls to VAPT and cloud security, one team handles your entire stack.',
  },
  {
    id: 'response',
    stat: 'Day 1',
    label: 'Response Time',
    desc: 'Scope and rules of engagement are agreed on day one, so testing and configuration work starts fast.',
  },
  {
    id: 'retest',
    stat: 'Free',
    label: 'Verification Retest',
    desc: 'After remediation, we retest at no extra cost to confirm the fixes actually hold.',
  },
];

export default function SecurityInsights() {
  return (
    <section
      id="security-insights"
      aria-labelledby="security-insights-heading"
      style={{ padding: '5rem 0', background: 'var(--ink, #0b0c0f)', color: '#fff' }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="eyebrow">Security Focus</div>
        <h2 className="sec-h dark" id="security-insights-heading" style={{ color: '#fff' }}>
          Built around one goal: fewer exploitable gaps.
        </h2>
      </div>

      <Reveal
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {INSIGHTS.map((item) => (
          <Reveal.Item
            key={item.id}
            style={{
              padding: '1.75rem',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--blue)' }}>
              {item.stat}
            </div>
            <div style={{ fontWeight: 600, margin: '0.4rem 0 0.6rem' }}>{item.label}</div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
              {item.desc}
            </p>
          </Reveal.Item>
        ))}
      </Reveal>
    </section>
  );
}
