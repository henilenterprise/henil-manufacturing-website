import { useEffect } from "react";

/**
 * Sets <link rel="canonical">, restoring whatever was there before on
 * unmount. Same pattern as useMetaDescription — this is a client-rendered
 * SPA with no head-manager library, so each page hook manages its own
 * cleanup rather than leaving a stale canonical pointing at the previous
 * route after navigation.
 *
 * `path` should be an absolute path (e.g. "/products/acrylic-machine-panel"),
 * not a full URL — the origin is resolved at runtime so this works
 * correctly regardless of which domain the site is actually deployed on.
 */
export function useCanonical(path) {
  useEffect(() => {
    if (!path || typeof window === "undefined") return;

    const href = `${window.location.origin}${path}`;
    let link = document.querySelector('link[rel="canonical"]');
    const existed = Boolean(link);
    const previousHref = link?.getAttribute("href");

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);

    return () => {
      if (existed) {
        link.setAttribute("href", previousHref || "");
      } else {
        document.head.removeChild(link);
      }
    };
  }, [path]);
}
