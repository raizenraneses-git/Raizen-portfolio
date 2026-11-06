import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import CircularText from "./Motion/CircularText";
// >>> NEW: import ng sound hook at volume control
import { useSound } from "./Sound/soundControl";
import VolumeControl from "./Sound/volumeControl";

import { motion } from "motion/react";

// ------------------------------------------------------------
// LINKS
// Isang lugar lang para magdagdag/magbawas ng menu item.
// ------------------------------------------------------------
const links = ["Home", "Projects", "About", "Contact"];

// >>> NEW: mapping ng link name -> id ng section sa page
// Dapat match ito sa id="..." na nilagay mo sa bawat section.
const sectionIds = {
  Home: "home",
  Projects: "projects",
  About: "aboutMe",
  Contact: "contact",
};

// ------------------------------------------------------------
// REUSABLE CLASSES
// ------------------------------------------------------------

// Bawat link: pill shape (rounded-2xl) + same hover motion ng View Credential button.
// >>> NEW: dagdag na "overflow-hidden" para hindi lumabas sa pill ang ripple
const linkItemClass =
  "group relative cursor-pointer overflow-hidden rounded-2xl px-5 py-1 transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95";

// Square buttons sa kanan (dark mode + hamburger): same border/rounded ng cards.
const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-2xl text-secondary transition-all duration-300 ease-out hover:-rotate-2 hover:scale-105 hover:bg-primary hover:text-white active:scale-95 dark:text-white";

// >>> NEW: respeto sa users na naka-"reduce motion" ang device
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== NEW: NAVBAR INTRO (cinematic, pareho ng Hero) =====
// Bumababa mula sa taas ang logo, links, at buttons — sunod-sunod, hindi sabay-sabay.
const smoothEase = [0.22, 1, 0.36, 1]; // new: same easing sa Hero

const navContainer = {                  // new: taga-trigger at taga-sunod-sunod
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const navItem = {                       // new: bawat bahagi bumababa + fade in
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// >>> NEW: RIPPLE + TEXT POP
// Lumalaki mula sa mismong pinindot na spot ang puting bilog, tapos nawawala.
// Ginagamit ang Web Animations API (element.animate) kaya walang CSS na kailangan.
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

  // Ilalagay bago ang text span para nasa ilalim ng text ang ripple
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

  // Maliit na "pop" ng text paakyat at pababa
  textSpan?.animate(
    [
      { transform: "translateY(0) scale(1)" },
      { transform: "translateY(-3px) scale(1.08)", offset: 0.4 },
      { transform: "translateY(0) scale(1)" },
    ],
    { duration: 380, easing: "ease-out" }
  );
}

// ------------------------------------------------------------
// NAV LINK ITEM (maliit na component)
// ------------------------------------------------------------
function NavLinkItem({ link, active, onSelect, className = "", style }) {
  const isActive = active === link;
  // >>> NEW: kunin ang playClick function
  const { playClick } = useSound();

  return (
    <li
      // >>> NEW: tumunog muna bago i-select ang link
      onClick={(e) => {
        // >>> NEW: ripple + text pop
        playLinkClickMotion(e);
        playClick();
        onSelect(link);
      }}
      style={style}
      className={`${linkItemClass} ${className}`}
    >
      {/* Blue background na sumasalubong pag hinover.
          scale-x-0 = nakatago, scale-x-100 = kita. Galing sa kaliwa (origin-left). */}
      <span
        className={`absolute inset-0 origin-left rounded-2xl bg-primary transition-transform duration-300 ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />

      {/* Text ng link. Nagiging puti pag selected o hinover */}
      {/* >>> NEW: dapat ito ang LAST child ng <li> (kailangan ng ripple logic) */}
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

function Navbar({ darkMode, setDarkMode }) {
  // Bukas o sarado ang mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  // Alin ang kasalukuyang naka-select na link
  const [active, setActive] = useState("Home");
  // Kita ba ang navbar o hindi? (true = kita)
  const [showNav, setShowNav] = useState(true);
  // Dito naka-save ang huling scroll position para ma-compare sa bago
  const lastScrollY = useRef(0);
  // >>> NEW: kunin ang playClick function
  const { playClickLD, playClickMenu } = useSound();

  // >>> NEW: function na nag-i-scroll papunta sa section
  const scrollToSection = (link) => {
    const el = document.getElementById(sectionIds[link]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // >>> NEW: SECTION REVEAL
      // Habang paparating ang scroll, ang section ay sumusulpot paakyat
      // na may fade at blur (parang "lumilinaw").
      if (!prefersReducedMotion()) {
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
    }
  };

  // ------------------------------------------------------------
  // SCROLL DETECTION (hide on scroll down, show on scroll up)
  // ------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Nasa pinakataas ng page: laging kita
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Pababa ang scroll: itago
        setShowNav(false);
      } else {
        // Pataas ang scroll: ipakita
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup: tinatanggal ang listener kapag nawala ang component
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-wbg-soft px-6 sm:px-6 lg:px-8 py-6 backdrop-blur-md transition-transform duration-300 dark:bg-dbg-soft ${
        showNav || menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* max-w-7xl: kapareho ng container sa Credentials */}
      {/* new: dating <div — nagpapatakbo na ng intro (sa loob lang ng nav, hindi sa mismong <nav> para hindi masira ang hide-on-scroll) */}
      <motion.div
        variants={navContainer} // new
        initial="hidden"        // new: simula (nakatago)
        animate="show"          // new: play pagka-load
        className="mx-auto flex max-w-7xl items-center justify-between"
      >
        {/* ---------- LEFT: Logo and Name ---------- */}
        <motion.div variants={navItem} className="flex items-center gap-3"> {/* new: dating <div */}
          {/* >>> NEW: wrapper na "hidden sm:block" = nakatago ang Logo sa mobile, lalabas mula sm (640px) pataas */}
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

          {/* Responsive font size, kapareho ng pattern sa card titles (sm: / lg:) */}
          {/* >>> NEW: ibinalik sa "flex" ang Name = kita na ulit sa mobile */}
          <div className="flex items-center font-poppins text-[18px] font-bold text-secondary sm:text-[22px] lg:text-[24px] dark:text-white">
            <span>Raizen Raneses</span>
            <span className="text-primary">.</span>
          </div>
        </motion.div>

        {/* ---------- CENTER: Desktop links ---------- */}
        {/* new: dating <ul */}
        <motion.ul
          variants={navItem} // new
          className="hidden items-center gap-2 font-poppins text-[14px] font-medium text-secondary md:flex lg:gap-4 lg:text-[16px] dark:text-Ddescription"
        >
          {links.map((link) => (
            <NavLinkItem
              key={link}
              link={link}
              active={active}
              // >>> NEW: i-set ang active AT mag-scroll sa section
              onSelect={(selected) => {
                setActive(selected);
                scrollToSection(selected);
              }}
            />
          ))}
        </motion.ul>

        {/* ---------- RIGHT: Dark mode + Volume + Hamburger ---------- */}
        <motion.div variants={navItem} className="flex items-center gap-3"> {/* new: dating <div */}
          {/* Dark mode button: iikot ang icon pag hinover */}
          <button
            type="button"
            // >>> NEW: may tunog na rin ang dark mode button
            onClick={() => {
              playClickLD();
              setDarkMode(!darkMode);
            }}
            className={`group ${iconButtonClass}`}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <span className="block transition-transform duration-500 group-hover:rotate-180">
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </span>
          </button>

          {/* >>> NEW: Volume control (slider + mute) sa tabi ng dark mode */}
          <VolumeControl />

          {/* Hamburger: 3 guhit na nagiging X pag binuksan (md:hidden = mobile lang) */}
          <button
            type="button"
            // >>> NEW: may tunog din ang hamburger
            onClick={() => {
              playClickMenu();
              setMenuOpen(!menuOpen);
            }}
            className={`flex-col gap-[5px] md:hidden ${iconButtonClass}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`h-[2px] w-5 bg-current transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-current transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </motion.div>
      </motion.div>

      {/* ---------- MOBILE MENU ---------- */}
      {/* grid-rows-[0fr] -> [1fr] ang trick para smooth na bumaba ang menu */}
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
              // Pag pinili, i-set ang active AT isara ang menu
              onSelect={(selected) => {
                setActive(selected);
                setMenuOpen(false);
                // >>> NEW: may delay para matapos muna magsara ang menu (500ms transition)
                setTimeout(() => scrollToSection(selected), 500);
              }}
              // Isa-isang sumusulpot ang links (delay = index x 70ms)
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