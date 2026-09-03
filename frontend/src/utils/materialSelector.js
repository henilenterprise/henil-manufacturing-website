// Pure functions cross-referencing the material selector against data
// that already exists and has already been vetted elsewhere in this
// project (capabilities.data.js, products.data.js) — rather than
// re-deciding "which processes work on which material" or writing a new
// "common products" list from scratch, both of which would risk
// contradicting what's already shown on /capabilities and /products.

/** Capabilities whose `materials` array includes this material's label. */
export function getFabricationOptionsForMaterial(materialLabel, capabilities) {
  return capabilities.filter((cap) => cap.materials.includes(materialLabel));
}

/** Products whose `materials` array includes this material's label, featured first. */
export function getCommonProductsForMaterial(materialLabel, products, limit = 4) {
  return products
    .filter((p) => p.materials.includes(materialLabel))
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit);
}
