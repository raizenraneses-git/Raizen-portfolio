import { useState, useEffect } from "react";

import { FiDownload } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

import cv from "../assets/documents/cv.pdf";

import heroOne from "../assets/heroImage/image1.jpg";
import heroTwo from "../assets/heroImage/image2.jpg";
import heroThree from "../assets/heroImage/image3.jpg";
import heroFour from "../assets/heroImage/image4.jpg";

/* =====================================================
   PERSONA 3 RELOAD COLORS (para madaling palitan)
   - Dark navy : #04122e
   - Royal blue: #1e6bff
   - Cyan glow : #3de0ff
===================================================== */

// Isang style lang para sa lahat ng social icons (para hindi paulit-ulit)
// WALA nang border. Naka-skew pa rin ang box at nagiging cyan kapag nag-hover.
const socialStyle = `
  flex
  h-11
  w-11
  items-center
  justify-center
  -skew-x-12
  text-secondary
  dark:text-Ddescription
  transition-all
  duration-300
  hover:-translate-y-1
  hover:bg-[#3de0ff]
  hover:text-[#04122e]
`;

function RotatingText({ words, interval = 2000 }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Type or delete one letter
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Add one letter
        setText(currentWord.substring(0, text.length + 1));

        // Start deleting when the word is complete
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => {
            setFade(false);
            setIsDeleting(true);
          }, interval);
        }
      } else {
        // Remove one letter
        setText(currentWord.substring(0, text.length - 1));

        // Move to the next word when empty
        if (text.length === 1) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setFade(true);
        }
      }
    }, isDeleting ? 60 : 120);

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

// Reusable image card
// Ibinalik sa dati ang itsura (walang border, walang kulay na tint).
// Ang natira lang na P3R: yung putol na sulok sa baba (clip-path).
function PhotoCard({ src, alt, className = "", objectPosition = "center" }) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        [clip-path:polygon(0_0,100%_0,100%_88%,90%_100%,0_100%)]
        ${className}
      `}
    >
      <img
        src={src}
        alt={alt}
        style={{ objectPosition }}
        className="
          h-full
          w-full
          object-cover
          transition-all
          duration-500
          ease-out
          group-hover:scale-[1.04]
          group-hover:-translate-y-1
        "
      />

      {/* subtle overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/0
          transition-all
          duration-500
          group-hover:bg-secondary/5
        "
      />
    </div>
  );
}

function Hero({ darkMode, setDarkMode }) {
  return (
    <section className="relative w-full overflow-hidden bg-wbg px-8 py-10 dark:bg-dbg">

      {/* =====================================
          BACKGROUND DECORATION (P3R style)
          Naka-skew na cyan/blue na mga strip sa likod
      ====================================== */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          top-0
          h-full
          w-48
          -skew-x-[20deg]
          bg-alternative/20
        "
      />
      <div
        className="
          pointer-events-none
          absolute
          right-40
          top-0
          h-full
          w-6
          -skew-x-[20deg]
          bg-[#1e6bff]/30
        "
      />

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          items-center
          gap-12
          lg:grid-cols-[1fr_0.9fr]
          lg:gap-16
        "
      >

        {/* =====================================
            LEFT SIDE - CONTENT
        ====================================== */}
        <div className="flex flex-col">

          {/* Greeting (dati na ulit, walang background) */}
          <div className="font-poppins text-[24px] text-primary">
            ─── Hello Everyone! I am
          </div>


          {/* Name (dati na ulit) */}
          <div
            className="
              mt-10
              font-poppins
              text-[64px]
              font-bold
              leading-tight
              text-secondary
              dark:text-white
            "
          >
            RAIZEN RAÑESES
          </div>


          {/* Rotating Text (dati na ulit) */}
          <div
            className="
              mt-5
              font-poppins
              text-[64px]
              font-bold
              leading-tight
              text-primary
            "
          >
            <RotatingText
              words={[
                "Frontend",
                "UI/UX",
                "Web Designer",
              ]}
              interval={2000}
            />
          </div>


          {/* Description - may cyan na linya sa kaliwa */}
          <div
            className="
              mt-8
              max-w-xl
              border-l-4
              border-alternative
              pl-4
              font-poppins
              text-[20px]
              leading-relaxed
              text-Ldescription
              dark:text-Ddescription
            "
          >
            I am a passionate front-end developer who enjoys
            transforming ideas into clean, responsive, and
            user friendly digital experiences.
          </div>


          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">

            {/* CV */}
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                relative
                isolate
                overflow-hidden
                flex
                items-center
                justify-center
                gap-2
                rounded-card
                px-6
                py-2.5
                font-poppins
                text-sm
                text-white
                hover:text-[#04122e]
                transition-all
                duration-300
                ease-in-out
                hover:scale-[1.03]
                hover:-translate-y-0.5
                hover:-rotate-2
                active:scale-95
                hover:shadow-[4px_4px_0_0_#1e6bff]
                bg-primary
                before:content-['']
                before:absolute
                before:inset-y-0
                before:-left-6
                before:-z-10
                before:w-[150%]
                before:bg-alternative
                before:-skew-x-[20deg]
                before:-translate-x-full
                hover:before:translate-x-0
                before:transition-transform
                before:duration-300
                before:ease-out
              "
            >
              <FiDownload
                className="
                  h-4
                  w-4
                  hover:text-secondary
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                "
              />

              Download CV
            </a>


            {/* My Works */}
            <a
              href="/my-works"
              className="
                 group
                  relative
                  isolate
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-card
                  border
                  border-primary
                  bg-white
                  px-6
                  py-2.5
                  font-poppins
                  text-sm
                  text-primary
                  transition-all
                  duration-300
                  ease-in-out
                  hover:scale-[1.03]
                  hover:-translate-y-0.5
                  hover:-rotate-2
                  hover:text-alternative
                  hover:border-alternative
                  hover:shadow-[4px_4px_0_0_#1e6bff]
                  active:scale-95
                  before:content-['']
                  before:absolute
                  before:inset-y-0
                  before:-left-6
                  before:-z-10
                  before:w-[150%]
                  before:bg-secondary
                  before:-skew-x-[20deg]
                  before:-translate-x-full
                  hover:before:translate-x-0
                  before:transition-transform
                  before:duration-300
                  before:ease-out
              "
            >
              <span>
                View My Works
              </span>

              <FiArrowUpRight
                className="
                  h-4
                  w-4
                  hover:text-alternative
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

          </div>


          {/* Social Media label - may maliit na cyan na linya */}
          <div className="mt-7 flex items-center gap-3 font-poppins text-sm text-Ldescription dark:text-Ddescription">
            <span className="h-[2px] w-8 bg-alternative"></span>
            Social Media's / Contact
          </div>


          {/* Social Icons - gamit ang socialStyle sa taas (walang border) */}
          <div className="mt-5 flex items-center gap-5">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/RaizenRaneses.K/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={socialStyle}
            >
              {/* skew-x-12 para hindi baluktot ang icon */}
              <FaFacebookF className="h-5 w-5 skew-x-12" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/raizenraneses/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialStyle}
            >
              <FaInstagram className="h-5 w-5 skew-x-12" />
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/raizenraneses"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className={socialStyle}
            >
              <FaXTwitter className="h-5 w-5 skew-x-12" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/raizenra%C3%B1eses/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={socialStyle}
            >
              <FaLinkedinIn className="h-5 w-5 skew-x-12" />
            </a>

          </div>

        </div>


        {/* =====================================
            RIGHT SIDE - IMAGE COLLAGE
        ====================================== */}
        <div
          className="
            grid
            h-[560px]
            w-full
            grid-cols-2
            grid-rows-3
            gap-3
            mb-5
          "
        >

          {/* Top Left */}
          <PhotoCard
            src={heroTwo}
            alt="Hero image 1"
            objectPosition="center 30%"
            className="
              col-start-1
              row-start-1
            "
          />


          {/* Big Right Image */}
          <PhotoCard
            src={heroOne}
            alt="Profile portrait"
            objectPosition="center 20%"
            className="
              col-start-2
              row-start-1
              row-span-2
            "
          />


          {/* Middle Left */}
          <PhotoCard
            src={heroThree}
            alt="Hero image 3"
            objectPosition="center 40%"
            className="
              col-start-1
              row-start-2
            "
          />


          {/* Bottom Full Width */}
          <PhotoCard
            src={heroFour}
            alt="Graduation"
            objectPosition="center 37%"
            className="
              col-span-2
              col-start-1
              row-start-3 
            "
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;