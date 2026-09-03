// Product category taxonomy for /products. Configurable in one place —
// add, remove, rename, or reorder a category here and the filter chips,
// the category badge on each card, and the sort-by-category grouping all
// update automatically. `icon` is a lucide-react icon name used for the
// placeholder product visual (see ProductVisual.jsx) until real product
// photography is supplied.

export const CATEGORIES = [
  { id: "industrial-acrylic-components", label: "Industrial Acrylic Components", icon: "Layers" },
  { id: "polycarbonate-components", label: "Polycarbonate Components", icon: "Boxes" },
  { id: "machine-guards", label: "Machine Guards", icon: "ShieldCheck" },
  { id: "protective-covers", label: "Protective Covers", icon: "Shield" },
  { id: "acrylic-tanks", label: "Acrylic Tanks", icon: "Droplet" },
  { id: "acrylic-boxes", label: "Acrylic Boxes", icon: "Package" },
  { id: "acrylic-cabinets", label: "Acrylic Cabinets", icon: "Archive" },
  { id: "inspection-windows", label: "Inspection Windows", icon: "Eye" },
  { id: "sight-glasses", label: "Sight Glasses", icon: "Aperture" },
  { id: "transparent-enclosures", label: "Transparent Enclosures", icon: "Box" },
  { id: "custom-fabricated-components", label: "Custom Fabricated Components", icon: "Wrench" },
  { id: "display-commercial-products", label: "Display & Commercial Products", icon: "Store" },
];

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}
