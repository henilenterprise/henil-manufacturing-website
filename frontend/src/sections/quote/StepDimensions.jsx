import Input from "../../components/ui/Input.jsx";
import "./QuoteSteps.css";

export default function StepDimensions({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div>
      <div className="quote-step__head">
        <h2 className="quote-step__title">Dimensions</h2>
        <p className="quote-step__hint">
          Leave any of these blank if they're already in your drawing or attachment.
        </p>
      </div>

      <div className="quote-step__grid">
        <Input variant="flat" id="length" label={<>Length<span className="quote-step__optional-tag">Optional</span></>} value={data.length} onChange={set("length")} placeholder="e.g. 600mm" />
        <Input variant="flat" id="width" label={<>Width<span className="quote-step__optional-tag">Optional</span></>} value={data.width} onChange={set("width")} placeholder="e.g. 400mm" />
        <Input variant="flat" id="height" label={<>Height<span className="quote-step__optional-tag">Optional</span></>} value={data.height} onChange={set("height")} placeholder="e.g. 300mm" />
        <Input
          variant="flat"
          id="drawingReference"
          label={<>Drawing Reference<span className="quote-step__optional-tag">Optional</span></>}
          value={data.drawingReference}
          onChange={set("drawingReference")}
          placeholder="e.g. drawing number or revision"
        />
        <div className="quote-step__field--full">
          <label htmlFor="customDimensions" className="quote-step__label">
            Custom Dimensions <span className="quote-step__optional-tag">Optional</span>
          </label>
          <textarea
            id="customDimensions"
            className="quote-step__textarea"
            value={data.customDimensions}
            onChange={set("customDimensions")}
            placeholder="Describe any non-standard shape or additional measurements here."
          />
        </div>
      </div>
    </div>
  );
}
