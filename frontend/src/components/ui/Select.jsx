import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import "./Select.css";

/**
 * options: [{ label, value }]
 */
export default function Select({ label, options, value, onChange, placeholder = "Select…", className = "" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div className={`select-group ${className}`} ref={rootRef}>
      {label && <label className="select-group__label">{label}</label>}
      <button
        type="button"
        className="select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={selected ? "" : "select__placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={15} className={`select__chevron ${open ? "select__chevron--open" : ""}`} />
      </button>

      {open && (
        <ul className="select__options" role="listbox">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                role="option"
                aria-selected={opt.value === value}
                className="select__option"
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {opt.value === value && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
