import { useEffect, useState } from "react";
import { BROCHURE_URL } from "../config/brochure.config.js";
import { isPdfResponseValid } from "../utils/brochure.js";

// Module-level cache, not component state — several buttons using this
// hook can be mounted on the same page (nav, footer, page-specific
// placements), and they should share one HEAD request rather than each
// firing its own.
let cachedCheck = null;

function checkAvailability() {
  if (!cachedCheck) {
    cachedCheck = fetch(BROCHURE_URL, { method: "HEAD" })
      .then(isPdfResponseValid)
      .catch(() => false);
  }
  return cachedCheck;
}

/** Returns "checking" | "available" | "unavailable". */
export function useBrochureAvailability() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;
    checkAvailability().then((ok) => {
      if (!cancelled) setStatus(ok ? "available" : "unavailable");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
