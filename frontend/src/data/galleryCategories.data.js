// The 10 gallery categories. Icons are used for placeholder tiles (see
// GalleryTile.jsx) until real photos exist for a given slot.

export const GALLERY_CATEGORIES = [
  { id: "products", label: "Products", icon: "Package" },
  { id: "factory", label: "Factory", icon: "Factory" },
  { id: "machinery", label: "Machinery", icon: "Cog" },
  { id: "cnc", label: "CNC", icon: "Settings2" },
  { id: "laser-cutting", label: "Laser Cutting", icon: "Zap" },
  { id: "bending", label: "Bending", icon: "GitMerge" },
  { id: "fabrication", label: "Fabrication", icon: "Wrench" },
  { id: "finished-products", label: "Finished Products", icon: "BadgeCheck" },
  { id: "packaging", label: "Packaging", icon: "Box" },
  { id: "dispatch", label: "Dispatch", icon: "Truck" },
];

export function getGalleryCategoryById(id) {
  return GALLERY_CATEGORIES.find((c) => c.id === id);
}
