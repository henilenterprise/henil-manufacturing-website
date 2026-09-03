import { Cog, Zap, GitMerge, Scissors, Layers, Wrench } from "lucide-react";
import { CAPABILITIES } from "../config/site.config.js";
import "./CapabilityStrip.css";

const ICONS = {
  "cnc-routing": Cog,
  "laser-cutting": Zap,
  bending: GitMerge,
  cutting: Scissors,
  bonding: Layers,
  "custom-fabrication": Wrench,
};

export default function CapabilityStrip() {
  return (
    <section className="cap-strip">
      <div className="container cap-strip__row">
        {CAPABILITIES.map((cap) => {
          const Icon = ICONS[cap.id] || Cog;
          return (
            <a href="/capabilities" className="cap-strip__item" key={cap.id}>
              <span className="cap-strip__icon">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <span className="cap-strip__label">{cap.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
