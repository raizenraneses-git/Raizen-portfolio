import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import CircularText from "./Motion/CircularText";

// ------------------------------------------------------------
// LINKS
// Isang lugar lang para magdagdag/magbawas ng menu item.
// ------------------------------------------------------------
const links = ["Home", "About", "Projects", "Contact"];

// ------------------------------------------------------------
// REUSABLE CLASSES
// Dating paulit-ulit na nakasulat sa bawat element. Ngayon isang beses
// na lang, para madaling baguhin (same idea ng ginagawa mo sa Credentials).
// ------------------------------------------------------------

// Bawat link: pill shape (rounded-2xl) + same hover motion ng View Credential button.
const linkItemClass =
  "group relative cursor-pointer rounded-2xl px-5 py-1 transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95";

// Square buttons sa kanan (dark mode + hamburger): same border/rounded ng cards.
const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-2xl text-secondary transition-all duration-300 ease-out hover:-rotate-2 hover:scale-105 hover:bg-primary hover:text-white active:scale-95 dark:text-white";

// ------------------------------------------------------------
// NAV LINK ITEM (maliit na component)
// Dati: dalawang beses nakasulat ang parehong <li> (desktop at mobile).
// Ngayon: iisang component, pinapasa lang ang props (basic React props!).
// ------------------------------------------------------------
function NavLinkItem({ link, active, onSelect, className = "", style }) {
  const isActive = active === link;

  return (
    <li
      onClick={() => onSelect(link)}
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
    // - border-b border-primary : same manipis na border ng cards
    // - px-4 sm:px-6 lg:px-8    : SAME gutter ng Credentials section,
    //                             kaya aligned ang logo sa "Credentials" title
    // - -translate-y-full       : umaakyat palabas ng screen (hindi itatago kapag bukas ang mobile menu)
    <nav
      className={`sticky top-0 z-50 w-full bg-wbg/80 px-6 sm:px-6 lg:px-8 py-6 backdrop-blur-md transition-transform duration-300 dark:bg-dbg ${
        showNav || menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* max-w-7xl: kapareho ng container sa Credentials */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* ---------- LEFT: Logo and Name ---------- */}
        <div className="flex items-center gap-3">
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

          {/* Responsive font size, kapareho ng pattern sa card titles (sm: / lg:) */}
          <div className="flex items-center font-poppins text-[18px] font-bold text-secondary sm:text-[22px] lg:text-[24px] dark:text-white">
            <span>Raizen Raneses</span>
            <span className="text-primary">.</span>
          </div>
        </div>

        {/* ---------- CENTER: Desktop links ---------- */}
        <ul className="hidden items-center gap-2 font-poppins text-[14px] font-medium text-secondary md:flex lg:gap-4 lg:text-[16px] dark:text-Ddescription">
          {links.map((link) => (
            <NavLinkItem
              key={link}
              link={link}
              active={active}
              onSelect={setActive}
            />
          ))}
        </ul>

        {/* ---------- RIGHT: Dark mode + Hamburger ---------- */}
        <div className="flex items-center gap-3">
          {/* Dark mode button: iikot ang icon pag hinover */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`group ${iconButtonClass}`}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <span className="block transition-transform duration-500 group-hover:rotate-180">
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </span>
          </button>

          {/* Hamburger: 3 guhit na nagiging X pag binuksan (md:hidden = mobile lang) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
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
        </div>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {/* grid-rows-[0fr] -> [1fr] ang trick para smooth na bumaba ang menu */}
      <div
        className={`mx-auto grid max-w-7xl transition-all duration-500 md:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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