import { getSupabaseClient, isSupabaseConfigured } from "../config/supabaseClient.js";
import { createInquiry } from "../services/inquiry.service.js";
import { getSignedFileUrls } from "../services/storage.service.js";
import { getEmailClient, isEmailConfigured, sendViaResend } from "../services/email.service.js";
import { sendInquiryEmails } from "../services/emailOrchestrator.service.js";
import { EMAIL_FROM, NOTIFICATION_EMAIL } from "../config/email.config.js";
import { STORAGE_BUCKET } from "../config/upload.config.js";

export async function submitInquiry(req, res) {
  if (!isSupabaseConfigured()) {
    return res.status(503).json({
      status: "error",
      message: "The database is not configured on the server. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env.",
    });
  }

  let referenceNumber;
  try {
    const supabase = getSupabaseClient();
    const result = await createInquiry(supabase, req.body);
    referenceNumber = result.referenceNumber;
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ status: "error", message: err.message, errors: err.fieldErrors || [] });
    }
    return res.status(err.status || 502).json({ status: "error", message: err.message });
  }

  // The inquiry is now safely stored in Supabase. Everything below this
  // line is best-effort notification, not the RFQ itself — the response
  // is sent BEFORE attempting email specifically so a slow or failing
  // email provider can never delay, block, or appear to fail the
  // visitor's successful submission. "If email fails, do not lose the
  // inquiry" is enforced by ordering, not just a try/catch: the inquiry
  // was already committed to the database before any email code runs.
  res.status(201).json({
    status: "ok",
    message: "Inquiry received.",
    referenceNumber,
  });

  sendNotificationEmails(referenceNumber, req.body).catch((err) => {
    // sendInquiryEmails() already catches and logs its own errors per
    // email — this outer catch only guards against a bug in the
    // orchestration code itself becoming an unhandled rejection.
    console.error(`[email] Unexpected error in email pipeline for ${referenceNumber}:`, err.message);
  });
}

async function sendNotificationEmails(referenceNumber, payload) {
  if (!isEmailConfigured()) {
    console.warn(`[email] RESEND_API_KEY not configured — skipping notification emails for ${referenceNumber}.`);
    return;
  }

  const supabase = getSupabaseClient();
  const files = Array.isArray(payload.files) ? payload.files : [];
  const fileLinks = files.length > 0 ? await getSignedFileUrls(supabase, STORAGE_BUCKET, files) : [];

  const resendClient = getEmailClient();
  const sendFn = (message) => sendViaResend(resendClient, { from: EMAIL_FROM, ...message });

  const results = await sendInquiryEmails({
    sendFn,
    referenceNumber,
    payload,
    fileLinks,
    notificationEmail: NOTIFICATION_EMAIL,
  });

  console.log(`[email] Results for ${referenceNumber}:`, results);
}
