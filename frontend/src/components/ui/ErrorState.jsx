import { AlertTriangle } from "lucide-react";
import "./ErrorState.css";

export default function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-state__icon">
        <AlertTriangle size={24} strokeWidth={1.75} />
      </div>
      <h3 className="error-state__title">{title}</h3>
      {description && <p className="error-state__description">{description}</p>}
      {onRetry && (
        <button className="error-state__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
