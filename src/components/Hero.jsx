import { useEffect, useState, useRef } from 'react';

const STATS = [
  { key: 'svc',    label: 'Service Lines',      target: 11,   suffix: '',  tooltip: 'Network, SOC, VAPT, GRC, Cloud & more — full-spectrum coverage.' },
  { key: 'turn',   label: 'Report Turnaround',   target: 72,  suffix: 'h', tooltip: 'From kickoff call to your first delivered report draft.' },
  { key: 'global', label: 'Service Area',       target: null, display: 'Pan-India', tooltip: 'Based in Gujarat, available on-site across India, remote delivery too.' },
];

function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === null) return;

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
      <dt className="hstat-lbl">{stat.label}</dt>
      <dd className="hstat-num">{displayValue}{stat.suffix}</dd>
      <span className="hstat-tip" role="tooltip">{stat.tooltip}</span>
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { setLoaded(true); return; }
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Subtle parallax: overlay/content drift at a fraction of scroll speed
  // while the hero is in view. Skipped for prefers-reduced-motion and
  // disabled once the hero has scrolled out of view (perf).
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let ticking = false;
    function update() {
      ticking = false;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      setParallaxY(window.scrollY * 0.25);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hl = n => `hero-load hero-load-${n}${loaded ? ' hero-load-in' : ''}`;

  return (
    <section className="hero" id="main-content" tabIndex={-1} ref={heroRef}>
      <div
        className="hero-overlay"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${parallaxY * 0.5}px, 0)` }}
      ></div>

      <dl className={`hero-stats ${hl(6)}`}>
        {STATS.map(s => <StatNode stat={s} key={s.key} />)}
      </dl>

      <div className="hero-content" style={{ transform: `translate3d(0, ${parallaxY * -0.15}px, 0)` }}>
        <div className={`hero-ch ${hl(1)}`}>
          <span className="hero-ch-mark">Bhagavad Gita · Chapter XIII · Verse 2</span>
          <span className="hero-ch-rule" aria-hidden="true"></span>
        </div>
        <p className={`hero-sk ${hl(2)}`} lang="sa">यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति</p>
        <h1 className={`hero-h1 ${hl(3)}`}>He who knows the field -<br/>that one is called <em>Kshetragya.</em></h1>
        <p className={`hero-p ${hl(4)}`}>From network infrastructure to CCTV surveillance to cybersecurity - we know your network, your terrain, your field, before problems find it. Based in Gujarat, delivering across India.</p>
        <div className={`hero-actions ${hl(5)}`}>
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
