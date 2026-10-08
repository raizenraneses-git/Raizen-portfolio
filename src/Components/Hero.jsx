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
import facebook from "../assets/smIcons/facebook.png";
import instagram from "../assets/smIcons/instagram.png";
import twitter from "../assets/smIcons/twitter.png";
import linkedin from "../assets/smIcons/linkedin.png";
import download from "../assets/download.png";
import arrow from "../assets/arrowResume.png";

import heroOne from "../assets/heroImage/image1.jpg";
import heroTwo from "../assets/heroImage/image2.jpg";
import heroThree from "../assets/heroImage/image3.jpg";
import heroFour from "../assets/heroImage/image4.jpg";

function RotatingText({ words, interval = 2000 }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // trigger exit animation first
      setAnimate(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimate(true); // trigger enter animation
      }, 700); // must match your transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className="overflow-hidden">
      <span
        key={index}
        className={`inline-block transition-all duration-500 ease-in-out ${
          animate
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
      >
        {words[index]}
      </span>
    </span>
  );
}

// Reusable image card
function PhotoCard({ src, alt, className = "", objectPosition = "center" }) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
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
    <section className="w-full px-8 py-10 dark:bg-dbg">

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

          {/* Greeting */}
          <div className="font-poppins text-[24px] text-primary dark:text-alternative">
            ─── Hello Everyone! I am
          </div>


          {/* Name */}
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


          {/* Rotating Text */}
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


          {/* Description */}
          <div
            className="
              mt-10
              max-w-xl
              font-poppins
              text-[20px]
              leading-relaxed
              text-text
              dark:text-Ddescription
            "
          >
            I am a passionate front-end developer who enjoys
            transforming ideas into clean, responsive, and
            user friendly digital experiences.
          </div>


          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-4">

            {/* CV */}
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
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
                transition-all
                duration-300
                ease-in-out
                hover:scale-[1.03]
                bg-alternative
                hover:bg-alternative
                dark:hover:bg-alternative
              "
            >
              <FiDownload
                className="
                  h-4
                  w-4
                  text-white
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
              "
            >
              <span>
                View My Works
              </span>

              <FiArrowUpRight
                className="
                  h-4
                  w-4
                  text-primary
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

          </div>


          {/* Social Media */}
          <div className="mt-7 font-poppins text-sm text-Ldescription dark:text-Ddescription">
            Social Media's / Contact
          </div>


          {/* Social Icons */}
          <div className="mt-5 flex items-center gap-5">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/RaizenRaneses.K/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="
                text-secondary
                dark:text-Ddescription
                transition-all
                hover:-translate-y-0.5
                hover:text-primary
              "
            >
              <FaFacebookF className="h-5 w-5" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/raizenraneses/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="
                text-secondary
                dark:text-Ddescription
                transition-all
                duration-300
                hover:-translate-y-1
                hover:text-primary
              "
            >
              <FaInstagram className="h-5 w-5" />
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/raizenraneses"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="
                text-secondary
                dark:text-Ddescription
                transition-all
                duration-300
                hover:-translate-y-1
                hover:text-primary
              "
            >
              <FaXTwitter className="h-5 w-5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/raizenra%C3%B1eses/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                text-secondary
                dark:text-Ddescription
                transition-all
                duration-300
                hover:-translate-y-1
                hover:text-primary
              "
            >
              <FaLinkedinIn className="h-5 w-5" />
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