import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";

import ProductDetail from "./pages/ProductDetail.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";

import { PRODUCTS } from "./data/products.data.js";
import { buildProductSeo } from "./config/seo.config.js";
import { getCategoryById } from "./data/categories.data.js";
import { BLOG_POSTS } from "./data/blogPosts.data.js";
import { buildBlogPostSeo } from "./config/seo.config.js";
import { buildBlogPostingStructuredData } from "./utils/blog.js";

const SITE_URL = "https://www.henilacrylics.com";

function normalizePath(url) {
  if (!url) return "/";

  try {
    return new URL(url, SITE_URL).pathname;
  } catch {
    return String(url).split("?")[0] || "/";
  }
}

function buildMetaHead({ title, description, canonical, structuredData = null }) {
  const elements = new Set([
    {
      type: "meta",
      props: {
        name: "description",
        content: description,
      },
    },
    {
      type: "link",
      props: {
        rel: "canonical",
        href: canonical,
      },
    },
    {
      type: "meta",
      props: {
        property: "og:title",
        content: title,
      },
    },
    {
      type: "meta",
      props: {
        property: "og:description",
        content: description,
      },
    },
    {
      type: "meta",
      props: {
        property: "og:type",
        content: "website",
      },
    },
    {
      type: "meta",
      props: {
        property: "og:url",
        content: canonical,
      },
    },
    {
      type: "meta",
      props: {
        name: "twitter:card",
        content: "summary_large_image",
      },
    },
    {
      type: "meta",
      props: {
        name: "twitter:title",
        content: title,
      },
    },
    {
      type: "meta",
      props: {
        name: "twitter:description",
        content: description,
      },
    },
  ]);

  if (structuredData) {
    elements.add({
      type: "script",
      props: { type: "application/ld+json" },
      children: JSON.stringify(structuredData),
    });
  }

  return {
    lang: "en",
    title,
    elements,
  };
}

function buildProductHead(product) {
  const category = getCategoryById(product.categoryId);
  const seo = buildProductSeo(product, category);
  return buildMetaHead({
    title: seo.title,
    description: seo.description,
    canonical: `${SITE_URL}${seo.path}`,
  });
}

function buildBlogHead() {
  return buildMetaHead({
    title: "Blog | Acrylic & Polycarbonate Fabrication Insights — Henil Enterprise",
    description:
      "Notes on acrylic and polycarbonate fabrication — materials, processes, and applications — from Henil Enterprise, an Ahmedabad-based manufacturer and fabricator.",
    canonical: `${SITE_URL}/blog`,
  });
}

function buildBlogPostHead(post) {
  const seo = buildBlogPostSeo(post);
  return buildMetaHead({
    title: seo.title,
    description: seo.description,
    canonical: `${SITE_URL}${seo.path}`,
    structuredData: buildBlogPostingStructuredData(post),
  });
}

export async function prerender(data) {
  const path = normalizePath(data?.url);

  if (path === "/blog") {
    const html = renderToString(
      <StaticRouter location={path}>
        <Routes>
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </StaticRouter>
    );

    return {
      html,
      head: buildBlogHead(),
    };
  }

  if (path.startsWith("/blog/")) {
    const slug = path
      .replace(/^\/blog\//, "")
      .replace(/\/$/, "");
    const post = BLOG_POSTS.find((item) => item.slug === slug && item.published);

    if (!post) return null;

    const html = renderToString(
      <StaticRouter location={path}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </StaticRouter>
    );

    return {
      html,
      head: buildBlogPostHead(post),
    };
  }

  if (!path.startsWith("/products/")) {
    return null;
  }

  const slug = path
    .replace(/^\/products\//, "")
    .replace(/\/$/, "");

  const product = PRODUCTS.find((item) => item.id === slug);

  if (!product) {
    return null;
  }

  const html = renderToString(
    <StaticRouter location={path}>
      <Routes>
        <Route
          path="/products/:slug"
          element={<ProductDetail />}
        />
      </Routes>
    </StaticRouter>
  );

  return {
    html,
    head: buildProductHead(product),
  };
}

