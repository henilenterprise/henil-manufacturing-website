# Henil Enterprise

*(Repository folder is named `henil-manufacturing` — that's just the
project directory name; the actual brand, confirmed by the real logo, is
**Henil Enterprise**. All customer-facing copy uses that name.)*

A brand-new project, fully independent of any previous Henil Enterprise
application. Nothing from earlier projects was touched, modified, or reused
as a base.

## Structure

```
henil-manufacturing/
├── frontend/   React + Vite + React Router + Lucide React
├── backend/    Node.js + Express
└── database/   (empty for now — schema/migrations come in a later phase)
```

This phase is scaffolding only: a basic homepage, a basic Express server,
and one working API route (`GET /api/health`) proving the two talk to each
other. No product catalog, RFQ form, database, or auth yet.

## Design system

The full visual design system lives under `frontend/src/components/ui/` and
is documented live at **`/design-system`** once the frontend is running —
open `http://localhost:5173/design-system` to see every color token,
type sample, and component rendered together.

**Palette:** sampled directly from the real Henil Enterprise logo — a
neutral near-black background (`#161616`) and a champagne gold accent
(`#eeca8c`), both pixel-sampled from the actual artwork rather than
chosen from a mood board. Full derivation and usage rules are in
[`BRAND-SYSTEM.md`](./BRAND-SYSTEM.md).

**Glass components** (translucent, blurred, gold hairline border — used
for anything that holds content): `GlassCard`, `GlassPanel`, `GlassModal`,
`GlassNavbar`, `GlassBadge`.

**Neomorphic components** (tactile, embossed/inset shadows — used for
things you press or toggle): `NeoButton`, `NeoInput`, `NeoToggle`,
`NeoControl`.

**General components**: `Button` (solid/ghost/glass), `Input`
(flat/glass/neo), `Card`, `Table`, `Badge` (outline/solid/glass ×
neutral/accent/success/warning/error), `Dropdown`, `Select`, `Spinner` +
`Skeleton` (loading), `EmptyState`, `ErrorState`, and a `Toast` system
(`ToastProvider` + `useToast()`, already wired up in `App.jsx`).

Import anything from the single barrel file:
```js
import { GlassCard, Button, useToast } from "../components/ui/index.js";
```


## Navigation

The site nav (`frontend/src/components/MainNav.jsx`) is a floating glass
pill, fixed to the top of every page. On scroll past 16px it smoothly
transitions to a shorter, more opaque, shadowed state (see
`MainNav.css`). Desktop shows the full link row + a WhatsApp icon button
+ the "Get a Quote" CTA; below 1024px it collapses to a hamburger that
opens a full-screen glass menu with 52px-minimum touch targets.

Navigation links, routes, and the primary CTA are all driven from one
file — `frontend/src/config/site.config.js` — so the desktop bar, the
mobile menu, and the footer nav can never drift out of sync with each
other or with `App.jsx`'s route table.

**Routes**: `/`, `/about`, `/products`, `/capabilities`, `/industries`,
`/gallery`, `/blog`, `/contact`, `/get-a-quote`, plus `/design-system`
and a `*` 404 fallback. Every route beyond Home currently renders a
styled placeholder (`PagePlaceholder.jsx`) — real content per page is a
later phase — but every link in the header, mobile menu, and footer
resolves to a real, reachable page today.

**How routes were tested**: this sandbox has no browser, so testing was
a static audit rather than a live click-through — a script cross-checked
every nav href against `App.jsx`'s route table (no orphan links, no
duplicate paths, wildcard fallback present) and confirmed every route's
component file actually exists on disk. Please click through all nine
nav links, the CTA, and the WhatsApp button yourself once it's running,
and confirm the mobile menu opens/closes correctly on an actual phone
width.

## Homepage

The homepage (`frontend/src/pages/Home.jsx`) composes eight sections, top
to bottom:

1. **Hero** — headline, supporting copy, three CTAs (Get a Quote / View
   Capabilities / WhatsApp Us), and an original SVG technical illustration
   (`sections/HeroVisual.jsx`) — layered sheets, a dashed cut-path, and a
   traveling laser line inside a glass frame. Not stock photography.
2. **Capability Strip** — the six processes (CNC Routing, Laser Cutting,
   Bending, Cutting, Bonding, Custom Fabrication), each linking to
   `/capabilities`.
3. **Products** — four featured category cards linking to `/products`.
4. **Custom Fabrication** — "Have a Drawing? We'll Build It.", listing the
   five acceptable inputs (drawing, dimensions, sample, CAD file,
   specification) and an Upload Drawing CTA.
5. **Industries** — the eight served industries as chips.
6. **Why Henil** — six points, all qualitative (custom fabrication,
   quantity orders, engineering understanding, consistent quality,
   flexible production, B2B support) — no invented certifications or
   statistics, per the brief.
7. **Process** — the seven-step order flow (Drawing → Material → Cutting →
   Bending → Bonding → Inspection → Dispatch), numbered because it's a
   genuine sequence.
8. **Final CTA** — "Have a Requirement?" with a Get a Quote button.

All copy, capability/industry/category lists, and process steps are
pulled from `frontend/src/config/site.config.js` — the same file that
drives the navigation — so nothing here can drift out of sync with the
nav or get retyped differently on another page later.

## Product detail system

`/products/:slug` (e.g. `/products/custom-acrylic-tank`) renders a full
detail page for any product in `frontend/src/data/products.data.js` —
gallery, name, category, description, applications, material, thickness,
dimensions, customization, quantity orders, technical information, and
related products. Fields that would otherwise need invented numbers
(thickness, dimensions, technical info) pull honest, qualitative policy
text from `productPolicy.data.js` instead — no fabricated specs.

**Get a Quote pass-through**: every "Get a Quote" link from a product
card or detail page carries `productId`, `product` (name), and
`productUrl` as query params. `/get-a-quote` already reads and displays
these today (a small "This inquiry is pre-filled for…" banner) — a real,
working demonstration that the hand-off works, not just a placeholder
link.

**Sticky CTA**: `StickyInquiryPanel` sticks alongside the content on
desktop (1024px+); `MobileStickyCTA` is a fixed bottom bar below that
breakpoint. Only one is ever visible at a time.

**Related products**: same-category items first; categories with fewer
than 4 products (several currently only have 1) are topped up with other
featured products rather than showing an empty or half-empty section.

## Industries page

`/industries` covers all 10 industries as an interactive tab + glass
panel explorer (same pattern as `/capabilities`): Pharmaceutical,
Engineering, Manufacturing, Chemical, Food Processing, Packaging,
Automotive, Industrial Machinery, Laboratory, Retail. Each shows common
requirements, relevant product categories, applications, fabrication
capabilities, and a Get a Quote CTA carrying that industry as context.

Everything is generic to the industry itself — no specific customer
names, logos, or case studies are invented anywhere in
`data/industries.data.js`. The "relevant products" and "fabrication
capabilities" shown for each industry are real cross-references into
`categories.data.js` and the capability list, not separate invented
claims — verified by actually running the data through Node, not just
checking it parses.

The homepage's industries teaser and the full `/industries` page both
read from this one file now, replacing an earlier, shorter duplicate
list that didn't include Laboratory or Retail.

## Custom Fabrication & file upload

`/custom-fabrication` — "Your Drawing. Our Fabrication." — explains the
six accepted input types (engineering drawings, CAD files, samples,
dimensions, specifications, custom requirements), a six-step interactive
process flow (auto-advances on load, click any step to take manual
control), and a prominent **Upload Your Drawing** CTA that opens a real,
working upload widget — not a mockup.

**This is a genuinely functional feature**, not a placeholder:

- `POST /api/uploads` (backend) actually accepts files via multer
  (in-memory, not disk) and uploads them straight to **Supabase
  Storage** — see the RFQ section below for the full integration; this
  page and `/quote`'s file step now share the exact same upload path.
  The original filename is never trusted for the storage path (that's
  how path traversal attacks work) — a fresh random name is generated
  server-side, and the API returns metadata only, never a storage path
  a client could probe.
- Every file is checked against **both** its extension and its mimetype,
  not just one — checking only one is trivially spoofable. DXF/DWG have
  no reliable standard mimetype across browsers, so those two are matched
  on extension only (documented in `backend/src/config/upload.config.js`).
- Executables are blocked by a **hardcoded** denylist (`.exe`, `.bat`,
  `.sh`, `.js`, `.msi`, `.scr`, and 20+ others) that is deliberately *not*
  driven by environment variables — a misconfigured `ALLOWED_UPLOAD_EXTENSIONS`
  env var can never accidentally allow an executable through.
- Allowed extensions and size/count limits ARE configurable via
  `ALLOWED_UPLOAD_EXTENSIONS`, `MAX_UPLOAD_SIZE_MB`, and `MAX_UPLOAD_FILES`
  in `backend/.env` (defaults: pdf, png, jpg, jpeg, dxf, dwg / 20MB / 5
  files) — matching `.env.example`.
- The frontend has its own copy of this config for immediate UX feedback
  (`frontend/src/config/upload.config.js`), but that is explicitly **not**
  the security boundary — a request could skip the browser entirely, so
  the backend re-validates everything independently regardless of what
  the client sent.
- I verified the validation logic by actually running it (not just
  checking it parses) against adversarial inputs — double extensions
  (`fake.pdf.exe`), mimetype/extension mismatches, and case variation
  (`sneaky.PDF`) — all handled correctly. See the conversation history
  for the exact test output if you want to reproduce it.
- No CAD format beyond the six listed is claimed as supported anywhere
  in the UI or config — `DrawingUpload.jsx` explicitly says other formats
  "may work but haven't been verified yet."

**To actually test the upload**: start both servers (see Setup below),
configure `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` in `backend/.env`
(see the RFQ section below), visit `/custom-fabrication`, click "Upload
Your Drawing", and try both a real PDF/image and something like a
renamed `.exe` — the second should be rejected with a clear message.
Without Supabase configured, the upload will fail with a clear 503
rather than silently pretending to succeed — see the RFQ section for
why that's the intended behavior now, not a bug.

## RFQ / Get a Quote system — now connected to real Supabase

`/quote` is a full 7-step wizard: Company → Requirement → Dimensions →
File → Delivery → Message → Review. The old `/get-a-quote` route
redirects to `/quote` (preserving query params) rather than being
deleted.

**Mock submission behavior has been removed.** The backend no longer
writes anything to local disk — `backend/uploads/` and
`backend/inquiries/` (the earlier placeholder persistence) have been
deleted entirely. Submissions now go to real Supabase Postgres and
Storage, using the schema built in the previous phase
(`database/migrations/`).

### Architecture: why the frontend needed zero changes

The frontend has **never** talked to Supabase directly — it only ever
calls this project's own Express backend (`/api/uploads`,
`/api/inquiries`), exactly as it did with the old disk-based mock. Only
the backend's *implementation* of those two endpoints changed, from
"write to local disk" to "call Supabase." The request/response shapes
are unchanged (the upload response gained one additional field,
`storagePath`, which the frontend already ignores safely), so
`frontend/src/services/uploadService.js`, `inquiryService.js`, and every
component using them needed **no edits at all** — verified by grepping
for what fields the frontend actually reads off each response.

This is also *why* keeping the service role key off the frontend was
straightforward rather than something requiring careful handling: there
was never a path for it to reach client code in the first place.

### What actually happens on submission now

1. **Validate** — `inquiry.service.js`'s `validateInquiryPayload()`
   checks required fields, email format, quantity (must be a positive
   integer), and material (must be a known value) — before anything
   touches the database.
2. **Resolve the product reference** — closes a gap flagged as
   unresolved when the schema was written: the frontend's
   `requirement.productId` is a slug string (e.g.
   `"custom-acrylic-tank"`), but `inquiries.product_id` is a UUID
   foreign key. `resolveProductId()` looks the slug up in the real
   `products` table and uses its actual `id`, or `null` if there's no
   match (e.g. a free-text custom request, or a stale link) — never
   passes the raw slug string into a UUID column.
3. **Generate the reference number** — unchanged from the previous
   phase, deliberately: the file-based counter
   (`inquiryCounter.service.js`) already proved itself correct
   (including surviving a simulated restart) and isn't Supabase's
   concern, per the comment already in the `inquiries` migration.
4. **Insert the inquiry** into Supabase Postgres via `supabase.from
   ("inquiries").insert(...)`.
5. **Upload attached files to Supabase Storage** — `storage.service.js`
   uploads each file's buffer (multer now uses memory storage, not disk)
   to the `inquiry-drawings` bucket under a fresh random name, never the
   client-supplied filename.
6. **Store file metadata** — once the inquiry row exists (so a real
   `inquiry_id` is available), each uploaded file gets an `inquiry_files`
   row linking it to that inquiry.
7. **Return the reference number** to the frontend, which shows it on
   the success screen exactly as before.

### The service-role key

`SUPABASE_SERVICE_ROLE_KEY` (set in `backend/.env` only) has full
database access and bypasses Row Level Security entirely — it is read
in exactly one file, `backend/src/config/supabaseClient.js`, via
`process.env`, and is never included in any API response, never logged,
and never referenced anywhere under `frontend/`. I verified this by
grepping the entire `frontend/` directory for the key name and for any
`VITE_SUPABASE*` variables — zero matches, confirmed clean.

### Loading / Error / Success / Retry

- **Loading** — the Review step's submit button shows a spinner and
  disables itself while the request is in flight.
- **Error** — a real network or validation failure shows the server's
  actual error message inline on the Review step (not a generic "something
  went wrong"), and a toast.
- **Success** — replaces the entire wizard with a confirmation screen
  showing the real reference number and a copy-to-clipboard button.
- **Retry** — on error, the submit button's label changes to "Retry
  Submission" (same handler, but now unambiguous that clicking it tries
  again with the same filled-in form rather than starting over).

### What if Supabase isn't configured?

The server still starts (so you can still browse the site and see the
health check), but `POST /api/uploads` and `POST /api/inquiries` return
a clear `503` explaining exactly what's missing, instead of silently
pretending to succeed. A startup warning is also logged. This is a
deliberate choice: "remove mock submission behavior" means the mock
path is gone, not replaced with a different, quieter mock.

### An honest limitation: this was tested, but not against a live database

This sandbox has no network access, so a real Supabase project could not
be created or connected to here — the same limitation as the previous
phase's schema work. What I actually did instead of skipping testing:

- Refactored the file-type validation into a pure function
  (`fileValidation.service.js`) with no dependency on `multer`, and the
  core inquiry logic (`inquiry.service.js`) and storage logic
  (`storage.service.js`) to accept a Supabase client as a **parameter**
  rather than importing one directly — dependency injection specifically
  so this code could be exercised in isolation.
- Wrote a fake Supabase client (`backend/scripts/fakeSupabaseClient.mjs`)
  implementing just the query-builder methods this project's code
  actually calls, and a second fake that fails every call, for testing
  error handling.
- Wrote and **ran** `backend/scripts/test-quote-integration.mjs` against
  the real service code with that fake client — all 6 requested
  scenarios (Normal quote, Product quote, Quantity order, Drawing
  upload, Invalid form, Unsupported file), 30 individual assertions,
  **all passing**. Re-run it yourself with:
  ```bash
  node backend/scripts/test-quote-integration.mjs
  ```

This proves the business logic — validation, reference generation, slug
resolution, row shaping, file linking, error propagation — is correct.
It does **not** prove a real Supabase project accepts these exact calls;
only connecting a real project and submitting the form for real can
prove that. Please do that once you've created a project and filled in
`SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` — I'd treat it as the actual
final test, not a formality.

## Email notifications

When an RFQ is submitted, two emails go out — after the inquiry is
already safely stored, never before, and never in a way that can affect
whether the visitor sees a successful submission.

**Provider: [Resend](https://resend.com).** Chosen over SendGrid,
Postmark, or SES for this project because: a clean, modern API with an
official Node SDK; you can send real test emails within minutes using
their sandbox sender (`onboarding@resend.dev`) with **no domain
verification required to get started** (SES in particular requires
verifying a domain or being taken out of its sandbox mode before it'll
send to arbitrary addresses, which is unnecessary friction for getting
this feature working); and a generous free tier (3,000 emails/month at
the time of writing) that comfortably covers RFQ volume for a business
this size. Switching providers later is a small, contained change — see
"Provider independence" below.

### Setup

1. Sign up at [resend.com](https://resend.com) and create an API key
   (Dashboard → API Keys).
2. For real production use, verify your own sending domain (Dashboard →
   Domains) so emails come from `you@henilenterprise.com` instead of
   Resend's shared sandbox address — until then, the sandbox sender
   works fine for testing but can only send to the email address you
   signed up to Resend with.
3. Fill in `backend/.env`:
   ```
   RESEND_API_KEY=re_your_actual_key
   EMAIL_FROM=Henil Enterprise <onboarding@resend.dev>
   HENIL_NOTIFICATION_EMAIL=your-team-inbox@henilenterprise.com
   ```
4. Restart the backend.

Without `RESEND_API_KEY` set, inquiries still submit and save
successfully — email is best-effort notification, not a requirement for
the RFQ system to work (see "If email fails" below). A clear warning is
logged instead of emails silently not sending.

### What each email contains

**Internal notification** (to `HENIL_NOTIFICATION_EMAIL`) — every field
requested: inquiry reference, company, contact person, phone, email,
product, quantity, material, thickness, dimensions, delivery date,
delivery location, message, and drawing/file information. Attached files
get a real clickable link — a 7-day signed URL into the private
`inquiry-drawings` Supabase Storage bucket — not just a filename, since
the bucket itself has no public access (see the RLS policy in
`database/migrations/..._create_storage_bucket.sql`).

**Customer confirmation** (to whatever email the visitor submitted) —
thanks them, includes the inquiry reference, product, and quantity, and
an expected-response message. That message is deliberately generic
("Our team will review your inquiry and get back to you as soon as
possible") rather than a specific promised turnaround time like "1–2
business days" — committing to an SLA isn't something to invent on your
behalf; set `EMAIL_RESPONSE_MESSAGE` in `.env` if you want to promise a
specific timeframe.

### If email fails, the inquiry is not lost — verified by ordering, not just a try/catch

`inquiry.controller.js`'s `submitInquiry()` sends the HTTP response
(`201`, with the real reference number) **immediately after** the
inquiry is successfully stored in Supabase — before any email code runs
at all. Email sending happens afterward, wrapped so that:

- If Resend isn't configured, the inquiry still saves and the visitor
  still gets their reference number; only a server-side warning is
  logged.
- If sending either email throws (network failure, invalid address,
  provider outage), it's caught and logged with the reference number —
  the response already sent to the visitor is completely unaffected,
  because it was sent before this code ran, not after.
- The two emails are independent: a failure sending the internal
  notification does not stop the customer confirmation from being
  attempted, and vice versa.

### Provider independence

Only one file, `backend/src/services/email.service.js`, knows it's
talking to Resend specifically (`sendViaResend()`). Every other piece —
the templates (`email.templates.js`), the send orchestration
(`emailOrchestrator.service.js`) — works against a generic
`sendFn({ to, subject, html, text }) => Promise` and would work
unchanged with a different one-file adapter for SendGrid, Postmark, or
SES.

### An honest limitation: tested, but not against a live inbox

Same constraint as the Supabase integration: this sandbox has no network
access, so no real email was actually sent or received during this
build — I don't have a Resend account or a real inbox to check. What I
did instead:

- Built the templates as pure functions with no dependency on Resend
  (`email.templates.js`), and the send orchestration to accept an
  injected `sendFn` rather than importing the Resend client directly
  (`emailOrchestrator.service.js`) — specifically so both are testable
  without the `resend` package even being installed (it isn't, in this
  sandbox, for the same no-network reason).
- Wrote and **ran** `backend/scripts/test-email-integration.mjs` — 60
  assertions, all passing: every required field present in both the
  internal notification's HTML and plain-text versions; the customer
  confirmation's content; **HTML-escaping actually verified against a
  malicious payload** (a company name containing `<script>alert(1)
  </script>` — confirmed it appears escaped, not raw, in the output,
  since these are real user-submitted fields going into an HTML email);
  independent failure handling (one email failing doesn't block the
  other, tested in both directions); and signed-URL generation
  degrading gracefully to a working email without a link when Storage
  is unavailable.
  ```bash
  node backend/scripts/test-email-integration.mjs
  ```

This proves the email *logic* — content, escaping, ordering, failure
isolation — is correct. It does not prove Resend's API accepts these
exact calls, or that emails actually arrive and render correctly in a
real inbox. Please do that once you've added a real API key — open both
emails yourself, on a real device, before considering this fully done.

## WhatsApp feature

`FloatingWhatsAppButton` is the one canonical, persistent WhatsApp entry
point for the site — fixed bottom-right (moved from an earlier
bottom-left placement, on direct request), rendered once in `MainLayout` so
it appears on every real page automatically (verified by checking all
13 page components; only the internal `/design-system` reference page,
which has its own separate header, doesn't use `MainLayout`).

**Configurable, not hardcoded**: the number (`VITE_WHATSAPP_NUMBER`) and
*two* independent message templates
(`VITE_WHATSAPP_MESSAGE_DEFAULT`, `VITE_WHATSAPP_MESSAGE_PRODUCT`) all
come from `frontend/.env`. The product template uses a `{product}`
placeholder — plain string substitution, not a sentence hardcoded into
a component — so wording can change without touching code.

**Dynamic context, proven against real data, not a mock**: on any
`/products/:slug` page, the button looks up the real product by slug
(`getProductById()` — the same catalogue every other page uses) and
substitutes its actual name into the message. Elsewhere, it falls back
to the default template. If a slug doesn't match anything (a stale or
deleted product), it degrades gracefully to the default message instead
of showing "undefined" or crashing.

**Tooltip**: "Chat with us on WhatsApp" on hover/focus, and the same
text as the button's `aria-label` for screen readers regardless of
whether the visual tooltip is showing.

**Doesn't obstruct mobile UI — the one genuine physical conflict, solved
by repositioning, not removal**: product detail pages already have their
own fixed bottom bar (`MobileStickyCTA`) below 1024px, occupying the
same bottom-left corner. Rather than overlap it or hide the global
button there, it lifts itself above that bar by 120px — a number
calculated from the sticky bar's actual worst-case height (padding +
content + `env(safe-area-inset-bottom)` on notched phones), not a
guessed value, with the math shown in a comment in
`FloatingWhatsAppButton.css`. A real CSS specificity bug was caught and
fixed while building this: a single-class modifier selector would have
tied in specificity with a breakpoint rule and let source order,
rather than intent, decide the outcome between 960–1023px widths —
fixed with a compound selector instead.

**Tested by actually running it**, not just reading the code: the
message-building logic was refactored into a pure utility
(`frontend/src/utils/whatsapp.js`) specifically so it could be executed
in plain Node without needing a Vite build (`site.config.js` itself
can't be imported outside Vite, since it reads `import.meta.env`).
```bash
node frontend/scripts/test-whatsapp.mjs
```
11 assertions, including the message generated for three different real
catalogue products verified to exactly match the `[PRODUCT]` pattern
given in the brief, the exact default-message wording, safe behavior
with no number configured, and the stale-slug fallback — all passing.

## Brochure system

`DownloadBrochureButton` appears in all 5 requested locations: the
Navbar (a circular icon next to WhatsApp on desktop, a full button in
the mobile menu), the Homepage (next to "View all products"), the
Products page, the Capabilities page, and the Footer. `/brochure` is a
dedicated page offering all three requested actions — Open (new tab),
Download (forces save), and Preview (inline `<iframe>`, since modern
browsers render PDFs natively without needing a PDF.js dependency).

**No fake brochure content was created.** There's no real PDF to ship,
so `frontend/public/brochure/` is empty except for a README explaining
exactly where to drop the real file — inventing placeholder brochure
content would misrepresent the company, the same principle already
applied to product specs and industry claims elsewhere in this project.

**Configurable path, genuinely simple to replace**: `VITE_BROCHURE_URL`
(defaults to a local path) and `VITE_BROCHURE_FILENAME` in `.env` — drop
a real PDF at that path (or point the URL at external hosting entirely,
e.g. Supabase Storage) and every button on the site starts working, with
zero code changes.

**Handles its own absence honestly, not just optimistically**: every
placement checks real availability via a HEAD request before treating
the brochure as downloadable — checking content-type, not just HTTP
status, since a static host's SPA fallback can return `200 OK` with an
HTML page for a path that doesn't actually exist as a file, which would
make an absent brochure look "available" if status were the only
signal. Until a real PDF exists, buttons render in a clear disabled
state instead of offering a broken or misleading download, and
`/brochure` itself shows a "Brochure coming soon" state with a Get a
Quote fallback rather than an empty or broken page. A shared,
request-deduplicating cache means the 5 button instances on one page
load don't fire 5 separate availability checks.

**A real bug caught while building this**: an initial draft used a
spinner icon for the brief "checking" state, but `Button.jsx` has no way
to attach a CSS animation class to its icon slot — so it would have
rendered as a static, non-spinning icon that looked broken rather than
loading. Fixed by treating "checking" and "unavailable" as the same
disabled appearance instead, since the check resolves in well under a
second.

**Tested by execution**, same standard as the rest of this project: the
availability decision logic was extracted into a pure function
specifically so it's testable without a real server —
```bash
node frontend/scripts/test-brochure.mjs
```
8 assertions, all passing, including the exact SPA-fallback edge case
described above and safe handling of malformed/missing input.

## Gallery system

`/gallery` covers all 10 requested categories (Products, Factory,
Machinery, CNC, Laser Cutting, Bending, Fabrication, Finished Products,
Packaging, Dispatch) with every requested feature: a masonry grid (CSS
multi-column layout — no JS measurement library needed), a lightbox with
prev/next navigation (click, keyboard arrows, and touch swipe), a
genuine browser Fullscreen API toggle (distinct from the lightbox modal
itself), lazy loading (native `loading="lazy"` plus a fade-in on load),
and mobile-responsive columns (2 on phones, 3 on tablets, 4 on desktop).

**No fake photos were created** — same principle as the brochure system.
`frontend/public/gallery/` has one real folder per category, each
containing only a `.gitkeep` and a shared README explaining the naming
convention. Until real photos exist, every tile honestly shows a
category-icon placeholder — clearly not pretending to be a real photo —
rather than a broken image or invented stock photography.

**Image management is genuinely a drop-in operation**: add a file named
`products-1.jpg` (through `products-6.jpg`) to
`frontend/public/gallery/products/`, and it appears automatically — no
data file to edit, no code to touch. Each category reserves 6 slots by
default (`IMAGES_PER_CATEGORY` in `frontend/src/config/gallery.config.js`
— one number, change it once to allow more). Unfilled slots simply stay
placeholders; you don't need to fill all 6 to get started.

**Deliberately not using Vite's `import.meta.glob`** for
auto-discovery, even though it would remove the fixed-slot-count
limitation — this sandbox has no way to actually run Vite and confirm
that approach behaves as expected, and I'd rather ship something I'm
certain works than something cleverer I can't verify. The `<img
onError>` fallback pattern used instead is standard, well-understood
browser behavior with no build-tool-specific behavior to get wrong.

**Tested by execution**: the item-building and lightbox navigation math
were extracted into pure functions specifically so the exact
off-by-one/wraparound bugs this kind of code is prone to could be
verified directly —
```bash
node frontend/scripts/test-gallery.mjs
```
20 assertions, all passing, including the wraparound cases that matter
most (next from the last item, prev from the first item, single-item
and empty-list edge cases).

## About page

`/about` covers all six requested sections — Who We Are, What We Do, Our
Manufacturing Approach, Our Capabilities, Our Commitment, and Why
Companies Work With Us — and communicates all six required facts
(Henil Enterprise, Ahmedabad, Acrylic & Polycarbonate Manufacturing,
Custom Fabrication, B2B Manufacturing, Quantity Orders), the last four
of which are literally the four "What We Do" cards, not buried in prose.

**Nothing was invented.** No founding year, employee count, revenue
figure, certification, client name, or award appears anywhere on this
page — verified with an explicit regex sweep across every new file for
each of those categories (years, "N+ years", "N employees", currency
figures, "ISO"/"certified", "award", and company-name patterns like
"X Ltd." that would suggest a fabricated client), not just a read-through.

Where that information would normally build credibility, three fields
(Founded, Team Size, Certifications) appear as clearly-marked
placeholders in the hero's info panel — dashed underline, italic, muted
color, explicitly distinct from how real data is styled everywhere else
on the site — with a line stating outright that they're unfilled rather
than pretending the gap doesn't exist. Revenue was deliberately left out
entirely rather than given an awkward placeholder slot — manufacturers
don't typically publish that figure at all, real or placeholder, so
there's no natural "coming soon" treatment for it the way there is for
a founding year.

**Content reuse over rewriting**, to avoid two pages quietly drifting
into contradicting each other over time: "Our Capabilities" embeds the
real `CapabilityStrip` component (the same one the homepage uses) rather
than a rewritten summary, and "Why Companies Work With Us" reuses the
exact `WHY_HENIL` data and `WhyHenilSection` component from the homepage
— extended with optional `eyebrow`/`title` props (defaulting to the
homepage's existing text, so that usage needed zero changes) so both
pages can share one real component instead of two versions of the same
content.

**A real layout bug caught and fixed while building this**:
`CapabilityStrip` renders its own full-bleed `<section>` (background,
top/bottom borders) — by design, meant to sit as its own top-level band
between other sections, exactly as it does on the homepage. An earlier
draft nested it inside `AboutCapabilities`'s own `<section>`, which
would have broken that full-bleed treatment and doubled up vertical
padding. Fixed by using a Fragment so it stays a true sibling instead.

## Scroll-driven manufacturing process visualization

`ScrollProcessViz` (on the homepage, replacing the earlier static
`ProcessSection`) shows all 7 requested steps — Design → Material →
Cutting → Bending → Bonding → Inspection → Dispatch — as a vertical line
of glass panel "stations" connected by a line that lights up as the
visitor scrolls, with a soft radial glow behind whichever station is
currently active.

**Scroll-triggered, not scroll-position-calculated** — the deliberate
performance choice, given "ensure mobile performance remains good" was
explicit in the brief. `IntersectionObserver` watches each station for
crossing a thin band near the vertical center of the viewport; the
active station updates only on actual threshold crossings, never on
every scroll pixel. A `scroll`-event handler recalculating layout on
every frame is exactly the pattern that causes janky mobile scrolling,
and was avoided entirely rather than optimized after the fact.

**Replaced, not duplicated**: the 7 steps here are nearly identical to
`PROCESS_STEPS`, which already existed for the homepage's old static
process section — only "Drawing" needed renaming to "Design" to match
this exact brief. Rather than ship a second, slightly-different process
flow alongside the old one (which would leave two contradicting
"how an order runs" narratives on the same page), the old
`ProcessSection` was removed and this replaces it directly, reusing the
same underlying data. `/custom-fabrication`'s separate interactive
stepper (Send Drawing → Requirement Review → Material Selection →
Fabrication → Quality Check → Dispatch) is intentionally untouched — it
describes the customer's journey to get a quote, a genuinely different
narrative from this one's internal manufacturing-line steps, not a
redundant duplicate.

**Do not over-animate**, honored literally: every transition is a
simple opacity/transform/color fade using the same easing and duration
tokens as the rest of the site — no bounce, no elastic easing, no
looping animation. `prefers-reduced-motion` disables all transitions
(the IntersectionObserver-driven state changes still work, they just
apply instantly rather than fading).

**Tested by execution**: the state logic (which step is "upcoming" /
"active" / "passed," which connector segments are lit, and how a batch
of IntersectionObserver entries resolves to a single active step) was
extracted into pure functions with no DOM dependency, specifically so it
could be verified without a real browser —
```bash
node frontend/scripts/test-scroll-process.mjs
```
15 assertions, all passing, including a full walkthrough confirming
that at every one of the 7 scroll positions, exactly one step reads as
active and the correct number read as passed.

## Material Selector

On `/products`, between the hero and the catalogue: an Acrylic /
Polycarbonate toggle showing Material Characteristics, Typical
Applications, Available Thicknesses, Fabrication Options, and Common
Products for whichever is selected, plus a "Not sure which material you
need?" panel with a Get a Quote button.

**Two different rules for two different kinds of content here, applied
deliberately:**

- **Characteristics and applications** are general, well-established
  material-science properties (acrylic's optical clarity, polycarbonate's
  relative impact resistance) — the same qualitative facts in any
  material reference, not a claim about Henil Enterprise's specific
  tested output. No exact numbers appear anywhere — no impact ratios, no
  temperature ranges, no percentages, only qualitative comparisons
  ("significantly more impact-resistant than," not "3x more
  impact-resistant than").
- **Available Thicknesses is an explicit, clearly-styled placeholder** —
  real thickness ranges depend on current stock and weren't provided, so
  none was invented. Styled with the same dashed-underline/italic/muted
  treatment as the About page's placeholder company facts, deliberately
  distinct from how real data displays everywhere else on the site.

**Fabrication Options and Common Products aren't written content at
all** — they're derived at render time by cross-referencing the
already-real, already-vetted `capabilities.data.js` and
`products.data.js` (which materials/products each capability supports).
This was the safer choice over writing a third, independent "which
processes work on which material" list by hand, which would risk
quietly contradicting what `/capabilities` and `/products` already say
the moment either changes.

**Tested against the real data, not fixtures**: the cross-reference
logic was verified by actually importing `capabilities.data.js` and
`products.data.js` and checking the results match exactly what those
files contain — for example, confirming Acrylic's fabrication options
include `acrylic-cutting` but not `polycarbonate-cutting`, computed from
the real file, not asserted by hand.
```bash
node frontend/scripts/test-material-selector.mjs
```
15 assertions, all passing.

## B2B Quantity Orders section

On the homepage, after Custom Fabrication: "Built for Quantity.
Designed for Consistency." — communicating all six required concepts
(Batch Production, Repeat Orders, Custom Components, Consistent
Fabrication, Drawing-Based Manufacturing, Production Quantities) as an
explicit row, not just implied by prose, plus an interactive selector
for Prototype / Small Batch / Medium Batch / Large Batch, each leading
to Get a Quote with that category carried through as context.

**No minimum order quantities, anywhere, verified as a permanent
regression guard** — not just checked once while writing the copy. The
four category descriptions are entirely digit-free (no unit counts, no
ranges, no "starting from") and free of MOQ-implying language
("minimum," "at least," "guaranteed"), and
`test-quantity-orders.mjs` asserts both of those things directly against
the live data file, so a future edit that quietly reintroduces a number
gets caught automatically rather than depending on someone remembering
to re-check by eye. The disclaimer — "These are inquiry categories only,
not guaranteed production quantities" — is shown verbatim, not
paraphrased into something softer.

**Each category's "Get a Quote" link is independently verified**, not
just the one a developer happens to click while testing: the test suite
builds the href for all four categories and confirms each is a valid,
distinct `/quote` link.

```bash
node frontend/scripts/test-quantity-orders.mjs
```
17 assertions, all passing.

## Industrial Applications section

On `/products`, after the catalogue: all 11 requested application
examples (Machine Guards, Safety Covers, Transparent Enclosures,
Inspection Windows, Protective Shields, Tanks, Boxes, Cabinets,
Industrial Components, Laboratory Components, Display Products), each
with an image (honest placeholder, same pattern as product photography),
the application itself, material, fabrication method, and its own Get a
Quote CTA.

**Nothing here is independently written content that could contradict
what other pages already say** — material and fabrication-method
assignments are cross-referenced directly against the real
`capabilities.data.js` and `categories.data.js` (the same files
`/capabilities` and `/products` already use), not re-decided by hand for
this section. Where a clean matching product category genuinely exists,
the card links to it; two applications (Protective Shields, Laboratory
Components) honestly have no matching category yet, so that link is
just absent for those two rather than forced onto something that
doesn't quite fit.

**"Configurable" verified three different ways, not just asserted:**
1. Every `fabricationMethods` id was checked against the real
   capabilities dataset — an invented id would fail loudly.
2. Every `relatedCategoryId` was checked the same way against the real
   categories dataset.
3. **Internal consistency**: a material-specific method like
   `acrylic-bending` is asserted to never appear on an application whose
   own `materials` list doesn't include Acrylic — the kind of
   hand-authored contradiction that's easy to introduce by accident
   across 11 entries and easy to miss on a read-through, caught instead
   by an automated check against the live data.

```bash
node frontend/scripts/test-applications.mjs
```
14 assertions, all passing.

## B2B Trust section

On the homepage, right before the closing CTA: all 5 requested
configurable areas — Customer Testimonials, Industries Served, Quality
Commitment, Repeat-Order Capability, and Custom Manufacturing.

**Testimonials are the one genuinely new content type here, and the
strictest area of this whole deliverable.** No real customer provided
any testimonial, so every one is explicitly a placeholder — but
"placeholder" here means something more specific than usual in this
project: not an empty "coming soon" state (like the brochure or
gallery), but content the brief explicitly asked to be created now,
under two hard constraints:

- **No invented personal names.** Even a plausible-sounding fake name
  ("Rakesh Patel") reads as a real person being quoted — attribution is
  role + generic company-type only ("Procurement Manager, Industrial
  Equipment Manufacturer"), never an identity.
- **No invented company names.** Same reasoning as never inventing a
  client name anywhere else in this project.

Every testimonial also carries an explicit `isPlaceholder: true` flag,
and the section itself shows a visible "Sample testimonials — real
customer feedback will replace these" note rather than silently passing
placeholder content off as genuine.

**Enforced as a permanent, re-runnable regression guard** — not just
checked once while writing the content:
```bash
node frontend/scripts/test-trust-section.mjs
```
checks every testimonial for company-name-style suffixes (Ltd/Pvt/Inc/Corp),
personal-name-shaped attribution, and embedded numbers (which would read
as an unverifiable specific claim), so a future edit that quietly
reintroduces any of those gets caught automatically. 28 assertions, all
passing.

**Quality Commitment, Repeat-Order Capability, and Custom Manufacturing
are cross-referenced from already-real data**, not written fresh for
this section — Quality Commitment now comes from a `commitments.data.js`
file extracted directly out of the About page's "Our Commitment"
section (both pages import the same data now, instead of two copies
that could quietly drift apart), and the other two pull straight from
the homepage's existing `WHY_HENIL` data. Industries Served reuses the
real `INDUSTRIES_DETAIL` dataset. The test suite verifies each of these
cross-references actually resolves to a real object rather than
silently returning `undefined` — which is exactly the kind of typo that
would otherwise only surface as a runtime crash in a browser.

**Carousel**: one glassmorphism card visible at a time, a slow crossfade
(not a slide or anything more elaborate), auto-advancing every 7 seconds
but pausing on hover/focus and stopping permanently the moment a visitor
manually navigates — the same auto-play-until-interrupted pattern
already used by the Custom Fabrication page's process stepper, reused
here for consistency rather than inventing a second carousel behavior.
The prev/next wraparound math reuses `getNextIndex`/`getPrevIndex` from
the gallery system's utilities (already covered by 20 existing
assertions) instead of re-implementing — and re-risking — the same logic
a second time.

## FAQ

`/faq` — all 15 required questions, single-open accordion, linked from
the footer (not the main nav, which was explicitly fixed at 8 items in
an earlier phase and left untouched here).

**"Do not answer with specifications I have not provided," applied
answer by answer, not just as a general intention.** Two questions
directly ask for exactly that kind of detail — "What thicknesses are
available?" and "Do you deliver outside Ahmedabad?" — and both answers
explicitly defer to the quote process ("share your requirement and
we'll confirm") rather than stating a number or a coverage area that
was never confirmed. Every other answer was checked against the same
rule via an automated sweep for spec-shaped numbers (units, turnaround
times, tolerances) across all 15 answers — genuinely zero digits appear
anywhere in the visible question or answer text.

**FAQ structured data for SEO**: `utils/faq.js` builds a real
schema.org `FAQPage` JSON-LD object directly from the same `FAQ_ITEMS`
array the visible accordion renders from — not a hand-maintained
duplicate that could drift out of sync. `hooks/useJsonLd.js` injects it
as a `<script type="application/ld+json">` tag on mount and removes it
on unmount. The test suite verifies the structured data's question and
answer text match the visible FAQ *exactly*, which is a real Google
structured-data requirement, not just tidiness.

**One honest architectural limitation, stated rather than glossed
over**: this is a client-rendered Vite SPA with no server-side
rendering, so the JSON-LD script tag only exists after JavaScript runs —
a crawler that doesn't execute JS won't see it. That's a pre-existing
characteristic of this whole project's architecture (not something
introduced by this feature), and full structured-data SEO benefit would
eventually want SSR or prerendering.

```bash
node frontend/scripts/test-faq.mjs
```
28 assertions, all passing — including that the structured data's
question/answer text is byte-for-byte identical to what's shown on the
page, and that all 15 required questions are present in the exact order
given.

## Blog system

`/blog` (listing) and `/blog/:slug` (detail) — all 10 potential topics
from the brief, each with title, featured image, author, date, reading
time, content, related articles, and a Get a Quote CTA.

**Content, not a placeholder — with the same boundaries applied
everywhere else in this project.** Unlike testimonials or the brochure,
blog articles are legitimate original content to write (general,
accurate guidance on materials and fabrication processes), the same way
the Material Selector's characteristics or the Capabilities page's
descriptions already are. Two rules still apply strictly:
- **Author is "Henil Enterprise" on every post** — the company, never
  an invented named individual, the same reasoning as testimonial
  attribution.
- **No fabricated technical specifications** — "Choosing Acrylic
  Thickness" in particular talks about the *factors* that matter (span,
  load, mounting, visibility) without stating a number, the same
  deferral already used in `materials.data.js` and the FAQ's thickness
  answer. Verified with an automated sweep across all 10 articles'
  actual content, not just a read-through.

**Reading time is computed, never hand-typed** — `calculateReadingTime()`
counts real words in the actual content and divides by a standard
reading speed, so it can never drift the way a manually-entered "5 min
read" would the moment an article gets edited.

**"Prepare the architecture for Supabase," done concretely, not just
described:**
- The data shape (`blogPosts.data.js`) mirrors the real `blog_posts`
  migration column-for-column (camelCase instead of snake_case) —
  `slug`, `title`, `excerpt`, `content`, `author`, `published`,
  `publishedAt` map directly onto `slug`, `title`, `excerpt`, `content`,
  `author`, `published`, `published_at`.
- `services/blogService.js` is written as the eventual real read layer
  would be — every function is `async` and returns the exact shape a
  Supabase query would, even though today it reads the static array
  directly. Swapping the implementation later means rewriting three
  function bodies; no page or component needs to change, because the
  signatures are already what a real query would produce.
- The database's seed generator (`database/scripts/generate-seed.mjs`)
  now also generates real `blog_posts` INSERT statements from this same
  data — a genuine bug was caught and fixed while adding this: the
  blog-generation code was initially placed *after* the file had already
  been written to disk, meaning it would have silently never appeared
  in the output. Caught by actually running the generator and grepping
  the result for real INSERT statements, not by re-reading the diff.

**SEO**: real `BlogPosting` schema.org JSON-LD per article (reusing the
same `useJsonLd` hook built for the FAQ page), plus `document.title` and
`<meta name="description">` updated per page and correctly restored to
the site default on navigating away — using two small new hooks,
`useDocumentTitle` and `useMetaDescription`. Same architectural
limitation as the FAQ's structured data: this is a client-rendered SPA
with no SSR, so a non-JS crawler won't see any of this — stated plainly
here rather than glossed over, not a new limitation introduced by this
feature.

```bash
node frontend/scripts/test-blog.mjs
```
27 assertions, all passing — including that every slug matches the real
database's format constraint, every published post satisfies the real
`published`/`published_at` consistency constraint, and the Supabase-ready
service layer behaves correctly (sorts newest-first, returns `null`
rather than throwing for an unknown slug, excludes the current post from
its own related-articles list).

## Requirements

## Launch guide

A complete, beginner-friendly, zero-to-live walkthrough — Supabase,
storage, email, backend hosting, Vercel, custom domain, DNS, HTTPS, and
a full post-launch test checklist:
[`LAUNCH-GUIDE.md`](./LAUNCH-GUIDE.md). One real code fix was needed
for this specific architecture (a Vite frontend on Vercel talking to a
separately-hosted Node backend) and is already in place:
`frontend/vercel.json` proxies `/api/*` to the real backend and adds
the SPA-fallback rewrite client-side routes need to survive a direct
URL or page refresh in production — neither of which the local dev
server needed, since Vite's dev proxy and a running Node process
handled both automatically there.

## Production readiness

Full checklist, the honest build-verification status, and the
**complete list of production environment variables** across all three
apps: [`PRODUCTION-READINESS.md`](./PRODUCTION-READINESS.md).

Same sandbox limitation as every prior phase — no network access here,
so `npm run build` couldn't actually be run (confirmed again:
`vite: not found` / npm registry `403`). Verified instead via
`tsc --noResolve` across all three apps, `node --check` on the backend,
a script cross-referencing every import against each `package.json`'s
declared dependencies (zero missing), and re-running the full 273-assertion
test suite. Run the real build yourself before deploying — commands are
in `PRODUCTION-READINESS.md`.

Also tightened `.gitignore` in this pass: it previously only matched
`.env`/`.env.local` by exact name, which would have missed a future
`.env.production`. Now matches every `.env.*` variant at any depth
while explicitly keeping `.env.example` files trackable, plus added
`*.pem`/`*.key`/`*.p12`/`*.pfx` as defense in depth.

## End-to-end test report

Full findings in [`END-TO-END-TEST-REPORT.md`](./END-TO-END-TEST-REPORT.md).
No browser is available in this sandbox, so testing meant two genuinely
different things, kept separate in the report: **actually executed**
(real Node processes running real project code against real inputs —
273 assertions across this project's existing test scripts, plus a new
matrix specifically covering the brief's file-type list and form-validation
cases) and **statically traced** (routing, error handling — reasoned
through the real code path by hand, marked as such, never presented as
equivalent rigor).

Four real bugs found and fixed, not just reported:

- **A project test script was silently broken** — `test-blog.mjs`
  (documented as runnable via plain `node`) started crashing after an
  earlier phase's change made it transitively depend on
  `import.meta.env`, which only exists under Vite. Fixed across all
  five config files that read it; verified the script (and all 11
  others) now pass in full — 273 assertions, 0 failures.
- **Invalid email/quantity errors were silently discarded on RFQ
  submit** — the server already returned specific per-field reasons,
  but the frontend captured and then never displayed them, leaving a
  person stuck on a generic "Missing or invalid fields." with no idea
  what to fix. Fixed by tightening the wizard's step-by-step validation
  to catch these earlier, and by actually rendering the server's
  specific reasons as a backstop — verified with a simulated failing
  response.
- A confusing error message (`File type "."`) for a file with no
  extension at all — fixed.

## Performance optimization audit

Full findings in [`PERFORMANCE-AUDIT.md`](./PERFORMANCE-AUDIT.md).
**Honest limitation**: this sandbox has no network access, so an actual
`npm install && vite build` could not be run here — verified every
change with syntax/brace checks instead, the same substitute method
used throughout this project. Run the real build yourself:
`cd frontend && npm install && npm run build`.

Real fixes applied, not just recommendations:

- **Code splitting**: every route except Home is now `React.lazy()`-loaded
  — a homepage visitor no longer downloads `/quote`, every product
  page, `/design-system`, etc. up front. Added vendor chunk splitting
  (`react`/`react-dom`/`react-router-dom`, `lucide-react`) in
  `vite.config.js` for better long-term caching across deploys.
- **Glassmorphism fallback** (previously completely missing, despite
  `backdrop-filter` being used 46 times across 20 files): a
  `@supports not (backdrop-filter: blur(1px))` rule now raises glass
  surfaces to near-opaque instead of leaving them a blurless,
  low-contrast smear on unsupported browsers. Blur radius also now
  drops from 18px to 10px below 640px width — real, measurable
  per-frame compositing savings on exactly the class of device "remain
  fast on normal mobile devices" is about.
- **Three animations converted from `background-position` to
  `transform`** — the homepage hero's continuous light sweep (runs the
  whole time a visitor is on the homepage), the loading-screen sweep,
  and the skeleton shimmer. Same visuals, compositor-only (GPU) instead
  of forcing a repaint every frame.
- **Large product images**: the main product photo now gets
  `fetchPriority="high"` + `loading="eager"` (it's very likely the
  page's LCP element) while its container reserves an aspect ratio to
  prevent layout shift; every other image on that page and the gallery
  grid stays properly lazy.
- Also: context-aware logo loading priority, `decoding="async"` added
  across the board, and gzip/brotli compression added to the backend's
  API responses.

## Mobile optimization audit

Tested against 360/375/390/412/768/1024/1440px — full findings in
[`MOBILE-OPTIMIZATION-AUDIT.md`](./MOBILE-OPTIMIZATION-AUDIT.md). Two
real, user-visible bugs and two lower-severity gaps were found and
fixed:

- The "How It Works" process animation auto-advances through 6 steps,
  but on any phone width the step row is wider than the screen and
  nothing scrolled the active step into view — it would silently
  scroll off-screen after a few auto-advances. Fixed with
  `scrollIntoView()`, respecting `prefers-reduced-motion`.
- Product pages showed two WhatsApp buttons at once on mobile (the
  persistent floating one, plus a second one embedded in the sticky
  "Get a Quote" bar) — the second was also stealing width from Get a
  Quote, the button the brief specifically requires stay easily
  accessible. Removed the duplicate.
- The product-image thumbnail row had no overflow handling — with more
  than ~4 images the square thumbnails would distort instead of
  scrolling. Fixed.
- The gallery lightbox's caption had no max-width and could overflow a
  360px viewport. Fixed.

Confirmed with hand-computed real-content math (actual button labels,
actual container padding, actual font sizes) rather than assumed: the
navbar, hero, quote form, drawing upload, footer, and grid breakpoints
all already handled every tested width correctly. Also confirmed the
brief's two hard requirements hold at every breakpoint with no gap
between transitions: the WhatsApp button never leaves whichever corner
it's positioned in (bottom-right as of the most recent change) at any
tested width, and
"Get a Quote" is reachable via three different mechanisms (inline hero
button, mobile sticky bar, desktop sidebar) that all hand off at the
exact same `1024px` breakpoint.

## Security audit

Full findings and fixes in [`SECURITY-AUDIT.md`](./SECURITY-AUDIT.md).
Two real, exploitable gaps were found and fixed, both stemming from the
same root cause — the admin dashboard's Supabase anon key is now
legitimately public, which broke an earlier assumption that only the
backend (holding the service role key) would ever talk to Supabase
directly:

1. The `inquiry-drawings` Storage bucket had no size/MIME restrictions
   of its own — only the Express backend enforced them, which a direct
   Supabase Storage API call could bypass entirely. Fixed at the
   Supabase level (`file_size_limit`, `allowed_mime_types` on the
   bucket) in `database/migrations/20260101000019_security_hardening.sql`.
2. Every public-insertable free-text column (`inquiries`,
   `inquiry_files`, `contact_messages`) had no length limit — a
   storage-bloat DoS vector via the same direct-insert path. Fixed with
   CHECK constraints in the same migration, mirrored at the application
   layer in `backend/src/services/inquiry.service.js` for a clean error
   message.

Also fixed: no rate limiting anywhere (added, with correct
`trust proxy` handling), no security headers (`helmet` added), uploaded
files were only checked by extension and claimed Content-Type, never
actual file content (real magic-byte validation added for PDF/PNG/JPEG),
an email header injection path via a free-text RFQ field, and
single-origin-only CORS with no production-shape (apex + www) support.

Confirmed clean: no XSS vector anywhere (grep-verified — zero
`dangerouslySetInnerHTML`, zero `eval`), no SQL injection surface
(everything goes through Supabase's parameterized query builder, no
raw SQL from user input), and — checked directly, not assumed — the
service role key, database credentials, and the Resend API key each
appear in exactly one file, server-side only, never logged and never
reachable from `frontend/` or `admin/`.

## Admin inquiry dashboard

A private, separate app (`admin/`) for staff to manage RFQ submissions
— not part of the public site, not linked from it, not reachable at any
public URL. Full architecture, including exactly why and how, lives in
[`ADMIN-DASHBOARD-ARCHITECTURE.md`](./ADMIN-DASHBOARD-ARCHITECTURE.md).
Summary:

- **Real Supabase Auth**, email/password, with **no signup page
  anywhere** — admin accounts are provisioned exclusively via
  `database/scripts/create-admin-user.mjs`, which requires the service
  role key and is never run from the app itself.
- **Row Level Security is the actual access boundary**, not this app's
  code. A new `admin_users` table + `is_admin()` `SECURITY DEFINER`
  function (`database/migrations/20260101000016_create_admin_users.sql`)
  back every admin-facing policy in
  `20260101000018_admin_row_level_security.sql`: admins can `SELECT`/`UPDATE`
  `inquiries`, `SELECT` `inquiry_files` and the `inquiry-drawings`
  storage bucket, and `SELECT`/`INSERT` (append-only) `inquiry_notes` —
  a brand-new table for the "internal notes" requirement. Nobody else
  has any access to any of it; that lockdown already existed for
  `inquiries`/`inquiry_files` from an earlier phase and is unchanged
  here, only extended with an admin-shaped exception.
- **The admin app talks to Supabase directly** (anon key + the signed-in
  user's session), unlike the public site's backend-only pattern — a
  deliberate, documented difference (see the architecture doc's "Why
  the admin app talks to Supabase directly" section) since RLS, not a
  service-role backend, is the right tool for "let a provable identity
  read and write, with no other gate."
- **Every requested admin action** — view, download drawings, change
  status, add notes, contact customer, mark as quoted, mark as closed —
  is implemented in `admin/src/pages/InquiryDetail.jsx`, mapped 1:1 in
  the architecture doc's table.
- **A real gap closed along the way**: the free-text product name typed
  into the RFQ wizard was validated as required but never actually
  persisted to a column — `inquiries.product_name`
  (`20260101000015_add_inquiry_product_name.sql`) fixes that, since the
  dashboard's Product column needs a value even for custom requests.

## SEO & Google Search readiness

Full detail — including exactly how to connect Google Search Console
and Google Analytics — lives in a dedicated doc:
[`SEO-SETUP.md`](./SEO-SETUP.md). Summary of what's implemented:

- **Sitemap & robots** — `frontend/public/sitemap.xml` and
  `robots.txt`, listing every static route, all 16 products, and all
  10 blog posts. Both use a placeholder production domain until the
  real one is confirmed (see the comment at the top of each file).
- **Canonical URLs + Open Graph/Twitter tags** on every page, via a new
  `useSeo` hook (`frontend/src/hooks/useSeo.js`), built on the same
  title/description hooks the Blog pages already used.
- **Per-page SEO copy** (`frontend/src/config/seo.config.js`) — each
  page targets a distinct slice of real search intent rather than
  repeating the same keywords everywhere. Product pages
  (`/products/:slug`) generate their title dynamically from
  `buildProductSeo()`, reflecting whichever material the product
  actually lists rather than guessing.
- **Structured data** (`frontend/src/utils/structuredData.js`,
  `utils/blog.js`, `utils/faq.js`) — `Organization` (sitewide),
  `LocalBusiness` (Home + Contact only — deliberately not sitewide),
  `BreadcrumbList` (every sub-page), `Product` (every product page, no
  fabricated price), `BlogPosting`/`Article` (every blog post, with
  publisher + logo), and `FAQPage` (generated from the same data the
  visible accordion renders).
- **A single canonical configuration area**,
  `frontend/src/config/company.config.js` — company name, address,
  phone, email, website, business description, and social links, all
  in one place. Confirmed facts are hardcoded directly; everything
  unconfirmed reads from an env var and is *omitted* (never faked) when
  blank. `frontend/src/config/localBusiness.config.js` holds the
  related map/geo/hours fields.
- **`/contact` is now a real page** — it was the one route still on
  `PagePlaceholder`. NAP block with `LocalBusiness` microdata,
  phone/email/WhatsApp CTAs, an embedded map, an honest hours note, and
  a message form. That form currently opens the visitor's email client
  rather than hitting a backend — the `contact_messages` table exists
  from an earlier phase but no route reads from it yet; wiring that up
  is real, separate work. `/quote` remains the fully working,
  Supabase-backed path for an actual fabrication requirement.
- **Google Search Console + Analytics** — both fully opt-in and
  inactive until a real value is set via env var (`VITE_GSC_VERIFICATION_CODE`,
  `VITE_GA_MEASUREMENT_ID`). No ID is hardcoded anywhere. See
  `frontend/src/hooks/useAnalytics.js` and `SEO-SETUP.md` section 3 for
  the SPA-pageview-tracking detail that a bare `gtag.js` drop-in would
  miss.

- Node.js 18+ and npm

## Setup

### Backend

```bash
cd henil-manufacturing/backend
npm install
cp ../.env.example .env
npm run dev
```

Runs on **http://localhost:5000**. Confirm it works by opening
**http://localhost:5000/api/health** — you should see JSON like:

```json
{
  "status": "ok",
  "message": "Henil Enterprise backend is running",
  "timestamp": "..."
}
```

**To make the RFQ system and file uploads actually work**, you also
need a real Supabase project:

1. Create a project at [supabase.com](https://supabase.com) (or use an
   existing one).
2. Apply the migrations in `database/migrations/` (see
   `database/README.md` for exact steps — Supabase CLI or plain `psql`
   both work) and optionally the seed data in `database/seed/`.
3. In your Supabase project settings, copy the **Project URL** and the
   **service_role** secret key (not the `anon` key — the backend needs
   full write access, bypassing RLS, to insert inquiries on behalf of
   anonymous visitors).
4. Fill in `backend/.env`:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
5. Restart the backend. Without this, the server still starts, but
   `/api/uploads` and `/api/inquiries` return a clear 503 rather than
   silently pretending to work.

**To also get email notifications** (optional — RFQs save successfully
without this, per "Email notifications" above), add a Resend API key to
the same `backend/.env`:
```
RESEND_API_KEY=re_your_actual_key
EMAIL_FROM=Henil Enterprise <onboarding@resend.dev>
HENIL_NOTIFICATION_EMAIL=your-team-inbox@henilenterprise.com
```

### Frontend

In a second terminal:

```bash
cd henil-manufacturing/frontend
npm install
npm run dev
```

Runs on **http://localhost:5173**.

The frontend's Vite dev server proxies any `/api/*` request to
`http://localhost:5000` (see `frontend/vite.config.js`). The backend
health check is no longer surfaced on the live homepage (that was a
scaffold-only widget from an earlier phase) — the component still exists
at `frontend/src/sections/StatusSection.jsx` if you want it for an
internal/admin page later, but the real homepage now ships with real
content instead.

## What to test

1. Backend alone: visit `http://localhost:5000/api/health` directly in a
   browser — should return the JSON above.
2. Frontend alone: visit `http://localhost:5173` — the full homepage
   should load: hero, capability strip, products, custom fabrication,
   industries, why Henil, process, and final CTA sections in order.
3. **Homepage content**: confirm all three hero CTAs work (Get a Quote,
   View Capabilities, WhatsApp Us — the WhatsApp button only appears once
   `VITE_WHATSAPP_NUMBER` is set), the hero visual has a slow breathing
   motion and a traveling laser line (or is fully static if your OS has
   "reduce motion" enabled — that's intentional), and the process section
   shows all 7 steps in order with connecting arrows on desktop.
4. **Design system**: visit `/design-system`. Click through each section —
   buttons should have a visible hover/press state, the modal should open
   and close (Escape, backdrop click, and the X all work), the three toast
   buttons should stack notifications bottom-right and auto-dismiss, the
   dropdown and select should open/close and close on outside click, and
   every glass panel should show a soft blur with a gold hairline border
   against the near-black background.
5. **Navigation**: scroll down on any page — the floating nav bar should
   visibly shrink, its background should become more opaque, and a soft
   shadow should appear, all with a smooth (not instant) transition.
   Click every link in the bar, the "Get a Quote" button, and the
   WhatsApp icon (only visible once you set `VITE_WHATSAPP_NUMBER`).
   Resize below ~1024px width — the link row should disappear behind a
   hamburger that opens a full-screen glass menu with large, easy-to-tap
   links. Try a URL that doesn't exist (e.g. `/nothing-here`) — it
   should show the 404 page, not a blank screen or crash.
6. **File upload** (`/custom-fabrication`): click "Upload Your Drawing",
   drag a real PDF or image onto the dropzone (or click to browse), then
   click "Upload File(s)" — you should see a success toast and the
   backend should log the request. Try renaming any file to `.exe` and
   uploading it — it should be rejected client-side immediately, with a
   clear reason shown. Check `backend/uploads/` afterward to confirm the
   accepted file actually landed there with a random filename (not the
   original name).
7. **RFQ wizard** (`/quote`) — requires Supabase configured (see Setup
   above), otherwise you'll correctly see a 503 error instead of a fake
   success. Fill in Step 1 (Company) and Step 2 (Requirement) — "Next"
   should stay disabled with a visible hint until the required fields are
   filled, then enable. Click through all 7 steps, use the progress
   indicator to jump back to an earlier step (it should not let you click
   ahead past where you've been), attach a file in Step 4, and confirm it
   shows up in the Step 7 review. Click "Request Quote" — you should see
   a loading state, then a success screen with a real `HE-RFQ-00001`-style
   reference number. Submit a second inquiry end-to-end and confirm the
   number increments to `00002` rather than repeating. Also try visiting
   a product page and clicking "Get a Quote" — Step 2's Product field
   should already be filled in. Check your Supabase dashboard afterward —
   the `inquiries` table should show your real rows, and the
   `inquiry-drawings` storage bucket should have your uploaded file.
   Finally, temporarily stop your internet connection (or point
   `SUPABASE_URL` at something invalid) and submit again — you should see
   a real error message and a "Retry Submission" button, not a crash.
8. **Automated logic test** (no Supabase needed): run
   `node backend/scripts/test-quote-integration.mjs` — this exercises the
   real validation, reference generation, product-slug resolution, and
   file-linking logic against a fake Supabase client and should print
   "30 passed, 0 failed".
9. **Email notifications** — with `RESEND_API_KEY` and
   `HENIL_NOTIFICATION_EMAIL` set, submit a real RFQ and check both
   inboxes: your notification address should get every field (company,
   contact, product, quantity, material, dimensions, delivery info,
   message, and a working link to any attached file), and the email
   address you submitted with should get a shorter confirmation with the
   reference number. Then unset `RESEND_API_KEY`, restart the backend,
   and submit again — the inquiry should still succeed and return a
   reference number (check your Supabase `inquiries` table — the row is
   there), just with a `[email] RESEND_API_KEY not configured` warning
   in the backend's console instead of any email being sent.
10. **Automated email logic test** (no Resend account needed): run
    `node backend/scripts/test-email-integration.mjs` — exercises the
    real template content, HTML-escaping of user input, and independent
    per-email failure handling against fake senders; should print
    "60 passed, 0 failed".
11. **Brochure — before adding a real PDF**: visit `/brochure` and every
    "Download Brochure" button (Navbar, Homepage, Products, Capabilities,
    Footer) — all should show a clear disabled/"coming soon" state within
    about a second, never a broken download.
12. **Brochure — after adding a real PDF**: drop any real PDF at
    `frontend/public/brochure/henil-enterprise-brochure.pdf`, refresh,
    and try all three actions on `/brochure` (Open in a new tab,
    Download, and Preview inline) plus at least one of the scattered
    buttons — all should now work. Then check the Navbar specifically at
    a width around 960-1023px (tablet) to confirm the brochure icon still
    renders correctly there.
13. **Automated brochure logic test** (no server needed): run
    `node frontend/scripts/test-brochure.mjs` — should print
    "8 passed, 0 failed".
14. **Gallery** (`/gallery`): confirm the masonry grid shows all 10
    categories worth of placeholder tiles, click any tile to open the
    lightbox, use both the on-screen arrows and your keyboard's arrow
    keys to navigate, press Escape to close, click a category chip to
    filter (the lightbox's counter and navigation should then stay
    within just that category), and try the fullscreen toggle button.
    On a real touch device, swipe left/right inside an open lightbox
    image to navigate. Then add a real photo (see
    `frontend/public/gallery/README.md`) and refresh — that one tile
    should switch from placeholder to the real photo automatically.
15. **Automated gallery logic test** (no server needed): run
    `node frontend/scripts/test-gallery.mjs` — should print
    "20 passed, 0 failed".
16. **About page** (`/about`): confirm all six sections render, the
    hero's Founded/Team Size/Certifications values are visually distinct
    from real data elsewhere on the site (dashed, italic, muted — not
    styled like a confident stat), "Our Capabilities" shows the same
    capability strip as the homepage, and "Why Companies Work With Us"
    shows the six points with the About-specific heading rather than the
    homepage's "Why Henil" heading.
17. **Scroll process visualization** (homepage, near the bottom): scroll
    slowly through the "From design to dispatch" section and confirm
    each of the 7 stations lights up (glow, brighter icon, connecting
    line filling in above it) roughly as it crosses the vertical center
    of the screen, in order, and that scrolling back up correctly
    dims later stations again rather than leaving them stuck lit. On a
    real phone, confirm scrolling through this section feels smooth, not
    janky.
18. **Automated scroll-process logic test** (no browser needed): run
    `node frontend/scripts/test-scroll-process.mjs` — should print
    "15 passed, 0 failed".
19. **Material Selector** (`/products`): toggle between Acrylic and
    Polycarbonate and confirm every section updates (characteristics,
    applications, the placeholder thickness note, fabrication badges,
    and common products), that the fabrication badges shown for each
    material match what `/capabilities` says that material supports,
    and that "Get a Quote" in the "Not sure?" panel goes to `/quote`.
20. **Automated material selector logic test** (no server needed): run
    `node frontend/scripts/test-material-selector.mjs` — should print
    "15 passed, 0 failed".
21. **Quantity Orders section** (homepage, after Custom Fabrication):
    confirm all six commitment items are visible, toggle between all
    four quantity categories and confirm the panel updates each time,
    and click "Get a Quote" from at least two different categories —
    both should land on `/quote`. Confirm the "inquiry categories only"
    disclaimer is visible without needing to scroll or hover.
22. **Automated quantity orders logic test** (no server needed): run
    `node frontend/scripts/test-quantity-orders.mjs` — should print
    "17 passed, 0 failed".
23. **Industrial Applications** (`/products`, below the catalogue):
    confirm all 11 cards render with a material badge, fabrication
    method badges, and a Get a Quote button each; confirm 9 of the 11
    show a "View [Category]" link and the remaining 2 (Protective
    Shields, Laboratory Components) correctly show no such link rather
    than a broken one.
24. **Automated applications logic test** (no server needed): run
    `node frontend/scripts/test-applications.mjs` — should print
    "14 passed, 0 failed".
25. **B2B Trust section** (homepage, right before the closing CTA):
    confirm all 4 trust pillars render with real content (not
    "undefined"), the "Sample testimonials" note is visible without
    hovering or scrolling, the carousel auto-advances on its own after a
    few seconds, hovering over it pauses that auto-advance, and clicking
    a dot or an arrow both jumps to the right testimonial AND stops
    further auto-advancing. Also revisit `/about` and confirm "Our
    Commitment" still shows the same 3 cards as before — it now reads
    from the same shared data file as this new section.
26. **Automated trust section logic test** (no server needed): run
    `node frontend/scripts/test-trust-section.mjs` — should print
    "28 passed, 0 failed".
27. **FAQ** (`/faq`, linked from the footer): confirm all 15 questions
    render, clicking one expands it and closes any other open one,
    keyboard `Enter`/`Space` on a focused question works the same as a
    click, and — using your browser's dev tools — confirm a
    `<script type="application/ld+json">` tag exists in `<head>`
    containing all 15 questions.
28. **Automated FAQ logic test** (no server needed): run
    `node frontend/scripts/test-faq.mjs` — should print
    "28 passed, 0 failed".
29. **Blog** (`/blog` and `/blog/:slug`): confirm all 10 articles list
    with a reading time and date, clicking one loads the full article
    with real content and a Get a Quote CTA, related articles appear at
    the bottom and never include the current article itself, and
    visiting `/blog/not-a-real-slug` shows a proper "Article not found"
    page rather than a crash. Using your browser's dev tools on an
    article page, confirm a `<script type="application/ld+json">` tag
    with `"@type": "BlogPosting"` exists in `<head>`, and that the tab
    title changes to match the article.
30. **Automated blog logic test** (no server needed): run
    `node frontend/scripts/test-blog.mjs` — should print
    "27 passed, 0 failed".
31. **Blog seed data** (optional, requires Supabase): run
    `node database/scripts/generate-seed.mjs` and confirm
    `database/seed/001_content_seed.sql` now contains 10
    `insert into blog_posts` statements alongside the existing content.

## Commands summary

| App      | Command                          | URL                              |
|----------|-----------------------------------|-----------------------------------|
| Backend  | `cd backend && npm run dev`      | http://localhost:5000            |
| Frontend | `cd frontend && npm run dev`     | http://localhost:5173            |
| Health   | —                                 | http://localhost:5000/api/health |

## A note on how this was built

This project was written in a sandboxed environment with no outbound
internet access, so `npm install` could not be run there and neither
server could actually be started and observed. Every file was written by
hand and checked as far as possible without live execution:

- All `.jsx`/`.js` frontend files were parsed with the TypeScript compiler
  (`tsc --noResolve`) to catch syntax errors.
- All backend `.js` files were checked with `node --check` to catch syntax
  errors.
- Every relative import path was verified to resolve to a real file.
- CSS files were checked for balanced braces.

None of this replaces actually running the apps. Please run both commands
above, confirm the health check and homepage work as described, and report
back anything that errors or looks wrong so it gets fixed before the next
phase.

## Security notes

- `.env` files are git-ignored. Never commit them.
- `CORS_ORIGIN` restricts which frontend origin the backend accepts
  requests from.
- `SUPABASE_SERVICE_ROLE_KEY` lives only in `backend/.env`, is read in
  exactly one file (`backend/src/config/supabaseClient.js`), and is never
  returned in any API response, logged, or referenced anywhere under
  `frontend/` — verified by grepping the whole frontend tree, not just
  assumed. The frontend never talks to Supabase directly; it only calls
  this Express backend.
- `RESEND_API_KEY` follows the identical pattern — one file
  (`backend/src/services/email.service.js`), read via `process.env`,
  never exposed — same grep-verified guarantee.
- Email sending happens strictly after the inquiry is already stored,
  never before — see "Email notifications" for why this ordering is the
  actual mechanism that guarantees an email failure can never lose an
  inquiry, not just a try/catch wrapped around the wrong thing.

## Next phase (proposed, awaiting your confirmation)

Build out the real homepage content (capabilities, industries, CTA
sections) and start the product data model — still no database yet, static
data in `frontend/src/data/`.
