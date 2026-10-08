import profile from "../assets/personaCard.png";
import { FiSun, FiMoon } from "react-icons/fi";

function Navbar({ darkMode, setDarkMode }) {

  return (

    <nav className="sticky top-0 z-50 w-full p-5 bg-white/80 dark:bg-dark backdrop-blur-md">

      <div className="mx-auto flex h-full max-w-7xl items-center justify-between ">

        {/* Logo */}
        <div className="flex items-center gap-2">

          {/* Flip Card */}
          <div className="group h-12 w-12 cursor-pointer [perspective:1000px]">

            <div className="relative h-full w-full transition-transform duration-800 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

              {/* Front */}
              <div className="absolute inset-0 flex items-center justify-center rounded-card bg-primary text-white text-[36px] dark:text-secondary font-play font-bold [backface-visibility:hidden] dark:bg-alternative">
                R 
              </div>

              {/* Back */}
              <div className="absolute inset-0 overflow-hidden rounded-card [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <img
                  src={profile}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

            </div>

          </div>

          {/* Name */}
          <div className="text-[24px] font-poppins font-bold dark: dark:text-white">
            Raizen Raneses
          </div>

          <div className="text-[24px] font-poppins font-bold text-primary dark:text-primary">
            .
          </div>

        </div>

        {/* Navigation */}
        <ul className="hidden gap-12 font-poppins text-[16px] text-text dark:text-white md:flex">
          <li className="cursor-pointer hover:text-primary transition-colors motion-rotate-in-45">
            Home
          </li>
          <li className="cursor-pointer hover:text-primary transition-colors duration-300">
            About
          </li>
          <li className="cursor-pointer hover:text-primary transition-colors">
            Projects
          </li>
          <li className="cursor-pointer hover:text-primary transition-colors">
            Contact
          </li>
        </ul>

        {/* Right Side */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-card bg-secondary p-2 font-poppins text-[16px] text-white transition hover:bg-white hover:text-secondary font-bold duration-500"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;