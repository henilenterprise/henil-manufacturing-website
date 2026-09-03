// Provisions an admin dashboard account. This is the ONLY supported way
// to create one — there is no signup page anywhere in the admin app
// (see admin/src/pages/Login.jsx), and the database grants no
// insert/update/delete RLS policy on admin_users to anon or
// authenticated (see 20260101000018_admin_row_level_security.sql).
// Adding an admin is a deliberate, out-of-band action, run by whoever
// holds the Supabase service role key — never something a logged-in
// user, admin or not, can do to themselves or anyone else through the
// app.
//
// Usage:
//   SUPABASE_URL=https://your-project.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
//   node database/scripts/create-admin-user.mjs someone@henilenterprise.com "Someone's Name"
//
// What it does:
//   1. Creates a Supabase Auth user for the given email (or reuses one
//      that already exists — e.g. if IT already created accounts via
//      the dashboard), with a random temporary password.
//   2. Inserts a matching row into admin_users, which is the row that
//      actually grants dashboard access (see is_admin() in
//      20260101000016_create_admin_users.sql) — the Auth account alone
//      grants nothing.
//   3. Prints the temporary password once. It is not stored anywhere by
//      this script; the new admin should sign in and, ideally, use
//      Supabase Auth's password-reset flow to set their own password
//      immediately rather than keep the generated one.
//
// This script deliberately requires the service role key as an env var
// passed at invocation time, not read from any committed .env file —
// matching how backend/.env's SUPABASE_SERVICE_ROLE_KEY is already
// handled everywhere else in this project (see backend/src/config/supabaseClient.js).

import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

const [, , email, displayName] = process.argv;

if (!email) {
  console.error("Usage: node database/scripts/create-admin-user.mjs <email> [\"Display Name\"]");
  process.exit(1);
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in the environment for this script — see the usage comment at the top of this file. Never commit these values."
  );
  process.exit(1);
}

// service role key required — this client can create Auth users and
// bypass RLS to write admin_users, neither of which the anon key used
// by admin/src/lib/supabaseClient.js can do.
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function generateTempPassword() {
  // 24 random bytes, base64url — well above any reasonable minimum
  // length/entropy bar, and never reused between runs.
  return crypto.randomBytes(24).toString("base64url");
}

async function findExistingAuthUser(targetEmail) {
  // supabase-js v2 has no getUserByEmail — list and match. Fine for an
  // occasional provisioning script; not something run at request time.
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) throw new Error(`Failed to list existing auth users: ${error.message}`);
  return data.users.find((u) => u.email?.toLowerCase() === targetEmail.toLowerCase()) || null;
}

async function main() {
  const existing = await findExistingAuthUser(email);
  let userId;
  let tempPassword = null;

  if (existing) {
    userId = existing.id;
    console.log(`Auth user already exists for ${email} (id: ${userId}) — reusing it, not resetting their password.`);
  } else {
    tempPassword = generateTempPassword();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true, // no email-sending configured in this project yet — mark confirmed directly
    });
    if (error) throw new Error(`Failed to create auth user: ${error.message}`);
    userId = data.user.id;
    console.log(`Created new Supabase Auth user for ${email} (id: ${userId}).`);
  }

  const { error: upsertError } = await supabase
    .from("admin_users")
    .upsert(
      { id: userId, email, display_name: displayName || null, is_active: true },
      { onConflict: "id" }
    );

  if (upsertError) throw new Error(`Failed to write admin_users row: ${upsertError.message}`);

  console.log(`admin_users row is now active for ${email}.`);
  if (tempPassword) {
    console.log("\nTemporary password (shown once, not stored by this script):");
    console.log(`  ${tempPassword}`);
    console.log("\nHave this admin sign in and reset their password immediately.");
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
