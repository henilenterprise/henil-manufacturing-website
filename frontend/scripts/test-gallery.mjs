// Verifies the real gallery item-building and navigation math — no
// React, no DOM, no network needed since these are pure functions.
// Run with: node frontend/scripts/test-gallery.mjs

import { buildGalleryItems, filterItemsByCategory, getNextIndex, getPrevIndex } from "../src/utils/gallery.js";
import { GALLERY_CATEGORIES } from "../src/data/galleryCategories.data.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

console.log("=".repeat(70));
console.log("Category dataset");
console.log("=".repeat(70));
check("exactly 10 categories", GALLERY_CATEGORIES.length === 10, GALLERY_CATEGORIES.length);
const expectedIds = ["products","factory","machinery","cnc","laser-cutting","bending","fabrication","finished-products","packaging","dispatch"];
check("category ids match the brief exactly, in order", JSON.stringify(GALLERY_CATEGORIES.map(c=>c.id)) === JSON.stringify(expectedIds), GALLERY_CATEGORIES.map(c=>c.id));

console.log("\n" + "=".repeat(70));
console.log("buildGalleryItems()");
console.log("=".repeat(70));
{
  const items = buildGalleryItems(GALLERY_CATEGORIES, 6, "/gallery");
  check("10 categories × 6 slots = 60 items", items.length === 60, items.length);
  check("first item has the expected src convention", items[0].src === "/gallery/products/products-1.jpg", items[0].src);
  check("last item has the expected src convention", items[59].src === "/gallery/dispatch/dispatch-6.jpg", items[59].src);
  check("every item has a unique id", new Set(items.map(i => i.id)).size === items.length);
  check("alt text is present and readable", items[0].alt === "Products photo 1", items[0].alt);
}
{
  const items = buildGalleryItems(GALLERY_CATEGORIES, 3, "/gallery");
  check("slot count is genuinely configurable — 3 per category = 30 total", items.length === 30, items.length);
}

console.log("\n" + "=".repeat(70));
console.log("filterItemsByCategory()");
console.log("=".repeat(70));
{
  const items = buildGalleryItems(GALLERY_CATEGORIES, 6, "/gallery");
  const cncOnly = filterItemsByCategory(items, "cnc");
  check("filtering to one category returns only that category's items", cncOnly.length === 6 && cncOnly.every(i => i.categoryId === "cnc"), cncOnly.length);
  const all = filterItemsByCategory(items, "all");
  check("'all' returns everything unfiltered", all.length === 60);
  const noFilter = filterItemsByCategory(items, null);
  check("no filter argument also returns everything", noFilter.length === 60);
}

console.log("\n" + "=".repeat(70));
console.log("getNextIndex() / getPrevIndex() — the exact boundary cases that are easy to get wrong");
console.log("=".repeat(70));
check("next from middle just increments", getNextIndex(2, 10) === 3);
check("next from the LAST index wraps to 0", getNextIndex(9, 10) === 0, getNextIndex(9, 10));
check("prev from middle just decrements", getPrevIndex(5, 10) === 4);
check("prev from index 0 wraps to the LAST index", getPrevIndex(0, 10) === 9, getPrevIndex(0, 10));
check("single-item list: next wraps to itself", getNextIndex(0, 1) === 0);
check("single-item list: prev wraps to itself", getPrevIndex(0, 1) === 0);
check("empty list: next returns -1 rather than a bogus index or NaN", getNextIndex(0, 0) === -1, getNextIndex(0,0));
check("empty list: prev returns -1 rather than a bogus index or NaN", getPrevIndex(0, 0) === -1, getPrevIndex(0,0));
{
  // Simulate a full lap around a small filtered set, confirming it returns to the start.
  let i = 0;
  for (let step = 0; step < 6; step++) i = getNextIndex(i, 6);
  check("6 consecutive 'next' calls on a 6-item list return to the start", i === 0, i);
}

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
