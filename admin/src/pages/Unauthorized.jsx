import { useAuth } from "../context/AuthProvider.jsx";

export default function Unauthorized() {
  const { signOut } = useAuth();

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1>Not authorized</h1>
        <p className="auth-card__hint">
          You're signed in, but this account isn't listed as an active admin. If you believe
          this is a mistake, contact whoever manages admin access for this dashboard.
        </p>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
