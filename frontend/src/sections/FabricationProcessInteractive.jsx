import { useEffect, useRef, useState } from "react";
import { FileUp, ClipboardCheck, Layers, Cog, BadgeCheck, Truck } from "lucide-react";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import { FABRICATION_PROCESS } from "../data/fabricationProcess.data.js";
import "./FabricationProcessInteractive.css";

const ICONS = { FileUp, ClipboardCheck, Layers, Cog, BadgeCheck, Truck };
const AUTO_ADVANCE_MS = 4000;

/**
 * Auto-advances through the six steps to draw the eye on first view, but
 * any click takes full manual control and stops the auto-advance —
 * "interactive" means the visitor drives it, not just watches it loop.
 */
export default function FabricationProcessInteractive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % FABRICATION_PROCESS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [autoPlay]);

  // On mobile the stepper is a horizontal scroller narrower than its
  // content (six 108px steps vs. a ~320-390px viewport) — without this,
  // the auto-advance timer above keeps moving the active step further
  // right every 4 seconds until it scrolls completely out of view,
  // leaving no visible indication of which step is active or that
  // anything is happening at all. `inline: "center"` also matters for
  // touch/click selection, not just auto-advance: tapping the last
  // visible step should bring it fully into view instead of leaving it
  // flush against the scroll container's edge.
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    stepRefs.current[activeIndex]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  const selectStep = (index) => {
    setAutoPlay(false);
    setActiveIndex(index);
  };

  const active = FABRICATION_PROCESS[activeIndex];
  const ActiveIcon = ICONS[active.icon] || Cog;

  return (
    <section className="section fab-process">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">How It Works</span>
          <h2 className="section__title">From your drawing to your dock.</h2>
        </div>

        <div className="fab-process__stepper" role="tablist" aria-label="Fabrication process steps">
          {FABRICATION_PROCESS.map((step, i) => {
            const Icon = ICONS[step.icon] || Cog;
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            return (
              <button
                key={step.id}
                ref={(el) => (stepRefs.current[i] = el)}
                role="tab"
                aria-selected={isActive}
                className={`fab-process__step ${isActive ? "fab-process__step--active" : ""} ${isPast ? "fab-process__step--past" : ""}`}
                onClick={() => selectStep(i)}
              >
                <span className="fab-process__step-node">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="fab-process__step-label">
                  <span className="fab-process__step-number">{String(i + 1).padStart(2, "0")}</span>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        <GlassPanel className="fab-process__detail" key={active.id}>
          <span className="fab-process__detail-icon">
            <ActiveIcon size={24} strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="fab-process__detail-title">
              Step {activeIndex + 1} — {active.title}
            </h3>
            <p className="fab-process__detail-body">{active.description}</p>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
