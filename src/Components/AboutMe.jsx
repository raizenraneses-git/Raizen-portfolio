import { SquigglyText } from "./Motion/SquigglyText";
import { LuArrowUpRight } from "react-icons/lu";

{/* NEW: Import ng GridMotion (ayusin lang ang path kung iba ang location ng file mo) */}
import GridMotion from "./Motion/GridMotion";

import heroImage from "../assets/aboutMe/aboutMe.png";
import heroImage2 from "../assets/aboutMe/aboutMe2.png";
import heroImage3 from "../assets/aboutMe/aboutMe2.png";


{/* NEW: Listahan ng mga picture na lalabas sa Grid Motion
    - Pwede kang magdagdag pa ng pictures dito (import mo muna sa taas)
    - Kung konti lang ang pictures, mauulit-ulit lang sila sa grid, okay lang yun */}
const gridItems = [
    heroImage,
    heroImage2,
    heroImage3,
    // Dagdagan mo dito ng sarili mong pictures, example:
    // project1,
    // project2,
];


<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

function AboutMe() { 
    return (
        
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-secondary/2 dark:bg-dbg/98"> 
 
            {/*Sizes of every Section*/} 
            <div  
            className="w-full mx-auto max-w-7xl items-center mt-10 sm:px-0 lg:px-0"> 
 
                {/*About Me Colums Structure*/} 
                <div  
                className="grid sm:grid-cols-1 lg:grid-cols-2 mx-auto max-w-7xl mt-10 gap-10"> 
 
                    {/* ================= LEFT SIDE: GRID MOTION ================= */}
                    {/* Kailangan ng fixed height ang container, kasi 100% ng container ang kukunin ng GridMotion */}
                    <div className="mx-auto w-full h-[400px] sm:h-[400px] lg:h-[520px] lg:mr-2">
                        <GridMotion
                            items={gridItems}   // mga picture
                            rows={3}            // 2 rows (top at bottom)
                            direction="alternate" // top = pa-left, bottom = pa-right
                            aspectRatio={0.7}   // hugis ng bawat picture (mas mababa = mas patayo)
                            gap={12}            // espasyo sa pagitan ng pictures
                            radius={8}          // bilog ng corners ng pictures
                            angle={-20}           // 0 = diretso, walang tabingi
                            tilt={0}            // 0 = walang 3D effect
                            speed={30}          // bilis ng galaw
                            parallax={0.5}
                            spotlight={0.5}
                            dim={0.1}
                            fade={0.4}          // ito yung nagda-dim sa corners/gilid (0 = walang fade, 1 = malakas)
                            grayscale={false}
                            // theme="light"    // tanggalin ang // kung gusto mo ng light na tiles
                        />
                    </div>

                    {/* ================= RIGHT SIDE: ORIGINAL CONTENT (walang binago) ================= */}
                    <div className="lg:mt-0 sm:mt-10 mt-10 lg:mr-10"> 
 
                        <div 
                        className="font-poppins text-primary text-2xl sm:text-[32px]"> 
                            ABOUT ME 
                        </div> 
 
                        <div 
                        className="font-poppins text-secondary dark:text-white text-3xl sm:text-5xl lg:text-5xl text-left font-bold mt-5 sm:mt-5"> 
                            I like {" "}   
                            <SquigglyText
                                stepDuration={60}
                                scale={4}   
                                className="text-primary mr-3"
                            >
                                clean
                            </SquigglyText>
                              designs and functional code. 
                        </div> 
 
                        <div  
                        className="font-poppins text-Ldescription dark:text-Ddescription text-justify text-base sm:text-base sm:text-justify sm:mt-5 mt-5 leading-relaxed"> 
                            I focus on proper clean designs that emphasize simplicity, and performance transforming ideas into responsive and engaging digital experiences. 
                        </div> 
 
                        <div  
                        className="font-poppins text-Ldescription dark:text-Ddescription text-justify text-base sm:text-base sm:text-justify sm:mt-5 mt-5 leading-relaxed"> 
                            I’m a Fresh Graduate Student in Information Technology from National Teachers College.   
                        </div> 
 
                        <div className="flex flex-wrap gap-1 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300"> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                HTML 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Figma 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                CSS 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Javascript 
                            </div>   
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                React.js 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Tailwind CSS 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Wordpress 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Elementor 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                MySQL 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Canva 
                            </div> 
 
                        </div>

                        <button 
                        className="group relative isolate overflow-hidden flex flex-wrap text-white hover:text-secondary bg-primary font-poppins text-xs font-bold rounded-2xl gap-1.5 p-2 mt-5 border-secondary
                        transition-all duration-300 ease-out
                        hover:-translate-y-0.5 hover:-rotate-2 hover:scale-105 active:scale-95
                        hover:shadow-[4px_4px_0_0_#1e6bff]
                        before:content-[''] before:absolute before:inset-y-0 before:-left-6 before:-z-10 before:w-[150%]
                        before:bg-[#3de0ff] before:-skew-x-[20deg]
                        before:-translate-x-full hover:before:translate-x-0
                        before:transition-transform before:duration-300 before:ease-out"> 

                            <span className="ml-2 lg:ml-2 sm:ml-2">More About Me</span>

                            <LuArrowUpRight     
                            className="text-base transition-all duration-300"/>
                            
                        </button>
 
                    </div> 
 
                </div> 
 
            </div> 
        </section> 
    ); 
} 
 
export default AboutMe;