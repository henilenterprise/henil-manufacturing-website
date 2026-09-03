import { ArrowRight, MessageCircle } from "lucide-react";
import GlassPanel from "./ui/GlassPanel.jsx";
import Badge from "./ui/Badge.jsx";
import Button from "./ui/Button.jsx";
import { getCategoryById } from "../data/categories.data.js";
import { siteConfig } from "../config/site.config.js";
import "./StickyInquiryPanel.css";

/**
 * Desktop-only (hidden below 1024px, see CSS) — sticks alongside the
 * product content as the visitor scrolls, so the CTA is never more than
 * a glance away without needing a fixed bar that competes with content.
 */
export default function StickyInquiryPanel({ product, quoteHref }) {
  const category = getCategoryById(product.categoryId);

  return (
    <GlassPanel className="sticky-inquiry">
      {category && (
        <Badge variant="outline" tone="accent" className="sticky-inquiry__category">
          {category.label}
        </Badge>
      )}
      <h3 className="sticky-inquiry__name">{product.name}</h3>
      <p className="sticky-inquiry__description">{product.shortDescription}</p>

      <div className="sticky-inquiry__materials">
        {product.materials.map((m) => (
          <Badge key={m} variant="solid" tone="accent">{m}</Badge>
        ))}
      </div>

      <Button href={quoteHref} variant="solid" size="lg" icon={ArrowRight} className="sticky-inquiry__cta">
        Get a Quote
      </Button>

      {siteConfig.whatsapp.href && (
        <Button
          href={siteConfig.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="md"
          icon={MessageCircle}
          iconPosition="left"
          className="sticky-inquiry__whatsapp"
        >
          Ask on WhatsApp
        </Button>
      )}
    </GlassPanel>
  );
}
