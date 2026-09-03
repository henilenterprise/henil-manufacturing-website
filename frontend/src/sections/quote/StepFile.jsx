import { FileText, X } from "lucide-react";
import DrawingUpload from "../../components/DrawingUpload.jsx";
import "./QuoteSteps.css";
import "./StepFile.css";

export default function StepFile({ files, onFilesChange }) {
  const handleUploaded = (uploaded) => {
    onFilesChange([...files, ...uploaded]);
  };

  const removeFile = (id) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };

  return (
    <div>
      <div className="quote-step__head">
        <h2 className="quote-step__title">
          Upload your drawing<span className="quote-step__optional-tag">Optional</span>
        </h2>
        <p className="quote-step__hint">
          PDF, PNG, JPG, JPEG, DXF, or DWG. You can also send this later if it's not ready yet.
        </p>
      </div>

      <DrawingUpload onUploaded={handleUploaded} />

      {files.length > 0 && (
        <div className="step-file__attached">
          <span className="quote-step__label">Attached to this inquiry</span>
          <ul className="step-file__list">
            {files.map((f) => (
              <li key={f.id} className="step-file__item">
                <FileText size={16} strokeWidth={2} />
                <span className="step-file__name">{f.originalName}</span>
                <button
                  type="button"
                  className="step-file__remove"
                  onClick={() => removeFile(f.id)}
                  aria-label={`Remove ${f.originalName}`}
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
