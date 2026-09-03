// Verifies the B2B Trust section's data — most importantly, that the
// testimonial placeholder rules are actually enforced, not just applied
// once by hand and left unguarded against a future edit.
// Run with: node frontend/scripts/test-trust-section.mjs

import { COMMITMENTS } from "../src/data/commitments.data.js";
import { TESTIMONIALS } from "../src/data/testimonials.data.js";
import { INDUSTRIES_DETAIL } from "../src/data/industries.data.js";
import fs from "node:fs";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

console.log("=".repeat(70));
console.log("REGRESSION GUARD — testimonials never contain an invented identity");
console.log("=".repeat(70));
check("exactly 5 placeholder testimonials", TESTIMONIALS.length === 5, TESTIMONIALS.length);
check("every testimonial is explicitly flagged isPlaceholder: true", TESTIMONIALS.every((t) => t.isPlaceholder === true));

const companySuffixPattern = /\b[A-Z][a-zA-Z]*\s+(Ltd\.?|Pvt\.?|Inc\.?|Corp\.?|LLC)\b/;
for (const t of TESTIMONIALS) {
  check(`"${t.role}" — quote has no company-name-style suffix (Ltd/Pvt/Inc/Corp)`, !companySuffixPattern.test(t.quote));
  check(`"${t.role}" — companyType has no company-name-style suffix`, !companySuffixPattern.test(t.companyType));
}

// Heuristic for a personal name slipping into `role`: two consecutive
// capitalized words where neither is a common job-title word. Real job
// titles in this dataset are always Title Case but never look like
// "Rakesh Patel" — this catches that shape without needing a name list.
const nameLikePattern = /^[A-Z][a-z]+\s+[A-Z][a-z]+$/;
const knownRoleWords = new Set(["Procurement", "Manager", "Operations", "Head", "Design", "Engineer", "Plant", "Supply", "Chain", "Lead"]);
for (const t of TESTIMONIALS) {
  const words = t.role.split(" ");
  const looksLikeARole = words.every((w) => knownRoleWords.has(w)) || words.length <= 2 && /^(Manager|Head|Engineer|Lead|Director)$/.test(words[words.length - 1]);
  check(`"${t.role}" reads as a job title, not a personal name`, looksLikeARole, t.role);
}

for (const t of TESTIMONIALS) {
  const digitsInQuote = /\d/.test(t.quote);
  check(`"${t.role}" quote has no numbers (unverifiable specific claims)`, !digitsInQuote, t.quote);
}

console.log("\n" + "=".repeat(70));
console.log("Cross-reference resolution — proving these don't silently resolve to undefined");
console.log("=".repeat(70));
{
  const qualityCommitment = COMMITMENTS.find((c) => c.id === "consistency");
  check("Quality Commitment resolves to a real COMMITMENTS entry", Boolean(qualityCommitment?.title), qualityCommitment);
}
{
  const configSrc = fs.readFileSync(new URL("../src/config/site.config.js", import.meta.url), "utf-8");
  const whyHenilBlock = configSrc.split("export const WHY_HENIL = [")[1].split("];")[0];
  const whyHenilIds = [...whyHenilBlock.matchAll(/id: "([\w-]+)"/g)].map((m) => m[1]);
  check("Repeat-Order Capability's id ('quantity-orders') exists in WHY_HENIL", whyHenilIds.includes("quantity-orders"));
  check("Custom Manufacturing's id ('custom-fabrication') exists in WHY_HENIL", whyHenilIds.includes("custom-fabrication"));
}
{
  const preview = INDUSTRIES_DETAIL.slice(0, 5);
  check("Industries Served preview resolves 5 real industries", preview.length === 5 && preview.every((i) => i.label));
}

console.log("\n" + "=".repeat(70));
console.log("Shared commitments data (used by both /about and this section)");
console.log("=".repeat(70));
check("exactly 3 commitments", COMMITMENTS.length === 3, COMMITMENTS.length);
check("every commitment has an id, icon, title, and description", COMMITMENTS.every((c) => c.id && c.icon && c.title && c.description));

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
