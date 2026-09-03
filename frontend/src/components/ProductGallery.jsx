import { useState } from "react";
import ProductVisual from "./ProductVisual.jsx";
import "./ProductGallery.css";

/**
 * Architecturally ready for a real multi-image gallery (pass an `images`
 * array of { id, src, alt } and it renders a thumbnail strip), but no
 * product photography exists yet — so today it honestly shows a single
 * placeholder visual rather than faking multiple angles of a photo that
 * doesn't exist.
 */
export default function ProductGallery({ categoryId, images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasRealImages = images.length > 0;

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        {hasRealImages ? (
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            // The main product photo is very likely this page's LCP
            // (largest contentful paint) element — eager-loaded and
            // high-priority, the opposite of every other image on this
            // page, which should stay lazy. Getting this one wrong (lazy)
            // would be the single biggest image-perf mistake possible on
            // a product page.
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        ) : (
          <ProductVisual categoryId={categoryId} large />
        )}
      </div>

      {hasRealImages && images.length > 1 && (
        <div className="product-gallery__thumbs">
          {images.map((img, i) => (
            <button
              key={img.id}
              className={`product-gallery__thumb ${i === activeIndex ? "product-gallery__thumb--active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}

      {!hasRealImages && (
        <p className="product-gallery__note">
          Product photography not yet available — illustrative placeholder shown.
        </p>
      )}
    </div>
  );
}
