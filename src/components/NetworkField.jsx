import { useEffect, useRef, useState } from 'react';

// Fixed device layout (percent-based, 0-100 viewBox).
// Device 0 is the core (our firewall / monitoring point) - always safe, never alerted.
const DEVICES = [
  { x: 50, y: 50, z: 1.0, icon: '🛡️', label: 'Firewall', hq: true },
  { x: 20, y: 18, z: 0.7, icon: '💻', label: 'Workstation' },
  { x: 50, y: 10, z: 0.75, icon: '🖥️', label: 'Server' },
  { x: 80, y: 16, z: 0.65, icon: '💻', label: 'Workstation' },
  { x: 90, y: 44, z: 0.7,  icon: '🔀', label: 'Switch' },
  { x: 80, y: 72, z: 0.65, icon: '💻', label: 'Workstation' },
  { x: 52, y: 88, z: 0.8,  icon: '☁️', label: 'Cloud' },
  { x: 20, y: 80, z: 0.65, icon: '💻', label: 'Workstation' },
  { x: 10, y: 46, z: 0.7,  icon: '🖨️', label: 'Printer' },
];

const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1],
];

const ALERTABLE = DEVICES.map((_, i) => i).filter(i => i !== 0);

function lerp(a, b, t) { return a + (b - a) * t; }

export default function NetworkField() {
  const [alertIdx, setAlertIdx] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | alert | responding | resolved
  const [pulseT, setPulseT] = useState(0);
  const rafRef = useRef(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotionRef.current) return;

    let timers = [];
    function runCycle() {
      const target = ALERTABLE[Math.floor(Math.random() * ALERTABLE.length)];
      setAlertIdx(target);
      setPhase('alert');

      timers.push(setTimeout(() => {
        setPhase('responding');
        const start = performance.now();
        const dur = 850;
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          setPulseT(t);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);
      }, 900));

      timers.push(setTimeout(() => setPhase('resolved'), 1800));
      timers.push(setTimeout(() => { setPhase('idle'); setAlertIdx(null); setPulseT(0); }, 2500));
    }

    const interval = setInterval(runCycle, 6000);
    runCycle();

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const target = alertIdx !== null ? DEVICES[alertIdx] : null;
  const hq = DEVICES[0];
  const pulseX = target ? lerp(hq.x, target.x, pulseT) : hq.x;
  const pulseY = target ? lerp(hq.y, target.y, pulseT) : hq.y;

  return (
    <div className={`network-field${reduceMotionRef.current ? '' : ' nf-rotate'}`} aria-hidden="true">
      <svg className="nf-lines" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {EDGES.map(([a, b], i) => {
          const da = DEVICES[a], db = DEVICES[b];
          const isActiveEdge = phase === 'responding' && (a === alertIdx || b === alertIdx) && (a === 0 || b === 0);
          return (
            <line
              key={i}
              x1={da.x} y1={da.y} x2={db.x} y2={db.y}
              className={`nf-cable${isActiveEdge ? ' nf-cable-active' : ''}`}
            />
          );
        })}
        {phase === 'responding' && (
          <circle cx={pulseX} cy={pulseY} r={1.3} className="nf-pulse" />
        )}
      </svg>

      {DEVICES.map((d, i) => {
        const isAlert = i === alertIdx && phase === 'alert';
        const isResponding = i === alertIdx && phase === 'responding';
        const isResolved = i === alertIdx && phase === 'resolved';
        return (
          <div
            key={i}
            className={
              'nf-device' +
              (d.hq ? ' nf-device-hq' : '') +
              (isAlert || isResponding ? ' nf-device-alert' : '')
            }
            style={{ left: `${d.x}%`, top: `${d.y}%`, opacity: 0.55 + d.z * 0.45 }}
          >
            <span className="nf-icon">{d.icon}</span>
            {(isAlert || isResponding) && <span className="nf-warn">⚠</span>}
            {isResolved && <span className="nf-check">✓</span>}
          </div>
        );
      })}
    </div>
  );
}
