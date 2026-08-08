import { useEffect } from 'react';
import { processSteps } from '../data.js';
import { useScrollReveal } from '../useScrollReveal.js';

export default function Process() {
  const listRef = useScrollReveal('.proc-row');

  // Connector line down the number column fills in as the timeline
  // scrolls through view. Skipped for prefers-reduced-motion.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { el.style.setProperty('--proc-progress', 1); return; }

    let ticking = false;
    function update() {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh * 0.85 - rect.top) / rect.height, 0), 1);
      el.style.setProperty('--proc-progress', progress);
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [listRef]);

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
        <span className="proc-connector" aria-hidden="true">
          <span className="proc-connector-fill"></span>
        </span>
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
