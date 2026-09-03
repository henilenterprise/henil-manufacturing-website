import "./GlassPanel.css";

/**
 * A section-scale glass surface for wrapping bigger blocks of content
 * (e.g. an RFQ form, a full capability breakdown) rather than a single
 * small card. Supports an optional eyebrow + title header row.
 */
export default function GlassPanel({ eyebrow, title, actions, children, className = "" }) {
  return (
    <section className={`glass-panel ${className}`}>
      {(eyebrow || title || actions) && (
        <header className="glass-panel__header">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2 className="glass-panel__title">{title}</h2>}
          </div>
          {actions && <div className="glass-panel__actions">{actions}</div>}
        </header>
      )}
      <div className="glass-panel__body">{children}</div>
    </section>
  );
}
