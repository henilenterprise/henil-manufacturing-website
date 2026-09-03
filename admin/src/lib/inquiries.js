import { supabase } from "./supabaseClient.js";

// Every function in this file is a thin wrapper around a Supabase
// query — none of them checks "is this user an admin?" themselves,
// and that's intentional. That check already happened, twice: once as
// UI-only feedback in AuthProvider (see its comment for why that copy
// isn't the real security), and — the part that actually matters —
// again, unavoidably, by Postgres itself via the is_admin() RLS
// policies on every table these functions touch. A bug in this file
// that, say, forgot a `.eq()` filter can leak too much of what an
// *already-authorized* admin can see; it can never let a non-admin
// see anything, because RLS filters every query at the database level
// regardless of what this JS asks for.

/** All inquiries, most recent first — the dashboard's main list. */
export async function listInquiries({ status } = {}) {
  let query = supabase
    .from("inquiries")
    .select(
      "id, reference_number, created_at, company_name, contact_person, product_name, quantity, status, required_delivery_date"
    )
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/** Full detail for one inquiry, including its attached files. */
export async function getInquiry(id) {
  const { data: inquiry, error: inquiryError } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();
  if (inquiryError) throw inquiryError;

  const { data: files, error: filesError } = await supabase
    .from("inquiry_files")
    .select("id, original_name, storage_path, size_bytes, mimetype, created_at")
    .eq("inquiry_id", id)
    .order("created_at", { ascending: true });
  if (filesError) throw filesError;

  return { inquiry, files };
}

/**
 * "Change status" — and the same function covers "Mark as quoted" /
 * "Mark as closed" from the brief, since those are just this call with
 * status = "QUOTED" or "CLOSED" respectively. See
 * src/pages/InquiryDetail.jsx for the two shortcut buttons that call
 * this with a fixed status.
 */
export async function updateInquiryStatus(id, status) {
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) throw error;
}

/** Notes on one inquiry, oldest first (a readable running log). */
export async function listInquiryNotes(inquiryId) {
  const { data, error } = await supabase
    .from("inquiry_notes")
    .select("id, note, created_at, admin_id, admin_users(display_name, email)")
    .eq("inquiry_id", inquiryId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

/** "Add internal notes" — admin_id is always the caller's own id (also enforced by RLS's WITH CHECK). */
export async function addInquiryNote(inquiryId, note, adminId) {
  const { error } = await supabase
    .from("inquiry_notes")
    .insert({ inquiry_id: inquiryId, note, admin_id: adminId });
  if (error) throw error;
}

/**
 * "Download drawings" — a short-lived signed URL, not a public link.
 * Supabase Storage enforces the same "Admins can download inquiry
 * drawings" RLS policy when generating this URL as it would on a
 * direct request, so this call itself fails for a non-admin — it isn't
 * only the resulting link that's protected.
 */
export async function getDrawingDownloadUrl(storagePath) {
  const { data, error } = await supabase.storage
    .from("inquiry-drawings")
    .createSignedUrl(storagePath, 60 * 5); // 5 minutes — long enough to click through, short enough not to be worth sharing
  if (error) throw error;
  return data.signedUrl;
}
