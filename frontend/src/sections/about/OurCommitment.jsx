import { Ruler, RefreshCw, ShieldCheck } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard.jsx";
import { COMMITMENTS } from "../../data/commitments.data.js";
import "./OurCommitment.css";

const ICONS = { Ruler, RefreshCw, ShieldCheck };

export default function OurCommitment() {
  return (
    <section className="section our-commitment">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Our Commitment</span>
          <h2 className="section__title">What we hold ourselves to</h2>
        </div>

        <div className="our-commitment__grid">
          {COMMITMENTS.map((c) => {
            const Icon = ICONS[c.icon] || Ruler;
            return (
              <GlassCard key={c.id} className="our-commitment__card">
                <span className="our-commitment__icon">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="our-commitment__title">{c.title}</h3>
                <p className="our-commitment__body">{c.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
