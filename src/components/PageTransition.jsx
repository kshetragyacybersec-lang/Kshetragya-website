import { motion } from 'motion/react';

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const variants = {
  initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } },
  exit: reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

/** Wraps a route's page in a Motion fade/slide that plays on route change,
 * on top of any fade-in a page already does internally via usePageFadeIn. */
export default function PageTransition({ children }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
