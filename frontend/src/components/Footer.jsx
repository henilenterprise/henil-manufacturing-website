import Logo from "./Logo.jsx";
import DownloadBrochureButton from "./DownloadBrochureButton.jsx";
import { NAV_LINKS, siteConfig } from "../config/site.config.js";
import { localBusiness } from "../config/localBusiness.config.js";
import { trackEvent } from "../utils/analytics.js";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" itemScope itemType="https://schema.org/LocalBusiness">
      <meta itemProp="name" content={siteConfig.companyName} />
      <div className="container footer__brand-row">
        <Logo variant="full" size={96} />
      </div>

      <div className="container footer__brochure-row">
        <DownloadBrochureButton variant="solid" />
      </div>

      <nav className="container footer__nav" aria-label="Footer">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="footer__nav-link">
            {link.label}
          </a>
        ))}
        <a href="/faq" className="footer__nav-link">FAQ</a>
      </nav>

      <div className="container footer__inner">
        <span>© {year} Henil Enterprise</span>
        <a href="/design-system" className="footer__meta">Design System</a>
        <span className="footer__meta" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="addressLocality">{localBusiness.city}</span>,{" "}
          <span itemProp="addressRegion">{localBusiness.state}</span>,{" "}
          <span itemProp="addressCountry">{localBusiness.country}</span>
        </span>
        {siteConfig.phone && (
          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
            className="footer__meta"
            itemProp="telephone"
            onClick={() =>
              trackEvent("phone_click", {
                cta_location: "footer",
                cta_label: siteConfig.phone,
              })
            }
          >
            {siteConfig.phone}
          </a>
        )}
      </div>

      <div className="container footer__legal-row">
        <a href="/privacy-policy" className="footer__meta">Privacy Policy</a>
        <a href="/terms" className="footer__meta">Terms of Use</a>
        <a href="/cookie-policy" className="footer__meta">Cookie Policy</a>
      </div>
    </footer>
  );
}
