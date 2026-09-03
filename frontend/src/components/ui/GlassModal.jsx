import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import "./GlassModal.css";

/**
 * Accessible glass modal: traps scroll on the body while open, closes on
 * Escape or backdrop click, and returns focus-friendly markup. Render it
 * unconditionally and control visibility with `open` so mount/unmount
 * animation stays simple.
 */
export default function GlassModal({ open, onClose, title, children, footer }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="glass-modal__backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="glass-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={dialogRef}
      >
        <header className="glass-modal__header">
          {title && <h3 className="glass-modal__title">{title}</h3>}
          <button className="glass-modal__close" aria-label="Close dialog" onClick={onClose}>
            <X size={18} strokeWidth={2} />
          </button>
        </header>
        <div className="glass-modal__body">{children}</div>
        {footer && <footer className="glass-modal__footer">{footer}</footer>}
      </div>
    </div>
  );
}
