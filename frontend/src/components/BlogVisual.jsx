import { Scale, Ruler, ShieldCheck, Layers, Boxes, Cog, Zap, GitMerge, Link2, Factory, FileText } from "lucide-react";
import "./BlogVisual.css";

const ICONS = { Scale, Ruler, ShieldCheck, Layers, Boxes, Cog, Zap, GitMerge, Link2, Factory };

/**
 * Same honest-placeholder pattern used for products, applications, and
 * industries — no real blog photography exists yet, so this renders a
 * designed icon tile rather than a stock photo. Swapping in a real
 * `coverImageUrl` later (the field already exists in the data shape,
 * matching the real DB column) needs no changes here beyond checking
 * for its presence.
 */
export default function BlogVisual({ icon, large = false }) {
  const Icon = ICONS[icon] || FileText;
  return (
    <div className={`blog-visual ${large ? "blog-visual--large" : ""}`}>
      <Icon size={large ? 44 : 26} strokeWidth={1.5} />
    </div>
  );
}
