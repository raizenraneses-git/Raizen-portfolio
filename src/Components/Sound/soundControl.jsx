import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ------------------------------------------------------------
// SOUND CONTEXT
// Isang lugar para sa lahat ng tunog: click sound, background music,
// volume at mute. Kahit anong component pwedeng gumamit gamit ang
// useSound() hook (tingnan sa baba).
// ------------------------------------------------------------

// Ilagay ang mga audio file sa  public/sounds/
const CLICK_SRC = "/sounds/click.mp3";

// Background music (OPTIONAL):
// - Click sound lang ang gusto mo? Iwan na null.
// - May background music? Palitan ng "/sounds/bg-music.mp4"
const MUSIC_SRC = null;

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  // Volume: 0 (tahimik) hanggang 1 (pinakamalakas). Naka-save sa localStorage
  // para hindi mag-reset kapag nag-refresh.
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("sound-volume");
    return saved !== null ? Number(saved) : 0.5;
  });
  const [muted, setMuted] = useState(
    () => localStorage.getItem("sound-muted") === "true"
  );

  // Dito naka-store ang Audio objects (hindi sila nagre-re-render ng page)
  const clickRef = useRef(null);
  const musicRef = useRef(null);

  // 1) Gawin ang audio objects isang beses lang pag-load ng app
  useEffect(() => {
    clickRef.current = new Audio(CLICK_SRC);

    // Gagawa lang ng music kung may nakalagay na MUSIC_SRC
    if (MUSIC_SRC) {
      musicRef.current = new Audio(MUSIC_SRC);
      musicRef.current.loop = true; // paulit-ulit ang background music
    }

    // Cleanup: ihinto ang music kapag nawala ang provider
    return () => {
      musicRef.current?.pause();
    };
  }, []);

  // 2) Tuwing magbago ang volume/mute: i-apply sa music AT i-save
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = muted ? 0 : volume;
    }
    localStorage.setItem("sound-volume", String(volume));
    localStorage.setItem("sound-muted", String(muted));
  }, [volume, muted]);

  // 3) Simulan ang background music (kung meron).
  // NOTE: bawal mag-autoplay ang browsers, kaya kailangan munang
  // mag-click ang user kahit saan. Kaya tinatawag ito sa unang click.
  const startMusic = useCallback(() => {
    const music = musicRef.current;
    if (music && music.paused) {
      music.volume = muted ? 0 : volume;
      music.play().catch(() => {}); // huwag mag-error kung na-block
    }
  }, [muted, volume]);

  // 4) Click sound. Gumagamit ng cloneNode para kahit mabilis ang
  // sunod-sunod na click, hindi napuputol ang tunog.
  const playClick = useCallback(() => {
    startMusic(); // unang click = magsisimula na rin ang music (kung meron)

    if (muted || !clickRef.current) return;
    const sound = clickRef.current.cloneNode();
    sound.volume = volume;
    sound.play().catch((err) => console.warn("Click sound failed:", err));
  }, [muted, volume, startMusic]);

  return (
    <SoundContext.Provider
      value={{ volume, setVolume, muted, setMuted, playClick }}
    >
      {children}
    </SoundContext.Provider>
  );
}

// Custom hook: const { playClick, volume, ... } = useSound();
export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside <SoundProvider>");
  return ctx;
}