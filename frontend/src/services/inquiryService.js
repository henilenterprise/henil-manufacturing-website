// Talks to the real backend inquiry endpoint. Same proxy pattern as
// api.js and uploadService.js — no absolute URL or CORS handling needed.

const BASE_URL = "/api";

export async function submitInquiry(formState) {
  const res = await fetch(`${BASE_URL}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formState),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || `Submission failed with status ${res.status}`);
    err.fieldErrors = data?.errors || [];
    throw err;
  }

  return data; // { status, message, referenceNumber }
}
