import MainLayout from "../layouts/MainLayout.jsx";
import FaqAccordion from "../components/FaqAccordion.jsx";
import { FAQ_ITEMS } from "../data/faq.data.js";
import { buildFaqStructuredData } from "../utils/faq.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { useSeo } from "../hooks/useSeo.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./Faq.css";

export default function Faq() {
  useSeo(SEO.faq);
  useJsonLd(buildFaqStructuredData(FAQ_ITEMS));
  useJsonLd(buildBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]));

  return (
    <MainLayout>
      <section className="faq-page">
        <div className="container faq-page__head">
          <span className="eyebrow">Frequently Asked Questions</span>
          <h1 className="faq-page__title">Questions we hear most</h1>
          <p className="faq-page__sub">
            Straightforward answers about what we fabricate, how we work, and how to get a
            quote started.
          </p>
        </div>

        <div className="container">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>
    </MainLayout>
  );
}
