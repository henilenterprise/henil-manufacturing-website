// The six-step custom fabrication flow shown on /custom-fabrication.
// Kept separate from the interactive component itself, same pattern as
// every other content dataset in this project.

export const FABRICATION_PROCESS = [
  {
    id: "send-drawing",
    title: "Send Drawing",
    icon: "FileUp",
    description: "Share your engineering drawing, CAD file, sample, dimensions, or specification — however you already have it.",
  },
  {
    id: "requirement-review",
    title: "Requirement Review",
    icon: "ClipboardCheck",
    description: "We review what you've sent and confirm material, quantity, and any details needed before fabrication starts.",
  },
  {
    id: "material-selection",
    title: "Material Selection",
    icon: "Layers",
    description: "Acrylic or polycarbonate is selected based on your application and the requirement confirmed above.",
  },
  {
    id: "fabrication",
    title: "Fabrication",
    icon: "Cog",
    description: "Your component is cut, routed, bent, or bonded according to the confirmed requirement.",
  },
  {
    id: "quality-check",
    title: "Quality Check",
    icon: "BadgeCheck",
    description: "Finished parts are checked against your drawing and specification before they're packed.",
  },
  {
    id: "dispatch",
    title: "Dispatch",
    icon: "Truck",
    description: "Completed components are packed and sent to you.",
  },
];
