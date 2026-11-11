import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Same easing as your Hero para consistent ang feel
const smoothEase = [0.22, 1, 0.36, 1];

/**
 * Intro (light version)
 * Props:
 *  - onComplete: tinatawag kapag tapos na ang loading + hold
 *  - duration:   haba ng progress sa ms (default 2400)
 */
function Intro({ onComplete, duration = 2400 }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // FIX: itago ang latest onComplete sa ref para hindi na mag-restart / makansela
  // ang timer kapag nag re-render ang parent (kahit nasa hold na).
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Lock scroll habang naka-intro
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Progress 0 -> 100, hold sandali, then onComplete (isang beses lang tatakbo)
  useEffect(() => {
    const total = reduce ? 600 : duration;
    const hold = reduce ? 100 : 450;
    let raf;
    let holdTimer;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / total, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        holdTimer = setTimeout(() => onCompleteRef.current?.(), hold);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
    };
  }, [duration, reduce]);

  return (
    <motion.div
      // Curtain: umaangat paitaas pag-exit (AnimatePresence sa parent)
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: reduce ? 0.2 : 1, ease: smoothEase } }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-wbg"
    >
      {/* Soft shading: malabong glow ng primary at alternative sa light bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 h-[420px] w-[420px] rounded-full bg-alternative/25 blur-[140px]"
      />
      {/* Very light vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(18,105,204,0.06)_100%)]"
      />

      {/* Center content */}
      <div className="relative flex w-full max-w-xl flex-col items-center px-6 text-center">
        {/* Name (mask reveal, same style as Hero) */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: smoothEase, delay: 0.2 }}
            className="font-poppins text-4xl font-bold leading-tight tracking-tight text-secondary sm:text-6xl"
          >
            Raizen Rañeses
          </motion.h1>
        </div>

        {/* Progress line */}
        <div className="mt-10 h-px w-full max-w-xs bg-secondary/10">
          <div
            className="h-full origin-left bg-gradient-to-r from-primary to-alternative"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Counter sa sulok */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-6 right-6 font-poppins text-sm tabular-nums text-Ldescription/70 sm:bottom-8 sm:right-8"
      >
        {String(progress).padStart(3, "0")}
      </motion.span>
    </motion.div>
  );
}

export default Intro;