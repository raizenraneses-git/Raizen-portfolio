
import React from "react";


export function OrbitingCircle({
  className = "",
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}) {
  const calculatedDuration = duration / speed;
  const childCount = React.Children.count(children);

  return (
    <>
      {/* Circular orbit path using CSS instead of SVG */}
      {path && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-black/10 dark:border-white/10"
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Orbiting items */}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / childCount) * index;

        return (
          <div
            key={index}
            style={{
              "--duration": `${calculatedDuration}s`,
              "--radius": `${radius}px`,
              "--angle": `${angle}deg`,
              "--icon-size": `${iconSize}px`,
              "--delay": `${delay}s`,
              animationDelay: `${delay}s`,
            }}
            className={[
              "animate-orbit absolute flex items-center justify-center rounded-full",
              "size-(--icon-size) transform-gpu",
              reverse ? "[animation-direction:reverse]" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}

export default OrbitingCircle;
