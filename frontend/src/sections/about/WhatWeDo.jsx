import { Layers, FileCode2, Building2, Package } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard.jsx";
import "./WhatWeDo.css";

const ITEMS = [
  {
    icon: Layers,
    title: "Acrylic & Polycarbonate Manufacturing",
    description: "Sheet material cut, formed, and finished into components, panels, and enclosures.",
  },
  {
    icon: FileCode2,
    title: "Custom Fabrication",
    description: "Built to your drawing, CAD file, sample, or specification — not a fixed catalogue item.",
  },
  {
    icon: Building2,
    title: "B2B Manufacturing",
    description: "We work directly with businesses — engineering teams, procurement departments, and OEMs.",
  },
  {
    icon: Package,
    title: "Quantity Orders",
    description: "Structured for production quantities and repeat orders, not single pieces.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="section what-we-do">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">What We Do</span>
          <h2 className="section__title">Four things, done consistently</h2>
        </div>

        <div className="what-we-do__grid">
          {ITEMS.map((item) => (
            <GlassCard key={item.title} className="what-we-do__card">
              <span className="what-we-do__icon">
                <item.icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="what-we-do__title">{item.title}</h3>
              <p className="what-we-do__body">{item.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
