import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref's container and adds
 * a `.reveal-in` class to each descendant matched by `itemSelector` as it
 * scrolls into view. Respects prefers-reduced-motion by revealing everything
 * immediately with no animation.
 */
export function useScrollReveal(itemSelector) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      items.forEach((el) => el.classList.add('reveal-in'));
      return;
    }

    items.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [itemSelector]);

  return containerRef;
}
