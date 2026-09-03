import Input from "../../components/ui/Input.jsx";
import "./QuoteSteps.css";

export default function StepDelivery({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div>
      <div className="quote-step__head">
        <h2 className="quote-step__title">
          Delivery<span className="quote-step__optional-tag">Optional</span>
        </h2>
        <p className="quote-step__hint">Helpful for planning, but not required to get a quote started.</p>
      </div>

      <div className="quote-step__grid">
        <Input variant="flat" id="requiredDate" type="date" label="Required Delivery Date" value={data.requiredDate} onChange={set("requiredDate")} />
        <Input variant="flat" id="location" label="Delivery Location" value={data.location} onChange={set("location")} placeholder="City, state or full address" />
      </div>
    </div>
  );
}
