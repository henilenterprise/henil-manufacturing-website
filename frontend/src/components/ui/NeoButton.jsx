import "./NeoButton.css";

/**
 * A tactile, physically-pressable control on the neomorphic surface —
 * distinct from the gold-fill CTA Button. Use for toolbar actions,
 * filter toggles, icon buttons, and other "instrument panel" controls.
 */
export default function NeoButton({
  children,
  icon: Icon,
  active = false,
  size = "md",
  className = "",
  ...rest
}) {
  return (
    <button
      className={`neo-btn neo-btn--${size} ${active ? "neo-btn--active" : ""} ${className}`}
      aria-pressed={active}
      {...rest}
    >
      {Icon && <Icon size={size === "sm" ? 15 : 17} strokeWidth={2} />}
      {children && <span>{children}</span>}
    </button>
  );
}
