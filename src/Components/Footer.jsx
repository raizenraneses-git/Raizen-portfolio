import { FiPhone, FiMail } from "react-icons/fi";

import { useSound } from "./Sound/soundControl";

/* ---------- Data ---------- */

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

/* ---------- Styles ---------- */

const contentClass =
  "relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1.2fr] md:gap-10 lg:px-8";

const bottomBarClass =
  "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-6 lg:px-8";

const watermarkClass =
  "pointer-events-none absolute -bottom-6 right-4 select-none font-poppins text-[6rem] font-black uppercase leading-none text-white/5 md:text-[11rem] dark:text-Ldescription/15";

const nameClass =
  "font-poppins text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl dark:text-secondary";

const roleClass =
  "mt-3 font-poppins text-sm font-semibold uppercase tracking-widest text-primary";

const taglineClass =
  "mt-6 max-w-xs font-poppins text-sm leading-relaxed text-Ddescription dark:text-Ldescription";

const columnTitleClass =
  "mb-6 flex items-center gap-3 font-poppins text-xs font-bold uppercase tracking-[0.3em] text-primary";

const menuLinkClass =
  "group block w-fit -skew-x-12 rounded-2xl px-4 py-2.5 font-poppins text-sm font-semibold uppercase tracking-widest text-Ddescription transition-all duration-200 hover:translate-x-2 hover:bg-primary hover:text-white focus-visible:translate-x-2 focus-visible:bg-primary focus-visible:text-white focus-visible:outline-none motion-reduce:transition-none dark:text-Ldescription";

const menuArrowClass =
  "opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100";

const contactLinkClass =
  "group flex w-fit items-center gap-3 font-poppins text-sm text-Ddescription transition-colors duration-200 hover:text-primary focus-visible:text-primary focus-visible:outline-none motion-reduce:transition-none dark:text-Ldescription";

const contactIconClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white group-focus-visible:bg-primary group-focus-visible:text-white motion-reduce:transition-none";

const copyrightClass =
  "text-center font-poppins text-xs uppercase tracking-widest text-white/70 sm:text-left dark:text-secondary";

const backToTopClass =
  "-skew-x-12 rounded-2xl border border-primary px-5 py-2.5 font-poppins text-xs font-semibold uppercase tracking-widest text-primary transition-colors duration-200 hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white focus-visible:outline-none motion-reduce:transition-none";

/* ---------- Helpers ---------- */

const handleAnchorClick = (e, href, playClick) => {
  e.preventDefault();
  playClick();
  if (!href.startsWith("#")) return;

  document.getElementById(href.slice(1))?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

/* ---------- Small components ---------- */

function ColumnTitle({ children }) {
  return (
    <h3 className={columnTitleClass}>
      <span className="h-px w-8 bg-primary" />
      {children}
    </h3>
  );
}

function MenuLink({ label, href }) {
  const { playClick } = useSound();
  const isOutside = href.startsWith("http");

  return (
    <a
      href={href}
      onClick={(e) => handleAnchorClick(e, href, playClick)}
      target={isOutside ? "_blank" : undefined}
      rel={isOutside ? "noopener noreferrer" : undefined}
      className={menuLinkClass}
    >
      {/* skew-x-12 cancels the parent's slant so the text stays upright */}
      <span className="flex skew-x-12 items-center gap-2">
        <span aria-hidden="true" className={menuArrowClass}>
          ▸
        </span>
        {label}
      </span>
    </a>
  );
}

function ContactItem({ icon: Icon, label, value, href }) {
  const { playClick } = useSound();

  return (
    <a
      href={href}
      onClick={playClick}
      aria-label={`${label}: ${value}`}
      className={contactLinkClass}
    >
      <span className={contactIconClass}>
        <Icon className="h-4 w-4" />
      </span>

      <span className="break-words">{value}</span>
    </a>
  );
}

function TopStrips() {
  return (
    <div className="flex gap-2">
      <div className="h-2 w-1/3 -skew-x-12 bg-primary" />
      <div className="h-2 w-16 -skew-x-12 bg-alternative" />
      <div className="h-2 flex-1 -skew-x-12 bg-primary" />
    </div>
  );
}

/* ---------- Columns ---------- */

function BrandColumn() {
  return (
    <div>
      <h2 className={nameClass}>{NAME}</h2>
      <p className={roleClass}>{ROLE}</p>
      <p className={taglineClass}>{TAGLINE}</p>
    </div>
  );
}

function MenuColumn() {
  return (
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
  );
}

// Holds the page's only id="contact"; scroll-mt-24 clears the sticky navbar
function ConnectColumn() {
  return (
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
  );
}

function BottomBar({ year }) {
  const { playClick } = useSound();

  return (
    <div className="relative border-t border-white/10 dark:border-secondary/15">
      <div className={bottomBarClass}>
        <p className={copyrightClass}>
          © {year} {NAME}. All rights reserved.
        </p>

        <a
          href="#home"
          onClick={(e) => handleAnchorClick(e, "#home", playClick)}
          className={backToTopClass}
        >
          <span className="inline-block skew-x-12">↑ Back to top</span>
        </a>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-dbg-soft dark:bg-wbg-soft">
      <TopStrips />

      <p aria-hidden="true" className={watermarkClass}>
        RAIZEN
      </p>

      <div className={contentClass}>
        <BrandColumn />
        <MenuColumn />
        <ConnectColumn />
      </div>

      <BottomBar year={year} />
    </footer>
  );
}