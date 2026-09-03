import crypto from "node:crypto";
import path from "node:path";

/**
 * Uploads one already-validated file buffer to Supabase Storage and
 * returns metadata for it. `supabase` is injected, same reasoning as
 * inquiry.service.js — testable against a fake client without a real
 * network call.
 *
 * The object path is a fresh random name, never the client-supplied
 * filename — same reasoning as the old disk-based implementation this
 * replaces: never trust a client filename for anything that becomes a
 * storage path or key.
 */
export async function uploadFileToStorage(supabase, bucket, file) {
  const ext = path.extname(file.originalname).toLowerCase();
  const objectPath = `${crypto.randomUUID()}${ext}`;

  const { data, error } = await supabase.storage.from(bucket).upload(objectPath, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (error) {
    const err = new Error(`Failed to upload "${file.originalname}": ${error.message}`);
    err.status = 502;
    throw err;
  }

  return {
    id: crypto.randomUUID(), // client-side tracking id only — see StepFile.jsx; not a database row id
    originalName: file.originalname,
    storagePath: data.path,
    size: file.size,
    mimetype: file.mimetype,
  };
}

export async function uploadFilesToStorage(supabase, bucket, files) {
  const results = [];
  for (const file of files) {
    results.push(await uploadFileToStorage(supabase, bucket, file));
  }
  return results;
}

function formatBytes(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Generates a time-limited signed URL per file so the internal
 * notification email can link directly to each drawing — the bucket
 * itself is private (see database/migrations/..._create_storage_bucket.sql),
 * so a plain public URL wouldn't work even if one were built by hand.
 *
 * Never throws: a signed-URL failure for one file (or all of them)
 * degrades to showing the filename without a working link, rather than
 * blocking the whole notification email over a Storage hiccup.
 */
export async function getSignedFileUrls(supabase, bucket, files, expiresInSeconds = 60 * 60 * 24 * 7) {
  const links = [];
  for (const file of files) {
    try {
      const { data, error } = await supabase.storage.from(bucket).createSignedUrl(file.storagePath, expiresInSeconds);
      if (error) throw error;
      links.push({ name: file.originalName, url: data.signedUrl, sizeLabel: formatBytes(file.size) });
    } catch (err) {
      console.error(`[storage] Could not create signed URL for "${file.originalName}":`, err.message);
      links.push({ name: file.originalName, url: null, sizeLabel: formatBytes(file.size) });
    }
  }
  return links;
}
