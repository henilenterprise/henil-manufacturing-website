import "./GlassCard.css";

/**
 * The base glass surface: translucent, blurred, gold hairline border,
 * soft top-edge highlight for depth. Use for content cards, panels
 * inside sections, product tiles, etc.
 */
export default function GlassCard({ children, as: Tag = "div", padding = "md", className = "", ...rest }) {
  return (
    <Tag className={`glass-card glass-card--pad-${padding} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
