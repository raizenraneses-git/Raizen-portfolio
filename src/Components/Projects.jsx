// Dinagdagan ng useEffect at useRef para sa scroll detection
import { useState, useEffect, useRef } from "react";

import SandreaLee from "../assets/projects/project1.png";
import Pop from "../assets/projects/project2.png";
import WP from "../assets/projects/project3.png";
import HW from "../assets/projects/project4.png";


// Tinanggal na ang FiChevronDown at FiChevronUp dahil wala nang button
import { FiInfo } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import ProjectSDL from "./ProjectsInfo/ProjectSDL";
import sdleeOne from "../assets/sandreaLeeImages/image1.png"
import sdleeTwo from "../assets/sandreaLeeImages/image2.png"
import sdleeThree from "../assets/sandreaLeeImages/image3.png"
import sdleeFour from "../assets/sandreaLeeImages/image4.png"
import sdleeFive from "../assets/sandreaLeeImages/image5.png"

import ProjectPop from "./ProjectsInfo/ProjectPop";
import popImageOne from "../assets/popImage/image1.png"
import popImageTwo from "../assets/popImage/image2.png"
import popImageThree from "../assets/popImage/image3.png"

import ProjectWP from "./ProjectsInfo/ProjectWP"
import wpOne from "../assets/wpImage/image1.png"
import wpTwo from "../assets/wpImage/image2.png"
import wpThree from "../assets/wpImage/image3.png"
import wpFour from "../assets/wpImage/image4.png"

import ProjectHW from "./ProjectsInfo/ProjectHW"
import hwOne from "../assets/hwImage/image1.png"
import hwTwo from "../assets/hwImage/image2.png"
import hwThree from "../assets/hwImage/image3.png"
import hwFour from "../assets/hwImage/image4.png"

// ===== REVEAL COMPONENT =====
// Pambalot ito. Ang laman niya ay lalabas na may animation kapag nakita na sa screen.
function Reveal({ children }) {

    // false = hindi pa nakikita (nakatago), true = nakita na (lalabas na)
    const [isVisible, setIsVisible] = useState(false);

    // Ito ang "pangturo" natin kung aling box ang babantayan
    const boxRef = useRef(null);

    useEffect(() => {
        // Ang observer ay nagbabantay kung pumasok na ang box sa screen
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Kapag nakita na sa screen
                if (entry.isIntersecting) {
                    setIsVisible(true);   // ipakita na
                    observer.disconnect(); // tigil na ang pagbabantay (isang beses lang lalabas)
                }
            },
            { threshold: 0.2 } // lalabas kapag 20% ng box ay nakikita na
        );

        // Simulan ang pagbabantay sa box
        if (boxRef.current) {
            observer.observe(boxRef.current);
        }

        // Linisin ang observer kapag nawala ang component
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={boxRef}
            // Kapag hindi pa visible: transparent at nasa ibaba ng kaunti
            // Kapag visible na: kita na at nasa tamang pwesto (gumagalaw paakyat)
            className={`transition-all duration-700 ease-out ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
            }`}
        >
            {children}
        </div>
    );
}

function Projects() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState("");

    // Tinanggal na ang showAll dahil scroll animation na ang gamit, hindi na button

    const projectSDL = {
        name: "Smart Automated Link & Operations Network",
        description:
            "A salon management system designed to streamline appointment booking, online shopping, and administrative tasks through an intuitive user experience.",
        images: [sdleeOne, sdleeTwo, sdleeThree, sdleeFour, sdleeFive],
        tools: ["React.Js", "Tailwind CSS", "Node.Js", "Typescript", "Figma"],
    };

    const projectPop = {
        name: "Pop!",
        description:
            "This was one of my final projects during my internship. I was assigned this task to strengthen my HTML and CSS fundamentals and learn how to build frontend pages using Elementor and WordPress with guidance from my team leader.",
        images: [popImageOne, popImageTwo, popImageThree],
        tools: ["HTML", "CSS", "Bootstrap", "Elementor", "Wordpress"],
    };

    const projectWP = {
        name: "Women Power",
        description:
            "Women of Power is a website created for Women’s Month that celebrates the achievements, and contributions of women. It features inspiring stories and highlights women who have made an impact in different fields. The website aims to recognize and empower women through a informative, and engaging design.",
        images: [wpOne, wpTwo, wpThree, wpFour],
        tools: ["HTML", "CSS", "Bootstrap", "Elementor", "Wordpress", "Figma"],
    };

    const projectHW = {
        name: "Holy Week",
        description:
            "Holy Week is a digital blog that features stories and important moments related to Semana Santa in the Philippines. It provides readers with information about the meaning of Holy Week and how Filipino communities observe this important religious tradition through faith, reflection, and cultural practices.",
        images: [hwOne, hwTwo, hwThree, hwFour],
        tools: ["HTML", "CSS", "Bootstrap", "Elementor", "Wordpress", "Figma"],
    };

    return (

        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-wbg dark:bg-dbg">

            <div
            className="w-full mx-auto max-w-7xl items-center mt-10 sm:px-0 lg:px-0">

                <div 
                className="font-poppins text-primary text-3xl">
                    Portfolio
                </div>

                <div 
                className="font-poppins text-secondary dark:text-white font-bold text-6xl mt-10">
                    Selected Project
                </div>

                {/* ===== FIRST PROJECT - SDL =====
                    Walang <Reveal> dito, kaya laging kita agad */}
                <div
                className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 mx-auto max-w-7xl mt-20">

                    <img
                    src={SandreaLee}
                    alt="Logo 1"
                    className="rounded-2xl h-auto w-full mx-auto shadow-2xl"
                    />

                    <div className="lg:mt-0 sm:mt-10">

                        <div
                        className="font-poppins text-primary font-bold text-3xl lg:text-4xl sm:text-4xl text-left ">
                            Smart Automated Link & Operations Network
                        </div>

                        <div
                        className="font-poppins text-Ldescription dark:text-Ddescription text-base mt-5 text-justify">
                            A salon management system designed to streamline appointment booking, online shopping, and administrative tasks through an intuitive user experience.
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300">

                            <div
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                React.Js
                            </div>

                            <div
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                Tailwind CSS
                            </div>

                            <div
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                Node.Js
                            </div>

                            <div
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                Typescript
                            </div>

                            <div
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                Canva
                            </div>

                        </div>

                        <div
                            className="group flex flex-wrap gap-2 mt-5">

                                <button
                                onClick={() => {
                                    setSelectedProject("sandreaLee");
                                    setIsModalOpen(true);
                                }}
                                className="group flex flex-wrap items-center text-white hover:text-secondary bg-primary hover:bg-alternative  font-poppins text-xs rounded-2xl gap-2 border-secondary transition-all duration-300 hover:scale-105 hover:shadow-lg py-2 px-5">

                                    <span
                                    className="">Information</span>

                                    <FiInfo className="text-sm"/>
                                    
                                </button>

                                <a
                                href="https://github.com/raizenraneses-git/SALON.git"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative isolate overflow-hidden flex flex-wrap items-center bg-black dark:bg-white font-poppins text-white text-xs rounded-2xl
                                    gap-2 border-black py-2 px-6
                                    transition-all duration-300 ease-out hover:scale-105 active:scale-95
                                    before:content-[''] before:absolute before:inset-y-0 before:-left-6 before:-z-10 before:w-[150%]
                                    before:bg-black dark:before:bg-white before:-skew-x-[20deg] before:-translate-x-full hover:before:translate-x-0
                                    before:transition-transform before:duration-300 before:delay-100 before:ease-out
                                    after:content-[''] after:absolute after:inset-y-0 after:-left-6 after:-z-20 after:w-[150%]
                                    after:bg-alternative after:-skew-x-[20deg] after:-translate-x-full hover:after:translate-x-0
                                    after:transition-transform after:duration-300 after:ease-out">
                                    
                                    <FaGithub className="text-sm dark:text-black"/>

                                    <span className="dark:text-black">
                                        View
                                    </span>
                                </a>
                        </div>

                    </div>


                </div>

                {/* ===== SECOND PROJECT - Pop! =====
                    Nakabalot sa <Reveal>, lalabas kapag na-scroll na */}
                <Reveal>
                    <div
                    className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 mx-auto max-w-7xl mt-20">

                        <img
                        src={Pop}
                        alt="Logo 2"
                        className="rounded-2xl h-auto w-full mx-auto shadow-2xl"
                        />

                        <div className="lg:mt-0 sm:mt-10">

                            <div
                            className="font-poppins text-primary font-bold text-3xl lg:text-4xl sm:text-4xl text-left ">
                                POP!
                            </div>

                            <div
                            className="font-poppins text-Ldescription dark:text-Ddescription text-base mt-5 text-justify">
                                POP! by Inquirer is an online media platform that delivers fresh, entertaining, and trend-focused stories. Its content is presented in a more casual and creative style compared with traditional news, making it accessible to readers who are interested in current pop culture and internet trends.
                            </div>

                            <div className="flex flex-wrap gap-2 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300">

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    HTML
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/10 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    CSS
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Bootstrap
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Wordpress
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Elementor
                                </div>

                            </div>

                            <div
                                className="group flex flex-wrap gap-2 mt-5">

                                    <button
                                    onClick={() => {
                                        setSelectedProject("pop");
                                        setIsModalOpen(true);
                                    }}
                                    className="group flex flex-wrap items-center text-white hover:text-secondary bg-primary hover:bg-alternative
                                    font-poppins text-xs rounded-2xl gap-2 border-secondary transition-all duration-300  hover:scale-105 hover:shadow-lg py-2 px-5">

                                        <span
                                        className="">Information</span>

                                        <FiInfo className="text-sm"/>
                                        
                                    </button>

                                    <a
                                    href="https://github.com/raizenraneses-git/Pop-.git"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative isolate overflow-hidden flex flex-wrap items-center bg-black dark:bg-white font-poppins text-white text-xs rounded-2xl
                                    gap-2 border-black py-2 px-6
                                    transition-all duration-300 ease-out hover:scale-105 active:scale-95
                                    before:content-[''] before:absolute before:inset-y-0 before:-left-6 before:-z-10 before:w-[150%]
                                    before:bg-black dark:before:bg-white before:-skew-x-[20deg] before:-translate-x-full hover:before:translate-x-0
                                    before:transition-transform before:duration-300 before:delay-100 before:ease-out
                                    after:content-[''] after:absolute after:inset-y-0 after:-left-6 after:-z-20 after:w-[150%]
                                    after:bg-alternative after:-skew-x-[20deg] after:-translate-x-full hover:after:translate-x-0
                                    after:transition-transform after:duration-300 after:ease-out">
                                        
                                        <FaGithub className="text-sm dark:text-black"/>

                                        <span className="dark:text-black">
                                            View
                                        </span>
                                    </a>
                            </div>

                        </div>

                    </div>
                </Reveal>

                {/* ===== THIRD PROJECT - Women Of Power ===== */}
                <Reveal>
                    <div
                    className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 mx-auto max-w-7xl mt-20">

                        <img
                        src={WP}
                        alt="Logo 3"
                        className="rounded-2xl h-auto w-full mx-auto shadow-2xl"
                        />

                        <div className="lg:mt-0 sm:mt-10">

                            <div
                            className="font-poppins text-primary font-bold text-3xl lg:text-4xl sm:text-4xl text-left ">
                                Women Of Power
                            </div>

                            <div
                            className="font-poppins text-Ldescription dark:text-Ddescription text-base mt-5 text-justify">
                                Women of Power is a website created for Women’s Month that celebrates the achievements, and contributions of women. It features inspiring stories and highlights women who have made an impact in different fields. The website aims to recognize and empower women through a informative, and engaging design.
                            </div>

                            <div className="flex flex-wrap gap-2 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300">

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    HTML
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    CSS
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Bootstrap
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Elementor
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Wordpress
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Figma
                                </div>

                            </div>

                            <div
                                className="group flex flex-wrap gap-2 mt-5">

                                    <button
                                    onClick={() => {
                                        setSelectedProject("wp");
                                        setIsModalOpen(true);
                                    }}
                                    className="group flex flex-wrap items-center text-white hover:text-secondary bg-primary hover:bg-alternative font-poppins text-xs rounded-2xl gap-2 border-secondary transition-all duration-300  hover:scale-105 hover:shadow-lg py-2 px-5">

                                        <span
                                        className="">Information</span>

                                        <FiInfo className="text-sm"/>
                                        
                                    </button>

                                    <a
                                    href="https://github.com/raizenraneses-git/Women-Power"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative isolate overflow-hidden flex flex-wrap items-center bg-black dark:bg-white font-poppins text-white text-xs rounded-2xl
                                    gap-2 border-black py-2 px-6
                                    transition-all duration-300 ease-out hover:scale-105 active:scale-95
                                    before:content-[''] before:absolute before:inset-y-0 before:-left-6 before:-z-10 before:w-[150%]
                                    before:bg-black dark:before:bg-white before:-skew-x-[20deg] before:-translate-x-full hover:before:translate-x-0
                                    before:transition-transform before:duration-300 before:delay-100 before:ease-out
                                    after:content-[''] after:absolute after:inset-y-0 after:-left-6 after:-z-20 after:w-[150%]
                                    after:bg-alternative after:-skew-x-[20deg] after:-translate-x-full hover:after:translate-x-0
                                    after:transition-transform after:duration-300 after:ease-out">
                                        
                                        <FaGithub className="text-sm dark:text-black"/>

                                        <span className="dark:text-black">
                                            View
                                        </span>
                                    </a>
                            </div>

                        </div>

                    </div>
                </Reveal>

                {/* ===== FOURTH PROJECT - Holy Week ===== */}
                <Reveal>
                    <div
                    className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 mx-auto max-w-7xl mt-20">

                        <img
                        src={HW}
                        alt="Logo 4"
                        className="rounded-2xl h-auto w-full mx-auto shadow-2xl"
                        />

                        <div className="lg:mt-0 sm:mt-10">

                            <div
                            className="font-poppins text-primary font-bold text-3xl lg:text-4xl sm:text-4xl text-left ">
                                Holy Week
                            </div>

                            <div
                            className="font-poppins text-Ldescription dark:text-Ddescription text-base mt-5 text-justify">
                                Holy Week, or Semana Santa, is one of the most important religious observances in the Philippines, especially among Filipino Catholics. It commemorates the Passion, death, and resurrection of Jesus Christ, beginning with Palm Sunday and ending with Easter Sunday. For many Filipinos, it is a period of prayer, sacrifice, and family or community traditions.
                            </div>

                            <div className="flex flex-wrap gap-2 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300">

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    HTML
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    CSS
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Bootstrap
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Elementor
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Wordpress
                                </div>

                                <div
                                className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                    Figma
                                </div>

                            </div>

                            <div
                                className="group flex flex-wrap gap-2 mt-5">

                                    <button
                                    onClick={() => {
                                        setSelectedProject("hw");
                                        setIsModalOpen(true);
                                    }}
                                    className="group flex flex-wrap items-center text-white hover:text-secondary bg-primary hover:bg-alternative font-poppins text-xs rounded-2xl gap-2 border-secondary transition-all duration-300  hover:scale-105 hover:shadow-lg py-2 px-5">

                                        <span
                                        className="">Information</span>

                                        <FiInfo className="text-sm"/>
                                        
                                    </button>

                                    <a
                                    href="https://github.com/raizenraneses-git/Holy-Week-Project"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative isolate overflow-hidden flex flex-wrap items-center bg-black dark:bg-white font-poppins text-white text-xs rounded-2xl
                                    gap-2 border-black py-2 px-6
                                    transition-all duration-300 ease-out hover:scale-105 active:scale-95
                                    before:content-[''] before:absolute before:inset-y-0 before:-left-6 before:-z-10 before:w-[150%]
                                    before:bg-black dark:before:bg-white before:-skew-x-[20deg] before:-translate-x-full hover:before:translate-x-0
                                    before:transition-transform before:duration-300 before:delay-100 before:ease-out
                                    after:content-[''] after:absolute after:inset-y-0 after:-left-6 after:-z-20 after:w-[150%]
                                    after:bg-alternative after:-skew-x-[20deg] after:-translate-x-full hover:after:translate-x-0
                                    after:transition-transform after:duration-300 after:ease-out">
                                        
                                        <FaGithub className="text-sm dark:text-black"/>

                                        <span className="dark:text-black">
                                            View
                                        </span>
                                    </a>
                            </div>

                        </div>

                    </div>
                </Reveal>

            </div>


            {selectedProject === "sandreaLee" && (
                <ProjectSDL
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={projectSDL}
                />
            )}

            {selectedProject === "pop" && (
                <ProjectPop
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={projectPop}
                />
            )}

            {selectedProject === "wp" && (
                <ProjectWP
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={projectWP}
                />
            )}

            {selectedProject === "hw" && (
                <ProjectHW
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={projectHW}
                />
            )}
            
        </section>
    );
}

export default Projects;