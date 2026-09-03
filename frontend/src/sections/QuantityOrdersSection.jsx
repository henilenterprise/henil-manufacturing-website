import { useState } from "react";
import {
  Layers, RefreshCw, Wrench, BadgeCheck, FileText, Factory,
  FlaskConical, Package, Boxes, Warehouse, ArrowRight, Info,
} from "lucide-react";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import Button from "../components/ui/Button.jsx";
import { QUANTITY_CATEGORIES, QUANTITY_COMMITMENTS } from "../data/quantityOrders.data.js";
import { buildQuantityQuoteHref } from "../utils/quantityOrders.js";
import "./QuantityOrdersSection.css";

const ICONS = {
  Layers, RefreshCw, Wrench, BadgeCheck, FileText, Factory,
  FlaskConical, Package, Boxes, Warehouse,
};

export default function QuantityOrdersSection() {
  const [activeId, setActiveId] = useState(QUANTITY_CATEGORIES[0].id);
  const active = QUANTITY_CATEGORIES.find((c) => c.id === activeId);

  const quoteHref = buildQuantityQuoteHref(active);

  return (
    <section className="section quantity-orders">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">B2B Quantity Orders</span>
          <h2 className="quantity-orders__title">
            Built for Quantity. <em>Designed for Consistency.</em>
          </h2>
          <p className="quantity-orders__intro">
            Henil Enterprise works with businesses that need batch production and repeat
            orders — not a single retail piece. Every component is built from your drawing,
            to the same standard whether it's the first unit or the fiftieth.
          </p>
        </div>

        <div className="quantity-orders__commitments">
          {QUANTITY_COMMITMENTS.map((item) => {
            const Icon = ICONS[item.icon] || Layers;
            return (
              <div key={item.id} className="quantity-orders__commitment">
                <Icon size={18} strokeWidth={1.75} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="quantity-orders__selector">
          <span className="quantity-orders__selector-label">What stage are you at?</span>
          <div className="quantity-orders__toggle" role="tablist" aria-label="Select an inquiry category">
            {QUANTITY_CATEGORIES.map((cat) => {
              const Icon = ICONS[cat.icon] || Package;
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`quantity-orders__toggle-btn ${isActive ? "quantity-orders__toggle-btn--active" : ""}`}
                  onClick={() => setActiveId(cat.id)}
                >
                  <Icon size={18} strokeWidth={1.75} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <GlassPanel className="quantity-orders__panel" key={active.id}>
            <h3 className="quantity-orders__panel-title">{active.label}</h3>
            <p className="quantity-orders__panel-body">{active.description}</p>

            <Button href={quoteHref} variant="solid" size="md" icon={ArrowRight}>
              Get a Quote
            </Button>
          </GlassPanel>

          <p className="quantity-orders__disclaimer">
            <Info size={14} strokeWidth={2} />
            These are inquiry categories only, not guaranteed production quantities.
          </p>
        </div>
      </div>
    </section>
  );
}
