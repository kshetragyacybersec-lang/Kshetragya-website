import { Reveal } from './Reveal.jsx';

const INSIGHTS = [
  {
    id: 'perimeter',
    stat: '4',
    badge: 'FULL STACK',
    label: 'Core Disciplines',
    desc: 'From structured cabling and firewalls to VAPT and cloud security, one unified team handles your entire security posture.',
  },
  {
    id: 'response',
    stat: 'Day 1',
    badge: 'FAST ONBOARDING',
    label: 'Response Time',
    desc: 'Scope and rules of engagement are agreed on day one, so testing and configuration work starts fast without administrative delay.',
  },
  {
    id: 'retest',
    stat: 'Free',
    badge: 'POST-FIX ASSURANCE',
    label: 'Verification Retest',
    desc: 'After remediation, we retest the originally reported findings once at no extra cost, within 30 days of report delivery.',
  },
];

export default function SecurityInsights() {
  return (
    <section id="security-insights" aria-labelledby="security-insights-heading">
      <div className="insights-inner">
        <div className="insights-head">
          <div>
            <div className="eyebrow" style={{ color: 'var(--blue)' }}>Security Focus</div>
            <h2 className="sec-h dark" id="security-insights-heading" style={{ color: '#ffffff' }}>
              Built around one goal:
              <br />
              <em>fewer exploitable gaps.</em>
            </h2>
          </div>
          <p className="insights-note">
            We focus on closing real attack vectors before malicious actors discover them.
            Our technical audits prioritize practical exploitability over endless automated scanner noise.
          </p>
        </div>

        <Reveal className="insights-grid">
          {INSIGHTS.map((item) => (
            <Reveal.Item key={item.id} className="insights-card">
              <div className="insights-stat-row">
                <div className="insights-stat">{item.stat}</div>
                <span className="insights-stat-badge">{item.badge}</span>
              </div>
              <h3 className="insights-label">{item.label}</h3>
              <p className="insights-desc">{item.desc}</p>
            </Reveal.Item>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
