import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, ArrowRight, Download } from "lucide-react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import Button from "./ui/Button.jsx";
import DownloadBrochureButton from "./DownloadBrochureButton.jsx";
import { NAV_LINKS, CTA_LINK, siteConfig } from "../config/site.config.js";
import { BROCHURE_URL, BROCHURE_FILENAME } from "../config/brochure.config.js";
import { useBrochureAvailability } from "../hooks/useBrochureAvailability.js";
import "./MainNav.css";

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and lock body scroll while open.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <div className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <nav className="site-nav__bar" aria-label="Primary">
          <a href="/" className="site-nav__brand" aria-label="Henil Enterprise home">
            <Logo variant="mark" size={34} />
            <span className="site-nav__wordmark">
              HENIL <em>ENTERPRISE</em>
            </span>
          </a>

          <ul className="site-nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`site-nav__link ${location.pathname === link.href ? "site-nav__link--active" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="site-nav__actions">
            {siteConfig.whatsapp.href && (
              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav__icon-btn"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle size={18} strokeWidth={2} />
              </a>
            )}
            <BrochureIconLink />
            <Button href={CTA_LINK.href} variant="solid" size="sm" className="site-nav__cta">
              {CTA_LINK.label}
            </Button>
          </div>

          <button
            className="site-nav__burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} currentPath={location.pathname} />
    </>
  );
}

function BrochureIconLink() {
  const status = useBrochureAvailability();

  if (status !== "available") {
    return (
      <span
        className="site-nav__icon-btn site-nav__icon-btn--disabled"
        aria-disabled="true"
        title={status === "checking" ? "Checking brochure availability…" : "The brochure hasn't been added yet"}
      >
        <Download size={18} strokeWidth={2} />
      </span>
    );
  }

  return (
    <a
      href={BROCHURE_URL}
      download={BROCHURE_FILENAME}
      className="site-nav__icon-btn"
      aria-label="Download Brochure"
      title="Download Brochure"
    >
      <Download size={18} strokeWidth={2} />
    </a>
  );
}

function MobileMenu({ open, onClose, currentPath }) {
  return (
    <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
      <div className="mobile-menu__panel">
        <div className="mobile-menu__header">
          <a href="/" className="site-nav__brand" onClick={onClose}>
            <Logo variant="mark" size={34} />
            <span className="site-nav__wordmark">
              HENIL <em>ENTERPRISE</em>
            </span>
          </a>
          <button className="mobile-menu__close" aria-label="Close menu" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <ul className="mobile-menu__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`mobile-menu__link ${currentPath === link.href ? "mobile-menu__link--active" : ""}`}
                onClick={onClose}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-menu__footer">
          {siteConfig.whatsapp.href && (
            <a
              href={siteConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu__whatsapp"
              onClick={onClose}
            >
              <MessageCircle size={19} strokeWidth={2} />
              <span>Chat on WhatsApp</span>
            </a>
          )}
          <DownloadBrochureButton variant="ghost" size="lg" className="mobile-menu__cta" />
          <Button href={CTA_LINK.href} variant="solid" size="lg" icon={ArrowRight} className="mobile-menu__cta" onClick={onClose}>
            {CTA_LINK.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
