# Security Audit

A full pass across every area requested, in the order given. Each
section states what was checked, what was found, and — where something
was found — the fix, with a file reference. Nothing below is a
theoretical "consider hardening this someday" list; everything marked
🔴/🟡 was a real, exploitable gap and has a corresponding fix already
applied in this same change.

**Severity key**: 🔴 real, exploitable gap — fixed. 🟡 real but lower-impact
or partially mitigated gap — fixed. 🟢 checked, no issue found. ⚪ checked,
not applicable to this architecture.

---

## Supabase RLS

🔴 **Storage bucket had no size/MIME enforcement of its own.**
`inquiry-drawings` relied entirely on the Express backend's own checks
(extension, claimed MIME type, size) — the bucket itself imposed zero
restrictions. This was accepted as low-risk when written, on the
explicit assumption that "the frontend never talks to Supabase
directly." That assumption broke the moment the admin dashboard
shipped (previous phase): it legitimately, necessarily publishes a real
Supabase anon key in its JS bundle (an anon key is *meant* to be
public — Supabase's security model puts the boundary at RLS/bucket
config, not key secrecy). Anyone extracting that key could call
Supabase Storage's API directly — bypassing the Express backend, and
everything it enforces, entirely.
**Fixed**: `database/migrations/20260101000019_security_hardening.sql`
sets `file_size_limit` (20 MB, matching the backend's own limit) and
`allowed_mime_types` (pdf/png/jpeg, plus a documented narrower
allowance for octet-stream to keep DXF/DWG working) directly on the
bucket — enforced by Supabase Storage itself, before any application
code or RLS policy runs.

🟡 **No length limits on any public-insertable free-text column.**
`inquiries`, `inquiry_files`, and `contact_messages` all accept public
INSERTs by design (`with check (true)` — correct for a public RFQ/
contact form), but every `text` column was unbounded. A direct insert
bypassing the Express backend (same root cause as above) could write
arbitrarily large strings into `message`, `company_name`, etc. —
storage-bloat denial of service, essentially free to attempt.
**Fixed**: same migration adds `char_length(...) <= N` CHECK
constraints on every free-text column reachable by a public INSERT,
generous enough that no genuine submission would ever hit them.
Mirrored at the application layer too — see "Input validation" below —
so a real visitor gets a clean 400, not a raw Postgres error.

🟢 **Everything else in the RLS design was already correct** and is
unchanged by this audit: customer data (`inquiries`, `inquiry_files`,
`contact_messages`) has zero SELECT policy for `anon`/`authenticated` —
fully denied, not "unrestricted," per Postgres's own RLS default. Admin
access (`admin_users`, `inquiry_notes`, and the admin SELECT/UPDATE
policies on the tables above) is gated through `is_admin()`, which can
only ever return true for a real, active row in `admin_users` —
provisioned exclusively via `database/scripts/create-admin-user.mjs`,
never self-service. See `ADMIN-DASHBOARD-ARCHITECTURE.md` for the full
reasoning, unchanged here. Verified programmatically (again, as part of
this audit): every RLS-enabled table has at least one policy, no table
is accidentally left in a zero-policy state that wasn't intentional.

---

## Backend API

🔴 **No rate limiting anywhere.** Both write endpoints
(`POST /api/inquiries`, `POST /api/uploads`) could be called without
limit — trivial to script into a flood that fills the database, spams
the notification/confirmation email pipeline (a real cost against the
Resend account), or exhausts Storage quota.
**Fixed**: `backend/src/config/rateLimit.config.js` — a general limiter
across the whole API (300 req/15min, generous backstop) and a stricter
write-specific limiter (10 req/15min per IP) applied to both write
routes specifically. Also added `app.set("trust proxy", 1)` in
`server.js` — without it, rate limiting keys off the wrong IP entirely
once deployed behind any standard reverse proxy/host, silently
defeating the whole control.

🟡 **No baseline security headers.** `helmet` wasn't in use.
**Fixed**: `app.use(helmet())` added in `server.js` — standard-practice
default (X-Content-Type-Options, X-Frame-Options, a conservative CSP,
etc.) for any Express API.

🟢 **Error responses don't leak internals.**
`middleware/errorHandler.js` logs the full error server-side but only
ever sends `{ status, message }` to the client — no stack traces, no
file paths. `err.message` in a couple of paths can include a raw
Supabase/Postgres error string (e.g. a constraint name) if something
unexpected fails — not a secret, but slightly more detail than
strictly necessary; left as-is since it's genuinely useful for
debugging a real integration issue and reveals schema shape at most,
never credentials.

🟢 **No SQL injection surface exists.** Every database call in this
codebase goes through `@supabase/supabase-js` (PostgREST under the
hood, fully parameterized) — there is no raw SQL string ever built from
user input anywhere in `backend/`. Migration files are static SQL, not
templated from request data.

⚪ **CSRF** — not applicable to this architecture. Public form endpoints
use no cookie/session-based authentication (stateless JSON API); the
admin app's Supabase session lives in `localStorage`, not a cookie, so
there's no ambient credential a cross-site request could ride on.

---

## RFQ forms & Contact forms

🟡 **Free-text fields had no length limit, only a presence check.**
Covered under "Supabase RLS" and "Input validation" — same fix, DB
constraints plus a matching application-layer check.

🔴 **Email header injection via the RFQ's free-text product field.**
`buildInternalNotificationEmail`'s Subject line interpolated
`requirement.product` — a free-text field validated only for
non-emptiness — directly into a raw email header. A value containing a
CR/LF could inject additional headers or split the message (classic
email header injection), and nothing validated against that.
**Fixed**: `backend/src/services/email.templates.js` adds
`sanitizeHeaderValue()`, stripping CR/LF before any free-text value
reaches a header. `contact_messages` has no wired email path yet (see
`database/README.md`) so there was nothing to fix there today, but the
same helper is ready if/when that's built.

🟢 **Customer email address is validated before ever being used as an
email `to` address** — `validateInquiryPayload`'s regex
(`^[^\s@]+@[^\s@]+\.[^\s@]+$`) already rejects anything containing
whitespace, which includes CR/LF, so header injection via the `to`
field specifically was never reachable. Confirmed, not assumed —
`\s` in a JS regex matches `\r` and `\n`.

🟢 **No mass-assignment / arbitrary-column risk.**
`inquiry.service.js`'s `mapPayloadToRow()` explicitly picks known
fields into the insert row — it never spreads `req.body` directly —
so an attacker adding extra JSON fields to a request can't write to
any column beyond what the form legitimately collects.

---

## File uploads

Checked against every specific requirement in the brief:

| Requirement | Status | Where |
|---|---|---|
| Restrict extensions | 🟢 already correct | `upload.config.js` `ALLOWED_EXTENSIONS`, checked in `fileValidation.service.js` |
| Restrict MIME types | 🟢 already correct (claimed type) / 🔴 now also real | Claimed-type check pre-existing; **bucket-level `allowed_mime_types` added this audit** — see Supabase RLS section |
| Restrict file size | 🟢 already correct (app-level) / 🔴 now also real | `MAX_FILE_SIZE_BYTES` in multer's `limits`; **bucket-level `file_size_limit` added this audit** |
| Reject executable files | 🟢 already correct | `NEVER_ALLOWED_EXTENSIONS` — hard-blocked, not configurable via env, so a misconfigured `ALLOWED_UPLOAD_EXTENSIONS` can never accidentally permit one |
| Secure storage | 🟢 already correct | Supabase Storage, bucket `public: false`, memory-buffered (never written to this server's disk), random UUID object names (never the client's filename — no path traversal into storage keys), signed URLs only, time-limited |

🔴 **One real gap beyond the checklist**: extension and claimed
Content-Type were both checked, but neither looks at the file's actual
bytes — both are attacker-controlled in a multipart upload. A script
could send a renamed executable as `invoice.pdf` with
`Content-Type: application/pdf` and pass every existing check.
**Fixed**: `fileValidation.service.js` adds `validateFileSignature()` —
real magic-byte checks for PDF/PNG/JPEG (the three formats with a
reliable fixed header). Wired in via
`upload.middleware.js`'s `postUploadSignatureCheck()`, called from
`upload.routes.js` after multer has actually buffered the file (magic
bytes aren't available any earlier — multer's `fileFilter` runs before
the body is buffered). DXF/DWG are documented, not silently skipped, as
a narrower guarantee: neither format has a reliable fixed signature
(DXF is plain ASCII with no header at all; DWG's signature varies by
AutoCAD version), so the extension check remains the real control for
those two — same honest limitation the codebase already stated for the
MIME-type check on those formats before this audit.

---

## Email system

Covered above (RFQ forms). Summary: 🔴 header injection — fixed. 🟢 API
key handling was already correct — `RESEND_API_KEY` is read from
`process.env` in exactly one file (`email.service.js`), never logged,
never returned in any response, never referenced under `frontend/` or
`admin/`. 🟢 Best-effort-after-commit ordering was already correct — an
inquiry is durably saved before any email is attempted, so an email
provider outage can never lose or block a submission.

---

## CORS

🟡 **Single-origin only, no production-shape support.**
`CORS_ORIGIN` accepted exactly one string — no way to allow both an
apex and `www` origin, or staging + production, without a code change.
**Fixed**: `backend/src/config/env.js` now accepts a comma-separated
list. No wildcard fallback was ever present and none was added — an
open CORS policy on a write-accepting, file-upload-accepting API is not
safe under any circumstance, so there's deliberately no convenience
default that allows everything.

🟢 `credentials: true` was never set (checked, confirmed) — no risk of
accidentally allowing cross-origin requests to carry cookies/credentials.

---

## Input validation

🟡 Covered above — length limits added at both the database (the real
boundary) and application layer (for a clean error message) for every
public-insertable free-text field.

🟢 Everything else was already solid: required-field checks, email
format regex, quantity must be a positive integer, material must be
one of a known set — all pre-existing and confirmed still correct.
Every one of these is duplicated as an actual Postgres CHECK constraint
too (not just application code), so even a request that somehow
bypassed `inquiry.service.js`'s validation (or a direct Supabase
insert) still can't write a malformed row — the database itself is the
final backstop, not just the first line of defense.

---

## Rate limiting

🔴 See "Backend API" — was entirely absent, now applied per-route with
a stricter limit on the two write endpoints and `trust proxy`
configured so it actually keys off the real client IP once deployed.

---

## XSS

🟢 **No XSS vector found anywhere in this codebase.**
- Every email template escapes user-supplied values before
  interpolating them into HTML (`escapeHtml()` in
  `email.templates.js`) — confirmed applied to every field, including
  ones added this audit (file URLs, now also escaped for the `href`
  attribute specifically, since a raw `&` in an unescaped `href` is
  technically invalid HTML even though most clients tolerate it).
- The public frontend, admin app, and every React component render
  user-supplied data exclusively as JSX text content — React escapes
  this automatically. `grep`'d the entire repo for
  `dangerouslySetInnerHTML`: zero matches, in `frontend/`, `admin/`,
  or anywhere else.
- No `eval`, `new Function`, or similar dynamic code execution anywhere
  in the codebase — also grep-verified, zero matches.

---

## Injection

🟢 **SQL injection**: not reachable — see "Backend API" above (no raw
SQL built from user input, ever).
🔴 **Email header injection**: found and fixed — see "RFQ forms" above.
🟢 **Command injection**: no shell/`child_process` usage anywhere in
this codebase (grep-verified).
🟢 **NoSQL/ORM injection**: not applicable — Postgres via
`@supabase/supabase-js`'s parameterized query builder throughout.

---

## Secrets & Environment variables

🟢 **Confirmed, not assumed** — grepped the entire repository
(excluding `node_modules`/`.env` files) for every secret name and for
key-shaped strings (`sk_`, `re_...`, JWT-shaped `eyJ...`):

- `SUPABASE_SERVICE_ROLE_KEY` — appears only in `backend/src/config/supabaseClient.js`
  (reads from `process.env`, never logged, never returned in a
  response) and in comments/documentation explaining why it must stay
  there. Zero appearances anywhere under `frontend/` or `admin/`.
- `RESEND_API_KEY` — same pattern, confined to
  `backend/src/services/email.service.js`.
- Database credentials — there are none beyond the above; this project
  has no direct Postgres connection string anywhere, only the Supabase
  client libraries.
- No hardcoded key-shaped literal was found anywhere in source.

🟢 `.gitignore` already covers `.env`, `.env.local`, and `*.local` at
the repo root — applies to every subfolder (`backend/.env`,
`frontend/.env`, `admin/.env`) since git's ignore patterns are
recursive by default.

🟢 `admin/`'s anon key exposure is intentional and safe by design (see
`admin/src/lib/supabaseClient.js`'s own comment, and
`ADMIN-DASHBOARD-ARCHITECTURE.md`) — an anon key is not a secret in
Supabase's model; RLS is the boundary. This audit's job regarding that
key was to make sure nothing *else* assumed it would stay private
(it doesn't — see the Storage bucket fix above, which was exactly that
assumption breaking).

🟡 One clarification, not a code fix: `.env.example`'s comment already
correctly said "never put secrets in anything prefixed `VITE_`," but
this audit adds an explicit line to `backend/.env.example` for the new
`RATE_LIMIT_*` variables and the multi-origin `CORS_ORIGIN` format, so
production configuration isn't guesswork.

---

## What's unchanged, and why

- The public INSERT policies on `inquiries`/`inquiry_files`/
  `contact_messages` remain intentionally open (`with check (true)`) —
  that's correct behavior for a public RFQ/contact form with no
  authentication system for visitors. What changed is that those
  inserts are now bounded (length limits, bucket-level file
  restrictions) rather than unbounded, closing the gap that mattered
  without breaking the form's actual purpose.
- No CAPTCHA/bot-challenge was added. Rate limiting narrows the
  practical abuse window significantly; a CAPTCHA is a real, larger
  product decision (which provider, where in the form, accessibility
  tradeoffs) that wasn't part of this audit's brief and would be worth
  raising separately if spam volume becomes a real problem in
  practice — noted here so it isn't mistaken for an oversight.
