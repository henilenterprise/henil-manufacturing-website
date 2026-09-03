import { useState } from "react";
import {
  Cog, Zap, Scissors, Shield, GitMerge, GitBranch, Layers, Wrench, ArrowRight,
} from "lucide-react";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import CapabilityVisual from "../components/CapabilityVisual.jsx";
import { CAPABILITIES_DETAIL } from "../data/capabilities.data.js";
import "./CapabilitiesExplorer.css";

const ICONS = { Cog, Zap, Scissors, Shield, GitMerge, GitBranch, Layers, Wrench };

export default function CapabilitiesExplorer() {
  const [activeId, setActiveId] = useState(CAPABILITIES_DETAIL[0].id);
  const active = CAPABILITIES_DETAIL.find((c) => c.id === activeId);
  const ActiveIcon = ICONS[active.icon] || Cog;

  return (
    <section className="section cap-explorer">
      <div className="container cap-explorer__layout">
        <nav className="cap-explorer__tabs" aria-label="Capabilities">
          {CAPABILITIES_DETAIL.map((cap) => {
            const Icon = ICONS[cap.icon] || Cog;
            const isActive = cap.id === activeId;
            return (
              <button
                key={cap.id}
                className={`cap-explorer__tab ${isActive ? "cap-explorer__tab--active" : ""}`}
                onClick={() => setActiveId(cap.id)}
                aria-pressed={isActive}
              >
                <Icon size={18} strokeWidth={1.75} />
                <span>{cap.title}</span>
              </button>
            );
          })}
        </nav>

        <GlassPanel className="cap-explorer__panel" key={active.id}>
          <div className="cap-explorer__top">
            <CapabilityVisual type={active.animation} />
            <div className="cap-explorer__intro">
              <span className="cap-explorer__icon">
                <ActiveIcon size={22} strokeWidth={1.75} />
              </span>
              <h2 className="cap-explorer__title">{active.title}</h2>
              <p className="cap-explorer__description">{active.description}</p>
            </div>
          </div>

          <div className="cap-explorer__details">
            <DetailBlock label="Applications">
              <div className="cap-explorer__chips">
                {active.applications.map((a) => (
                  <Badge key={a} variant="outline" tone="neutral">{a}</Badge>
                ))}
              </div>
            </DetailBlock>

            <DetailBlock label="Suitable Materials">
              <div className="cap-explorer__chips">
                {active.materials.map((m) => (
                  <Badge key={m} variant="solid" tone="accent">{m}</Badge>
                ))}
              </div>
            </DetailBlock>

            <DetailBlock label="Typical Use Cases">
              <ul className="cap-explorer__use-cases">
                {active.useCases.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </DetailBlock>
          </div>

          <div className="cap-explorer__cta">
            <Button
              href={`/quote?capability=${active.id}`}
              variant="solid"
              size="md"
              icon={ArrowRight}
            >
              Get a Quote for {active.title}
            </Button>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function DetailBlock({ label, children }) {
  return (
    <div className="cap-explorer__block">
      <span className="cap-explorer__block-label">{label}</span>
      {children}
    </div>
  );
}
