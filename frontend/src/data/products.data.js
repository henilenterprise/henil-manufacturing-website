// Product listing for /products and /products/:slug. Kept separate from
// every UI component — they only ever receive this data as props, they
// never define it. Descriptions, applications, and materials are
// deliberately qualitative: no thickness, capacity, dimension, or
// tolerance numbers are invented here. Real specs can be added per-product
// (see productPolicy.data.js for how the detail page presents that gap
// honestly until then).
//
// `id` doubles as the URL slug for /products/:slug.

export const PRODUCTS = [
  {
    id: "acrylic-machine-panel",
    name: "Acrylic Machine Panel",
    categoryId: "industrial-acrylic-components",
    shortDescription: "Fabricated acrylic panelling for machine housings and control panel fascias.",
    applications: ["Machine housings", "Control panel fascias", "Equipment panelling"],
    materials: ["Acrylic"],
    featured: true,
  },
  {
    id: "acrylic-structural-component",
    name: "Acrylic Structural Component",
    categoryId: "industrial-acrylic-components",
    shortDescription: "Custom acrylic components fabricated to fit within larger equipment assemblies.",
    applications: ["Equipment assemblies", "Structural infill panels"],
    materials: ["Acrylic"],
    featured: false,
  },
  {
    id: "polycarbonate-impact-panel",
    name: "Polycarbonate Impact Panel",
    categoryId: "polycarbonate-components",
    shortDescription: "Impact-resistant polycarbonate panels for demanding industrial settings.",
    applications: ["Industrial enclosures", "Impact zones", "Safety barriers"],
    materials: ["Polycarbonate"],
    featured: false,
  },
  {
    id: "polycarbonate-structural-part",
    name: "Polycarbonate Structural Part",
    categoryId: "polycarbonate-components",
    shortDescription: "Formed polycarbonate components for structural and protective applications.",
    applications: ["Protective structures", "Equipment framing"],
    materials: ["Polycarbonate"],
    featured: false,
  },
  {
    id: "cnc-machine-guard",
    name: "CNC Machine Guard",
    categoryId: "machine-guards",
    shortDescription: "Transparent guarding fabricated to fit around CNC and automated machinery.",
    applications: ["CNC machines", "Automated production lines"],
    materials: ["Acrylic", "Polycarbonate"],
    featured: true,
  },
  {
    id: "conveyor-guard-panel",
    name: "Conveyor Guard Panel",
    categoryId: "machine-guards",
    shortDescription: "Guard panelling for conveyor systems, allowing visibility while protecting personnel.",
    applications: ["Conveyor systems", "Production floors"],
    materials: ["Acrylic", "Polycarbonate"],
    featured: false,
  },
  {
    id: "equipment-protective-cover",
    name: "Equipment Protective Cover",
    categoryId: "protective-covers",
    shortDescription: "Fitted covers protecting equipment from dust, debris and incidental contact.",
    applications: ["Idle equipment protection", "Dust protection"],
    materials: ["Acrylic", "Polycarbonate"],
    featured: false,
  },
  {
    id: "control-panel-cover",
    name: "Control Panel Cover",
    categoryId: "protective-covers",
    shortDescription: "Clear covers for control panels and switchgear, maintaining visibility while protecting components.",
    applications: ["Control panels", "Switchgear enclosures"],
    materials: ["Acrylic"],
    featured: false,
  },
  {
    id: "custom-acrylic-tank",
    name: "Custom Acrylic Tank",
    categoryId: "acrylic-tanks",
    shortDescription: "Fabricated acrylic tanks built to your capacity and configuration requirements.",
    applications: ["Process fluid containment", "Display tanks", "Laboratory use"],
    materials: ["Acrylic"],
    featured: true,
  },
  {
    id: "acrylic-storage-box",
    name: "Acrylic Storage Box",
    categoryId: "acrylic-boxes",
    shortDescription: "Clear acrylic boxes fabricated for storage, display or organisation.",
    applications: ["Component storage", "Retail display", "Organisation systems"],
    materials: ["Acrylic"],
    featured: false,
  },
  {
    id: "acrylic-display-cabinet",
    name: "Acrylic Display Cabinet",
    categoryId: "acrylic-cabinets",
    shortDescription: "Cabinets fabricated from acrylic panels for display or light storage use.",
    applications: ["Retail display", "Showroom fixtures"],
    materials: ["Acrylic"],
    featured: false,
  },
  {
    id: "machine-inspection-window",
    name: "Machine Inspection Window",
    categoryId: "inspection-windows",
    shortDescription: "Fitted viewing windows for machine housings, allowing inspection without opening the enclosure.",
    applications: ["Machine housings", "Process monitoring"],
    materials: ["Acrylic", "Polycarbonate"],
    featured: false,
  },
  {
    id: "process-sight-glass",
    name: "Process Sight Glass",
    categoryId: "sight-glasses",
    shortDescription: "Fabricated sight glass components for visual monitoring of enclosed processes.",
    applications: ["Tank level viewing", "Process monitoring"],
    materials: ["Acrylic"],
    featured: false,
  },
  {
    id: "transparent-equipment-enclosure",
    name: "Transparent Equipment Enclosure",
    categoryId: "transparent-enclosures",
    shortDescription: "Fully enclosed transparent housings for equipment requiring visibility and protection.",
    applications: ["Sensitive equipment housing", "Cleanroom-adjacent use"],
    materials: ["Acrylic", "Polycarbonate"],
    featured: true,
  },
  {
    id: "custom-fabricated-part",
    name: "Custom Fabricated Part",
    categoryId: "custom-fabricated-components",
    shortDescription: "Built directly from your drawing, sample or specification when nothing standard fits.",
    applications: ["Non-standard requirements", "One-off engineering parts"],
    materials: ["Acrylic", "Polycarbonate"],
    featured: true,
  },
  {
    id: "commercial-display-fixture",
    name: "Commercial Display Fixture",
    categoryId: "display-commercial-products",
    shortDescription: "Acrylic display and point-of-sale fixtures fabricated for retail and commercial spaces.",
    applications: ["Retail displays", "Point-of-sale fixtures", "Showrooms"],
    materials: ["Acrylic"],
    featured: false,
  },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(product, limit = 4) {
  const sameCategory = PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  // Categories with only one product would otherwise show an empty
  // "Related Products" section — fill remaining slots with other
  // products (featured first) rather than leaving it bare.
  const fillers = PRODUCTS.filter((p) => p.id !== product.id && !sameCategory.includes(p))
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  return [...sameCategory, ...fillers].slice(0, limit);
}
