const items = ["Front-End", "Web Design", "UI/UX", "Freelancer", "Developer"];

const groups = [0, 1, 2, 3, 4, 5];

const itemClass =
  "mx-6 whitespace-nowrap text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl";

const starClass = "text-lg text-white sm:text-xl";

function SliderItem({ label }) {
  return (
    <div className="flex items-center">
      <span className={itemClass}>{label}</span>
      <span className={starClass} aria-hidden="true">
        ★
      </span>
    </div>
  );
}

function Slider() {
  return (
    <div className="w-full max-w-full overflow-hidden bg-primary py-4">
      <div className="slider-track flex w-max items-center">
        {groups.map((group) => (
          <div
            key={group}
            className="flex flex-shrink-0 items-center"
            aria-hidden={group !== 0 ? "true" : undefined}
          >
            {items.map((item) => (
              <SliderItem key={`${group}-${item}`} label={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;