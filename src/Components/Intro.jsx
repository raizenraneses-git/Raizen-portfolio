
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function Intro() {
  const [showIntro, setShowIntro] = useState(
    () => sessionStorage.getItem("portfolio-intro") !== "played"
  );

  useEffect(() => {
    if (!showIntro) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("portfolio-intro", "played");
      setShowIntro(false);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("portfolio-intro", "played");
      setShowIntro(false);
    }, 4300);

    return () => clearTimeout(timer);
  }, [showIntro]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="persona-intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#00183E] text-white"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#1269CC35,transparent_45%)]" />

          {/* Moon / Circular reveal */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute right-[-100px] top-[10%] h-[300px] w-[300px] rounded-full border border-blue-400/30 bg-[#1269CC]/10 shadow-[0_0_100px_#1269CC30] sm:right-[10%] sm:h-[420px] sm:w-[420px]"
          />

          {/* Diagonal blue cinematic wipe */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "180%" }}
            transition={{
              delay: 2.5,
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-y-[-50%] left-[-20%] w-[35%] rotate-[20deg] bg-[#1269CC]/20"
          />

          {/* Vertical label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 rotate-180 text-[10px] tracking-[0.4em] text-blue-300 [writing-mode:vertical-rl]"
          >
            THE BEGINNING OF SOMETHING NEW
          </motion.p>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/60 bg-[#1269CC]/10"
            >
              <span className="text-3xl font-bold text-white">
                R.
              </span>
            </motion.div>

            {/* Name reveal */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
                filter: "blur(15px)",
                letterSpacing: "0.6em",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: "0.2em",
              }}
              transition={{
                delay: 0.6,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-poppins text-2xl font-bold sm:text-5xl"
            >
              RAIZEN
              <span className="text-[#1269CC]"> RANESES</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-4 text-[10px] tracking-[0.35em] text-blue-200 sm:text-xs"
            >
              INFORMATION TECHNOLOGY GRADUATE
            </motion.p>

            {/* Loading line */}
            <div className="mt-12 h-[2px] w-48 overflow-hidden bg-white/20">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 1.5,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="h-full origin-left bg-[#1269CC]"
              />
            </div>

            {/* Bottom text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mt-4 text-[9px] tracking-[0.4em] text-blue-300"
            >
              INITIALIZING PORTFOLIO...
            </motion.p>
          </div>

          {/* Corner details */}
          <div className="absolute bottom-8 left-8 text-[9px] tracking-widest text-white/40">
            RANESES / 2026
          </div>

          <div className="absolute bottom-8 right-8 text-[9px] tracking-widest text-white/40">
            WELCOME
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Intro;
