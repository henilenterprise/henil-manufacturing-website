import { buildInternalNotificationEmail, buildCustomerConfirmationEmail } from "./email.templates.js";

/**
 * Sends both the internal notification and the customer confirmation for
 * an already-successfully-stored inquiry. `sendFn` is injected
 * (async ({ to, subject, html, text }) => result) so this is testable
 * without a real provider — see backend/scripts/test-email-integration.mjs.
 *
 * This function NEVER throws. The two emails are independent: if one
 * fails, the other is still attempted. Every failure is caught and
 * logged with the reference number, never silently swallowed — but
 * never allowed to propagate either, since by the time this runs the
 * inquiry is already safely in the database and must stay that way
 * regardless of what happens here.
 */
export async function sendInquiryEmails({ sendFn, referenceNumber, payload, fileLinks = [], notificationEmail }) {
  const results = { internal: null, customer: null };

  if (notificationEmail) {
    try {
      const { subject, html, text } = buildInternalNotificationEmail({ referenceNumber, payload, fileLinks });
      await sendFn({ to: notificationEmail, subject, html, text });
      results.internal = { sent: true };
    } catch (err) {
      results.internal = { sent: false, error: err.message };
      console.error(`[email] Internal notification failed for ${referenceNumber}:`, err.message);
    }
  } else {
    results.internal = { sent: false, error: "HENIL_NOTIFICATION_EMAIL is not configured" };
    console.warn(`[email] No HENIL_NOTIFICATION_EMAIL configured — internal notification skipped for ${referenceNumber}.`);
  }

  const customerEmail = payload?.company?.email;
  if (customerEmail) {
    try {
      const { subject, html, text } = buildCustomerConfirmationEmail({ referenceNumber, payload });
      await sendFn({ to: customerEmail, subject, html, text });
      results.customer = { sent: true };
    } catch (err) {
      results.customer = { sent: false, error: err.message };
      console.error(`[email] Customer confirmation failed for ${referenceNumber}:`, err.message);
    }
  } else {
    results.customer = { sent: false, error: "no customer email present on the payload" };
  }

  return results;
}
