import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

/**
 * Loads Google Analytics 4 (gtag.js) only when VITE_GA_MEASUREMENT_ID is
 * set — no ID is ever hardcoded here or anywhere else in this project.
 * See SEO-SETUP.md for how to get a Measurement ID and set the env var.
 *
 * If the env var is blank (the default — nothing is configured out of
 * the box), this hook does nothing at all: no script tag, no network
 * request, no tracking. That's deliberate — analytics should be opt-in
 * by the person who owns the real GA property, not on by default with
 * a placeholder ID.
 *
 * This is a Vite SPA with client-side routing, so a plain gtag.js drop-in
 * would only ever record one pageview (the initial load) — every
 * `react-router` navigation after that happens without a full page
 * reload, and GA never sees it. Sending an explicit `page_view` event
 * on every route change (below) is what makes /products, /about, etc.
 * show up as separate pageviews in GA, not just "/".
 */
export function useAnalytics() {
  const location = useLocation();
  const loaded = useRef(false);

  // Load gtag.js once, on first mount, only if configured.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || loaded.current || typeof window === "undefined") return;
    loaded.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    // send_page_view: false — the effect below sends an explicit
    // page_view per route change instead, so the initial load isn't
    // double-counted alongside the first route-change event.
    gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  }, []);

  // Fire a page_view on every route change (including the first one).
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);
}
