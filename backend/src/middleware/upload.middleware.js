import multer from "multer";
import { MAX_FILE_SIZE_BYTES, MAX_FILES } from "../config/upload.config.js";
import { validateFile, validateFileSignature, getExtension } from "../services/fileValidation.service.js";

// Memory storage, not disk — files need to exist as a buffer in memory
// so the controller can hand them straight to Supabase Storage's upload
// call. Nothing is ever written to this server's local disk anymore;
// that was the mock/placeholder behavior this integration replaces.
const storage = multer.memoryStorage();

// Thin adapter onto validateFile() (see fileValidation.service.js) —
// kept here only because multer's API requires a (req, file, cb)-shaped
// function. All the actual logic, and all the tests, live on the pure
// function this wraps.
//
// This only checks the filename and claimed Content-Type — the file's
// actual bytes aren't available yet at this point in multer's pipeline
// (fileFilter runs as the upload stream starts, before it's buffered).
// See postUploadSignatureCheck below for the content-based check that
// runs after multer finishes.
function fileFilter(req, file, cb) {
  const result = validateFile(file.originalname, file.mimetype);
  if (!result.valid) {
    return cb(new Error(result.reason));
  }
  cb(null, true);
}

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: MAX_FILES,
  },
}).array("files", MAX_FILES);

/**
 * Runs after multer has fully buffered every file — this is the
 * earliest point the actual bytes exist, so it's the earliest point a
 * real content check (as opposed to trusting the filename/Content-Type
 * multer's fileFilter had to rely on) is possible. Call this after
 * uploadMiddleware succeeds and before doing anything with req.files.
 * Returns null if every file passes, or an Error describing the first
 * failure — mirrors fileFilter's cb(err) shape so route handlers can
 * treat both the same way.
 */
export function postUploadSignatureCheck(files) {
  for (const file of files) {
    const ext = getExtension(file.originalname);
    if (!validateFileSignature(file.buffer, ext)) {
      return new Error(
        `File "${file.originalname}" does not match the expected file format for .${ext} — its content doesn't match its extension.`
      );
    }
  }
  return null;
}
