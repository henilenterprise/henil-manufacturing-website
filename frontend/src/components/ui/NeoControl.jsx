import "./NeoControl.css";

/**
 * A segmented, tactile control for choosing one of a few options —
 * material type, unit system, view mode, etc. Reads as a single
 * embossed instrument rather than a row of separate buttons.
 */
export default function NeoControl({ options, value, onChange, className = "" }) {
  return (
    <div className={`neo-control ${className}`} role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          className={`neo-control__option ${value === opt.value ? "neo-control__option--active" : ""}`}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
