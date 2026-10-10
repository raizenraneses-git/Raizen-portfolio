import gnCert from "../assets/documents/gnCert.pdf";
import reactCert from "../assets/documents/reactCert.pdf";
import webCert from "../assets/documents/webCert.pdf";



function Credentials() { 
    return ( 
 
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-wbg dark:bg-dbg"> 
 
 
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
 
                        <a href={gnCert} target="_blank" rel="noopener noreferrer" className="inline-block font-poppins text-white dark:text-white bg-secondary dark:bg-primary hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary hover:scale-105 hover:shadow-lg text-[12px] rounded-2xl p-2 px-5 py-1 ml-5 mt-3 mb-3 border transition-all duration-300" > View </a> 
 
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
 
                        <a href={webCert} target="_blank" rel="noopener noreferrer" className="inline-block font-poppins text-white dark:text-white bg-secondary dark:bg-primary hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary hover:scale-105 hover:shadow-lg text-[12px] rounded-2xl p-2 px-5 py-1 ml-5 mt-3 mb-3 border transition-all duration-300 " > View </a>  
 
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
 
                        <a href={reactCert} target="_blank" rel="noopener noreferrer" className="inline-block font-poppins text-white dark:text-white bg-secondary dark:bg-primary hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary hover:scale-105 hover:shadow-lg text-[12px] rounded-2xl p-2 px-5 py-1 ml-5 mt-3 mb-3 border transition-all duration-300" > View </a> 
                    </div> 
                </div> 
 
            </div> 
        </section> 
    ); 
} 
 
export default Credentials;