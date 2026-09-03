import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);

/**
 * Tracks two genuinely different things, kept separate on purpose:
 *
 * 1. `session` — is anyone logged in via Supabase Auth at all?
 * 2. `isAdmin` — does that logged-in user actually have an active row
 *    in admin_users?
 *
 * (2) is a real network round-trip to Postgres, not a client-side
 * assumption or a JWT claim this app decodes and trusts — it's the
 * literal same query `is_admin()` runs server-side, run here purely
 * for UI purposes (showing "you're not authorized" instead of a
 * confusing empty dashboard). It is NOT what actually protects the
 * data: even if this check were deleted entirely, or the response
 * spoofed in devtools, every subsequent Supabase query in this app
 * still goes through RLS server-side and would return nothing for a
 * non-admin. This check exists for a better error message, not for
 * security — see ADMIN-DASHBOARD-ARCHITECTURE.md.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = not yet checked, null = signed out
  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === undefined) return; // still resolving initial session
    if (session === null) {
      setIsAdmin(false);
      return;
    }

    let cancelled = false;
    setIsAdmin(undefined); // re-check whenever the session changes

    supabase
      .from("admin_users")
      .select("id")
      .eq("id", session.user.id)
      .eq("is_active", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        // A query error here (including one caused by RLS quietly
        // returning nothing) is treated as "not an admin" — fail
        // closed, never open.
        setIsAdmin(Boolean(data) && !error);
      });

    return () => {
      cancelled = true;
    };
  }, [session]);

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
