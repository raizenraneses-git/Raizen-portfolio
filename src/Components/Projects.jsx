import { useState } from "react";
import SandreaLee from "../assets/projects/project1.png";
import Pop from "../assets/projects/project2.png";
import { FiInfo } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import ProjectSDL from "./ProjectsInfo/ProjectSDL";
import ProjectPop from "./ProjectsInfo/ProjectPop";
import sdleeOne from "../assets/sandreaLeeImages/image1.png"
import sdleeTwo from "../assets/sandreaLeeImages/image2.png"
import sdleeThree from "../assets/sandreaLeeImages/image3.png"
import sdleeFour from "../assets/sandreaLeeImages/image4.png"
import sdleeFive from "../assets/sandreaLeeImages/image5.png"

function Projects() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            "This was one of my final projects during my internship. I was assigned this task to strengthen my HTML and CSS fundamentals and learn how to build frontend pages using Elementor and WordPress with guidance from my team leader..",
        images: [sdleeOne, sdleeTwo, sdleeThree, sdleeFour, sdleeFive],
        tools: ["React.Js", "Tailwind CSS", "Node.Js", "Typescript", "Figma"],
    };

    return (

        <section className="w-full px-4 sm:px-6 lg:px-8 py-10">

            <div
            className="w-full mx-auto max-w-7xl items-center mt-10 sm:px-0 lg:px-0">

                <div 
                className="font-poppins text-primary text-3xl">
                    Portfolio
                </div>

                <div 
                className="font-poppins text-secondary font-bold text-6xl mt-10">
                    Selected Project
                </div>

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
                        className="font-poppins text-text text-base mt-5 text-justify">
                            A salon management system designed to streamline appointment booking, online shopping, and administrative tasks through an intuitive user experience.
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300">

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                React.Js
                            </div>

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                Tailwind CSS
                            </div>

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                Node.Js
                            </div>

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                Typescript
                            </div>

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                Canva

                                
                            </div>

                        </div>

                        <div
                            className="group flex flex-wrap gap-2 mt-5">

                                <button
                                onClick={() => setIsModalOpen(true)}
                                className="group flex flex-wrap items-center bg-secondary font-poppins text-white text-xs rounded-2xl gap-2 border-secondary transition-all duration-300 hover:bg-primary hover:text-white  hover:scale-105 hover:shadow-lg py-2 px-5">

                                    <span
                                    className="">Information</span>

                                    <FiInfo className="text-sm"/>
                                    
                                </button>

                                <a
                                href="https://github.com/raizenraneses-git/Raizen-portfolio.git"
                                target="_blank"
                                rel="noopener norefferer"
                                className="group flex flex-wrap items-center bg-black font-poppins text-white text-xs rounded-2xl
                                gap-2 border-black py-2 px-6    ">
                                    
                                    <FaGithub className="text-sm"/>

                                    <span className="">
                                        View
                                    </span>
                                </a>
                        </div>

                    </div>


                </div>

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
                        className="font-poppins text-text text-base mt-5 text-justify">
                            POP! by Inquirer is an online media platform that delivers fresh, entertaining, and trend-focused stories. Its content is presented in a more casual and creative style compared with traditional news, making it accessible to readers who are interested in current pop culture and internet trends.
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300">

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                HTML
                            </div>

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                CSS
                            </div>

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                Bootstrap
                            </div>

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                Wordpress
                            </div>

                            <div
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover-scale-105 hover:shadow-lg transition-all duration-300">
                                Elementor
                            </div>

                        </div>

                        <div
                            className="group flex flex-wrap gap-2 mt-5">

                                <button
                                onClick={() => setIsModalOpen(true)}
                                className="group flex flex-wrap items-center bg-secondary font-poppins text-white text-xs rounded-2xl gap-2 border-secondary transition-all duration-300 hover:bg-primary hover:text-white  hover:scale-105 hover:shadow-lg py-2 px-5">

                                    <span
                                    className="">Information</span>

                                    <FiInfo className="text-sm"/>
                                    
                                </button>

                                <a
                                href="https://github.com/raizenraneses-git/Raizen-portfolio.git"
                                target="_blank"
                                rel="noopener norefferer"
                                className="group flex flex-wrap items-center bg-black font-poppins text-white text-xs rounded-2xl
                                gap-2 border-black py-2 px-6    ">
                                    
                                    <FaGithub className="text-sm"/>

                                    <span className="">
                                        View
                                    </span>
                                </a>
                        </div>

                    </div>


                </div>


            </div>

            <ProjectSDL
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={projectSDL}
            />
            
        </section>
    );
}

export default Projects;