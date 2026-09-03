import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_BYTES, MAX_FILES, STORAGE_BUCKET } from "../config/upload.config.js";
import { getSupabaseClient, isSupabaseConfigured } from "../config/supabaseClient.js";
import { uploadFilesToStorage } from "../services/storage.service.js";

export function getUploadConfig(req, res) {
  res.status(200).json({
    allowedExtensions: ALLOWED_EXTENSIONS,
    maxFileSizeBytes: MAX_FILE_SIZE_BYTES,
    maxFiles: MAX_FILES,
    supabaseConfigured: isSupabaseConfigured(),
  });
}

export async function handleUpload(req, res) {
  const files = req.files || [];

  if (files.length === 0) {
    return res.status(400).json({ status: "error", message: "No files were uploaded." });
  }

  if (!isSupabaseConfigured()) {
    return res.status(503).json({
      status: "error",
      message: "File storage is not configured on the server. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env.",
    });
  }

  try {
    const supabase = getSupabaseClient();
    const uploaded = await uploadFilesToStorage(supabase, STORAGE_BUCKET, files);
    res.status(201).json({
      status: "ok",
      message: `${uploaded.length} file(s) received.`,
      files: uploaded,
    });
  } catch (err) {
    res.status(err.status || 502).json({ status: "error", message: err.message });
  }
}
