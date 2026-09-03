// Upload configuration — configurable via env so allowed types and size
// limits can change without touching component code. Keep this in sync
// with backend/src/config/upload.config.js, which enforces the real
// (trusted) validation; this file only drives client-side UX (accept
// attribute, immediate feedback) and must never be relied on as security.

const DEFAULT_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "dxf", "dwg"];

const envList = import.meta.env?.VITE_ALLOWED_UPLOAD_EXTENSIONS;
export const ALLOWED_EXTENSIONS = (envList ? envList.split(",") : DEFAULT_EXTENSIONS)
  .map((ext) => ext.trim().toLowerCase())
  .filter(Boolean);

export const MAX_FILE_SIZE_MB = Number(import.meta.env?.VITE_MAX_UPLOAD_SIZE_MB) || 20;
export const MAX_FILES = Number(import.meta.env?.VITE_MAX_UPLOAD_FILES) || 5;

// Hard-blocked regardless of the allowlist above — defense in depth on the
// client side. The real enforcement lives on the server; this only gives
// the visitor immediate feedback instead of waiting for a server round trip.
export const NEVER_ALLOWED_EXTENSIONS = [
  "exe", "bat", "cmd", "sh", "msi", "dll", "com", "scr", "vbs", "vbe",
  "ps1", "psm1", "jar", "app", "apk", "js", "jse", "wsf", "wsh", "gadget",
  "cpl", "msc", "reg", "pif",
];

export const acceptAttribute = ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(",");
