# End-to-End Test Report

## How this was actually done

This sandbox has no browser and no network access (`npm install` fails
against the real registry — same constraint documented throughout this
project). So "end-to-end test" here means two genuinely different
things, kept clearly separate below rather than blurred together:

1. **Actually executed** — real Node processes running real project
   code against real inputs, with real pass/fail output. This covers
   every pure-logic piece: file validation, form validation, the
   reference-number generator, and every one of this project's own
   existing test scripts (12 scripts, several written in earlier
   phases specifically so they could run standalone via `node`).
2. **Statically traced** — read the actual code path a browser would
   run (routing, error handling, rendering logic) and reasoned through
   real inputs by hand, since no browser was available to click through
   it. Marked explicitly as such below — never presented as if it were
   the same rigor as (1).

**Bugs found were fixed, not just written up** — four real ones, detailed
below. Run the actual test suite yourself to reproduce everything in
section 1: `node frontend/scripts/*.mjs` and
`node backend/scripts/test-*.mjs`.

---

## 1. Actually executed — 273 assertions, all passing after fixes

```
frontend/scripts/*.mjs (10 scripts):  183 passed, 0 failed
backend/scripts/test-*.mjs (2 scripts): 90 passed, 0 failed
                                       ─────────────────────
                                       273 passed, 0 failed
```

Plus new, purpose-built executions for this test pass specifically:

### RFQ form validation — the exact matrix the brief asked for
Ran `validateInquiryPayload()` (the real server-side validator) against:
a fully valid payload, a completely empty form, a form with only
whitespace, three different malformed emails (missing `@`, missing
domain, embedded space), quantity edge cases (zero, negative,
non-integer, non-numeric), an unrecognized material, a message at
exactly the 5000-character limit (passes) and one character over
(rejected), and a 10,000-character company name (rejected). Every case
produced exactly the expected result — see the "Fixed" section below
for the one gap this surfaced in how the *frontend* handled these.

### File upload — PDF, PNG, JPG, DXF, DWG, and invalid files
Ran the real `validateFile()` (extension + claimed MIME type) and
`validateFileSignature()` (actual file-content magic-byte check) against
real, correctly-formed bytes for all five accepted types, plus:
extension/MIME mismatches, a `.zip`, a renamed `.exe`, a `.js` script, a
file with no extension at all, and case-sensitivity (`PHOTO.PNG`). Also
specifically verified the magic-byte check independently catches a file
whose *extension* claims one format but whose *actual bytes* are
another (e.g., a `.pdf`-named file containing real PNG bytes) — this is
the exact spoofing scenario `validateFileSignature()` exists to catch,
confirmed working. Every case behaved correctly.

### Reference number generation
Generated 20 reference numbers in a row — all unique, and all matching
the database's own `CHECK` constraint format (`^HE-RFQ-[0-9]{5,}$`)
exactly.

### Blog post lookup — direct URL to a real vs. nonexistent slug
Called the real `getBlogPostBySlug()` service function directly: a real
slug returns the real post; a nonexistent slug, an empty string, and
`undefined` all correctly return `null` (not a throw, not `undefined`)
— which is exactly what `BlogPost.jsx` checks for to render its
not-found state rather than crashing.

---

## 2. Bugs found and fixed (not just reported)

### 🔴 A project test script was silently broken — fixed, now passing
`frontend/scripts/test-blog.mjs` is documented as runnable via plain
`node` and was, until this pass — a change from an earlier phase (adding
`company.config.js` into `utils/blog.js`'s import chain, for
Article/BlogPosting structured data) made it transitively depend on
`import.meta.env`, which only exists under Vite. Running the script
threw `TypeError: Cannot read properties of undefined` before a single
test could run.
**Fixed**: every `import.meta.env.VITE_...` access across all five
config files that read it (`company.config.js`, `site.config.js`,
`brochure.config.js`, `localBusiness.config.js`, `upload.config.js`) now
uses `import.meta.env?.VITE_...` — a no-op in the real app (Vite always
provides a defined `import.meta.env` there) that stops a plain-Node
import from crashing at module-evaluation time. Verified: the script
now runs and passes all 27 of its own assertions, and every other
script that touches these config files (all 12) still passes too.

### 🔴 Invalid-email/quantity errors were silently discarded on submit
Traced the RFQ wizard's error path end-to-end (and confirmed with a
simulated fetch response — see below): when the server rejects a
submission with specific per-field reasons (e.g. *"company.email is not
a valid email address"*), `services/inquiryService.js` was already
capturing those reasons on the thrown error's `.fieldErrors` — but
`pages/Quote.jsx`'s `handleSubmit` never read that property, and
`StepReview.jsx` never rendered it. A person who reached the final step
with an invalid email (possible, because the earlier step's "Next"
button only checked *presence*, not *format*) would submit, get
rejected, and see only the generic *"Missing or invalid fields."* — no
indication of which field, or why.
**Fixed**, two parts:
1. `pages/Quote.jsx` now tightens `isCurrentStepValid()` to also check
   email format (same regex the backend uses) on the Company step, and
   quantity validity (whole number, greater than zero) on the
   Requirement step — catching the problem next to the field itself,
   before the person ever reaches the review step.
2. As a backstop for anything that still fails server-side,
   `handleSubmit` now stores `err.fieldErrors` and passes it through to
   `StepReview`, which renders the specific reasons in a list under the
   generic message — verified with a simulated server response
   containing two field errors; both rendered as expected.

Also updated the "Fill in the fields marked * to continue" hint, which
would have been misleading for a format error (the field *is* filled
in, just wrong) — it now reads "Check the fields marked * — make sure
they're filled in correctly to continue."

### 🟡 Confusing error message for a file with no extension
`validateFile()` on a file with no extension produced the reason
`File type "." is not in the allowed list` — a stray, confusing period
where the extension should be. **Fixed**: renders as
`File type with no extension is not in the allowed list` instead.
Verified via the real executed test matrix above.

---

## 3. Statically traced (no browser available — reasoned through the actual code path)

### Every listed page
Home, Products, Product detail, Capabilities, Industries, About,
Gallery, Blog, Contact, Brochure, Get Quote — every route in
`App.jsx` resolves to a real component with no missing import (verified
by `tsc --noResolve` across the whole frontend, which would fail on an
unresolvable import). Every `.map()` call rendering JSX across the
entire codebase was checked for a `key` prop (a script scanned every
`.map(` call for a `key=` within its render block, three initial
false-positives manually confirmed as non-issues — two map to plain
data/strings, not JSX; one has its `key` prop a few lines further down
than the script's window, present and correct on inspection).

### Direct URL / refresh / back / forward
`BrowserRouter` + real URL-based routes throughout (no
`location.state` dependency anywhere in the codebase — grep-verified
zero matches — which is exactly the pattern that would break on a
refresh or a direct URL load, since `location.state` is only populated
by in-app `<Link state={...}>` navigation, never present after a fresh
page load). Both dynamic routes (`/products/:slug`, `/blog/:slug`)
explicitly handle a nonexistent slug with a real not-found UI and a way
back, rather than crashing — confirmed in code for `ProductDetail.jsx`
and confirmed *and executed* for `BlogPost.jsx` (see section 1).

### Network errors
Both fetch-based service functions (`inquiryService.js`,
`uploadService.js`) are called from within `try`/`catch` blocks at
every call site (`Quote.jsx`'s `handleSubmit`,
`DrawingUpload.jsx`'s `handleSubmit`) — a raw network failure (backend
unreachable, DNS failure, offline) surfaces as a caught error with a
sensible fallback message, not an unhandled rejection or a hung UI.

### WhatsApp
Covered by the real, executed `test-whatsapp.mjs` (11 assertions) —
correct message generation per product, correct URL encoding, and
critically, a verified safety fallback: an unconfigured WhatsApp number
returns `null` rather than ever generating a broken `wa.me/undefined`
link. Every WhatsApp-linking component in the codebase (`MainNav`,
`HeroSection`, `FloatingWhatsAppButton`, `MobileStickyCTA` before its
removal, `StickyInquiryPanel`) checks for a truthy href before
rendering the link at all.

### Brochure
Covered by the real, executed `test-brochure.mjs` (8 assertions) —
specifically the case that actually matters in production: a static
host's SPA fallback can return `200 OK` with an HTML page for a file
path that doesn't really exist, which would make a missing brochure
look "available" if only the HTTP status were checked. Verified the
content-type check catches this correctly.

### Desktop / Tablet / Mobile
Covered extensively by the dedicated mobile-optimization pass earlier
in this project (see `MOBILE-OPTIMIZATION-AUDIT.md`) — this pass
focused on functional/logic correctness rather than re-doing that
visual audit. Confirmed no functional logic (as opposed to layout) is
conditional on viewport width in a way that could break — e.g., the
RFQ wizard, file upload, and validation logic above are identical code
paths regardless of screen size; only presentation changes.

### Empty forms / invalid email / large messages
Covered by the real, executed validation matrix in section 1 — every
one of these was an actual test case, not a traced assumption.

---

## Summary

| Area | Method | Result |
|---|---|---|
| RFQ field validation (all fields, empty, invalid email, large messages) | Executed | Correct — 15 real cases run |
| File types: PDF, PNG, JPG, DXF, DWG + invalid files | Executed | Correct — 12 real cases run, incl. magic-byte spoofing |
| Reference number generation | Executed | Correct — 20 generated, all unique, all format-valid |
| Blog direct-URL / nonexistent slug | Executed | Correct — real + fake + edge-case slugs all handled |
| Existing project test suite (12 scripts) | Executed | 1 broken script fixed, all 273 assertions now pass |
| RFQ error-message surfacing on submit failure | Traced, then fixed | Real bug found and fixed |
| Routing (refresh/direct URL/back/forward) | Traced | No issues found |
| Network error handling | Traced | No issues found |
| React key props (console-warning risk) | Traced (scripted scan) | No issues found |
| WhatsApp, Brochure | Executed (existing tests) | No issues found |
| Desktop/Tablet/Mobile | Deferred to prior dedicated pass | See `MOBILE-OPTIMIZATION-AUDIT.md` |
