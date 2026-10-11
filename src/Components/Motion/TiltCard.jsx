
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";

function TiltCard({ children, max = 12, glare = true, className = "" }) {
  const cardRef = useRef(null);

  // Store the card's rotation
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Make the rotation smooth
  const smoothX = useSpring(rotateX, {
    stiffness: 200,
    damping: 15,
  });

  const smoothY = useSpring(rotateY, {
    stiffness: 200,
    damping: 15,
  });

  // Store the glare's position
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const glareBackground = useMotionTemplate`
    radial-gradient(
      circle at ${glareX}% ${glareY}%,
      var(--tilt-glare),
      transparent 50%
    )
  `;

  // Run when the mouse moves over the card
  function handleMouseMove(event) {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    // Find the mouse position inside the card (0 to 1)
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // Calculate the rotation
    rotateY.set((x - 0.5) * max);
    rotateX.set((0.5 - y) * max);

    // Move the glare with the mouse
    glareX.set(x * 100);
    glareY.set(y * 100);
  }

  // Reset the card when the mouse leaves
  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformPerspective: 1000,
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
