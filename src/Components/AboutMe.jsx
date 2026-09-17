import { useState, useEffect } from "react"; 
import aboutMe from "../assets/aboutMe/aboutMe.png"; 
import arrowButton from "../assets/aboutMe/arrowButton.png";
import { LuArrowUpRight } from "react-icons/lu";

<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

function AboutMe() { 
    return (
        
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10"> 
 
            {/*Sizes of every Section*/} 
            <div  
            className="w-full mx-auto max-w-7xl items-center mt-10 sm:px-0 lg:px-0"> 
 
                {/*About Me Colums Structure*/} 
                <div  
                className="grid sm:grid-cols-1 lg:grid-cols-2 mx-auto max-w-7xl mt-10"> 
 
                    <img  
                    src={aboutMe} 
                    alt= "about me" 
                    className="rounded-2xl h-auto w-80 mx-auto shadow-2xl"  
                    /> 
 
                    <div className="lg:mt-0 sm:mt-10 mt-10 lg:mr-10"> 
 
                        <div 
                        className="font-poppins text-primary text-2xl sm:text-[32px]"> 
                            ABOUT ME 
                        </div> 
 
                        <div  
                        className="font-poppins text-secondary text-3xl sm:text-5xl lg:text-5xl text-left font-bold mt-5 sm:mt-5"> 
                            I like clean designs and functional code. 
                        </div> 
 
                        <div  
                        className="font-poppins text-text text-justify text-base sm:text-base sm:text-justify sm:mt-5 mt-5 leading-relaxed"> 
                            I focus on proper clean designs that emphasize simplicity, and performance transforming ideas into responsive and engaging digital experiences. 
                        </div> 
 
                        <div  
                        className="font-poppins text-text text-justify text-base sm:text-base sm:text-justify sm:mt-5 mt-5 leading-relaxed"> 
                            I’m a Fresh Graduate Student in Information Technology from National Teachers College.   
                        </div> 
 
                        <div className="flex flex-wrap gap-1 sm:gap-2 mx-auto max-w-7xl mt-5 transition-all duration-300"> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                HTML 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Figma 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                CSS 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Javascript 
                            </div>   
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                React.js 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Tailwind CSS 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Wordpress 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Elementor 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                MySQL 
                            </div> 
 
                            <div  
                            className="font-poppins text-xs text-primary rounded-2xl bg-primary/20 text-center p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"> 
                                Canva 
                            </div> 
 
                        </div>

                        <button 
                        className="group flex flex-wrap bg-secondary font-poppins text-white text-xs font-bold rounded-2xl gap-1.5 p-2 mt-5 border-secondary transition-all duration-300 hover:bg-primary hover:text-white  hover:scale-105 hover:shadow-lg"> 

                            <span className="ml-2 lg:ml-2 sm:ml-2">More About Me</span>

                            <LuArrowUpRight     
                            className="text-base text-white transition-all duration-300 group-hover:text-white"/>
                            
                        </button>
 
                    </div> 
 
                </div> 
 
            </div> 
        </section> 
    ); 
} 
 
export default AboutMe;