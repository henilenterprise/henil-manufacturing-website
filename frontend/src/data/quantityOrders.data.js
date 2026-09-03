// Data for the B2B Quantity Orders section. The four quantity
// categories are deliberately free of any number — no unit counts, no
// ranges, no "starting from X" — since these are inquiry categories a
// visitor self-selects to start a conversation, not a minimum order
// quantity or a production guarantee. No MOQ was provided, so none is
// implied here even indirectly (e.g. no "small batch: a few dozen").

export const QUANTITY_CATEGORIES = [
  {
    id: "prototype",
    label: "Prototype",
    icon: "FlaskConical",
    description: "One or a few pieces to validate fit, form, and function before committing to a production run.",
  },
  {
    id: "small-batch",
    label: "Small Batch",
    icon: "Package",
    description: "A limited run — enough to trial in the field or supply an initial rollout.",
  },
  {
    id: "medium-batch",
    label: "Medium Batch",
    icon: "Boxes",
    description: "A structured production run for an established, ongoing requirement.",
  },
  {
    id: "large-batch",
    label: "Large Batch",
    icon: "Warehouse",
    description: "Continuous or high-volume production for sustained operational demand.",
  },
];

export const QUANTITY_COMMITMENTS = [
  { id: "batch-production", label: "Batch Production", icon: "Layers" },
  { id: "repeat-orders", label: "Repeat Orders", icon: "RefreshCw" },
  { id: "custom-components", label: "Custom Components", icon: "Wrench" },
  { id: "consistent-fabrication", label: "Consistent Fabrication", icon: "BadgeCheck" },
  { id: "drawing-based-manufacturing", label: "Drawing-Based Manufacturing", icon: "FileText" },
  { id: "production-quantities", label: "Production Quantities", icon: "Factory" },
];
