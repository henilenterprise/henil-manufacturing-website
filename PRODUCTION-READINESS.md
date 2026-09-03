# Production Readiness

Consolidated pre-launch checklist for the whole project — frontend,
backend, admin dashboard, and database. Most of the underlying work
(security hardening, SEO, performance, RLS) was done in earlier phases
and has its own detailed report; this document is the single place that
confirms each is actually in place, points to the detail, and — the one
genuinely new piece — gives the complete, consolidated list of
environment variables a real deployment needs.

## Honest limitation, stated once for the whole document

This sandbox has no network access. `npm install` fails against the
real registry for every one of the three apps (confirmed again this
pass, not assumed):

```
$ cd frontend && npm run build
> vite build
sh: 1: vite: not found

$ cd backend && npm install
npm error 403 403 Forbidden - GET https://registry.npmjs.org/...
```

**A real `npm run build` could not be run here — you need to run it.**
What was done instead, every item below: `tsc --noResolve` syntax
checking across all three apps' full source trees, CSS brace-balance
checks, `node --check` on every backend file, a script that
cross-references every `import` statement in the codebase against each
`package.json`'s declared dependencies (confirms nothing would fail to
resolve at build time — zero missing declarations found), and
re-running this project's full real test suite (273 assertions across
12 scripts, all passing). This is the same substitute-verification
method used consistently throughout this project wherever a real
build/runtime wasn't available — see the root README and every
`*-AUDIT.md` file for the same caveat applied to earlier phases.

**Before you deploy**, run these yourself and treat them as the real
test:

```bash
# Frontend
cd frontend && npm install && npm run build && npm run preview

# Backend
cd backend && npm install && npm start
# then in another terminal:
curl http://localhost:5000/api/health

# Admin
cd admin && npm install && npm run build && npm run preview

# Full test suite (works right now, no install needed beyond Node itself)
node frontend/scripts/test-applications.mjs   # ...and every other frontend/scripts/*.mjs
node backend/scripts/test-quote-integration.mjs
node backend/scripts/test-email-integration.mjs
```

---

## Checklist

### Frontend build
Verified via static analysis (real build not runnable here — see
above): every import resolves, every `.jsx`/`.js` file is syntactically
valid, every dependency used in code is declared in `package.json`.
Route-based code splitting (`React.lazy`) and vendor chunking are
configured in `vite.config.js` — see `PERFORMANCE-AUDIT.md`.

### Backend build
No bundler — this is a plain Node/Express app, so "build" means "does
it start and are all files valid." Every file passes `node --check`.
`npm start` runs `node src/server.js` directly (see `package.json`).
Confirmed no import resolves to an undeclared dependency.

### Supabase
19 migrations, applied in order, covering the full schema —
products/content, RFQ inquiries, admin dashboard tables, and this
phase's security hardening. RLS enabled on every table with at least
one policy (verified programmatically — no table is accidentally
either wide-open or silently zero-policy-locked). Full architecture in
`ADMIN-DASHBOARD-ARCHITECTURE.md` and `database/README.md`.
**Action needed from you**: run the migrations against a real Supabase
project (`supabase db push` or equivalent) — this is the one step that
genuinely can't be verified from here, same as every prior phase has
noted.

### Storage
`inquiry-drawings` bucket is private (`public: false`), with
`file_size_limit` (20MB) and `allowed_mime_types` set directly on the
bucket — enforced by Supabase Storage itself, not just application
code (see `SECURITY-AUDIT.md` for why that distinction mattered).
Object paths are random UUIDs, never client-supplied filenames.

### Email
Resend integration is best-effort — an RFQ submission is durably
saved to the database *before* any email is attempted, so an email
provider outage never loses or blocks a real inquiry. `RESEND_API_KEY`
confined to one file (`backend/src/services/email.service.js`), never
logged, never returned in any API response. Email header injection via
free-text fields (found and fixed in `SECURITY-AUDIT.md`) is closed.

### Environment variables
See the complete table below — every variable this project reads,
across all three apps.

### CORS
`backend/src/config/env.js` accepts a comma-separated origin list
(apex + www, or staging + production) with no wildcard fallback ever
available. Requires `CORS_ORIGIN` to be set to your real production
origin(s) — the default (`http://localhost:5173`) only works for local
development.

### Security
Full audit in `SECURITY-AUDIT.md`. Summary: `helmet` for security
headers, rate limiting on write endpoints (with correct `trust proxy`
handling for reverse-proxy deployments), file-content magic-byte
validation (not just extension/claimed-MIME), no SQL injection surface
(parameterized queries throughout), no XSS vector found (zero
`dangerouslySetInnerHTML`, zero `eval`), and the service role
key/Resend key/database credentials each confirmed (via repo-wide
grep, not assumption) to exist in exactly one server-side file.

### SEO
Full implementation in the SEO-focused phase (see root README's "SEO
& Google Search readiness" section): per-page titles/descriptions,
canonical URLs, Open Graph, Organization + LocalBusiness + Product +
BlogPosting + FAQPage structured data, all sourced from the single
`company.config.js`.

### Sitemap
`frontend/public/sitemap.xml` exists, listing every static route,
all products, and all blog posts — **but uses a placeholder domain**
(`https://www.henilenterprise.com`). This is a static file (no
server-render step to regenerate it), so **you must manually replace
the domain** before submitting to Search Console, and regenerate the
URL list by hand if products/posts change. Flagged clearly rather than
silently shipped as if it were final.

### Robots
`frontend/public/robots.txt` allows full crawling, excludes
`/design-system` (internal tooling), and points at the sitemap — same
placeholder-domain caveat as above applies to the `Sitemap:` line in
this file too.

### Performance
Full audit in `PERFORMANCE-AUDIT.md`. Summary: route-based code
splitting, a graceful `backdrop-filter` fallback for unsupported
browsers (previously completely missing despite 46 uses across the
codebase), reduced blur radius on mobile, three animations converted
from paint-heavy `background-position` to compositor-only `transform`,
proper image loading priority (`fetchPriority`/`loading`/`decoding`)
tuned per-image rather than blanket-applied, and gzip/brotli
compression on the API.

---

## Complete production environment variables

Every variable this project reads, anywhere, across all three apps.
🔴 = required for core functionality to work at all. 🟡 = optional,
strengthens a specific feature (local SEO, analytics, rate-limit
tuning) but the site works without it. Full explanatory comments for
every one of these already live in `.env.example` and
`admin/.env.example` — this table is the flat, complete reference.

### `backend/.env`

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | 🟡 | Server port. Defaults to 5000. |
| `NODE_ENV` | 🟡 | Set to `production` in production. |
| `CORS_ORIGIN` | 🔴 | Your real frontend origin(s), comma-separated. **Never `*`.** |
| `RATE_LIMIT_GENERAL_MAX` | 🟡 | Requests/15min across the whole API. Default 300. |
| `RATE_LIMIT_WRITE_MAX` | 🟡 | Requests/15min on write endpoints. Default 10. |
| `TRUST_PROXY_HOPS` | 🟡 | Number of reverse-proxy hops in front of this app. Default 1 — only change if deployed behind more than one proxy. |
| `SUPABASE_URL` | 🔴 | Your Supabase project URL. Without it, `/api/inquiries` and `/api/uploads` return 503. |
| `SUPABASE_SERVICE_ROLE_KEY` | 🔴 | **Secret.** Bypasses RLS entirely. Server-side only, never `VITE_`-prefixed. |
| `SUPABASE_STORAGE_BUCKET` | 🟡 | Defaults to `inquiry-drawings`, matching the migration. |
| `RESEND_API_KEY` | 🟡 | **Secret.** Without it, inquiries still save; email notifications are skipped. |
| `EMAIL_FROM` | 🟡 | Sender shown on outbound emails. |
| `HENIL_NOTIFICATION_EMAIL` | 🟡 | Where internal RFQ notifications go. Blank = notifications skipped. |
| `EMAIL_RESPONSE_MESSAGE` | 🟡 | Customer-facing response-time copy. |
| `ALLOWED_UPLOAD_EXTENSIONS` | 🟡 | Defaults to `pdf,png,jpg,jpeg,dxf,dwg`. |
| `MAX_UPLOAD_SIZE_MB` | 🟡 | Defaults to 20. **Keep in sync with the storage bucket's `file_size_limit`** — see `database/migrations/20260101000019_security_hardening.sql`. |
| `MAX_UPLOAD_FILES` | 🟡 | Defaults to 5. |

### `frontend/.env`

| Variable | Required | Purpose |
|---|---|---|
| `VITE_WHATSAPP_NUMBER` | 🟡 | Without it, every WhatsApp button/link is hidden entirely (never a broken link). |
| `VITE_WHATSAPP_MESSAGE_DEFAULT` / `VITE_WHATSAPP_MESSAGE_PRODUCT` | 🟡 | Prefilled WhatsApp message text. |
| `VITE_PHONE_NUMBER` | 🟡 | Shown site-wide; without it, phone CTAs are hidden. |
| `VITE_CONTACT_EMAIL` | 🟡 | Shown site-wide; without it, email CTAs are hidden. |
| `VITE_ALLOWED_UPLOAD_EXTENSIONS` / `VITE_MAX_UPLOAD_SIZE_MB` / `VITE_MAX_UPLOAD_FILES` | 🟡 | UX-only client-side hints — the backend values are the real enforcement. Keep in sync. |
| `VITE_BROCHURE_URL` / `VITE_BROCHURE_FILENAME` | 🟡 | Defaults to a local file path — override to host elsewhere. |
| `VITE_STREET_ADDRESS` / `VITE_POSTAL_CODE` | 🟡 | Local SEO — omitted from structured data if blank, never faked. |
| `VITE_GEO_LATITUDE` / `VITE_GEO_LONGITUDE` | 🟡 | Local SEO geo-coordinates. |
| `VITE_GOOGLE_MAPS_EMBED_URL` | 🟡 | Contact page map — falls back to a city-level map if blank. |
| `VITE_BUSINESS_HOURS_NOTE` | 🟡 | Contact page hours line. |
| `VITE_SITE_URL` | 🔴 for correct SEO | Real production domain, no trailing slash. Used for canonical URLs, Open Graph, structured data. Falls back to `window.location.origin` at runtime if blank, so the site *works* without it, but canonical/OG tags won't be fully correct until it's set. |
| `VITE_BUSINESS_DESCRIPTION` | 🟡 | Overrides the default Organization/LocalBusiness description. |
| `VITE_SOCIAL_FACEBOOK` / `_INSTAGRAM` / `_LINKEDIN` / `_TWITTER` / `_YOUTUBE` | 🟡 | Each becomes a `sameAs` structured-data entry if set. |
| `VITE_GOOGLE_BUSINESS_PROFILE_URL` | 🟡 | Same `sameAs` mechanism. |
| `VITE_GSC_VERIFICATION_CODE` | 🟡 | Google Search Console ownership verification. |
| `VITE_GA_MEASUREMENT_ID` | 🟡 | Google Analytics 4. Fully inactive (no script loads at all) until set. |

### `admin/.env`

| Variable | Required | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | 🔴 | Same Supabase project as the backend. |
| `VITE_SUPABASE_ANON_KEY` | 🔴 | The **anon** key — safe to expose publicly by design; Row Level Security is the real boundary, not this key. **Never the service role key.** |

### Shell environment (one-off, not a `.env` file)

| Variable | Required | Purpose |
|---|---|---|
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | 🔴 (once, per admin created) | Passed only at invocation time to `database/scripts/create-admin-user.mjs` — the sole way an admin dashboard account is provisioned. Never saved to a file. |

---

## Ensuring secrets cannot be committed

- `.gitignore` now ignores `.env` and every `.env.*` variant (covers
  `.env.production`, `.env.local`, anything future) at any depth in the
  repo, while explicitly keeping `.env.example` files trackable (they
  contain no real values and are how anyone new to this repo knows what
  to configure). Also added `*.pem`/`*.key`/`*.p12`/`*.pfx` as defense
  in depth beyond env files specifically.
- Confirmed (grep, not assumption — see `SECURITY-AUDIT.md`'s "Secrets
  & Environment variables" section) that `SUPABASE_SERVICE_ROLE_KEY`
  and `RESEND_API_KEY` each appear in exactly one file, both
  server-side only, never in anything under `frontend/` or `admin/`.
- `admin/`'s Supabase anon key is the one credential intentionally
  public — by design, not by accident. See
  `ADMIN-DASHBOARD-ARCHITECTURE.md` for why that's safe.
