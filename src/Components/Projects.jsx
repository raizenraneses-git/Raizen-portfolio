import SandreaLee from "../assets/projects/project1.png";
import { FiInfo } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";


function Projects() {
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
                        className="font-poppins text-primary font-bold lg:text-4xl sm:text-[42px] text-left ">
                            Smart Automated Link & Operations Network
                        </div>

                        <div
                        className="font-poppins text-black   text-base mt-5 text-justify">
                            A salon management system designed to streamline appointment booking, online shopping, and administrative tasks through an intuitive user experience.
                        </div>

                        <ul 
                        className="list-inside list-disc mt-5 ">
                            <li className="marker:text-blue-500 font-poppins text-sm text-text">Responsive & Optimized - Seamless browsing across all device.</li>
                            <li className="marker:text-blue-500 mt-2 font-poppins text-sm text-text">Optimized modern design ensuring responsive performance.</li>
                            <li className="marker:text-blue-500 mt-2 font-poppins text-sm text-text">Modern, responsive design focused on speed and usability.</li>
                            <li className="marker:text-blue-500 mt-2 font-poppins text-sm text-text">Showcase Salon market with proper and optimized system.</li>
                        </ul>


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
                                className="group flex flex-wrap items-center bg-secondary font-poppins text-white text-xs rounded-2xl gap-2 border-secondary transition-all duration-300 hover:bg-primary hover:text-white  hover:scale-105 hover:shadow-lg py-2 px-5 ">

                                    <span
                                    className="">Information</span>

                                    <FiInfo className="text-sm"/>
                                    
                                </button>

                                <button
                                className="group flex flex-wrap items-center bg-black font-poppins text-white text-xs rounded-2xl
                                gap-2 border-black py-2 px-6">
                                    
                                    <FaGithub className="text-sm"/>

                                    <span className="">
                                        View
                                    </span>
                                </button>
                        </div>

                    </div>


                </div>

            </div>
            
        </section>
    );
}

export default Projects;