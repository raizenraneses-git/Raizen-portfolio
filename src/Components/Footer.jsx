// Footer.jsx
// Persona 3 Reload-inspired footer (clean version)
// Walang extra library na kailangan. React + Tailwind lang.

// ------------------------------------------------------------
// 1. DATA (dito mo lang papalitan ang laman)
// ------------------------------------------------------------
const NAME = "RAIZEN RAÑESES";
const ROLE = "Web Developer";

const pageLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/yourname" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourname" },
  { label: "Email", href: "raizenraneses:raizenraneses@email.com" },
];

// ------------------------------------------------------------
// 2. MENU LINK
// Isang link na parang menu sa Persona 3 Reload.
// Pag hinover: nagiging cyan, naka-slant, at may arrow.
// ------------------------------------------------------------
function MenuLink({ label, href }) {
  return (
    <a
      href={href}
      className="group block -skew-x-12 px-4 py-2
                 text-sm font-semibold font-poppins uppercase tracking-widest text-Ddescription
                 transition-all duration-200
                 hover:translate-x-2 hover:bg-alternative hover:text-secondary rounded-2xl"
    >
      {/* skew-x-12 para tuwid pa rin ang text kahit naka-slant ang box */}
      <span className="flex skew-x-12 items-center gap-2">
        <span className="opacity-0 transition-opacity group-hover:opacity-100">
        </span>
        {label}
      </span>
    </a>
  );
}

// ------------------------------------------------------------
// 3. COLUMN TITLE
// Maliit na title sa taas ng bawat column.
// ------------------------------------------------------------
function ColumnTitle({ children }) {
  return (
    <h3 className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-alternative">
      <span className="h-px w-8 bg-alternative" />
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
    <footer className="relative overflow-hidden bg-blue-950 text-sky-100">
      {/* Slanted strips sa taas (P3R vibe) */}
      <div className="flex gap-2 pt-0">
        <div className="h-2 w-1/3 -skew-x-12 bg-cyan-300" />
        <div className="h-2 w-16 -skew-x-12 bg-sky-500" />
        <div className="h-2 flex-1 -skew-x-12 bg-blue-900" />
      </div>

      {/* Malaking faded na text sa likod (design lang) */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 right-4 select-none
                   text-[7rem] font-black uppercase leading-none text-blue-900/40
                   md:text-[12rem]"
      >
        RAIZEN
      </p>

      {/* Content */}
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        {/* Column 1: Pangalan */}
        <div>
          <h2 className="text-3xl font-poppins font-black uppercase tracking-wider text-white">
            {NAME}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-widest text-alternative">
            {ROLE}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sky-200/70">
            Thanks for visiting my portfolio. Let&apos;s build something great
            together.
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
      <div className="relative border-t border-blue-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 text-xs uppercase tracking-widest text-sky-300/70 sm:flex-row">
          <p>
            © {year} {NAME}. All rights reserved.
          </p>

          <a
            href="#home"
            className="-skew-x-12 border border-alternative px-4 py-2 font-semibold rounded-2xl
                       text-alternative transition-colors
                       hover:bg-alternative hover:text-blue-950"
          >
            <span className="inline-block skew-x-12">↑ Back to top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}