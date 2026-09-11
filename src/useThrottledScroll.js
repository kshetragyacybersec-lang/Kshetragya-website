import { useEffect } from 'react';

/**
 * Runs `callback` at most once per animation frame while the user scrolls
 * (and, optionally, on resize), using the standard rAF "ticking" throttle
 * pattern. Consolidates a pattern that was previously duplicated between
 * Hero.jsx's parallax effect and Process.jsx's timeline-connector fill.
 *
 * `callback` is called once immediately on mount as well, so the caller
 * doesn't need a separate initial call.
 */
export function useThrottledScroll(callback, { onResize = false, deps = [] } = {}) {
  useEffect(() => {
    let ticking = false;
    function tick() {
      ticking = false;
      callback();
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    }
    callback();
    window.addEventListener('scroll', onScroll, { passive: true });
    if (onResize) window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (onResize) window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
