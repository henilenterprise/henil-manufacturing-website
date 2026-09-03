// Server-side upload configuration — this is the real enforcement
// boundary. The frontend's config is UX convenience only; a request could
// bypass client-side checks entirely, so every rule that actually matters
// for security lives here and is re-checked on every upload regardless of
// what the client claims.

const DEFAULT_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "dxf", "dwg"];

const envList = process.env.ALLOWED_UPLOAD_EXTENSIONS;
export const ALLOWED_EXTENSIONS = (envList ? envList.split(",") : DEFAULT_EXTENSIONS)
  .map((ext) => ext.trim().toLowerCase())
  .filter(Boolean);

// Known-safe mimetypes per extension. A file must match BOTH an allowed
// extension AND one of its expected mimetypes to be accepted — checking
// only one of the two is easy to spoof.
export const MIME_TYPES_BY_EXTENSION = {
  pdf: ["application/pdf"],
  png: ["image/png"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  // DXF/DWG have no single standard registered mimetype; browsers and
  // OSes send wildly inconsistent values (often generic octet-stream) for
  // CAD files, so these two are matched on extension only. This is a
  // real, narrower guarantee than the image/PDF types above — documented
  // here rather than glossed over.
  dxf: null,
  dwg: null,
};

export const MAX_FILE_SIZE_BYTES = (Number(process.env.MAX_UPLOAD_SIZE_MB) || 20) * 1024 * 1024;
export const MAX_FILES = Number(process.env.MAX_UPLOAD_FILES) || 5;

// Hard-blocked no matter what ALLOWED_UPLOAD_EXTENSIONS is set to — this
// list is intentionally NOT configurable via env, so a misconfigured
// environment variable can never accidentally allow executables through.
export const NEVER_ALLOWED_EXTENSIONS = [
  "exe", "bat", "cmd", "sh", "msi", "dll", "com", "scr", "vbs", "vbe",
  "ps1", "psm1", "jar", "app", "apk", "js", "mjs", "cjs", "jse", "wsf",
  "wsh", "gadget", "cpl", "msc", "reg", "pif", "hta", "scpt", "workflow",
];

// Supabase Storage bucket that uploaded drawings land in. Create this
// bucket in the Supabase dashboard (or via database/migrations — see
// the storage bucket migration) before uploads will work; the bucket is
// private (not publicly listable/downloadable) since only the backend,
// using the service role key, ever reads from it.
export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "inquiry-drawings";
