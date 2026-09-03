import { useEffect } from "react";
import { useDocumentTitle } from "./useDocumentTitle.js";
import { useMetaDescription } from "./useMetaDescription.js";
import { useCanonical } from "./useCanonical.js";
import { useRobotsMeta } from "./useRobotsMeta.js";
import { siteConfig } from "../config/site.config.js";

/**
 * One call per page for the standard SEO trio (title, meta description,
 * canonical) plus the Open Graph tags that make links look right when
 * shared. Built on the existing per-field hooks rather than replacing
 * them — Blog/BlogPost/Faq already used useDocumentTitle/useMetaDescription
 * directly before this existed, and can keep doing so; this is just the
 * convenience wrapper for every other page.
 *
 * @param {object} params
 * @param {string} params.title       - Full <title>, e.g. "Acrylic Manufacturer in Ahmedabad — Henil Enterprise"
 * @param {string} params.description - Meta description, ~150-160 chars
 * @param {string} params.path        - Absolute path for canonical + og:url, e.g. "/capabilities"
 * @param {string} [params.noindex]   - Pass true only for internal/non-content pages (design system, 404)
 */
export function useSeo({ title, description, path, noindex = false }) {
  useDocumentTitle(title);
  useMetaDescription(description);
  useCanonical(path);
  useRobotsMeta(noindex ? "noindex, nofollow" : undefined);

  useEffect(() => {
    if (!title || !description || typeof window === "undefined") return;

    const url = path ? `${window.location.origin}${path}` : window.location.href;
    const tags = [
      ["property", "og:type", "website"],
      ["property", "og:site_name", siteConfig.companyName],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["name", "twitter:card", "summary"],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
    ];

    const created = [];
    const restored = [];

    for (const [attr, key, content] of tags) {
      let meta = document.querySelector(`meta[${attr}="${key}"]`);
      if (meta) {
        restored.push([meta, meta.getAttribute("content")]);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
        created.push(meta);
      }
      meta.setAttribute("content", content);
    }

    return () => {
      created.forEach((meta) => document.head.removeChild(meta));
      restored.forEach(([meta, previousContent]) => meta.setAttribute("content", previousContent || ""));
    };
  }, [title, description, path]);
}
