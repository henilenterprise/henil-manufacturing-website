// Verifies the blog data, the pure utilities, and the Supabase-ready
// service layer — including that reading time is genuinely computed
// from content length, not a hand-typed number that could drift.
// Run with: node frontend/scripts/test-blog.mjs

import { BLOG_POSTS } from "../src/data/blogPosts.data.js";
import { calculateReadingTime, getRelatedPosts, formatPublishedDate, buildBlogPostingStructuredData } from "../src/utils/blog.js";
import { getPublishedBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "../src/services/blogService.js";

let passed = 0;
let failed = 0;
function check(label, condition, detail = "") {
  if (condition) { passed++; console.log(`  PASS  ${label}`); }
  else { failed++; console.log(`  FAIL  ${label}  ${detail}`); }
}

console.log("=".repeat(70));
console.log("Dataset shape — all 10 potential topics present");
console.log("=".repeat(70));
check("exactly 10 blog posts", BLOG_POSTS.length === 10, BLOG_POSTS.length);
check("every post has a unique slug", new Set(BLOG_POSTS.map((p) => p.slug)).size === 10);
check("every post is authored by the company, never a personal name", BLOG_POSTS.every((p) => p.author === "Henil Enterprise"));
check("every post has non-empty content", BLOG_POSTS.every((p) => p.content?.trim().length > 100));
check("every published post has a publishedAt date (matches the DB CHECK constraint)", BLOG_POSTS.every((p) => !p.published || Boolean(p.publishedAt)));

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
check("every slug matches the real DB constraint format", BLOG_POSTS.every((p) => slugPattern.test(p.slug)));

console.log("\n" + "=".repeat(70));
console.log("calculateReadingTime() — genuinely computed, not hand-typed");
console.log("=".repeat(70));
check("a 400-word article rounds up to 2 minutes", calculateReadingTime(Array(400).fill("word").join(" ")) === 2);
check("a 200-word article is exactly 1 minute", calculateReadingTime(Array(200).fill("word").join(" ")) === 1);
check("a 201-word article rounds up to 2 minutes, not down to 1", calculateReadingTime(Array(201).fill("word").join(" ")) === 2);
check("empty content still returns at least 1 minute, never 0", calculateReadingTime("") === 1);
{
  const allReasonable = BLOG_POSTS.every((p) => {
    const t = calculateReadingTime(p.content);
    return t >= 1 && t <= 15; // sanity bound, not a fabricated exact value
  });
  check("every real post's computed reading time is in a sane range", allReasonable);
}

console.log("\n" + "=".repeat(70));
console.log("getRelatedPosts()");
console.log("=".repeat(70));
{
  const current = BLOG_POSTS[0];
  const related = getRelatedPosts(current, BLOG_POSTS, 3);
  check("returns the requested limit", related.length === 3);
  check("never includes the current post itself", !related.some((p) => p.id === current.id));
  check("only includes published posts", related.every((p) => p.published));
}

console.log("\n" + "=".repeat(70));
console.log("formatPublishedDate()");
console.log("=".repeat(70));
{
  const formatted = formatPublishedDate("2026-01-08");
  check("produces a real, readable date string", formatted.includes("2026") && formatted.length > 6, formatted);
}

console.log("\n" + "=".repeat(70));
console.log("buildBlogPostingStructuredData()");
console.log("=".repeat(70));
{
  const post = BLOG_POSTS[0];
  const jsonLd = buildBlogPostingStructuredData(post);
  check("@type is BlogPosting", jsonLd["@type"] === "BlogPosting");
  check("headline matches the real post title exactly", jsonLd.headline === post.title);
  check("description matches the real excerpt exactly", jsonLd.description === post.excerpt);
  check("author is an Organization, not a Person (never an invented individual)", jsonLd.author["@type"] === "Organization" && jsonLd.author.name === "Henil Enterprise");
  check("datePublished matches the real publishedAt", jsonLd.datePublished === post.publishedAt);
  check("output is valid JSON", JSON.parse(JSON.stringify(jsonLd)).headline === post.title);
}

console.log("\n" + "=".repeat(70));
console.log("blogService — the Supabase-ready read layer");
console.log("=".repeat(70));
{
  const posts = await getPublishedBlogPosts();
  check("returns all 10 published posts", posts.length === 10);
  const sorted = posts.every((p, i) => i === 0 || new Date(posts[i - 1].publishedAt) >= new Date(p.publishedAt));
  check("returned newest-first", sorted);
}
{
  const post = await getBlogPostBySlug("acrylic-vs-polycarbonate");
  check("finds a real post by slug", post?.title.includes("Acrylic vs Polycarbonate"), post?.title);
}
{
  const missing = await getBlogPostBySlug("this-slug-does-not-exist");
  check("returns null for an unknown slug rather than throwing", missing === null);
}
{
  const current = await getBlogPostBySlug("laser-cutting");
  const related = await getRelatedBlogPosts(current, 3);
  check("service-layer related posts also excludes the current post", !related.some((p) => p.id === current.id));
  check("service-layer related posts respects the limit", related.length === 3);
}

console.log("\n" + "=".repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(70));
if (failed > 0) process.exitCode = 1;
