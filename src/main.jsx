import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/poppins";
import "@fontsource/play/400.css";
import "@fontsource/play/700.css";
// NEW: import ng SoundProvider
import { SoundProvider } from './Components/Sound/soundControl'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* NEW: ibalot ang App para magamit ang useSound() kahit saan */}
    <SoundProvider>
      <App />
    </SoundProvider>
  </StrictMode>,
)