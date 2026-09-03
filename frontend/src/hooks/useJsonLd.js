import { useEffect } from "react";

/**
 * Injects a <script type="application/ld+json"> tag into document.head
 * on mount and removes it on unmount — this project has no head-manager
 * library installed (no react-helmet), so this is the minimal
 * dependency-free way to add structured data in a client-rendered SPA.
 *
 * Honest limitation worth knowing: this is a client-side Vite SPA with
 * no server-side rendering, so this script tag only exists after
 * JavaScript runs — a crawler that doesn't execute JS won't see it.
 * Full SEO benefit from structured data typically wants SSR or
 * prerendering, which is a pre-existing characteristic of this whole
 * project's architecture, not something introduced here.
 */
export function useJsonLd(data) {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
}
