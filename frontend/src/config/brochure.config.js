// Configurable brochure location. Point this at a local file under
// public/ (the default) or override with a full URL to host it
// elsewhere entirely (e.g. a Supabase Storage public URL) — nothing
// else in the brochure system needs to change either way.
//
// Replacing the brochure is meant to be a drop-in operation: put the
// real PDF at frontend/public/brochure/henil-enterprise-brochure.pdf
// (see the README in that folder) and every "Download/Open/Preview
// Brochure" button on the site starts working, with no code changes.

export const BROCHURE_URL =
  import.meta.env?.VITE_BROCHURE_URL || "/brochure/henil-enterprise-brochure.pdf";

export const BROCHURE_FILENAME =
  import.meta.env?.VITE_BROCHURE_FILENAME || "Henil-Enterprise-Brochure.pdf";
