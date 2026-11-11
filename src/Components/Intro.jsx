import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function useScrollLock() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
}

function useIntroProgress({ duration, reduce, onComplete }) {
  const [progress, setProgress] = useState(0);

  // Keeps the timer from restarting when the parent re-renders
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const total = reduce ? 600 : duration;
    const hold = reduce ? 100 : 450;
    const start = performance.now();
    let raf;
    let holdTimer;

    const tick = (now) => {
      const t = Math.min((now - start) / total, 1);
      setProgress(Math.round(easeOutCubic(t) * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      holdTimer = setTimeout(() => onCompleteRef.current?.(), hold);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
    };
  }, [duration, reduce]);

  return progress;
}

function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 h-[420px] w-[420px] rounded-full bg-alternative/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(18,105,204,0.06)_100%)]"
      />
    </>
  );
}

function ProgressLine({ progress }) {
  return (
    <div className="mt-10 h-px w-full max-w-xs bg-secondary/10">
      <div
        className="h-full origin-left bg-gradient-to-r from-primary to-alternative"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Counter({ progress }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="absolute bottom-6 right-6 font-poppins text-sm tabular-nums text-Ldescription/70 sm:bottom-8 sm:right-8"
    >
      {String(progress).padStart(3, "0")}
    </motion.span>
  );
}

function Intro({ onComplete, duration = 2400 }) {
  const reduce = useReducedMotion();
  const progress = useIntroProgress({ duration, reduce, onComplete });

  useScrollLock();

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: reduce ? 0.2 : 1, ease: smoothEase },
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-wbg"
    >
      <Backdrop />

      <div className="relative flex w-full max-w-xl flex-col items-center px-6 text-center">
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

        <ProgressLine progress={progress} />
      </div>

      <Counter progress={progress} />
    </motion.div>
  );
}

export default Intro;