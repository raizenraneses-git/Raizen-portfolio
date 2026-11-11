import React, { useId, useMemo } from 'react';
import { motion, useTime, useTransform } from 'motion/react';

/* Component */

export function SquigglyText({
  children,

  steps = 5,
  stepDuration = 80,

  scale = [6, 8],
  baseFrequency = 0.02,
  numOctaves = 3,

  as = 'span',
  className = '',
  style = {}
}) {
  /* Filter ids */

  const reactId = useId();
  const safeId = reactId.replace(/[:_]/g, '');
  const filterId = i => `squiggly-${safeId}-${i}`;

  /* Derived values */

  const filters = useMemo(() => {
    return Array.from({ length: steps }, (_, i) => {
      return `url(#${filterId(i)})`;
    });
  }, [steps, safeId]);

  const scaleAt = i => {
    if (Array.isArray(scale)) {
      return scale[i % scale.length];
    }

    return scale;
  };

  const Wrapper = as === 'div' ? motion.div : motion.span;

  /* Motion */

  const time = useTime();

  const filter = useTransform(time, t => {
    const index = Math.floor(t / stepDuration) % filters.length;
    return filters[index];
  });

  /* Render */

  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {Array.from({ length: steps }, (_, i) => (
            <filter id={filterId(i)} key={i}>
              <feTurbulence baseFrequency={baseFrequency} numOctaves={numOctaves} result="noise" seed={i} />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={scaleAt(i)} />
            </filter>
          ))}
        </defs>
      </svg>

      <Wrapper style={{ filter, ...style }} className={`inline-block ${className}`}>
        {children}
      </Wrapper>
    </>
  );
}