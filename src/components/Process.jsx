import { processSteps } from '../data.js';

export default function Process() {
  return (
    <section id="process">
      <div className="proc-head reversed">
        <p className="proc-note" style={{ order: 1 }}>A structured engagement at every stage. No black box. No unexplained gaps between kickoff and delivery.</p>
        <div style={{ order: 2 }}>
          <div className="eyebrow" style={{ justifyContent: 'flex-end', flexDirection: 'row-reverse' }}>Our Method</div>
          <h2 className="sec-h dark">From first call<br/><em>to final report.</em></h2>
        </div>
      </div>
      <div className="proc-list">
        {processSteps.map(p => (
          <div className="proc-row" key={p.d}>
            <span className="proc-d">{p.d}</span>
            <div className="proc-t">{p.title}</div>
            <div className="proc-desc">{p.desc}</div>
            <div className="proc-time">{p.time}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
