import { useState, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ------------------------------------------------------------
// CERTIFICATE IMAGES
// Dati PDF ang ini-import dito. Ngayon, IMAGE (png/jpg) na.
// Ilagay mo yung mga image files sa: src/assets/documents/
// Pwede kang magdagdag ng maraming image per certificate (see below).
// ------------------------------------------------------------
import gnCert from "../assets/documents/gnImages/gnCert.png";
import gnCert2 from "../assets/documents/gnImages/gnCert2.png";
import gnCert3 from "../assets/documents/gnImages/gnCert3.png";
import gnCert4 from "../assets/documents/gnImages/gnCert4.png";

import inquirerCert from "../assets/documents/inquirerImages/inquirerCert.png"

import reactCert from "../assets/documents/reactCert.png";
import seCert from "../assets/documents/seCert.png";
import dsCert from "../assets/documents/dsCert.png";
import ethicalCert from "../assets/documents/ethicalCert.png";


// ------------------------------------------------------------
// CERTIFICATE DATA
// Dito nakalagay lahat ng info na lalabas sa modal (popup).
// - title       : pangalan ng certificate
// - description : paliwanag tungkol sa certificate
// - date        : kailan mo nakuha
// - link        : link ng certificate (kung walang link, "" lang)
// - images      : listahan ng pictures. Kung more than 1, may arrows
//                 at thumbnails na lalabas. Halimbawa: [gnCert, gnCert2]
// ------------------------------------------------------------
const gnData = {
    title: "Certificate of Recognition - Gawad Ningas Award",
    description:
        "Awarded by National Teachers College in recognition of outstanding achievement and dedication in best capstone.",
    date: "MAY 2026",
    link: "",
    images: [gnCert, gnCert2, gnCert3, gnCert4],
};

const webData = {
    title: "Certificate of Completion - Web Developer",
    description:
        "Awarded by Inquirer Interactive upon completing the Web Developer as an Intern program.",
    date: "MAY 2026",
    link: "",
    images: [inquirerCert],
};

const reactData = {
    title: "Certificate of Completion - Developing Front-end Apps with React",
    description:
        "Awarded by IBM upon completing the course on building front-end applications using React.",
    date: "MAY 2026",
    link: "https://coursera.org/share/b57073bf53d3d6a40ee0eb25d6e43b7a",
    images: [reactCert],
};

const softwareData = {
    title: "Certificate of Completion - Software Engineer",
    description:
        "Awarded by IBM upon completing the course on understanding the fundamentals of Software Engineer.",
    date: "MAY 2025",
    link: "https://coursera.org/share/b73a44c6f9b442f5e739370d3572dedf",
    images: [seCert],
};

const dsData = {
    title: "Certificate of Completion - Data Science Ethics",
    description:
        "Awarded by the University of Michigan upon completing a course on ethical principles and responsible practices in data science.",
    date: "SEP 2025",
    link: "https://coursera.org/share/cc304008087cd492a7c65f60e9aaf317",
    images: [dsCert],
};

const ethicalData = {
    title: "Certificate of Completion - Ethical Issues in AI and Professional Ethics",
    description:
        "Awarded by the University of Colorado Boulder upon completing a course exploring ethical issues in artificial intelligence and professional responsibility.",
    date: "SEP 2025",
    link: "https://coursera.org/share/afcc3047b6e19730bbd5e320131cc45b",
    images: [ethicalCert],
};



// ------------------------------------------------------------
// CERTIFICATE MODAL (yung popup na lalabas pag clinick ang "View")
// Left side  : Image(s) ng certificate
// Right side : Title, Description, Date, View button (kung may link)
// ------------------------------------------------------------
function CertificateModal({ isOpen, onClose, certificate }) {
    // Para malaman kung anong image ang kasalukuyang pinapakita
    const [activeIndex, setActiveIndex] = useState(0);

    // Bumalik sa first image tuwing may bubuksan na certificate
    useEffect(() => {
        if (isOpen) setActiveIndex(0);
    }, [isOpen, certificate]);

    // Close pag pinindot ang Escape + i-lock ang scroll ng background
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        // Cleanup: ibalik sa normal pag nag-close
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    // Kung hindi open o walang certificate, wala tayong ipapakita
    if (!isOpen || !certificate) return null;

    // FIXED: dinagdag ang "link" dito
    const { title, description, date, link, images = [] } = certificate;

    // Previous image (kung nasa first, pupunta sa last)
    const goPrev = () =>
        setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));

    // Next image (kung nasa last, babalik sa first)
    const goNext = () =>
        setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

    return (
        // Dark/blur na background. Pag clinick ito, magca-close ang modal.
        <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto bg-white/10 backdrop-blur-xl p-4 scroll-smooth"
            onClick={onClose}
        >
            {/* White box ng modal. stopPropagation = hindi magca-close pag sa loob nag-click */}
            <div
                className="relative w-full md:max-w-3xl max-h-[calc(100vh-2rem)] bg-white rounded-3xl overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl my-4 md:my-0 scroll-smooth scrollbar-none"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button (X) */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 text-text hover:text-primary transition-colors"
                >
                    <FiX size={18} />
                </button>

                {/* LEFT SIDE — Image ng Certificate */}
                <div className="flex flex-col gap-2 p-8 md:p-5 lg:p-8 bg-white">
                    {/* Main image */}
                    <div className="relative flex-1 min-h-[260px] rounded-2xl overflow-hidden bg-white/40">
                        {images[activeIndex] && (
                            <img
                                src={images[activeIndex]}
                                alt={`${title} preview ${activeIndex + 1}`}
                                className="w-full h-full object-contain"
                            />
                        )}

                        {/* Arrows — lalabas lang kung more than 1 ang image */}
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

                    {/* Thumbnails — maliliit na pictures sa baba, pwedeng iclick */}
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
                                        alt={`${title} thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE — Title, Description, Date, View button */}
                <div className="flex flex-col justify-between p-5 md:p-12 lg:p-9 font-poppins text-primary">
                    <div>
                        {/* Certificate Title */}
                        <h1 className="text-3xl lg:text-2xl font-bold mt-3">{title}</h1>

                        {/* Description about the Certificate */}
                        <p className="text-Ldescription text-justify mt-4 mb-10 leading-relaxed text-xs">
                            {description}
                        </p>
                    </div>

                    {/* Date of Accomplished */}
                    <div className="mt-6 lg:mt-0">
                        <p className="text-sm text-secondary mb-3 font-semibold">
                            Date of Accomplished
                        </p>

                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {date}
                        </span>

                        {/* View button: lalabas lang kung may link */}
                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-fit mt-5 bg-primary text-white text-xs px-5 py-2 rounded-2xl hover:bg-alternative transition-colors"
                            >
                                View
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Credentials() {
    // Dito itatabi kung aling certificate ang bubuksan.
    // null = sarado ang modal. Kapag may laman = bukas ang modal.
    const [selectedCert, setSelectedCert] = useState(null);

    return (

        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-secondary/2 dark:bg-dbg/98">

            {/*Structure of the Components*/}
            <div
            className="mx-auto max-w-7xl items-center mt-10">

                {/*Mini Description*/}
                <div
                className="font-poppins text-2xl sm:text-3xl lg:text-3xl text-primary mb-6 sm:mb-8 lg:mb-10">
                    Credentials
                </div>

                {/*Main Description*/}
                <div className="font-poppins text-[40px] sm:text-[52px] lg:text-[64px] font-bold">
                    <span className="text-secondary dark:text-white">
                        Certifications &</span>{" "}
                    <span
                    className="text-primary">
                        Training
                    </span>
                </div>

                {/*Main Contents*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto max-w-7xl mt-8 sm:mt-10">

                    {/*First Card*/}
                    <div className="border border-primary rounded-2xl min-w-0">

                        <div
                        className="font-poppins text-primary font-bold text-[20px] sm:text-[22px] lg:text-[24px] pl-5 pr-5 sm:pr-8 lg:pr-10 pt-5">
                            MAY 2026
                        </div>

                        <div
                        className="font-poppins text-text text-[20px] sm:text-[22px] lg:text-[24px] font-bold pl-5 pt-3 pr-5 sm:pr-8 lg:pr-10 break-words text-secondary dark:text-white">
                            Certificate of Recognition - Gawad Ningas Award
                        </div>

                        <div
                        className="font-poppins text-Ldescription dark:text-Ddescription text-[14px] sm:text-[15px] lg:text-[16px] italic pl-5 pr-5 sm:pr-8 lg:pr-10 pt-3 break-words">
                            NATIONAL TEACHERS COLLEGE
                        </div>

                        <button
                        type="button"
                        onClick={() => setSelectedCert(gnData)}
                        className="
                        group
                        relative
                        isolate
                        overflow-hidden
                        inline-block
                        font-poppins
                        text-white
                        dark:text-white
                        bg-primary
                        hover:text-secondary
                        hover:scale-105
                        hover:-translate-y-0.5
                        hover:-rotate-2
                        hover:tracking-widest
                        active:scale-95
                        hover:shadow-[4px_4px_0_0_#1e6bff]
                        text-[12px]
                        rounded-2xl
                        p-2
                        px-5
                        py-1
                        ml-5
                        mt-3
                        mb-3
                        transition-all
                        duration-300
                        ease-out
                        before:content-['']
                        before:absolute
                        before:inset-y-0
                        before:-left-6
                        before:-z-10
                        before:w-[150%]
                        before:bg-alternative
                        before:-skew-x-[20deg]
                        before:-translate-x-full
                        hover:before:translate-x-0
                        before:transition-transform
                        before:duration-300
                        before:ease-out
                        " >
                        View </button>

                    </div>

                    {/*Second Card*/}
                    <div className="border border-primary rounded-2xl min-w-0">

                        <div
                        className="font-poppins text-primary font-bold text-[20px] sm:text-[22px] lg:text-[24px] pl-5 pr-5 sm:pr-8 lg:pr-10 pt-5">
                            MAY 2026
                        </div>

                        <div
                        className="font-poppins text-secondary dark:text-white text-[20px] sm:text-[22px] lg:text-[24px] font-bold pl-5 pt-3 pr-5 sm:pr-8 lg:pr-10 break-words">
                            Certificate of Completion - Web Developer
                        </div>

                        <div
                        className="font-poppins text-Ldescription dark:text-Ddescription text-[14px] sm:text-[15px] lg:text-[16px] italic pl-5 pr-5 sm:pr-8 lg:pr-10 pt-3 break-words">
                            Inquirer Interactive
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedCert(webData)}
                            className="
                            group
                            relative
                            isolate
                            overflow-hidden
                            inline-block
                            font-poppins
                            text-white
                            dark:text-white
                            bg-primary
                            hover:text-secondary
                            hover:scale-105
                            hover:-translate-y-0.5
                            hover:-rotate-2
                            hover:tracking-widest
                            active:scale-95
                            hover:shadow-[4px_4px_0_0_#1e6bff]
                            text-[12px]
                            rounded-2xl
                            p-2
                            px-5
                            py-1
                            ml-5
                            mt-3
                            mb-3
                            transition-all
                            duration-300
                            ease-out
                            before:content-['']
                            before:absolute
                            before:inset-y-0
                            before:-left-6
                            before:-z-10
                            before:w-[150%]
                            before:bg-alternative
                            before:-skew-x-[20deg]
                            before:-translate-x-full
                            hover:before:translate-x-0
                            before:transition-transform
                            before:duration-300
                            before:ease-out
                            "
                        >
                            View
                        </button>

                    </div>

                    {/*Third Card*/}
                    <div className="border border-primary rounded-2xl min-w-0">

                        <div
                        className="font-poppins text-primary font-bold text-[20px] sm:text-[22px] lg:text-[24px] pl-5 pr-5 sm:pr-8 lg:pr-10 pt-5">
                            MAY 2026
                        </div>

                        <div
                        className="font-poppins text-secondary dark:text-white text-[20px] sm:text-[22px] lg:text-[24px] font-bold pl-5 pt-3 pr-5 sm:pr-8 lg:pr-10 break-words">
                            Certificate of Completion - Developing Front-end Apps with React
                        </div>

                        <div
                        className="font-poppins text-Ldescription dark:text-Ddescription text-[14px] sm:text-[15px] lg:text-[16px] italic pl-5 pr-5 sm:pr-8 lg:pr-10 pt-3 break-words">
                            IBM
                        </div>

                        <button
                        type="button"
                        onClick={() => setSelectedCert(reactData)}
                        className="
                        group
                            relative
                            isolate
                            overflow-hidden
                            inline-block
                            font-poppins
                            text-white
                            dark:text-white
                            bg-primary
                            hover:text-secondary
                            hover:scale-105
                            hover:-translate-y-0.5
                            hover:-rotate-2
                            hover:tracking-widest
                            active:scale-95
                            hover:shadow-[4px_4px_0_0_#1e6bff]
                            text-[12px]
                            rounded-2xl
                            p-2
                            px-5
                            py-1
                            ml-5
                            mt-3
                            mb-3
                            transition-all
                            duration-300
                            ease-out
                            before:content-['']
                            before:absolute
                            before:inset-y-0
                            before:-left-6
                            before:-z-10
                            before:w-[150%]
                            before:bg-alternative
                            before:-skew-x-[20deg]
                            before:-translate-x-full
                            hover:before:translate-x-0
                            before:transition-transform
                            before:duration-300
                            before:ease-out
                        " > View </button>
                    </div>


                    {/*Fourth Card*/}
                    <div className="border border-primary rounded-2xl min-w-0">

                        <div
                        className="font-poppins text-primary font-bold text-[20px] sm:text-[22px] lg:text-[24px] pl-5 pr-5 sm:pr-8 lg:pr-10 pt-5">
                            SEP 2025
                        </div>

                        <div
                        className="font-poppins text-secondary dark:text-white text-[20px] sm:text-[22px] lg:text-[24px] font-bold pl-5 pt-3 pr-5 sm:pr-8 lg:pr-10 break-words">
                            Certificate of Completion - Software Engineer
                        </div>

                        <div
                        className="font-poppins text-Ldescription dark:text-Ddescription text-[14px] sm:text-[15px] lg:text-[16px] italic pl-5 pr-5 sm:pr-8 lg:pr-10 pt-3 break-words">
                            International Business Machines Co.
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedCert(softwareData)}
                            className="
                            group
                            relative
                            isolate
                            overflow-hidden
                            inline-block
                            font-poppins
                            text-white
                            dark:text-white
                            bg-primary
                            hover:text-secondary
                            hover:scale-105
                            hover:-translate-y-0.5
                            hover:-rotate-2
                            hover:tracking-widest
                            active:scale-95
                            hover:shadow-[4px_4px_0_0_#1e6bff]
                            text-[12px]
                            rounded-2xl
                            p-2
                            px-5
                            py-1
                            ml-5
                            mt-3
                            mb-3
                            transition-all
                            duration-300
                            ease-out
                            before:content-['']
                            before:absolute
                            before:inset-y-0
                            before:-left-6
                            before:-z-10
                            before:w-[150%]
                            before:bg-alternative
                            before:-skew-x-[20deg]
                            before:-translate-x-full
                            hover:before:translate-x-0
                            before:transition-transform
                            before:duration-300
                            before:ease-out
                            "
                        >
                            View
                        </button>

                    </div>

                    {/*Fifth Card*/}
                    <div className="border border-primary rounded-2xl min-w-0">

                        <div
                        className="font-poppins text-primary font-bold text-[20px] sm:text-[22px] lg:text-[24px] pl-5 pr-5 sm:pr-8 lg:pr-10 pt-5">
                            SEP 2025
                        </div>

                        <div
                        className="font-poppins text-secondary dark:text-white text-[20px] sm:text-[22px] lg:text-[24px] font-bold pl-5 pt-3 pr-5 sm:pr-8 lg:pr-10 break-words">
                            Certificate of Completion - Data Science Ethics
                        </div>

                        <div
                        className="font-poppins text-Ldescription dark:text-Ddescription text-[14px] sm:text-[15px] lg:text-[16px] italic pl-5 pr-5 sm:pr-8 lg:pr-10 pt-3 break-words">
                            University of Michigan
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedCert(dsData)}
                            className="
                            group
                            relative
                            isolate
                            overflow-hidden
                            inline-block
                            font-poppins
                            text-white
                            dark:text-white
                            bg-primary
                            hover:text-secondary
                            hover:scale-105
                            hover:-translate-y-0.5
                            hover:-rotate-2
                            hover:tracking-widest
                            active:scale-95
                            hover:shadow-[4px_4px_0_0_#1e6bff]
                            text-[12px]
                            rounded-2xl
                            p-2
                            px-5
                            py-1
                            ml-5
                            mt-3
                            mb-3
                            transition-all
                            duration-300
                            ease-out
                            before:content-['']
                            before:absolute
                            before:inset-y-0
                            before:-left-6
                            before:-z-10
                            before:w-[150%]
                            before:bg-alternative
                            before:-skew-x-[20deg]
                            before:-translate-x-full
                            hover:before:translate-x-0
                            before:transition-transform
                            before:duration-300
                            before:ease-out
                            "
                        >
                            View
                        </button>

                    </div>

                    {/*Sixth Card*/}
                    <div className="border border-primary rounded-2xl min-w-0">

                        <div
                        className="font-poppins text-primary font-bold text-[20px] sm:text-[22px] lg:text-[24px] pl-5 pr-5 sm:pr-8 lg:pr-10 pt-5">
                            SEP 2024
                        </div>

                        <div
                        className="font-poppins text-secondary dark:text-white text-[20px] sm:text-[22px] lg:text-[24px] font-bold pl-5 pt-3 pr-5 sm:pr-8 lg:pr-10 break-words">
                            Certificate of Completion - Ethical Issues in AI and Professional Ethics
                        </div>

                        <div
                        className="font-poppins text-Ldescription dark:text-Ddescription text-[14px] sm:text-[15px] lg:text-[16px] italic pl-5 pr-5 sm:pr-8 lg:pr-10 pt-3 break-words">
                            University of Colorado Boulder
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedCert(ethicalData)}
                            className="
                            group
                            relative
                            isolate
                            overflow-hidden
                            inline-block
                            font-poppins
                            text-white
                            dark:text-white
                            bg-primary
                            hover:text-secondary
                            hover:scale-105
                            hover:-translate-y-0.5
                            hover:-rotate-2
                            hover:tracking-widest
                            active:scale-95
                            hover:shadow-[4px_4px_0_0_#1e6bff]
                            text-[12px]
                            rounded-2xl
                            p-2
                            px-5
                            py-1
                            ml-5
                            mt-3
                            mb-3
                            transition-all
                            duration-300
                            ease-out
                            before:content-['']
                            before:absolute
                            before:inset-y-0
                            before:-left-6
                            before:-z-10
                            before:w-[150%]
                            before:bg-alternative
                            before:-skew-x-[20deg]
                            before:-translate-x-full
                            hover:before:translate-x-0
                            before:transition-transform
                            before:duration-300
                            before:ease-out
                            "
                        >
                            View
                        </button>

                    </div>

                </div>

            </div>

            {/* MODAL: lalabas lang kapag may napiling certificate.
                Pag nag-close, ibabalik sa null para magsara. */}
            <CertificateModal
                isOpen={selectedCert !== null}
                onClose={() => setSelectedCert(null)}
                certificate={selectedCert}
            />
        </section>
    );
}

export default Credentials;