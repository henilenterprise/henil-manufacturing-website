import { useAnalytics } from "../hooks/useAnalytics.js";

/**
 * Mounted once inside <BrowserRouter> in App.jsx. Split into its own
 * component (rather than calling useAnalytics directly in App) because
 * useAnalytics needs useLocation, which only works inside the Router —
 * App itself renders <BrowserNode> as a child, so the hook can't run at
 * App's top level.
 */
export default function Analytics() {
  useAnalytics();
  return null;
}
