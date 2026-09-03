// Data for the interactive Material Selector. Two categories of content
// live here, deliberately treated differently:
//
// - `characteristics` and `applications` are general, well-established
//   material-science properties of acrylic and polycarbonate as
//   materials (transparency, relative impact resistance, workability) —
//   the same qualitative facts you'd find in any material reference,
//   not a claim about Henil Enterprise's specific tested output. No
//   exact numbers (impact ratios, temperature ranges, percentages) are
//   stated anywhere below — only qualitative, comparative language.
//
// - `thicknessNote` is explicitly a placeholder, not a real spec. Real
//   available thicknesses depend on current stock and haven't been
//   provided — inventing a range like "3-25mm" here would be exactly
//   the kind of fabricated technical specification this project
//   consistently avoids elsewhere (see productPolicy.data.js).

export const MATERIALS = [
  {
    id: "acrylic",
    label: "Acrylic",
    icon: "Layers",
    tagline: "Clear, rigid, and straightforward to fabricate.",
    characteristics: [
      "Naturally transparent with high optical clarity",
      "Rigid and significantly lighter than glass",
      "Generally easier to cut, machine, and polish to a finished edge than polycarbonate",
      "More prone to cracking under sharp impact than polycarbonate",
    ],
    applications: [
      "Display panels and signage",
      "Point-of-sale and retail fixtures",
      "Enclosures and light-diffusion panels",
      "Protective screens where lighter weight matters",
    ],
    thicknessNote: "Available thickness range to be confirmed — share your requirement and we'll advise on current stock.",
  },
  {
    id: "polycarbonate",
    label: "Polycarbonate",
    icon: "ShieldCheck",
    tagline: "Exceptional impact resistance for demanding environments.",
    characteristics: [
      "Significantly more impact-resistant than acrylic",
      "Performs well across a wide temperature range",
      "Naturally UV-sensitive — often specified with a UV-stable coating for outdoor use",
      "Softer surface than acrylic, more prone to surface scratching",
    ],
    applications: [
      "Machine guards and safety barriers",
      "Impact-resistant equipment covers",
      "Industrial glazing",
      "Outdoor or high-traffic protective housings",
    ],
    thicknessNote: "Available thickness range to be confirmed — share your requirement and we'll advise on current stock.",
  },
];

export function getMaterialById(id) {
  return MATERIALS.find((m) => m.id === id);
}
