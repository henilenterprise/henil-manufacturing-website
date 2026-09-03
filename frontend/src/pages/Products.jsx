import MainLayout from "../layouts/MainLayout.jsx";
import ProductsHero from "../sections/ProductsHero.jsx";
import MaterialSelector from "../sections/MaterialSelector.jsx";
import ProductsExplorer from "../sections/ProductsExplorer.jsx";
import ApplicationsSection from "../sections/ApplicationsSection.jsx";
import FinalCtaSection from "../sections/FinalCtaSection.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";

export default function Products() {
  useSeo(SEO.products);
  useJsonLd(buildBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }]));

  return (
    <MainLayout>
      <ProductsHero />
      <MaterialSelector />
      <ProductsExplorer />
      <ApplicationsSection />
      <FinalCtaSection />
    </MainLayout>
  );
}
