import dotenv from "dotenv";

dotenv.config();

// CORS_ORIGIN accepts either a single origin or a comma-separated list
// (e.g. "https://henilenterprise.com,https://www.henilenterprise.com")
// — a single production deployment very commonly needs both an apex and
// a www origin, or a staging + production origin, and the `cors`
// package accepts an array directly. Falls back to the local dev
// frontend origin, never to a wildcard — an open CORS policy on an API
// that accepts file uploads and writes to a database is not a safe
// default under any circumstance, so there is deliberately no "allow
// everything" fallback here even for convenience.
function parseCorsOrigin(value) {
  if (!value) return "http://localhost:5173";
  const origins = value.split(",").map((o) => o.trim()).filter(Boolean);
  return origins.length > 1 ? origins : origins[0];
}

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: parseCorsOrigin(process.env.CORS_ORIGIN),
};
