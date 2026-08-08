import { useEffect, useRef } from 'react';

/**
 * Adds a subtle "magnetic" cursor-follow pull to the returned ref's element:
 * on desktop hover, the element shifts a few px toward the cursor and
 * springs back on leave. No-ops on touch devices and for
 * prefers-reduced-motion, and layers on top of any existing CSS
 * press/scale transitions (it only ever sets a translate, never touches
 * other transform values or colors).
 */
export function useMagnetic(strength = 0.35, max = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (reduceMotion || isTouch) return;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const x = Math.max(Math.min(relX * strength, max), -max);
      const y = Math.max(Math.min(relY * strength, max), -max);
      el.style.setProperty('--mag-x', `${x}px`);
      el.style.setProperty('--mag-y', `${y}px`);
    }

    function onLeave() {
      el.style.setProperty('--mag-x', '0px');
      el.style.setProperty('--mag-y', '0px');
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, max]);

  return ref;
}
