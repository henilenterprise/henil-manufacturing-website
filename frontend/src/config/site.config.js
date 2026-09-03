// Central place for navigation structure and homepage copy. Contact
// details (phone, email, company name) now live in company.config.js —
// the single canonical configuration area — and are re-exported here
// under the same siteConfig shape so every existing call site (nav,
// hero, sticky panels, footer) keeps working unchanged.

import { buildWhatsAppMessage, buildWhatsAppHref } from "../utils/whatsapp.js";
import { company } from "./company.config.js";

const rawWhatsApp = import.meta.env?.VITE_WHATSAPP_NUMBER || "";

// Two configurable templates rather than one fixed message: the default
// (no page context) and one used when a visitor arrives with useful
// context — currently a product name, via {product}. Both independently
// overridable via env, so wording can change without touching code, and
// the {product} substitution is just string replacement, not a fixed
// English sentence baked into a component.
const WHATSAPP_MESSAGE_DEFAULT =
  import.meta.env?.VITE_WHATSAPP_MESSAGE_DEFAULT ||
  "Hello Henil Enterprise, I am interested in your acrylic/polycarbonate fabrication services.";

const WHATSAPP_MESSAGE_PRODUCT =
  import.meta.env?.VITE_WHATSAPP_MESSAGE_PRODUCT ||
  "Hello Henil Enterprise, I am interested in {product}.";

function whatsappHrefFor(context) {
  return buildWhatsAppHref({
    number: rawWhatsApp,
    defaultTemplate: WHATSAPP_MESSAGE_DEFAULT,
    productTemplate: WHATSAPP_MESSAGE_PRODUCT,
    context,
  });
}

export const siteConfig = {
  companyName: company.name,
  phone: company.phone,
  email: company.email,
  whatsapp: {
    number: rawWhatsApp,
    message: WHATSAPP_MESSAGE_DEFAULT,
    href: whatsappHrefFor(), // static default — every existing usage (nav, hero, sticky panels) keeps working unchanged
    buildHref: whatsappHrefFor, // callable with { product } for context-aware messages — see FloatingWhatsAppButton.jsx
  },
};

// Single source of truth for the main navigation — both the desktop bar,
// the mobile menu, and the route table in App.jsx are built from this so
// they can never drift out of sync with each other.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Industries", href: "/industries" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const CTA_LINK = { label: "Get a Quote", href: "/quote" };

// ---- Content data, shared between the homepage sections and (later) the
// full Capabilities/Industries/Products pages, so figures and labels never
// have to be re-typed or drift between pages. Nothing here is a fabricated
// spec, certification, or statistic — only the process/category names
// already confirmed in the brief. ----

export const CAPABILITIES = [
  { id: "cnc-routing", label: "CNC Routing", description: "Precision-routed profiles and cutouts to your drawing." },
  { id: "laser-cutting", label: "Laser Cutting", description: "Clean, accurate edges for detailed geometries." },
  { id: "bending", label: "Bending", description: "Formed acrylic and polycarbonate to specified angles." },
  { id: "cutting", label: "Cutting", description: "Straight and profile cutting to size, at quantity." },
  { id: "bonding", label: "Bonding", description: "Solvent and adhesive bonding for multi-part assemblies." },
  { id: "custom-fabrication", label: "Custom Fabrication", description: "Full builds from drawing to finished component." },
];

export const PRODUCT_CATEGORIES = [
  {
    id: "acrylic-sheets",
    title: "Acrylic Sheets & Panels",
    description: "Clear, frosted and coloured acrylic cut and finished to size.",
  },
  {
    id: "polycarbonate-components",
    title: "Polycarbonate Components",
    description: "Impact-resistant components for demanding industrial environments.",
  },
  {
    id: "machine-guards",
    title: "Machine Guards & Covers",
    description: "Protective guards and covers fabricated to your machine's exact geometry.",
  },
  {
    id: "engineering-parts",
    title: "Custom Engineering Parts",
    description: "Fabricated components built from your drawing, dimensions, or sample.",
  },
];

// Industries served now lives in data/industries.data.js (INDUSTRIES_DETAIL)
// as the single source of truth — it's referenced by both the homepage
// teaser and the full /industries page, so there's only one list to keep
// in sync with the real category/capability data.

export const WHY_HENIL = [
  {
    id: "custom-fabrication",
    title: "Custom fabrication, not a fixed catalogue",
    description: "We build to your drawing and requirements rather than asking you to fit a standard part.",
  },
  {
    id: "quantity-orders",
    title: "Built for quantity orders",
    description: "Prototype runs and repeat production orders, fabricated to the same spec every time.",
  },
  {
    id: "engineering-understanding",
    title: "Engineering understanding",
    description: "We read drawings, dimensions and tolerances the way your engineering team specifies them.",
  },
  {
    id: "consistent-quality",
    title: "Consistent quality",
    description: "The part you approve on the first order is the part you receive on the fiftieth.",
  },
  {
    id: "flexible-production",
    title: "Flexible production",
    description: "From a single sample to a standing repeat order, scaled to what you actually need.",
  },
  {
    id: "b2b-support",
    title: "Business-to-business support",
    description: "Direct communication with the people fabricating your parts, not a call centre.",
  },
];

export const PROCESS_STEPS = [
  { id: "design", label: "Design" },
  { id: "material", label: "Material" },
  { id: "cutting", label: "Cutting" },
  { id: "bending", label: "Bending" },
  { id: "bonding", label: "Bonding" },
  { id: "inspection", label: "Inspection" },
  { id: "dispatch", label: "Dispatch" },
];
