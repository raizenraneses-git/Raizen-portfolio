// new: Motion/Reveal.jsx
// Shared na scroll-reveal para magamit sa kahit anong section (Skills, About, atbp.)
// Ito rin ang galaw na ginamit sa Projects, kaya magkapareho ang pakiramdam ng buong portfolio.

import { motion, useReducedMotion } from "framer-motion";

// Easing na pang-"cinema". Mabilis ang simula, malambot ang hinto
const EASE = [0.22, 1, 0.36, 1];

// ===== Reveal =====
// Pambalot ng grupo. Kapag nakita na sa screen, sunod-sunod na lalabas ang mga <RevealItem> sa loob.
// Easy term: stagger = gaano katagal ang pagitan ng labas ng bawat item (seconds)
export function Reveal({ children, stagger = 0.18, className = "" }) {
    const reduce = useReducedMotion(); // kung ayaw ng user ng animation, fade lang

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"                        // lalabas kapag na-scroll na
            viewport={{ once: true, amount: 0.2 }}    // isang beses lang, 20% kita na
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduce ? 0 : stagger } },
            }}
        >
            {children}
        </motion.div>
    );
}

// ===== RevealItem =====
// Pambalot ng bawat piraso (title, card, image).
// Easy term: from="left" = papasok mula kaliwa, "right" = mula kanan, "bottom" = mula ibaba
// className = ilagay dito ang grid/layout classes kung kailangan (hal. "sm:col-span-2")
export function RevealItem({ children, from = "bottom", className = "" }) {
    const reduce = useReducedMotion();

    const start = {
        left:   { x: -70, y: 0 },
        right:  { x: 70,  y: 0 },
        bottom: { x: 0,   y: 60 },
    }[from];

    return (
        <motion.div
            className={className}
            variants={{
                hidden: reduce
                    ? { opacity: 0 }
                    : { opacity: 0, ...start, scale: 0.96, filter: "blur(8px)" }, // nakatago, malabo
                show: {
                    opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)",        // malinaw na
                    transition: { duration: 1, ease: EASE },
                    // Tanggalin ang filter pagkatapos para hindi masira ang tilt/3D effects sa loob
                    transitionEnd: { filter: "none" },
                },
            }}
        >
            {children}
        </motion.div>
    );
}