import MainLayout from "../layouts/MainLayout.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import CapabilityStrip from "../sections/CapabilityStrip.jsx";
import ProductsSection from "../sections/ProductsSection.jsx";
import CustomFabricationSection from "../sections/CustomFabricationSection.jsx";
import QuantityOrdersSection from "../sections/QuantityOrdersSection.jsx";
import IndustriesSection from "../sections/IndustriesSection.jsx";
import WhyHenilSection from "../sections/WhyHenilSection.jsx";
import ScrollProcessViz from "../sections/ScrollProcessViz.jsx";
import TrustSection from "../sections/TrustSection.jsx";
import FinalCtaSection from "../sections/FinalCtaSection.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildLocalBusinessStructuredData } from "../utils/structuredData.js";

export default function Home() {
  useSeo(SEO.home);
  // LocalBusiness is mounted here and on /contact only — "where
  // appropriate" for a physical location, not sitewide (Organization,
  // in App.jsx, already covers the entity-level description on every
  // page). Home is the site's primary landing point for local search.
  useJsonLd(buildLocalBusinessStructuredData());

  return (
    <MainLayout>
      <HeroSection />
      <CapabilityStrip />
      <ProductsSection />
      <CustomFabricationSection />
      <QuantityOrdersSection />
      <IndustriesSection />
      <WhyHenilSection />
      <ScrollProcessViz />
      <TrustSection />
      <FinalCtaSection />
    </MainLayout>
  );
}
