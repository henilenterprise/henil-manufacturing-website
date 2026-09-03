// Configurable FAQ data — single source of truth for both the visible
// accordion and the JSON-LD structured data (see utils/faq.js), so the
// two can never drift out of sync with each other.
//
// Every answer was checked against the same rule used throughout this
// project: no invented thickness, tolerance, turnaround time, delivery
// area, or other specification that hasn't actually been provided.
// Where a question asks for exactly that kind of detail (thicknesses,
// delivery outside Ahmedabad), the answer says so honestly and points
// to the RFQ process instead of guessing.

export const FAQ_ITEMS = [
  {
    id: "manufacture-from-drawings",
    question: "Can you manufacture according to drawings?",
    answer: "Yes — we fabricate directly from your engineering drawing, CAD file, sample, or specification rather than a fixed catalogue. You can upload a drawing directly on our Custom Fabrication page or as part of a quote request.",
  },
  {
    id: "quantity-orders",
    question: "Can you handle quantity orders?",
    answer: "Yes — we're structured for batch production and repeat orders, from a first prototype through to an ongoing production run, not just single pieces.",
  },
  {
    id: "materials",
    question: "What materials do you fabricate?",
    answer: "We fabricate acrylic and polycarbonate. Our Material Selector covers the general characteristics and typical applications of each.",
  },
  {
    id: "thicknesses",
    question: "What thicknesses are available?",
    answer: "Available thickness depends on current stock and your specific order — share your requirement when requesting a quote and we'll confirm what's available rather than quoting a fixed range here.",
  },
  {
    id: "custom-dimensions",
    question: "Can you make custom dimensions?",
    answer: "Yes — components are fabricated to the dimensions you provide, including non-standard shapes, which you can describe in the custom dimensions field of our quote request form.",
  },
  {
    id: "prototypes",
    question: "Do you provide prototypes?",
    answer: "Yes — Prototype is one of our standard inquiry categories, alongside Small, Medium, and Large Batch production, so a single validation piece before a full run is a normal request.",
  },
  {
    id: "acrylic-machine-guards",
    question: "Can you fabricate acrylic machine guards?",
    answer: "Yes — machine guards are one of our standard product categories, fabricated in acrylic or polycarbonate depending on your machine and requirement.",
  },
  {
    id: "polycarbonate",
    question: "Can you work with polycarbonate?",
    answer: "Yes — polycarbonate is one of our two core materials, alongside acrylic, and is used across most of our capabilities and product categories.",
  },
  {
    id: "cnc-cutting",
    question: "Do you provide CNC cutting?",
    answer: "Yes — CNC routing is one of our core fabrication capabilities, used for precise profiles, cutouts, and repeat geometry.",
  },
  {
    id: "laser-cutting",
    question: "Do you provide laser cutting?",
    answer: "Yes — laser cutting is one of our core capabilities, suited to detailed or intricate profile work.",
  },
  {
    id: "bend-acrylic",
    question: "Can you bend acrylic?",
    answer: "Yes — acrylic bending is one of our core capabilities, used for folded or curved components without a bonded seam.",
  },
  {
    id: "bond-acrylic",
    question: "Can you bond acrylic?",
    answer: "Yes — bonding is one of our core capabilities, used to join acrylic (and polycarbonate) components into finished multi-part assemblies.",
  },
  {
    id: "delivery-outside-ahmedabad",
    question: "Do you deliver outside Ahmedabad?",
    answer: "Deliveries can be arranged outside Ahmedabad depending on the order — share your delivery location when requesting a quote and we'll confirm.",
  },
  {
    id: "request-quotation",
    question: "How can I request a quotation?",
    answer: "Use our Get a Quote form — it walks through your company details, requirement, dimensions, an optional drawing upload, delivery details, and a review step before you submit. You'll receive an inquiry reference number immediately after submitting.",
  },
  {
    id: "repeat-production-orders",
    question: "Do you accept repeat production orders?",
    answer: "Yes — repeat and ongoing production orders are a core part of how we work, built to the same specification and quality on every run, not just a one-off piece.",
  },
];
