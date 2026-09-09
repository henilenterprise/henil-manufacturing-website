import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";

import ProductDetail from "./pages/ProductDetail.jsx";
import Products from "./pages/Products.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";

import AcrylicFabricationAhmedabad from "./pages/AcrylicFabricationAhmedabad.jsx";
import CustomAcrylicFabricationAhmedabad from "./pages/CustomAcrylicFabricationAhmedabad.jsx";
import PolycarbonateFabricationAhmedabad from "./pages/PolycarbonateFabricationAhmedabad.jsx";
import AcrylicMachineGuardManufacturerAhmedabad from "./pages/AcrylicMachineGuardManufacturerAhmedabad.jsx";
import PolycarbonateMachineGuardManufacturerAhmedabad from "./pages/PolycarbonateMachineGuardManufacturerAhmedabad.jsx";
import AcrylicTankManufacturerAhmedabad from "./pages/AcrylicTankManufacturerAhmedabad.jsx";
import AcrylicBoxManufacturerAhmedabad from "./pages/AcrylicBoxManufacturerAhmedabad.jsx";
import AcrylicSightGlassManufacturerAhmedabad from "./pages/AcrylicSightGlassManufacturerAhmedabad.jsx";
import AcrylicInspectionWindowManufacturerAhmedabad from "./pages/AcrylicInspectionWindowManufacturerAhmedabad.jsx";
import AcrylicCncCuttingAhmedabad from "./pages/AcrylicCncCuttingAhmedabad.jsx";
import AcrylicBendingAhmedabad from "./pages/AcrylicBendingAhmedabad.jsx";

import { PRODUCTS } from "./data/products.data.js";
import { BLOG_POSTS } from "./data/blogPosts.data.js";
import { getCategoryById } from "./data/categories.data.js";

import {
  buildProductSeo,
  buildBlogPostSeo,
} from "./config/seo.config.js";

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

function buildMetaHead({
  title,
  description,
  canonical,
  structuredData = null,
}) {
  const elements = [
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
  ];

  if (structuredData) {
    elements.push({
      type: "script",
      props: {
        type: "application/ld+json",
      },
      children: JSON.stringify(structuredData),
    });
  }

  return {
    lang: "en",
    title,
    elements,
  };
}

/*
 * ---------------------------------------------------------
 * PRODUCT SEO
 * ---------------------------------------------------------
 */

function buildProductHead(product) {
  const category = getCategoryById(product.categoryId);
  const seo = buildProductSeo(product, category);

  return buildMetaHead({
    title: seo.title,
    description: seo.description,
    canonical: `${SITE_URL}${seo.path}`,
  });
}

/*
 * ---------------------------------------------------------
 * BLOG SEO
 * ---------------------------------------------------------
 */

function buildBlogHead() {
  return buildMetaHead({
    title:
      "Blog | Acrylic & Polycarbonate Fabrication Insights — Henil Enterprise",
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

/*
 * ---------------------------------------------------------
 * COMMERCIAL / SEO PAGES
 * ---------------------------------------------------------
 */

const SEO_PAGES = {
  "/acrylic-fabrication-ahmedabad": {
    component: AcrylicFabricationAhmedabad,
    title: "Acrylic Fabrication Ahmedabad | Henil Enterprise",
    description:
      "Henil Enterprise provides custom acrylic fabrication in Ahmedabad for industrial components, machine guards, tanks, boxes, covers and precision-fabricated parts.",
  },

  "/custom-acrylic-fabrication-ahmedabad": {
    component: CustomAcrylicFabricationAhmedabad,
    title: "Custom Acrylic Fabrication Ahmedabad | Henil Enterprise",
    description:
      "Custom acrylic fabrication in Ahmedabad for machine guards, tanks, boxes, covers, enclosures and industrial components manufactured to your drawing or sample.",
  },

  "/polycarbonate-fabrication-ahmedabad": {
    component: PolycarbonateFabricationAhmedabad,
    title: "Polycarbonate Fabrication Ahmedabad | Henil Enterprise",
    description:
      "Custom polycarbonate fabrication in Ahmedabad for machine guards, protective covers, panels, enclosures and industrial components manufactured to your requirements.",
  },

  "/acrylic-machine-guard-manufacturer-ahmedabad": {
    component: AcrylicMachineGuardManufacturerAhmedabad,
    title:
      "Acrylic Machine Guard Manufacturer Ahmedabad | Henil Enterprise",
    description:
      "Henil Enterprise manufactures custom acrylic machine guards in Ahmedabad for industrial machinery, equipment protection and machine visibility applications.",
  },

  "/polycarbonate-machine-guard-manufacturer-ahmedabad": {
    component: PolycarbonateMachineGuardManufacturerAhmedabad,
    title:
      "Polycarbonate Machine Guard Manufacturer Ahmedabad | Henil Enterprise",
    description:
      "Henil Enterprise manufactures custom polycarbonate machine guards in Ahmedabad for industrial machinery, impact protection and operator safety applications.",
  },

  "/acrylic-tank-manufacturer-ahmedabad": {
    component: AcrylicTankManufacturerAhmedabad,
    title: "Acrylic Tank Manufacturer Ahmedabad | Henil Enterprise",
    description:
      "Henil Enterprise manufactures custom acrylic tanks in Ahmedabad for industrial, laboratory, equipment and process applications, made to your drawing and dimensions.",
  },

  "/acrylic-box-manufacturer-ahmedabad": {
    component: AcrylicBoxManufacturerAhmedabad,
    title: "Acrylic Box Manufacturer Ahmedabad | Henil Enterprise",
    description:
      "Henil Enterprise manufactures custom acrylic boxes in Ahmedabad for industrial, commercial, equipment and display applications according to your dimensions and requirements.",
  },

  "/acrylic-sight-glass-manufacturer-ahmedabad": {
    component: AcrylicSightGlassManufacturerAhmedabad,
    title:
      "Acrylic Sight Glass Manufacturer Ahmedabad | Henil Enterprise",
    description:
      "Henil Enterprise manufactures acrylic sight glasses and inspection components in Ahmedabad for industrial equipment, process systems and machinery applications.",
  },

  "/acrylic-inspection-window-manufacturer-ahmedabad": {
    component: AcrylicInspectionWindowManufacturerAhmedabad,
    title:
      "Acrylic Inspection Window Manufacturer Ahmedabad | Henil Enterprise",
    description:
      "Henil Enterprise manufactures custom acrylic inspection windows in Ahmedabad for machinery, industrial equipment and process applications.",
  },

  "/acrylic-cnc-cutting-ahmedabad": {
    component: AcrylicCncCuttingAhmedabad,
    title: "Acrylic CNC Cutting Ahmedabad | Henil Enterprise",
    description:
      "Precision acrylic CNC cutting in Ahmedabad by Henil Enterprise for industrial components, machine parts, panels, guards and custom fabricated products.",
  },

  "/acrylic-bending-ahmedabad": {
    component: AcrylicBendingAhmedabad,
    title: "Acrylic Bending Ahmedabad | Henil Enterprise",
    description:
      "Custom acrylic bending in Ahmedabad by Henil Enterprise for industrial covers, guards, boxes, enclosures and fabricated acrylic components.",
  },
};

function buildSeoPageHead(page, path) {
  return buildMetaHead({
    title: page.title,
    description: page.description,
    canonical: `${SITE_URL}${path}`,
  });
}

function renderSeoPage(path, page) {
  const Component = page.component;

  const html = renderToString(
    <StaticRouter location={path}>
      <Routes>
        <Route path={path} element={<Component />} />
      </Routes>
    </StaticRouter>
  );

  return {
    html,
    head: buildSeoPageHead(page, path),
  };
}

/*
 * ---------------------------------------------------------
 * PRERENDER
 * ---------------------------------------------------------
 */

export async function prerender(data) {
  const path = normalizePath(data?.url);

  /*
   * -------------------------------------------------------
   * PRODUCTS INDEX
   * -------------------------------------------------------
   */

  if (path === "/products") {
    const html = renderToString(
      <StaticRouter location={path}>
        <Routes>
          <Route path="/products" element={<Products />} />
        </Routes>
      </StaticRouter>
    );

    return {
      html,
      head: buildMetaHead({
        title: "Acrylic & Polycarbonate Products | Henil Enterprise",
        description:
          "Explore custom acrylic and polycarbonate products manufactured by Henil Enterprise in Ahmedabad for industrial, machinery and commercial applications.",
        canonical: `${SITE_URL}/products`,
      }),
    };
  }

  /*
   * -------------------------------------------------------
   * COMMERCIAL / SEO PAGES
   * -------------------------------------------------------
   */

  if (SEO_PAGES[path]) {
    return renderSeoPage(path, SEO_PAGES[path]);
  }

  /*
   * -------------------------------------------------------
   * BLOG INDEX
   * -------------------------------------------------------
   */

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

  /*
   * -------------------------------------------------------
   * INDIVIDUAL BLOG POSTS
   * -------------------------------------------------------
   */

  if (path.startsWith("/blog/")) {
    const slug = path
      .replace(/^\/blog\//, "")
      .replace(/\/$/, "");

    const post = BLOG_POSTS.find(
      (item) => item.slug === slug && item.published
    );

    if (!post) {
      return null;
    }

    const html = renderToString(
      <StaticRouter location={path}>
        <Routes>
          <Route
            path="/blog/:slug"
            element={<BlogPost />}
          />
        </Routes>
      </StaticRouter>
    );

    return {
      html,
      head: buildBlogPostHead(post),
    };
  }

  /*
   * -------------------------------------------------------
   * INDIVIDUAL PRODUCTS
   * -------------------------------------------------------
   */

  if (path.startsWith("/products/")) {
    const slug = path
      .replace(/^\/products\//, "")
      .replace(/\/$/, "");

    const product = PRODUCTS.find(
      (item) => item.id === slug
    );

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

  /*
   * -------------------------------------------------------
   * ALL OTHER ROUTES
   * -------------------------------------------------------
   *
   * Normal Vite/Vercel application handles these routes.
   */

  return null;
}