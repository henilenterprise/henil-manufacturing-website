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
  acrylicFabricationAhmedabad: {
    title: "Acrylic Fabrication Ahmedabad | Custom Acrylic Manufacturer",
    description:
      "Henil Enterprise provides custom acrylic fabrication in Ahmedabad including CNC routing, cutting, bending, bonding, machine guards, tanks, boxes and industrial acrylic components.",
    path: "/acrylic-fabrication-ahmedabad",
  },
  polycarbonateFabricationAhmedabad: {
    title: "Polycarbonate Fabrication Ahmedabad | Custom Manufacturer",
    description:
      "Henil Enterprise provides custom polycarbonate fabrication in Ahmedabad including CNC cutting, bending, machine guards, covers, impact panels and industrial components.",
    path: "/polycarbonate-fabrication-ahmedabad",
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

// Product pages are dynamic, so their SEO fields are generated by
// category. Each category targets a distinct search intent without
// repeating the same keywords across every product page.

export function buildProductSeo(product, category) {
  const productSeo = {
    "acrylic-machine-panel": {
      title: "Acrylic Machine Panel Manufacturer Ahmedabad",
      description:
        "Custom acrylic machine panels fabricated in Ahmedabad for machine housings, control panels and industrial equipment according to your drawings.",
    },

    "acrylic-structural-component": {
      title: "Industrial Acrylic Components Manufacturer Ahmedabad",
      description:
        "Custom industrial acrylic structural components fabricated in Ahmedabad for machinery, equipment and engineering applications.",
    },

    "polycarbonate-impact-panel": {
      title: "Polycarbonate Impact Panel Manufacturer Ahmedabad",
      description:
        "Custom polycarbonate impact panels fabricated in Ahmedabad for machinery, equipment protection and industrial applications.",
    },

    "polycarbonate-structural-part": {
      title: "Polycarbonate Structural Parts Manufacturer Ahmedabad",
      description:
        "Custom polycarbonate structural parts manufactured in Ahmedabad for machinery, equipment and engineering applications.",
    },

    "cnc-machine-guard": {
      title: "CNC Machine Guard Manufacturer Ahmedabad",
      description:
        "Custom CNC machine guards fabricated from acrylic and polycarbonate in Ahmedabad for industrial machinery and equipment protection.",
    },

    "conveyor-guard-panel": {
      title: "Conveyor Guard Panel Manufacturer Ahmedabad",
      description:
        "Custom conveyor guard panels fabricated from acrylic and polycarbonate in Ahmedabad for industrial conveyor and machinery protection.",
    },

    "equipment-protective-cover": {
      title: "Equipment Protective Cover Manufacturer Ahmedabad",
      description:
        "Custom acrylic and polycarbonate equipment covers manufactured in Ahmedabad for industrial machinery, equipment protection and visibility.",
    },

    "control-panel-cover": {
      title: "Acrylic Control Panel Cover Manufacturer Ahmedabad",
      description:
        "Custom acrylic control panel covers fabricated in Ahmedabad for industrial machines, electrical panels and equipment protection.",
    },

    "custom-acrylic-tank": {
      title: "Custom Acrylic Tank Manufacturer Ahmedabad",
      description:
        "Custom acrylic tanks fabricated in Ahmedabad according to your capacity, dimensions and drawing requirements for industrial applications.",
    },

    "acrylic-storage-box": {
      title: "Custom Acrylic Storage Box Manufacturer Ahmedabad",
      description:
        "Custom clear acrylic storage boxes manufactured in Ahmedabad for industrial, commercial, storage and display applications.",
    },

    "acrylic-display-cabinet": {
      title: "Acrylic Display Cabinet Manufacturer Ahmedabad",
      description:
        "Custom acrylic display cabinets manufactured in Ahmedabad for retail stores, showrooms, exhibitions and commercial applications.",
    },

    "machine-inspection-window": {
      title: "Machine Inspection Window Manufacturer Ahmedabad",
      description:
        "Custom acrylic and polycarbonate machine inspection windows fabricated in Ahmedabad for equipment monitoring and industrial applications.",
    },

    "process-sight-glass": {
      title: "Acrylic Sight Glass Manufacturer Ahmedabad",
      description:
        "Custom acrylic sight glass components fabricated in Ahmedabad for visual monitoring of tanks, equipment and enclosed industrial processes.",
    },

    "transparent-equipment-enclosure": {
      title: "Transparent Equipment Enclosure Manufacturer Ahmedabad",
      description:
        "Custom transparent acrylic and polycarbonate equipment enclosures manufactured in Ahmedabad for visibility, protection and industrial applications.",
    },

    "custom-fabricated-part": {
      title: "Custom Acrylic & Polycarbonate Parts Ahmedabad",
      description:
        "Custom acrylic and polycarbonate parts fabricated in Ahmedabad from your drawing, sample or specification for industrial applications.",
    },

    "commercial-display-fixture": {
      title: "Acrylic Display Fixture Manufacturer Ahmedabad",
      description:
        "Custom acrylic display fixtures manufactured in Ahmedabad for retail stores, showrooms, exhibitions and commercial spaces.",
    },
  };

  const seo = productSeo[product.id];

  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      path: `/products/${product.id}`,
    };
  }

  return {
    title: `${product.name} | Henil Enterprise Ahmedabad`,
    description:
      `${product.shortDescription} Fabricated in Ahmedabad, Gujarat by Henil Enterprise for businesses across India — request a quote for your quantity.`.slice(
        0,
        160
      ),
    path: `/products/${product.id}`,
  };
}


export function buildBlogPostSeo(post) {
  return {
    title: `${post.title} | Henil Enterprise Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  };
}
