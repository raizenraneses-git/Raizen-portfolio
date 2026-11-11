import { motion, useReducedMotion } from "framer-motion";

import { SquigglyText } from "./Motion/SquigglyText";
import GridMotion from "./Motion/GridMotion";

import heroImage from "../assets/aboutMe/aboutMe.png";
import heroImage2 from "../assets/aboutMe/aboutMe2.png";
import heroImage3 from "../assets/aboutMe/aboutMe3.png";
import heroImage4 from "../assets/aboutMe/aboutMe4.png";
import heroImage5 from "../assets/aboutMe/aboutMe5.png";
import heroImage6 from "../assets/aboutMe/aboutMe6.png";
import heroImage7 from "../assets/aboutMe/aboutMe7.png";
import heroImage8 from "../assets/aboutMe/aboutMe8.png";
import heroImage9 from "../assets/aboutMe/aboutMe9.png";
import heroImage10 from "../assets/aboutMe/aboutMe10.png";

/* ---------- Data ---------- */

const gridItems = [
  heroImage10,
  heroImage9,
  heroImage8,
  heroImage7,
  heroImage6,
  heroImage5,
  heroImage4,
  heroImage3,
  heroImage2,
  heroImage,
];

const skills = [
  "HTML",
  "Figma",
  "CSS",
  "Javascript",
  "React.js",
  "Tailwind CSS",
  "Wordpress",
  "Elementor",
  "MySQL",
  "Canva",
];

const gridMotionProps = {
  items: gridItems,
  rows: 3,
  direction: "alternate",
  aspectRatio: 0.7,
  gap: 12,
  radius: 8,
  angle: -20,
  tilt: 0,
  speed: 50,
  parallax: 0.5,
  spotlight: 0.5,
  dim: 0.2,
  fade: 0.4,
  grayscale: false,
};

/* ---------- Styles ---------- */

const gridWrapperClass = "mx-auto h-[400px] w-full sm:h-[400px] lg:mr-2 lg:h-[520px]";

const contentClass = "mt-10 sm:mt-10 lg:mr-10 lg:mt-0";

const labelClass =
  "flex items-center gap-4 font-poppins text-2xl text-primary sm:text-[32px]";

const headlineClass =
  "mt-5 text-left font-poppins text-3xl font-bold text-secondary sm:mt-5 sm:text-5xl lg:mt-8 lg:text-5xl dark:text-white";

const paragraphClass =
  "text-justify font-poppins text-base leading-relaxed text-Ldescription sm:text-base sm:text-justify dark:text-Ddescription";

const chipListClass =
  "mx-auto mt-5 flex max-w-7xl flex-wrap gap-1 transition-all duration-300 sm:gap-2";

const chipClass =
  "mt-1 rounded-2xl bg-primary/20 p-2 text-center font-poppins text-xs text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg dark:text-Ddescription";

/* ---------- Motion ---------- */

const cinematicEase = [0.22, 1, 0.36, 1];

const passthrough = { hidden: {}, show: {} };

// Only clip-path and opacity, so GridMotion can still measure its container
const gridVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.3, ease: cinematicEase },
  },
};

const contentStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

const chipsStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const chipItem = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: cinematicEase },
  },
};

/* ---------- Sections ---------- */

// The outer wrapper has no curtain and only watches the viewport, so its size is always intact
function GridSide({ reduceMotion }) {
  return (
    <motion.div
      className={gridWrapperClass}
      variants={passthrough}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="h-full w-full" variants={gridVariants}>
        <GridMotion {...gridMotionProps} />
      </motion.div>
    </motion.div>
  );
}

function ContentSide({ reduceMotion }) {
  return (
    <motion.div
      className={contentClass}
      variants={contentStagger}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div variants={fadeUpItem} className={labelClass}>
        ABOUT ME
      </motion.div>

      <motion.div variants={fadeUpItem} className={headlineClass}>
        I like {" "}
        <SquigglyText stepDuration={60} scale={4} className="text-primary mr-3">
          clean
        </SquigglyText>
        designs and functional code.
      </motion.div>

      <motion.div variants={fadeUpItem} className={`${paragraphClass} mt-5 sm:mt-5 lg:mt-8`}>
        I focus on proper clean designs that emphasize simplicity, and
        performance transforming ideas into responsive and engaging digital
        experiences.
      </motion.div>

      <motion.div variants={fadeUpItem} className={`${paragraphClass} mt-5 sm:mt-5`}>
        I’m a Fresh Graduate Student in Information Technology from National
        Teachers College.
      </motion.div>

      <motion.div variants={chipsStagger} className={chipListClass}>
        {skills.map((skill) => (
          <motion.div key={skill} variants={chipItem}>
            <div className={chipClass}>{skill}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ---------- AboutMe ---------- */

function AboutMe() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="aboutMe"
      className="w-full bg-wbg-soft px-6 py-10 sm:px-6 lg:px-8 dark:bg-dbg-soft"
    >
      <div className="mx-auto mt-10 w-full max-w-7xl items-center sm:px-0 lg:px-0">
        <div className="mx-auto mt-10 grid max-w-7xl gap-10 sm:grid-cols-1 lg:grid-cols-2">
          <GridSide reduceMotion={reduceMotion} />
          <ContentSide reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;