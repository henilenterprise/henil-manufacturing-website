// Email configuration. RESEND_API_KEY is read only here and in
// email.service.js via process.env — never returned in any response,
// logged, or referenced anywhere under frontend/.

export const EMAIL_FROM =
  process.env.EMAIL_FROM || "Henil Enterprise <onboarding@resend.dev>";

// Where internal RFQ notifications get sent — your team's inbox, not the
// customer's. Empty by default on purpose: an inquiry must never fail to
// be *stored* just because this hasn't been set yet (see
// inquiry.controller.js), but notifications obviously can't go anywhere
// until it is.
export const NOTIFICATION_EMAIL = process.env.HENIL_NOTIFICATION_EMAIL || "";

// Shown in the customer confirmation email. Deliberately not a specific
// promised turnaround time (e.g. "1-2 business days") unless you set one
// yourself — committing to an SLA isn't something to invent on your
// behalf.
export const RESPONSE_TIME_MESSAGE =
  process.env.EMAIL_RESPONSE_MESSAGE ||
  "Our team will review your inquiry and get back to you as soon as possible.";
