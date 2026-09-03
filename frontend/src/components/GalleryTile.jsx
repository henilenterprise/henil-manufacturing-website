import { useState } from "react";
import {
  Package, Factory, Cog, Settings2, Zap, GitMerge, Wrench, BadgeCheck, Box, Truck, ImageIcon,
} from "lucide-react";
import "./GalleryTile.css";

const ICONS = { Package, Factory, Cog, Settings2, Zap, GitMerge, Wrench, BadgeCheck, Box, Truck };

/**
 * Tries to load the real photo at `item.src`; if it doesn't exist yet
 * (onError — the standard, zero-dependency way to detect this), falls
 * back to an honest placeholder tile instead of a broken image icon.
 * The moment a real file is dropped at that path (see
 * frontend/public/gallery/README.md), this same component starts
 * rendering it automatically — no code change needed.
 */
export default function GalleryTile({ item, categoryIcon, onClick, index }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const Icon = ICONS[categoryIcon] || ImageIcon;

  return (
    <button
      type="button"
      className="gallery-tile"
      onClick={() => onClick(index)}
      aria-label={`View ${item.alt}`}
    >
      {!failed ? (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className={`gallery-tile__img ${loaded ? "gallery-tile__img--loaded" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="gallery-tile__placeholder">
          <Icon size={28} strokeWidth={1.5} />
          <span className="gallery-tile__placeholder-label">{item.categoryLabel}</span>
        </div>
      )}
    </button>
  );
}
