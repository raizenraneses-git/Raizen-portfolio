import InfiniteSpiral from "./Motion/InfiniteSpiral";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaWordpress } from "react-icons/fa";
import { SiFigma, SiTailwindcss, SiElementor, SiMysql } from "react-icons/si";

function AboutMe() {
  const icons = [
    { id: "html",      icon: FaHtml5,      color: "#E34F26", alt: "HTML" },
    { id: "figma",     icon: SiFigma,      color: "#F24E1E", alt: "Figma" },
    { id: "css",       icon: FaCss3Alt,    color: "#1572B6", alt: "CSS" },
    { id: "js",        icon: FaJs,         color: "#F7DF1E", alt: "JavaScript" },
    { id: "react",     icon: FaReact,      color: "#61DAFB", alt: "React.js" },
    { id: "tailwind",  icon: SiTailwindcss,color: "#06B6D4", alt: "Tailwind CSS" },
    { id: "wordpress", icon: FaWordpress,  color: "#21759B", alt: "WordPress" },
    { id: "elementor", icon: SiElementor,  color: "#92003B", alt: "Elementor" },
    { id: "mysql",     icon: SiMysql,      color: "#4479A1", alt: "MySQL" },
  ];

  return (
    <div
      className=" h-[300px] w-full overflow-hidden bg-wbg dark:bg-dbg"
    >
      <InfiniteSpiral
        items={icons}
        animationMode="all"
        speed={0.55}
        radius={100}
        cardWidth={100}
        cardHeight={150}
        verticalSpacing={60}
        perspective={1}
        cardRadius={10}
        centerScale={1}
        edgeBlur={10}
        cardsPerTurn={8}
        pauseOnHover
        direction="up"
        rotation={0}
        cardTilt={0}
        edgeFade={2.3}
        imageFit="cover"
        grayscale={10}
      />
    </div>
  );
}

export default AboutMe;