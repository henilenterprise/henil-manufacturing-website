// Industries served, for /industries and the homepage teaser. Deliberately
// generic to the industry itself — no specific customer names, logos, or
// case studies are invented here. `categories` and `capabilities` cross-
// reference the real ids in categories.data.js and site.config.js's
// CAPABILITIES list, so the Industries page always points at things that
// actually exist in the catalogue rather than inventing separate claims.

export const INDUSTRIES_DETAIL = [
  {
    id: "pharmaceutical",
    label: "Pharmaceutical",
    icon: "Pill",
    description: "Cleanable, chemical-resistant components for pharmaceutical production and quality environments.",
    commonRequirements: [
      "Low-particulate, easy-to-clean surfaces",
      "Chemical resistance to common cleaning agents",
      "Visibility into enclosed processes",
    ],
    categories: ["transparent-enclosures", "inspection-windows", "sight-glasses", "machine-guards"],
    applications: ["Cleanroom viewing panels", "Process enclosure windows", "Equipment guarding"],
    capabilities: ["custom-fabrication", "bonding", "cnc-routing"],
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: "Compass",
    description: "Fabricated components that fit directly into engineering assemblies and equipment builds.",
    commonRequirements: [
      "Dimensional accuracy to a supplied drawing",
      "Repeatable geometry across a production run",
      "Components that integrate with metal and mechanical parts",
    ],
    categories: ["industrial-acrylic-components", "custom-fabricated-components", "machine-guards"],
    applications: ["Machine panelling", "Equipment enclosures", "Structural infill components"],
    capabilities: ["cnc-routing", "laser-cutting", "custom-fabrication"],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: "Factory",
    description: "Guarding, panelling and enclosures fabricated for production-floor equipment.",
    commonRequirements: [
      "Durable components for continuous production use",
      "Guards that protect personnel without blocking visibility",
      "Consistent quality across repeat orders",
    ],
    categories: ["machine-guards", "protective-covers", "polycarbonate-components"],
    applications: ["Production line guarding", "Equipment covers", "Conveyor safety panels"],
    capabilities: ["cutting", "bending", "bonding"],
  },
  {
    id: "chemical",
    label: "Chemical",
    icon: "FlaskConical",
    description: "Chemically-aware component selection for process and containment environments.",
    commonRequirements: [
      "Material selection suited to chemical exposure",
      "Sealed, bonded assemblies",
      "Clear visibility for process monitoring",
    ],
    categories: ["acrylic-tanks", "sight-glasses", "transparent-enclosures"],
    applications: ["Containment tanks", "Process sight glasses", "Enclosed monitoring windows"],
    capabilities: ["bonding", "custom-fabrication", "cutting"],
  },
  {
    id: "food-processing",
    label: "Food Processing",
    icon: "Utensils",
    description: "Hygienic, cleanable components for food production and packaging lines.",
    commonRequirements: [
      "Smooth, cleanable surfaces",
      "Components suited to washdown environments",
      "Guarding that maintains line visibility",
    ],
    categories: ["machine-guards", "protective-covers", "industrial-acrylic-components"],
    applications: ["Line guarding", "Equipment covers", "Inspection panels"],
    capabilities: ["cutting", "cnc-routing", "bonding"],
  },
  {
    id: "packaging",
    label: "Packaging",
    icon: "Package",
    description: "Guards, covers and fixtures fabricated for packaging line equipment.",
    commonRequirements: [
      "Fast-cycle equipment guarding",
      "Clear panels for line-of-sight monitoring",
      "Components that withstand repeated handling",
    ],
    categories: ["machine-guards", "protective-covers", "display-commercial-products"],
    applications: ["Packaging line guarding", "Equipment covers", "Point-of-sale display fixtures"],
    capabilities: ["cutting", "laser-cutting", "custom-fabrication"],
  },
  {
    id: "automotive",
    label: "Automotive",
    icon: "Car",
    description: "Formed and fabricated components for automotive production and testing environments.",
    commonRequirements: [
      "Impact-resistant materials for production floors",
      "Formed components matching equipment contours",
      "Consistent repeat-order quality",
    ],
    categories: ["polycarbonate-components", "machine-guards", "custom-fabricated-components"],
    applications: ["Test rig guarding", "Equipment covers", "Formed protective panels"],
    capabilities: ["bending", "cnc-routing", "custom-fabrication"],
  },
  {
    id: "industrial-machinery",
    label: "Industrial Machinery",
    icon: "Cog",
    description: "Guards, panels and enclosures fabricated to fit specific machine geometries.",
    commonRequirements: [
      "Guards fitted to exact machine geometry",
      "Durable materials for continuous operation",
      "Fast turnaround for repeat orders",
    ],
    categories: ["machine-guards", "industrial-acrylic-components", "polycarbonate-components"],
    applications: ["Machine guarding", "Control panel fascias", "Equipment enclosures"],
    capabilities: ["cnc-routing", "bending", "bonding"],
  },
  {
    id: "laboratory",
    label: "Laboratory",
    icon: "TestTube",
    description: "Precision-fabricated components for laboratory equipment and workspace fixtures.",
    commonRequirements: [
      "Optical clarity for observation",
      "Chemical resistance for lab environments",
      "Precise, repeatable dimensions",
    ],
    categories: ["sight-glasses", "inspection-windows", "acrylic-boxes"],
    applications: ["Equipment viewing windows", "Sample enclosures", "Storage and organisation fixtures"],
    capabilities: ["laser-cutting", "cnc-routing", "custom-fabrication"],
  },
  {
    id: "retail",
    label: "Retail",
    icon: "ShoppingBag",
    description: "Display and fixture fabrication for retail and commercial environments.",
    commonRequirements: [
      "Visual presentation quality",
      "Durable fixtures for frequent handling",
      "Custom sizing per store or display layout",
    ],
    categories: ["display-commercial-products", "acrylic-cabinets", "acrylic-boxes"],
    applications: ["Retail display fixtures", "Point-of-sale stands", "Showroom cabinetry"],
    capabilities: ["cutting", "bending", "custom-fabrication"],
  },
];

export function getIndustryById(id) {
  return INDUSTRIES_DETAIL.find((i) => i.id === id);
}
