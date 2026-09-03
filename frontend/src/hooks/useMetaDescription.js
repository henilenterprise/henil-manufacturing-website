import { useEffect } from "react";

/**
 * Sets <meta name="description">, restoring the site-wide default (from
 * index.html) on unmount rather than leaving a stale per-article
 * description active after navigating to a different page.
 */
export function useMetaDescription(description) {
  useEffect(() => {
    if (!description) return;
    let meta = document.querySelector('meta[name="description"]');
    const existed = Boolean(meta);
    const previousContent = meta?.getAttribute("content");

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    return () => {
      if (existed) {
        meta.setAttribute("content", previousContent || "");
      } else {
        document.head.removeChild(meta);
      }
    };
  }, [description]);
}
