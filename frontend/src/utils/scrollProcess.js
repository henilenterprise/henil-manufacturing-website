// Pure logic for the scroll-driven process visualization, kept separate
// from the IntersectionObserver wiring itself so it's testable without a
// real DOM/browser (see frontend/scripts/test-scroll-process.mjs).

/**
 * Given the current active index and total step count, returns the
 * per-step visual state: "upcoming" | "active" | "passed". A step is
 * "passed" once a later step has become active — this is what makes the
 * connecting line above it stay lit as the visitor continues scrolling
 * down, rather than only the single current step ever being highlighted.
 */
export function getStepState(stepIndex, activeIndex) {
  if (activeIndex < 0) return "upcoming";
  if (stepIndex < activeIndex) return "passed";
  if (stepIndex === activeIndex) return "active";
  return "upcoming";
}

/** Whether the connecting line segment above `stepIndex` should be lit. */
export function isConnectorFilled(stepIndex, activeIndex) {
  return stepIndex <= activeIndex && activeIndex >= 0 && stepIndex > 0;
}

/**
 * Reduces a batch of IntersectionObserver entries (each with an `index`
 * and `isIntersecting`) down to the single index that should become
 * active. Returns `null` if nothing in this batch is intersecting
 * (meaning the caller should leave the current active index unchanged).
 * When multiple entries intersect at once, the lowest index wins — the
 * step closest to the top of the trigger band reads as "current."
 */
export function resolveActiveIndex(entries) {
  const intersecting = entries.filter((e) => e.isIntersecting).map((e) => e.index);
  if (intersecting.length === 0) return null;
  return Math.min(...intersecting);
}
