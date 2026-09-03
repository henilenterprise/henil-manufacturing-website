// Pure functions with no dependency on import.meta.env — deliberately
// separated from config/site.config.js so this logic can be tested
// directly in plain Node (site.config.js can't be imported outside
// Vite, since import.meta.env only exists there). site.config.js reads
// the actual environment values and passes them in as plain arguments;
// this file only knows how to build a message/link from whatever values
// it's given.

export function buildWhatsAppMessage({ defaultTemplate, productTemplate, context }) {
  if (context?.product) {
    return productTemplate.replace("{product}", context.product);
  }
  return defaultTemplate;
}

export function buildWhatsAppHref({ number, defaultTemplate, productTemplate, context }) {
  if (!number) return null; // never build a link to an unconfigured number
  const message = buildWhatsAppMessage({ defaultTemplate, productTemplate, context });
  // wa.me requires digits only, no + or spaces
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}
