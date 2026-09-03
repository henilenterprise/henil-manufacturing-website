import MainLayout from "../layouts/MainLayout.jsx";
import CapabilitiesHero from "../sections/CapabilitiesHero.jsx";
import CapabilitiesExplorer from "../sections/CapabilitiesExplorer.jsx";
import FinalCtaSection from "../sections/FinalCtaSection.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";

export default function Capabilities() {
  useSeo(SEO.capabilities);
  useJsonLd(
    buildBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Capabilities", path: "/capabilities" }])
  );

  return (
    <MainLayout>
      <CapabilitiesHero />
      <CapabilitiesExplorer />
      <FinalCtaSection />
    </MainLayout>
  );
}
