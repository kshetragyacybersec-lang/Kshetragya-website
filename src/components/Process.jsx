import { processSteps } from '../data.js';
import { useScrollReveal } from '../useScrollReveal.js';

export default function Process() {
  const listRef = useScrollReveal('.proc-row');

  return (
    <section id="process" aria-labelledby="process-heading">
      <div className="proc-head reversed">
        <p className="proc-note" style={{ order: 1 }}>A structured engagement at every stage. No black box. No unexplained gaps between kickoff and delivery.</p>
        <div style={{ order: 2 }}>
          <div className="eyebrow" style={{ justifyContent: 'flex-end', flexDirection: 'row-reverse' }}>Our Method</div>
          <h2 className="sec-h dark" id="process-heading">From first call<br/><em>to final report.</em></h2>
        </div>
      </div>
      <ol className="proc-list" aria-label="Engagement timeline, five stages from scoping to retest" ref={listRef}>
        {processSteps.map((p, i) => (
          <li className="proc-row" key={p.d} style={{ '--stagger': `${i * 70}ms` }}>
            <span className="proc-d" aria-hidden="true">{p.d}</span>
            <div className="proc-t">{p.title}</div>
            <div className="proc-desc">{p.desc}</div>
            <div className="proc-time">{p.time}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
