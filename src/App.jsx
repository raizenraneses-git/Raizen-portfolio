import { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Slider from "./Components/Slider";
import Skills from "./Components/Skills";
import Credentials from "./Components/Credentials";
import AboutMe from "./Components/AboutMe";
import Projects from "./Components/Projects";
// CHANGE 1: i-import ang bagong transition component
import DarkMode from "./Components/DarkMode/DarkMode";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // CHANGE 2: Dito naka-save ang text ng transition.
  // null = walang transition, may text = tumatakbo ang transition
  const [transitionLabel, setTransitionLabel] = useState(null);

  // Update the dark mode class (same pa rin)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // CHANGE 3: Ito na ang tatawagin ng toggle button.
  // Hindi agad nagpapalit ng theme; ipapakita muna ang animation.
  const handleToggle = () => {
    // Kapag may tumatakbong transition, huwag nang ulitin
    if (transitionLabel) return;

    // 1) Ipakita ang overlay at piliin ang text
    setTransitionLabel(darkMode ? "LIGHT MODE" : "DARK MODE");

    // 2) Sa ~650ms, takip na ang buong screen, doon magpapalit ng theme
    setTimeout(() => setDarkMode((prev) => !prev), 650);

    // 3) Sa ~1150ms, tapos na ang animation, tanggalin ang overlay
    setTimeout(() => setTransitionLabel(null), 1150);
  };

  return (
    <div>
      {/* Pinalitan ang setDarkMode ng handleToggle. Hindi na kailangang galawin ang Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={handleToggle} />

      {/* Lalabas lang kapag may label (habang tumatakbo ang transition) */}
      {transitionLabel && <DarkMode label={transitionLabel} />}

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