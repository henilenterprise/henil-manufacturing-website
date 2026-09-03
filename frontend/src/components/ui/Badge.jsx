import "./Badge.css";

/**
 * variant: "solid" | "outline" | "glass"
 * tone: "neutral" | "accent" | "success" | "warning" | "error"
 */
export default function Badge({ children, variant = "outline", tone = "neutral", className = "" }) {
  return (
    <span className={`badge badge--${variant} badge--${tone} ${className}`}>{children}</span>
  );
}
