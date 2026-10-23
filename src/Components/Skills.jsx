import TiltCard from "./Motion/TiltCard";
import InfiniteSpiral from "./Motion/InfiniteSpiral";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaWordpress } from "react-icons/fa";
import { SiFigma, SiTailwindcss, SiElementor, SiMysql } from "react-icons/si";

import {
  FiCode,
  FiMonitor,
  FiBriefcase,
} from "react-icons/fi";

function Skills() {

    const icons = [
        { id: "html",      icon: FaHtml5,       color: "#E34F26", alt: "HTML" },
        { id: "figma",     icon: SiFigma,       color: "#F24E1E", alt: "Figma" },
        { id: "css",       icon: FaCss3Alt,     color: "#1572B6", alt: "CSS" },
        { id: "js",        icon: FaJs,          color: "#F7DF1E", alt: "JavaScript" },
        { id: "react",     icon: FaReact,       color: "#61DAFB", alt: "React.js" },
        { id: "tailwind",  icon: SiTailwindcss, color: "#06B6D4", alt: "Tailwind CSS" },
        { id: "wordpress", icon: FaWordpress,   color: "#21759B", alt: "WordPress" },
        { id: "elementor", icon: SiElementor,   color: "#92003B", alt: "Elementor" },
        { id: "mysql",     icon: SiMysql,       color: "#4479A1", alt: "MySQL" },
    ];

    return (

        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-secondary/2 dark:bg-dbg/98">

            {/* Sizes of every Section */}
            <div className="
                mx-auto max-w-7xl items-center mt-8
            ">

                <div className="
                    flex font-poppins text-primary 
                    text-2xl sm:text-3xl lg:text-3xl
                ">
                    What I Do
                </div>

            </div>

            <div className="
                mx-auto max-w-7xl items-center mt-6 sm:mt-8 lg:mt-10
            ">

                <div className="
                    flex font-poppins text-secondary dark:text-white font-bold
                    text-[40px] sm:text-[52px] lg:text-[64px]
                ">
                    Services &
                </div>

            </div>

            <div className="
                mx-auto max-w-7xl items-center
            ">

                <div className="
                    flex font-poppins text-primary font-bold
                    text-[40px] sm:text-[52px] lg:text-[64px]
                ">
                    Expertise
                </div>

            </div>

            


            {/* Service and Expertise Cards */}
            <div className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                gap-5 
                mx-auto
                max-w-7xl
                mt-10
            ">

                {/* First Card */}
                <TiltCard className="
                    border border-primary 
                    rounded-2xl 
                    min-w-0
                ">

                    {/* Logo */}
                    <FiCode
                        className="
                            h-15 w-15 
                            rounded-2xl  
                            bg-teal-100
                            p-3.5
                            text-teal-700 
                            ml-5 mt-5
                        "
                    />
                    
                    {/* First Card - Name */}
                    <div 
                        className="
                            font-poppins text-text 
                            text-2xl
                            text-left font-bold 
                            pl-5 pr-5 sm:pr-8 lg:pr-10 
                            pt-5 
                            break-words
                            text-secondary
                            dark:text-white
                        "
                    >
                        Web Development & Web Design
                    </div>

                    {/* First Card - Description */}
                    <div 
                        className="
                            font-poppins text-text 
                            text-xs 
                            text-justify 
                            pl-5 pr-5 sm:pr-8 lg:pr-10 
                            pt-5
                            text-Ldescription
                            dark:text-Ddescription
                        "
                    >
                        Develops and Creating clean and user-friendly 
                        websites with a focus on both design and functionality
                    </div>

                    {/* First Card - Example */}
                    <ul
                        className="
                            list-disc 
                            font-poppins text-text 
                            text-xs 
                            pl-8 pr-5 
                            pt-5 pb-5
                        "
                    >
                        <li className="marker:text-blue-500 text-Ldescription dark:text-Ddescription">
                            Landing Page
                        </li>
                        <li className="marker:text-blue-500 text-Ldescription dark:text-Ddescription">
                            Events Page
                        </li>
                        <li className="marker:text-blue-500 text-Ldescription dark:text-Ddescription">
                            E-commerce Stores
                        </li>
                    </ul>

                </TiltCard>


                {/* Second Card */}
                <TiltCard className="
                    border border-primary 
                    rounded-2xl 
                    min-w-0
                ">

                    <FiMonitor 
                        className="
                            h-15 w-15 
                            p-3.5
                            bg-cyan-100
                            text-cyan-700 
                            rounded-2xl 
                            ml-5 mt-5
                        "
                    />
                    
                    {/* Second Card - Name */}
                    <div 
                        className="
                            font-poppins text-text 
                            text-2xl
                            text-left font-bold 
                            pl-5 pr-5 sm:pr-8 lg:pr-10 
                            pt-5
                            break-words
                            text-secondary
                            dark:text-white
                        "
                    >
                        UI/UX Design
                    </div>

                    {/* Second Card - Description */}
                    <div 
                        className="
                            font-poppins text-text 
                            text-[12px] 
                            text-justify 
                            pl-5 pr-5 sm:pr-8 lg:pr-10 
                            pt-5
                            dark:text-Ddescription
                        "
                    >
                        Designs clean and functional interfaces that are 
                        easy to use and navigate. Ensures every design 
                        provides a smooth and enjoyable user experience.
                    </div>

                    {/* Second Card - Example */}
                    <ul
                        className="
                            list-disc 
                            font-poppins text-text 
                            text-[12px] 
                            pl-8 pr-5 
                            pt-5 pb-5
                        "
                    >
                        <li className="marker:text-blue-500 dark:text-Ddescription">
                            User Interface
                        </li>
                        <li className="marker:text-blue-500 dark:text-Ddescription">
                            Mobile App Interface
                        </li>
                        <li className="marker:text-blue-500 dark:text-Ddescription">
                            Web Interface
                        </li>
                    </ul>

                </TiltCard>


                {/* Third Card */}
                <TiltCard className="
                    border border-primary 
                    rounded-2xl 
                    min-w-0
                    sm:col-span-2
                ">

                    <FiBriefcase 
                        className="
                            h-15 w-15 
                            p-3.5 
                            text-blue-700
                            bg-blue-100 
                            rounded-2xl 
                            ml-5 mt-5
                        "
                    />
                    
                    {/* Third Card - Name */}
                    <div 
                        className="
                            font-poppins text-text 
                            text-2xl
                            text-left font-bold 
                            pl-5 pr-5 sm:pr-8 lg:pr-10 
                            pt-5
                            break-words
                            text-secondary
                            dark:text-white
                        "
                    >
                        Freelancer
                    </div>

                    {/* Third Card - Description */}
                    <div 
                        className="
                            font-poppins text-text 
                            text-[12px] 
                            text-justify 
                            pl-5 pr-5 sm:pr-8 lg:pr-10 
                            pt-5
                            dark:text-Ddescription
                        "
                    >
                        Labels, reviews, and evaluates data to improve 
                        the accuracy and performance of AI and machine 
                        learning models. Ensures datasets meet quality 
                        standards through careful analysis and validation.
                    </div>

                    {/* Third Card - Example */}
                    <ul
                        className="
                            list-disc 
                            font-poppins text-text 
                            text-[12px] 
                            pl-8 pr-5 
                            pt-5 pb-5
                        "
                    >
                        <li className="marker:text-blue-500 dark:text-Ddescription">
                            AI Content Moderator
                        </li>
                        <li className="marker:text-blue-500 dark:text-Ddescription">
                            Data Quality Specialist
                        </li>
                        <li className="marker:text-blue-500 dark:text-Ddescription">
                            Data Annotator
                        </li>
                    </ul>

                </TiltCard>

                {/* RIGHT SIDE - Infinite Spiral */}
            <div className="flex max-w-7xl h-[400px] lg:h-auto lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-2 sm:col-span-2">

                <InfiniteSpiral
                items={icons}
                animationMode="all"
                speed={0.35}
                radius={100}
                iconSize={75}
                verticalSpacing={60}
                perspective={1}
                centerScale={1}
                edgeBlur={5}
                cardsPerTurn={7}
                pauseOnHover
                direction="up"
                rotation={0}
                cardTilt={0}
                edgeFade={1}
                imageFit="cover"
                grayscale={10}
                />
                
            </div>

        </div>

        </section>
    );
}

export default Skills;