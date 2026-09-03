// PLACEHOLDER testimonials — no real customer provided any of this
// content. Two deliberate constraints, stricter than "just don't use a
// real name":
//
// 1. No personal names, invented or otherwise. Even a plausible-sounding
//    fake name ("Rakesh Patel, XYZ Engineering") reads as a real person
//    being quoted, which misrepresents placeholder content as genuine
//    the same way a fabricated statistic would. Attribution here is
//    role + generic company-type only ("Procurement Manager, Industrial
//    Equipment Manufacturer") — descriptive, not a stand-in identity.
// 2. No company names, invented or otherwise — same reasoning as never
//    inventing a client name elsewhere in this project.
//
// Quote content stays generic and unverifiable-because-unspecific on
// purpose: no numbers, no named projects, no dates — themes already
// established elsewhere on the site (drawing-led fabrication,
// consistency, repeat orders, direct communication), phrased as
// plausible customer sentiment, not presented as a captured quote.
//
// Replace every entry here with real testimonials once you have them —
// see the `isPlaceholder` flag, which the section reads to show a
// visible "Sample Testimonials" notice rather than silently passing
// placeholder content off as real.

export const TESTIMONIALS = [
  {
    id: "t1",
    quote: "They worked directly from our drawing, and the parts matched exactly what we specified — no back and forth needed.",
    role: "Procurement Manager",
    companyType: "Industrial Equipment Manufacturer",
    isPlaceholder: true,
  },
  {
    id: "t2",
    quote: "We needed a supplier who could hold the same quality across every batch, not just the first sample. That's what we've gotten.",
    role: "Operations Head",
    companyType: "Packaging Company",
    isPlaceholder: true,
  },
  {
    id: "t3",
    quote: "Sending a sample and getting a matching fabricated part back made switching suppliers straightforward.",
    role: "Design Engineer",
    companyType: "Automotive Component Manufacturer",
    isPlaceholder: true,
  },
  {
    id: "t4",
    quote: "Direct communication with the people actually building the parts made a real difference compared to our previous supplier.",
    role: "Plant Manager",
    companyType: "Food Processing Company",
    isPlaceholder: true,
  },
  {
    id: "t5",
    quote: "They took on a component that didn't fit any standard catalogue and built it to our specification.",
    role: "Supply Chain Lead",
    companyType: "Pharmaceutical Equipment Supplier",
    isPlaceholder: true,
  },
];
