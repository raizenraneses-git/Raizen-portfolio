import InfiniteSpiral from "./Motion/InfiniteSpiral";
import imageOne from "../assets/aboutMe/aboutMe.png";

function AboutMe() {
  const images = [
    { src: imageOne, alt: "Mountain lake" },
    { src: imageOne, alt: "Forest path" },
    { src: imageOne, alt: "Rocky summit" },
    { src: imageOne, alt: "Ocean shore" },
    { src: imageOne, alt: "Green meadow" },
    { src: imageOne, alt: "Desert light" },
  ];

  return (
    <div
      className=" h-[500px] w-full overflow-hidden bg-dbg dark:bg-dbg"
    >
      <InfiniteSpiral
        items={images}
        animationMode="all"
        speed={0.55}
        radius={100}
        cardWidth={100}
        cardHeight={150}
        verticalSpacing={60}
        perspective={100}
        cardRadius={10}
        centerScale={1}
        edgeBlur={6}
        cardsPerTurn={7}
        pauseOnHover
        direction="up"
        rotation={0}
        cardTilt={0}
        edgeFade={0.3}
        imageFit="cover"
        grayscale={2}
      />
    </div>
  );
}

export default AboutMe;