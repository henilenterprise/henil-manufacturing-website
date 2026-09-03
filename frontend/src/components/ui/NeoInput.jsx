import "./NeoInput.css";

export default function NeoInput({
  label,
  id,
  error,
  hint,
  icon: Icon,
  className = "",
  ...rest
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`neo-input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="neo-input-group__label">
          {label}
        </label>
      )}
      <div className={`neo-input ${error ? "neo-input--error" : ""}`}>
        {Icon && <Icon size={16} strokeWidth={2} className="neo-input__icon" />}
        <input id={inputId} {...rest} />
      </div>
      {error && <span className="neo-input-group__error">{error}</span>}
      {!error && hint && <span className="neo-input-group__hint">{hint}</span>}
    </div>
  );
}
