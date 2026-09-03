// Verifies the pure scroll-process state logic — no DOM, no
// IntersectionObserver, no browser needed, since these are plain
// functions operating on plain data.
// Run with: node frontend/scripts/test-scroll-process.mjs

import { getStepState, isConnectorFilled, resolveActiveIndex } from "../src/utils/scrollProcess.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

console.log("=".repeat(70));
console.log("getStepState() — the visual state each step should render as");
console.log("=".repeat(70));
check("before anything has activated, every step is 'upcoming'", getStepState(3, -1) === "upcoming");
check("a step before the active one is 'passed'", getStepState(1, 3) === "passed");
check("the active step itself is 'active'", getStepState(3, 3) === "active");
check("a step after the active one is 'upcoming'", getStepState(5, 3) === "upcoming");
check("step 0 when it's the active one is 'active', not 'passed'", getStepState(0, 0) === "active");

console.log("\n" + "=".repeat(70));
console.log("isConnectorFilled() — the line segment ABOVE each step");
console.log("=".repeat(70));
check("connector above step 0 never fills (nothing above the first step)", isConnectorFilled(0, 5) === false);
check("connector above a passed step is filled", isConnectorFilled(2, 4) === true);
check("connector above the currently active step is filled (it's the run-in to 'here')", isConnectorFilled(3, 3) === true);
check("connector above an upcoming step is NOT filled", isConnectorFilled(5, 3) === false);
check("nothing is filled before any step has activated", isConnectorFilled(2, -1) === false);

console.log("\n" + "=".repeat(70));
console.log("resolveActiveIndex() — reducing a batch of IntersectionObserver entries");
console.log("=".repeat(70));
check(
  "single intersecting entry becomes active",
  resolveActiveIndex([{ index: 2, isIntersecting: true }]) === 2
);
check(
  "nothing intersecting returns null (caller keeps previous state)",
  resolveActiveIndex([{ index: 2, isIntersecting: false }]) === null
);
check(
  "multiple intersecting at once — lowest index wins",
  resolveActiveIndex([
    { index: 4, isIntersecting: true },
    { index: 3, isIntersecting: true },
    { index: 5, isIntersecting: false },
  ]) === 3
);
check("empty entries array returns null, doesn't throw", resolveActiveIndex([]) === null);

console.log("\n" + "=".repeat(70));
console.log("Full walkthrough — scrolling through all 7 steps in order");
console.log("=".repeat(70));
{
  const labels = ["Design", "Material", "Cutting", "Bending", "Bonding", "Inspection", "Dispatch"];
  let allCorrect = true;
  for (let active = 0; active < labels.length; active++) {
    const states = labels.map((_, i) => getStepState(i, active));
    const expectedActiveCount = states.filter((s) => s === "active").length;
    const expectedPassedCount = states.filter((s) => s === "passed").length;
    if (expectedActiveCount !== 1 || expectedPassedCount !== active) {
      allCorrect = false;
      console.log(`  Mismatch at active=${active}:`, states);
    }
  }
  check("at every scroll position, exactly one step is 'active' and the right count is 'passed'", allCorrect);
}

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
