// Exercises the REAL email logic — template building, HTML escaping,
// and the send orchestration with independent per-email failure
// handling — using injected fake senders instead of a real Resend API
// call. Deliberately imports email.templates.js and
// emailOrchestrator.service.js directly, NOT email.service.js — the
// real Resend adapter — since the `resend` package isn't installed in
// this sandbox (no network access) and isn't needed to prove this
// logic is correct; see the dependency-injection design in
// emailOrchestrator.service.js, built specifically so this is possible.
//
// Run with: node backend/scripts/test-email-integration.mjs

import { buildInternalNotificationEmail, buildCustomerConfirmationEmail } from "../src/services/email.templates.js";
import { sendInquiryEmails } from "../src/services/emailOrchestrator.service.js";
import { getSignedFileUrls } from "../src/services/storage.service.js";
import { createFakeSupabaseClient, createFailingSupabaseClient } from "./fakeSupabaseClient.mjs";

let passed = 0;
let failed = 0;

function check(label, condition, detail = "") {
  if (condition) {
    passed++;
    console.log(`  PASS  ${label}`);
  } else {
    failed++;
    console.log(`  FAIL  ${label}  ${detail}`);
  }
}

const samplePayload = {
  company: {
    companyName: "Acme Engineering", contactPerson: "Jane Doe",
    email: "jane@acme.com", phone: "9876543210",
  },
  requirement: { product: "Custom Acrylic Tank", quantity: "25", material: "acrylic", thickness: "5mm" },
  dimensions: { length: "600mm", width: "400mm", height: "300mm", drawingReference: "DWG-102", customDimensions: "" },
  delivery: { requiredDate: "2026-09-15", location: "Ahmedabad" },
  message: { additionalRequirements: "Please pack securely for transit." },
  files: [],
};

async function main() {
  console.log("=".repeat(70));
  console.log("Internal notification email — required field coverage");
  console.log("=".repeat(70));
  {
    const fileLinks = [{ name: "drawing.pdf", url: "https://example.com/signed/drawing.pdf", sizeLabel: "1.2 MB" }];
    const { subject, html, text } = buildInternalNotificationEmail({
      referenceNumber: "HE-RFQ-00042",
      payload: samplePayload,
      fileLinks,
    });

    const requiredValues = [
      "HE-RFQ-00042", "Acme Engineering", "Jane Doe", "9876543210", "jane@acme.com",
      "Custom Acrylic Tank", "25", "acrylic", "5mm", "600mm", "DWG-102",
      "2026-09-15", "Ahmedabad", "Please pack securely for transit.",
    ];
    for (const v of requiredValues) {
      check(`text includes "${v}"`, text.includes(v));
      check(`html includes "${v}"`, html.includes(v));
    }
    check("subject includes reference number", subject.includes("HE-RFQ-00042"));
    check("file link included in html", html.includes("drawing.pdf") && html.includes("https://example.com/signed/drawing.pdf"));
    check("file info included in text", text.includes("drawing.pdf"));
  }

  console.log("\n" + "=".repeat(70));
  console.log("Internal notification — no files attached");
  console.log("=".repeat(70));
  {
    const { html, text } = buildInternalNotificationEmail({ referenceNumber: "HE-RFQ-00043", payload: samplePayload, fileLinks: [] });
    check("html shows 'No files attached'", html.includes("No files attached"));
    check("text shows 'No files attached'", text.includes("No files attached"));
  }

  console.log("\n" + "=".repeat(70));
  console.log("Customer confirmation email — required content");
  console.log("=".repeat(70));
  {
    const { subject, html, text } = buildCustomerConfirmationEmail({ referenceNumber: "HE-RFQ-00042", payload: samplePayload });
    check("includes reference number", text.includes("HE-RFQ-00042") && html.includes("HE-RFQ-00042"));
    check("includes product", text.includes("Custom Acrylic Tank") && html.includes("Custom Acrylic Tank"));
    check("includes quantity", text.includes("25") && html.includes("25"));
    check("includes an expected-response message", text.toLowerCase().includes("review your inquiry"));
    check("thanks the customer", text.toLowerCase().includes("thank you"));
    check("subject references the reference number", subject.includes("HE-RFQ-00042"));
  }

  console.log("\n" + "=".repeat(70));
  console.log("HTML escaping — real security check, not cosmetic");
  console.log("=".repeat(70));
  {
    const maliciousPayload = {
      ...samplePayload,
      company: { ...samplePayload.company, companyName: '<script>alert(1)</script> & "Sons"' },
      message: { additionalRequirements: "Ship <b>ASAP</b> please" },
    };
    const { html } = buildInternalNotificationEmail({ referenceNumber: "HE-RFQ-00044", payload: maliciousPayload, fileLinks: [] });
    check("raw <script> tag does NOT appear unescaped in html", !html.includes("<script>alert(1)</script>"));
    check("script tag is properly escaped", html.includes("&lt;script&gt;alert(1)&lt;/script&gt;"));
    check("ampersand is escaped", html.includes("&amp;"));
    check("raw <b> tag from message field does NOT appear unescaped", !html.includes("<b>ASAP</b>"));
  }

  console.log("\n" + "=".repeat(70));
  console.log("Send orchestration — both emails succeed");
  console.log("=".repeat(70));
  {
    const sent = [];
    const sendFn = async (msg) => { sent.push(msg); return { id: "fake-id" }; };
    const results = await sendInquiryEmails({
      sendFn, referenceNumber: "HE-RFQ-00042", payload: samplePayload, fileLinks: [],
      notificationEmail: "team@henilenterprise.com",
    });
    check("internal marked sent", results.internal.sent === true);
    check("customer marked sent", results.customer.sent === true);
    check("sendFn called exactly twice", sent.length === 2);
    check("internal went to the notification address", sent.some((m) => m.to === "team@henilenterprise.com"));
    check("customer confirmation went to the customer's email", sent.some((m) => m.to === "jane@acme.com"));
  }

  console.log("\n" + "=".repeat(70));
  console.log("Send orchestration — notification email not configured");
  console.log("=".repeat(70));
  {
    const sent = [];
    const sendFn = async (msg) => { sent.push(msg); return { id: "fake-id" }; };
    const results = await sendInquiryEmails({
      sendFn, referenceNumber: "HE-RFQ-00042", payload: samplePayload, fileLinks: [],
      notificationEmail: "", // not configured
    });
    check("internal marked not sent with a clear reason", results.internal.sent === false && results.internal.error.includes("not configured"));
    check("customer email still attempted independently", results.customer.sent === true);
    check("only one email actually sent", sent.length === 1);
  }

  console.log("\n" + "=".repeat(70));
  console.log("Send orchestration — one email fails, the other must still be attempted");
  console.log("=".repeat(70));
  {
    // Internal fails, customer succeeds
    const sendFn = async (msg) => {
      if (msg.to === "team@henilenterprise.com") throw new Error("simulated provider rejection");
      return { id: "fake-id" };
    };
    const results = await sendInquiryEmails({
      sendFn, referenceNumber: "HE-RFQ-00042", payload: samplePayload, fileLinks: [],
      notificationEmail: "team@henilenterprise.com",
    });
    check("internal marked failed with the real error message", results.internal.sent === false && results.internal.error.includes("simulated provider rejection"));
    check("customer confirmation still succeeded despite internal failing", results.customer.sent === true);
  }
  {
    // Both fail
    const sendFn = async () => { throw new Error("total provider outage"); };
    const results = await sendInquiryEmails({
      sendFn, referenceNumber: "HE-RFQ-00042", payload: samplePayload, fileLinks: [],
      notificationEmail: "team@henilenterprise.com",
    });
    check("both marked failed", results.internal.sent === false && results.customer.sent === false);
    check("orchestrator itself does not throw even when everything fails", true); // reaching this line proves it
  }

  console.log("\n" + "=".repeat(70));
  console.log("Signed file URLs for the internal email");
  console.log("=".repeat(70));
  {
    const supabase = createFakeSupabaseClient({});
    const files = [{ originalName: "part-drawing.dwg", storagePath: "abc123.dwg", size: 204800 }];
    const links = await getSignedFileUrls(supabase, "inquiry-drawings", files);
    check("returns one link", links.length === 1);
    check("link has a real-looking signed URL", links[0].url?.includes("inquiry-drawings/abc123.dwg"));
    check("size is human-formatted", links[0].sizeLabel === "200.0 KB");
  }
  {
    const failingSupabase = createFailingSupabaseClient("storage down");
    const files = [{ originalName: "part-drawing.dwg", storagePath: "abc123.dwg", size: 1024 }];
    const links = await getSignedFileUrls(failingSupabase, "inquiry-drawings", files);
    check("degrades to a null url rather than throwing", links.length === 1 && links[0].url === null);
    check("filename is still preserved for the email even without a link", links[0].name === "part-drawing.dwg");
  }

  console.log("\n" + "=".repeat(70));
  console.log(`RESULTS: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(70));
  if (failed > 0) process.exitCode = 1;
}

main();
