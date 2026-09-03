import { useEffect, useRef, useState } from "react";
import {
  X, ChevronLeft, ChevronRight, Maximize, Minimize,
  Package, Factory, Cog, Settings2, Zap, GitMerge, Wrench, BadgeCheck, Box, Truck, ImageIcon,
} from "lucide-react";
import "./GalleryLightbox.css";

const ICONS = { Package, Factory, Cog, Settings2, Zap, GitMerge, Wrench, BadgeCheck, Box, Truck };
const SWIPE_THRESHOLD_PX = 50;

/**
 * items: the currently-filtered array (navigation stays within whatever
 * category the visitor was browsing, not the full unfiltered set).
 */
export default function GalleryLightbox({ items, currentIndex, onClose, onNavigate, getCategoryIcon }) {
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const item = items[currentIndex];

  // Reset the per-image failed state when navigating, so a previous
  // image's fallback doesn't incorrectly carry over to the next one.
  useEffect(() => {
    setImgFailed(false);
  }, [currentIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate("next");
      if (e.key === "ArrowLeft") onNavigate("prev");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNavigate]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen?.();
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) {
      onNavigate(delta < 0 ? "next" : "prev");
    }
    touchStartX.current = null;
  };

  if (!item) return null;

  const Icon = ICONS[getCategoryIcon(item.categoryId)] || ImageIcon;

  return (
    <div
      className="gallery-lightbox"
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="gallery-lightbox__backdrop" onClick={onClose} />

      <div className="gallery-lightbox__toolbar">
        <span className="gallery-lightbox__counter">
          {currentIndex + 1} / {items.length}
        </span>
        <div className="gallery-lightbox__toolbar-actions">
          <button
            type="button"
            className="gallery-lightbox__icon-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
          <button type="button" className="gallery-lightbox__icon-btn" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="gallery-lightbox__nav gallery-lightbox__nav--prev"
        onClick={() => onNavigate("prev")}
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="gallery-lightbox__stage">
        {!imgFailed ? (
          <img
            src={item.src}
            alt={item.alt}
            className="gallery-lightbox__image"
            decoding="async"
            fetchPriority="high"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="gallery-lightbox__placeholder">
            <Icon size={64} strokeWidth={1.25} />
            <span>{item.categoryLabel}</span>
            <p>Photo not yet added for this slot.</p>
          </div>
        )}
      </div>

      <button
        type="button"
        className="gallery-lightbox__nav gallery-lightbox__nav--next"
        onClick={() => onNavigate("next")}
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      <div className="gallery-lightbox__caption">{item.categoryLabel}</div>
    </div>
  );
}
