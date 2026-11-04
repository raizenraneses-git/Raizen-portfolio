// Footer.jsx
// Footer V6 - Phone at Email na lang sa Connect (wala nang GitHub at LinkedIn)
// Design: Persona 3 Reload (slant, strips, big faded text)
// Theme: font-poppins, primary, secondary, white
// React + Tailwind lang. Walang extra library.

import { FiPhone, FiMail } from "react-icons/fi";
import { useSound } from "./Sound/soundControl";
// ------------------------------------------------------------
// 1. DATA (dito mo lang papalitan ang laman)
// ------------------------------------------------------------
const NAME = "RAIZEN RAÑESES";
const ROLE = "Web Developer";
const TAGLINE =
  "Thanks for visiting my portfolio. Let's build something great together.";

const pageLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "AboutMe", href: "#aboutMe" },
  { label: "Contact", href: "#contact" },
];

// Phone at Email na kita agad (hindi na kailangan i-click para makita).
// "value" = nakikita ng tao. "href" = mangyayari pag cinlick.
const contactInfo = [
  {
    label: "Phone",
    value: "0920 822 6863",
    href: "tel:+639208226863",
    icon: FiPhone,
  },
  {
    label: "Email",
    value: "raizenraneses@gmail.com",
    href: "mailto:raizenraneses@gmail.com",
    icon: FiMail,
  },
];

// >>> NEW: INAYOS. Tinanggal ang useSound() dito sa labas ng component
// (bawal ang hook dito). Ngayon, tumatanggap na lang ng playClick
// bilang 3rd parameter. Ang bawat component sa baba ang kumukuha nito.
// Smooth scroll para sa mga "#" links sa loob ng Footer.
// Walang page jump: dahan-dahang bababa/aakyat papunta sa section.
const handleAnchorClick = (e, href, playClick) => {
  e.preventDefault();
  playClick(); // NEW: tutunog pag cinlick
  if (!href.startsWith("#")) return;
  const el = document.getElementById(href.slice(1));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// ------------------------------------------------------------
// 2. MENU LINK
// Isang link na parang menu sa Persona 3 Reload.
// Hover / Tab: naka-slant, may background na primary, at may arrow.
// ------------------------------------------------------------
function MenuLink({ label, href }) {
  // >>> NEW: kunin ang tunog dito (loob ng component)
  const { playClick } = useSound();

  // Kapag galing sa ibang website, bubukas sa bagong tab
  const isOutside = href.startsWith("http");

  return (
    <a
      href={href}
      // >>> NEW: smooth scroll + tunog pag cinlick
      onClick={(e) => handleAnchorClick(e, href, playClick)}
      target={isOutside ? "_blank" : undefined}
      rel={isOutside ? "noopener noreferrer" : undefined}
      className="
        group block w-fit -skew-x-12
        px-4 py-2.5 rounded-2xl
        font-poppins text-sm font-semibold uppercase tracking-widest
        text-Ddescription dark:text-Ldescription
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
// 3. CONTACT ITEM
// Icon + Phone/Email na nakikita agad.
// Pwede pa rin i-click: Phone = tawag, Email = bubukas ang email app.
// ------------------------------------------------------------
function ContactItem({ icon: Icon, label, value, href }) {
  // >>> NEW: kunin ang tunog
  const { playClick } = useSound();

  return (
    <a
      href={href}
      // >>> NEW: tutunog pag cinlick ang Phone o Email
      onClick={playClick}
      aria-label={`${label}: ${value}`}
      className="
        group flex w-fit items-center gap-3
        font-poppins text-sm
        text-Ddescription dark:text-Ldescription
        transition-colors duration-200 motion-reduce:transition-none
        hover:text-primary
        focus-visible:text-primary focus-visible:outline-none
      "
    >
      {/* Icon box */}
      <span
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-2xl border border-primary
          text-primary
          transition-colors duration-200 motion-reduce:transition-none
          group-hover:bg-primary group-hover:text-white
          group-focus-visible:bg-primary group-focus-visible:text-white
        "
      >
        <Icon className="h-4 w-4" />
      </span>

      {/* Number o Email */}
      <span className="break-words">{value}</span>
    </a>
  );
}

// ------------------------------------------------------------
// 4. COLUMN TITLE
// Maliit na title sa taas ng bawat column (Menu, Connect).
// ------------------------------------------------------------
function ColumnTitle({ children }) {
  return (
    // >>> NEW: tinanggal ang id="contact" dito. Dalawang beses kasi
    // ginagamit ang component na ito (Menu at Connect), kaya duplicate ang id.
    // Inilipat sa Connect column sa ibaba.
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
// 5. MAIN FOOTER
// ------------------------------------------------------------
export default function Footer() {
  const year = new Date().getFullYear();
  // >>> NEW: kunin ang tunog para sa "Back to top" button
  const { playClick } = useSound();

  return (
    <footer className="relative w-full overflow-hidden bg-dbg-soft dark:bg-wbg-soft ">

      {/* Slanted strips sa taas (P3R vibe) */}
      <div className="flex gap-2">
        <div className="h-2 w-1/3 -skew-x-12 bg-primary" />
        <div className="h-2 w-16 -skew-x-12 bg-alternative" />
        <div className="h-2 flex-1 -skew-x-12 bg-primary" />
      </div>

      {/* Malaking faded na text sa likod (design lang) */}
      <p
        aria-hidden="true"
        className="
          pointer-events-none select-none
          absolute -bottom-6 right-4
          font-poppins font-black uppercase leading-none
          text-white/5 dark:text-Ldescription/15
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
          md:grid-cols-[1.2fr_0.8fr_1.2fr] md:gap-10
        "
      >

        {/* Column 1: Pangalan + Contact */}
        <div>
          <h2
            className="
              font-poppins font-bold uppercase tracking-wider
              text-white dark:text-secondary
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
              text-Ddescription dark:text-Ldescription
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

        {/* Column 3: Contact (Phone at Email, nakikita agad) */}
        {/* >>> NEW: dito na nakalagay ang id="contact" (isa lang sa buong page).
            scroll-mt-24 para hindi matakpan ng sticky navbar. */}
        <div id="contact" className="scroll-mt-24">
          <ColumnTitle>Connect</ColumnTitle>
          <ul className="space-y-4">
            {contactInfo.map((item) => (
              <li key={item.label}>
                <ContactItem
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  href={item.href}
                />
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 dark:border-secondary/15">
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
              text-white/70 dark:text-secondary
              text-center sm:text-left
            "
          >
            © {year} {NAME}. All rights reserved.
          </p>

          <a
            href="#home"
            // >>> NEW: smooth scroll pabalik sa taas + tunog
            onClick={(e) => handleAnchorClick(e, "#home", playClick)}
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