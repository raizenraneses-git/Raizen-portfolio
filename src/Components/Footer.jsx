// Footer.jsx
// Footer V4 - cleaned up
// Design: Persona 3 Reload (slant, strips, big faded text)
// Theme: font-poppins, primary, secondary, white
// React + Tailwind lang. Walang extra library.

// ------------------------------------------------------------
// 1. DATA (dito mo lang papalitan ang laman)
// ------------------------------------------------------------
const NAME = "RAIZEN RAÑESES";
const ROLE = "Web Developer";
const TAGLINE =
  "Thanks for visiting my portfolio. Let's build something great together.";

const pageLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/yourname" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourname" },
  { label: "Email", href: "mailto:raizenraneses@email.com" },
];

// ------------------------------------------------------------
// 2. MENU LINK
// Isang link na parang menu sa Persona 3 Reload.
// Hover / Tab: naka-slant, may background na primary, at may arrow.
// ------------------------------------------------------------
function MenuLink({ label, href }) {
  // Kapag galing sa ibang website, bubukas sa bagong tab
  const isOutside = href.startsWith("http");

  return (
    <a
      href={href}
      target={isOutside ? "_blank" : undefined}
      rel={isOutside ? "noopener noreferrer" : undefined}
      className="
        group block w-fit -skew-x-12
        px-4 py-2.5 rounded-2xl
        font-poppins text-sm font-semibold uppercase tracking-widest
        text-white/70
        transition-all duration-200 motion-reduce:transition-none
        hover:translate-x-2 hover:bg-primary hover:text-white
        focus-visible:translate-x-2 focus-visible:bg-primary focus-visible:text-white
        focus-visible:outline-none
      "
    >
      {/* skew-x-12 para tuwid pa rin ang text kahit naka-slant ang box */}
      <span className="flex skew-x-12 items-center gap-2">
        {/* Arrow - lalabas lang pag hover o Tab */}
        <span
          aria-hidden="true"
          className="
            opacity-0 transition-opacity
            group-hover:opacity-100 group-focus-visible:opacity-100
          "
        >
          ▸
        </span>
        {label}
      </span>
    </a>
  );
}

// ------------------------------------------------------------
// 3. COLUMN TITLE
// Maliit na title sa taas ng bawat column (Menu, Connect).
// ------------------------------------------------------------
function ColumnTitle({ children }) {
  return (
    <h3
      className="
        flex items-center gap-3
        font-poppins text-xs font-bold uppercase tracking-[0.3em]
        text-primary
        mb-6
      "
    >
      <span className="h-px w-8 bg-primary" />
      {children}
    </h3>
  );
}

// ------------------------------------------------------------
// 4. MAIN FOOTER
// ------------------------------------------------------------
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-secondary">

      {/* Slanted strips sa taas (P3R vibe) */}
      <div className="flex gap-2">
        <div className="h-2 w-1/3 -skew-x-12 bg-primary" />
        <div className="h-2 w-16 -skew-x-12 bg-white/40" />
        <div className="h-2 flex-1 -skew-x-12 bg-white/10" />
      </div>

      {/* Malaking faded na text sa likod (design lang) */}
      <p
        aria-hidden="true"
        className="
          pointer-events-none select-none
          absolute -bottom-6 right-4
          font-poppins font-black uppercase leading-none
          text-white/5
          text-[6rem] md:text-[11rem]
        "
      >
        RAIZEN
      </p>

      {/* Content */}
      <div
        className="
          relative mx-auto max-w-7xl
          px-6 sm:px-6 lg:px-8
          py-16
          grid grid-cols-1 gap-12
          md:grid-cols-[1.5fr_1fr_1fr] md:gap-10
        "
      >

        {/* Column 1: Pangalan */}
        <div>
          <h2
            className="
              font-poppins font-bold uppercase tracking-wider
              text-white
              text-2xl sm:text-3xl
            "
          >
            {NAME}
          </h2>

          <p
            className="
              font-poppins text-sm font-semibold uppercase tracking-widest
              text-primary
              mt-3
            "
          >
            {ROLE}
          </p>

          <p
            className="
              font-poppins text-sm leading-relaxed
              text-white/70
              max-w-xs
              mt-6
            "
          >
            {TAGLINE}
          </p>
        </div>

        {/* Column 2: Pages */}
        <nav aria-label="Footer pages">
          <ColumnTitle>Menu</ColumnTitle>
          <ul className="space-y-1">
            {pageLinks.map((link) => (
              <li key={link.label}>
                <MenuLink label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3: Socials */}
        <nav aria-label="Social links">
          <ColumnTitle>Connect</ColumnTitle>
          <ul className="space-y-1">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <MenuLink label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
        </nav>

      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div
          className="
            mx-auto max-w-7xl
            px-6 sm:px-6 lg:px-8
            py-6
            flex flex-col items-center justify-between gap-4
            sm:flex-row
          "
        >
          <p
            className="
              font-poppins text-xs uppercase tracking-widest
              text-white/70
              text-center sm:text-left
            "
          >
            © {year} {NAME}. All rights reserved.
          </p>

          <a
            href="#home"
            className="
              -skew-x-12
              border border-primary rounded-2xl
              px-5 py-2.5
              font-poppins text-xs font-semibold uppercase tracking-widest
              text-primary
              transition-colors duration-200 motion-reduce:transition-none
              hover:bg-primary hover:text-white
              focus-visible:bg-primary focus-visible:text-white
              focus-visible:outline-none
            "
          >
            <span className="inline-block skew-x-12">↑ Back to top</span>
          </a>
        </div>
      </div>

    </footer>
  );
} 