import { createClient } from "@supabase/supabase-js";

// This is the ANON key, not the service role key — and that's correct,
// not a mistake. The anon key identifies "some client of this Supabase
// project," nothing more; it carries no special privilege on its own.
// Once a real admin signs in via supabase.auth.signInWithPassword()
// below, every subsequent query runs as that authenticated user, and
// Row Level Security (see database/migrations/20260101000018_admin_row_level_security.sql)
// is what actually decides whether the query returns anything — not
// this key, not any code in this app. A leaked anon key or fully
// tampered build of this app still cannot read a row of customer data
// without a real, active-admin Supabase Auth session, because Postgres
// itself enforces that, not this client.
//
// The SUPABASE_SERVICE_ROLE_KEY that bypasses RLS entirely exists only
// in backend/.env and database/scripts/create-admin-user.mjs's
// invocation environment — never here, never in any VITE_-prefixed
// variable, never in this app at all. See
// ADMIN-DASHBOARD-ARCHITECTURE.md for the full reasoning.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Fail loudly at startup rather than letting every query fail
  // mysteriously later — see admin/.env.example.
  console.error(
    "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in admin/.env — see admin/.env.example."
  );
}

export const supabase = createClient(SUPABASE_URL || "", SUPABASE_ANON_KEY || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "henil-admin-auth", // distinct from the public site's storage key, in case both ever share a browser profile in dev
  },
});
