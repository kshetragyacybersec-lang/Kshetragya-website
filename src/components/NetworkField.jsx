import { useEffect, useRef, useState } from 'react';

// Fixed node layout (percent-based, 0-100 viewBox) — node 0 is the "core" (you),
// the rest represent the client's monitored infrastructure.
const NODES = [
  { x: 50, y: 50, z: 1.0, hq: true },   // 0 - core
  { x: 22, y: 20, z: 0.7 },
  { x: 50, y: 12, z: 0.8 },
  { x: 78, y: 18, z: 0.6 },
  { x: 88, y: 42, z: 0.75 },
  { x: 82, y: 70, z: 0.65 },
  { x: 60, y: 86, z: 0.85 },
  { x: 34, y: 82, z: 0.7 },
  { x: 12, y: 62, z: 0.6 },
  { x: 14, y: 36, z: 0.8 },
  { x: 40, y: 38, z: 0.5 },
  { x: 64, y: 34, z: 0.55 },
  { x: 62, y: 60, z: 0.5 },
  { x: 36, y: 62, z: 0.55 },
];

// Edges: core connects to several "trunk" nodes; a few extra links form a mesh.
const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],
  [1,9],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],
  [0,10],[0,11],[0,12],[0,13],[10,9],[11,3],[12,5],[13,7],
];

const ALERTABLE = NODES.map((_, i) => i).filter(i => i !== 0);

function lerp(a, b, t) { return a + (b - a) * t; }

export default function NetworkField() {
  const [alertIdx, setAlertIdx] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | alert | responding | resolved
  const [pulseT, setPulseT] = useState(0);     // 0-1 progress of traveling pulse
  const rafRef = useRef(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotionRef.current) return; // static field only, no cycle

    let timers = [];
    function runCycle() {
      const target = ALERTABLE[Math.floor(Math.random() * ALERTABLE.length)];
      setAlertIdx(target);
      setPhase('alert');

      timers.push(setTimeout(() => {
        setPhase('responding');
        const start = performance.now();
        const dur = 900;
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          setPulseT(t);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);
      }, 1100));

      timers.push(setTimeout(() => setPhase('resolved'), 2050));
      timers.push(setTimeout(() => { setPhase('idle'); setAlertIdx(null); setPulseT(0); }, 2700));
    }

    const interval = setInterval(runCycle, 6500);
    runCycle();

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const target = alertIdx !== null ? NODES[alertIdx] : null;
  const hq = NODES[0];
  const pulseX = target ? lerp(hq.x, target.x, pulseT) : hq.x;
  const pulseY = target ? lerp(hq.y, target.y, pulseT) : hq.y;

  return (
    <div className={`network-field${reduceMotionRef.current ? '' : ' nf-rotate'}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {EDGES.map(([a, b], i) => {
          const na = NODES[a], nb = NODES[b];
          const isActiveEdge = phase === 'responding' && (a === alertIdx || b === alertIdx) && (a === 0 || b === 0);
          return (
            <line
              key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              className={`nf-edge${isActiveEdge ? ' nf-edge-active' : ''}`}
              strokeWidth={0.15 + (na.z + nb.z) * 0.06}
            />
          );
        })}

        {NODES.map((n, i) => {
          const isAlert = i === alertIdx && (phase === 'alert' || phase === 'responding');
          const isResolved = i === alertIdx && phase === 'resolved';
          const r = 1.1 + n.z * 1.4;
          return (
            <g key={i}>
              {isAlert && (
                <circle cx={n.x} cy={n.y} r={r} className="nf-ring" />
              )}
              <circle
                cx={n.x} cy={n.y} r={n.hq ? r * 1.35 : r}
                className={
                  'nf-node' +
                  (n.hq ? ' nf-node-hq' : '') +
                  (isAlert ? ' nf-node-alert' : '') +
                  (isResolved ? ' nf-node-resolved' : '')
                }
                style={{ opacity: 0.35 + n.z * 0.55 }}
              />
            </g>
          );
        })}

        {phase === 'responding' && (
          <circle cx={pulseX} cy={pulseY} r={1.6} className="nf-pulse" />
        )}
      </svg>
    </div>
  );
}
