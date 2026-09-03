import Input from "../../components/ui/Input.jsx";
import Select from "../../components/ui/Select.jsx";
import { MATERIAL_OPTIONS } from "../../data/quoteForm.data.js";
import "./QuoteSteps.css";

export default function StepRequirement({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div>
      <div className="quote-step__head">
        <h2 className="quote-step__title">What do you need?</h2>
        <p className="quote-step__hint">
          {data.productId
            ? "We've pre-filled this from the product page — adjust anything that needs it."
            : "Tell us what you're looking to have fabricated."}
        </p>
      </div>

      <div className="quote-step__grid">
        <Input variant="flat" id="product" label="Product *" value={data.product} onChange={set("product")} placeholder="e.g. Custom Acrylic Tank" />
        <Input variant="flat" id="quantity" type="number" min="1" label="Quantity *" value={data.quantity} onChange={set("quantity")} placeholder="e.g. 50" />
        <Select
          label="Material *"
          value={data.material}
          onChange={(value) => onChange({ ...data, material: value })}
          options={MATERIAL_OPTIONS}
          placeholder="Select a material"
        />
        <Input
          variant="flat"
          id="thickness"
          label={<>Thickness<span className="quote-step__optional-tag">Optional</span></>}
          value={data.thickness}
          onChange={set("thickness")}
          placeholder="e.g. 5mm, or leave blank if unsure"
        />
      </div>
    </div>
  );
}
