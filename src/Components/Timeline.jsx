// =====================================================================
// Timeline.clean.jsx  →  ROW (HORIZONTAL) + STYLE NG Skills.jsx
//
// Sinundan ko yung itsura ng Skills.jsx mo:
//  - Font       → font-poppins lang
//  - Colors     → text-primary, text-secondary / dark:text-white,
//                 text-Ldescription / dark:text-Ddescription, border-primary
//  - Spacing    → px-4 sm:px-6 lg:px-8 py-10, max-w-7xl, gap-5, p-5, mt-10
//  - Shape      → rounded-2xl (card at icon box)
//
// ROUTINE (3 hakbang):
//   1. HANDA → constants
//   2. HATI  → StepIcon at StepCard
//   3. AYOS  → Timeline (main)
//
// PAANO GUMAGANA YUNG SCROLL (desktop):
//   - Mataas na "track" (kasing taas ng layo na lalakbayin ng row).
//   - Sa loob, may "sticky" na parang bintana na nakadikit sa screen.
//   - Habang nag-i-scroll ka PABABA, umuusad PAKANAN ang row.
//   - Pag nakarating na sa huling step, tuloy na ulit pababa ang page.
//   - Walang scrollbar na lalabas, kasi hindi na horizontal scroll ito.
//
// Mobile = vertical pa rin (gamit ang useTimelineScroll mo).
// =====================================================================

import { useEffect, useRef, useState } from "react";
import {
  timelineIntro,
  timelineSteps,
  timelineDescription,
  useTimelineScroll,
} from "./Motion/Usetimelinescroll";

// =====================================================================
// 1. HANDA — mga constant
// =====================================================================

// Iisang bilis ng animation para pantay ang galaw ng lahat (kalmado).
const SMOOTH = "transition-all duration-500 ease-out";

// Lapad ng bawat card sa desktop (px). Palakihin kung gusto mong mas malapad.
const CARD_WIDTH = 340;

// Pagitan ng mga card (px). 24 = parang gap-6
const CARD_GAP = 24;

// Layo ng row mula sa taas ng screen habang nakadikit (px). 40 = parang top-10
const STICKY_TOP = 40;

// =====================================================================
// 2. HATI — maliliit na piraso
// =====================================================================

// ---- ICON (rounded square, parang icon box sa Skills) ----
// isActive = naabot na ba ng kulay yung step na ito
function StepIcon({ icon, isActive, iconRef }) {
  return (
    <div
      // Ilalagay natin sa iconRefs para masukat ng logic (mobile lang)
      ref={iconRef}
      className={`z-10 flex h-14 w-14 items-center justify-center rounded-2xl border text-xl ${SMOOTH} ${
        isActive
          ? "border-primary bg-blue-100 text-blue-700"
          : "border-primary/30 bg-slate-100 text-slate-400 dark:bg-slate-800"
      }`}
    >
      {icon}
    </div>
  );
}

// ---- CARD (content ng step) ----
function StepCard({ step, index, isActive }) {
  return (
    <div
      className={`pl-4 md:pl-0 md:pt-6 md:w-full md:h-full ${SMOOTH} ${
        isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-40"
      }`}
    >
      <div
        // Parehong card style ng Skills: border-primary at rounded-2xl
        className={`h-full rounded-2xl border p-5 md:p-8 transition-colors duration-500 ${
          isActive ? "border-primary" : "border-primary/30"
        }`}
      >
        {/* Step number: 01, 02, 03... */}
        <p className="mb-2 text-xs font-bold font-poppins tracking-widest text-primary">
          STEP {String(index + 1).padStart(2, "0")}
        </p>

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold font-poppins text-left break-words text-secondary dark:text-white">
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-poppins text-xs md:text-sm text-justify text-Ldescription dark:text-Ddescription">
          {step.text}
        </p>

        {/* FOCUS / TOOLS line (maliit na detail sa baba ng text) */}
        <p className="mt-5 font-poppins text-xs">
          <span className="font-bold text-primary">{step.tagLabel}</span>
          <span className="text-Ldescription dark:text-Ddescription">
            {" · "}
            {step.tagValue}
          </span>
        </p>
      </div>
    </div>
  );
}

// =====================================================================
// 3. AYOS — main component
// =====================================================================

export default function Timeline() {
  // ---- MOBILE: logic galing sa isang file (vertical) ----
  const { containerRef, iconRefs, line, activeCount: mobileActive } =
    useTimelineScroll();

  // ---- DESKTOP: sariling logic para sa pagsunod ng row sa scroll ----
  const trackRef = useRef(null); // yung mataas na kahon (para malaman kung gaano na tayo kalayo)
  const wrapRef = useRef(null); // yung bintana (para masukat ang lapad ng screen na kita)
  const stickyRef = useRef(null); // yung nakadikit na kahon (para masukat ang taas ng row)
  const [progress, setProgress] = useState(0); // 0 = simula, 1 = dulo
  const [travel, setTravel] = useState(0); // gaano kalayo lalakbayin ng row (px)
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH); // lapad ng card (liliit sa iPad)
  const [stickyHeight, setStickyHeight] = useState(0); // taas ng row (px)

  const total = timelineSteps.length;

  // Buong lapad ng row (lahat ng card + mga pagitan)
  const rowWidth = total * cardWidth + (total - 1) * CARD_GAP;

  useEffect(() => {
    // Tinatawag tuwing nag-i-scroll o nagbabago ang laki ng screen
    function update() {
      if (!trackRef.current || !wrapRef.current) return;

      const wrapWidth = wrapRef.current.offsetWidth;

      // Sukatin ang taas ng row para yun lang ang haba ng nakadikit na kahon
      if (stickyRef.current) setStickyHeight(stickyRef.current.offsetHeight);

      // Sa maliit na screen (iPad), liliit din ang card para kasya
      const cw = Math.min(CARD_WIDTH, wrapWidth * 0.8);
      setCardWidth(cw);

      // Layo ng lalakbayin = buong row - lapad ng bintana
      const rowW = total * cw + (total - 1) * CARD_GAP;
      const distance = Math.max(0, rowW - wrapWidth);
      setTravel(distance);

      // Ilang pixel na ang naitaas ng track palabas ng screen
      // (STICKY_TOP = dahil dumidikit tayo 40px mula sa taas ng screen)
      const scrolled = STICKY_TOP - trackRef.current.getBoundingClientRect().top;

      // progress = scrolled / distance, pero laging nasa 0 hanggang 1 lang
      const p = distance > 0 ? scrolled / distance : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Linis kapag nawala ang component
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [total]);

  // Kapag nagbago ang lapad ng card, nagbabago rin ang taas (nag-wrap ang text),
  // kaya sukatin ulit ang taas
  useEffect(() => {
    if (stickyRef.current) setStickyHeight(stickyRef.current.offsetHeight);
  }, [cardWidth]);

  // Ilang step na ang active sa desktop (base sa progress)
  // Halimbawa: 6 steps, progress 0.5 → floor(0.5 x 6) + 1 = 4
  const desktopActive = Math.min(total, Math.floor(progress * total) + 1);

  // Gaano na kahaba ang kulay ng horizontal na linya (0 hanggang 1)
  const rowFill = total > 1 ? (desktopActive - 1) / (total - 1) : 0;

  // Hatiin ang title: lahat ng salita maliban sa huli = secondary,
  // yung huling salita = primary (parang "Services &" / "Expertise" sa Skills)
  const titleWords = timelineIntro.title.split(" ");
  const titleLast = titleWords.pop();
  const titleFirst = titleWords.join(" ");

  return (
    <section className="w-full px-6 sm:px-6 lg:px-8 py-10 bg-secondary/2 dark:bg-dbg/98">

      {/* ================= MAIN DESCRIPTION (taas) ================= */}
      {/* Label (maliit) */}
      <div className="mx-auto max-w-7xl mt-8">
        <div className="flex font-poppins text-primary text-2xl sm:text-3xl lg:text-3xl">
          {timelineIntro.label}
        </div>
      </div>

      {/* Title (malaki, dalawang kulay) */}
      <div className="mx-auto max-w-7xl  mt-6 sm:mt-8 lg:mt-10">
        <div className="flex flex-col font-poppins font-bold text-[38px] sm:text-[50px] lg:text-[64px]">
          {titleFirst && (
            <span className="text-secondary dark:text-white">{titleFirst}</span>
          )}
          <span className="text-primary">{titleLast}</span>
        </div>
      </div>

      {/* Intro text */}
      <div className="mx-auto max-w-7xl mt-5">
        <p className="max-w-2xl font-poppins text-xs sm:text-sm text-Ldescription dark:text-Ddescription">
          {timelineIntro.text}
        </p>
      </div>

      {/* ================= TIMELINE — MOBILE (vertical) ================= */}
      {/* md:hidden = nakatago sa desktop */}
      <div ref={containerRef} className="relative mx-auto max-w-7xl mt-10 md:hidden">
        {/* ---- LINE: vertical, nasa kaliwa ---- */}
        <div
          className="absolute left-7 w-[2px] -translate-x-1/2 bg-primary/20"
          style={{ top: line.top, height: line.height }}
        >
          {/* Yung kulay na tumataas habang nag-i-scroll */}
          <div className="w-full bg-primary" style={{ height: line.fill }} />
        </div>

        {/* ---- MGA STEPS ---- */}
        <div className="flex flex-col gap-5">
          {timelineSteps.map((step, index) => {
            const isActive = index < mobileActive;

            return (
              <div
                key={step.title}
                className="grid grid-cols-[56px_1fr] items-start"
              >
                <div className="flex justify-center">
                  <StepIcon
                    icon={step.icon}
                    isActive={isActive}
                    iconRef={(el) => (iconRefs.current[index] = el)}
                  />
                </div>

                <StepCard step={step} index={index} isActive={isActive} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= TIMELINE — DESKTOP (row, sumusunod sa scroll) ================= */}
      {/* hidden md:block = desktop lang */}
      {/* TRACK: mataas na kahon. Taas = isang screen + layo ng lalakbayin ng row */}
      <div
        ref={trackRef}
        className="relative mt-10 hidden md:block"
        style={{ height: stickyHeight + travel }}
      >
        {/* STICKY: dumidikit sa screen habang tumatakbo ang track */}
        {/* overflow-hidden = para walang scrollbar at hindi lumabas ang mga card sa gilid */}
        {/* Kasing taas lang ng row (hindi na buong screen), kaya wala nang blangko sa baba */}
        <div
          ref={stickyRef}
          className="sticky overflow-hidden"
          style={{ top: STICKY_TOP }}
        >
          {/* WRAP: sukatan ng lapad ng bintana (max-w-7xl) */}
          <div ref={wrapRef} className="mx-auto w-full max-w-7xl">
            {/* ROW: ito ang gumagalaw pakaliwa habang nag-i-scroll pababa */}
            <div
              className="relative will-change-transform"
              style={{
                width: rowWidth,
                transform: `translateX(-${progress * travel}px)`,
              }}
            >
              {/* ---- LINE: horizontal, dumadaan sa gitna ng mga icon ---- */}
              {/* left/right = kalahati ng card, para magsimula at magtapos sa gitna ng icon */}
              <div
                className="absolute top-7 h-[2px] -translate-y-1/2 bg-primary/20"
                style={{ left: cardWidth / 2, right: cardWidth / 2 }}
              >
                <div
                  className={`h-full bg-primary ${SMOOTH}`}
                  style={{ width: `${rowFill * 100}%` }}
                />
              </div>

              {/* ---- MGA STEPS ---- */}
              <div className="flex" style={{ gap: CARD_GAP }}>
                {timelineSteps.map((step, index) => {
                  const isActive = index < desktopActive;

                  return (
                    <div
                      key={step.title}
                      // shrink-0 = para hindi lumiit ang card
                      className="flex shrink-0 flex-col items-center"
                      style={{ width: cardWidth }}
                    >
                      <StepIcon icon={step.icon} isActive={isActive} />
                      <StepCard step={step} index={index} isActive={isActive} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}