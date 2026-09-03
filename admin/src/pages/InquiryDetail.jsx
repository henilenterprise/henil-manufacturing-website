import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Phone, Mail, Download, ArrowLeft } from "lucide-react";
import AppShell from "../components/AppShell.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import {
  getInquiry,
  updateInquiryStatus,
  listInquiryNotes,
  addInquiryNote,
  getDrawingDownloadUrl,
} from "../lib/inquiries.js";
import { INQUIRY_STATUSES, STATUS_LABELS } from "../lib/inquiryStatus.js";

export default function InquiryDetail() {
  const { id } = useParams();
  const { session } = useAuth();

  const [inquiry, setInquiry] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");
  const [statusSaving, setStatusSaving] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      const [{ inquiry: inq, files: f }, n] = await Promise.all([getInquiry(id), listInquiryNotes(id)]);
      setInquiry(inq);
      setFiles(f);
      setNotes(n);
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleStatusChange(newStatus) {
    setStatusSaving(true);
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiry((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      setError(err.message);
    } finally {
      setStatusSaving(false);
    }
  }

  async function handleAddNote(e) {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      await addInquiryNote(id, newNote.trim(), session.user.id);
      setNewNote("");
      const refreshed = await listInquiryNotes(id);
      setNotes(refreshed);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDownload(file) {
    try {
      const url = await getDrawingDownloadUrl(file.storage_path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error && !inquiry) {
    return (
      <AppShell>
        <p className="error-banner">{error}</p>
      </AppShell>
    );
  }

  if (!inquiry) {
    return (
      <AppShell>
        <p>Loading…</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link to="/" className="back-link">
        <ArrowLeft size={14} /> All inquiries
      </Link>

      <div className="detail-head">
        <div>
          <h1>{inquiry.reference_number}</h1>
          <p className="detail-head__sub">
            {new Date(inquiry.created_at).toLocaleString("en-IN")} · <StatusBadge status={inquiry.status} />
          </p>
        </div>

        {/* "Change status" (the select) and the two named shortcuts from
            the brief ("Mark as quoted" / "Mark as closed") are all the
            same updateInquiryStatus() call underneath — see
            src/lib/inquiries.js for why that's one function, not three. */}
        <div className="detail-head__actions">
          <select value={inquiry.status} disabled={statusSaving} onChange={(e) => handleStatusChange(e.target.value)}>
            {INQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button type="button" disabled={statusSaving || inquiry.status === "QUOTED"} onClick={() => handleStatusChange("QUOTED")}>
            Mark as Quoted
          </button>
          <button type="button" disabled={statusSaving || inquiry.status === "CLOSED"} onClick={() => handleStatusChange("CLOSED")}>
            Mark as Closed
          </button>
        </div>
      </div>

      {error && <p className="error-banner">{error}</p>}

      <div className="detail-grid">
        <section className="detail-card">
          <h2>Company</h2>
          <dl>
            <Row label="Company">{inquiry.company_name}</Row>
            <Row label="Contact Person">{inquiry.contact_person}</Row>
            <Row label="GST Number">{inquiry.gst_number || "—"}</Row>
            <Row label="City / Country">{[inquiry.city, inquiry.country].filter(Boolean).join(", ") || "—"}</Row>
          </dl>

          {/* "Contact customer" — direct tel:/mailto: links using the
              contact details already on the inquiry, the same pattern
              the public site uses (see frontend/src/pages/Contact.jsx).
              No separate messaging system to build or secure. */}
          <div className="contact-actions">
            <a href={`mailto:${inquiry.email}`}>
              <Mail size={14} /> {inquiry.email}
            </a>
            <a href={`tel:${inquiry.phone.replace(/[^0-9+]/g, "")}`}>
              <Phone size={14} /> {inquiry.phone}
            </a>
          </div>
        </section>

        <section className="detail-card">
          <h2>Requirement</h2>
          <dl>
            <Row label="Product">{inquiry.product_name || "—"}</Row>
            <Row label="Quantity">{inquiry.quantity}</Row>
            <Row label="Material">{inquiry.material}</Row>
            <Row label="Thickness">{inquiry.thickness || "—"}</Row>
            <Row label="Dimensions">
              {[inquiry.length, inquiry.width, inquiry.height].filter(Boolean).join(" × ") ||
                inquiry.custom_dimensions ||
                "—"}
            </Row>
            <Row label="Drawing Reference">{inquiry.drawing_reference || "—"}</Row>
          </dl>
        </section>

        <section className="detail-card">
          <h2>Delivery</h2>
          <dl>
            <Row label="Required Delivery Date">
              {inquiry.required_delivery_date
                ? new Date(inquiry.required_delivery_date).toLocaleDateString("en-IN")
                : "—"}
            </Row>
            <Row label="Delivery Location">{inquiry.delivery_location || "—"}</Row>
          </dl>
        </section>

        <section className="detail-card">
          <h2>Message</h2>
          <p>{inquiry.message || "No additional message."}</p>
        </section>

        <section className="detail-card">
          <h2>Drawings ({files.length})</h2>
          {files.length === 0 && <p>No files attached.</p>}
          {files.length > 0 && (
            <ul className="file-list">
              {files.map((f) => (
                <li key={f.id}>
                  <span>{f.original_name}</span>
                  <span className="file-list__size">{Math.round(f.size_bytes / 1024)} KB</span>
                  <button type="button" onClick={() => handleDownload(f)}>
                    <Download size={14} /> Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="detail-card detail-card--wide">
          <h2>Internal Notes</h2>
          <p className="detail-card__hint">Visible only to admins — never shown to the customer.</p>

          <ul className="note-list">
            {notes.map((n) => (
              <li key={n.id}>
                <div className="note-list__meta">
                  <strong>{n.admin_users?.display_name || n.admin_users?.email || "Admin"}</strong>
                  <span>{new Date(n.created_at).toLocaleString("en-IN")}</span>
                </div>
                <p>{n.note}</p>
              </li>
            ))}
            {notes.length === 0 && <li className="note-list__empty">No notes yet.</li>}
          </ul>

          <form className="note-form" onSubmit={handleAddNote}>
            <textarea
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note for the team…"
            />
            <button type="submit" disabled={!newNote.trim()}>
              Add Note
            </button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}

function Row({ label, children }) {
  return (
    <div className="detail-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
