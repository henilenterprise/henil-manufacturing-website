import crypto from "node:crypto";

const REFERENCE_PREFIX = "HE-RFQ-";

export function generateInquiryReference() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Random portion makes collisions practically impossible,
  // even after server restarts or Render redeployments.
  const randomPart = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `${REFERENCE_PREFIX}${year}${month}${day}-${randomPart}`;
}