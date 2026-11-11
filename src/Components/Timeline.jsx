import { useEffect, useRef, useState } from "react";
import {
  timelineIntro,
  timelineSteps,
  useTimelineScroll,
} from "./Motion/Usetimelinescroll";

/* ---------- Constants ---------- */

const SMOOTH = "transition-all duration-500 ease-out";

const CARD_WIDTH = 340; // px, desktop card width
const CARD_GAP = 24; // px
const STICKY_TOP = 40; // px from the top of the screen while pinned

/* ---------- Hooks ---------- */

// Desktop only: pins the row and maps vertical scroll to horizontal travel
function useRowScroll(total) {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [travel, setTravel] = useState(0);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH);
  const [stickyHeight, setStickyHeight] = useState(0);

  useEffect(() => {
    function update() {
      if (!trackRef.current || !wrapRef.current) return;

      const wrapWidth = wrapRef.current.offsetWidth;

      if (stickyRef.current) setStickyHeight(stickyRef.current.offsetHeight);

      const cw = Math.min(CARD_WIDTH, wrapWidth * 0.8);
      setCardWidth(cw);

      const rowW = total * cw + (total - 1) * CARD_GAP;
      const distance = Math.max(0, rowW - wrapWidth);
      setTravel(distance);

      const scrolled = STICKY_TOP - trackRef.current.getBoundingClientRect().top;
      const p = distance > 0 ? scrolled / distance : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [total]);

  // Card width changes how the text wraps, so re-measure the height
  useEffect(() => {
    if (stickyRef.current) setStickyHeight(stickyRef.current.offsetHeight);
  }, [cardWidth]);

  return {
    trackRef,
    wrapRef,
    stickyRef,
    progress,
    travel,
    cardWidth,
    stickyHeight,
  };
}

/* ---------- Small components ---------- */

function StepIcon({ icon, isActive, iconRef }) {
  return (
    <div
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

function StepCard({ step, index, isActive }) {
  return (
    <div
      className={`pl-4 md:h-full md:w-full md:pl-0 md:pt-6 ${SMOOTH} ${
        isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-40"
      }`}
    >
      <div
        className={`h-full rounded-2xl border bg-wbg p-5 transition-colors duration-500 md:p-8 dark:bg-dbg ${
          isActive ? "border-primary" : "border-primary/30"
        }`}
      >
        <p className="mb-2 font-poppins text-xs font-bold tracking-widest text-primary">
          STEP {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="mb-3 break-words text-left font-poppins text-2xl font-bold text-secondary dark:text-white">
          {step.title}
        </h3>

        <p className="text-justify font-poppins text-xs text-Ldescription md:text-sm dark:text-Ddescription">
          {step.text}
        </p>

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

function TimelineIntro() {
  // Last word of the title gets the primary color
  const words = timelineIntro.title.split(" ");
  const last = words.pop();
  const first = words.join(" ");

  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl">
        <div className="flex font-poppins text-2xl text-primary sm:text-3xl lg:text-3xl">
          {timelineIntro.label}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl sm:mt-8 lg:mt-10">
        <div className="flex flex-col font-poppins text-[38px] font-bold sm:text-[50px] lg:text-[64px]">
          {first && <span className="text-secondary dark:text-white">{first}</span>}
          <span className="text-primary">{last}</span>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-7xl">
        <p className="max-w-2xl font-poppins text-xs text-Ldescription sm:text-sm dark:text-Ddescription">
          {timelineIntro.text}
        </p>
      </div>
    </>
  );
}

/* ---------- Mobile (vertical) ---------- */

function MobileTimeline() {
  const { containerRef, iconRefs, line, activeCount } = useTimelineScroll();

  return (
    <div ref={containerRef} className="relative mx-auto mt-10 max-w-7xl md:hidden">
      <div
        className="absolute left-7 w-[2px] -translate-x-1/2 bg-primary/20"
        style={{ top: line.top, height: line.height }}
      >
        <div className="w-full bg-primary" style={{ height: line.fill }} />
      </div>

      <div className="flex flex-col gap-5">
        {timelineSteps.map((step, index) => (
          <div
            key={step.title}
            className="grid grid-cols-[56px_1fr] items-start"
          >
            <div className="flex justify-center">
              <StepIcon
                icon={step.icon}
                isActive={index < activeCount}
                iconRef={(el) => (iconRefs.current[index] = el)}
              />
            </div>

            <StepCard step={step} index={index} isActive={index < activeCount} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Desktop (horizontal, follows scroll) ---------- */

// The track is tall; the sticky box inside it stays pinned while the row slides sideways
function DesktopTimeline() {
  const total = timelineSteps.length;
  const { trackRef, wrapRef, stickyRef, progress, travel, cardWidth, stickyHeight } =
    useRowScroll(total);

  const rowWidth = total * cardWidth + (total - 1) * CARD_GAP;
  const activeCount = Math.min(total, Math.floor(progress * total) + 1);
  const rowFill = total > 1 ? (activeCount - 1) / (total - 1) : 0;

  return (
    <div
      ref={trackRef}
      className="relative mt-10 hidden md:block"
      style={{ height: stickyHeight + travel }}
    >
      <div
        ref={stickyRef}
        className="sticky overflow-hidden"
        style={{ top: STICKY_TOP }}
      >
        <div ref={wrapRef} className="mx-auto w-full max-w-7xl">
          <div
            className="relative will-change-transform"
            style={{
              width: rowWidth,
              transform: `translateX(-${progress * travel}px)`,
            }}
          >
            <div
              className="absolute top-7 h-[2px] -translate-y-1/2 bg-primary/20"
              style={{ left: cardWidth / 2, right: cardWidth / 2 }}
            >
              <div
                className={`h-full bg-primary ${SMOOTH}`}
                style={{ width: `${rowFill * 100}%` }}
              />
            </div>

            <div className="flex" style={{ gap: CARD_GAP }}>
              {timelineSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex shrink-0 flex-col items-center"
                  style={{ width: cardWidth }}
                >
                  <StepIcon icon={step.icon} isActive={index < activeCount} />
                  <StepCard
                    step={step}
                    index={index}
                    isActive={index < activeCount}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Timeline ---------- */

export default function Timeline() {
  return (
    <section className="w-full bg-wbg-soft px-6 py-10 sm:px-6 lg:px-8 dark:bg-dbg-soft">
      <TimelineIntro />
      <MobileTimeline />
      <DesktopTimeline />
    </section>
  );
}