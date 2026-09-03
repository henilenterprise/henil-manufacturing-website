// Verifies the Applications section's data integrity against the real,
// already-vetted capabilities.data.js and categories.data.js — not
// fixtures — plus an internal consistency check that's easy to get
// wrong by hand: a material-specific fabrication method (e.g.
// "acrylic-bending") should never appear on an application whose
// `materials` array doesn't actually include that material.
// Run with: node frontend/scripts/test-applications.mjs

import { APPLICATIONS } from "../src/data/applications.data.js";
import { CAPABILITIES_DETAIL } from "../src/data/capabilities.data.js";
import { CATEGORIES } from "../src/data/categories.data.js";
import { resolveFabricationMethods, resolveRelatedCategory, buildApplicationQuoteHref } from "../src/utils/applications.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

console.log("=".repeat(70));
console.log("Dataset shape");
console.log("=".repeat(70));
check("exactly 11 applications", APPLICATIONS.length === 11, APPLICATIONS.length);
const expectedLabels = [
  "Machine Guards", "Safety Covers", "Transparent Enclosures", "Inspection Windows",
  "Protective Shields", "Tanks", "Boxes", "Cabinets", "Industrial Components",
  "Laboratory Components", "Display Products",
];
check(
  "labels match the brief exactly, in order",
  JSON.stringify(APPLICATIONS.map((a) => a.label)) === JSON.stringify(expectedLabels),
  APPLICATIONS.map((a) => a.label)
);
check("every application has a non-empty description", APPLICATIONS.every((a) => a.description?.trim().length > 0));
check("every application lists at least one material", APPLICATIONS.every((a) => a.materials.length > 0));
check("every application lists at least one fabrication method", APPLICATIONS.every((a) => a.fabricationMethods.length > 0));

console.log("\n" + "=".repeat(70));
console.log("Cross-reference validity — every fabricationMethods id is REAL");
console.log("=".repeat(70));
{
  const realCapIds = new Set(CAPABILITIES_DETAIL.map((c) => c.id));
  const invalid = [];
  for (const app of APPLICATIONS) {
    for (const methodId of app.fabricationMethods) {
      if (!realCapIds.has(methodId)) invalid.push(`${app.id} -> ${methodId}`);
    }
  }
  check("every fabrication method id exists in the real capabilities dataset", invalid.length === 0, invalid);
}

console.log("\n" + "=".repeat(70));
console.log("Cross-reference validity — every relatedCategoryId is REAL (or explicitly null)");
console.log("=".repeat(70));
{
  const realCatIds = new Set(CATEGORIES.map((c) => c.id));
  const invalid = [];
  for (const app of APPLICATIONS) {
    if (app.relatedCategoryId !== null && !realCatIds.has(app.relatedCategoryId)) {
      invalid.push(`${app.id} -> ${app.relatedCategoryId}`);
    }
  }
  check("every non-null relatedCategoryId exists in the real categories dataset", invalid.length === 0, invalid);
  const nullCount = APPLICATIONS.filter((a) => a.relatedCategoryId === null).length;
  check("exactly 2 applications honestly have no related category yet (Protective Shields, Laboratory Components)", nullCount === 2, nullCount);
}

console.log("\n" + "=".repeat(70));
console.log("Internal consistency — material-specific methods match the application's own materials");
console.log("=".repeat(70));
{
  const mismatches = [];
  for (const app of APPLICATIONS) {
    for (const methodId of app.fabricationMethods) {
      if (methodId.startsWith("acrylic-") && !app.materials.includes("Acrylic")) {
        mismatches.push(`${app.id} lists "${methodId}" but materials doesn't include Acrylic`);
      }
      if (methodId.startsWith("polycarbonate-") && !app.materials.includes("Polycarbonate")) {
        mismatches.push(`${app.id} lists "${methodId}" but materials doesn't include Polycarbonate`);
      }
    }
  }
  check("no material-specific fabrication method contradicts its application's materials list", mismatches.length === 0, mismatches);
}

console.log("\n" + "=".repeat(70));
console.log("resolveFabricationMethods() / resolveRelatedCategory()");
console.log("=".repeat(70));
{
  const app = APPLICATIONS.find((a) => a.id === "machine-guards");
  const methods = resolveFabricationMethods(app.fabricationMethods, CAPABILITIES_DETAIL);
  check("resolves to real capability objects with real titles", methods.length === app.fabricationMethods.length && methods.every((m) => m.title));
}
{
  const app = APPLICATIONS.find((a) => a.id === "machine-guards");
  const category = resolveRelatedCategory(app.relatedCategoryId, CATEGORIES);
  check("resolves a real category with a real label", category?.label === "Machine Guards", category);
}
{
  const app = APPLICATIONS.find((a) => a.id === "protective-shields");
  const category = resolveRelatedCategory(app.relatedCategoryId, CATEGORIES);
  check("resolving a null relatedCategoryId returns null, not a crash", category === null);
}

console.log("\n" + "=".repeat(70));
console.log("buildApplicationQuoteHref()");
console.log("=".repeat(70));
{
  const hrefs = APPLICATIONS.map(buildApplicationQuoteHref);
  check("all 11 applications produce a /quote link", hrefs.every((h) => h.startsWith("/quote?")));
  check("all 11 hrefs are distinct", new Set(hrefs).size === 11, hrefs.length);
}

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
