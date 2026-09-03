// Talks to the real backend upload endpoint (see backend/src/routes/upload.routes.js).
// Uses the Vite dev proxy (see vite.config.js), so no absolute URL or CORS
// handling is needed here — same pattern as services/api.js.

const BASE_URL = "/api";

export async function uploadFiles(files) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${BASE_URL}/uploads`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `Upload failed with status ${res.status}`);
  }

  return data;
}
