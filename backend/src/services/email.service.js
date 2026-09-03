import { Resend } from "resend";

// Same pattern as config/supabaseClient.js: the secret is read from
// process.env in exactly this one place, never exposed, never logged.
const RESEND_API_KEY = process.env.RESEND_API_KEY;

let client = null;
if (RESEND_API_KEY) {
  client = new Resend(RESEND_API_KEY);
}

export function isEmailConfigured() {
  return client !== null;
}

export function getEmailClient() {
  if (!client) {
    throw new Error("Email provider is not configured. Set RESEND_API_KEY in backend/.env.");
  }
  return client;
}

/**
 * Thin, provider-specific adapter around the actual Resend API call.
 * Deliberately the ONLY function in this whole feature that knows it's
 * talking to Resend specifically — everything else (templates,
 * orchestration) takes a generic `sendFn({ to, subject, html, text })`
 * and would work unchanged with SendGrid, Postmark, or SES behind a
 * different one of these adapters.
 */
export async function sendViaResend(resendClient, { from, to, subject, html, text }) {
  const { data, error } = await resendClient.emails.send({ from, to, subject, html, text });
  if (error) {
    throw new Error(error.message || "Unknown email provider error");
  }
  return data;
}
