import MainLayout from "../layouts/MainLayout.jsx";
import CustomFabricationHero from "../sections/CustomFabricationHero.jsx";
import FabricationProcessInteractive from "../sections/FabricationProcessInteractive.jsx";
import FinalCtaSection from "../sections/FinalCtaSection.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";

export default function CustomFabrication() {
  useSeo({
    title: "Custom Acrylic & Polycarbonate Fabrication | Ahmedabad",
    description:
      "Custom acrylic products fabricated from your drawing, dimensions, sample or CAD file — cutting, bending and bonding combined into one finished part, from our Ahmedabad facility.",
    path: "/custom-fabrication",
  });
  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Custom Fabrication", path: "/custom-fabrication" },
    ])
  );

  return (
    <MainLayout>
      <CustomFabricationHero />
      <FabricationProcessInteractive />
      <FinalCtaSection />
    </MainLayout>
  );
}
