import { RESPONSE_TIME_MESSAGE } from "../config/email.config.js";

// Pure functions, no dependency on Resend or Supabase — fully testable
// in isolation (see backend/scripts/test-email-integration.mjs).

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

// Email headers (Subject, From, To, ...) are newline-delimited in the
// underlying SMTP/MIME format — a value containing a raw CR or LF could
// be used to inject additional headers or split the message (classic
// "email header injection"). `requirement.product` and other free-text
// fields reach the Subject line below with no format restriction beyond
// "not empty" (see validateInquiryPayload in inquiry.service.js), so
// this strips any control characters before a value is ever placed in
// a header — applied at the point of use (buildInternalNotificationEmail's
// subject, below) rather than trusting every caller to remember it.
function sanitizeHeaderValue(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

function fallback(value) {
  return value !== undefined && value !== null && String(value).trim() !== "" ? value : "Not specified";
}

function formatBytes(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDimensions(dimensions) {
  const parts = [];
  if (dimensions?.length) parts.push(`L: ${dimensions.length}`);
  if (dimensions?.width) parts.push(`W: ${dimensions.width}`);
  if (dimensions?.height) parts.push(`H: ${dimensions.height}`);
  let text = parts.length > 0 ? parts.join(", ") : "Not specified";
  if (dimensions?.customDimensions) text += ` — ${dimensions.customDimensions}`;
  return text;
}

function buildRowsTable(rows) {
  return `<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
    ${rows
      .map(
        ([label, value]) => `<tr style="border-bottom:1px solid #e5e5e5;">
          <td style="color:#666;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(label)}</strong></td>
          <td style="padding-left:16px;">${escapeHtml(value)}</td>
        </tr>`
      )
      .join("")}
  </table>`;
}

/**
 * The internal notification sent to Henil Enterprise's own inbox.
 * `fileLinks`: [{ name, url, sizeLabel }] — url may be null if a signed
 * URL couldn't be generated (see storage.service.js's getSignedFileUrls),
 * in which case the filename is still shown so nothing is silently lost.
 */
export function buildInternalNotificationEmail({ referenceNumber, payload, fileLinks = [] }) {
  const { company = {}, requirement = {}, dimensions = {}, delivery = {}, message = {} } = payload;

  const rows = [
    ["Inquiry Reference", referenceNumber],
    ["Company", fallback(company.companyName)],
    ["Contact Person", fallback(company.contactPerson)],
    ["Phone", fallback(company.phone)],
    ["Email", fallback(company.email)],
    ["Product", fallback(requirement.product)],
    ["Quantity", fallback(requirement.quantity)],
    ["Material", fallback(requirement.material)],
    ["Thickness", fallback(requirement.thickness)],
    ["Dimensions", formatDimensions(dimensions)],
    ["Drawing Reference", fallback(dimensions.drawingReference)],
    ["Delivery Date", fallback(delivery.requiredDate)],
    ["Delivery Location", fallback(delivery.location)],
    ["Message", fallback(message.additionalRequirements)],
  ];

  const fileListHtml =
    fileLinks.length > 0
      ? `<ul style="font-family:sans-serif;font-size:14px;">${fileLinks
          .map((f) =>
            f.url
              ? `<li><a href="${escapeHtml(f.url)}">${escapeHtml(f.name)}</a> (${escapeHtml(f.sizeLabel)})</li>`
              : `<li>${escapeHtml(f.name)} (${escapeHtml(f.sizeLabel)}) — link unavailable, check Supabase Storage directly</li>`
          )
          .join("")}</ul>`
      : `<p style="font-family:sans-serif;font-size:14px;color:#666;">No files attached.</p>`;

  const fileListText =
    fileLinks.length > 0
      ? fileLinks.map((f) => `- ${f.name} (${f.sizeLabel})${f.url ? `: ${f.url}` : " [link unavailable]"}`).join("\n")
      : "No files attached.";

  return {
    subject: `New RFQ ${referenceNumber} — ${sanitizeHeaderValue(fallback(requirement.product))}`,
    html: `
      <h2 style="font-family:sans-serif;">New RFQ Submitted</h2>
      ${buildRowsTable(rows)}
      <h3 style="font-family:sans-serif;">Attached Files</h3>
      ${fileListHtml}
    `,
    text:
      `New RFQ Submitted\n\n` +
      rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
      `\n\nAttached Files:\n${fileListText}`,
  };
}

/** The confirmation sent back to the customer who submitted the RFQ. */
export function buildCustomerConfirmationEmail({ referenceNumber, payload }) {
  const { requirement = {} } = payload;

  const rows = [
    ["Reference", referenceNumber],
    ["Product", fallback(requirement.product)],
    ["Quantity", fallback(requirement.quantity)],
  ];

  return {
    subject: `We've received your inquiry — ${referenceNumber}`,
    html: `
      <p style="font-family:sans-serif;font-size:15px;">Thank you for reaching out to Henil Enterprise.</p>
      <p style="font-family:sans-serif;font-size:15px;">We've received your inquiry. ${escapeHtml(RESPONSE_TIME_MESSAGE)}</p>
      ${buildRowsTable(rows)}
      <p style="font-family:sans-serif;font-size:13px;color:#666;">Please quote reference <strong>${escapeHtml(referenceNumber)}</strong> in any follow-up communication.</p>
    `,
    text:
      `Thank you for reaching out to Henil Enterprise.\n\n` +
      `We've received your inquiry. ${RESPONSE_TIME_MESSAGE}\n\n` +
      rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
      `\n\nPlease quote reference ${referenceNumber} in any follow-up communication.`,
  };
}
