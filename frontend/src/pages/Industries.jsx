import MainLayout from "../layouts/MainLayout.jsx";
import IndustriesHero from "../sections/IndustriesHero.jsx";
import IndustriesExplorer from "../sections/IndustriesExplorer.jsx";
import FinalCtaSection from "../sections/FinalCtaSection.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";

export default function Industries() {
  useSeo(SEO.industries);
  useJsonLd(
    buildBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])
  );

  return (
    <MainLayout>
      <IndustriesHero />
      <IndustriesExplorer />
      <FinalCtaSection />
    </MainLayout>
  );
}
