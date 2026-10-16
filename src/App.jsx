
import { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Slider from "./Components/Slider";
import Skills from "./Components/Skills";
import Credentials from "./Components/Credentials";
import AboutMe from "./Components/AboutMe";
import Projects from "./Components/Projects";
import InfiniteSpiralMain from "./Components/InfiniteSpiralMain";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Update the dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Hero />
      <Slider />
      <InfiniteSpiralMain />
      <Skills />
      <Credentials />
      <AboutMe />
      <Projects />
    </div>
  );
}

export default App;
