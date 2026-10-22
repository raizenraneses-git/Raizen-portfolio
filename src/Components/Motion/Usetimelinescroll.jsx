// =====================================================================
// Usetimelinescroll.jsx  →  ITO ANG "LOGIC" FILE
// Dito nakalagay:
//   1. Yung CONTENT mo (title, steps, description)  → palitan mo lang dito
//   2. Yung SCROLL LOGIC (para magkulay yung line at icons)
// =====================================================================

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------
// 1. CONTENT
// ---------------------------------------------------------------------

// Main Description (nasa taas)
export const timelineIntro = {
  label: "MY WORKFLOW",
  title: "A simple process, done with care.",
  text: "My approach to designing and developing websites, from planning to the final result.",
};

// Yung 6 steps. Pwede kang magdagdag o magbawas, kusa siyang aayon.
// icon     = pwede emoji, letter, o number. (Pwede mo palitan ng real icons later)
// tagLabel = yung "FOCUS" o "TOOLS" na maliit na word
// tagValue = yung kasunod na detail
export const timelineSteps = [
  {
    icon: "",
    title: "Understand",
    text: "I take time to understand the task, its purpose, and what needs to be accomplished.",
    tagLabel: "FOCUS",
    tagValue: "Clarity and Preparation",
  },
  {
    icon: "",
    title: "Prepare",
    text: "I organize my tasks, set priorities, and make sure I have a clear direction before getting started.",
    tagLabel: "FOCUS",
    tagValue: "Organization and Planning",
  },
  {
    icon: "",
    title: "Work with Purpose",
    text: "I approach each task carefully, paying attention to the details and keeping the goal in mind.",
    tagLabel: "FOCUS",
    tagValue: "Care and Consistency",
  },
  {
    icon: "",
    title: "Review",
    text: "I check my work, identify mistakes, and make the necessary adjustments before considering it complete.",
    tagLabel: "FOCUS",
    tagValue: "Accuracy and Responsibility",
  },
  {
    icon: "",
    title: "Improve",
    text: "I learn from the process, build on what I know, and work on becoming more consistent over time.",
    tagLabel: "FOCUS",
    tagValue: "Learning and steady Improvement",
  },
];

// Italic description (nasa baba)
export const timelineDescription =
  "I believe good work comes from understanding the task, paying attention to details, and consistently improving along the way.";

// ---------------------------------------------------------------------
// 2. SCROLL LOGIC
// ---------------------------------------------------------------------
// Ano ginagawa nito?
//   - Naglalagay ng imaginary "trigger line" sa gitna ng screen.
//   - Habang nag-i-scroll ka pababa, yung kulay ng linya sumusunod sa trigger line.
//   - Kapag naabot na ng kulay yung isang icon, ina-"active" yung step na yun.
//
// Ibinabalik niya (return):
//   containerRef → ilagay sa pinaka-labas na div ng timeline
//   iconRefs     → ilagay sa bawat icon (para alam natin kung nasaan sila)
//   line         → { top, height, fill } para sa linya (sa pixels)
//   activeCount  → ilang steps na yung "active" na (naabot na ng kulay)
export function useTimelineScroll() {
  const containerRef = useRef(null); // reference sa buong timeline
  const iconRefs = useRef([]); // listahan ng reference sa bawat icon

  const [line, setLine] = useState({ top: 0, height: 0, fill: 0 });
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    function update() {
      const container = containerRef.current;
      const icons = iconRefs.current.filter(Boolean); // tanggalin yung walang laman
      if (!container || icons.length === 0) return;

      const containerTop = container.getBoundingClientRect().top;

      // Kunin yung gitna (center) ng bawat icon, relative sa taas ng container
      const centers = icons.map((icon) => {
        const r = icon.getBoundingClientRect();
        return r.top + r.height / 2 - containerTop;
      });

      const firstCenter = centers[0];
      const lastCenter = centers[centers.length - 1];

      // Trigger line = 50% ng taas ng screen. Pwede mong baguhin (0.5 → 0.6, etc.)
      const triggerY = window.innerHeight * 0.5 - containerTop;

      // Gaano kahaba na yung kulay? (hindi lalampas sa una at huling icon)
      const fill = Math.min(
        Math.max(triggerY - firstCenter, 0),
        lastCenter - firstCenter
      );

      // Bilangin kung ilang icons na yung naabot
      let count = 0;
      centers.forEach((c) => {
        if (triggerY >= c) count += 1;
      });

      setLine({ top: firstCenter, height: lastCenter - firstCenter, fill });
      setActiveCount(count);
    }

    update(); // takbo agad pagka-load
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Cleanup: tanggalin yung listeners kapag nawala yung component
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { containerRef, iconRefs, line, activeCount };
}