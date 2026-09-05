import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import HeroVisual from "./HeroVisual.jsx";
import { siteConfig } from "../config/site.config.js";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Ahmedabad, Gujarat · B2B Manufacturing</span>
          <h1 className="hero__title">
            Acrylic &amp; Polycarbonate <em>Manufacturer in Ahmedabad.</em>
          </h1>
          <p className="hero__sub">
            Custom acrylic and polycarbonate components, guards, covers and fabricated
            products manufactured to your drawings and requirements — with CNC routing,
            laser cutting, bending and bonding for B2B quantity orders.
          </p>
          <div className="hero__actions">
            <Button href="/quote" variant="solid" size="lg" icon={ArrowRight}>
              Get a Quote
            </Button>
            <Button href="/capabilities" variant="ghost" size="lg">
              View Capabilities
            </Button>
            {siteConfig.whatsapp.href && (
              <Button
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="glass"
                size="lg"
                icon={MessageCircle}
                iconPosition="left"
              >
                WhatsApp Us
              </Button>
            )}
          </div>
          <ul className="hero__keywords" aria-label="What we do">
            <li>Acrylic</li>
            <li>Polycarbonate</li>
            <li>Custom Products</li>
            <li>Quantity Orders</li>
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
