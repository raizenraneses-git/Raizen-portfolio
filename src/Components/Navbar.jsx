import { FiSun, FiMoon } from "react-icons/fi";
import CircularText from "./Motion/CircularText";

function Navbar({ darkMode, setDarkMode }) {
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
            <div className="text-[24px] font-poppins font-bold dark:text-white">
              Raizen Raneses
            </div>

            <div className="text-[24px] font-poppins font-bold text-primary">
              .
            </div>
          </div>
        </div>

        {/* Navigation */}
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

        {/* Right Side: Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-card p-2 font-poppins text-[16px] font-bold text-secondary transition duration-500 hover:bg-secondary hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-secondary"
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;