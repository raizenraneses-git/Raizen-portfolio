import { useState, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from
"react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";


/**
 * ProjectSDL
 *
 * Usage:
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   <button onClick={() => setIsOpen(true)}>Information</button>
 *
 *   <ProjectInfoModal
 *     isOpen={isOpen}
 *     onClose={() => setIsOpen(false)}
 *     project={{
 *       name: "Raizen Portfolio",
 *       description: "A personal portfolio built to showcase my projects and skills.",
 *       images: ["/images/project1-1.png", "/images/project1-2.png", "/images/project1-3.png"],
 *       tools: ["React", "Vite", "Tailwind CSS"],
 *     }}
 *   />
 */

export default function ProjectSDL({ isOpen, onClose, project }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to the first image every time a new project is opened
  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen, project]);

  // Close on Escape + lock background scroll while open
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

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const goNext = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div
      // MOBILE FIX:
      // Added overflow-y-auto so the whole modal can be scrolled on phones.
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto bg-white/10 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <div
        // MOBILE FIX:
        // max-h-[calc(100vh-2rem)] keeps the modal inside the phone screen.
        // overflow-y-auto allows the modal content to scroll vertically.
        className="relative w-full max-w-4xl max-h-[calc(100vh-2rem)] bg-white rounded-3xl overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl my-4 md:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-text hover:text-primary transition-colors"
        >
          <FiX size={18} />
        </button>

        {/* LEFT SIDE — images */}
        <div className="flex flex-col gap-3 p-6 bg-white">
          {/* Main image */}
          <div className="relative flex-1 min-h-[260px] rounded-2xl overflow-hidden bg-white/40">
            {images[activeIndex] && (
              <img
                src={images[activeIndex]}
                alt={`${name} preview ${activeIndex + 1}`}
                className="w-full h-full object-contain"
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white rounded-full p-2 transition-colors"
                >
                  <FiChevronLeft size={18} />
                </button>

                <button
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white rounded-full p-2 transition-colors"
                >
                  <FiChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails — small, centered, clickable */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
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

        {/* RIGHT SIDE — details */}
        <div className="flex flex-col justify-between p-9 font-poppins text-primary">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>

            <p className="text-text mt-4 leading-relaxed text-xs">
              {description}
            </p>
          </div>

          {tools.length > 0 && (
            <div className="mt-4">
              <p className="text-sm mb-3">Softwared Tools</p>

              <div className="flex flex-wrap gap-1">
                {tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="bg-primary/20 text-text text-xs px-2 py-1 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a
            href="https://pop.inquirer.net/"
            target="_blank"
            rel="noopener"
            className="group flex flex-wrap items-center bg-primary font-poppins text-white text-xs rounded-2xl gap-5 w-50 h-8 mt-5"
          >
            <span className="ml-9">
              View on Website
            </span>

            <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
}