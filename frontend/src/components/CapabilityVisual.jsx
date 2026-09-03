import "./CapabilityVisual.css";

/**
 * Small looping process illustration per capability. Purely decorative
 * and abstract — no specific machine, dimension, or spec is depicted,
 * only the shape of the process (a bit tracing a path, a beam cutting
 * through, a sheet folding, two pieces joining, parts assembling).
 * All motion is disabled globally under prefers-reduced-motion.
 */
export default function CapabilityVisual({ type }) {
  return (
    <div className={`cap-visual cap-visual--${type}`}>
      <svg viewBox="0 0 200 150" className="cap-visual__svg" aria-hidden="true">
        {type === "route" && <RouteAnim />}
        {type === "laser" && <LaserAnim />}
        {type === "cut" && <CutAnim />}
        {type === "bend" && <BendAnim />}
        {type === "bond" && <BondAnim />}
        {type === "assemble" && <AssembleAnim />}
      </svg>
    </div>
  );
}

function RouteAnim() {
  return (
    <>
      <rect x="30" y="25" width="140" height="100" rx="10" fill="none"
        stroke="var(--color-glass-border-strong)" strokeWidth="1.5" />
      <rect x="55" y="45" width="90" height="60" rx="8" fill="none"
        stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="5 5" />
      <circle className="cap-visual__bit" cx="55" cy="45" r="4.5" fill="var(--color-accent-bright)" />
    </>
  );
}

function LaserAnim() {
  return (
    <>
      <rect x="30" y="25" width="140" height="100" rx="10" fill="none"
        stroke="var(--color-glass-border-strong)" strokeWidth="1.5" />
      <line className="cap-visual__laser-line" x1="45" y1="75" x2="155" y2="75"
        stroke="var(--color-accent-bright)" strokeWidth="2" strokeLinecap="round" />
      <circle className="cap-visual__laser-dot" cx="45" cy="75" r="5" fill="var(--color-accent-bright)" />
    </>
  );
}

function CutAnim() {
  return (
    <>
      <g className="cap-visual__panel cap-visual__panel--left">
        <rect x="30" y="25" width="65" height="100" rx="8" fill="var(--color-accent)" fillOpacity="0.06"
          stroke="var(--color-glass-border-strong)" strokeWidth="1.5" />
      </g>
      <g className="cap-visual__panel cap-visual__panel--right">
        <rect x="105" y="25" width="65" height="100" rx="8" fill="var(--color-accent)" fillOpacity="0.06"
          stroke="var(--color-glass-border-strong)" strokeWidth="1.5" />
      </g>
      <line className="cap-visual__cut-line" x1="100" y1="20" x2="100" y2="130"
        stroke="var(--color-accent-bright)" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function BendAnim() {
  return (
    <g className="cap-visual__bend-scene">
      <rect x="35" y="60" width="65" height="10" rx="4" fill="var(--color-accent)" fillOpacity="0.5" />
      <g className="cap-visual__flap">
        <rect x="100" y="60" width="65" height="10" rx="4" fill="var(--color-accent-bright)" fillOpacity="0.8" />
      </g>
    </g>
  );
}

function BondAnim() {
  return (
    <>
      <g className="cap-visual__piece cap-visual__piece--left">
        <rect x="20" y="45" width="60" height="60" rx="8" fill="var(--color-accent)" fillOpacity="0.08"
          stroke="var(--color-glass-border-strong)" strokeWidth="1.5" />
      </g>
      <g className="cap-visual__piece cap-visual__piece--right">
        <rect x="120" y="45" width="60" height="60" rx="8" fill="var(--color-accent)" fillOpacity="0.08"
          stroke="var(--color-glass-border-strong)" strokeWidth="1.5" />
      </g>
      <line className="cap-visual__seam" x1="100" y1="40" x2="100" y2="110"
        stroke="var(--color-accent-bright)" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

function AssembleAnim() {
  return (
    <>
      <rect className="cap-visual__part cap-visual__part--1" x="40" y="30" width="34" height="34" rx="7"
        fill="var(--color-accent)" fillOpacity="0.5" />
      <rect className="cap-visual__part cap-visual__part--2" x="150" y="90" width="30" height="30" rx="15"
        fill="var(--color-accent-bright)" fillOpacity="0.4" />
      <rect className="cap-visual__part cap-visual__part--3" x="30" y="95" width="28" height="28" rx="6"
        fill="var(--color-accent)" fillOpacity="0.35" />
      <rect x="85" y="55" width="40" height="40" rx="8" fill="none"
        stroke="var(--color-accent-bright)" strokeWidth="1.5" strokeDasharray="4 4" />
    </>
  );
}
