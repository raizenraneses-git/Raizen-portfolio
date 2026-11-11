import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "motion/react";

import CircularText from "./Motion/CircularText";
import { useSound } from "./Sound/soundControl";
import VolumeControl from "./Sound/volumeControl";

/* ---------- Data ---------- */

const links = ["Home", "Projects", "About", "Contact"];

// Must match the id="..." of each section
const sectionIds = {
  Home: "home",
  Projects: "projects",
  About: "aboutMe",
  Contact: "contact",
};

/* ---------- Styles ---------- */

const linkItemClass =
  "group relative cursor-pointer overflow-hidden rounded-2xl px-5 py-1 transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95";

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-2xl text-secondary transition-all duration-300 ease-out hover:-rotate-2 hover:scale-105 hover:bg-primary hover:text-white active:scale-95 dark:text-white";

const hamburgerLineClass = "h-[2px] w-5 bg-current transition-all duration-300";

const hamburgerLineOpenClasses = [
  "translate-y-[7px] rotate-45",
  "opacity-0",
  "-translate-y-[7px] -rotate-45",
];

/* ---------- Motion ---------- */

const smoothEase = [0.22, 1, 0.36, 1];

const navContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const navItem = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

/* ---------- Helpers ---------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function playLinkClickMotion(e) {
  if (prefersReducedMotion()) return;

  const li = e.currentTarget;
  const rect = li.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;

  const ripple = document.createElement("span");
  ripple.style.cssText = `
    position:absolute;
    left:${e.clientX - rect.left - size / 2}px;
    top:${e.clientY - rect.top - size / 2}px;
    width:${size}px;
    height:${size}px;
    border-radius:9999px;
    background:rgba(255,255,255,0.35);
    pointer-events:none;
  `;

  // Inserted before the text span so the ripple sits under the text
  const textSpan = li.lastElementChild;
  li.insertBefore(ripple, textSpan);

  const rippleAnim = ripple.animate(
    [
      { transform: "scale(0)", opacity: 1 },
      { transform: "scale(1)", opacity: 0 },
    ],
    { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
  );
  rippleAnim.onfinish = () => ripple.remove();

  textSpan?.animate(
    [
      { transform: "translateY(0) scale(1)" },
      { transform: "translateY(-3px) scale(1.08)", offset: 0.4 },
      { transform: "translateY(0) scale(1)" },
    ],
    { duration: 380, easing: "ease-out" }
  );
}

function revealSection(el) {
  if (prefersReducedMotion()) return;

  setTimeout(() => {
    el.animate(
      [
        { opacity: 0.35, transform: "translateY(40px)", filter: "blur(8px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
      ],
      { duration: 900, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  }, 300);
}

function scrollToSection(link) {
  const el = document.getElementById(sectionIds[link]);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  revealSection(el);
}

/* ---------- Hooks ---------- */

function useHideOnScroll() {
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showNav;
}

function useScrollSpy(setActive) {
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(sectionIds[link]))
      .filter(Boolean);

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const matchedLink = links.find(
          (link) => sectionIds[link] === entry.target.id
        );
        if (matchedLink) setActive(matchedLink);
      });
    };

    // Thin detection line at the center of the viewport
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-50% 0px -50% 0px",
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}

/* ---------- Components ---------- */

function NavLinkItem({ link, active, onSelect, className = "", style }) {
  const isActive = active === link;
  const { playClick } = useSound();

  const handleClick = (e) => {
    playLinkClickMotion(e);
    playClick();
    onSelect(link);
  };

  return (
    <li
      onClick={handleClick}
      style={style}
      className={`${linkItemClass} ${className}`}
    >
      <span
        className={`absolute inset-0 origin-left rounded-2xl bg-primary transition-transform duration-300 ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />

      {/* Must stay the last child: playLinkClickMotion relies on it */}
      <span
        className={`relative transition-colors duration-300 ${
          isActive ? "text-white" : "group-hover:text-white"
        }`}
      >
        {link}
      </span>
    </li>
  );
}

function Brand() {
  return (
    <motion.div variants={navItem} className="flex items-center gap-3">
      <div className="hidden sm:block">
        <CircularText
          text="Raneses*Raizen"
          onHover="speedUp"
          direction="clockwise"
          spinDuration={20}
          size={40}
          fontSize={6}
          draggable
          hoverTilt={20}
          tilt={0}
          fontWeight={900}
          letterSpacing={0}
          startAngle={0}
          repeat={1}
          fill
          ring={false}
          color="#1269cc"
        />
      </div>

      <div className="flex items-center font-poppins text-[18px] font-bold text-secondary sm:text-[22px] lg:text-[24px] dark:text-white">
        <span>Raizen Raneses</span>
        <span className="text-primary">.</span>
      </div>
    </motion.div>
  );
}

function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group ${iconButtonClass}`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="block transition-transform duration-500 group-hover:rotate-180">
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </span>
    </button>
  );
}

function MenuToggle({ menuOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex-col gap-[5px] md:hidden ${iconButtonClass}`}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
    >
      {hamburgerLineOpenClasses.map((openClass) => (
        <span
          key={openClass}
          className={`${hamburgerLineClass} ${menuOpen ? openClass : ""}`}
        />
      ))}
    </button>
  );
}

/* ---------- Navbar ---------- */

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const showNav = useHideOnScroll();
  const { playClickLD, playClickMenu } = useSound();

  useScrollSpy(setActive);

  const handleDesktopSelect = (selected) => {
    setActive(selected);
    scrollToSection(selected);
  };

  // Waits for the 500ms menu close transition before scrolling
  const handleMobileSelect = (selected) => {
    setActive(selected);
    setMenuOpen(false);
    setTimeout(() => scrollToSection(selected), 500);
  };

  const handleThemeToggle = () => {
    playClickLD();
    setDarkMode(!darkMode);
  };

  const handleMenuToggle = () => {
    playClickMenu();
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-wbg-soft px-6 sm:px-6 lg:px-8 py-6 backdrop-blur-md transition-transform duration-300 dark:bg-dbg-soft ${
        showNav || menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* The intro runs on this inner div, not on <nav>, to keep hide-on-scroll working */}
      <motion.div
        variants={navContainer}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-7xl items-center justify-between"
      >
        <Brand />

        <motion.ul
          variants={navItem}
          className="hidden items-center gap-2 font-poppins text-[14px] font-medium text-secondary md:flex lg:gap-4 lg:text-[16px] dark:text-Ddescription"
        >
          {links.map((link) => (
            <NavLinkItem
              key={link}
              link={link}
              active={active}
              onSelect={handleDesktopSelect}
            />
          ))}
        </motion.ul>

        <motion.div variants={navItem} className="flex items-center gap-3">
          <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />
          <VolumeControl />
          <MenuToggle menuOpen={menuOpen} onToggle={handleMenuToggle} />
        </motion.div>
      </motion.div>

      {/* grid-rows-[0fr] -> [1fr] gives the smooth drop-down */}
      <div
        className={`mx-auto grid max-w-7xl transition-all duration-500 md:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 "
        }`}
      >
        <ul className="flex flex-col gap-2 overflow-hidden font-poppins text-[14px] text-secondary sm:text-[16px] dark:text-Ddescription">
          {links.map((link, index) => (
            <NavLinkItem
              key={link}
              link={link}
              active={active}
              onSelect={handleMobileSelect}
              style={{ transitionDelay: menuOpen ? `${index * 70}ms` : "0ms" }}
              className={`mt-2 py-3 ${
                menuOpen ? "translate-x-0" : "-translate-x-8"
              }`}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;