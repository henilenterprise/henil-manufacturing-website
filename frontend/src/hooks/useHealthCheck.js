import { useEffect, useState } from "react";
import { getHealth } from "../services/api.js";

// Status: "checking" | "online" | "offline"
export function useHealthCheck() {
  const [status, setStatus] = useState("checking");
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getHealth()
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setStatus("online");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("offline");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { status, data };
}
