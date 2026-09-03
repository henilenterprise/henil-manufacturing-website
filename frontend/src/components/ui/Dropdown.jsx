import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Dropdown.css";

/**
 * items: [{ label, onSelect, danger? }]
 */
export default function Dropdown({ trigger, items, align = "left", className = "" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`dropdown ${className}`} ref={rootRef}>
      <button
        type="button"
        className="dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {trigger}
        <ChevronDown size={15} className={`dropdown__chevron ${open ? "dropdown__chevron--open" : ""}`} />
      </button>

      {open && (
        <div className={`dropdown__menu dropdown__menu--${align}`} role="menu">
          {items.map((item, i) => (
            <button
              key={i}
              role="menuitem"
              className={`dropdown__item ${item.danger ? "dropdown__item--danger" : ""}`}
              onClick={() => {
                item.onSelect?.();
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
