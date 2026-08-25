import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { processSteps } from '../data.js';
import { useThrottledScroll } from '../useThrottledScroll.js';
import { Reveal } from './Reveal.jsx';

export default function Process() {
  const listRef = useRef(null);

  // Connector line down the number column fills in as the timeline
  // scrolls through view. Skipped for prefers-reduced-motion.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion && listRef.current) {
      listRef.current.style.setProperty('--proc-progress', 1);
    }
  }, []);

  useThrottledScroll(
    () => {
      const el = listRef.current;
      if (!el) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh * 0.85 - rect.top) / rect.height, 0), 1);
      el.style.setProperty('--proc-progress', progress);
    },
    { onResize: true }
  );

  return (
    <section id="process" aria-labelledby="process-heading">
      <div className="proc-head">
        <div>
          <div className="eyebrow">Our Method</div>
          <h2 className="sec-h dark" id="process-heading">
            From first call
            <br />
            <em>to final report.</em>
          </h2>
        </div>
        <p className="proc-note">
          A structured engagement at every stage, no black box, and no unexplained gaps between
          kickoff and delivery.
        </p>
      </div>
      <Reveal
        as="ol"
        className="proc-list"
        aria-label="Engagement timeline, five stages from scoping to retest"
        ref={listRef}
      >
        <span className="proc-connector" aria-hidden="true">
          <span className="proc-connector-fill"></span>
        </span>
        {processSteps.map((p) => (
          <Reveal.Item as="li" className="proc-row" key={p.d}>
            <span className="proc-d" aria-hidden="true">
              {p.d}
            </span>
            <div className="proc-t">{p.title}</div>
            <div className="proc-desc">{p.desc}</div>
            <div className="proc-time">{p.time}</div>
          </Reveal.Item>
        ))}
      </Reveal>
    </section>
  );
}
