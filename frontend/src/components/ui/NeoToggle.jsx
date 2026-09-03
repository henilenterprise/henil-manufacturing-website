import "./NeoToggle.css";

export default function NeoToggle({ checked, onChange, label, id, className = "" }) {
  const toggleId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={toggleId} className={`neo-toggle-row ${className}`}>
      {label && <span className="neo-toggle-row__label">{label}</span>}
      <span className={`neo-toggle ${checked ? "neo-toggle--on" : ""}`}>
        <input
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="neo-toggle__input"
        />
        <span className="neo-toggle__track">
          <span className="neo-toggle__thumb" />
        </span>
      </span>
    </label>
  );
}
