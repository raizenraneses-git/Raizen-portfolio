import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* Sources (public/sounds/) */
const CLICK_SRC = "/sounds/click.mp3";
const CLICK_LD_SRC = "/sounds/clickLD.mp3";
const CLICK_MENU_SRC = "/sounds/clickMenu.mp3";
const CLICK_BACK_SRC = "/sounds/backMenu.mp3";
const MUSIC_SRC = null;

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  /* State */
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("sound-volume");
    return saved !== null ? Number(saved) : 0.5;
  });
  const [muted, setMuted] = useState(
    () => localStorage.getItem("sound-muted") === "true"
  );

  /* Refs */
  const clickRef = useRef(null);
  const clickLDRef = useRef(null);
  const clickMenuRef = useRef(null);
  const clickBackRef = useRef(null);
  const musicRef = useRef(null);

  /* Setup: create audio objects once */
  useEffect(() => {
    clickRef.current = new Audio(CLICK_SRC);
    clickLDRef.current = new Audio(CLICK_LD_SRC);
    clickMenuRef.current = new Audio(CLICK_MENU_SRC);
    clickBackRef.current = new Audio(CLICK_BACK_SRC);

    if (MUSIC_SRC) {
      musicRef.current = new Audio(MUSIC_SRC);
      musicRef.current.loop = true;
    }

    return () => {
      musicRef.current?.pause();
    };
  }, []);

  /* Sync: apply and persist volume / mute */
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = muted ? 0 : volume;
    }
    localStorage.setItem("sound-volume", String(volume));
    localStorage.setItem("sound-muted", String(muted));
  }, [volume, muted]);

  /* Music: browsers block autoplay, so it starts on the first click */
  const startMusic = useCallback(() => {
    const music = musicRef.current;
    if (music && music.paused) {
      music.volume = muted ? 0 : volume;
      music.play().catch(() => {});
    }
  }, [muted, volume]);

  /* Click sounds: cloneNode keeps rapid clicks from cutting each other off */
  const playClick = useCallback(() => {
    startMusic();

    if (muted || !clickRef.current) return;
    const sound = clickRef.current.cloneNode();
    sound.volume = volume;
    sound.play().catch((err) => console.warn("Click sound failed:", err));
  }, [muted, volume, startMusic]);

  const playClickLD = useCallback(() => {
    startMusic();

    if (muted || !clickLDRef.current) return;
    const sound = clickLDRef.current.cloneNode();
    sound.volume = volume;
    sound.play().catch((err) => console.warn("Click LD sound failed:", err));
  }, [muted, volume, startMusic]);

  const playClickMenu = useCallback(() => {
    startMusic();

    if (muted || !clickMenuRef.current) return;
    const sound = clickMenuRef.current.cloneNode();
    sound.volume = volume;
    sound.play().catch((err) => console.warn("Click Menu sound failed:", err));
  }, [muted, volume, startMusic]);

  const playBackMenu = useCallback(() => {
    startMusic();

    if (muted || !clickBackRef.current) return;
    const sound = clickBackRef.current.cloneNode();
    sound.volume = volume;
    sound.play().catch((err) => console.warn("Click Back sound failed:", err));
  }, [muted, volume, startMusic]);

  return (
    <SoundContext.Provider
      value={{
        volume,
        setVolume,
        muted,
        setMuted,
        playClick,
        playClickLD,
        playClickMenu,
        playBackMenu,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside <SoundProvider>");
  return ctx;
}