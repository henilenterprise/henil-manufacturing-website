import { useState } from "react";
import { ArrowRight } from "lucide-react";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import IndustryVisual from "../components/IndustryVisual.jsx";
import { INDUSTRIES_DETAIL } from "../data/industries.data.js";
import { getCategoryById } from "../data/categories.data.js";
import { CAPABILITIES } from "../config/site.config.js";
import "./IndustriesExplorer.css";

function getCapabilityLabel(id) {
  return CAPABILITIES.find((c) => c.id === id)?.label || id;
}

export default function IndustriesExplorer() {
  const [activeId, setActiveId] = useState(INDUSTRIES_DETAIL[0].id);
  const active = INDUSTRIES_DETAIL.find((i) => i.id === activeId);

  return (
    <section className="section ind-explorer">
      <div className="container ind-explorer__layout">
        <nav className="ind-explorer__tabs" aria-label="Industries">
          {INDUSTRIES_DETAIL.map((ind) => {
            const isActive = ind.id === activeId;
            return (
              <button
                key={ind.id}
                className={`ind-explorer__tab ${isActive ? "ind-explorer__tab--active" : ""}`}
                onClick={() => setActiveId(ind.id)}
                aria-pressed={isActive}
              >
                <IndustryVisual icon={ind.icon} />
                <span>{ind.label}</span>
              </button>
            );
          })}
        </nav>

        <GlassPanel className="ind-explorer__panel" key={active.id}>
          <div className="ind-explorer__top">
            <IndustryVisual icon={active.icon} large />
            <div>
              <h2 className="ind-explorer__title">{active.label}</h2>
              <p className="ind-explorer__description">{active.description}</p>
            </div>
          </div>

          <div className="ind-explorer__details">
            <DetailBlock label="Common Requirements">
              <ul className="ind-explorer__list">
                {active.commonRequirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock label="Relevant Products">
              <div className="ind-explorer__chips">
                {active.categories.map((catId) => {
                  const cat = getCategoryById(catId);
                  return cat ? (
                    <Badge key={catId} variant="outline" tone="neutral">{cat.label}</Badge>
                  ) : null;
                })}
              </div>
            </DetailBlock>

            <DetailBlock label="Applications">
              <ul className="ind-explorer__list">
                {active.applications.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock label="Fabrication Capabilities">
              <div className="ind-explorer__chips">
                {active.capabilities.map((capId) => (
                  <Badge key={capId} variant="solid" tone="accent">{getCapabilityLabel(capId)}</Badge>
                ))}
              </div>
            </DetailBlock>
          </div>

          <div className="ind-explorer__cta">
            <Button
              href={`/quote?industry=${encodeURIComponent(active.id)}&industryLabel=${encodeURIComponent(active.label)}`}
              variant="solid"
              size="md"
              icon={ArrowRight}
            >
              Get a Quote for {active.label}
            </Button>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function DetailBlock({ label, children }) {
  return (
    <div className="ind-explorer__block">
      <span className="ind-explorer__block-label">{label}</span>
      {children}
    </div>
  );
}
