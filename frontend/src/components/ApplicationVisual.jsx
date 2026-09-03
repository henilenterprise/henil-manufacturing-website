import {
  ShieldCheck, Shield, Box, Eye, ShieldAlert, Droplet, Package, Archive, Cog, TestTube, Store,
} from "lucide-react";
import "./ApplicationVisual.css";

const ICONS = { ShieldCheck, Shield, Box, Eye, ShieldAlert, Droplet, Package, Archive, Cog, TestTube, Store };

/**
 * Same honest-placeholder approach as ProductVisual.jsx — no real
 * application photography exists yet, so this renders a designed icon
 * tile rather than pretending otherwise. Kept as its own small
 * component (not reusing ProductVisual directly) because not every
 * application maps cleanly onto an existing product category — two of
 * the 11 (Protective Shields, Laboratory Components) don't have one yet
 * at all, so this takes an icon name directly instead of a category id.
 */
export default function ApplicationVisual({ icon }) {
  const Icon = ICONS[icon] || Box;
  return (
    <div className="application-visual">
      <Icon size={30} strokeWidth={1.5} />
    </div>
  );
}
