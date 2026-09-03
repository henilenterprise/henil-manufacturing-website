// Verifies the real brochure-availability decision logic
// (frontend/src/utils/brochure.js) against fake Response-like objects —
// no real network/server needed, since the function only inspects a
// Response shape, it doesn't fetch anything itself.
//
// Run with: node frontend/scripts/test-brochure.mjs

import { isPdfResponseValid } from "../src/utils/brochure.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

function fakeResponse(ok, contentType) {
  return { ok, headers: { get: (name) => (name.toLowerCase() === "content-type" ? contentType : null) } };
}

console.log("=".repeat(70));
console.log("Real brochure present — should be valid");
console.log("=".repeat(70));
check("200 + application/pdf is valid", isPdfResponseValid(fakeResponse(true, "application/pdf")) === true);
check("200 + application/octet-stream is valid (some servers serve PDFs this way)", isPdfResponseValid(fakeResponse(true, "application/octet-stream")) === true);

console.log("\n" + "=".repeat(70));
console.log("Brochure missing — should be invalid, not falsely 'available'");
console.log("=".repeat(70));
check("404 is invalid", isPdfResponseValid(fakeResponse(false, "application/pdf")) === false);
check(
  "200 + text/html is invalid — this is the real case that matters: a static host's SPA " +
  "fallback can return 200 OK with an HTML page for a path that doesn't actually exist as " +
  "a file, which would make an absent brochure look 'available' if only HTTP status were checked",
  isPdfResponseValid(fakeResponse(true, "text/html")) === false
);
check("200 with no content-type header at all is invalid", isPdfResponseValid(fakeResponse(true, null)) === false);

console.log("\n" + "=".repeat(70));
console.log("Malformed input — should degrade safely, never throw");
console.log("=".repeat(70));
check("null response is invalid, doesn't throw", isPdfResponseValid(null) === false);
check("undefined response is invalid, doesn't throw", isPdfResponseValid(undefined) === false);
check("response with no headers object is invalid, doesn't throw", isPdfResponseValid({ ok: true }) === false);

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
