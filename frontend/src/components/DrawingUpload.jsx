import { useRef, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import Button from "./ui/Button.jsx";
import { uploadFiles } from "../services/uploadService.js";
import {
  ALLOWED_EXTENSIONS,
  NEVER_ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
  acceptAttribute,
} from "../config/upload.config.js";
import "./DrawingUpload.css";

function getExtension(filename) {
  return filename.split(".").pop()?.toLowerCase() || "";
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Real, working file upload — validates client-side for immediate
 * feedback (never the actual security boundary; the backend re-validates
 * everything independently, see backend/src/middleware/upload.middleware.js)
 * and submits to the real /api/uploads endpoint on demand.
 */
export default function DrawingUpload({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [rejections, setRejections] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const validateAndAdd = (incomingFiles) => {
    const nextFiles = [...files];
    const nextRejections = [];

    for (const file of incomingFiles) {
      const ext = getExtension(file.name);

      if (NEVER_ALLOWED_EXTENSIONS.includes(ext)) {
        nextRejections.push({ name: file.name, reason: "Executable and script files are never allowed." });
        continue;
      }
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        nextRejections.push({ name: file.name, reason: `.${ext} isn't a supported file type.` });
        continue;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        nextRejections.push({ name: file.name, reason: `File exceeds the ${MAX_FILE_SIZE_MB}MB limit.` });
        continue;
      }
      if (nextFiles.length >= MAX_FILES) {
        nextRejections.push({ name: file.name, reason: `Only ${MAX_FILES} files can be attached at once.` });
        continue;
      }
      nextFiles.push(file);
    }

    setFiles(nextFiles);
    setRejections(nextRejections);
    setStatus("idle");
  };

  const handleInputChange = (e) => {
    if (e.target.files?.length) validateAndAdd(Array.from(e.target.files));
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) validateAndAdd(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;
    setStatus("uploading");
    setErrorMessage("");
    try {
      const result = await uploadFiles(files);
      setStatus("success");
      onUploaded?.(result.files);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="drawing-upload">
      <div
        className={`drawing-upload__dropzone ${dragActive ? "drawing-upload__dropzone--active" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
      >
        <UploadCloud size={32} strokeWidth={1.5} />
        <p className="drawing-upload__dropzone-title">Drag &amp; drop your files here, or click to browse</p>
        <p className="drawing-upload__dropzone-hint">
          Accepted: {ALLOWED_EXTENSIONS.join(", ").toUpperCase()} · up to {MAX_FILE_SIZE_MB}MB each · max {MAX_FILES} files
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptAttribute}
          className="drawing-upload__input"
          onChange={handleInputChange}
          aria-label="Upload drawing files"
        />
      </div>

      {rejections.length > 0 && (
        <ul className="drawing-upload__rejections">
          {rejections.map((r, i) => (
            <li key={i}>
              <AlertTriangle size={14} /> <strong>{r.name}</strong> — {r.reason}
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="drawing-upload__files">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="drawing-upload__file">
              <FileText size={16} strokeWidth={2} />
              <span className="drawing-upload__file-name">{file.name}</span>
              <span className="drawing-upload__file-size">{formatSize(file.size)}</span>
              <button
                type="button"
                className="drawing-upload__file-remove"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {status === "success" && (
        <p className="drawing-upload__status drawing-upload__status--success">
          <CheckCircle2 size={16} /> {files.length} file(s) uploaded successfully.
        </p>
      )}
      {status === "error" && (
        <p className="drawing-upload__status drawing-upload__status--error">
          <AlertTriangle size={16} /> {errorMessage}
        </p>
      )}

      <Button
        variant="solid"
        size="md"
        disabled={files.length === 0 || status === "uploading"}
        onClick={handleSubmit}
        className="drawing-upload__submit"
      >
        {status === "uploading" ? (
          <>
            <Loader2 size={16} className="drawing-upload__spinner" /> Uploading…
          </>
        ) : (
          `Upload ${files.length || ""} File${files.length === 1 ? "" : "s"}`.trim()
        )}
      </Button>

      <p className="drawing-upload__note">
        We accept the formats listed above. Other CAD formats may work but haven't been
        verified yet — check with us before sending anything outside this list. Executable
        or script files are never accepted, regardless of extension.
      </p>
    </div>
  );
}
