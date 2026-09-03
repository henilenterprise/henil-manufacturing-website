import MainLayout from "../layouts/MainLayout.jsx";
import AboutHero from "../sections/about/AboutHero.jsx";
import WhoWeAre from "../sections/about/WhoWeAre.jsx";
import WhatWeDo from "../sections/about/WhatWeDo.jsx";
import ManufacturingApproach from "../sections/about/ManufacturingApproach.jsx";
import AboutCapabilities from "../sections/about/AboutCapabilities.jsx";
import OurCommitment from "../sections/about/OurCommitment.jsx";
import WhyHenilSection from "../sections/WhyHenilSection.jsx";
import FinalCtaSection from "../sections/FinalCtaSection.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";

export default function About() {
  useSeo(SEO.about);
  useJsonLd(buildBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]));

  return (
    <MainLayout>
      <AboutHero />
      <WhoWeAre />
      <WhatWeDo />
      <ManufacturingApproach />
      <AboutCapabilities />
      <OurCommitment />
      <WhyHenilSection
        eyebrow="Why Companies Work With Us"
        title="What repeat customers point to"
      />
      <FinalCtaSection />
    </MainLayout>
  );
}
