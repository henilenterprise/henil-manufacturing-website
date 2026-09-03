// Verifies the FAQ dataset and the structured-data builder against the
// real data — including a permanent regression guard on the
// no-fabricated-specs rule, and proof that the JSON-LD output actually
// matches the visible content exactly (a real Google structured-data
// requirement, not just good practice).
// Run with: node frontend/scripts/test-faq.mjs

import { FAQ_ITEMS } from "../src/data/faq.data.js";
import { buildFaqStructuredData } from "../src/utils/faq.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

console.log("=".repeat(70));
console.log("Dataset shape — all 15 required questions present, in order");
console.log("=".repeat(70));
check("exactly 15 FAQ items", FAQ_ITEMS.length === 15, FAQ_ITEMS.length);

const expectedQuestions = [
  "Can you manufacture according to drawings?",
  "Can you handle quantity orders?",
  "What materials do you fabricate?",
  "What thicknesses are available?",
  "Can you make custom dimensions?",
  "Do you provide prototypes?",
  "Can you fabricate acrylic machine guards?",
  "Can you work with polycarbonate?",
  "Do you provide CNC cutting?",
  "Do you provide laser cutting?",
  "Can you bend acrylic?",
  "Can you bond acrylic?",
  "Do you deliver outside Ahmedabad?",
  "How can I request a quotation?",
  "Do you accept repeat production orders?",
];
check(
  "every required question is present, in the exact order given",
  JSON.stringify(FAQ_ITEMS.map((f) => f.question)) === JSON.stringify(expectedQuestions),
  FAQ_ITEMS.map((f) => f.question)
);
check("every item has a unique id", new Set(FAQ_ITEMS.map((f) => f.id)).size === FAQ_ITEMS.length);
check("every item has a non-empty answer", FAQ_ITEMS.every((f) => f.answer?.trim().length > 0));

console.log("\n" + "=".repeat(70));
console.log("REGRESSION GUARD — no fabricated specifications, ever");
console.log("=".repeat(70));
const specPattern = /\b\d+(\.\d+)?\s*(mm|cm|kg|kw|watt|w\b|micron|hp|rpm|psi|days?|hours?|weeks?)\b|±\s*\d/i;
for (const item of FAQ_ITEMS) {
  check(`"${item.question}" — answer has no fabricated spec numbers`, !specPattern.test(item.answer), item.answer);
}
check(
  "the thickness answer explicitly defers to the quote process rather than stating a range",
  FAQ_ITEMS.find((f) => f.id === "thicknesses").answer.toLowerCase().includes("share your requirement"),
);
check(
  "the delivery answer explicitly defers rather than claiming a specific coverage area",
  FAQ_ITEMS.find((f) => f.id === "delivery-outside-ahmedabad").answer.toLowerCase().includes("confirm"),
);

console.log("\n" + "=".repeat(70));
console.log("buildFaqStructuredData() — real Google structured-data shape");
console.log("=".repeat(70));
{
  const jsonLd = buildFaqStructuredData(FAQ_ITEMS);
  check("@context is schema.org", jsonLd["@context"] === "https://schema.org");
  check("@type is FAQPage", jsonLd["@type"] === "FAQPage");
  check("mainEntity has exactly 15 entries, matching the visible FAQ count", jsonLd.mainEntity.length === 15);
  check(
    "every mainEntity item is a well-formed Question/Answer pair",
    jsonLd.mainEntity.every((q) => q["@type"] === "Question" && typeof q.name === "string" && q.acceptedAnswer?.["@type"] === "Answer" && typeof q.acceptedAnswer.text === "string")
  );
  check(
    "structured data question text EXACTLY matches the visible FAQ question text (Google requires this)",
    jsonLd.mainEntity.every((q, i) => q.name === FAQ_ITEMS[i].question)
  );
  check(
    "structured data answer text EXACTLY matches the visible FAQ answer text",
    jsonLd.mainEntity.every((q, i) => q.acceptedAnswer.text === FAQ_ITEMS[i].answer)
  );
  check("output is valid JSON (round-trips through JSON.stringify/parse)", JSON.parse(JSON.stringify(jsonLd)).mainEntity.length === 15);
}

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
