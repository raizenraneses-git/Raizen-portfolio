import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import { useSound } from "./Sound/soundControl";

import ProjectSDL from "./ProjectsInfo/ProjectSDL";
import ProjectPop from "./ProjectsInfo/ProjectPop";
import ProjectWP from "./ProjectsInfo/ProjectWP";
import ProjectHW from "./ProjectsInfo/ProjectHW";

import sdleeCover from "../assets/projects/project1.png";
import popCover from "../assets/projects/project2.png";
import wpCover from "../assets/projects/project3.png";
import hwCover from "../assets/projects/project4.png";

import sdleeOne from "../assets/sandreaLeeImages/image1.png";
import sdleeTwo from "../assets/sandreaLeeImages/image2.png";
import sdleeThree from "../assets/sandreaLeeImages/image3.png";
import sdleeFour from "../assets/sandreaLeeImages/image4.png";
import sdleeFive from "../assets/sandreaLeeImages/image5.png";

import popImageOne from "../assets/popImage/image1.png";
import popImageTwo from "../assets/popImage/image2.png";
import popImageThree from "../assets/popImage/image3.png";

import wpOne from "../assets/wpImage/image1.png";
import wpTwo from "../assets/wpImage/image2.png";
import wpThree from "../assets/wpImage/image3.png";
import wpFour from "../assets/wpImage/image4.png";

import hwOne from "../assets/hwImage/image1.png";
import hwTwo from "../assets/hwImage/image2.png";
import hwThree from "../assets/hwImage/image3.png";
import hwFour from "../assets/hwImage/image4.png";

/* ---------- Data ---------- */

// `reverse` puts the cover image on the right; `details` feeds the info modal
const projects = [
  {
    id: "sandreaLee",
    title: "Smart Automated Link & Operations Network",
    summary:
      "A salon management system designed to streamline appointment booking, online shopping, and administrative tasks through an intuitive user experience.",
    cover: sdleeCover,
    coverAlt: "Logo 1",
    tags: ["React.Js", "Node.Js", "Typescript", "Figma", "Canva"],
    github: "https://github.com/raizenraneses-git/SALON.git",
    reverse: false,
    textClass: "lg:mt-0 sm:mt-0",
    Modal: ProjectSDL,
    details: {
      name: "Smart Automated Link & Operations Network",
      description:
        "Collaborated with the development team on frontend implementation, interface prototyping, and technical documentation, contributing to the design and development of the salon management system.",
      images: [sdleeOne, sdleeTwo, sdleeThree, sdleeFour, sdleeFive],
      tools: ["React.Js", "Tailwind CSS", "Node.Js", "Typescript", "Figma", "Canva"],
    },
  },
  {
    id: "pop",
    title: "POP!",
    summary:
      "POP! by Inquirer is an online media platform that delivers fresh, entertaining, and trend-focused stories. Its content is presented in a more casual and creative style compared with traditional news, making it accessible to readers who are interested in current pop culture and internet trends.",
    cover: popCover,
    coverAlt: "Logo 2",
    tags: [
      "HTML",
      "CSS",
      "Bootstrap",
      "Wordpress",
      "Elementor",
      "Figma",
      "React.Js",
      "Tailwind CSS",
    ],
    github: "https://github.com/raizenraneses-git/Pop-.git",
    reverse: false,
    textClass: "lg:mt-0 sm:mt-0",
    Modal: ProjectPop,
    details: {
      name: "Pop!",
      description:
        "This was one of my final projects during my internship. I was assigned this task to strengthen my HTML and CSS fundamentals and learn how to build frontend pages using Elementor and WordPress with guidance from my team leader. Also for the sake of curiosity I tried using React and Tailwind Css.",
      images: [popImageOne, popImageTwo, popImageThree],
      tools: [
        "HTML",
        "CSS",
        "Bootstrap",
        "Elementor",
        "Wordpress",
        "Figma",
        "React.Js",
        "Tailwind Css",
      ],
    },
  },
  {
    id: "wp",
    title: "Women Of Power",
    summary:
      "Women of Power is a website created for Women’s Month that celebrates the achievements, and contributions of women. It features inspiring stories and highlights women who have made an impact in different fields. The website aims to recognize and empower women through a informative, and engaging design.",
    cover: wpCover,
    coverAlt: "Logo 3",
    tags: [
      "HTML",
      "CSS",
      "Bootstrap",
      "Elementor",
      "Wordpress",
      "Figma",
      "React.Js",
      "Tailwind CSS",
    ],
    github: "https://github.com/raizenraneses-git/Women-Power",
    reverse: true,
    textClass: "lg:mt-0 sm:mt-0",
    Modal: ProjectWP,
    details: {
      name: "Women Power",
      description:
        "Developed as my first internship project, this website allowed me to explore UI fundamentals and gain practical experience in translating design concepts into a functional web interface.",
      images: [wpOne, wpTwo, wpThree, wpFour],
      tools: [
        "HTML",
        "CSS",
        "Bootstrap",
        "Elementor",
        "Wordpress",
        "Figma",
        "React.Js",
        "Tailwind Css",
      ],
    },
  },
  {
    id: "hw",
    title: "Holy Week",
    summary:
      "Holy Week, or Semana Santa, is one of the most important religious observances in the Philippines, especially among Filipino Catholics. It commemorates the Passion, death, and resurrection of Jesus Christ, beginning with Palm Sunday and ending with Easter Sunday. For many Filipinos, it is a period of prayer, sacrifice, and family or community traditions.",
    cover: hwCover,
    coverAlt: "Logo 4",
    tags: [
      "HTML",
      "CSS",
      "Bootstrap",
      "Elementor",
      "Wordpress",
      "Figma",
      "React.Js",
      "Tailwind CSS",
    ],
    github: "https://github.com/raizenraneses-git/Holy-Week-Project",
    reverse: false,
    textClass: "lg:mt-0 sm:mt-10",
    Modal: ProjectHW,
    details: {
      name: "Holy Week",
      description:
        "An internship project that allowed me to further explore responsive web development, particularly how to create adaptable layouts and maintain a consistent user experience across desktop and mobile devices.",
      images: [hwOne, hwTwo, hwThree, hwFour],
      tools: [
        "HTML",
        "CSS",
        "Bootstrap",
        "Elementor",
        "Wordpress",
        "Figma",
        "React.Js",
        "Tailwind Css",
      ],
    },
  },
];

/* ---------- Styles ---------- */

const eyebrowClass = "font-poppins text-3xl text-primary";

const headingClass =
  "mt-10 font-poppins text-6xl font-bold text-secondary dark:text-white";

const cardGridClass =
  "mx-auto grid max-w-7xl gap-10 sm:grid-cols-1 lg:grid-cols-2";

const coverClass = "mx-auto h-auto w-full rounded-2xl shadow-2xl";

const titleClass =
  "text-left font-poppins text-3xl font-bold text-primary sm:text-4xl lg:text-4xl";

const summaryClass =
  "mt-5 text-justify font-poppins text-base text-Ldescription dark:text-Ddescription";

const tagListClass =
  "mx-auto mt-5 flex max-w-7xl flex-wrap gap-2 transition-all duration-300 sm:gap-2";

const tagClass =
  "rounded-2xl bg-primary/20 p-2 text-center font-poppins text-xs text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg dark:text-Ddescription";

const actionsClass = "group mt-5 flex flex-wrap gap-2";

const infoButtonClass =
  "group flex flex-wrap items-center gap-2 rounded-2xl border-secondary bg-primary px-5 py-2 font-poppins text-xs text-white transition-all duration-300 hover:scale-105 hover:bg-alternative hover:text-secondary hover:shadow-lg";

const githubButtonClass = [
  "group relative isolate flex flex-wrap items-center gap-2 overflow-hidden",
  "rounded-2xl border-black bg-black px-6 py-2 font-poppins text-xs text-white dark:bg-white",
  "transition-all duration-300 ease-out hover:scale-105 active:scale-95",
  "before:absolute before:inset-y-0 before:-left-6 before:-z-10 before:w-[150%]",
  "before:content-[''] before:bg-black dark:before:bg-white before:-skew-x-[20deg] before:-translate-x-full",
  "before:transition-transform before:duration-300 before:delay-100 before:ease-out",
  "hover:before:translate-x-0",
  "after:absolute after:inset-y-0 after:-left-6 after:-z-20 after:w-[150%]",
  "after:content-[''] after:bg-alternative after:-skew-x-[20deg] after:-translate-x-full",
  "after:transition-transform after:duration-300 after:ease-out",
  "hover:after:translate-x-0",
].join(" ");

/* ---------- Motion ---------- */

const EASE = [0.22, 1, 0.36, 1];

const startOffsets = {
  left: { x: -70, y: 0 },
  right: { x: 70, y: 0 },
  bottom: { x: 0, y: 60 },
};

function Reveal({ children }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.18 } },
      }}
    >
      {children}
    </motion.div>
  );
}

function RevealItem({ children, from = "bottom", className = "" }) {
  const reduce = useReducedMotion();
  const start = startOffsets[from];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce
          ? { opacity: 0 }
          : { opacity: 0, ...start, scale: 0.96, filter: "blur(8px)" },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 1, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Components ---------- */

function ProjectCard({ project, index, onOpen }) {
  const { playClickLD } = useSound();
  const { id, title, summary, cover, coverAlt, tags, github, reverse, textClass } =
    project;

  const coverFrom = reverse ? "right" : "left";
  const textFrom = reverse ? "left" : "right";
  const spacing = index === 0 ? "mt-15" : "mt-20";

  return (
    <Reveal>
      <div className={`${cardGridClass} ${spacing}`}>
        <RevealItem from={coverFrom}>
          <img src={cover} alt={coverAlt} className={coverClass} />
        </RevealItem>

        <RevealItem from={textFrom} className={textClass}>
          <div className={titleClass}>{title}</div>
          <div className={summaryClass}>{summary}</div>

          <div className={tagListClass}>
            {tags.map((tag) => (
              <div key={tag} className={tagClass}>
                {tag}
              </div>
            ))}
          </div>

          <div className={actionsClass}>
            <button onClick={() => onOpen(id)} className={infoButtonClass}>
              <span>Information</span>
              <FiInfo className="text-sm" />
            </button>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickLD}
              className={githubButtonClass}
            >
              <FaGithub className="text-sm dark:text-black" />
              <span className="dark:text-black">View</span>
            </a>
          </div>
        </RevealItem>
      </div>
    </Reveal>
  );
}

/* ---------- Projects ---------- */

function Projects() {
  const { playClick } = useSound();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

  const selected = projects.find((project) => project.id === selectedProject);
  const SelectedModal = selected?.Modal;

  const handleOpen = (id) => {
    setSelectedProject(id);
    setIsModalOpen(true);
    playClick();
  };

  return (
    <section
      id="projects"
      className="w-full bg-wbg-soft px-6 py-10 sm:px-6 lg:px-8 dark:bg-dbg-soft"
    >
      <div className="mx-auto mt-5 w-full max-w-7xl items-center sm:px-0 lg:px-0">
        <Reveal>
          <RevealItem from="bottom">
            <div className={eyebrowClass}>Portfolio</div>
          </RevealItem>

          <RevealItem from="bottom">
            <div className={headingClass}>Selected Project</div>
          </RevealItem>
        </Reveal>

        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {SelectedModal && (
        <SelectedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selected.details}
        />
      )}
    </section>
  );
}

export default Projects;