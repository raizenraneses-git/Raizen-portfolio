import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

import { useSound } from "./Sound/soundControl";

import cv from "../assets/documents/cv.pdf";
import heroOne from "../assets/heroImage/image1.jpg";
import heroTwo from "../assets/heroImage/image2.jpg";
import heroThree from "../assets/heroImage/image3.jpg";
import heroFour from "../assets/heroImage/image4.jpg";

/* ---------- Data ---------- */

const roles = ["Frontend", "UI/UX", "Freelancer"];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/RaizenRaneses.K/",
    Icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/raizenraneses/",
    Icon: FaInstagram,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/raizenraneses",
    Icon: FaXTwitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/raizenra%C3%B1eses/",
    Icon: FaLinkedinIn,
  },
];

const photos = [
  {
    src: heroTwo,
    alt: "Hero image 1",
    objectPosition: "center 30%",
    className: "col-start-1 row-start-1",
  },
  {
    src: heroOne,
    alt: "Profile portrait",
    objectPosition: "center 20%",
    className: "col-start-2 row-start-1 row-span-2",
  },
  {
    src: heroThree,
    alt: "Hero image 3",
    objectPosition: "center 40%",
    className: "col-start-1 row-start-2",
  },
  {
    src: heroFour,
    alt: "Graduation",
    objectPosition: "center 37%",
    className: "col-span-2 col-start-1 row-start-3",
  },
];

/* ---------- Styles ---------- */

const gridClass = [
  "mx-auto grid max-w-7xl grid-cols-1 items-center gap-12",
  "sm:grid-cols-2 sm:gap-0",
  "lg:grid-cols-[1fr_0.9fr] lg:gap-16",
].join(" ");

const greetingClass = "font-poppins text-[24px] text-primary";

const nameClass =
  "mt-10 font-poppins text-[64px] font-bold leading-tight text-secondary dark:text-white";

const roleClass =
  "mt-5 font-poppins text-[64px] font-bold leading-tight text-primary";

const descriptionClass =
  "mt-10 max-w-xl font-poppins text-[20px] leading-relaxed text-text dark:text-Ddescription";

const socialLabelClass =
  "mt-7 font-poppins text-sm text-Ldescription dark:text-Ddescription";

const socialLinkClass =
  "text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:text-primary dark:text-Ddescription";

const collageClass = "mb-5 grid h-[560px] w-full grid-cols-2 grid-rows-3 gap-3";

const buttonBaseClass = [
  "group relative isolate flex items-center justify-center gap-2 overflow-hidden",
  "rounded-card py-2.5 font-poppins text-sm",
  "transition-all duration-300 ease-in-out",
  "hover:-translate-y-0.5 hover:-rotate-2 hover:scale-[1.03]",
  "hover:shadow-[4px_4px_0_0_#1e6bff] active:scale-95",
  "before:absolute before:inset-y-0 before:-left-6 before:-z-10 before:w-[150%]",
  "before:content-[''] before:-skew-x-[20deg] before:-translate-x-full",
  "before:transition-transform before:duration-300 before:ease-out",
  "hover:before:translate-x-0",
].join(" ");

const primaryButtonClass = `${buttonBaseClass} bg-primary px-6 text-white before:bg-alternative hover:text-[#04122e]`;

const outlineButtonClass = `${buttonBaseClass} border border-primary bg-white px-5 text-primary before:bg-secondary hover:border-alternative hover:text-alternative`;

const downloadIconClass =
  "h-4 w-4 transition-transform duration-300 hover:text-secondary group-hover:rotate-6";

const arrowIconClass =
  "h-4 w-4 transition-transform duration-300 hover:text-alternative group-hover:translate-x-1";

/* ---------- Motion ---------- */

const smoothEase = [0.22, 1, 0.36, 1];

const heroContainer = { hidden: {}, show: {} };

const leftStack = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: smoothEase } },
};

const slideUp = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: smoothEase } },
};

const softUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } },
};

const collage = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const photoSlide = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: smoothEase } },
};

const coverWipe = {
  hidden: { scaleY: 1 },
  show: { scaleY: 0, transition: { duration: 1, ease: smoothEase, delay: 0.2 } },
};

/* ---------- Helpers ---------- */

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

/* ---------- Small components ---------- */

function MaskReveal({ children, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div variants={slideUp}>{children}</motion.div>
    </div>
  );
}

function RotatingText({ words, interval = 2000 }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.substring(0, text.length + 1));

          if (text.length + 1 === currentWord.length) {
            setTimeout(() => {
              setFade(false);
              setIsDeleting(true);
            }, interval);
          }
        } else {
          setText(currentWord.substring(0, text.length - 1));

          if (text.length === 1) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
            setFade(true);
          }
        }
      },
      isDeleting ? 60 : 120
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, interval]);

  return (
    <span
      className={`inline-block transition-opacity duration-700 ${
        fade ? "opacity-900" : "opacity-100"
      }`}
    >
      {text}
      <span className="animate-pulse"></span>
    </span>
  );
}

function PhotoCard({ src, alt, className = "", objectPosition = "center" }) {
  return (
    <motion.div
      variants={photoSlide}
      className={`group relative overflow-hidden rounded-2xl ${className}`}
    >
      <img
        src={src}
        alt={alt}
        style={{ objectPosition }}
        className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-secondary/5" />

      <motion.div
        variants={coverWipe}
        style={{ originY: 0 }}
        className="pointer-events-none absolute inset-0 z-10 bg-primary"
      />
    </motion.div>
  );
}

/* ---------- Sections ---------- */

function HeroContent() {
  const { playClick, playClickLD } = useSound();

  return (
    <motion.div variants={leftStack} className="flex flex-col">
      <motion.div variants={slideLeft} className={greetingClass}>
        ─── Hello Everyone! I am
      </motion.div>

      <MaskReveal className={nameClass}>RAIZEN RAÑESES</MaskReveal>

      <MaskReveal className={roleClass}>
        <RotatingText words={roles} interval={2000} />
      </MaskReveal>

      <motion.div variants={softUp} className={descriptionClass}>
        I am a passionate front-end developer who enjoys transforming ideas
        into clean, responsive, and user friendly digital experiences.
      </motion.div>

      {/* Animation lives on the wrapper, not the buttons, to avoid clashing with Tailwind hover */}
      <motion.div variants={softUp} className="mt-8 flex flex-wrap gap-4">
        <a
          href={cv}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClickLD}
          className={primaryButtonClass}
        >
          <FiDownload className={downloadIconClass} />
          Download CV
        </a>

        <button
          type="button"
          rel="noopener noreferrer"
          onClick={() => {
            playClick();
            scrollToSection("projects");
          }}
          className={outlineButtonClass}
        >
          <span>View My Works</span>
          <FiArrowUpRight className={arrowIconClass} />
        </button>
      </motion.div>

      <motion.div variants={softUp} className={socialLabelClass}>
        Social Media's / Contact
      </motion.div>

      <motion.div variants={softUp} className="mt-5 flex items-center gap-5">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onClick={playClick}
            className={socialLinkClass}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}

function HeroCollage() {
  return (
    <motion.div variants={collage} className={collageClass}>
      {photos.map((photo) => (
        <PhotoCard key={photo.alt} {...photo} />
      ))}
    </motion.div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section
      id="home"
      className="w-full bg-wbg-soft px-6 py-10 sm:px-6 lg:px-8 dark:bg-dbg-soft"
    >
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className={gridClass}
      >
        <HeroContent />
        <HeroCollage />
      </motion.div>
    </section>
  );
}

export default Hero;