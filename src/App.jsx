import { useState } from "react";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Slider from "./Components/Slider";
import Skills from "./Components/Skills";
import Credentials from "./Components/Credentials";
import AboutMe from "./Components/AboutMe";
import Projects from "./Components/Projects";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Hero />
      <Slider />
      <Skills />
      <Credentials />
      <AboutMe />
      <Projects />
    </div>
  );
}

export default App;