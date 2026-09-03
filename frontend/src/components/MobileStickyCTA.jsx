import { ArrowRight } from "lucide-react";
import Button from "./ui/Button.jsx";
import "./MobileStickyCTA.css";

/**
 * Mobile-only (hidden at 1024px+, where StickyInquiryPanel takes over) —
 * fixed to the bottom of the viewport so "Get a Quote" is always reachable
 * with one thumb, without a full sidebar taking up screen space.
 *
 * Get-a-Quote only, deliberately — this used to also embed a WhatsApp
 * icon, but FloatingWhatsAppButton is already on screen at the same
 * time (raised specifically on product pages so the two don't overlap —
 * see its own "isProductPage" comment), making that second WhatsApp
 * entry point a redundant, cluttered duplicate rather than a genuine
 * option. Removing it also gives "Get a Quote" the full width of the
 * bar, which is the more important button here per the brief ("Get
 * Quote must remain easily accessible").
 */
export default function MobileStickyCTA({ quoteHref }) {
  return (
    <div className="mobile-sticky-cta">
      <Button href={quoteHref} variant="solid" size="lg" icon={ArrowRight} className="mobile-sticky-cta__button">
        Get a Quote
      </Button>
    </div>
  );
}
