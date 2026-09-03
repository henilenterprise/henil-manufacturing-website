// Pure helper, kept separate so the URL-building logic is testable
// without rendering the component.
export function buildQuantityQuoteHref(category) {
  return `/quote?quantityCategory=${encodeURIComponent(category.id)}&quantityLabel=${encodeURIComponent(category.label)}`;
}
