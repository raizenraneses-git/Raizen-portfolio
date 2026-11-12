import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Intro from "./Components/Intro";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Slider from "./Components/Slider";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import Timeline from "./Components/Timeline";
import Credentials from "./Components/Credentials";
import AboutMe from "./Components/AboutMe";
import Footer from "./Components/Footer";
import DarkMode from "./Components/DarkMode/DarkMode";

const THEME_SWITCH_DELAY = 650;
const TRANSITION_END_DELAY = 1150;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    if (transitionLabel) return;

    setTransitionLabel(darkMode ? "LIGHT MODE" : "DARK MODE");
    setTimeout(() => setDarkMode((prev) => !prev), THEME_SWITCH_DELAY);
    setTimeout(() => setTransitionLabel(null), TRANSITION_END_DELAY);
  };

  return (
    <div>
      <AnimatePresence>
        {!introDone && (
          <Intro key="intro" onComplete={() => setIntroDone(true)} />
        )}
      </AnimatePresence>

      <Navbar darkMode={darkMode} setDarkMode={handleToggle} />
      {transitionLabel && <DarkMode label={transitionLabel} />}

      <Hero play={introDone} />
      <Slider />
      <Projects />
      <Skills />
      <Timeline />
      <Credentials />
      <AboutMe />
      <Footer />
    </div>
  );
}

export default App;