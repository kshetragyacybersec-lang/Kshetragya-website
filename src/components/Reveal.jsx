import { forwardRef } from 'react';
import { motion } from 'motion/react';

/**
 * Motion-powered replacement for the old IntersectionObserver-based
 * useScrollReveal hook. Wrap a list/grid container in <Reveal> and each
 * direct child in <Reveal.Item> to get a staggered fade+rise as the
 * container scrolls into view. Respects prefers-reduced-motion via
 * Motion's built-in support (transitions are skipped automatically by
 * the browser's reduced-motion media query through Motion's config,
 * but we also guard explicitly below for older versions).
 */
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduceMotion ? 0 : 0.07,
    },
  },
};

const item = {
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 26 },
  },
};

export const Reveal = forwardRef(function Reveal(
  { as: Tag = 'div', className, children, ...rest },
  ref
) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

function RevealItem({ as: Tag = 'div', className, style, children, ...rest }) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag className={className} style={style} variants={item} {...rest}>
      {children}
    </MotionTag>
  );
}

Reveal.Item = RevealItem;
