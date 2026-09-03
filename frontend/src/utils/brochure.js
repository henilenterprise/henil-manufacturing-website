// Pure decision logic, no dependency on React or import.meta.env —
// directly testable in plain Node (see frontend/scripts/test-brochure.mjs).
//
// Deliberately checks content-type, not just HTTP status. A plain
// `res.ok` check is not sufficient here: some static-hosting setups
// return a 200 with an HTML fallback page for a path that doesn't
// actually exist as a file (SPA history-fallback behavior), which
// would make an absent brochure look "available" if status were the
// only signal. Checking that the response actually looks like a PDF
// (or a generic binary stream, since some servers serve PDFs under
// application/octet-stream) catches that case too.
export function isPdfResponseValid(response) {
  if (!response || !response.ok) return false;
  const contentType = response.headers?.get?.("content-type") || "";
  return contentType.includes("pdf") || contentType.includes("octet-stream");
}
