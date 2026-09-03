import Logo from "./Logo.jsx";
import "./LogoLoader.css";

/**
 * A full-screen loading treatment built around the real logo — no
 * redrawn artwork, just a fade-in and a soft diagonal light sweep across
 * the existing mark. Use while real content is loading (initial app
 * boot, a slow data fetch, a route transition) — not as decoration.
 */
export default function LogoLoader({ label = "Loading" }) {
  return (
    <div className="logo-loader" role="status" aria-live="polite">
      <div className="logo-loader__mark">
        <Logo variant="full" size={140} loading="eager" />
      </div>
      <span className="logo-loader__label">{label}</span>
    </div>
  );
}
