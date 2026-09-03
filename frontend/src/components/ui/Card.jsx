import "./Card.css";

/**
 * A solid, opaque surface card — used where dense/critical content
 * (spec tables, RFQ summaries) needs full legibility without any
 * translucency behind it. This is the "restraint" counterpart to
 * GlassCard so glass doesn't get used everywhere by default.
 */
export default function Card({ children, className = "", ...rest }) {
  return (
    <div className={`card ${className}`} {...rest}>
      {children}
    </div>
  );
}
