import { useState, useEffect, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiX, FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useSound } from "./Sound/soundControl";

import gnCert from "../assets/documents/gnImages/gnCert.png";
import gnCert2 from "../assets/documents/gnImages/gnCert2.png";
import gnCert3 from "../assets/documents/gnImages/gnCert3.png";
import gnCert4 from "../assets/documents/gnImages/gnCert4.png";
import inquirerCert from "../assets/documents/inquirerImages/inquirerCert.png";
import reactCert from "../assets/documents/reactCert.png";
import seCert from "../assets/documents/seCert.png";
import dsCert from "../assets/documents/dsCert.png";
import ethicalCert from "../assets/documents/ethicalCert.png";

/* ---------- Data ---------- */

// `cardDate` is what the card shows; `details` is what the modal shows.
// `link: ""` hides the "View Online Certificate" button; more than one image enables arrows and thumbnails.
const certificates = [
  {
    cardDate: "MAY 2026",
    issuer: "NATIONAL TEACHERS COLLEGE",
    details: {
      title: "Certificate of Recognition - Gawad Ningas Award",
      description:
        "Awarded by National Teachers College in recognition of outstanding achievement and dedication in best capstone.",
      date: "MAY 2026",
      link: "",
      images: [gnCert, gnCert2, gnCert3, gnCert4],
    },
  },
  {
    cardDate: "MAY 2026",
    issuer: "Inquirer Interactive",
    details: {
      title: "Certificate of Completion - Web Developer",
      description:
        "Awarded by Inquirer Interactive upon completing the Web Developer as an Intern program.",
      date: "MAY 2026",
      link: "",
      images: [inquirerCert],
    },
  },
  {
    cardDate: "MAY 2026",
    issuer: "International Business Machines Co.",
    details: {
      title: "Certificate of Completion - Developing Front-end Apps with React",
      description:
        "Awarded by IBM upon completing the course on building front-end applications using React.",
      date: "MAY 2026",
      link: "https://coursera.org/share/b57073bf53d3d6a40ee0eb25d6e43b7a",
      images: [reactCert],
    },
  },
  {
    cardDate: "SEP 2025",
    issuer: "International Business Machines Co.",
    details: {
      title: "Certificate of Completion - Software Engineer",
      description:
        "Awarded by IBM upon completing the course on understanding the fundamentals of Software Engineer.",
      date: "MAY 2025",
      link: "https://coursera.org/share/b73a44c6f9b442f5e739370d3572dedf",
      images: [seCert],
    },
  },
  {
    cardDate: "SEP 2025",
    issuer: "University of Michigan",
    details: {
      title: "Certificate of Completion - Data Science Ethics",
      description:
        "Awarded by the University of Michigan upon completing a course on ethical principles and responsible practices in data science.",
      date: "SEP 2025",
      link: "https://coursera.org/share/cc304008087cd492a7c65f60e9aaf317",
      images: [dsCert],
    },
  },
  {
    cardDate: "SEP 2024",
    issuer: "University of Colorado Boulder",
    details: {
      title: "Certificate of Completion - Ethical Issues in AI and Professional Ethics",
      description:
        "Awarded by the University of Colorado Boulder upon completing a course exploring ethical issues in artificial intelligence and professional responsibility.",
      date: "SEP 2025",
      link: "https://coursera.org/share/afcc3047b6e19730bbd5e320131cc45b",
      images: [ethicalCert],
    },
  },
];

/* ---------- Styles ---------- */

const eyebrowClass =
  "mb-6 font-poppins text-2xl text-primary sm:mb-8 sm:text-3xl lg:mb-10 lg:text-3xl";

const headingClass =
  "font-poppins text-[40px] font-bold sm:text-[52px] lg:text-[64px]";

const gridClass =
  "mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3";

const cardClass =
  "min-w-0 rounded-2xl border border-primary/60 bg-wbg hover:border-primary hover:shadow-[0_8px_30px_rgba(30,107,255,0.35)] dark:bg-dbg";

const cardDateClass =
  "pl-5 pr-5 pt-5 font-poppins text-[20px] font-bold text-primary sm:pr-8 sm:text-[22px] lg:pr-10 lg:text-[24px]";

const cardTitleClass =
  "break-words pl-5 pr-5 pt-3 font-poppins text-[20px] font-bold text-secondary sm:pr-8 sm:text-[22px] lg:pr-10 lg:text-[24px] dark:text-white";

const cardIssuerClass =
  "break-words pl-5 pr-5 pt-3 font-poppins text-[14px] italic text-Ldescription sm:pr-8 sm:text-[15px] lg:pr-10 lg:text-[16px] dark:text-Ddescription";

const viewButtonClass = [
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden",
  "ml-5 mt-3 mb-3 rounded-2xl p-2 px-5 py-1",
  "bg-primary font-poppins text-[12px] text-white dark:text-white hover:text-secondary",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-0.5 hover:-rotate-2 hover:scale-105 hover:tracking-widest",
  "hover:shadow-[4px_4px_0_0_#1e6bff] active:scale-95",
  "before:absolute before:inset-y-0 before:-left-6 before:-z-10 before:w-[150%]",
  "before:content-[''] before:bg-alternative before:-skew-x-[20deg] before:-translate-x-full",
  "before:transition-transform before:duration-300 before:ease-out",
  "hover:before:translate-x-0",
].join(" ");

const modalArrowClass =
  "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-primary";

/* ---------- Hooks ---------- */

function useModalBehavior(isOpen, onClose) {
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
}

/* ---------- Reveal (fades in once when scrolled into view) ---------- */

function Reveal({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (boxRef.current) observer.observe(boxRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {children}
    </div>
  );
}

/* ---------- Modal ---------- */

function CertificateGallery({ title, images, activeIndex, onChange }) {
  const { playClick } = useSound();

  const goPrev = () => onChange(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  const goNext = () => onChange(activeIndex === images.length - 1 ? 0 : activeIndex + 1);

  return (
    <div className="flex flex-col gap-2 bg-white p-8 md:p-5 lg:p-8">
      <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-2xl bg-white/40">
        {images[activeIndex] && (
          <img
            src={images[activeIndex]}
            alt={`${title} preview ${activeIndex + 1}`}
            className="h-full w-full object-contain"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={() => {
                goPrev();
                playClick();
              }}
              aria-label="Previous image"
              className={`${modalArrowClass} left-2`}
            >
              <FiChevronLeft size={18} />
            </button>

            <button
              onClick={() => {
                goNext();
                playClick();
              }}
              aria-label="Next image"
              className={`${modalArrowClass} right-2`}
            >
              <FiChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                onChange(idx);
                playClick();
              }}
              className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                idx === activeIndex
                  ? "scale-105 border-primary"
                  : "border-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CertificateInfo({ title, description, date, link }) {
  const { playClickLD } = useSound();

  return (
    <div className="flex flex-col justify-between p-5 font-poppins text-primary md:p-5 lg:p-5">
      <div>
        <h1 className="mt-3 text-2xl font-bold lg:text-2xl">{title}</h1>

        <p className="mb-3 mt-4 text-justify text-xs leading-relaxed text-Ldescription">
          {description}
        </p>
      </div>

      <div className="mt-2 lg:mt-5">
        <p className="mb-3 text-sm font-semibold text-secondary">
          Date of Accomplished
        </p>

        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
          {date}
        </span>

        {link && (
          <a
            href={link}
            target="_blank"
            onClick={playClickLD}
            rel="noopener noreferrer"
            className="group mt-5 flex h-8 w-59 flex-wrap items-center gap-3 rounded-2xl bg-primary font-poppins text-xs font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-alternative hover:text-secondary lg:mt-5"
          >
            <span className="ml-9">View Online Certificate</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>
        )}
      </div>
    </div>
  );
}

function CertificateModal({ isOpen, onClose, certificate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { playBackMenu } = useSound();

  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen, certificate]);

  useModalBehavior(isOpen, onClose);

  if (!isOpen || !certificate) return null;

  const { title, description, date, link, images = [] } = certificate;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto scroll-smooth bg-white/10 p-4 backdrop-blur-xl md:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-4 grid max-h-[calc(100vh-2rem)] w-full grid-cols-1 overflow-y-auto scroll-smooth rounded-3xl bg-white shadow-2xl scrollbar-none md:my-0 md:max-w-2xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playBackMenu();
            onClose();
          }}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 text-text transition-colors hover:text-primary"
        >
          <FiX size={18} />
        </button>

        <CertificateGallery
          title={title}
          images={images}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />

        <CertificateInfo
          title={title}
          description={description}
          date={date}
          link={link}
        />
      </div>
    </div>
  );
}

/* ---------- Card ---------- */

function CredentialCard({ certificate, onSelect }) {
  const { cardDate, issuer, details } = certificate;

  return (
    <Reveal className={cardClass}>
      <div className={cardDateClass}>{cardDate}</div>
      <div className={cardTitleClass}>{details.title}</div>
      <div className={cardIssuerClass}>{issuer}</div>

      <button
        type="button"
        onClick={() => onSelect(details)}
        className={viewButtonClass}
      >
        <FiEye size={15} />
        View Credential
      </button>
    </Reveal>
  );
}

/* ---------- Credentials ---------- */

function Credentials() {
  const { playClick } = useSound();
  const [selectedCert, setSelectedCert] = useState(null);

  const handleSelect = (details) => {
    playClick();
    setSelectedCert(details);
  };

  return (
    <section className="w-full bg-wbg-soft px-6 py-10 sm:px-6 lg:px-8 dark:bg-dbg-soft">
      <div className="mx-auto mt-10 max-w-7xl items-center">
        <div className={eyebrowClass}>Credentials</div>

        <div className={headingClass}>
          <span className="text-secondary dark:text-white">Certifications &</span>{" "}
          <span className="text-primary">Training</span>
        </div>

        <div className={gridClass}>
          {certificates.map((certificate) => (
            <CredentialCard
              key={certificate.details.title}
              certificate={certificate}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <CertificateModal
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </section>
  );
}

export default Credentials;