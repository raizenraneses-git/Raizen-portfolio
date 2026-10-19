// Overlay na lalabas lang habang may transition.
// 3 panels ang sabay-sabay mag-slide.
// Ang "label" ay ang text sa gitna (DARK MODE / LIGHT MODE).
function DarkMode({ label }) {
  // true kapag papunta sa light mode. Dito nakabase ang kulay ng panels
  const isLight = label === "LIGHT MODE";

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Pulang panel: pareho sa dalawang mode */}
      <div className="theme-panel theme-panel-red" />

      {/* Gitnang panel: puti kapag papuntang dark, itim kapag papuntang light */}
      <div
        className={`theme-panel ${isLight ? "theme-panel-dark" : "theme-panel-white"}`}
      />

      {/* Pinakaibabaw na panel (nandito ang text):
          itim kapag papuntang dark, light kapag papuntang light */}
      <div
        className={`theme-panel ${isLight ? "theme-panel-light" : "theme-panel-black"}`}
      >
        {/* Kapag light mode, itim ang kulay ng text para mabasa */}
        <span className={`theme-label ${isLight ? "theme-label-dark" : ""}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default DarkMode;