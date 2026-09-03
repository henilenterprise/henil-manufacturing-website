import path from "node:path";
import {
  ALLOWED_EXTENSIONS,
  MIME_TYPES_BY_EXTENSION,
  NEVER_ALLOWED_EXTENSIONS,
} from "../config/upload.config.js";

// Pure validation logic, deliberately kept free of any dependency on
// multer. This is what upload.middleware.js's fileFilter wraps to plug
// into multer's API — but keeping it here, dependency-free, means it can
// be imported and tested directly without needing multer installed at
// all (multer is a real, listed dependency of this backend; this
// separation is about clean architecture and easy testing, not about
// avoiding it).
export function getExtension(filename) {
  return path.extname(filename).replace(".", "").toLowerCase();
}

// Real file-signature ("magic bytes") checks for the three types where
// the format defines a reliable, fixed header — this is what actually
// looks at file *content*, as opposed to the extension/mimetype checks
// above, which only look at what the client *claims* the file is.
// Both the filename and the browser-supplied Content-Type are entirely
// attacker-controlled in a multipart upload; a script can send a
// renamed executable as "invoice.pdf" with Content-Type
// "application/pdf" and pass every check above. This is the check that
// actually catches that.
//
// DXF and DWG deliberately have no entry here: DXF is a text-based
// format with no fixed magic bytes at all (its structure is groups of
// ASCII codes, not a binary header), and DWG's signature varies by AutoCAD
// version. That's a real, narrower guarantee for those two file types —
// documented, not glossed over, the same way MIME_TYPES_BY_EXTENSION's
// comment already flags it for the mimetype check.
const FILE_SIGNATURES = {
  pdf: [[0x25, 0x50, 0x44, 0x46, 0x2d]], // "%PDF-"
  png: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  jpg: [
    [0xff, 0xd8, 0xff], // Covers JFIF/EXIF/raw JPEG — all share this 3-byte prefix, the 4th byte varies by variant.
  ],
  jpeg: [[0xff, 0xd8, 0xff]],
};

function matchesSignature(buffer, signature) {
  if (!buffer || buffer.length < signature.length) return false;
  return signature.every((byte, i) => buffer[i] === byte);
}

/**
 * Checks a file's actual bytes against its claimed extension. Returns
 * true for extensions with no defined signature (dxf/dwg) — absence of
 * a check for those is a deliberate, documented gap (see above), not a
 * silent pass being mistaken for a real one. Only meaningful once the
 * buffer is fully available, which is after multer finishes (NOT
 * inside multer's fileFilter, which runs before the body is buffered)
 * — see middleware/upload.middleware.js's postUploadValidation for
 * where this is actually called.
 */
export function validateFileSignature(buffer, extension) {
  const signatures = FILE_SIGNATURES[extension];
  if (!signatures) return true; // dxf/dwg — no reliable signature to check, see comment above
  return signatures.some((sig) => matchesSignature(buffer, sig));
}

/**
 * Returns { valid: true } or { valid: false, reason: string }. Never
 * throws — the caller decides how to surface a rejection.
 */
export function validateFile(originalname, mimetype) {
  const ext = getExtension(originalname);
  // Bare, readable form for the empty-extension case ("noextension",
  // or a filename ending in a literal dot) — without this, the message
  // below would render as the confusing `File type "." is not...`
  // rather than something a person could actually act on.
  const extLabel = ext ? `".${ext}"` : "with no extension";

  if (NEVER_ALLOWED_EXTENSIONS.includes(ext)) {
    return { valid: false, reason: `File type ${extLabel} is not allowed.` };
  }

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { valid: false, reason: `File type ${extLabel} is not in the allowed list (${ALLOWED_EXTENSIONS.join(", ")}).` };
  }

  const expectedMimes = MIME_TYPES_BY_EXTENSION[ext];
  if (expectedMimes && !expectedMimes.includes(mimetype)) {
    return { valid: false, reason: `File "${originalname}" does not match the expected type for .${ext}.` };
  }

  return { valid: true };
}
