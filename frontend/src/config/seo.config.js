// Central SEO copy for static routes. Kept separate from the components
// that render each page for the same reason NAV_LINKS and CAPABILITIES
// live in site.config.js — one place to edit, no risk of a title tag
// drifting out of sync with what a page actually says.
//
// Approach: each page targets a distinct slice of real search intent
// rather than every page repeating the same "Ahmedabad" keyword list —
// that's what the brief asked for ("do not keyword stuff") and it's
// also just how search intent actually splits: someone searching
// "acrylic machine guard Ahmedabad" wants the machine-guards page, not
// the homepage restating the same phrase back at them.
//
// Titles stay under ~60 characters where possible (Google truncates
// beyond that); descriptions sit in the ~150-160 character range.

export const SEO = {
  home: {
    title: "Acrylic & Polycarbonate Manufacturer in Ahmedabad | Henil Enterprise",
    description:
      "Henil Enterprise is a B2B acrylic and polycarbonate manufacturer and fabricator based in Ahmedabad, Gujarat, building custom components to your drawing for businesses across India.",
    path: "/",
  },
  about: {
    title: "About Us | Acrylic & Polycarbonate Fabricator in Ahmedabad",
    description:
      "Henil Enterprise is an Ahmedabad-based acrylic and polycarbonate fabricator working business-to-business — components built to your drawing, dimensions, sample, or specification.",
    path: "/about",
  },
 products: {
  title: "Acrylic & Polycarbonate Products Manufacturer Ahmedabad | Henil Enterprise",
  description:
    "Explore custom acrylic and polycarbonate products from Henil Enterprise, Ahmedabad — machine guards, covers, boxes, components and fabricated parts made to your drawing.",
  path: "/products",
},
  capabilities: {
    title: "CNC Routing, Laser Cutting, Bending & Bonding | Ahmedabad Fabrication",
    description:
      "Acrylic and polycarbonate fabrication capabilities in Ahmedabad — CNC routing, laser cutting, precision cutting, heat bending, bonding, and full custom fabrication from your drawing.",
    path: "/capabilities",
  },
  industries: {
    title: "Industries We Serve | Industrial Acrylic Fabrication in Ahmedabad",
    description:
      "Industrial acrylic and polycarbonate fabrication for pharmaceutical, food processing, electronics, automotive and other industries — from our Ahmedabad manufacturing base.",
    path: "/industries",
  },
  gallery: {
    title: "Our Work | Acrylic & Polycarbonate Fabrication Gallery, Ahmedabad",
    description:
      "See the acrylic and polycarbonate fabrication process at our Ahmedabad facility — from raw sheet through CNC routing, laser cutting, bending and finished dispatch.",
    path: "/gallery",
  },
  blog: {
    title: "Blog | Acrylic & Polycarbonate Fabrication Insights — Henil Enterprise",
    description:
      "Notes on acrylic and polycarbonate fabrication — materials, processes, and applications — from Henil Enterprise, an Ahmedabad-based manufacturer and fabricator.",
    path: "/blog",
  },
  contact: {
    title: "Contact Us | Acrylic & Polycarbonate Fabricator in Ahmedabad",
    description:
      "Reach Henil Enterprise in Ahmedabad, Gujarat by phone, email or WhatsApp, or send your drawing directly for a fabrication quote. Serving customers across India.",
    path: "/contact",
  },
  faq: {
    title: "Frequently Asked Questions | Henil Enterprise, Ahmedabad",
    description:
      "Answers to common questions about acrylic and polycarbonate fabrication, quantity orders, custom drawings, delivery and quoting at Henil Enterprise, Ahmedabad.",
    path: "/faq",
  },
  quote: {
    title: "Get a Quote | Acrylic & Polycarbonate Fabrication, Ahmedabad",
    description:
      "Request a fabrication quote from Henil Enterprise — share your drawing, dimensions, sample or specification and our Ahmedabad team will respond with a quote.",
    path: "/quote",
  },
  brochure: {
    title: "Company Brochure | Henil Enterprise, Ahmedabad",
    description:
      "Download the Henil Enterprise brochure — capabilities, product range, and fabrication process from our Ahmedabad acrylic and polycarbonate manufacturing facility.",
    path: "/brochure",
  },
};

// Product pages are dynamic, so their SEO fields are generated per
// product rather than hand-written per slug. `machine-guards` and
// `protective-covers` are the categories that map directly onto the
// "acrylic machine guard Ahmedabad" / "polycarbonate machine guard
// Ahmedabad" search intent — for those, the material actually present
// on the product (product.materials) decides whether the title says
// "Acrylic", "Polycarbonate", or both, rather than guessing.
const GUARD_CATEGORY_IDS = new Set(["machine-guards", "protective-covers"]);

export function buildProductSeo(product, category) {
  const categoryLabel = category?.label || "Custom Fabricated Component";
  const isGuardCategory = product && GUARD_CATEGORY_IDS.has(product.categoryId);

  const materialPrefix =
    isGuardCategory && product.materials?.length === 1 ? `${product.materials[0]} ` : "";

  const title = isGuardCategory
    ? `${materialPrefix || "Acrylic & Polycarbonate "}Machine Guard | ${product.name} — Ahmedabad`
    : `${product.name} | ${categoryLabel} — Ahmedabad`;

  const description =
    `${product.shortDescription} Fabricated in Ahmedabad, Gujarat by Henil Enterprise for businesses across India — request a quote for your quantity.`.slice(
      0,
      160
    );

  return { title, description, path: `/products/${product.id}` };
}

export function buildBlogPostSeo(post) {
  return {
    title: `${post.title} | Henil Enterprise Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  };
}
