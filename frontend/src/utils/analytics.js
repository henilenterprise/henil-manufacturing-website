// Reuses the exact gtag() instance useAnalytics.js already sets up on
// window — this file doesn't load or configure GA4 itself, it just
// gives every CTA a single, consistent way to send an event to it.
//
// If VITE_GA_MEASUREMENT_ID isn't set, useAnalytics.js never defines
// window.gtag, so this becomes a silent no-op — same "opt-in only,
// never on by default" behavior useAnalytics.js already documents.
//
// Event names and params follow GA4 conventions (snake_case), and
// page_path is read fresh from window.location at call time rather
// than threaded in as a prop, since these fire from CTAs scattered
// across many components (nav, footer, hero, sticky panel, contact
// page) that shouldn't each need route-awareness just to report where
// a click happened.
export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    page_path: window.location.pathname,
    ...params,
  });
}
