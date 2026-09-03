import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

export default function AppShell({ children }) {
  const { session, signOut } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-shell__bar">
        <Link to="/" className="app-shell__brand">
          Henil Enterprise — Admin
        </Link>
        <div className="app-shell__account">
          <span>{session?.user?.email}</span>
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </header>
      <main className="app-shell__main">{children}</main>
    </div>
  );
}
