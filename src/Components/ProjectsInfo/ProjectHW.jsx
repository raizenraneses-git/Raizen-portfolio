import { useState, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSound } from "../Sound/soundControl";

const WEBSITE_URL = "https://www.inquirer.net/holy-week/";

/* ------------------------------ Gallery ------------------------------ */

function Gallery({ name, images, activeIndex, onPrev, onNext, onSelect }) {
  const hasMultiple = images.length > 1;

  return (
    <div className="flex flex-col gap-2 p-8 md:p-5 lg:p-8 bg-wbg-soft">
      <div className="relative flex-1 min-h-[260px] rounded-2xl overflow-hidden bg-white/40">
        {images[activeIndex] && (
          <img
            src={images[activeIndex]}
            alt={`${name} preview ${activeIndex + 1}`}
            className="w-full h-full object-contain"
          />
        )}

        {hasMultiple && (
          <>
            <button
              onClick={onPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white rounded-full p-2 transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>

            <button
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white rounded-full p-2 transition-colors"
            >
              <FiChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                idx === activeIndex
                  ? "border-primary scale-105"
                  : "border-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Details ------------------------------ */

function Details({ name, description, tools, onLinkClick }) {
  return (
    <div className="flex flex-col justify-between p-5 md:p-12 lg:p-9 font-poppins text-primary bg-wbg-soft">
      <div>
        <h1 className="text-4xl lg:text-3xl font-bold mt-3">{name}</h1>

        <p className="text-Ldescription text-justify mt-4 leading-relaxed text-xs">
          {description}
        </p>
      </div>

      {tools.length > 1 && (
        <div className="mt-6 lg:mt-5">
          <p className="text-sm text-secondary mb-3 font-semibold">
            Softwared Tools
          </p>

          <div className="flex flex-wrap gap-2">
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      <a
        href={WEBSITE_URL}
        target="_blank"
        rel="noopener"
        onClick={onLinkClick}
        className="group flex flex-wrap items-center bg-primary font-poppins text-white hover:text-secondary text-xs transition-all duration-300 hover:bg-alternative hover:scale-105 rounded-2xl gap-3 w-50 h-8 mt-5 lg:mt-5"
      >
        <span className="ml-9">View on Website</span>
        <FaExternalLinkAlt className="text-xs" />
      </a>
    </div>
  );
}

/* ------------------------------ Modal ------------------------------ */

export default function ProjectHW({ isOpen, onClose, project }) {
  const { playClick, playClickLD, playBackMenu } = useSound();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen, project]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const { name, description, images = [], tools = [] } = project;

  const handleClose = () => {
    playBackMenu();
    onClose();
  };

  const handlePrev = () => {
    playClick();
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const handleNext = () => {
    playClick();
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const handleSelect = (idx) => {
    setActiveIndex(idx);
    playClick();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto bg-white/10 backdrop-blur-xl p-4 scroll-smooth"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-2xl max-h-[calc(100vh-2rem)] bg-white rounded-3xl overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl my-4 md:my-0 scroll-smooth scrollbar-none"
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-text hover:text-primary transition-colors"
        >
          <FiX size={18} />
        </button>

        <Gallery
          name={name}
          images={images}
          activeIndex={activeIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelect={handleSelect}
        />

        <Details
          name={name}
          description={description}
          tools={tools}
          onLinkClick={playClickLD}
        />
      </div>
    </div>
  );
}