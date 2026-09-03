import { company } from "../config/company.config.js";

// Pure functions — reading time is computed from the real content, not
// hand-typed per post (which would drift the moment an article gets
// edited), and the related-posts logic is testable without a DOM.

const WORDS_PER_MINUTE = 200; // a commonly-used average adult silent-reading speed

/** Rounds up — "less than 3 minutes" reads as 3, never 2.4. */
export function calculateReadingTime(content) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/**
 * Simple related-posts heuristic: other published posts, most recent
 * first, excluding the current one. No tagging/category system exists
 * yet for blog posts, so "related" currently means "other recent
 * articles" rather than a topical match — honestly the best available
 * signal until posts have real categories.
 */
export function getRelatedPosts(currentPost, allPosts, limit = 3) {
  return allPosts
    .filter((p) => p.published && p.id !== currentPost.id)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
}

export function formatPublishedDate(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * schema.org BlogPosting JSON-LD for a single article — BlogPosting is
 * a subtype of Article, so this satisfies "Article schema" for blog
 * content specifically. `author` is an Organization, not a Person,
 * matching the real `author` field (always "Henil Enterprise", never
 * an invented individual). `publisher` includes a logo per Google's
 * structured-data guidance for Article/BlogPosting rich results, using
 * the same real logo asset referenced everywhere else (see
 * company.config.js) — no fabricated image. `dateModified` falls back
 * to `datePublished` since this content doesn't track a separate edit
 * timestamp yet.
 */
export function buildBlogPostingStructuredData(post) {
  const origin = company.website ? company.website.replace(/\/$/, "") : typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: company.name,
      ...(origin && { logo: { "@type": "ImageObject", url: `${origin}${company.logoPath}` } }),
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}
