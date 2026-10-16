import React, { useId, useMemo } from "react";
import { motion, useTime, useTransform } from "motion/react";

export function SquigglyText({
  children,
  steps = 5,
  stepDuration = 80,
  scale = [6, 8],
  baseFrequency = 0.02,
  numOctaves = 3,
  as = "span",
  className = "",
  style = {},
}) {
  // Create a unique ID for this component
  const reactId = useId();

  // Remove special characters so the ID works in SVG filters
  const safeId = reactId.replace(/[:_]/g, "");

  // Create a unique ID for each filter
  const filterId = (i) => `squiggly-${safeId}-${i}`;

  // Create the list of filters
  const filters = useMemo(() => {
    return Array.from({ length: steps }, (_, i) => {
      return `url(#${filterId(i)})`;
    });
  }, [steps, safeId]);

  // Get the current animation time
  const time = useTime();

  // Change the filter as time passes
  const filter = useTransform(time, (t) => {
    const index = Math.floor(t / stepDuration) % filters.length;
    return filters[index];
  });

  // Get the scale for each filter
  const scaleAt = (i) => {
    if (Array.isArray(scale)) {
      return scale[i % scale.length];
    }

    return scale;
  };

  // Choose whether to render a span or div
  const Wrapper = as === "div" ? motion.div : motion.span;

  return (
    <>
      {/* SVG filters used by the animation */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {Array.from({ length: steps }, (_, i) => (
            <filter id={filterId(i)} key={i}>
              <feTurbulence
                baseFrequency={baseFrequency}
                numOctaves={numOctaves}
                result="noise"
                seed={i}
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={scaleAt(i)}
              />
            </filter>
          ))}
        </defs>
      </svg>

      {/* Animated text */}
      <Wrapper
        style={{ filter, ...style }}
        className={`inline-block ${className}`}
      >
        {children}
      </Wrapper>
    </>
  );
}