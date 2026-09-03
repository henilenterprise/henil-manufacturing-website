// Verifies the Quantity Orders section's data and logic. Includes a
// permanent regression guard on the digit-free constraint — this isn't
// just a one-time check done while writing the content, it's kept here
// so a future edit that accidentally adds a number back in gets caught
// automatically rather than relying on someone remembering to re-check.
// Run with: node frontend/scripts/test-quantity-orders.mjs

import { QUANTITY_CATEGORIES, QUANTITY_COMMITMENTS } from "../src/data/quantityOrders.data.js";
import { buildQuantityQuoteHref } from "../src/utils/quantityOrders.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

console.log("=".repeat(70));
console.log("Dataset shape");
console.log("=".repeat(70));
check("exactly 4 quantity categories", QUANTITY_CATEGORIES.length === 4, QUANTITY_CATEGORIES.length);
const expectedLabels = ["Prototype", "Small Batch", "Medium Batch", "Large Batch"];
check(
  "category labels match the brief exactly, in order",
  JSON.stringify(QUANTITY_CATEGORIES.map((c) => c.label)) === JSON.stringify(expectedLabels),
  QUANTITY_CATEGORIES.map((c) => c.label)
);
check("exactly 6 commitments", QUANTITY_COMMITMENTS.length === 6, QUANTITY_COMMITMENTS.length);
const expectedCommitments = [
  "Batch Production", "Repeat Orders", "Custom Components",
  "Consistent Fabrication", "Drawing-Based Manufacturing", "Production Quantities",
];
check(
  "commitment labels match the 6 required concepts exactly",
  JSON.stringify(QUANTITY_COMMITMENTS.map((c) => c.label)) === JSON.stringify(expectedCommitments),
  QUANTITY_COMMITMENTS.map((c) => c.label)
);

console.log("\n" + "=".repeat(70));
console.log("REGRESSION GUARD — no MOQ or quantity numbers, ever");
console.log("=".repeat(70));
for (const cat of QUANTITY_CATEGORIES) {
  const hasDigit = /\d/.test(cat.description);
  check(`"${cat.label}" description has zero digits`, !hasDigit, cat.description);
}
const moqPattern = /\b(minimum|MOQ|at least|starting from|starts at|guaranteed)\b/i;
for (const cat of QUANTITY_CATEGORIES) {
  const hasMoqLanguage = moqPattern.test(cat.description);
  check(`"${cat.label}" description has no MOQ-implying language`, !hasMoqLanguage, cat.description);
}

console.log("\n" + "=".repeat(70));
console.log("buildQuantityQuoteHref()");
console.log("=".repeat(70));
{
  const href = buildQuantityQuoteHref(QUANTITY_CATEGORIES[1]); // Small Batch
  check("href points to /quote", href.startsWith("/quote?"));
  check("carries the category id", href.includes("quantityCategory=small-batch"), href);
  check("carries the human-readable label", href.includes(decodeURIComponent("quantityLabel=Small%20Batch".replace(/\+/g, " "))) || href.includes("quantityLabel=Small%20Batch"), href);
}
{
  // Confirm every category produces a valid, distinct href — proves
  // "each should lead to Get a Quote" holds for all four, not just one.
  const hrefs = QUANTITY_CATEGORIES.map(buildQuantityQuoteHref);
  check("all 4 categories produce a /quote link", hrefs.every((h) => h.startsWith("/quote?")));
  check("all 4 hrefs are distinct from each other", new Set(hrefs).size === 4, hrefs);
}

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
