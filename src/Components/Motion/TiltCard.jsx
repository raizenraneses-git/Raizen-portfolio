import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';

/* Constants */

const SPRING = { stiffness: 200, damping: 15 };

/* Component */

function TiltCard({ children, max = 12, glare = true, className = '' }) {
  /* Refs */

  const cardRef = useRef(null);

  /* Motion values */

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, SPRING);
  const smoothY = useSpring(rotateY, SPRING);

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBackground = useMotionTemplate`
    radial-gradient(
      circle at ${glareX}% ${glareY}%,
      var(--tilt-glare),
      transparent 50%
    )
  `;

  /* Handlers */

  function handleMouseMove(event) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateY.set((x - 0.5) * max);
    rotateX.set((0.5 - y) * max);

    glareX.set(x * 100);
    glareY.set(y * 100);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  /* Render */

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformPerspective: 1000
      }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {children}

      {glare && (
        <motion.div
          aria-hidden="true"
          style={{ background: glareBackground }}
          className="pointer-events-none absolute inset-0 dark:opacity-10 opacity-3"
        />
      )}
    </motion.div>
  );
}

export default TiltCard;