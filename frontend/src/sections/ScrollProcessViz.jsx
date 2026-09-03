import { useEffect, useRef, useState } from "react";
import { PenTool, Layers, Scissors, GitMerge, Link2, Search, Truck } from "lucide-react";
import GlassCard from "../components/ui/GlassCard.jsx";
import { PROCESS_STEPS } from "../config/site.config.js";
import { getStepState, isConnectorFilled, resolveActiveIndex } from "../utils/scrollProcess.js";
import "./ScrollProcessViz.css";

const ICONS = {
  design: PenTool,
  material: Layers,
  cutting: Scissors,
  bending: GitMerge,
  bonding: Link2,
  inspection: Search,
  dispatch: Truck,
};

/**
 * Scroll-driven, not click-driven — each step lights up as the visitor
 * scrolls it into a band near the center of the viewport, using
 * IntersectionObserver rather than a scroll-position listener. This is
 * the deliberate performance choice: IntersectionObserver runs off the
 * main thread's scroll handling entirely and only fires on actual
 * threshold crossings, instead of recalculating on every scroll pixel —
 * the difference matters most exactly where it's asked for here,
 * mobile scroll performance.
 */
export default function ScrollProcessViz() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const stationRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observerEntries) => {
        const entries = observerEntries.map((entry) => ({
          index: Number(entry.target.dataset.index),
          isIntersecting: entry.isIntersecting,
        }));
        const resolved = resolveActiveIndex(entries);
        if (resolved !== null) setActiveIndex(resolved);
      },
      // A thin horizontal band near vertical center — a step is
      // "current" once it crosses roughly the middle of the screen.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stationRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section scroll-process">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">The Manufacturing Line</span>
          <h2 className="section__title">From design to dispatch.</h2>
        </div>
      </div>

      <div className="container scroll-process__line">
        {PROCESS_STEPS.map((step, index) => {
          const Icon = ICONS[step.id] || Layers;
          const state = getStepState(index, activeIndex);
          const connectorFilled = isConnectorFilled(index, activeIndex);

          return (
            <div
              key={step.id}
              ref={(el) => (stationRefs.current[index] = el)}
              data-index={index}
              className={`scroll-process__station scroll-process__station--${state}`}
            >
              {index > 0 && (
                <span
                  className={`scroll-process__connector ${connectorFilled ? "scroll-process__connector--filled" : ""}`}
                  aria-hidden="true"
                />
              )}

              <GlassCard className="scroll-process__panel">
                <span className="scroll-process__glow" aria-hidden="true" />
                <span className="scroll-process__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="scroll-process__icon">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="scroll-process__label">{step.label}</h3>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
