// Pure functions, no React/DOM dependency — directly testable in plain
// Node (see frontend/scripts/test-gallery.mjs). Two separate concerns
// live here: building the flat item list from categories × slot count,
// and the prev/next wrap-around math the lightbox uses — off-by-one and
// boundary bugs in navigation math are exactly the kind of thing worth
// verifying by actually running, not just reading.

/**
 * Builds the flat, ordered list of gallery item descriptors — one per
 * category × slot. Each item's `src` follows a fixed convention
 * (see frontend/public/gallery/README.md) so no per-image data entry is
 * needed; whether that src actually resolves to a real photo is decided
 * at render time by GalleryTile's onError fallback, not here.
 */
export function buildGalleryItems(categories, imagesPerCategory, basePath) {
  const items = [];
  for (const category of categories) {
    for (let slot = 1; slot <= imagesPerCategory; slot++) {
      items.push({
        id: `${category.id}-${slot}`,
        categoryId: category.id,
        categoryLabel: category.label,
        slot,
        src: `${basePath}/${category.id}/${category.id}-${slot}.jpg`,
        alt: `${category.label} photo ${slot}`,
      });
    }
  }
  return items;
}

export function filterItemsByCategory(items, categoryId) {
  if (!categoryId || categoryId === "all") return items;
  return items.filter((item) => item.categoryId === categoryId);
}

/** Wraps forward: last index + 1 → 0. Returns -1 unchanged for an empty list. */
export function getNextIndex(currentIndex, length) {
  if (length === 0) return -1;
  return (currentIndex + 1) % length;
}

/** Wraps backward: index 0 - 1 → last index. Returns -1 unchanged for an empty list. */
export function getPrevIndex(currentIndex, length) {
  if (length === 0) return -1;
  return (currentIndex - 1 + length) % length;
}
