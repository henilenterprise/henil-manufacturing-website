import {
  Wrench,
  Package,
  BookOpenCheck,
  BadgeCheck,
  SlidersHorizontal,
  Handshake,
} from "lucide-react";
import GlassCard from "../components/ui/GlassCard.jsx";
import { WHY_HENIL } from "../config/site.config.js";
import "./WhyHenilSection.css";

const ICONS = {
  "custom-fabrication": Wrench,
  "quantity-orders": Package,
  "engineering-understanding": BookOpenCheck,
  "consistent-quality": BadgeCheck,
  "flexible-production": SlidersHorizontal,
  "b2b-support": Handshake,
};

export default function WhyHenilSection({ eyebrow = "Why Henil", title = "Built around how you actually order" }) {
  return (
    <section className="section why-henil">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section__title">{title}</h2>
        </div>

        <div className="why-henil__grid">
          {WHY_HENIL.map((item) => {
            const Icon = ICONS[item.id] || Wrench;
            return (
              <GlassCard key={item.id} className="why-henil__card">
                <span className="why-henil__icon">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="why-henil__title">{item.title}</h3>
                <p className="why-henil__body">{item.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
