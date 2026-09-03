import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "../config/site.config.js";
import { getProductById } from "../data/products.data.js";
import "./FloatingWhatsAppButton.css";

const PRODUCT_ROUTE = /^\/products\/([^/]+)$/;

/**
 * The one canonical, persistent WhatsApp entry point for the whole site —
 * fixed bottom-right, present on every page via MainLayout. Other
 * WhatsApp links elsewhere (nav, hero, product-page sticky panels) are
 * page-specific CTAs that were already explicitly requested separately;
 * this component isn't meant to replace them, only to guarantee a
 * single, always-reachable "chat with us" affordance exists regardless
 * of what page a visitor is on or how far they've scrolled.
 *
 * Note: an earlier pass in this project explicitly required this
 * button stay bottom-LEFT (to avoid colliding with MobileStickyCTA's
 * "Get a Quote" button and to keep a consistent corner across the
 * site). It was moved to bottom-right on direct request. If
 * MobileStickyCTA's full-width bar ever gets a right-aligned element
 * added to it in the future, re-check for overlap the same way the
 * `--raised` logic below already accounts for the bar's height.
 */
export default function FloatingWhatsAppButton() {
  const location = useLocation();

  const productMatch = location.pathname.match(PRODUCT_ROUTE);
  const product = productMatch ? getProductById(productMatch[1]) : null;
  const href = siteConfig.whatsapp.buildHref(product ? { product: product.name } : undefined);

  // Never render a button pointing nowhere — matches the pattern used
  // everywhere else this project links to WhatsApp.
  if (!href) return null;

  // Product pages show their own fixed bottom bar (MobileStickyCTA) below
  // 1024px, occupying the full width of the bottom edge. Rather than
  // overlap it, this button lifts itself above that bar on exactly the
  // same route + breakpoint MobileStickyCTA uses — see the CSS for the
  // actual breakpoint value, kept in one place. (MobileStickyCTA used to
  // have its own WhatsApp icon too, which made this button's presence
  // redundant on product pages specifically — that duplicate was removed
  // from MobileStickyCTA, so this is now the only WhatsApp entry point
  // there, same as everywhere else; the raise-above-the-bar behavior
  // still applies since the bar itself is still present.)
  const isProductPage = Boolean(productMatch);

  return (
    <div className={`floating-whatsapp ${isProductPage ? "floating-whatsapp--raised" : ""}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp__button"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2} fill="currentColor" />
        <span className="floating-whatsapp__pulse" aria-hidden="true" />
      </a>
      <span className="floating-whatsapp__tooltip" role="tooltip">
        Chat with us on WhatsApp
      </span>
    </div>
  );
}
