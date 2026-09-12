import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/ui/index.js";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Capabilities from "./pages/Capabilities.jsx";
import Industries from "./pages/Industries.jsx";
import CustomFabrication from "./pages/CustomFabrication.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Faq from "./pages/Faq.jsx";
import Quote from "./pages/Quote.jsx";
import Brochure from "./pages/Brochure.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import CookiePolicy from "./pages/CookiePolicy.jsx";
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
import { FAQ_ITEMS } from "./data/faq.data.js";

import {
  SEO,
  buildProductSeo,
  buildBlogPostSeo,
} from "./config/seo.config.js";

import { buildBlogPostingStructuredData } from "./utils/blog.js";
import { buildFaqStructuredData } from "./utils/faq.js";
import {
  buildOrganizationStructuredData,
  buildLocalBusinessStructuredData,
  buildBreadcrumbStructuredData,
  buildProductStructuredData,
} from "./utils/structuredData.js";

const SITE_URL = "https://www.henilacrylics.com";

// Organization describes the business entity itself and doesn't change
// per page — it's mounted sitewide client-side in App.jsx (see the
// comment there). prerender.jsx renders each page's component directly
// through its own <StaticRouter> rather than through <App>, so that
// sitewide mount is never reached during prerendering; every prerendered
// route below includes this explicitly so the *static* HTML carries the
// same entity-level structured data Google would eventually see after
// JS runs, not just a client-side-only version of it.
const ORGANIZATION_STRUCTURED_DATA = buildOrganizationStructuredData();

function normalizePath(url) {
  if (!url) return "/";

  try {
    return new URL(url, SITE_URL).pathname;
  } catch {
    return String(url).split("?")[0] || "/";
  }
}

// `structuredDataList` replaces the old single `structuredData` field —
// a page can legitimately need more than one JSON-LD block (e.g. a
// product page wants Organization + Product + BreadcrumbList all at
// once). Falsy entries are skipped so callers can pass a conditional
// value (e.g. `product ? buildProductStructuredData(...) : null`)
// without an extra filter step at every call site.
function buildMetaHead({
  title,
  description,
  canonical,
  structuredDataList = [],
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

  for (const data of structuredDataList) {
    if (!data) continue;
    elements.push({
      type: "script",
      props: {
        type: "application/ld+json",
      },
      children: JSON.stringify(data),
    });
  }

  return {
    lang: "en",
    title,
    elements,
  };
}

function renderRoute(path, Component) {
  return renderRouteAt(path, path, Component);
}

// For dynamic routes, `location` is the real URL being prerendered
// (e.g. "/products/acrylic-storage-box") while `pattern` is the Route's
// matcher (e.g. "/products/:slug") — they must stay distinct so
// useParams() inside Component actually resolves the slug. Static
// pages pass the same value for both via renderRoute() above.
function renderRouteAt(location, pattern, Component) {
  // ToastProvider wraps every route (matching App.jsx's real provider
  // tree) because Quote.jsx calls useToast() — without this, prerendering
  // that one page throws "useToast must be used within a ToastProvider".
  // Harmless no-op for every other page that doesn't use toasts.
  return renderToString(
    <StaticRouter location={location}>
      <ToastProvider>
        <Routes>
          <Route path={pattern} element={<Component />} />
        </Routes>
      </ToastProvider>
    </StaticRouter>
  );
}

/*
 * ---------------------------------------------------------
 * HOME
 * ---------------------------------------------------------
 */

function renderHome() {
  return {
    html: renderRoute("/", Home),
    head: buildMetaHead({
      title: SEO.home.title,
      description: SEO.home.description,
      canonical: `${SITE_URL}${SEO.home.path}`,
      // Matches Home.jsx's client-side mounts exactly: Organization
      // (sitewide) + LocalBusiness (Home and Contact only — see
      // structuredData.js). No breadcrumb: Home is the top level, and
      // Home.jsx itself never mounts one either.
      structuredDataList: [
        ORGANIZATION_STRUCTURED_DATA,
        buildLocalBusinessStructuredData(),
      ],
    }),
  };
}

/*
 * ---------------------------------------------------------
 * SIMPLE STATIC PAGES
 * ---------------------------------------------------------
 * Every entry's `seo` and `breadcrumb` mirror exactly what that page's
 * own component already passes to useSeo()/useJsonLd() client-side —
 * see each file's imports of SEO.<page> and buildBreadcrumbStructuredData
 * for the source of truth this is kept in sync with.
 */

const STATIC_PAGES = {
  "/about": {
    component: About,
    seo: SEO.about,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
  },
  "/capabilities": {
    component: Capabilities,
    seo: SEO.capabilities,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Capabilities", path: "/capabilities" },
    ],
  },
  "/industries": {
    component: Industries,
    seo: SEO.industries,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Industries", path: "/industries" },
    ],
  },
  "/gallery": {
    component: Gallery,
    seo: SEO.gallery,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ],
  },
  "/custom-fabrication": {
    component: CustomFabrication,
    // Not in seo.config.js's SEO object today — CustomFabrication.jsx
    // passes this title/description inline to useSeo() rather than
    // through the shared config. Copied verbatim from there rather
    // than invented, so static and client-rendered output agree.
    seo: {
      title: "Custom Acrylic & Polycarbonate Fabrication | Ahmedabad",
      description:
        "Custom acrylic products fabricated from your drawing, dimensions, sample or CAD file — cutting, bending and bonding combined into one finished part, from our Ahmedabad facility.",
      path: "/custom-fabrication",
    },
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Custom Fabrication", path: "/custom-fabrication" },
    ],
  },
  "/contact": {
    component: Contact,
    seo: SEO.contact,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
    // Contact.jsx mounts LocalBusiness client-side too (Home and
    // Contact only — see structuredData.js's comment on why).
    extraStructuredData: [buildLocalBusinessStructuredData()],
  },
  "/faq": {
    component: Faq,
    seo: SEO.faq,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ],
    // Generated from the same FAQ_ITEMS array the visible accordion
    // renders (see Faq.jsx) — this schema can't drift from what's
    // actually on the page because it's built from the same data.
    extraStructuredData: [buildFaqStructuredData(FAQ_ITEMS)],
  },
  "/quote": {
    component: Quote,
    seo: SEO.quote,
    // No breadcrumb: Quote.jsx doesn't mount one client-side either.
  },
  "/brochure": {
    component: Brochure,
    seo: SEO.brochure,
  },
  "/privacy-policy": {
    component: PrivacyPolicy,
    seo: SEO.privacyPolicy,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
  },
  "/terms": {
    component: Terms,
    seo: SEO.terms,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Terms of Use", path: "/terms" },
    ],
  },
  "/cookie-policy": {
    component: CookiePolicy,
    seo: SEO.cookiePolicy,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Cookie Policy", path: "/cookie-policy" },
    ],
  },
};

function renderStaticPage(path, page) {
  const structuredDataList = [
    ORGANIZATION_STRUCTURED_DATA,
    ...(page.extraStructuredData || []),
  ];

  if (page.breadcrumb) {
    structuredDataList.push(buildBreadcrumbStructuredData(page.breadcrumb));
  }

  return {
    html: renderRoute(path, page.component),
    head: buildMetaHead({
      title: page.seo.title,
      description: page.seo.description,
      canonical: `${SITE_URL}${page.seo.path}`,
      structuredDataList,
    }),
  };
}

/*
 * ---------------------------------------------------------
 * PRODUCT SEO
 * ---------------------------------------------------------
 */

function buildProductHead(product, category) {
  const seo = buildProductSeo(product, category);

  // Matches ProductDetail.jsx's own breadcrumb exactly, including its
  // existing (pre-existing, not introduced here) choice to point the
  // category crumb at "/products" rather than a dedicated category
  // page, since no such page exists in this app.
  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    ...(category ? [{ name: category.label, path: "/products" }] : []),
    { name: product.name, path: `/products/${product.id}` },
  ];

  return buildMetaHead({
    title: seo.title,
    description: seo.description,
    canonical: `${SITE_URL}${seo.path}`,
    structuredDataList: [
      ORGANIZATION_STRUCTURED_DATA,
      buildProductStructuredData(product, category),
      buildBreadcrumbStructuredData(breadcrumb),
    ],
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
    structuredDataList: [
      ORGANIZATION_STRUCTURED_DATA,
      buildBreadcrumbStructuredData([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  });
}

function buildBlogPostHead(post) {
  const seo = buildBlogPostSeo(post);

  return buildMetaHead({
    title: seo.title,
    description: seo.description,
    canonical: `${SITE_URL}${seo.path}`,
    structuredDataList: [
      ORGANIZATION_STRUCTURED_DATA,
      buildBlogPostingStructuredData(post),
      buildBreadcrumbStructuredData([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  });
}

/*
 * ---------------------------------------------------------
 * COMMERCIAL / SEO PAGES (city-service landing pages)
 * ---------------------------------------------------------
 * Each `breadcrumb` mirrors that page's own client-side
 * buildBreadcrumbStructuredData() call exactly.
 */

const SEO_PAGES = {
  "/acrylic-fabrication-ahmedabad": {
    component: AcrylicFabricationAhmedabad,
    seo: SEO.acrylicFabricationAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      {
        name: "Acrylic Fabrication Ahmedabad",
        path: "/acrylic-fabrication-ahmedabad",
      },
    ],
  },

  "/custom-acrylic-fabrication-ahmedabad": {
    component: CustomAcrylicFabricationAhmedabad,
    seo: SEO.customAcrylicFabricationAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      {
        name: "Custom Acrylic Fabrication Ahmedabad",
        path: "/custom-acrylic-fabrication-ahmedabad",
      },
    ],
  },

  "/polycarbonate-fabrication-ahmedabad": {
    component: PolycarbonateFabricationAhmedabad,
    seo: SEO.polycarbonateFabricationAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      {
        name: "Polycarbonate Fabrication Ahmedabad",
        path: "/polycarbonate-fabrication-ahmedabad",
      },
    ],
  },

  "/acrylic-machine-guard-manufacturer-ahmedabad": {
    component: AcrylicMachineGuardManufacturerAhmedabad,
    seo: SEO.acrylicMachineGuardManufacturerAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      {
        name: "Acrylic Machine Guard Manufacturer Ahmedabad",
        path: "/acrylic-machine-guard-manufacturer-ahmedabad",
      },
    ],
  },

  "/polycarbonate-machine-guard-manufacturer-ahmedabad": {
    component: PolycarbonateMachineGuardManufacturerAhmedabad,
    seo: SEO.polycarbonateMachineGuardManufacturerAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      {
        name: "Polycarbonate Machine Guard Manufacturer Ahmedabad",
        path: "/polycarbonate-machine-guard-manufacturer-ahmedabad",
      },
    ],
  },

  "/acrylic-tank-manufacturer-ahmedabad": {
    component: AcrylicTankManufacturerAhmedabad,
    seo: SEO.acrylicTankManufacturerAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      {
        name: "Acrylic Tank Manufacturer Ahmedabad",
        path: "/acrylic-tank-manufacturer-ahmedabad",
      },
    ],
  },

  "/acrylic-box-manufacturer-ahmedabad": {
    component: AcrylicBoxManufacturerAhmedabad,
    seo: SEO.acrylicBoxManufacturerAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      {
        name: "Acrylic Box Manufacturer Ahmedabad",
        path: "/acrylic-box-manufacturer-ahmedabad",
      },
    ],
  },

  "/acrylic-sight-glass-manufacturer-ahmedabad": {
    component: AcrylicSightGlassManufacturerAhmedabad,
    seo: SEO.acrylicSightGlassManufacturerAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      {
        name: "Acrylic Sight Glass Manufacturer Ahmedabad",
        path: "/acrylic-sight-glass-manufacturer-ahmedabad",
      },
    ],
  },

  "/acrylic-inspection-window-manufacturer-ahmedabad": {
    component: AcrylicInspectionWindowManufacturerAhmedabad,
    seo: SEO.acrylicInspectionWindowManufacturerAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      {
        name: "Acrylic Inspection Window Manufacturer Ahmedabad",
        path: "/acrylic-inspection-window-manufacturer-ahmedabad",
      },
    ],
  },

  "/acrylic-cnc-cutting-ahmedabad": {
    component: AcrylicCncCuttingAhmedabad,
    seo: SEO.acrylicCncCuttingAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      {
        name: "Acrylic CNC Cutting Ahmedabad",
        path: "/acrylic-cnc-cutting-ahmedabad",
      },
    ],
  },

  "/acrylic-bending-ahmedabad": {
    component: AcrylicBendingAhmedabad,
    seo: SEO.acrylicBendingAhmedabad,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Acrylic Bending Ahmedabad", path: "/acrylic-bending-ahmedabad" },
    ],
  },
};

/*
 * ---------------------------------------------------------
 * PRERENDER
 * ---------------------------------------------------------
 */

export async function prerender(data) {
  const path = normalizePath(data?.url);

  /*
   * -------------------------------------------------------
   * HOME
   * -------------------------------------------------------
   */

  if (path === "/") {
    return renderHome();
  }

  /*
   * -------------------------------------------------------
   * SIMPLE STATIC PAGES
   * -------------------------------------------------------
   */

  if (STATIC_PAGES[path]) {
    return renderStaticPage(path, STATIC_PAGES[path]);
  }

  /*
   * -------------------------------------------------------
   * PRODUCTS INDEX
   * -------------------------------------------------------
   */

  if (path === "/products") {
    return {
      html: renderRoute("/products", Products),
      head: buildMetaHead({
        title: SEO.products.title,
        description: SEO.products.description,
        canonical: `${SITE_URL}${SEO.products.path}`,
        structuredDataList: [
          ORGANIZATION_STRUCTURED_DATA,
          buildBreadcrumbStructuredData([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
        ],
      }),
    };
  }

  /*
   * -------------------------------------------------------
   * COMMERCIAL / SEO PAGES
   * -------------------------------------------------------
   */

  if (SEO_PAGES[path]) {
    const page = SEO_PAGES[path];

    return {
      html: renderRoute(path, page.component),
      head: buildMetaHead({
        title: page.seo.title,
        description: page.seo.description,
        canonical: `${SITE_URL}${page.seo.path}`,
        structuredDataList: [
          ORGANIZATION_STRUCTURED_DATA,
          buildBreadcrumbStructuredData(page.breadcrumb),
        ],
      }),
    };
  }

  /*
   * -------------------------------------------------------
   * BLOG INDEX
   * -------------------------------------------------------
   */

  if (path === "/blog") {
    return {
      html: renderRoute("/blog", Blog),
      head: buildBlogHead(),
    };
  }

  /*
   * -------------------------------------------------------
   * INDIVIDUAL BLOG POSTS
   * -------------------------------------------------------
   */

  if (path.startsWith("/blog/")) {
    const slug = path.replace(/^\/blog\//, "").replace(/\/$/, "");

    const post = BLOG_POSTS.find(
      (item) => item.slug === slug && item.published
    );

    if (!post) {
      return null;
    }

    return {
      html: renderRouteAt(path, "/blog/:slug", BlogPost),
      head: buildBlogPostHead(post),
    };
  }

  /*
   * -------------------------------------------------------
   * INDIVIDUAL PRODUCTS
   * -------------------------------------------------------
   */

  if (path.startsWith("/products/")) {
    const slug = path.replace(/^\/products\//, "").replace(/\/$/, "");

    const product = PRODUCTS.find((item) => item.id === slug);

    if (!product) {
      return null;
    }

    const category = getCategoryById(product.categoryId);

    return {
      html: renderRouteAt(path, "/products/:slug", ProductDetail),
      head: buildProductHead(product, category),
    };
  }

  /*
   * -------------------------------------------------------
   * ALL OTHER ROUTES
   * -------------------------------------------------------
   *
   * Normal Vite/Vercel application handles these routes (e.g. /quote's
   * legacy /get-a-quote redirect, /design-system, and the 404 page —
   * none of which need or want a static, indexable HTML snapshot).
   */

  return null;
}
