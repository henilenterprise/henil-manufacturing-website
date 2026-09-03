import fs from "node:fs";
import path from "node:path";

// Persists the last-used sequence number to a JSON file so it survives
// server restarts, without needing a real database yet (that's a later
// phase — see README). This is explicitly NOT safe for multiple server
// instances running concurrently (two processes could both read the same
// number before either writes back) — fine for a single dev/staging
// instance, but flagged here so it isn't mistaken for production-grade
// once a real database replaces this.

const COUNTER_FILE = path.join("data", "inquiry-counter.json");
const REFERENCE_PREFIX = "HE-RFQ-";
const PAD_LENGTH = 5;

function readCounter() {
  try {
    const raw = fs.readFileSync(COUNTER_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Number.isInteger(parsed.lastNumber) ? parsed.lastNumber : 0;
  } catch {
    return 0; // file doesn't exist yet, or is unreadable — start from zero
  }
}

function writeCounter(lastNumber) {
  fs.mkdirSync(path.dirname(COUNTER_FILE), { recursive: true });
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ lastNumber }, null, 2));
}

/**
 * Reads the last-used number, increments it, persists the new value, and
 * returns a formatted reference like "HE-RFQ-00001". Never returns the
 * same number twice as long as this is the only process writing the file.
 */
export function generateInquiryReference() {
  const next = readCounter() + 1;
  writeCounter(next);
  return `${REFERENCE_PREFIX}${String(next).padStart(PAD_LENGTH, "0")}`;
}
