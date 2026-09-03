// Verifies the material-selector cross-reference logic against REAL
// data from capabilities.data.js and products.data.js — not mocked
// data — since the whole point of this logic is to stay consistent
// with what those pages already show.
// Run with: node frontend/scripts/test-material-selector.mjs

import { getFabricationOptionsForMaterial, getCommonProductsForMaterial } from "../src/utils/materialSelector.js";
import { CAPABILITIES_DETAIL } from "../src/data/capabilities.data.js";
import { PRODUCTS } from "../src/data/products.data.js";
import { MATERIALS, getMaterialById } from "../src/data/materials.data.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

console.log("=".repeat(70));
console.log("Materials dataset");
console.log("=".repeat(70));
check("exactly 2 materials", MATERIALS.length === 2, MATERIALS.length);
check("Acrylic present", Boolean(getMaterialById("acrylic")));
check("Polycarbonate present", Boolean(getMaterialById("polycarbonate")));
check("unknown id returns undefined, not a crash", getMaterialById("titanium") === undefined);

console.log("\n" + "=".repeat(70));
console.log("getFabricationOptionsForMaterial() — cross-checked against real capabilities.data.js");
console.log("=".repeat(70));
{
  const acrylicOptions = getFabricationOptionsForMaterial("Acrylic", CAPABILITIES_DETAIL);
  const acrylicIds = acrylicOptions.map((c) => c.id).sort();
  const expectedAcrylic = ["acrylic-cutting", "bonding", "cnc-routing", "custom-fabrication", "laser-cutting", "acrylic-bending"].sort();
  check("Acrylic fabrication options match what capabilities.data.js actually lists for Acrylic", JSON.stringify(acrylicIds) === JSON.stringify(expectedAcrylic), acrylicIds);
  check("polycarbonate-only capabilities correctly excluded from Acrylic", !acrylicIds.includes("polycarbonate-cutting") && !acrylicIds.includes("polycarbonate-bending"));
}
{
  const polyOptions = getFabricationOptionsForMaterial("Polycarbonate", CAPABILITIES_DETAIL);
  const polyIds = polyOptions.map((c) => c.id).sort();
  const expectedPoly = ["polycarbonate-cutting", "polycarbonate-bending", "bonding", "cnc-routing", "custom-fabrication", "laser-cutting"].sort();
  check("Polycarbonate fabrication options match what capabilities.data.js actually lists for Polycarbonate", JSON.stringify(polyIds) === JSON.stringify(expectedPoly), polyIds);
  check("acrylic-only capabilities correctly excluded from Polycarbonate", !polyIds.includes("acrylic-cutting") && !polyIds.includes("acrylic-bending"));
}
{
  const unknownMaterialOptions = getFabricationOptionsForMaterial("Titanium", CAPABILITIES_DETAIL);
  check("an unrecognized material returns zero options, not a crash", unknownMaterialOptions.length === 0);
}

console.log("\n" + "=".repeat(70));
console.log("getCommonProductsForMaterial() — cross-checked against real products.data.js");
console.log("=".repeat(70));
{
  const acrylicProducts = getCommonProductsForMaterial("Acrylic", PRODUCTS, 4);
  check("returns up to the limit", acrylicProducts.length === 4, acrylicProducts.length);
  check("every returned product actually lists Acrylic as a material", acrylicProducts.every((p) => p.materials.includes("Acrylic")));
  check("featured products are prioritized first", acrylicProducts[0].featured === true, acrylicProducts.map(p=>p.featured));
}
{
  const polyProducts = getCommonProductsForMaterial("Polycarbonate", PRODUCTS, 4);
  check("returns up to the limit", polyProducts.length === 4, polyProducts.length);
  check("every returned product actually lists Polycarbonate as a material", polyProducts.every((p) => p.materials.includes("Polycarbonate")));
}
{
  const smallLimit = getCommonProductsForMaterial("Acrylic", PRODUCTS, 2);
  check("limit is genuinely respected, not just a default", smallLimit.length === 2);
}

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
