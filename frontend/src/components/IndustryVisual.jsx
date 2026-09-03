import {
  Pill, Compass, Factory, FlaskConical, Utensils, Package,
  Car, Cog, TestTube, ShoppingBag,
} from "lucide-react";
import "./IndustryVisual.css";

const ICONS = { Pill, Compass, Factory, FlaskConical, Utensils, Package, Car, Cog, TestTube, ShoppingBag };

/**
 * Premium glass tile with a slow rotating glow ring behind the icon — an
 * honest, original visual treatment (not a stock photo standing in for a
 * specific facility or customer) that still reads as considered and
 * industrial rather than a bare icon.
 */
export default function IndustryVisual({ icon, large = false }) {
  const Icon = ICONS[icon] || Factory;

  return (
    <div className={`industry-visual ${large ? "industry-visual--large" : ""}`}>
      <span className="industry-visual__ring" aria-hidden="true" />
      <Icon size={large ? 34 : 22} strokeWidth={1.5} className="industry-visual__icon" />
    </div>
  );
}
