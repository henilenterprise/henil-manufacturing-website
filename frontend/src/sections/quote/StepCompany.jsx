import Input from "../../components/ui/Input.jsx";
import "./QuoteSteps.css";

export default function StepCompany({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div>
      <div className="quote-step__head">
        <h2 className="quote-step__title">Company details</h2>
        <p className="quote-step__hint">Who should we address this quote to?</p>
      </div>

      <div className="quote-step__grid">
        <Input variant="flat" label="Company Name *" value={data.companyName} onChange={set("companyName")} placeholder="Acme Engineering Pvt. Ltd." />
        <Input variant="flat" label="Contact Person *" value={data.contactPerson} onChange={set("contactPerson")} placeholder="Jane Doe" />
        <Input variant="flat" type="email" label="Email *" value={data.email} onChange={set("email")} placeholder="jane@acme.com" />
        <Input variant="flat" type="tel" label="Phone *" value={data.phone} onChange={set("phone")} placeholder="+91 98XXXXXXXX" />
        <Input variant="flat" id="gstNumber" label={<>GST Number<span className="quote-step__optional-tag">Optional</span></>} value={data.gstNumber} onChange={set("gstNumber")} placeholder="22AAAAA0000A1Z5" />
        <Input variant="flat" id="city" label={<>City<span className="quote-step__optional-tag">Optional</span></>} value={data.city} onChange={set("city")} placeholder="Ahmedabad" />
        <Input variant="flat" id="country" label={<>Country<span className="quote-step__optional-tag">Optional</span></>} value={data.country} onChange={set("country")} placeholder="India" />
      </div>
    </div>
  );
}
