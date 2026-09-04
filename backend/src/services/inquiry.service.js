

// Mirrors MATERIAL_OPTIONS in frontend/src/data/quoteForm.data.js and the
// `inquiries_material_known` CHECK constraint in the database migration.
// Duplicated intentionally on both sides: the DB constraint is the real
// enforcement boundary (an insert can never violate it no matter what
// calls this code), this list lets the app return a clean 400 instead of
// a raw Postgres constraint-violation message.
const KNOWN_MATERIALS = ["acrylic", "polycarbonate", "unsure"];

// Mirrors the char_length CHECK constraints added in
// database/migrations/20260101000019_security_hardening.sql. Duplicated
// for the same reason KNOWN_MATERIALS is: the database constraint is
// the real enforcement boundary (nothing can violate it no matter what
// calls this code, including a direct Supabase insert bypassing this
// service entirely), but checking here first means a real visitor who
// pastes an unreasonably long message gets a clean 400 with a clear
// field name instead of a raw Postgres constraint-violation message
// surfacing as a 502.
const MAX_LENGTHS = {
  "company.companyName": 200,
  "company.contactPerson": 200,
  "company.email": 254,
  "company.phone": 40,
  "company.gstNumber": 30,
  "company.city": 100,
  "company.country": 100,
  "requirement.product": 200,
  "requirement.thickness": 100,
  "dimensions.length": 50,
  "dimensions.width": 50,
  "dimensions.height": 50,
  "dimensions.customDimensions": 500,
  "dimensions.drawingReference": 500,
  "delivery.location": 300,
  "message.additionalRequirements": 5000,
};

function getPath(body, dottedPath) {
  return dottedPath.split(".").reduce((acc, key) => acc?.[key], body);
}

const REQUIRED_FIELDS = [
  ["company", "companyName"],
  ["company", "contactPerson"],
  ["company", "email"],
  ["company", "phone"],
  ["requirement", "product"],
  ["requirement", "quantity"],
  ["requirement", "material"],
];

export function validateInquiryPayload(body) {
  const errors = [];

  for (const [section, field] of REQUIRED_FIELDS) {
    const value = body?.[section]?.[field];
    if (!value || String(value).trim() === "") {
      errors.push(`${section}.${field} is required`);
    }
  }

  const email = body?.company?.email;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("company.email is not a valid email address");
  }

  const quantity = body?.requirement?.quantity;
  if (quantity !== undefined && quantity !== null && String(quantity).trim() !== "") {
    const n = Number(quantity);
    if (!Number.isInteger(n) || n <= 0) {
      errors.push("requirement.quantity must be a whole number greater than zero");
    }
  }

  const material = body?.requirement?.material;
  if (material && !KNOWN_MATERIALS.includes(material)) {
    errors.push(`requirement.material must be one of: ${KNOWN_MATERIALS.join(", ")}`);
  }

  for (const [fieldPath, maxLength] of Object.entries(MAX_LENGTHS)) {
    const value = getPath(body, fieldPath);
    if (value !== undefined && value !== null && String(value).length > maxLength) {
      errors.push(`${fieldPath} must be ${maxLength} characters or fewer`);
    }
  }

  return errors;
}

/**
 * The frontend's `requirement.productId` is a slug string (e.g.
 * "custom-acrylic-tank" — see frontend/src/data/products.data.js), but
 * the database's `inquiries.product_id` is a UUID foreign key to
 * `products.id`. This resolves one to the other, or returns null when
 * there's no match — which is the normal, expected case for a
 * free-text/custom request that was never prefilled from a product page.
 *
 * This closes a gap explicitly flagged as unresolved in
 * database/README.md when the schema was first written — worth knowing
 * if you're comparing this code against that document.
 */
async function resolveProductId(supabase, productSlug) {
  if (!productSlug) return null;

  const { data, error } = await supabase
    .from("products")
    .select("id")
    .eq("slug", productSlug)
    .limit(1);

  if (error) {
    console.error(`Product slug lookup failed for "${productSlug}":`, error.message);
    return null;
  }

  return data?.[0]?.id ?? null;
}

function mapPayloadToRow(payload, referenceNumber, resolvedProductId) {
  const { company, requirement, dimensions, delivery, message } = payload;
  return {
    reference_number: referenceNumber,
    company_name: company.companyName,
    contact_person: company.contactPerson,
    email: company.email,
    phone: company.phone,
    gst_number: company.gstNumber || null,
    city: company.city || null,
    country: company.country || null,
    product_id: resolvedProductId,
    product_name: requirement.product,
    quantity: Number(requirement.quantity),
    material: requirement.material,
    thickness: requirement.thickness || null,
    length: dimensions?.length || null,
    width: dimensions?.width || null,
    height: dimensions?.height || null,
    custom_dimensions: dimensions?.customDimensions || null,
    drawing_reference: dimensions?.drawingReference || null,
    required_delivery_date: delivery?.requiredDate || null,
    delivery_location: delivery?.location || null,
    message: message?.additionalRequirements || null,
  };
}

/**
 * Creates an inquiry end to end: validate -> generate reference number ->
 * resolve product slug to a real FK -> insert the inquiry -> link any
 * already-uploaded files. `supabase` is injected (not imported directly)
 * so this can be exercised against a fake client in tests without a real
 * network call — see backend/scripts/test-quote-integration.mjs.
 */
export async function createInquiry(supabase, payload) {
  const errors = validateInquiryPayload(payload);
  if (errors.length > 0) {
    const err = new Error("Missing or invalid fields.");
    err.status = 400;
    err.fieldErrors = errors;
    throw err;
  }

  const resolvedProductId = await resolveProductId(supabase, payload.requirement?.productId);

// Generate the next inquiry reference directly from PostgreSQL.
// The database sequence is persistent and safe across Render redeploys.
const { data: referenceNumber, error: referenceError } = await supabase.rpc(
  "next_inquiry_reference"
);

if (referenceError) {
  const err = new Error(
    `Failed to generate inquiry reference: ${referenceError.message}`
  );
  err.status = 502;
  throw err;
}

const row = mapPayloadToRow(payload, referenceNumber, resolvedProductId);

  const { data: inserted, error: insertError } = await supabase
    .from("inquiries")
    .insert(row)
    .select()
    .limit(1);

  if (insertError) {
    const err = new Error(`Failed to save inquiry: ${insertError.message}`);
    err.status = 502;
    throw err;
  }

  const inquiry = inserted[0];
  const files = Array.isArray(payload.files) ? payload.files : [];

  if (files.length > 0) {
    const fileRows = files.map((f) => ({
      inquiry_id: inquiry.id,
      original_name: f.originalName,
      storage_path: f.storagePath,
      size_bytes: f.size,
      mimetype: f.mimetype,
    }));

    const { error: filesError } = await supabase.from("inquiry_files").insert(fileRows);
    if (filesError) {
      // The inquiry itself was already saved successfully — a
      // file-linking failure shouldn't make the visitor's whole
      // submission look like it failed, since their RFQ WAS recorded.
      // Surface this loudly server-side instead of silently swallowing
      // it or falsely telling the visitor nothing was saved.
      console.error(`Inquiry ${referenceNumber} saved, but linking ${files.length} file(s) failed:`, filesError.message);
    }
  }

  return { referenceNumber, inquiryId: inquiry.id };
}
