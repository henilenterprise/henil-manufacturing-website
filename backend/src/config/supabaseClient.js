import { createClient } from "@supabase/supabase-js";

// The service role key is read ONLY from process.env, here, in one
// place. It is never returned in any API response, never logged, and
// never referenced anywhere under frontend/ — grep the whole repo for
// SUPABASE_SERVICE_ROLE_KEY if you want to verify that yourself. The
// frontend never talks to Supabase directly; it only ever calls this
// Express backend, which is what makes keeping this key server-side-only
// straightforward rather than something that has to be carefully
// threaded through client code.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client = null;

if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isSupabaseConfigured() {
  return client !== null;
}

/**
 * Throws with a clear, actionable message if Supabase isn't configured,
 * rather than letting a null-reference error surface deeper in the call
 * stack. Controllers catch this and turn it into a clean 503.
 */
export function getSupabaseClient() {
  if (!client) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env — see .env.example."
    );
  }
  return client;
}
