import { useState, useEffect, useRef } from "react";
import { FiVolume2, FiVolume1, FiVolumeX } from "react-icons/fi";
import { useSound } from "./soundControl";

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-2xl text-secondary transition-all duration-300 ease-out hover:-rotate-2 hover:scale-105 hover:bg-primary hover:text-white active:scale-95 dark:text-white";

const panelClass =
  "absolute right-0 top-12 w-44 origin-top-right rounded-2xl border border-primary bg-wbg p-4 shadow-lg transition-all duration-300 dark:bg-dbg";

function VolumeControl() {
  const { volume, setVolume, muted, setMuted, playClick } = useSound();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isSilent = muted || volume === 0;
  const Icon = isSilent ? FiVolumeX : volume < 0.5 ? FiVolume1 : FiVolume2;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => {
          playClick();
          setOpen(!open);
        }}
        className={iconButtonClass}
        aria-label="Sound settings"
        aria-expanded={open}
      >
        <Icon size={20} />
      </button>

      <div
        className={`${panelClass} ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playClick();
              setMuted(!muted);
            }}
            className="text-secondary transition-colors hover:text-primary dark:text-white"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            <Icon size={18} />
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={muted ? 0 : Math.round(volume * 100)}
            onChange={(e) => {
              setVolume(Number(e.target.value) / 100);
              if (muted) setMuted(false);
            }}
            className="h-1 w-full cursor-pointer accent-primary"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}

export default VolumeControl;