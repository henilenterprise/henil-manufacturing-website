import GlassBadge from "../components/ui/GlassBadge.jsx";
import "./HeroVisual.css";

/**
 * Original technical illustration — not stock photography. Three layered
 * sheets (representing stacked acrylic/polycarbonate stock), a dashed
 * cut-path on the front sheet with a traveling laser line, and a faint
 * diamond motif echoing the logo mark. Wrapped in a glass frame per the
 * brief; motion is limited to one slow breathing scale and one traveling
 * laser sweep, both disabled under prefers-reduced-motion globally.
 */
export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-visual__frame">
        <svg viewBox="0 0 440 440" className="hero-visual__svg" aria-hidden="true">
          {/* faint diamond motif, echoes the logo mark */}
          <rect
            x="120" y="120" width="200" height="200"
            transform="rotate(45 220 220)"
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity="0.14"
            strokeWidth="1.5"
          />

          {/* back sheet — polycarbonate, slight rotation for depth */}
          <g className="hero-visual__sheet hero-visual__sheet--back">
            <rect x="58" y="46" width="280" height="280" rx="14"
              fill="var(--color-accent)" fillOpacity="0.05"
              stroke="var(--color-accent)" strokeOpacity="0.25" strokeWidth="1"
              transform="rotate(-7 198 186)" />
          </g>

          {/* middle sheet — acrylic */}
          <g className="hero-visual__sheet hero-visual__sheet--mid">
            <rect x="78" y="72" width="280" height="280" rx="14"
              fill="var(--color-accent)" fillOpacity="0.07"
              stroke="var(--color-accent)" strokeOpacity="0.35" strokeWidth="1"
              transform="rotate(4 218 212)" />
          </g>

          {/* front sheet — the one being "cut" */}
          <g className="hero-visual__sheet hero-visual__sheet--front">
            <rect x="70" y="88" width="290" height="270" rx="16"
              fill="var(--color-glass-highlight)" fillOpacity="0.06"
              stroke="var(--color-accent-bright)" strokeOpacity="0.55" strokeWidth="1.25" />

            {/* dashed cut path */}
            <rect x="118" y="140" width="180" height="160" rx="18"
              fill="none"
              stroke="var(--color-accent-bright)"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeDasharray="6 6" />

            {/* corner tick / tolerance marks — decorative technical-drawing motif */}
            <g stroke="var(--color-text-muted)" strokeWidth="1">
              <path d="M108 140 h10 M118 130 v10" />
              <path d="M298 140 h10 M298 130 v10" transform="translate(0,0)" />
            </g>
          </g>

          {/* traveling laser line, clipped to the front sheet's cut path */}
          <clipPath id="cutPathClip">
            <rect x="118" y="140" width="180" height="160" rx="18" />
          </clipPath>
          <rect
            className="hero-visual__laser"
            x="118" y="140" width="3" height="160"
            fill="var(--color-accent-bright)"
            clipPath="url(#cutPathClip)"
          />
        </svg>

        <div className="hero-visual__sweep" aria-hidden="true" />
      </div>

      <GlassBadge tone="accent" className="hero-visual__badge hero-visual__badge--tl">CNC Routing</GlassBadge>
      <GlassBadge tone="accent" className="hero-visual__badge hero-visual__badge--br">Laser Cutting</GlassBadge>
    </div>
  );
}
