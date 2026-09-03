# Admin Dashboard

A **separate app** from `frontend/` — different `package.json`, different
port, different deployment target, and never linked to or from the
public site. See [`../ADMIN-DASHBOARD-ARCHITECTURE.md`](../ADMIN-DASHBOARD-ARCHITECTURE.md)
for the full security model this is built on. Short version: it talks
directly to Supabase (no backend proxy), and Row Level Security — not
this app's code — is what actually stops a non-admin from reading
anything.

## Setup

```bash
cd admin
npm install
cp .env.example .env
# fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY — same project
# as backend/.env's SUPABASE_URL, but the ANON key, never the service
# role key (see .env.example for why that distinction matters here)
npm run dev
```

Runs on **http://localhost:5174** — a different port from the public
site (5173) and backend (5000), so all three can run side by side
during development.

## There is no signup page

You cannot create an admin account through this app. That's
deliberate — see `../database/scripts/create-admin-user.mjs`:

```bash
SUPABASE_URL=https://your-project.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
node database/scripts/create-admin-user.mjs someone@henilenterprise.com "Someone's Name"
```

This is the only supported way to grant access. Run it from a machine
you trust, with the service role key passed only as an env var for that
one invocation — never saved to a file in this repo.

## What's here

- `src/lib/supabaseClient.js` — the Supabase client, anon key only.
- `src/context/AuthProvider.jsx` — session + admin-status tracking.
- `src/components/ProtectedRoute.jsx` — route guard (UI-level; RLS is
  the real guard).
- `src/pages/Login.jsx` — email/password sign-in, no signup.
- `src/pages/Dashboard.jsx` — inquiry list with a status filter.
- `src/pages/InquiryDetail.jsx` — view an inquiry, download drawings,
  change status (including the "Mark as Quoted" / "Mark as Closed"
  shortcuts), add internal notes, and contact the customer directly via
  `mailto:`/`tel:` links.
- `src/lib/inquiries.js` — every Supabase query the app makes, in one
  file, each with a note on what RLS policy actually protects it.

## What isn't built yet

- Password reset / "forgot password" UI — Supabase Auth supports this
  out of the box (`supabase.auth.resetPasswordForEmail`), just not
  wired into a page here yet.
- Deactivating an admin — today that's a direct `update admin_users set
  is_active = false where email = '...'` via the Supabase SQL editor or
  service role client, not a button in this app.
- Pagination on the inquiry list — fine at the current expected volume,
  worth adding once the list is genuinely long.
- An "assigned to" field, saved filters, or export — none of these were
  in the brief; noted here so they're not mistaken for oversights if
  asked about later.

## Deployment

Deploy this as its own app, on its own subdomain (e.g.
`admin.henilenterprise.com`), **never** as a route or subfolder of the
public site's deployment, and never referenced from `frontend/`'s nav,
sitemap, or robots.txt. See `../ADMIN-DASHBOARD-ARCHITECTURE.md` for why
that separation matters even though RLS is the real access-control
boundary.
