import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaWordpress } from "react-icons/fa";
import { SiFigma, SiTailwindcss, SiElementor, SiMysql } from "react-icons/si";
import { FiCode, FiMonitor, FiBriefcase } from "react-icons/fi";

import TiltCard from "./Motion/TiltCard";
import InfiniteSpiral from "./Motion/InfiniteSpiral";
import { Reveal, RevealItem } from "./Motion/Reveal";

/* ---------- Data ---------- */

const headings = [
  {
    text: "What I Do",
    wrapperClass: "mx-auto mt-8 max-w-7xl items-center",
    textClass: "flex font-poppins text-2xl text-primary sm:text-3xl lg:text-3xl",
  },
  {
    text: "Services &",
    wrapperClass: "mx-auto mt-6 max-w-7xl items-center sm:mt-8 lg:mt-10",
    textClass:
      "flex font-poppins text-[40px] font-bold text-secondary sm:text-[52px] lg:text-[64px] dark:text-white",
  },
  {
    text: "Expertise",
    wrapperClass: "mx-auto max-w-7xl items-center",
    textClass:
      "flex font-poppins text-[40px] font-bold text-primary sm:text-[52px] lg:text-[64px]",
  },
];

// `size` and `tone` differ per card, so they live in the data
const services = [
  {
    title: "Web Development & Web Design",
    description:
      "Develops and Creating clean and user-friendly websites with a focus on both design and functionality",
    examples: ["Landing Page", "Events Page", "E-commerce Stores"],
    Icon: FiCode,
    iconClass: "bg-teal-100 text-teal-700",
    size: "text-xs",
    tone: "text-Ldescription dark:text-Ddescription",
    itemClass: "",
  },
  {
    title: "UI/UX Design",
    description:
      "Designs clean and functional interfaces that are easy to use and navigate. Ensures every design provides a smooth and enjoyable user experience.",
    examples: ["User Interface", "Mobile App Interface", "Web Interface"],
    Icon: FiMonitor,
    iconClass: "bg-cyan-100 text-cyan-700",
    size: "text-[12px]",
    tone: "dark:text-Ddescription",
    itemClass: "",
  },
  {
    title: "Freelancer",
    description:
      "Labels, reviews, and evaluates data to improve the accuracy and performance of AI and machine learning models. Ensures datasets meet quality standards through careful analysis and validation.",
    examples: ["AI Content Moderator", "Data Quality Specialist", "Data Annotator"],
    Icon: FiBriefcase,
    iconClass: "bg-blue-100 text-blue-700",
    size: "text-[12px]",
    tone: "dark:text-Ddescription",
    itemClass: "sm:col-span-2",
  },
];

const icons = [
  { id: "html", icon: FaHtml5, color: "#E34F26", alt: "HTML" },
  { id: "figma", icon: SiFigma, color: "#ff7262", alt: "Figma" },
  { id: "css", icon: FaCss3Alt, color: "#1572B6", alt: "CSS" },
  { id: "js", icon: FaJs, color: "#F7DF1E", alt: "JavaScript" },
  { id: "react", icon: FaReact, color: "#61DAFB", alt: "React.js" },
  { id: "tailwind", icon: SiTailwindcss, color: "#06B6D4", alt: "Tailwind CSS" },
  { id: "wordpress", icon: FaWordpress, color: "#21759B", alt: "WordPress" },
  { id: "elementor", icon: SiElementor, color: "#92003B", alt: "Elementor" },
  { id: "mysql", icon: SiMysql, color: "#4479A1", alt: "MySQL" },
];

const spiralProps = {
  items: icons,
  animationMode: "all",
  speed: 0.35,
  radius: 100,
  iconSize: 75,
  verticalSpacing: 60,
  perspective: 1,
  centerScale: 1,
  edgeBlur: 5,
  cardsPerTurn: 7,
  pauseOnHover: true,
  direction: "up",
  rotation: 0,
  cardTilt: 0,
  edgeFade: 1,
  imageFit: "cover",
  grayscale: 10,
};

/* ---------- Styles ---------- */

const gridClass =
  "mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3";

const cardClass =
  "h-full min-w-0 rounded-2xl border border-primary bg-wbg dark:bg-dbg";

const iconBaseClass = "ml-5 mt-5 h-15 w-15 rounded-2xl p-3.5";

const cardTitleClass =
  "break-words pl-5 pr-5 pt-5 text-left font-poppins text-2xl font-bold text-text text-secondary sm:pr-8 lg:pr-10 dark:text-white";

const cardDescriptionClass =
  "pl-5 pr-5 pt-5 text-justify font-poppins text-text sm:pr-8 lg:pr-10";

const cardListClass = "list-disc pb-5 pl-8 pr-5 pt-5 font-poppins text-text";

const spiralItemClass =
  "flex h-[400px] max-w-7xl sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:h-auto";

/* ---------- Components ---------- */

function SectionHeading() {
  return (
    <Reveal>
      {headings.map(({ text, wrapperClass, textClass }) => (
        <div key={text} className={wrapperClass}>
          <RevealItem from="bottom">
            <div className={textClass}>{text}</div>
          </RevealItem>
        </div>
      ))}
    </Reveal>
  );
}

function ServiceCard({ service }) {
  const { title, description, examples, Icon, iconClass, size, tone, itemClass } =
    service;

  return (
    <RevealItem from="bottom" className={`h-full min-w-0 ${itemClass}`}>
      <TiltCard className={cardClass}>
        <Icon className={`${iconBaseClass} ${iconClass}`} />

        <div className={cardTitleClass}>{title}</div>

        <div className={`${cardDescriptionClass} ${size} ${tone}`}>
          {description}
        </div>

        <ul className={`${cardListClass} ${size}`}>
          {examples.map((example) => (
            <li key={example} className={`marker:text-blue-500 ${tone}`}>
              {example}
            </li>
          ))}
        </ul>
      </TiltCard>
    </RevealItem>
  );
}

/* ---------- Skills ---------- */

function Skills() {
  return (
    <section className="w-full bg-wbg-soft px-6 py-10 sm:px-6 lg:px-8 dark:bg-dbg-soft">
      <SectionHeading />

      <Reveal>
        <div className={gridClass}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}

          <RevealItem from="right" className={spiralItemClass}>
            <InfiniteSpiral {...spiralProps} />
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}

export default Skills;