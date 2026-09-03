import { FileText, Loader2, AlertTriangle, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { MATERIAL_OPTIONS } from "../../data/quoteForm.data.js";
import "./QuoteSteps.css";
import "./StepReview.css";

function materialLabel(value) {
  return MATERIAL_OPTIONS.find((m) => m.value === value)?.label || value || "—";
}

function fallback(value) {
  return value && String(value).trim() !== "" ? value : "—";
}

export default function StepReview({ formState, status, errorMessage, fieldErrors = [], onSubmit }) {
  const { company, requirement, dimensions, files, delivery, message } = formState;

  return (
    <div>
      <div className="quote-step__head">
        <h2 className="quote-step__title">Review your inquiry</h2>
        <p className="quote-step__hint">Check everything below before submitting.</p>
      </div>

      <div className="review-grid">
        <ReviewBlock title="Company">
          <ReviewRow label="Company Name" value={fallback(company.companyName)} />
          <ReviewRow label="Contact Person" value={fallback(company.contactPerson)} />
          <ReviewRow label="Email" value={fallback(company.email)} />
          <ReviewRow label="Phone" value={fallback(company.phone)} />
          <ReviewRow label="GST Number" value={fallback(company.gstNumber)} />
          <ReviewRow label="City" value={fallback(company.city)} />
          <ReviewRow label="Country" value={fallback(company.country)} />
        </ReviewBlock>

        <ReviewBlock title="Requirement">
          <ReviewRow label="Product" value={fallback(requirement.product)} />
          <ReviewRow label="Quantity" value={fallback(requirement.quantity)} />
          <ReviewRow label="Material" value={materialLabel(requirement.material)} />
          <ReviewRow label="Thickness" value={fallback(requirement.thickness)} />
        </ReviewBlock>

        <ReviewBlock title="Dimensions">
          <ReviewRow label="Length" value={fallback(dimensions.length)} />
          <ReviewRow label="Width" value={fallback(dimensions.width)} />
          <ReviewRow label="Height" value={fallback(dimensions.height)} />
          <ReviewRow label="Drawing Reference" value={fallback(dimensions.drawingReference)} />
          <ReviewRow label="Custom Dimensions" value={fallback(dimensions.customDimensions)} />
        </ReviewBlock>

        <ReviewBlock title="Delivery">
          <ReviewRow label="Required Date" value={fallback(delivery.requiredDate)} />
          <ReviewRow label="Location" value={fallback(delivery.location)} />
        </ReviewBlock>

        <ReviewBlock title="Files" className="review-grid__wide">
          {files.length > 0 ? (
            <ul className="review-files">
              {files.map((f) => (
                <li key={f.id}><FileText size={14} /> {f.originalName}</li>
              ))}
            </ul>
          ) : (
            <p className="review-row__value">No files attached.</p>
          )}
        </ReviewBlock>

        <ReviewBlock title="Message" className="review-grid__wide">
          <p className="review-row__value">{fallback(message.additionalRequirements)}</p>
        </ReviewBlock>
      </div>

      {status === "error" && (
        <div className="review-status review-status--error">
          <p>
            <AlertTriangle size={16} /> {errorMessage}
          </p>
          {fieldErrors.length > 0 && (
            <ul className="review-status__field-errors">
              {fieldErrors.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Button
        variant="solid"
        size="lg"
        icon={status === "loading" ? undefined : ArrowRight}
        disabled={status === "loading"}
        onClick={onSubmit}
        className="review-submit"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="review-submit__spinner" /> Submitting…
          </>
        ) : status === "error" ? (
          "Retry Submission"
        ) : (
          "Request Quote"
        )}
      </Button>
    </div>
  );
}

function ReviewBlock({ title, children, className = "" }) {
  return (
    <div className={`review-block ${className}`}>
      <span className="quote-step__label">{title}</span>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="review-row">
      <span className="review-row__label">{label}</span>
      <span className="review-row__value">{value}</span>
    </div>
  );
}
