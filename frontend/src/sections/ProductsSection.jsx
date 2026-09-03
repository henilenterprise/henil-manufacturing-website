import { ArrowRight, Layers, Boxes, ShieldCheck, Settings2 } from "lucide-react";
import GlassCard from "../components/ui/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import DownloadBrochureButton from "../components/DownloadBrochureButton.jsx";
import { PRODUCT_CATEGORIES } from "../config/site.config.js";
import "./ProductsSection.css";

const ICONS = {
  "acrylic-sheets": Layers,
  "polycarbonate-components": Boxes,
  "machine-guards": ShieldCheck,
  "engineering-parts": Settings2,
};

export default function ProductsSection() {
  return (
    <section className="section products">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Featured Categories</span>
          <h2 className="section__title">Products</h2>
        </div>

        <div className="products__grid">
          {PRODUCT_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.id] || Layers;
            return (
              <GlassCard key={cat.id} className="products__card" as="a" href="/products">
                <span className="products__icon">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="products__card-title">{cat.title}</h3>
                <p className="products__card-body">{cat.description}</p>
                <span className="products__card-link">
                  Explore <ArrowRight size={14} />
                </span>
              </GlassCard>
            );
          })}
        </div>

        <div className="products__foot">
          <Button href="/products" variant="ghost" size="md" icon={ArrowRight}>
            View all products
          </Button>
          <DownloadBrochureButton />
        </div>
      </div>
    </section>
  );
}
