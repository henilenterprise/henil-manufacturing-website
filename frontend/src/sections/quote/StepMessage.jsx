import "./QuoteSteps.css";

export default function StepMessage({ data, onChange }) {
  return (
    <div>
      <div className="quote-step__head">
        <h2 className="quote-step__title">
          Anything else?<span className="quote-step__optional-tag">Optional</span>
        </h2>
        <p className="quote-step__hint">Tolerances, finish, packaging preference — anything not covered above.</p>
      </div>

      <label htmlFor="additionalRequirements" className="quote-step__label">Additional Requirements</label>
      <textarea
        id="additionalRequirements"
        className="quote-step__textarea"
        value={data.additionalRequirements}
        onChange={(e) => onChange({ ...data, additionalRequirements: e.target.value })}
        placeholder="Anything else we should know before quoting this?"
      />
    </div>
  );
}
