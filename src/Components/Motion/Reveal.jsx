import { motion, useReducedMotion } from 'framer-motion';

/* Constants */

const EASE = [0.22, 1, 0.36, 1];

const OFFSETS = {
  left: { x: -70, y: 0 },
  right: { x: 70, y: 0 },
  bottom: { x: 0, y: 60 }
};

/* Reveal: wraps a group and staggers its RevealItems once in view */

export function Reveal({ children, stagger = 0.18, className = '' }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } }
      }}
    >
      {children}
    </motion.div>
  );
}

/* RevealItem: from = 'left' | 'right' | 'bottom' */

export function RevealItem({ children, from = 'bottom', className = '' }) {
  const reduce = useReducedMotion();
  const start = OFFSETS[from];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, ...start, scale: 0.96, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 1, ease: EASE },
          // clears the filter so tilt/3D effects inside children aren't broken
          transitionEnd: { filter: 'none' }
        }
      }}
    >
      {children}
    </motion.div>
  );
}