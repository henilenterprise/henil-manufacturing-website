// Pure functions for the Applications section — resolving fabrication
// method ids to their real display labels, resolving a related category
// id to its real label/link, and building the inquiry CTA link. Kept
// separate from the component so all of this can be verified against
// the real data files directly (see test-applications.mjs).

export function resolveFabricationMethods(methodIds, capabilities) {
  return methodIds
    .map((id) => capabilities.find((cap) => cap.id === id))
    .filter(Boolean);
}

export function resolveRelatedCategory(categoryId, categories) {
  if (!categoryId) return null;
  return categories.find((cat) => cat.id === categoryId) || null;
}

export function buildApplicationQuoteHref(application) {
  return `/quote?application=${encodeURIComponent(application.id)}&applicationLabel=${encodeURIComponent(application.label)}`;
}
