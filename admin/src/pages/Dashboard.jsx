import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { listInquiries } from "../lib/inquiries.js";
import { INQUIRY_STATUSES, STATUS_LABELS } from "../lib/inquiryStatus.js";

export default function Dashboard() {
  const [inquiries, setInquiries] = useState(undefined);
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setInquiries(undefined);
    setError("");

    listInquiries({ status: statusFilter || undefined })
      .then((data) => {
        if (!cancelled) setInquiries(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [statusFilter]);

  return (
    <AppShell>
      <div className="dashboard-head">
        <h1>Inquiries</h1>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {INQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error-banner">{error}</p>}

      {inquiries === undefined && !error && <p>Loading…</p>}

      {inquiries && inquiries.length === 0 && <p>No inquiries match this filter.</p>}

      {inquiries && inquiries.length > 0 && (
        <table className="inquiry-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Date</th>
              <th>Company</th>
              <th>Contact Person</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id}>
                <td>
                  <Link to={`/inquiries/${inq.id}`}>{inq.reference_number}</Link>
                </td>
                <td>{new Date(inq.created_at).toLocaleDateString("en-IN")}</td>
                <td>{inq.company_name}</td>
                <td>{inq.contact_person}</td>
                <td>{inq.product_name || "—"}</td>
                <td>{inq.quantity}</td>
                <td>
                  <StatusBadge status={inq.status} />
                </td>
                <td>
                  {inq.required_delivery_date
                    ? new Date(inq.required_delivery_date).toLocaleDateString("en-IN")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AppShell>
  );
}
