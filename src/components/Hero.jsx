import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useMagnetic } from '../useMagnetic.js';
import { useThrottledScroll } from '../useThrottledScroll.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 220, damping: 24, delay },
  }),
};

// ── HIGH-PRECISION AUTHENTIC CYBER RADAR CANVAS ──
function CyberRadarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let dpr = window.devicePixelRatio || 1;
    let cssW = 0;
    let cssH = 0;
    let em = 16; // the hero's font-size in px, so the radar scales with the hero

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const singleColumn = window.matchMedia('(max-width: 1099px)');

    // Size the canvas from its own on-screen box (it sits below the top menu bar)
    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = window.devicePixelRatio || 1;
      cssW = rect.width;
      cssH = rect.height;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      em = parseFloat(getComputedStyle(canvas.parentElement).fontSize) || 16;
      if (reduceMotion) render(); // no animation loop, so draw again by hand
    }

    // Authentic Radar Targets distributed symmetrically
    const targets = [
      { rFrac: 0.35, theta: 0.65, intensity: 0, label: 'GW-01' },
      { rFrac: 0.58, theta: 1.85, intensity: 0, label: 'FW-PRM' },
      { rFrac: 0.72, theta: 2.75, intensity: 0, label: 'SW-L3' },
      { rFrac: 0.45, theta: 3.85, intensity: 0, label: 'SRV-04' },
      { rFrac: 0.82, theta: 4.65, intensity: 0, label: 'EXT-IP' },
      { rFrac: 0.65, theta: 5.60, intensity: 0, label: 'DMZ-02' },
    ];

    let currentAngle = 0;
    const sweepSpeed = 0.018; // smooth realistic rotation speed

    function render() {
      const width = cssW;
      const height = cssH;

      ctx.clearRect(0, 0, width, height);

      // Radar is centered in the canvas and scales with the hero, so the full
      // circle (and its labels) always stays inside the visible area
      const u = Math.max(1, em / 16); // label / dot scale
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxRadius = singleColumn.matches
        ? Math.min(width * 0.36, height * 0.36, 15 * em)
        : Math.min(width * 0.3, height * 0.36, 17.2 * em);

      if (maxRadius <= 30) {
        if (!reduceMotion) animId = requestAnimationFrame(render);
        return;
      }

      // 1. Concentric Range Rings
      const rings = [0.25, 0.5, 0.75, 1.0];
      rings.forEach((frac, idx) => {
        const r = maxRadius * frac;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 3 ? 'rgba(229, 67, 42, 0.20)' : 'rgba(229, 67, 42, 0.08)';
        ctx.lineWidth = idx === 3 ? 1.2 : 0.8;
        if (idx < 3) {
          ctx.setLineDash([3, 6]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Range ring distance markers
        ctx.font = `${8 * u}px "IBM Plex Mono", monospace`;
        ctx.fillStyle = 'rgba(248, 245, 240, 0.25)';
        ctx.fillText(`${Math.round(frac * 100)}%`, centerX + r - 12, centerY - 4);
      });

      // 2. Radial Axis Spokes & Degree Ticks
      for (let deg = 0; deg < 360; deg += 30) {
        const rad = (deg * Math.PI) / 180;
        const isMainAxis = deg % 90 === 0;

        // Spoke line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(rad) * maxRadius, centerY + Math.sin(rad) * maxRadius);
        ctx.strokeStyle = isMainAxis ? 'rgba(255, 139, 107, 0.08)' : 'rgba(255, 139, 107, 0.03)';
        ctx.lineWidth = isMainAxis ? 1 : 0.6;
        ctx.stroke();

        // Outer degree marks
        const tickInner = maxRadius + 2;
        const tickOuter = maxRadius + (isMainAxis ? 7 : 4);
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(rad) * tickInner, centerY + Math.sin(rad) * tickInner);
        ctx.lineTo(centerX + Math.cos(rad) * tickOuter, centerY + Math.sin(rad) * tickOuter);
        ctx.strokeStyle = isMainAxis ? 'rgba(229, 67, 42, 0.35)' : 'rgba(229, 67, 42, 0.15)';
        ctx.lineWidth = isMainAxis ? 1.2 : 0.8;
        ctx.stroke();

        // Compass cardinal labels
        if (isMainAxis) {
          const labelDist = maxRadius + 14 * u;
          const labels = { 0: '090°', 90: '180°', 180: '270°', 270: '000°' };
          ctx.font = `${7.5 * u}px "IBM Plex Mono", monospace`;
          ctx.fillStyle = 'rgba(255, 139, 107, 0.35)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(labels[deg], centerX + Math.cos(rad) * labelDist, centerY + Math.sin(rad) * labelDist);
        }
      }

      if (!reduceMotion) {
        currentAngle = (currentAngle + sweepSpeed) % (Math.PI * 2);

        // 3. Fading Radar Sweep Phosphor Beam
        const trailLength = 0.50; // ~28 degrees width
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, maxRadius, currentAngle - trailLength, currentAngle, false);
        ctx.closePath();

        const sweepGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
        sweepGrad.addColorStop(0, 'rgba(229, 67, 42, 0.14)');
        sweepGrad.addColorStop(0.7, 'rgba(229, 67, 42, 0.04)');
        sweepGrad.addColorStop(1, 'rgba(229, 67, 42, 0)');
        ctx.fillStyle = sweepGrad;
        ctx.fill();

        // Leading crisp scanline
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(currentAngle) * maxRadius, centerY + Math.sin(currentAngle) * maxRadius);
        ctx.strokeStyle = 'rgba(255, 160, 135, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = '#e5432a';
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Radar Target Blips with Phosphor Fade & Ping Ripples
      targets.forEach((target) => {
        const tx = centerX + Math.cos(target.theta) * (maxRadius * target.rFrac);
        const ty = centerY + Math.sin(target.theta) * (maxRadius * target.rFrac);

        if (!reduceMotion) {
          // Check if sweep line passed target
          const angleDiff = Math.abs((currentAngle - target.theta + Math.PI * 2) % (Math.PI * 2));
          if (angleDiff < 0.08) {
            target.intensity = 1.0;
          } else {
            target.intensity *= 0.975; // smooth phosphor decay
          }
        } else {
          target.intensity = 0.6;
        }

        const alpha = Math.max(0.18, target.intensity);

        // Ping expansion wave
        if (target.intensity > 0.4) {
          const pingR = 4 + (1 - target.intensity) * 14;
          ctx.beginPath();
          ctx.arc(tx, ty, pingR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(229, 67, 42, ${target.intensity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Blip point
        ctx.beginPath();
        ctx.arc(tx, ty, 3 * u, 0, Math.PI * 2);
        ctx.fillStyle = target.intensity > 0.5 ? '#ff8b6b' : `rgba(229, 67, 42, ${alpha})`;
        ctx.shadowColor = '#e5432a';
        ctx.shadowBlur = target.intensity > 0.5 ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Target micro label
        if (target.intensity > 0.3) {
          ctx.font = `${8 * u}px "IBM Plex Mono", monospace`;
          ctx.fillStyle = `rgba(255, 139, 107, ${target.intensity * 0.85})`;
          ctx.textAlign = 'left';
          ctx.fillText(target.label, tx + 6, ty - 4);
        }
      });

      // 5. Radar Live Telemetry Badge in bottom-left of radar scope
      ctx.font = `${8 * u}px "IBM Plex Mono", monospace`;
      ctx.fillStyle = 'rgba(248, 245, 240, 0.4)';
      ctx.textAlign = 'left';
      ctx.fillText(`RADAR // AZ: ${Math.round((currentAngle * 180) / Math.PI)}°`, centerX - maxRadius + 5, centerY + maxRadius + 14 * u);

      if (!reduceMotion) {
        animId = requestAnimationFrame(render);
      }
    }

    resize();
    render();

    // Re-size whenever the canvas box changes (window resize, rotate phone, fonts load)
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-cyber-canvas"
      aria-hidden="true"
    />
  );
}

// ── 3D TILT CARD WRAPPER ──
function TiltHeroCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 26 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 26 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="clean-hero-card-container"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      <div className="simple-hero-card">
        {children}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef(null);
  const magneticRef = useMagnetic();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setLoaded(true);
    } else {
      const raf = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  const reduceMotionRef = useRef(false);
  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useThrottledScroll(() => {
    if (reduceMotionRef.current) return;
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    setParallaxY(window.scrollY * 0.16);
  });

  return (
    <section className="hero" id="hero-intro" ref={heroRef}>
      {/* Precision Circular Cyber Radar Animation */}
      <CyberRadarCanvas />

      {/* Background Grid & Ambient Cyber Radial Gradients */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow-ambient" aria-hidden="true" />

      <div className="hero-container">
        {/* Left Column: Brand, Mission, Philosophical Sanskrit & CTAs */}
        <div
          className="hero-content"
          style={{ transform: `translate3d(0, ${parallaxY * -0.08}px, 0)` }}
        >
          <motion.div
            className="hero-ch"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate={loaded ? 'show' : 'hidden'}
          >
            <span className="hero-ch-badge">
              <span className="ch-badge-pulse" />
              BHAGAVAD GITA · XIII.2
            </span>
            <span className="hero-ch-rule" aria-hidden="true" />
          </motion.div>

          <motion.p
            className="hero-sk"
            lang="sa"
            variants={fadeUp}
            custom={0.06}
            initial="hidden"
            animate={loaded ? 'show' : 'hidden'}
          >
            यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति
          </motion.p>

          <motion.h1
            className="hero-h1"
            variants={fadeUp}
            custom={0.12}
            initial="hidden"
            animate={loaded ? 'show' : 'hidden'}
          >
            He who knows the field,
            <br />
            that one is called <em>Kshetragya.</em>
          </motion.h1>

          <motion.p
            className="hero-p"
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate={loaded ? 'show' : 'hidden'}
          >
            Structured network cabling, firewall architecture, and hands-on manual vulnerability
            testing for Gujarat &amp; Indian enterprises. Led by our 3 technical partners.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={fadeUp}
            custom={0.28}
            initial="hidden"
            animate={loaded ? 'show' : 'hidden'}
          >
            <motion.a
              className="btn-v btn-magnetic btn-shimmer"
              href="#contact"
              ref={magneticRef}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="btn-shimmer-ray" aria-hidden="true" />
              <span>Request Free Assessment ↗</span>
            </motion.a>
            <motion.a
              className="btn-g"
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Disciplines
            </motion.a>
          </motion.div>

          {/* Direct-Partner Integrity Telemetry Badges */}
          <motion.div
            className="hero-trust-row"
            variants={fadeUp}
            custom={0.34}
            initial="hidden"
            animate={loaded ? 'show' : 'hidden'}
          >
            <div className="hero-trust-item">
              <span className="hero-trust-dot" />
              <span>3 Founding Partners Direct</span>
            </div>
            <div className="hero-trust-item">
              <span className="hero-trust-dot" />
              <span>Partner-Led Delivery</span>
            </div>
            <div className="hero-trust-item">
              <span className="hero-trust-dot" />
              <span>On-Site Across Gujarat</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Clean & Elevated Direct Practice Console */}
        <motion.div
          className="hero-console-col"
          variants={fadeUp}
          custom={0.22}
          initial="hidden"
          animate={loaded ? 'show' : 'hidden'}
          style={{ perspective: 1200 }}
        >
          <TiltHeroCard>
            {/* Header */}
            <div className="shc-header">
              <div className="shc-identity">
                <div className="shc-logo">K</div>
                <div>
                  <div className="shc-brand">Kshetragya Cybersec</div>
                  <div className="shc-sub">Ahmedabad, Gujarat · Direct Practice</div>
                </div>
              </div>
              <div className="shc-status">
                <span className="shc-dot" />
                <span>PARTNER ACTIVE</span>
              </div>
            </div>

            {/* Live Security Practice Ticker Bar */}
            <div className="shc-telemetry-bar">
              <span className="shc-telemetry-item">0% OUTSOURCED</span>
              <span className="shc-telemetry-item">MUTUAL NDA</span>
              <span className="shc-telemetry-item">AHMEDABAD HQ</span>
            </div>

            {/* Core Practice Lines with High-Contrast Cyber Badges */}
            <div className="shc-services-list">
              <div className="shc-service-item">
                <span className="shc-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shc-icon-svg">
                    <path d="M12 2.5l8 3.5v6c0 5-3.5 9.5-8 10.5-4.5-1-8-5.5-8-10.5V6L12 2.5z" strokeLinejoin="round" />
                    <path d="M8.5 12l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="shc-service-content">
                  <div className="shc-service-name-row">
                    <span className="shc-service-name">Network &amp; Perimeter Firewalls</span>
                    <span className="shc-service-pill">L2/L3 &amp; Cat6A</span>
                  </div>
                  <div className="shc-service-desc">FortiGate / Sophos XGS configuration, managed switches &amp; Cat6A structured cabling</div>
                </div>
              </div>

              <div className="shc-service-item">
                <span className="shc-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shc-icon-svg">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="shc-service-content">
                  <div className="shc-service-name-row">
                    <span className="shc-service-name">Web VAPT &amp; Network VA</span>
                    <span className="shc-service-pill">OWASP &amp; CVEs</span>
                  </div>
                  <div className="shc-service-desc">Vulnerability scans, low-disruption audits &amp; manual web exploitation</div>
                </div>
              </div>

              <div className="shc-service-item">
                <span className="shc-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shc-icon-svg">
                    <path d="M12 3v18M3 8l9-4 9 4M5 16l4-8M19 16l-4-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="shc-service-content">
                  <div className="shc-service-name-row">
                    <span className="shc-service-name">Cloud &amp; Compliance Audits</span>
                    <span className="shc-service-pill">DPDP &amp; ISO 27001</span>
                  </div>
                  <div className="shc-service-desc">DPDP Act 2023 readiness, ISO 27001 gap analysis &amp; AWS/Azure IAM least-privilege</div>
                </div>
              </div>
            </div>

            {/* Partner Direct Commitments */}
            <div className="shc-trust-strip">
              <div className="shc-trust-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shc-check">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                3 Technical Partners
              </div>
              <div className="shc-trust-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shc-check">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Direct Scoping &amp; Retest
              </div>
              <div className="shc-trust-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shc-check">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Pan-India Delivery
              </div>
            </div>

            {/* CTA */}
            <div className="shc-footer">
              <a href="#contact" className="shc-cta-btn">
                Request Free Assessment ↗
              </a>
              <span className="shc-note">Mutual NDA signed prior to technical discovery</span>
            </div>
          </TiltHeroCard>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Cue */}
      <div className="hero-scroll-cue">
        <span className="scroll-cue-lbl">Explore Services &amp; Methodology</span>
        <span className="scroll-cue-arrow" aria-hidden="true">↓</span>
      </div>
    </section>
  );
}
