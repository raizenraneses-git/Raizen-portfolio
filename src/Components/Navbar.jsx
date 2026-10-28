// CHANGE 1: Dinagdag ang useEffect at useRef para sa scroll detection
import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import CircularText from "./Motion/CircularText";

// Listahan ng links. Isang lugar lang para magdagdag/magbawas ng menu item.
const links = ["Home", "About", "Projects", "Contact"];

function Navbar({ darkMode, setDarkMode }) {
  // Bukas o sarado ang mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  // Alin ang kasalukuyang naka-select na link (parang selected item sa P3R menu)
  const [active, setActive] = useState("Home");

  // CHANGE 2: Kita ba ang navbar o hindi? (true = kita)
  const [showNav, setShowNav] = useState(true);
  // Dito naka-save ang huling scroll position para ma-compare sa bago
  const lastScrollY = useRef(0);

  // CHANGE 3: Binabantayan ang scroll ng page
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
    // P3R touch #1: makapal na blue na linya sa ilalim ng navbar (border-b-4)
    // CHANGE 4: Dinagdag ang transition at translate. -translate-y-full = umaakyat palabas ng screen.
    // Kapag bukas ang mobile menu (menuOpen), hindi ito itatago.
    <nav
      className={`sticky top-0 z-50 w-full border-b-4 border-primary bg-wbg/80 p-5 backdrop-blur-md transition-transform duration-300 dark:bg-dbg ${
        showNav || menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
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

          <div className="flex items-center font-poppins text-[16px] font-bold sm:text-[24px]">
            <span className="dark:text-white">Raizen Raneses</span>
            <span className="text-primary">.</span>
          </div>
        </div>

        {/* ---------- CENTER: Desktop links ---------- */}
        <ul className="hidden items-center gap-4 font-poppins text-[16px] font-medium text-text dark:text-Ddescription md:flex">
          {links.map((link) => (
            <li
              key={link}
              onClick={() => setActive(link)}
              className="group relative cursor-pointer px-5 py-2"
            >
              {/* P3R touch #2: nakahilig (skew) na blue bar na sumasalubong pag hinover.
                  scale-x-0 = nakatago, scale-x-100 = kita. Galing sa kaliwa (origin-left) */}
              <span
                className={`absolute inset-0 origin-left -skew-x-12 bg-primary transition-transform duration-300 ${
                  active === link
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
              {/* Text ng link. Nagiging puti pag selected o hinover */}
              <span
                className={`relative transition-colors duration-300 ${
                  active === link ? "text-white" : "group-hover:text-white"
                }`}
              >
                {link}
              </span>
            </li>
          ))}
        </ul>

        {/* ---------- RIGHT: Dark mode + Hamburger ---------- */}
        <div className="flex items-center gap-3">
          {/* Dark mode button: nakahilig na parisukat, iikot ang icon pag hinover */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group -skew-x-12 border-2 border-primary p-2 text-primary transition-colors duration-300 hover:bg-primary hover:text-white dark:text-white"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {/* skew-x-12 dito para tuwid pa rin ang icon kahit nakahilig ang button */}
            <span className="block skew-x-12 transition-transform duration-500 group-hover:rotate-180">
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </span>
          </button>

          {/* Hamburger: 3 guhit na nagiging X pag binuksan (md:hidden = mobile lang) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 -skew-x-12 flex-col items-center justify-center gap-[5px] border-2 border-primary md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {/* Bawat guhit ay may sariling galaw kapag menuOpen = true */}
            <span
              className={`h-[2px] w-5 bg-primary transition-all duration-300 dark:bg-white ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-primary transition-all duration-300 dark:bg-white ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-primary transition-all duration-300 dark:bg-white ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {/* grid-rows-[0fr] -> [1fr] ang trick para smooth na bumaba ang menu */}
      <div
        className={`grid transition-all duration-500 md:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 overflow-hidden font-poppins text-[16px] text-text dark:text-Ddescription">
          {links.map((link, index) => (
            <li
              key={link}
              onClick={() => {
                setActive(link);
                setMenuOpen(false);
              }}
              // Isa-isang sumusulpot ang links (delay = index x 70ms)
              style={{ transitionDelay: menuOpen ? `${index * 70}ms` : "0ms" }}
              className={`group relative mt-2 cursor-pointer px-5 py-3 transition-all duration-500 ${
                menuOpen ? "translate-x-0" : "-translate-x-8"
              }`}
            >
              <span
                className={`absolute inset-0 origin-left -skew-x-12 bg-primary transition-transform duration-300 ${
                  active === link
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
              <span
                className={`relative transition-colors duration-300 ${
                  active === link ? "text-white" : "group-hover:text-white"
                }`}
              >
                {link}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;