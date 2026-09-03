import { Download } from "lucide-react";
import Button from "./ui/Button.jsx";
import { BROCHURE_URL, BROCHURE_FILENAME } from "../config/brochure.config.js";
import { useBrochureAvailability } from "../hooks/useBrochureAvailability.js";

/**
 * The reusable "Download Brochure" button placed in Navbar, Homepage,
 * Products, Capabilities, and Footer. Availability-aware: while no real
 * PDF has been added yet, this renders as a disabled control with a
 * clear reason rather than a link that would download a broken or
 * empty file — see useBrochureAvailability.js for why a plain
 * href-exists check isn't reliable enough on its own.
 *
 * "checking" and "unavailable" share the same disabled appearance
 * rather than showing a spinner — the HEAD request this depends on
 * resolves in well under a second, and a button that flips from
 * spinning to enabled to (sometimes) disabled again reads as jankier
 * than one that's simply inert for a brief moment before becoming usable.
 */
export default function DownloadBrochureButton({ variant = "ghost", size = "md", className = "", children }) {
  const status = useBrochureAvailability();
  const label = children || "Download Brochure";

  if (status !== "available") {
    return (
      <Button
        variant="ghost"
        size={size}
        icon={Download}
        iconPosition="left"
        disabled
        title={status === "checking" ? "Checking brochure availability…" : "The brochure hasn't been added yet"}
        className={className}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      href={BROCHURE_URL}
      download={BROCHURE_FILENAME}
      variant={variant}
      size={size}
      icon={Download}
      iconPosition="left"
      title="Download Brochure"
      className={className}
    >
      {label}
    </Button>
  );
}
