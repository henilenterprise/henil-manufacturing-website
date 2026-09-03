import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "./GlassNavbar.css";

/**
 * Reusable sticky glass navbar. Transparent at the top of the page,
 * condenses into a blurred glass strip once scrolled. Pass `links` and
 * `cta` so this can be reused across the marketing site and the design
 * system showcase without duplicating the scroll logic.
 */
export default function GlassNavbar({ brand, links = [], cta }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`glass-navbar ${scrolled ? "glass-navbar--scrolled" : ""}`}>
      <div className="container glass-navbar__inner">
        <div className="glass-navbar__brand">{brand}</div>

        <nav className="glass-navbar__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="glass-navbar__link">{l.label}</a>
          ))}
        </nav>

        <div className="glass-navbar__cta">{cta}</div>

        <button
          className="glass-navbar__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`glass-navbar__mobile ${open ? "glass-navbar__mobile--open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className="glass-navbar__mobile-link" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        {cta && <div className="glass-navbar__mobile-cta">{cta}</div>}
      </div>
    </header>
  );
}
