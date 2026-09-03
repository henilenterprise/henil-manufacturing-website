// Data for the Industrial Applications section. Every `fabricationMethods`
// entry is a real id from capabilities.data.js — never invented — and
// every `relatedCategoryId` (where one exists) is a real id from
// categories.data.js, so "View Products" links always go somewhere real.
// Two applications (Protective Shields, Laboratory Components) have no
// closely-matching product category yet — `relatedCategoryId` is left
// null for those rather than forced onto a category that doesn't really
// fit, and the section handles that gracefully (see ApplicationCard).
//
// Materials and fabrication methods are kept internally consistent on
// purpose: a material-specific method like "acrylic-bending" only ever
// appears on an application whose `materials` array actually includes
// "Acrylic" — verified automatically in
// frontend/scripts/test-applications.mjs, not just by eye.

export const APPLICATIONS = [
  {
    id: "machine-guards",
    label: "Machine Guards",
    icon: "ShieldCheck",
    description: "Transparent guarding fitted around CNC and automated machinery, maintaining visibility while protecting personnel.",
    materials: ["Acrylic", "Polycarbonate"],
    fabricationMethods: ["cnc-routing", "acrylic-bending", "polycarbonate-bending", "bonding"],
    relatedCategoryId: "machine-guards",
  },
  {
    id: "safety-covers",
    label: "Safety Covers",
    icon: "Shield",
    description: "Fitted covers protecting equipment and personnel from incidental contact, dust, and debris.",
    materials: ["Acrylic", "Polycarbonate"],
    fabricationMethods: ["cnc-routing", "bonding", "custom-fabrication"],
    relatedCategoryId: "protective-covers",
  },
  {
    id: "transparent-enclosures",
    label: "Transparent Enclosures",
    icon: "Box",
    description: "Fully enclosed housings for equipment that needs both visibility and protection.",
    materials: ["Acrylic", "Polycarbonate"],
    fabricationMethods: ["cnc-routing", "bonding", "custom-fabrication"],
    relatedCategoryId: "transparent-enclosures",
  },
  {
    id: "inspection-windows",
    label: "Inspection Windows",
    icon: "Eye",
    description: "Fitted viewing windows allowing inspection of an enclosed process without opening the housing.",
    materials: ["Acrylic", "Polycarbonate"],
    fabricationMethods: ["laser-cutting", "cnc-routing", "bonding"],
    relatedCategoryId: "inspection-windows",
  },
  {
    id: "protective-shields",
    label: "Protective Shields",
    icon: "ShieldAlert",
    description: "Barrier shields positioned between personnel and a hazard, machine, or process.",
    materials: ["Acrylic", "Polycarbonate"],
    fabricationMethods: ["cnc-routing", "custom-fabrication"],
    relatedCategoryId: null,
  },
  {
    id: "tanks",
    label: "Tanks",
    icon: "Droplet",
    description: "Fabricated tanks built to your capacity and configuration requirement.",
    materials: ["Acrylic"],
    fabricationMethods: ["bonding", "custom-fabrication"],
    relatedCategoryId: "acrylic-tanks",
  },
  {
    id: "boxes",
    label: "Boxes",
    icon: "Package",
    description: "Clear boxes fabricated for storage, display, or organisation.",
    materials: ["Acrylic"],
    fabricationMethods: ["laser-cutting", "acrylic-cutting", "bonding"],
    relatedCategoryId: "acrylic-boxes",
  },
  {
    id: "cabinets",
    label: "Cabinets",
    icon: "Archive",
    description: "Cabinets fabricated from acrylic panels for display or light storage use.",
    materials: ["Acrylic"],
    fabricationMethods: ["cnc-routing", "acrylic-bending", "bonding"],
    relatedCategoryId: "acrylic-cabinets",
  },
  {
    id: "industrial-components",
    label: "Industrial Components",
    icon: "Cog",
    description: "Fabricated components built to fit within larger equipment assemblies.",
    materials: ["Acrylic", "Polycarbonate"],
    fabricationMethods: ["cnc-routing", "custom-fabrication"],
    relatedCategoryId: "industrial-acrylic-components",
  },
  {
    id: "laboratory-components",
    label: "Laboratory Components",
    icon: "TestTube",
    description: "Precision-fabricated components for laboratory equipment and workspace fixtures.",
    materials: ["Acrylic", "Polycarbonate"],
    fabricationMethods: ["laser-cutting", "cnc-routing", "custom-fabrication"],
    relatedCategoryId: null,
  },
  {
    id: "display-products",
    label: "Display Products",
    icon: "Store",
    description: "Display and point-of-sale fixtures fabricated for retail and commercial spaces.",
    materials: ["Acrylic"],
    fabricationMethods: ["laser-cutting", "acrylic-cutting", "acrylic-bending"],
    relatedCategoryId: "display-commercial-products",
  },
];
