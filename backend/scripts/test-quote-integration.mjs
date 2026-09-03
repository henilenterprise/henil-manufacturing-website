// Exercises the REAL business logic (validation, reference generation,
// product-slug resolution, row shaping, file linking, error handling) in
// inquiry.service.js and storage.service.js, using a fake Supabase client
// instead of a real network call — see fakeSupabaseClient.mjs for exactly
// what that does and does not prove.
//
// Run with:  node backend/scripts/test-quote-integration.mjs

import { createInquiry, validateInquiryPayload } from "../src/services/inquiry.service.js";
import { uploadFileToStorage } from "../src/services/storage.service.js";
import { validateFile } from "../src/services/fileValidation.service.js";
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

function basePayload(overrides = {}) {
  return {
    company: {
      companyName: "Acme Engineering", contactPerson: "Jane Doe",
      email: "jane@acme.com", phone: "9876543210",
      gstNumber: "", city: "Ahmedabad", country: "India",
    },
    requirement: { product: "Custom Acrylic Tank", productId: "", quantity: "25", material: "acrylic", thickness: "" },
    dimensions: { length: "", width: "", height: "", customDimensions: "", drawingReference: "" },
    files: [],
    delivery: { requiredDate: "", location: "" },
    message: { additionalRequirements: "" },
    ...overrides,
  };
}

function callFileFilter(originalname, mimetype) {
  const result = validateFile(originalname, mimetype);
  return { err: result.valid ? null : new Error(result.reason), ok: result.valid };
}

async function main() {
  console.log("=".repeat(70));
  console.log("SCENARIO 1 — Normal quote");
  console.log("=".repeat(70));
  {
    const supabase = createFakeSupabaseClient({ products: [] });
    const result = await createInquiry(supabase, basePayload());
    check("returns a reference number", /^HE-RFQ-\d{5,}$/.test(result.referenceNumber), result.referenceNumber);
    check("inserted exactly one inquiry row", supabase._store.inquiries.length === 1);
    check("product_id is null (no productId given)", supabase._store.inquiries[0].product_id === null);
    check("company_name stored correctly", supabase._store.inquiries[0].company_name === "Acme Engineering");
  }

  console.log("\n" + "=".repeat(70));
  console.log("SCENARIO 2 — Product quote (prefilled from a product page)");
  console.log("=".repeat(70));
  {
    const fakeProductUuid = "11111111-1111-1111-1111-111111111111";
    const supabase = createFakeSupabaseClient({
      products: [{ id: fakeProductUuid, slug: "custom-acrylic-tank" }],
    });
    const result = await createInquiry(
      supabase,
      basePayload({ requirement: { ...basePayload().requirement, productId: "custom-acrylic-tank" } })
    );
    check("submission succeeds", /^HE-RFQ-/.test(result.referenceNumber));
    check(
      "product_id resolved from slug to the real UUID (closes the previously-flagged gap)",
      supabase._store.inquiries[0].product_id === fakeProductUuid,
      supabase._store.inquiries[0].product_id
    );
  }
  {
    // Product slug that doesn't exist in the catalogue (e.g. stale link) — should not crash, just resolve to null.
    const supabase = createFakeSupabaseClient({ products: [] });
    const result = await createInquiry(
      supabase,
      basePayload({ requirement: { ...basePayload().requirement, productId: "does-not-exist" } })
    );
    check("unknown product slug resolves to null rather than throwing", supabase._store.inquiries[0].product_id === null);
    check("submission still succeeds", /^HE-RFQ-/.test(result.referenceNumber));
  }

  console.log("\n" + "=".repeat(70));
  console.log("SCENARIO 3 — Quantity order");
  console.log("=".repeat(70));
  {
    const supabase = createFakeSupabaseClient({ products: [] });
    const result = await createInquiry(supabase, basePayload({ requirement: { ...basePayload().requirement, quantity: "500" } }));
    check("large quantity accepted", supabase._store.inquiries[0].quantity === 500);
  }
  {
    const errors = validateInquiryPayload(basePayload({ requirement: { ...basePayload().requirement, quantity: "0" } }));
    check("quantity of zero is rejected", errors.some((e) => e.includes("quantity")), errors);
  }
  {
    const errors = validateInquiryPayload(basePayload({ requirement: { ...basePayload().requirement, quantity: "-5" } }));
    check("negative quantity is rejected", errors.some((e) => e.includes("quantity")), errors);
  }
  {
    const errors = validateInquiryPayload(basePayload({ requirement: { ...basePayload().requirement, quantity: "3.5" } }));
    check("non-integer quantity is rejected", errors.some((e) => e.includes("quantity")), errors);
  }

  console.log("\n" + "=".repeat(70));
  console.log("SCENARIO 4 — Drawing upload");
  console.log("=".repeat(70));
  {
    const supabase = createFakeSupabaseClient({ products: [] });
    const fakeFile = { originalname: "drawing.pdf", mimetype: "application/pdf", buffer: Buffer.from("fake pdf bytes"), size: 14 };
    const uploaded = await uploadFileToStorage(supabase, "inquiry-drawings", fakeFile);
    check("upload returns metadata with expected shape", Boolean(uploaded.id && uploaded.originalName && uploaded.storagePath));
    check("storage.upload was actually called", supabase._storageUploads.length === 1);
    check("original filename is never used as the storage path", uploaded.storagePath !== "drawing.pdf");

    // Now attach it to an inquiry submission and confirm it gets linked.
    const result = await createInquiry(supabase, basePayload({ files: [uploaded] }));
    check("inquiry submission with an attached file still succeeds", /^HE-RFQ-/.test(result.referenceNumber));
    check("inquiry_files row was created", supabase._store.inquiry_files?.length === 1);
    check(
      "inquiry_files row is linked to the correct inquiry",
      supabase._store.inquiry_files[0].inquiry_id === supabase._store.inquiries[0].id
    );
  }
  {
    // Storage failure should surface as a clear thrown error, not a silent success.
    const failingSupabase = createFailingSupabaseClient("simulated storage outage");
    const fakeFile = { originalname: "drawing.pdf", mimetype: "application/pdf", buffer: Buffer.from("x"), size: 1 };
    let threw = false;
    try {
      await uploadFileToStorage(failingSupabase, "inquiry-drawings", fakeFile);
    } catch (err) {
      threw = true;
      check("storage failure error message is passed through", err.message.includes("simulated storage outage"));
    }
    check("storage failure throws rather than returning a fake success", threw);
  }

  console.log("\n" + "=".repeat(70));
  console.log("SCENARIO 5 — Invalid form");
  console.log("=".repeat(70));
  {
    const supabase = createFakeSupabaseClient({ products: [] });
    let threw = false;
    try {
      await createInquiry(supabase, basePayload({ company: { ...basePayload().company, email: "", companyName: "" } }));
    } catch (err) {
      threw = true;
      check("throws with status 400", err.status === 400);
      check("lists the specific missing fields", err.fieldErrors.includes("company.companyName is required") && err.fieldErrors.includes("company.email is required"), err.fieldErrors);
    }
    check("rejects before touching the database", threw && (supabase._store.inquiries || []).length === 0);
  }
  {
    const errors = validateInquiryPayload(basePayload({ company: { ...basePayload().company, email: "not-an-email" } }));
    check("malformed email is rejected", errors.some((e) => e.includes("valid email")), errors);
  }
  {
    const errors = validateInquiryPayload(basePayload({ requirement: { ...basePayload().requirement, material: "titanium" } }));
    check("unknown material is rejected", errors.some((e) => e.includes("material")), errors);
  }

  console.log("\n" + "=".repeat(70));
  console.log("SCENARIO 6 — Unsupported file");
  console.log("=".repeat(70));
  {
    const { err, ok } = callFileFilter("malware.exe", "application/octet-stream");
    check("executable is rejected", Boolean(err) && !ok, err?.message);
  }
  {
    const { err, ok } = callFileFilter("document.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    check("unsupported-but-not-dangerous format (.docx) is rejected", Boolean(err) && !ok, err?.message);
  }
  {
    const { err, ok } = callFileFilter("spoofed.pdf", "image/png");
    check("extension/mimetype mismatch is rejected", Boolean(err) && !ok, err?.message);
  }
  {
    const { err, ok } = callFileFilter("real-drawing.dwg", "application/acad");
    check("DWG with a nonstandard mimetype is still accepted (documented exception)", !err && ok);
  }
  {
    const { err, ok } = callFileFilter("drawing.pdf", "application/pdf");
    check("a genuinely valid PDF is accepted", !err && ok);
  }

  console.log("\n" + "=".repeat(70));
  console.log(`RESULTS: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(70));
  if (failed > 0) process.exitCode = 1;
}

main();
