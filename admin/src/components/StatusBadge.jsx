import { STATUS_LABELS } from "../lib/inquiryStatus.js";

export default function StatusBadge({ status }) {
  return <span className={`status-badge status-badge--${status.toLowerCase()}`}>{STATUS_LABELS[status] || status}</span>;
}
