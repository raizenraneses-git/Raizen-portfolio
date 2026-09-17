import { useState, useEffect } from "react";
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
          group-hover:bg-black/5
        "
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="w-full px-8 py-10">

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
          <div className="font-poppins text-[24px] text-primary">
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
            "
          >
            I am a passionate front-end developer who enjoys
            transforming ideas into clean, responsive, and
            user friendly digital experiences.
          </div>


          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-6">

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
                bg-blue-500
                px-5
                py-2
                font-poppins
                text-[12px]
                font-bold
                text-white
                transition-all
                duration-300
                ease-in-out
                hover:scale-105
                hover:bg-blue-600
              "
            >
              <img
                src={download}
                alt="download"
                className="
                  h-5
                  w-5
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                "
              />

              <span>
                Curriculum Vitae
              </span>
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
                py-3
                font-poppins
                text-[12px]
                font-bold
                text-primary
                transition-all
                duration-300
                ease-in-out
                hover:scale-105
              "
            >
              <span>
                View My Works
              </span>

              <img
                src={arrow}
                alt="arrow"
                className="
                  h-4
                  w-5
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

          </div>


          {/* Social Media */}
          <div className="mt-7 font-poppins text-[12px] text-text">
            Social Media's / Contact
          </div>


          {/* Social Icons */}
          <div className="mt-3 flex items-center gap-10">

            <a
              href="https://www.facebook.com/RaizenRaneses.K/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={facebook}
                alt="facebook"
                className="h-8 w-8 object-contain"
              />
            </a>


            <a
              href="https://www.instagram.com/raizenraneses/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={instagram}
                alt="instagram"
                className="h-8 w-8 object-contain"
              />
            </a>


            <a
              href="https://x.com/raizenraneses"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={twitter}
                alt="twitter"
                className="h-8 w-8 object-contain"
              />
            </a>


            <a
              href="https://www.linkedin.com/in/raizenra%C3%B1eses/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={linkedin}
                alt="linkedin"
                className="h-8 w-8 object-contain"
              />
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