import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

// Deliberately no signup form, no "forgot your account?" self-service
// flow beyond password reset, and no link inviting a new admin to
// register. Accounts are provisioned exclusively via
// database/scripts/create-admin-user.mjs — see that file and
// ADMIN-DASHBOARD-ARCHITECTURE.md for why.
export default function Login() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (session) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) {
      // Deliberately the same message whether the email doesn't exist,
      // the password is wrong, or the account isn't confirmed — never
      // reveal which, so this can't be used to enumerate valid admin
      // email addresses.
      setError("Incorrect email or password.");
    }
  }

  return (
    <div className="auth-screen">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Henil Enterprise — Admin</h1>
        <p className="auth-card__hint">Sign in with your admin account.</p>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="auth-card__error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
