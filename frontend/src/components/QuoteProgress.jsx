import { Check } from "lucide-react";
import { QUOTE_STEPS } from "../data/quoteForm.data.js";
import "./QuoteProgress.css";

/**
 * Clicking jumps back to any already-visited step, or to the current
 * one — but never ahead of the furthest step reached, so the wizard
 * can't be skipped past unanswered required fields.
 */
export default function QuoteProgress({ currentIndex, furthestIndex, onStepClick }) {
  return (
    <ol className="quote-progress" aria-label="Quote form progress">
      {QUOTE_STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;
        const isReachable = i <= furthestIndex;
        return (
          <li key={step.id} className="quote-progress__item">
            <button
              type="button"
              className={`quote-progress__node ${isActive ? "quote-progress__node--active" : ""} ${isDone ? "quote-progress__node--done" : ""}`}
              onClick={() => isReachable && onStepClick(i)}
              disabled={!isReachable}
              aria-current={isActive ? "step" : undefined}
            >
              {isDone ? <Check size={14} strokeWidth={2.5} /> : i + 1}
            </button>
            <span className={`quote-progress__label ${isActive ? "quote-progress__label--active" : ""}`}>
              {step.label}
            </span>
            {i < QUOTE_STEPS.length - 1 && (
              <span className={`quote-progress__connector ${isDone ? "quote-progress__connector--done" : ""}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
