import { useMemo, useState } from "react";
import { Layers, ShieldCheck, ArrowRight, MessageCircleQuestion } from "lucide-react";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { MATERIALS } from "../data/materials.data.js";
import { CAPABILITIES_DETAIL } from "../data/capabilities.data.js";
import { PRODUCTS } from "../data/products.data.js";
import { getFabricationOptionsForMaterial, getCommonProductsForMaterial } from "../utils/materialSelector.js";
import "./MaterialSelector.css";

const ICONS = { Layers, ShieldCheck };

export default function MaterialSelector() {
  const [activeId, setActiveId] = useState(MATERIALS[0].id);
  const active = MATERIALS.find((m) => m.id === activeId);
  const ActiveIcon = ICONS[active.icon] || Layers;

  const fabricationOptions = useMemo(
    () => getFabricationOptionsForMaterial(active.label, CAPABILITIES_DETAIL),
    [active.label]
  );
  const commonProducts = useMemo(
    () => getCommonProductsForMaterial(active.label, PRODUCTS, 4),
    [active.label]
  );

  return (
    <section className="section material-selector">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Material Selector</span>
          <h2 className="section__title">Which material fits your part?</h2>
        </div>

        <div className="material-selector__toggle" role="tablist" aria-label="Choose a material">
          {MATERIALS.map((m) => {
            const Icon = ICONS[m.icon] || Layers;
            const isActive = m.id === activeId;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={isActive}
                className={`material-selector__toggle-btn ${isActive ? "material-selector__toggle-btn--active" : ""}`}
                onClick={() => setActiveId(m.id)}
              >
                <Icon size={18} strokeWidth={1.75} />
                {m.label}
              </button>
            );
          })}
        </div>

        <GlassPanel className="material-selector__panel" key={active.id}>
          <div className="material-selector__intro">
            <span className="material-selector__icon">
              <ActiveIcon size={26} strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="material-selector__title">{active.label}</h3>
              <p className="material-selector__tagline">{active.tagline}</p>
            </div>
          </div>

          <div className="material-selector__details">
            <DetailBlock label="Material Characteristics">
              <ul className="material-selector__list">
                {active.characteristics.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock label="Typical Applications">
              <ul className="material-selector__list">
                {active.applications.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock label="Available Thicknesses">
              <p className="material-selector__placeholder">{active.thicknessNote}</p>
            </DetailBlock>

            <DetailBlock label="Fabrication Options">
              <div className="material-selector__chips">
                {fabricationOptions.map((cap) => (
                  <Badge key={cap.id} variant="solid" tone="accent">{cap.title}</Badge>
                ))}
              </div>
            </DetailBlock>
          </div>

          {commonProducts.length > 0 && (
            <div className="material-selector__products">
              <span className="material-selector__block-label">Common Products</span>
              <div className="material-selector__products-grid">
                {commonProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </GlassPanel>

        <GlassPanel className="material-selector__unsure">
          <MessageCircleQuestion size={22} strokeWidth={1.75} />
          <div>
            <h3>Not sure which material you need?</h3>
            <p>Send your requirement and we'll advise on the right material for your application.</p>
          </div>
          <Button href="/quote" variant="solid" size="md" icon={ArrowRight}>
            Get a Quote
          </Button>
        </GlassPanel>
      </div>
    </section>
  );
}

function DetailBlock({ label, children }) {
  return (
    <div className="material-selector__block">
      <span className="material-selector__block-label">{label}</span>
      {children}
    </div>
  );
}
