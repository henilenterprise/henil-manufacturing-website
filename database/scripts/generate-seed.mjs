// Generates database/seed/001_content_seed.sql directly from the real
// frontend data files — not hand-transcribed — so the seed data can
// never drift from what the site actually shows. Re-run this any time
// the frontend data files change:
//
//   node database/scripts/generate-seed.mjs
//
import { CATEGORIES } from "../../frontend/src/data/categories.data.js";
import { CAPABILITIES_DETAIL } from "../../frontend/src/data/capabilities.data.js";
import { INDUSTRIES_DETAIL } from "../../frontend/src/data/industries.data.js";
import { PRODUCTS } from "../../frontend/src/data/products.data.js";
import { BLOG_POSTS } from "../../frontend/src/data/blogPosts.data.js";
import fs from "node:fs";

function sqlString(value) {
  if (value === null || value === undefined) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlArray(values) {
  if (!values || values.length === 0) return "'{}'";
  return `ARRAY[${values.map(sqlString).join(", ")}]`;
}

const lines = [];
lines.push("-- ============================================================");
lines.push("-- Content seed data");
lines.push("-- GENERATED FILE — do not hand-edit. Regenerate with:");
lines.push("--   node database/scripts/generate-seed.mjs");
lines.push("-- Source of truth is the frontend data files, not this file.");
lines.push("-- ============================================================");
lines.push("");

// ---- product_categories ----
lines.push("-- product_categories");
CATEGORIES.forEach((c, i) => {
  lines.push(
    `insert into product_categories (slug, label, icon, sort_order) values (${sqlString(c.id)}, ${sqlString(c.label)}, ${sqlString(c.icon)}, ${i});`
  );
});
lines.push("");

// ---- capabilities ----
lines.push("-- capabilities");
CAPABILITIES_DETAIL.forEach((c, i) => {
  lines.push(
    `insert into capabilities (slug, label, icon, animation_type, description, applications, materials, use_cases, sort_order) values (` +
      `${sqlString(c.id)}, ${sqlString(c.title)}, ${sqlString(c.icon)}, ${sqlString(c.animation)}, ${sqlString(c.description)}, ` +
      `${sqlArray(c.applications)}, ${sqlArray(c.materials)}, ${sqlArray(c.useCases)}, ${i});`
  );
});
lines.push("");

// ---- industries ----
lines.push("-- industries");
INDUSTRIES_DETAIL.forEach((ind, i) => {
  lines.push(
    `insert into industries (slug, label, icon, description, common_requirements, applications, sort_order) values (` +
      `${sqlString(ind.id)}, ${sqlString(ind.label)}, ${sqlString(ind.icon)}, ${sqlString(ind.description)}, ` +
      `${sqlArray(ind.commonRequirements)}, ${sqlArray(ind.applications)}, ${i});`
  );
});
lines.push("");

// ---- industry_categories / industry_capabilities (join tables, via slug subqueries) ----
lines.push("-- industry_categories");
INDUSTRIES_DETAIL.forEach((ind) => {
  ind.categories.forEach((catSlug) => {
    lines.push(
      `insert into industry_categories (industry_id, category_id) values (` +
        `(select id from industries where slug = ${sqlString(ind.id)}), ` +
        `(select id from product_categories where slug = ${sqlString(catSlug)}));`
    );
  });
});
lines.push("");

lines.push("-- industry_capabilities");
INDUSTRIES_DETAIL.forEach((ind) => {
  ind.capabilities.forEach((capSlug) => {
    lines.push(
      `insert into industry_capabilities (industry_id, capability_id) values (` +
        `(select id from industries where slug = ${sqlString(ind.id)}), ` +
        `(select id from capabilities where slug = ${sqlString(capSlug)}));`
    );
  });
});
lines.push("");

// ---- products (category_id via slug subquery) ----
lines.push("-- products");
PRODUCTS.forEach((p) => {
  lines.push(
    `insert into products (slug, name, category_id, short_description, applications, materials, featured) values (` +
      `${sqlString(p.id)}, ${sqlString(p.name)}, ` +
      `(select id from product_categories where slug = ${sqlString(p.categoryId)}), ` +
      `${sqlString(p.shortDescription)}, ${sqlArray(p.applications)}, ${sqlArray(p.materials)}, ${p.featured});`
  );
});
lines.push("");

// ---- blog_posts (camelCase frontend fields -> snake_case DB columns) ----
lines.push("-- blog_posts");
BLOG_POSTS.forEach((post) => {
  lines.push(
    `insert into blog_posts (slug, title, excerpt, content, author, published, published_at) values (` +
      `${sqlString(post.slug)}, ${sqlString(post.title)}, ${sqlString(post.excerpt)}, ` +
      `${sqlString(post.content)}, ${sqlString(post.author)}, ${post.published}, ` +
      `${post.published ? sqlString(post.publishedAt) : "null"});`
  );
});
lines.push("");

fs.mkdirSync("database/seed", { recursive: true });
fs.writeFileSync("database/seed/001_content_seed.sql", lines.join("\n") + "\n");

console.log(`Generated database/seed/001_content_seed.sql`);
console.log(`  ${CATEGORIES.length} categories`);
console.log(`  ${CAPABILITIES_DETAIL.length} capabilities`);
console.log(`  ${INDUSTRIES_DETAIL.length} industries`);
console.log(`  ${PRODUCTS.length} products`);
console.log(`  ${BLOG_POSTS.length} blog posts`);
