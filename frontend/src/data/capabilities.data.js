// Detailed dataset for the Capabilities page. Deliberately qualitative —
// no thicknesses, tolerances, bed sizes, or power ratings are invented
// here. Real specifications get added once supplied; until then every
// field describes process and application only.

export const CAPABILITIES_DETAIL = [
  {
    id: "cnc-routing",
    title: "CNC Routing",
    icon: "Cog",
    animation: "route",
    description:
      "Computer-controlled routing for precise profiles, cutouts and edge detailing on flat sheet stock, guided directly by your drawing or CAD file.",
    applications: ["Machine panels", "Enclosure cutouts", "Signage components", "Display fixtures"],
    materials: ["Acrylic", "Polycarbonate"],
    useCases: [
      "Panels with multiple cutouts and mounting holes",
      "Parts requiring consistent repeat geometry across a production run",
      "Components with curved or irregular edge profiles",
    ],
  },
  {
    id: "laser-cutting",
    title: "Laser Cutting",
    icon: "Zap",
    animation: "laser",
    description:
      "Laser-guided cutting for clean edges and fine detail work, suited to intricate profiles that are difficult to achieve with mechanical cutting alone.",
    applications: ["Detailed enclosure parts", "Decorative and branded elements", "Small precision components", "Prototype parts"],
    materials: ["Acrylic", "Polycarbonate"],
    useCases: [
      "Intricate or detailed profile cuts",
      "Small-batch prototyping ahead of a production run",
      "Parts with fine internal features",
    ],
  },
  {
    id: "acrylic-cutting",
    title: "Acrylic Cutting",
    icon: "Scissors",
    animation: "cut",
    description:
      "Straight and profile cutting of acrylic sheet to size, from single pieces to production quantities.",
    applications: ["Machine guards", "Display panels", "Protective screens", "Enclosure panels"],
    materials: ["Acrylic"],
    useCases: [
      "Sheet cut to size for a defined panel dimension",
      "Multiple identical panels for a production run",
      "Panels that will be bonded or assembled into a larger structure",
    ],
  },
  {
    id: "polycarbonate-cutting",
    title: "Polycarbonate Cutting",
    icon: "Shield",
    animation: "cut",
    description:
      "Cutting of polycarbonate sheet for components where impact resistance matters alongside dimensional accuracy.",
    applications: ["Machine guards", "Protective covers", "Industrial glazing", "Safety screens"],
    materials: ["Polycarbonate"],
    useCases: [
      "Guards and covers for moving machine parts",
      "Impact-resistant panels for industrial environments",
      "Components requiring both clarity and durability",
    ],
  },
  {
    id: "acrylic-bending",
    title: "Acrylic Bending",
    icon: "GitMerge",
    animation: "bend",
    description:
      "Heat-formed bending of acrylic sheet to specified angles, producing folded or curved components without seams.",
    applications: ["Display stands", "Enclosure corners", "Formed panels", "Point-of-sale fixtures"],
    materials: ["Acrylic"],
    useCases: [
      "Single-piece components that would otherwise need bonded corners",
      "Formed panels with a consistent bend angle across a batch",
      "Parts combining flat sections with a folded edge",
    ],
  },
  {
    id: "polycarbonate-bending",
    title: "Polycarbonate Bending",
    icon: "GitBranch",
    animation: "bend",
    description:
      "Controlled bending of polycarbonate sheet, taking advantage of its flexibility for formed components that need to withstand impact.",
    applications: ["Curved guards", "Formed covers", "Protective housings", "Structural panel corners"],
    materials: ["Polycarbonate"],
    useCases: [
      "Curved guards that follow a machine's contour",
      "Formed covers requiring a folded edge for rigidity",
      "Components where a bonded seam would be a weak point",
    ],
  },
  {
    id: "bonding",
    title: "Bonding",
    icon: "Layers",
    animation: "bond",
    description:
      "Solvent and adhesive bonding to join acrylic and polycarbonate components into finished multi-part assemblies.",
    applications: ["Enclosures", "Display cases", "Multi-panel guards", "Assembled fixtures"],
    materials: ["Acrylic", "Polycarbonate"],
    useCases: [
      "Multi-panel enclosures assembled from separate cut pieces",
      "Components too large or complex to form from a single sheet",
      "Assemblies combining acrylic and polycarbonate parts",
    ],
  },
  {
    id: "custom-fabrication",
    title: "Custom Fabrication",
    icon: "Wrench",
    animation: "assemble",
    description:
      "End-to-end fabrication from your drawing, dimensions, sample or specification — combining cutting, forming, bonding and finishing into one completed component.",
    applications: ["Non-standard machine components", "One-off engineering parts", "Bespoke enclosures", "Project-specific fixtures"],
    materials: ["Acrylic", "Polycarbonate"],
    useCases: [
      "Parts that don't match any standard catalogue item",
      "Components built directly from a customer-supplied drawing or sample",
      "Projects needing multiple processes combined into one finished part",
    ],
  },
];
