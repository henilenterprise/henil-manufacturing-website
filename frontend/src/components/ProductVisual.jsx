import {
  Layers, Boxes, ShieldCheck, Shield, Droplet, Package, Archive,
  Eye, Aperture, Box, Wrench, Store,
} from "lucide-react";
import { getCategoryById } from "../data/categories.data.js";
import "./ProductVisual.css";

const ICONS = { Layers, Boxes, ShieldCheck, Shield, Droplet, Package, Archive, Eye, Aperture, Box, Wrench, Store };

/**
 * No product photography exists yet, and this system shouldn't pretend
 * otherwise — this renders an honest placeholder (a category icon on a
 * glass tile) rather than a stock photo standing in for a real product.
 * Swap in a real <img> here once photography is supplied; ProductCard
 * doesn't need to change.
 */
export default function ProductVisual({ categoryId, large = false }) {
  const category = getCategoryById(categoryId);
  const Icon = ICONS[category?.icon] || Box;

  return (
    <div className={`product-visual ${large ? "product-visual--large" : ""}`}>
      <Icon size={large ? 64 : 32} strokeWidth={1.5} />
    </div>
  );
}
