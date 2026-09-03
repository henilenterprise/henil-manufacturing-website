# Admin Inquiry Dashboard — Architecture

This document is the security design for the private admin dashboard.
Read it before touching `admin/` or the `2026010000{15,16,17,18}_*.sql`
migrations — several choices below (why the admin app talks to
Supabase directly, why `is_admin()` is `SECURITY DEFINER`, why the
service role key never appears in `admin/`) are load-bearing, not
stylistic.

## The one-sentence model

**A Supabase Auth session proves *who* someone is; a row in
`admin_users` grants *what* they can see; Postgres Row Level Security
is the only thing that actually enforces the second part — not this
app's code, not the anon key, not any client-side check.**

If every line of JavaScript in `admin/` were deleted and replaced with
a malicious build, the worst it could do is ask Postgres for data as
whichever real, authenticated user is signed in. It could never grant
itself the `admin_users` row that makes those queries return anything.

## Why this app is a separate, unlinked app (not a route on the public site)

`admin/` is its own Vite app — own `package.json`, own dev server
(port 5174, vs. the public site's 5173), own deploy target. Three
independent reasons, all real:

1. **Nothing to leak.** The public site's JS bundle contains zero admin
   code, zero admin routes, zero hint that a dashboard exists. Someone
   auditing `frontend/`'s bundle finds nothing to even attempt against.
2. **Nothing to accidentally expose.** A route table is one typo away
   from becoming reachable (a missing auth check on one path, a
   dev-only route left in). Two separate apps means that mistake, if it
   ever happens, is contained to a build that was never supposed to be
   public in the first place — deploy it on its own subdomain, ideally
   behind an additional network control (VPN, IP allowlist, or your
   host's access rules) as defense in depth, on top of (not instead of)
   the RLS boundary below.
3. **Different trust model, different code.** The public site's own RLS
   design (see `database/migrations/20260101000013_row_level_security.sql`)
   is "anyone can write, nobody can read" for customer data — the
   opposite shape of what an admin dashboard needs. Keeping them as
   separate apps means neither codebase has to reason about both shapes
   at once.

**Point 2 is defense in depth, not the actual boundary.** Even a fully
public, indexed, linked-from-everywhere admin URL would still show a
non-admin visitor nothing but empty tables and permission errors,
because RLS denies the underlying queries regardless of how someone
arrived at the page. Obscurity is a nice-to-have on top of a real
control, never a substitute for one.

## Why the admin app talks to Supabase *directly* (unlike the public site)

The public site's frontend never talks to Supabase directly — it only
calls the Express backend, which holds the service role key
(`backend/src/config/supabaseClient.js`). That pattern exists because
the public site's job is "let anonymous strangers write, let nobody
read" — RLS alone can express the write side (`with check (true)` on
INSERT), but the *read* side for that data has no RLS policy at all;
reading it is a backend-only, service-role-only operation by design.

The admin dashboard's job is the opposite: "let a specific, provable
identity read and update, with no other gate." That's exactly what RLS
is built for, and routing it through a backend that re-implements the
same "is this caller an admin?" check in JavaScript would mean:

- Two places to get the check right instead of one (the backend's
  version, and whatever it delegates to).
- A backend using the *service role key* to serve admin requests, which
  means a bug in that backend's authorization check is a full RLS
  bypass for every table — a strictly larger blast radius than a bug in
  a `SELECT ... WHERE is_admin()` policy, which fails closed by
  Postgres's own default (no matching policy = no rows, full stop).

So instead: `admin/` holds only the **anon key** (safe to expose — see
`admin/src/lib/supabaseClient.js`), authenticates real users via
Supabase Auth, and every query runs as that user, filtered by RLS. The
**service role key** never appears anywhere under `admin/` — it exists
in exactly two places in this whole repository: `backend/.env` (unrelated
to this dashboard) and the shell environment you invoke
`database/scripts/create-admin-user.mjs` from.

## The authorization chain, end to end

```
Person enters email + password in admin/src/pages/Login.jsx
        │
        ▼
supabase.auth.signInWithPassword()  — Supabase Auth verifies the
        │                              password, issues a JWT.
        ▼
A Postgres session for every later query carries auth.uid() = that
person's Supabase Auth user id — set automatically by Supabase's
PostgREST layer from the verified JWT. The app never sets this itself.
        │
        ▼
Every admin-facing RLS policy (see 20260101000018_admin_row_level_security.sql)
reads: `using (is_admin())`
        │
        ▼
is_admin() (20260101000016_create_admin_users.sql) runs SECURITY DEFINER,
querying: `select 1 from admin_users where id = auth.uid() and is_active = true`
        │
        ├── No matching row  → is_admin() = false → policy denies → query returns nothing
        │
        └── Matching, active row → is_admin() = true → policy allows → query proceeds
```

The **only** way a row ever exists in `admin_users` is
`database/scripts/create-admin-user.mjs`, run by a person holding the
service role key. There is no INSERT/UPDATE/DELETE RLS policy on
`admin_users` for `anon` or `authenticated` — self-provisioning is not
just unimplemented, it's structurally impossible through the app.

### Why `is_admin()` needs `SECURITY DEFINER`

`admin_users` has RLS enabled too (a non-admin shouldn't be able to
browse the admin roster). Without `SECURITY DEFINER`, a policy on
`inquiries` that subqueried `admin_users` directly would have that
subquery itself filtered by `admin_users`'s own RLS policy — which
requires already being an admin to read, the exact thing being checked.
`SECURITY DEFINER` runs the function's one narrow query with the
function owner's privileges, sidestepping that circularity. It's the
single deliberate privilege boundary in this schema, scoped to one
function that does exactly one thing.

## What's protected, and how

| What | Table / bucket | Public (anon) | Admin (authenticated + `is_admin()`) |
|---|---|---|---|
| Inquiry reference, date, company, contact, product, quantity, status, delivery date | `inquiries` | Can INSERT (submit an RFQ) only — no SELECT policy exists | SELECT + UPDATE |
| Uploaded drawings (metadata) | `inquiry_files` | Can INSERT only | SELECT |
| Uploaded drawings (file bytes) | Storage bucket `inquiry-drawings` | Can INSERT (upload) only | SELECT (incl. signed URLs) |
| Internal notes | `inquiry_notes` | No access at all (no policy of any kind) | SELECT all, INSERT own (not update/delete — append-only) |
| Admin roster | `admin_users` | No access at all | SELECT only — no self-service writes for anyone |

Every "no policy" cell above means *fully denied*, not *unrestricted* —
see the warning comment repeated in both RLS migration files. This is
Postgres's own default the moment `enable row level security` runs on
a table: no matching policy for a command+role denies that command for
that role, silently, which is easy to get backwards when skimming.

## Mapping the brief's admin actions to this architecture

| Requested action | How it works |
|---|---|
| View inquiry | `SELECT` on `inquiries`, gated by the policy above. |
| Download drawings | `storage.createSignedUrl()`, itself gated by the storage SELECT policy — a non-admin's request to generate a signed URL fails, not just their attempt to use one. |
| Change status | `UPDATE inquiries SET status = ...`, gated by the UPDATE policy. |
| Add internal notes | `INSERT` into `inquiry_notes`, with `admin_id` forced to equal the caller's own `auth.uid()` — an admin can't attribute a note to a colleague. |
| Contact customer | Plain `mailto:`/`tel:` links using `inquiries.email`/`.phone`, already on the row an admin can see — no separate messaging system, nothing new to secure. |
| Mark as quoted | `UPDATE inquiries SET status = 'QUOTED'` — a one-click shortcut over the same status-update path, not a distinct feature. |
| Mark as closed | Same, with `status = 'CLOSED'`. |

## A real, pre-existing gap this closed along the way

`backend/src/services/inquiry.service.js` validated `requirement.product`
(the free-text product name from the RFQ wizard) as **required**, but
never wrote it to a column — only the resolved catalogue FK
(`product_id`, null for anything typed freehand) was persisted. The
dashboard's "Product" column needed a real value to show even for
custom/free-text requests, so `20260101000015_add_inquiry_product_name.sql`
adds `inquiries.product_name` and the service now writes it. Flagged
here rather than silently folded in, since it's a fix to existing
behavior, not new admin-dashboard surface area.

## Provisioning and deprovisioning admins

**Add**: `node database/scripts/create-admin-user.mjs email "Name"` —
see that file's header comment for full usage. Requires the service
role key, prints a one-time temporary password, never stores it.

**Deactivate**: no app UI for this yet (see `admin/README.md`'s "What
isn't built yet"). Today it's a direct
`update admin_users set is_active = false where email = '...'` via the
Supabase SQL editor or a service-role script — deliberately not
exposed through the admin app itself, for the same reason self-signup
isn't: granting or revoking access should be a decision made outside
the tool being granted access to.

## Configuration

| Where | Key(s) | Notes |
|---|---|---|
| `admin/.env` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Public by design — see `admin/.env.example`. |
| Shell env, one-off | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Only for running `create-admin-user.mjs`. Never saved to a file in this repo. |
| `backend/.env` | `SUPABASE_SERVICE_ROLE_KEY` | Unrelated to this dashboard — the public site's own service-role usage, already documented in the root README. |

## Honest limitations

- This sandbox has no network access, so none of the SQL below was run
  against a live Postgres/Supabase instance — same caveat as every
  other migration in this project (see `database/README.md`). Checked:
  balanced parentheses, every FK target exists and is defined in an
  earlier migration, every RLS-enabled table has at least one policy,
  `is_admin()` is called consistently by every new policy. Not checked,
  because it can't be from here: that `supabase db push` actually
  applies cleanly, and that `auth.users`/Supabase Auth behaves exactly
  as documented in a real project.
- The admin app itself (`admin/`) was written and `tsc --noResolve`
  syntax-checked the same way the rest of this project's frontend code
  is (see the root README's "A note on how this was built") — not
  actually run, since `npm install` isn't possible here either.
- No rate limiting or brute-force protection on the login form beyond
  whatever Supabase Auth applies by default at the platform level — not
  something this app's code adds on top.
- No audit log of *reads* (who viewed which inquiry), only of *writes*
  (status changes are visible via `inquiries.updated_at`; notes are
  inherently an append-only log with an author and timestamp). Adding
  read-auditing wasn't in the brief; noted so it isn't mistaken for an
  oversight later.
