import { ServerCog, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useHealthCheck } from "../hooks/useHealthCheck.js";
import "./StatusSection.css";

export default function StatusSection() {
  const { status, data } = useHealthCheck();

  return (
    <section id="status" className="status">
      <div className="container status__card">
        <div className="status__icon">
          <ServerCog size={20} strokeWidth={1.75} />
        </div>
        <div className="status__body">
          <span className="status__label">Backend connection</span>

          {status === "checking" && (
            <span className="status__value status__value--checking">
              <Loader2 size={14} className="status__spinner" /> Checking GET /api/health…
            </span>
          )}

          {status === "online" && (
            <span className="status__value status__value--online">
              <CheckCircle2 size={14} /> Online — {data?.message || "backend responded"}
            </span>
          )}

          {status === "offline" && (
            <span className="status__value status__value--offline">
              <XCircle size={14} /> Offline — start the backend with{" "}
              <code>npm run dev</code> in <code>/backend</code>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
