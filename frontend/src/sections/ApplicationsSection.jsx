import { ArrowRight } from "lucide-react";
import GlassCard from "../components/ui/GlassCard.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import ApplicationVisual from "../components/ApplicationVisual.jsx";
import { APPLICATIONS } from "../data/applications.data.js";
import { CAPABILITIES_DETAIL } from "../data/capabilities.data.js";
import { CATEGORIES } from "../data/categories.data.js";
import { resolveFabricationMethods, resolveRelatedCategory, buildApplicationQuoteHref } from "../utils/applications.js";
import "./ApplicationsSection.css";

export default function ApplicationsSection() {
  return (
    <section className="section applications">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Industrial Applications</span>
          <h2 className="section__title">Where this fabrication gets used</h2>
          <p className="section__sub">
            Eleven examples of where acrylic and polycarbonate fabrication applies — every
            one built to your drawing, not pulled from a fixed mould.
          </p>
        </div>

        <div className="applications__grid">
          {APPLICATIONS.map((app) => {
            const methods = resolveFabricationMethods(app.fabricationMethods, CAPABILITIES_DETAIL);
            const relatedCategory = resolveRelatedCategory(app.relatedCategoryId, CATEGORIES);
            const quoteHref = buildApplicationQuoteHref(app);

            return (
              <GlassCard key={app.id} className="applications__card">
                <ApplicationVisual icon={app.icon} />

                <h3 className="applications__card-title">{app.label}</h3>
                <p className="applications__card-body">{app.description}</p>

                <div className="applications__block">
                  <span className="applications__block-label">Material</span>
                  <div className="applications__chips">
                    {app.materials.map((m) => (
                      <Badge key={m} variant="solid" tone="accent">{m}</Badge>
                    ))}
                  </div>
                </div>

                <div className="applications__block">
                  <span className="applications__block-label">Fabrication Method</span>
                  <div className="applications__chips">
                    {methods.map((method) => (
                      <Badge key={method.id} variant="outline" tone="neutral">{method.title}</Badge>
                    ))}
                  </div>
                </div>

                <div className="applications__card-foot">
                  {relatedCategory && (
                    <a href="/products" className="applications__category-link">
                      View {relatedCategory.label}
                    </a>
                  )}
                  <Button href={quoteHref} variant="ghost" size="sm" icon={ArrowRight}>
                    Get a Quote
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
