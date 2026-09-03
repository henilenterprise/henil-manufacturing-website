import { FileText, TrendingUp, MessageSquare } from "lucide-react";
import GlassPanel from "../../components/ui/GlassPanel.jsx";
import "./ManufacturingApproach.css";

const PRINCIPLES = [
  {
    icon: FileText,
    title: "Drawing-led",
    description: "We fabricate to what you provide — a drawing, CAD file, sample, or specification — not what happens to already be on a shelf.",
  },
  {
    icon: TrendingUp,
    title: "Quantity-ready",
    description: "Built for prototype-to-production scaling, with the same result on the fiftieth unit as the first.",
  },
  {
    icon: MessageSquare,
    title: "Direct communication",
    description: "You work with the people fabricating your parts, not a layer of account management between you and the shop floor.",
  },
];

export default function ManufacturingApproach() {
  return (
    <section className="section manufacturing-approach">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Our Manufacturing Approach</span>
          <h2 className="section__title">How we think about an order</h2>
        </div>

        <GlassPanel className="manufacturing-approach__panel">
          <p className="manufacturing-approach__intro">
            We don't start from a catalogue and ask you to fit it — we start from your
            requirement and fabricate to that. That shapes everything about how an order
            runs, from the first drawing review through to dispatch.
          </p>

          <div className="manufacturing-approach__principles">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="manufacturing-approach__principle">
                <span className="manufacturing-approach__icon">
                  <p.icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
