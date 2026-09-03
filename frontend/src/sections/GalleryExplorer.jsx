import { useMemo, useState } from "react";
import GalleryTile from "../components/GalleryTile.jsx";
import GalleryLightbox from "../components/GalleryLightbox.jsx";
import { GALLERY_CATEGORIES, getGalleryCategoryById } from "../data/galleryCategories.data.js";
import { IMAGES_PER_CATEGORY, GALLERY_BASE_PATH } from "../config/gallery.config.js";
import { buildGalleryItems, filterItemsByCategory, getNextIndex, getPrevIndex } from "../utils/gallery.js";
import "./GalleryExplorer.css";

export default function GalleryExplorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const allItems = useMemo(
    () => buildGalleryItems(GALLERY_CATEGORIES, IMAGES_PER_CATEGORY, GALLERY_BASE_PATH),
    []
  );
  const visibleItems = useMemo(
    () => filterItemsByCategory(allItems, activeCategory),
    [allItems, activeCategory]
  );

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (direction) => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return direction === "next"
        ? getNextIndex(current, visibleItems.length)
        : getPrevIndex(current, visibleItems.length);
    });
  };

  const getCategoryIcon = (categoryId) => getGalleryCategoryById(categoryId)?.icon;

  return (
    <section className="section gallery-explorer">
      <div className="container">
        <div className="gallery-explorer__chips" role="group" aria-label="Filter by category">
          <button
            className={`gallery-explorer__chip ${activeCategory === "all" ? "gallery-explorer__chip--active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`gallery-explorer__chip ${activeCategory === cat.id ? "gallery-explorer__chip--active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gallery-explorer__grid">
          {visibleItems.map((item, index) => (
            <GalleryTile
              key={item.id}
              item={item}
              categoryIcon={getCategoryIcon(item.categoryId)}
              index={index}
              onClick={openLightbox}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={visibleItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigate}
          getCategoryIcon={getCategoryIcon}
        />
      )}
    </section>
  );
}
