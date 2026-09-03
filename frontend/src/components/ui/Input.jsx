import NeoInput from "./NeoInput.jsx";
import "./Input.css";

/**
 * variant: "flat" (plain surface, default for most forms) | "glass" (sits
 * on top of glass panels) | "neo" (delegates to the tactile NeoInput)
 */
export default function Input({ variant = "flat", label, id, error, hint, icon: Icon, className = "", ...rest }) {
  if (variant === "neo") {
    return <NeoInput label={label} id={id} error={error} hint={hint} icon={Icon} className={className} {...rest} />;
  }

  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={inputId} className="input-group__label">{label}</label>}
      <div className={`input input--${variant} ${error ? "input--error" : ""}`}>
        {Icon && <Icon size={16} strokeWidth={2} className="input__icon" />}
        <input id={inputId} {...rest} />
      </div>
      {error && <span className="input-group__error">{error}</span>}
      {!error && hint && <span className="input-group__hint">{hint}</span>}
    </div>
  );
}
