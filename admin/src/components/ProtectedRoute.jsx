import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

export default function ProtectedRoute({ children }) {
  const { session, isAdmin } = useAuth();

  if (session === undefined || (session && isAdmin === undefined)) {
    return <div className="loading-screen">Checking your session…</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
