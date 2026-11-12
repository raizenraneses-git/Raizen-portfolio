function DarkMode({ label }) {
  const isLight = label === "LIGHT MODE";

  const middlePanel = isLight ? "theme-panel-dark" : "theme-panel-white";
  const topPanel = isLight ? "theme-panel-light" : "theme-panel-black";
  const labelTone = isLight ? "theme-label-dark" : "";

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="theme-panel theme-panel-red" />
      <div className={`theme-panel ${middlePanel}`} />
      <div className={`theme-panel ${topPanel}`}>
        <span className={`theme-label ${labelTone}`}>{label}</span>
      </div>
    </div>
  );
}

export default DarkMode;