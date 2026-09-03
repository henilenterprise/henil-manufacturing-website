// Configuration for the /quote RFQ wizard. Kept separate from the step
// components themselves, same pattern as every other dataset here.

export const QUOTE_STEPS = [
  { id: "company", label: "Company" },
  { id: "requirement", label: "Requirement" },
  { id: "dimensions", label: "Dimensions" },
  { id: "file", label: "File" },
  { id: "delivery", label: "Delivery" },
  { id: "message", label: "Message" },
  { id: "review", label: "Review" },
];

export const MATERIAL_OPTIONS = [
  { label: "Acrylic", value: "acrylic" },
  { label: "Polycarbonate", value: "polycarbonate" },
  { label: "Not sure — advise me", value: "unsure" },
];

export function emptyQuoteFormState() {
  return {
    company: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      gstNumber: "",
      city: "",
      country: "",
    },
    requirement: {
      product: "",
      productId: "",
      productUrl: "",
      quantity: "",
      material: "",
      thickness: "",
    },
    dimensions: {
      length: "",
      width: "",
      height: "",
      customDimensions: "",
      drawingReference: "",
    },
    files: [],
    delivery: {
      requiredDate: "",
      location: "",
    },
    message: {
      additionalRequirements: "",
    },
  };
}
