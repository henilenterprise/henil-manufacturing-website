// Verifies the real WhatsApp message-building logic (frontend/src/utils/whatsapp.js)
// combined with real product data — not mocked data — to prove the
// dynamic {product} substitution actually works end to end.
//
// Run with: node frontend/scripts/test-whatsapp.mjs

import { buildWhatsAppMessage, buildWhatsAppHref } from "../src/utils/whatsapp.js";
import { getProductById } from "../src/data/products.data.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

const DEFAULT = "Hello Henil Enterprise, I am interested in your acrylic/polycarbonate fabrication services.";
const PRODUCT = "Hello Henil Enterprise, I am interested in {product}.";
const NUMBER = "919876543210";

console.log("=".repeat(70));
console.log("Default message (no page context)");
console.log("=".repeat(70));
{
  const msg = buildWhatsAppMessage({ defaultTemplate: DEFAULT, productTemplate: PRODUCT });
  check("matches the exact example given in the brief", msg === "Hello Henil Enterprise, I am interested in your acrylic/polycarbonate fabrication services.", msg);
}

console.log("\n" + "=".repeat(70));
console.log("Product-context message, using REAL catalogue data");
console.log("=".repeat(70));
{
  const product = getProductById("custom-acrylic-tank");
  check("real product found in the catalogue", Boolean(product), product);
  const msg = buildWhatsAppMessage({ defaultTemplate: DEFAULT, productTemplate: PRODUCT, context: { product: product.name } });
  check("matches the exact [PRODUCT] example pattern from the brief", msg === "Hello Henil Enterprise, I am interested in Custom Acrylic Tank.", msg);
}
{
  // Try every real product, not just one, to prove this isn't a coincidence for a single case.
  const ids = ["cnc-machine-guard", "acrylic-storage-box", "transparent-equipment-enclosure"];
  for (const id of ids) {
    const product = getProductById(id);
    const msg = buildWhatsAppMessage({ defaultTemplate: DEFAULT, productTemplate: PRODUCT, context: { product: product.name } });
    check(`correct message for "${product.name}"`, msg === `Hello Henil Enterprise, I am interested in ${product.name}.`, msg);
  }
}

console.log("\n" + "=".repeat(70));
console.log("Full href generation and URL-encoding correctness");
console.log("=".repeat(70));
{
  const product = getProductById("custom-acrylic-tank");
  const href = buildWhatsAppHref({ number: NUMBER, defaultTemplate: DEFAULT, productTemplate: PRODUCT, context: { product: product.name } });
  check("href starts with the correct wa.me domain", href.startsWith("https://wa.me/919876543210?text="));
  const decoded = decodeURIComponent(href.split("text=")[1]);
  check("decoded message round-trips correctly", decoded === "Hello Henil Enterprise, I am interested in Custom Acrylic Tank.", decoded);
}

console.log("\n" + "=".repeat(70));
console.log("Safety: never build a link to an unconfigured number");
console.log("=".repeat(70));
{
  const href = buildWhatsAppHref({ number: "", defaultTemplate: DEFAULT, productTemplate: PRODUCT });
  check("returns null rather than a broken wa.me/undefined link", href === null);
}

console.log("\n" + "=".repeat(70));
console.log("Graceful fallback for an unknown/stale product slug");
console.log("=".repeat(70));
{
  const product = getProductById("this-product-does-not-exist");
  check("lookup correctly returns undefined", product === undefined);
  const msg = buildWhatsAppMessage({ defaultTemplate: DEFAULT, productTemplate: PRODUCT, context: product ? { product: product.name } : undefined });
  check("falls back to the default message rather than crashing or showing 'undefined'", msg === DEFAULT, msg);
}

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
