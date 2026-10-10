import {
  FiCode,
  FiMonitor,
  FiBriefcase,
} from "react-icons/fi";

function Skills() {
    return (

        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-wbg dark:bg-dbg">

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
                mt-8 sm:mt-8
            ">

                {/* First Card */}
                <div className="
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

                </div>


                {/* Second Card */}
                <div className="
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

                </div>


                {/* Third Card */}
                <div className="
                    border border-primary 
                    rounded-2xl 
                    min-w-0
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

                </div>

            </div>

        </section>
    );
}

export default Skills;