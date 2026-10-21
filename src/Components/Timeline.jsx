// =====================================================================
// Timeline.jsx  →  ITO ANG "FRONTEND" (MAIN) FILE
// Dito yung itsura (design). Yung content at scroll logic ay galing sa
// Motion/Usetimelinescroll.jsx
//
// DESIGN NOTES:
//  - Kita Shinsuke vibe  → malinis, pantay-pantay ang spacing, isang accent
//    color lang, kalmado ang animation (walang magulo o sobrang flashy).
//  - Persona 3 Reload vibe → dark navy background, cyan glow, angled
//    (hiwa-hiwang) corners, bold + italic na uppercase na titles.
// =====================================================================

import {
  timelineIntro,
  timelineSteps,
  timelineDescription,
  useTimelineScroll,
} from "./Motion/Usetimelinescroll";

// Angled na hugis ng card (parang Persona UI). Pwede mong baguhin yung % kung gusto.
const ANGLED_SHAPE =
  "[clip-path:polygon(0_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%)]";

export default function Timeline() {
  // Kunin yung logic galing sa isang file
  const { containerRef, iconRefs, line, activeCount } = useTimelineScroll();

  return (
    <section className="w-full bg-wbg dark:bg-dbg px-4 py-10 sm:px-6 lg:px-8 text-white">

      {/* ================= MAIN DESCRIPTION (taas) ================= */}
      <header className=" w-full mx-auto max-w-7xl mb-24 text-center">

        <p className="mb-7 text-sm font-bold font-poppins tracking-[0.5em] text-secondary dark:text-white   ">
          {timelineIntro.label}
        </p>

        <h2 className="mb-4 text-4xl font-black font-poppins uppercase tracking-wide text-primary">
          {timelineIntro.title}
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-300">{timelineIntro.text}</p>
      </header>

      {/* ================= TIMELINE ================= */}
      {/* containerRef = para malaman ng logic kung nasaan yung timeline */}
      <div ref={containerRef} className="relative mx-auto max-w-4xl">
        {/* ---- LINE sa gitna ---- */}
        {/* Mobile: nasa kaliwa (left-6). Desktop (md): nasa gitna (left-1/2). */}
        <div
          className="absolute left-6 w-[3px] -translate-x-1/2 bg-slate-700/60 md:left-1/2"
          style={{ top: line.top, height: line.height }}
        >
          {/* Yung kulay na tumataas habang nag-i-scroll */}
          <div
            className="w-full bg-alternative shadow-[0_0_14px_#1269cc]"
            style={{ height: line.fill }}
          />
        </div>

        {/* ---- MGA STEPS ---- */}
        <div className="flex flex-col gap-8">
          {timelineSteps.map((step, index) => {
            // Active na ba yung step na to? (naabot na ba ng kulay)
            const isActive = index < activeCount;

            // Pang-odd (1st, 3rd, 5th) = KALIWA, pang-even (2nd, 4th, 6th) = KANAN
            const isLeft = index % 2 === 0;

            return (
              <div
                key={step.title}
                // Grid: Mobile = 2 columns (icon | card)
                //       Desktop = 3 columns (kaliwa | icon sa gitna | kanan)
                className="grid grid-cols-[48px_1fr] items-center md:grid-cols-[1fr_72px_1fr]"
              >
                {/* ---- ICON (nasa gitna) ---- */}
                <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <div
                    // Ilalagay natin sa iconRefs para masukat ng logic
                    ref={(el) => (iconRefs.current[index] = el)}
                    className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl transition-all duration-500 md:h-14 md:w-14 ${
                      isActive
                        ? "border-alternative bg-alternative text-[#050b1f] shadow-[0_0_22px_#22d3ee]"
                        : "border-slate-600 bg-secondary text-slate-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* ---- CARD (content ng step) ---- */}
                <div
                  className={`col-start-2 row-start-1 pl-4 transition-all duration-500 md:pl-0 ${
                    isLeft
                      ? "md:col-start-1 md:pr-10 md:text-right"
                      : "md:col-start-3 md:pl-10 md:text-left"
                  } ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-40"
                  }`}
                >
                  <div
                    className={`border-l-4 bg-secondary p-6 transition-colors duration-500 ${ANGLED_SHAPE} ${
                      isActive ? "border-alternative" : "border-primary/20"
                    }`}
                  >
                    {/* Step number: 01, 02, 03... */}
                    <p
                      className={`mb-2 text-xs font-bold font-poppins tracking-[0.3em] transition-colors duration-500 ${
                        isActive ? "text-alternative" : "text-slate-500"
                      }`}
                    >
                      STEP {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mb-2 text-2xl font-black font-poppins uppercase">
                      {step.title}
                    </h3>
                    <p className="text-Ddescription/80">{step.text}</p>

                    {/* FOCUS / TOOLS line (maliit na detail sa baba ng text) */}
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      <span
                        className={`transition-colors duration-500 ${
                          isActive ? "text-cyan-400" : "text-slate-500"
                        }`}
                      >
                        {step.tagLabel}
                      </span>
                      {" · "}
                      {step.tagValue}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= DESCRIPTION (italic, baba) ================= */}
      <footer className="mx-auto mt-10 max-w-2xl pt-10 text-center">
        <p className="text-lg italic font-poppins text-secondary/80 dark:text-Ddescription/80">{timelineDescription}</p>
      </footer>
    </section>
  );
}