import { Loader2 } from "lucide-react";
import "./Loading.css";

export function Spinner({ size = 20, label }) {
  return (
    <span className="spinner-row">
      <Loader2 size={size} className="spinner" />
      {label && <span className="spinner-row__label">{label}</span>}
    </span>
  );
}

/** lines: number of skeleton bars to render */
export function Skeleton({ lines = 3, className = "" }) {
  return (
    <div className={`skeleton ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton__line" style={{ width: i === lines - 1 ? "60%" : "100%" }} />
      ))}
    </div>
  );
}
