import "./GlassBadge.css";

export default function GlassBadge({ children, tone = "neutral", className = "" }) {
  return <span className={`glass-badge glass-badge--${tone} ${className}`}>{children}</span>;
}
