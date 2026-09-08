import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";

import ProductDetail from "./pages/ProductDetail.jsx";

import { PRODUCTS } from "./data/products.data.js";
import { buildProductSeo } from "./config/seo.config.js";
import { getCategoryById } from "./data/categories.data.js";

const SITE_URL = "https://www.henilacrylics.com";

function normalizePath(url) {
  if (!url) return "/";

  try {
    return new URL(url, SITE_URL).pathname;
  } catch {
    return String(url).split("?")[0] || "/";
  }
}

function buildHead(product) {
  const category = getCategoryById(product.categoryId);
  const seo = buildProductSeo(product, category);
  const canonical = `${SITE_URL}${seo.path}`;

  return {
    lang: "en",
    title: seo.title,

    elements: new Set([
      {
        type: "meta",
        props: {
          name: "description",
          content: seo.description,
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
          content: seo.title,
        },
      },
      {
        type: "meta",
        props: {
          property: "og:description",
          content: seo.description,
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
          content: seo.title,
        },
      },
      {
        type: "meta",
        props: {
          name: "twitter:description",
          content: seo.description,
        },
      },
    ]),
  };
}

export async function prerender(data) {
  const path = normalizePath(data?.url);

  /*
   * Only prerender product-detail routes.
   * Other routes continue using the normal SPA entry.
   */
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

  /*
   * IMPORTANT:
   *
   * ProductDetail uses useParams(), so it MUST be rendered
   * through the same route pattern used by the real application.
   */
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
    head: buildHead(product),
  };
}