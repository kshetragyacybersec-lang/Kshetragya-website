import { useEffect, useState } from 'react';

/**
 * Brief fade-in on mount so navigating between pages doesn't feel like an
 * abrupt jump. Skipped for prefers-reduced-motion. Returns the class string
 * to apply to the page's root element.
 *
 * `deps` lets a page re-trigger the fade when its own key content changes
 * without unmounting (e.g. ServiceDetail re-fading when :slug changes).
 */
export function usePageFadeIn(deps = []) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return `page-fade${visible ? ' page-fade-in' : ''}`;
}
