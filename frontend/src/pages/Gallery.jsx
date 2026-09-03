import MainLayout from "../layouts/MainLayout.jsx";
import GalleryHero from "../sections/GalleryHero.jsx";
import GalleryExplorer from "../sections/GalleryExplorer.jsx";
import FinalCtaSection from "../sections/FinalCtaSection.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";

export default function Gallery() {
  useSeo(SEO.gallery);
  useJsonLd(buildBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]));

  return (
    <MainLayout>
      <GalleryHero />
      <GalleryExplorer />
      <FinalCtaSection />
    </MainLayout>
  );
}
