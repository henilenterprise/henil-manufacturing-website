import { useEffect } from "react";

/**
 * Sets <meta name="robots">. Only used on pages that shouldn't be indexed
 * (internal tooling like /design-system, or the 404 catch-all) — every
 * real content page should be indexable, so this hook is the exception,
 * not something every page calls.
 */
export function useRobotsMeta(content) {
  useEffect(() => {
    if (!content) return;
    let meta = document.querySelector('meta[name="robots"]');
    const existed = Boolean(meta);
    const previousContent = meta?.getAttribute("content");

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);

    return () => {
      if (existed) {
        meta.setAttribute("content", previousContent || "");
      } else {
        document.head.removeChild(meta);
      }
    };
  }, [content]);
}
