import { SquigglyText } from "./Motion/SquigglyText";
import { LuArrowUpRight } from "react-icons/lu";

{/* NEW: Framer Motion
    motion           = gagawing "animated" ang div (halimbawa: <motion.div>)
    useReducedMotion = kapag naka-ON ang "reduce motion" sa device ng user, wala nang galaw (accessibility)
    Install muna (kung hindi mo pa nagagawa): npm install framer-motion */}
import { motion, useReducedMotion } from "framer-motion";

{/* NEW: Import ng GridMotion (ayusin lang ang path kung iba ang location ng file mo) */}
import GridMotion from "./Motion/GridMotion";

import heroImage from "../assets/aboutMe/aboutMe.png";
import heroImage2 from "../assets/aboutMe/aboutMe2.png";
import heroImage3 from "../assets/aboutMe/aboutMe3.png";
import heroImage4 from "../assets/aboutMe/aboutMe4.png";
import heroImage5 from "../assets/aboutMe/aboutMe5.png";
import heroImage6 from "../assets/aboutMe/aboutMe6.png";
import heroImage7 from "../assets/aboutMe/aboutMe7.png";
import heroImage8 from "../assets/aboutMe/aboutMe8.png";
import heroImage9 from "../assets/aboutMe/aboutMe9.png";
import heroImage10 from "../assets/aboutMe/aboutMe10.png";


{/* NEW: Listahan ng mga picture na lalabas sa Grid Motion
    - Pwede kang magdagdag pa ng pictures dito (import mo muna sa taas)
    - Kung konti lang ang pictures, mauulit-ulit lang sila sa grid, okay lang yun */}
const gridItems = [
    heroImage10,
    heroImage9,
    heroImage8,
    heroImage7,
    heroImage6,
    heroImage5,
    heroImage4,
    heroImage3,
    heroImage2,
    heroImage,
    // Dagdagan mo dito ng sarili mong pictures, example:
    // project1,
    // project2,
];


{/* NEW: Listahan ng mga skill chips (HTML, Figma, etc.)
    Dati 10 magkakahiwalay na div, ngayon isang listahan na lang. Pareho ang itsura.
    Gusto mong magdagdag ng skill? Dagdagan mo lang dito. */}
const skills = [
    "HTML",
    "Figma",
    "CSS",
    "Javascript",
    "React.js",
    "Tailwind CSS",
    "Wordpress",
    "Elementor",
    "MySQL",
    "Canva",
];


{/* NEW: MOTION SETTINGS
    Dito nakalagay ang "timing" at "feel" ng mga animation. Gusto mong mas mabagal o mas mabilis? Dito ka lang mag-edit. */}

{/* NEW: "cinematic ease" = mabilis sa simula, dahan-dahang humihinto (parehas sa Credentials at Timeline) */}
const cinematicEase = [0.22, 1, 0.36, 1];

{/* NEW: GRID MOTION (kaliwa) — bubukas na parang kurtina mula kaliwa papuntang kanan.
    "hidden" = simula (nakatago), "show" = tapos (kita na).
    Clip-path at opacity lang ang ginamit ko, walang scale/galaw, para hindi masira ang pagsukat ng GridMotion sa laki ng container. */}
const gridVariants = {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    show: {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        transition: { duration: 1.3, ease: cinematicEase },
    },
};

{/* NEW: RIGHT SIDE — ang parent. Siya ang magpapasunod-sunod ng labas ng bawat piraso (label, heading, paragraphs, chips) */}
const contentStagger = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.25 },
    },
};

{/* NEW: Isang piraso ng laman — aakyat habang lumalabas at nagbblur-to-sharp */}
const fadeUpItem = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: cinematicEase },
    },
};

{/* NEW: Skill chips — mas mabilis ang pagitan (0.05) kaya parang sunod-sunod na "pop" */}
const chipsStagger = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.05 },
    },
};

{/* NEW: Isang chip — maliit na pop-up galing sa ibaba */}
const chipItem = {
    hidden: { opacity: 0, y: 14, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: cinematicEase },
    },
};


<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

function AboutMe() { 
    {/* NEW: true kapag naka-"reduce motion" ang device ng user */}
    const reduceMotion = useReducedMotion();

    return (
        
        <section id="aboutMe" className="w-full px-6 sm:px-6 lg:px-8 py-10 bg-wbg-soft dark:bg-dbg-soft"> 
 
            {/*Sizes of every Section*/} 
            <div  
            className="w-full mx-auto max-w-7xl items-center mt-10 sm:px-0 lg:px-0"> 
 
                {/*About Me Colums Structure*/} 
                <div  
                className="grid sm:grid-cols-1 lg:grid-cols-2 mx-auto max-w-7xl mt-10 gap-10"> 
 
                    {/* ================= LEFT SIDE: GRID MOTION ================= */}
                    {/* Kailangan ng fixed height ang container, kasi 100% ng container ang kukunin ng GridMotion */}
                    {/* NEW: dati "div", ngayon "motion.div" — bubukas na parang kurtina kapag nakita na sa screen (isang beses lang) */}
                    {/* NEW (FIX): Hinati sa dalawa.
                        - LABAS (ito): walang kurtina, siya lang ang nagbabantay kung nakita na sa screen. Laging buo ang laki niya kaya siguradong gagana ang pagbabantay.
                        - LOOB (sa baba): yung may kurtina (gridVariants). Sumusunod lang siya sa labas. */}
                    <motion.div
                        className="mx-auto w-full h-[400px] sm:h-[400px] lg:h-[520px] lg:mr-2"
                        variants={{ hidden: {}, show: {} }}
                        initial={reduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                      <motion.div className="w-full h-full" variants={gridVariants}>
                        <GridMotion
                            items={gridItems}   // mga picture
                            rows={3}            // 2 rows (top at bottom)
                            direction="alternate" // top = pa-left, bottom = pa-right
                            aspectRatio={0.7}   // hugis ng bawat picture (mas mababa = mas patayo)
                            gap={12}            // espasyo sa pagitan ng pictures
                            radius={8}          // bilog ng corners ng pictures
                            angle={-20}           // 0 = diretso, walang tabingi
                            tilt={0}            // 0 = walang 3D effect
                            speed={50}          // bilis ng galaw
                            parallax={0.5}
                            spotlight={0.5}
                            dim={0.2}
                            fade={0.4}          // ito yung nagda-dim sa corners/gilid (0 = walang fade, 1 = malakas)
                            grayscale={false}
                            // theme="light"    // tanggalin ang // kung gusto mo ng light na tiles
                        />
                      </motion.div>
                    </motion.div>

                    {/* ================= RIGHT SIDE: ORIGINAL CONTENT (walang binago) ================= */}
                    {/* NEW: dati "div", ngayon "motion.div" — siya ang parent na nagbabantay ng scroll at nagpapasunod-sunod ng labas ng mga laman */}
                    <motion.div
                        className="lg:mt-0 sm:mt-10 mt-10 lg:mr-10"
                        variants={contentStagger}
                        initial={reduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                    > 
 
                        {/* NEW: dati "div" lang, ngayon "motion.div" at may linyang bumabanat sa tabi ng "ABOUT ME" */}
                        <motion.div 
                        variants={fadeUpItem}
                        className="flex items-center gap-4 font-poppins text-primary text-2xl sm:text-[32px]"> 
                            ABOUT ME 
                        </motion.div> 
 
                        {/* NEW: dati "div", ngayon "motion.div" (fadeUpItem) */}
                        <motion.div 
                        variants={fadeUpItem}
                        className="font-poppins text-secondary dark:text-white text-3xl sm:text-5xl lg:text-5xl text-left font-bold mt-5 sm:mt-5 lg:mt-8"> 
                            I like {" "}   
                            <SquigglyText
                                stepDuration={60}
                                scale={4}   
                                className="text-primary mr-3"
                            >
                                clean
                            </SquigglyText>
                              designs and functional code. 
                        </motion.div> 
 
                        {/* NEW: dati "div", ngayon "motion.div" (fadeUpItem) */}
                        <motion.div  
                        variants={fadeUpItem}
                        className="font-poppins text-Ldescription dark:text-Ddescription text-justify text-base sm:text-base sm:text-justify lg:mt-8 sm:mt-5 mt-5 leading-relaxed"> 
                            I focus on proper clean designs that emphasize simplicity, and performance transforming ideas into responsive and engaging digital experiences. 
                        </motion.div> 
 
                        {/* NEW: dati "div", ngayon "motion.div" (fadeUpItem) */}
                        <motion.div  
                        variants={fadeUpItem}
                        className="font-poppins text-Ldescription dark:text-Ddescription text-justify text-base sm:text-base sm:text-justify sm:mt-5 mt-5 leading-relaxed"> 
                            I’m a Fresh Graduate Student in Information Technology from National Teachers College.   
                        </motion.div> 
 
                        {/* NEW: dati "div", ngayon "motion.div" na may chipsStagger — susunod-sunod ang pop ng bawat chip.
                            Walang sariling galaw ang row na ito; ang mga chip sa loob ang gumagalaw (chipItem), isa-isa, pagkatapos ng mga paragraph sa itaas. */}
                        <motion.div 
                        variants={chipsStagger}
                        className="flex flex-wrap gap-1 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300"> 

                            {/* NEW: Ginawang listahan (skills) para hindi na paulit-ulit.
                                May "motion.div" na balot sa labas ng bawat chip — ang chip mismo (yung loob) ay hindi ko ginalaw,
                                kaya gumagana pa rin ang hover:scale-105 at hover:shadow-lg mo. */}
                            {skills.map((skill) => (
                                <motion.div key={skill} variants={chipItem}>
                                    <div  
                                    className="font-poppins text-xs mt-1 text-primary dark:text-Ddescription rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                        {skill} 
                                    </div> 
                                </motion.div>
                            ))}
 
                        </motion.div>

                    </motion.div> 
 
                </div> 
 
            </div> 
        </section> 
    ); 
} 
 
export default AboutMe;