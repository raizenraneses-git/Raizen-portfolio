// CHANGE 1: Dinagdag ang useState (para sa open/close ng hamburger menu)
import { useState } from "react";
// CHANGE 2: Dinagdag ang FiMenu at FiX (hamburger icon at close icon)
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import CircularText from "./Motion/CircularText";

function Navbar({ darkMode, setDarkMode }) {
  // CHANGE 3: Dito naka-save kung bukas o sarado ang mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full p-5 bg-wbg/80 dark:bg-dbg backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">

        {/* Left Side: Logo and Name */}
        <div className="flex items-center gap-3">
          <CircularText
            text="Raneses*Raizen"
            onHover="speedUp"
            direction="clockwise"
            spinDuration={20}
            size={80}
            fontSize={12}
            draggable
            hoverTilt={20}
            className="custom-class"
            tilt={0}
            fontWeight={900}
            letterSpacing={0}
            startAngle={0}
            repeat={1}
            fill
            ring={false}
            color="#1269cc"
          />

          <div className="flex items-center">
            {/* CHANGE 4: text-[24px] ginawang text-[16px] sa mobile at 24px mula sm pataas,
                para magkasya ang Name + Dark Mode + Hamburger sa maliit na screen */}
            <div className="text-[16px] sm:text-[24px] font-poppins font-bold dark:text-white">
              Raizen Raneses
            </div>

            <div className="text-[16px] sm:text-[24px] font-poppins font-bold text-primary">
              .
            </div>
          </div>
        </div>

        {/* Navigation (Laptop lang - hidden sa mobile, walang binago dito) */}
        <ul className="hidden gap-12 font-poppins text-[16px] text-text dark:text-Ddescription md:flex">
          <li className="cursor-pointer transition-colors hover:text-primary">
            Home
          </li>

          <li className="cursor-pointer transition-colors duration-300 hover:text-primary">
            About
          </li>

          <li className="cursor-pointer transition-colors hover:text-primary">
            Projects
          </li>

          <li className="cursor-pointer transition-colors hover:text-primary">
            Contact
          </li>
        </ul>

        {/* CHANGE 5: Dinagdag ang wrapper (flex) para magkatabi ang Dark Mode at Hamburger */}
        <div className="flex items-center gap-1">

          {/* Right Side: Dark Mode Toggle (same pa rin ang code) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-card p-2 font-poppins text-[16px] font-bold text-secondary transition duration-500 hover:bg-secondary hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-secondary"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* CHANGE 6: Hamburger button - makikita lang sa mobile (md:hidden) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-card p-2 text-secondary transition duration-500 hover:bg-secondary hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-secondary md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {/* Kapag bukas ang menu, X ang icon. Kapag sarado, hamburger */}
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* CHANGE 7: Mobile menu - lalabas lang kapag menuOpen ay true, at hidden sa laptop */}
      {menuOpen && (
        <ul className="mt-4 flex flex-col gap-4 border-t border-secondary/20 pt-4 font-poppins text-[16`px] text-text dark:text-Ddescription md:hidden">
          {/* onClick={() => setMenuOpen(false)} = isasara ang menu pagka-click ng link */}
          <li
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer transition-colors hover:text-primary"
          >
            Home
          </li>

          <li
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer transition-colors hover:text-primary"
          >
            About
          </li>

          <li
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer transition-colors hover:text-primary"
          >
            Projects
          </li>

          <li
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer transition-colors hover:text-primary"
          >
            Contact
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;