import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/poppins";
import "@fontsource/play/400.css";
import "@fontsource/play/700.css";
import "./index.css";

import App from "./App.jsx";
import { SoundProvider } from "./Components/Sound/soundControl";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SoundProvider>
      <App />
    </SoundProvider>
  </StrictMode>
);