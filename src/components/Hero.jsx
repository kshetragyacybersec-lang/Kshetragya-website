import { useEffect, useRef, useState } from 'react';
import NetworkField from './NetworkField.jsx';

const STATS = [
  { key: 'svc',    label: 'Service Lines',      target: 9,   suffix: '',  tooltip: 'Network, SOC, VAPT, GRC, Cloud & more — full-spectrum coverage.' },
  { key: 'turn',   label: 'Report Turnaround',   target: 72,  suffix: 'h', tooltip: 'From kickoff call to your first delivered report draft.' },
  { key: 'global', label: 'Remote Delivery',     target: null, display: 'Global', tooltip: 'Serving clients across India, USA, UK & UAE remotely.' },
];

function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (target === null || started.current) return;
    started.current = true;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { setValue(target); return; }

    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);

  return value;
}

function StatNode({ stat }) {
  const count = useCountUp(stat.target);
  const displayValue = stat.target === null ? stat.display : count;

  return (
    <div className="hstat" tabIndex={0}>
      <span className="hstat-node" aria-hidden="true">
        {stat.target === null ? <span className="hstat-orbit"></span> : null}
      </span>
      <dt className="hstat-lbl">{stat.label}</dt>
      <dd className="hstat-num">{displayValue}{stat.suffix}</dd>
      <span className="hstat-tip" role="tooltip">{stat.tooltip}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="main-content" tabIndex={-1}>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="hero-visual">
        <NetworkField />
      </div>

      <dl className="hero-stats">
        {STATS.map(s => <StatNode stat={s} key={s.key} />)}
      </dl>

      <div className="hero-content">
        <div className="hero-ch">
          <span className="hero-ch-mark">Bhagavad Gita · Chapter XIII · Verse 2</span>
          <span className="hero-ch-rule" aria-hidden="true"></span>
        </div>
        <p className="hero-sk" lang="sa">यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति</p>
        <h1 className="hero-h1">He who knows the field -<br/>that one is called <em>Kshetragya.</em></h1>
        <p className="hero-p">In cybersecurity, complete knowledge of the terrain wins before the attack begins. We know your network, your vulnerabilities, your field - before threats do.</p>
        <div className="hero-actions">
          <a className="btn-v" href="#contact">Request Free Assessment</a>
          <a className="btn-g" href="#services">View All Services</a>
        </div>
        <div className="hero-scroll">
          <span className="scroll-lbl">Enter the field</span>
          <span className="scroll-line" aria-hidden="true"></span>
        </div>
      </div>
    </section>
  );
}
