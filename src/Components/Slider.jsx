const items = [
  "Front-End",
  "Web Design",
  "UI/UX",
  "Freelancer",
  "Developer",
];

function Slider() {
  return (
    <div className="w-full overflow-hidden bg-[#1668D6] py-4 mt-10">
      <div className="slider-track flex w-max items-center">
        {[0, 1, 2, 3, 4, 5].map((groupIndex) => (
          <div
            key={groupIndex}
            className="flex items-center flex-shrink-0"
            aria-hidden={groupIndex !== 0 ? "true" : undefined}
          >
            {items.map((item, i) => (
              <div key={`${groupIndex}-${i}`} className="flex items-center">
                <span className="mx-6 whitespace-nowrap text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">
                  {item}
                </span>
                <span className="text-white text-lg sm:text-xl" aria-hidden="true">
                  ★
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;