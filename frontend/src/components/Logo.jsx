import logoFull from "../assets/brand/logo-full.svg";
import logoMark from "../assets/brand/logo-mark.svg";
import "./Logo.css";

/**
 * Redrawn as a transparent vector mark (teal diamond + bold "H", plus
 * the "HENIL ENTERPRISE" wordmark for the full lockup) so it drops
 * cleanly onto any surface in this light, brochure-derived theme with
 * no background tile or seam workaround needed — see BRAND-SYSTEM.md.
 *
 * variant:
 *   "mark" — diamond + H only, square. Use for the navbar, mobile header,
 *            and anywhere space is tight.
 *   "full" — full lockup (mark + HENIL + ENTERPRISE). Use for the footer,
 *            the loading screen, and other spacious placements.
 */
export default function Logo({ variant = "mark", size = 40, className = "", loading }) {
  const src = variant === "full" ? logoFull : logoMark;
  const alt = variant === "full" ? "Henil Enterprise" : "Henil Enterprise";

  // Every real usage of variant="mark" is in the navbar or another
  // above-the-fold spot, so it defaults to eager + high priority (it's
  // frequently the LCP element). variant="full" defaults to lazy since
  // its most common placement, the footer, is never in the initial
  // viewport — but LogoLoader explicitly overrides this back to eager
  // for its own use (a full-screen loading indicator that must render
  // immediately, not the footer's relaxed case), via the `loading` prop.
  const resolvedLoading = loading || (variant === "mark" ? "eager" : "lazy");
  const fetchPriority = variant === "mark" ? "high" : "auto";

  return (
    <span
      className={`logo logo--${variant} ${className}`}
      style={{ "--logo-size": `${size}px` }}
    >
      <img src={src} alt={alt} loading={resolvedLoading} decoding="async" fetchPriority={fetchPriority} />
    </span>
  );
}
