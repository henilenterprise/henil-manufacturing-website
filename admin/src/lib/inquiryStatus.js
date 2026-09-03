// Must exactly match the `inquiry_status` Postgres enum in
// database/migrations/20260101000001_extensions_and_helpers.sql — if
// that enum ever changes, update this list too. There's no way to read
// a Postgres enum's values from a plain REST/JS client at runtime
// without an extra round trip, so this is a deliberate, documented
// duplication rather than a fetched value.
export const INQUIRY_STATUSES = ["NEW", "REVIEWING", "QUOTED", "NEGOTIATING", "WON", "LOST", "CLOSED"];

export const STATUS_LABELS = {
  NEW: "New",
  REVIEWING: "Reviewing",
  QUOTED: "Quoted",
  NEGOTIATING: "Negotiating",
  WON: "Won",
  LOST: "Lost",
  CLOSED: "Closed",
};
