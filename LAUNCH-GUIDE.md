# Launch Guide — Zero to Live

**Note**: the WhatsApp button is currently positioned **bottom-right**
(changed from an earlier bottom-left placement) — wherever this guide's
testing steps say "bottom-left corner" for WhatsApp, read that as
whichever corner it's actually in on your build at the time you're
testing.

A complete, in-order walkthrough for taking this project from your
computer to a live, professional website at your own domain. Written
for someone who has never deployed a website before — no step is
skipped, and every command is copy-pasteable.

**Honest limitation, stated once**: I (the AI that built this project)
have no network access and no real Supabase/Vercel/Render/domain
accounts — I cannot click through these steps for you or verify a real
deployment. Everything below is exact and correct, and I made one real
code change this project needed for this architecture (`frontend/vercel.json`,
explained in Step 8) — but **you** are the one who will actually run
each step, and **you** perform the verification at the end. This guide
is written so that's genuinely possible without prior deployment
experience.

**Architecture you're building**:
```
GitHub  →  Vercel  →  Frontend (static, React)
                          │  (talks to)
                          ▼
        Node hosting  →  Backend (Express API)
                          │
                          ▼
                     Supabase (Database + Storage)
                          │
                          ▼
                  Resend (Transactional email)

Your domain → DNS → points at Vercel (frontend) and your Node host (backend)
```

---

## Before you start

You'll need, at minimum:
- A GitHub account with this project already pushed to it (if you
  haven't done this yet, see the earlier guide for `git init` /
  `git add` / `git commit` / connecting a GitHub remote — this guide
  assumes that's already done).
- A credit card is **not** required for the free tiers of Supabase,
  Vercel, and Render used below, but some (Render's free tier
  specifically) sleep after inactivity — fine for testing, worth
  upgrading before real launch if that matters to you.
- Your domain name already purchased somewhere (GoDaddy, Namecheap,
  Google Domains, etc.) — this guide doesn't cover buying one, only
  connecting one you already own.
- 1–2 hours, mostly waiting on DNS and deployments rather than active work.

---

## 1. Create a production Supabase project

1. Go to **[supabase.com](https://supabase.com)** and sign up (or log in).
2. Click **New Project**.
3. Fill in:
   - **Organization**: create one if you don't have one yet (just a name).
   - **Name**: `henil-manufacturing-prod` (or anything recognizable).
   - **Database Password**: click "Generate a password", then **copy it
     and save it somewhere safe immediately** (a password manager, not
     a text file you'll lose). You won't need to type this password
     often — Supabase mostly uses API keys for day-to-day use — but you
     need it for direct database access later if you ever need it.
   - **Region**: pick the one closest to your customers. For an
     Ahmedabad-based business, `Southeast Asia (Singapore)` or
     `South Asia (Mumbai)` (if offered) will be fastest.
4. Click **Create new project**. Wait 1–2 minutes while Supabase
   provisions it.
5. Once it's ready, go to **Project Settings → API** (gear icon, bottom
   left). You'll see two things you need later:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`. This
     is your `SUPABASE_URL`.
   - **Project API keys** — two of them:
     - `anon` `public` — safe to expose publicly. This is your
       `VITE_SUPABASE_ANON_KEY` (used only by the admin dashboard app).
     - `service_role` `secret` — **never expose this anywhere public.**
       This is your `SUPABASE_SERVICE_ROLE_KEY`.

   Keep this browser tab open — you'll copy these values into hosting
   dashboards in later steps.

---

## 2. Create the database (run the migrations)

This project's entire database schema lives in
`database/migrations/*.sql` — 19 files, meant to run in order. Two ways
to do this; pick whichever feels more comfortable.

### Option A — Supabase CLI (recommended, faster for 19 files)

On your own computer, in the project folder:

```bash
npm install -g supabase
supabase login
```

This opens a browser to authorize the CLI. Then:

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

Find `YOUR_PROJECT_REF` in your Supabase project's URL — go to
**Project Settings → General**, it's listed as "Reference ID"
(also visible in your browser's address bar when viewing the project:
`supabase.com/dashboard/project/YOUR_PROJECT_REF`).

```bash
supabase db push
```

This applies all 19 migrations, in order, in one command. You should
see each filename print as it runs, ending without errors.

### Option B — Manual, via the Supabase Dashboard (no CLI needed)

1. In your Supabase project, open **SQL Editor** (left sidebar).
2. Open `database/migrations/20260101000001_extensions_and_helpers.sql`
   on your computer, copy its entire contents, paste into a new query,
   click **Run**.
3. Repeat for every file in `database/migrations/`, **strictly in
   filename order** (the numbers at the start of each filename are
   the order — `...0001...`, `...0002...`, and so on through
   `...0019...`). Some migrations depend on tables created by earlier
   ones, so running out of order will fail.

### Load sample content (optional, but recommended for testing)

Run `database/seed/001_content_seed.sql` the same way (SQL Editor,
paste, run) — this gives you real product/blog/FAQ content to test
against instead of an empty site.

### Verify

Go to **Table Editor** in the Supabase dashboard. You should see all
the tables: `products`, `inquiries`, `inquiry_files`, `admin_users`,
`inquiry_notes`, `blog_posts`, and more.

---

## 3. Configure storage

The `inquiry-drawings` storage bucket, with its size/file-type
restrictions, is created automatically by the migrations you just ran
(specifically `20260101000014` and `20260101000019`).

**Verify**: Supabase dashboard → **Storage** (left sidebar). You should
see a bucket named `inquiry-drawings`, marked **Private**. Click it →
**Configuration** — confirm "File size limit" shows `20 MB` and
"Allowed MIME types" lists `application/pdf, image/png, image/jpeg,
application/octet-stream`.

If for any reason the bucket doesn't appear (rare, but can happen if a
migration was skipped), create it manually: **Storage → New bucket** →
name it exactly `inquiry-drawings` → toggle **Public bucket** OFF →
create, then set the file size limit and allowed MIME types to match
above under its settings.

---

## 4. Configure the email provider (Resend)

1. Go to **[resend.com](https://resend.com)** and sign up.
2. **Verify your sending domain** (strongly recommended for a real
   business — without this, you can only send from a shared
   `onboarding@resend.dev` address, which looks unprofessional and has
   worse deliverability):
   - Resend dashboard → **Domains → Add Domain** → enter your real
     domain (e.g. `henilenterprise.com`).
   - Resend shows you several DNS records to add (SPF, DKIM, and
     usually a DMARC recommendation) — **keep this tab open**, you'll
     add these in Step 12 (Configure DNS) alongside your other DNS
     records.
   - Come back and click **Verify** once the DNS records are live
     (can take a few minutes to a few hours).
3. **Create an API key**: Resend dashboard → **API Keys → Create API
   Key** → name it something like "Henil Enterprise Production" →
   copy the key **immediately** — Resend only shows it once. This is
   your `RESEND_API_KEY`.
4. Decide your sending address, e.g.
   `Henil Enterprise <no-reply@henilenterprise.com>` — this must be at
   your verified domain. This is your `EMAIL_FROM`.
5. Decide which real inbox should receive internal RFQ notifications
   (probably a real staff email, e.g. `sales@henilenterprise.com`) —
   this is your `HENIL_NOTIFICATION_EMAIL`.

---

## 5. Deploy the backend (Node-compatible hosting)

This guide uses **[Render](https://render.com)** as a concrete
example — it has a clear free tier and a simple Git-based deploy flow,
well suited to a beginner. (Railway and Fly.io work the same way in
spirit if you prefer one of those instead — the specific screens differ,
the underlying steps don't.)

1. Go to **render.com**, sign up, and when prompted, **connect your
   GitHub account** (authorize Render to see your repositories — this
   is also "Connect GitHub", requested as its own step later, but it
   naturally happens right here).
2. Click **New → Web Service**.
3. Select your `henil-manufacturing` repository from the list.
4. Configure:
   - **Name**: `henil-manufacturing-backend` (this becomes part of
     your auto-generated URL, e.g.
     `https://henil-manufacturing-backend.onrender.com`).
   - **Root Directory**: `backend` — **critical**, since this repo has
     three separate apps (`frontend/`, `backend/`, `admin/`) in one
     repository; Render needs to know which one to run.
   - **Runtime**: `Node`.
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (fine to start; upgrade before real launch
     if you want it always-on rather than sleeping after inactivity).
5. **Don't click deploy yet** — scroll to the Environment Variables
   section and add them now (next step), so the first deploy succeeds
   instead of failing on a missing `SUPABASE_URL`.

---

## 6. Configure backend environment variables

Still on Render's service-creation screen (or later, under your
service → **Environment** tab if you already deployed), add each of
these. This is the complete list for `backend/.env` — see
`PRODUCTION-READINESS.md` for the same table with more explanation of
each one.

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | Your real frontend domain(s), comma-separated — e.g. `https://henilenterprise.com,https://www.henilenterprise.com`. You won't know this for certain until Step 8/11, so it's fine to put a placeholder now and come back to fix it in Step 7. |
| `SUPABASE_URL` | From Step 1. |
| `SUPABASE_SERVICE_ROLE_KEY` | From Step 1. **Secret — paste it directly into Render's environment variable field, never into a file you might commit.** |
| `SUPABASE_STORAGE_BUCKET` | `inquiry-drawings` |
| `RESEND_API_KEY` | From Step 4. **Secret.** |
| `EMAIL_FROM` | From Step 4, e.g. `Henil Enterprise <no-reply@henilenterprise.com>` |
| `HENIL_NOTIFICATION_EMAIL` | From Step 4. |
| `EMAIL_RESPONSE_MESSAGE` | `Our team will review your inquiry and get back to you as soon as possible.` (or your own wording) |
| `ALLOWED_UPLOAD_EXTENSIONS` | `pdf,png,jpg,jpeg,dxf,dwg` |
| `MAX_UPLOAD_SIZE_MB` | `20` |
| `MAX_UPLOAD_FILES` | `5` |
| `RATE_LIMIT_GENERAL_MAX` | `300` |
| `RATE_LIMIT_WRITE_MAX` | `10` |
| `TRUST_PROXY_HOPS` | `1` (Render sits behind exactly one proxy layer in front of your app) |

Note: **don't set `PORT`** — Render assigns this automatically and
your app already reads `process.env.PORT` correctly.

Click **Create Web Service**. Render will build and deploy — watch the
logs; you should see `Server running on port ...` when it succeeds.
Copy the URL Render gives you (e.g.
`https://henil-manufacturing-backend.onrender.com`) — you'll need it in
the next step.

---

## 7. Configure CORS

`CORS_ORIGIN` (set in Step 6) must exactly match the origin(s) your
frontend is actually served from — this is the backend's allowlist for
which websites are permitted to call its API from a browser.

Once you know your real frontend URL (Vercel gives you one in Step 8,
and your custom domain in Step 11), go back to **Render → your
service → Environment**, update `CORS_ORIGIN` to the real value(s),
comma-separated, e.g.:

```
CORS_ORIGIN=https://henilenterprise.com,https://www.henilenterprise.com
```

Save — Render automatically redeploys with the new value. **Never**
set this to `*` — this API accepts writes and file uploads, and an
open CORS policy on it would let any website on the internet submit
requests to it from a visitor's browser.

---

## 8. Deploy the frontend to Vercel

1. Go to **[vercel.com](https://vercel.com)**, sign up, and connect
   your GitHub account when prompted.
2. Click **Add New → Project**, select your `henil-manufacturing`
   repository.
3. On the configuration screen:
   - **Root Directory**: click **Edit** next to it, choose `frontend`
     — same reasoning as Render's Root Directory in Step 5, this repo
     has three apps in it.
   - **Framework Preset**: Vercel should auto-detect **Vite**. If not,
     select it manually.
   - **Build Command**: `npm run build` (default — leave as is).
   - **Output Directory**: `dist` (default for Vite — leave as is).
4. **Before clicking Deploy**, open `frontend/vercel.json` in this
   project (already created for you) and update the placeholder:

   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://REPLACE-WITH-YOUR-BACKEND-URL/api/:path*"
       },
       ...
   ```

   Replace `REPLACE-WITH-YOUR-BACKEND-URL` with your real Render URL
   from Step 6 (e.g. `https://henil-manufacturing-backend.onrender.com`),
   commit and push that change:

   ```bash
   git add frontend/vercel.json
   git commit -m "Point frontend API proxy at production backend"
   git push
   ```

   **Why this file matters**: every part of this frontend that talks
   to the backend (`services/inquiryService.js`, `services/uploadService.js`)
   calls a relative path like `/api/inquiries` — this works locally
   because of Vite's dev proxy (`vite.config.js`), but Vercel serves
   the frontend as static files with no such proxy. This `vercel.json`
   rewrite is what makes `/api/*` requests on your live domain actually
   reach your Render backend instead of 404ing. It also includes a
   second rule that sends every other path to `index.html`, which is
   what makes direct URLs and page refreshes on client-side routes
   (like `/products/some-product`) work correctly instead of 404ing —
   without it, only the homepage would work when loaded directly.
5. Click **Deploy**. Vercel builds and gives you a URL like
   `https://henil-manufacturing.vercel.app`.

---

## 9. Configure frontend environment variables

**Vercel → your project → Settings → Environment Variables.** Add each
of these (full explanation of each in `PRODUCTION-READINESS.md`):

| Variable | Value |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Your real WhatsApp Business number, digits only with country code, e.g. `919876543210` |
| `VITE_WHATSAPP_MESSAGE_DEFAULT` | `Hello Henil Enterprise, I am interested in your acrylic/polycarbonate fabrication services.` |
| `VITE_WHATSAPP_MESSAGE_PRODUCT` | `Hello Henil Enterprise, I am interested in {product}.` |
| `VITE_PHONE_NUMBER` | Your real business phone number |
| `VITE_CONTACT_EMAIL` | Your real business email |
| `VITE_ALLOWED_UPLOAD_EXTENSIONS` | `pdf,png,jpg,jpeg,dxf,dwg` |
| `VITE_MAX_UPLOAD_SIZE_MB` | `20` |
| `VITE_MAX_UPLOAD_FILES` | `5` |
| `VITE_BROCHURE_URL` | `/brochure/henil-enterprise-brochure.pdf` (see the note in Step 20 — you need to provide the actual PDF) |
| `VITE_BROCHURE_FILENAME` | `Henil-Enterprise-Brochure.pdf` |
| `VITE_SITE_URL` | Your real domain, e.g. `https://henilenterprise.com` — **important for SEO**, see Step 22 |
| `VITE_STREET_ADDRESS`, `VITE_POSTAL_CODE`, `VITE_GEO_LATITUDE`, `VITE_GEO_LONGITUDE` | Your real address details, if you want full local-SEO structured data. Leave blank if you'd rather not publish an exact address yet — nothing is invented if left blank. |
| `VITE_GOOGLE_MAPS_EMBED_URL` | Optional — a real pinned-address embed URL from Google Maps ("Share → Embed a map"). Falls back to a generic Ahmedabad map if blank. |
| `VITE_BUSINESS_HOURS_NOTE` | Your real hours, e.g. `Mon–Sat, 9:30 AM – 7:00 PM IST` |
| `VITE_SOCIAL_FACEBOOK`, `_INSTAGRAM`, `_LINKEDIN`, `_TWITTER`, `_YOUTUBE` | Your real social profile URLs, whichever you have. Leave the rest blank. |
| `VITE_GOOGLE_BUSINESS_PROFILE_URL` | Your Google Business Profile URL, once you have one |
| `VITE_GSC_VERIFICATION_CODE` | From Step 23 |
| `VITE_GA_MEASUREMENT_ID` | Your GA4 Measurement ID, if you're using Google Analytics (optional — see `SEO-SETUP.md`) |

After adding these, go to **Deployments** and **redeploy** (environment
variable changes don't apply to already-built deployments) — click the
"..." menu on the latest deployment → **Redeploy**.

---

## 10. Connect GitHub

You've already done this — both Render (Step 5) and Vercel (Step 8)
connect directly to your GitHub repository during setup, and both
platforms automatically redeploy every time you `git push` to your
`main` branch. Nothing further to configure: this is the "GitHub →
Vercel" and "GitHub → Render" continuous-deployment pipeline the target
architecture describes, working the moment you set up Steps 5 and 8.

---

## 11. Configure a custom domain

**On Vercel** (for the frontend): Project → **Settings → Domains** →
type your domain (e.g. `henilenterprise.com`) → **Add**. Repeat for
`www.henilenterprise.com`. Vercel will show you the exact DNS records
it needs — keep this tab open for Step 12.

**On Render** (optional, for a professional backend URL instead of
`...onrender.com`): Service → **Settings → Custom Domain** → add
`api.henilenterprise.com` → Render shows you a CNAME target. If you do
this, go back and update `frontend/vercel.json`'s destination to use
`https://api.henilenterprise.com` instead of the onrender.com URL,
commit, and push.

---

## 12. Configure DNS

At your domain registrar (wherever you bought the domain — GoDaddy,
Namecheap, Google Domains, etc.), find **DNS Management** / **DNS
Settings**, and add the records each service just showed you:

| Record type | Host/Name | Points to | For |
|---|---|---|---|
| A | `@` (or blank, meaning the apex domain) | `76.76.21.21` (Vercel will show you the current correct value — use theirs, not this one, if different) | Vercel (frontend, apex domain) |
| CNAME | `www` | `cname.vercel-dns.com` | Vercel (frontend, www) |
| CNAME | `api` | Render's provided target (e.g. `henil-manufacturing-backend.onrender.com`) | Render (backend), only if you set up a custom backend domain in Step 11 |
| TXT/CNAME (several) | As shown by Resend | As shown by Resend | Email deliverability (SPF/DKIM) — copy these exactly from Resend's Domains page in Step 4 |

DNS changes can take anywhere from a few minutes to 48 hours to fully
propagate, though it's usually much faster in practice. You can check
propagation status at a site like `dnschecker.org` if you're impatient.

---

## 13. Verify HTTPS

Both Vercel and Render automatically provision free SSL certificates
(via Let's Encrypt) once your DNS correctly points to them — there's
nothing to manually configure.

**Verify**:
```bash
curl -I https://henilenterprise.com
```
Look for `HTTP/2 200` in the response, with no certificate errors. Also
open the site in a real browser and confirm you see a padlock icon
with no warnings.

```bash
curl -I http://henilenterprise.com
```
Should return a `301` or `308` redirect to the `https://` version —
Vercel does this automatically.

```bash
curl -I https://henil-manufacturing-backend.onrender.com/api/health
```
(or your custom `api.` domain, if you set one up) — should also return
`200` with a valid certificate.

---

## 14. Test the API

```bash
curl https://YOUR-BACKEND-URL/api/health
```
Expected response:
```json
{"status":"ok","message":"Henil Enterprise backend is running","timestamp":"..."}
```

```bash
curl https://YOUR-BACKEND-URL/api/uploads/config
```
Should return the real upload limits (extensions, max size, max files)
— confirms the backend is not just running, but correctly reading its
environment variables.

**Also test through the frontend's proxy**, confirming `vercel.json`'s
rewrite actually works:
```bash
curl https://henilenterprise.com/api/health
```
This should return the **same** response as the direct backend URL
above — if it 404s instead, the `vercel.json` rewrite isn't set up
correctly (double-check the destination URL matches your real backend
exactly, including `https://`).

---

## 15. Test the database

Supabase dashboard → **SQL Editor** → run:
```sql
select count(*) from products;
select count(*) from inquiries;
```
The first should show a real number if you loaded the seed data in
Step 2; the second should show `0` (no real inquiries yet — that's
correct and expected at this point).

---

## 16. Test the RFQ (Get a Quote) flow

1. On your live site, go to **/quote**.
2. Fill out every step with real test data — use **your own** email
   address so you can check the confirmation email in Step 18.
3. Submit.
4. You should see a success screen with a real reference number like
   `HE-RFQ-00001`.
5. **Verify in Supabase**: Table Editor → `inquiries` → your test
   submission should appear as a new row with that exact reference
   number.

Also test the failure paths, since these matter for a "professional"
site: try submitting with an obviously invalid email, and try leaving
required fields blank — you should get clear, specific error messages,
not a silent failure or a generic crash.

---

## 17. Test drawing upload

As part of the same RFQ test (or on **/custom-fabrication**):

1. Upload a real PDF, PNG, or JPG — confirm it's accepted and appears
   in the form's file list.
2. Try uploading a disallowed file (rename any file to end in `.exe`
   or `.zip`, or just try a random file type) — confirm you get a
   clear rejection message, not a silent failure or a server error.
3. **Verify in Supabase**: Storage → `inquiry-drawings` bucket — your
   real uploaded file should appear under a random-looking folder name
   (a UUID) — this is intentional (see `ADMIN-DASHBOARD-ARCHITECTURE.md`),
   not a bug.

---

## 18. Test email notifications

After your test RFQ submission in Step 16:

1. Check the inbox you set as `HENIL_NOTIFICATION_EMAIL` (Step 6) for
   the internal "New RFQ" notification — check spam/junk if it doesn't
   arrive within a few minutes.
2. Check the email address you used *in* the test RFQ form for the
   customer-facing confirmation email.
3. **Verify in Resend**: dashboard → **Logs** — you should see both
   emails listed as sent/delivered. If either shows as failed, the
   error message there will tell you why (usually a domain
   verification issue — revisit Step 4).

---

## 19. Test WhatsApp

On your live site (any page), click the floating WhatsApp button
(bottom-left corner). It should open WhatsApp (web or the app, if on
mobile) with:
- Your real configured number (from `VITE_WHATSAPP_NUMBER`)
- A pre-filled message — the default one, or a product-specific one if
  you clicked it from a product page

---

## 20. Test the brochure

**Before this will work**, you need to actually provide a real
brochure PDF — this project's code is ready for one, but a PDF's
actual content (your company's real capabilities, photos, contact
info) isn't something I can invent for you. Place your real file at:

```
frontend/public/brochure/henil-enterprise-brochure.pdf
```

(matching `VITE_BROCHURE_URL`'s default from Step 9 — change that
variable instead if you'd rather host it elsewhere), commit, and push.

Then on your live site, go to **/brochure** and click download —
confirm it downloads a real PDF, not a 404 or a placeholder.

---

## 21. Test mobile

A dedicated mobile-optimization pass was already done on this codebase
(see `MOBILE-OPTIMIZATION-AUDIT.md`) — this step is about confirming
that holds true on your **live, real** deployment, not re-auditing the
code:

- On a real phone (or Chrome DevTools → Toggle device toolbar, testing
  360px, 375px, 390px, 412px, 768px, 1024px widths): browse the
  homepage, products, and the quote form.
- Confirm the WhatsApp button stays bottom-left at every width.
- Confirm "Get a Quote" is always reachable with one thumb.
- Confirm no horizontal scrolling anywhere.
- Test the RFQ form and file upload specifically on a real phone, not
  just a desktop browser resized — touch interactions (the file picker,
  the multi-step wizard's buttons) are worth confirming for real.

---

## 22. Test SEO

1. **First, fix the placeholder domain** in two static files that
   couldn't be filled in ahead of time (they were written before your
   real domain was known):

   ```bash
   cd frontend/public
   sed -i 's|https://www.henilenterprise.com|https://YOUR-REAL-DOMAIN|g' sitemap.xml robots.txt
   ```

   Replace `YOUR-REAL-DOMAIN` with your actual domain (e.g.
   `henilenterprise.com` — check whether you're using `www.` or not,
   and match whichever is your canonical version). Commit and push.

2. **View source** on your live homepage (right-click → View Page
   Source, not just "Inspect") — confirm you see a real `<title>`, a
   `<meta name="description">`, a `<link rel="canonical">` pointing at
   your real domain, Open Graph tags, and a `<script type="application/ld+json">`
   block (structured data) — all using your real domain, not the
   placeholder. If you still see `henilenterprise.com` as a placeholder
   and that isn't your real domain, double check `VITE_SITE_URL` (Step
   9) is set correctly and redeploy.

3. Visit `https://YOUR-DOMAIN/sitemap.xml` and `https://YOUR-DOMAIN/robots.txt`
   directly in a browser — confirm both load and show your real domain
   throughout.

---

## 23. Test Google Search Console

1. Go to **[search.google.com/search-console](https://search.google.com/search-console)**.
2. **Add property** → choose **URL prefix** → enter
   `https://henilenterprise.com`.
3. Under verification methods, choose **HTML tag**. Copy the value
   inside `content="..."` (not the whole tag).
4. Set that value as `VITE_GSC_VERIFICATION_CODE` in Vercel (Step 9),
   redeploy.
5. Back in Search Console, click **Verify**.
6. Once verified: left sidebar → **Sitemaps** → enter `sitemap.xml` →
   **Submit**.
7. Give it a few days, then check **Pages** (indexing status) and
   **Search results** for real data starting to appear.

Full detail on this step (including alternative verification methods)
is in `SEO-SETUP.md`.

---

# Post-launch production checklist

Run through this once, after every step above is genuinely verified —
not code-verified (that was done in earlier phases), **live-verified**
by you, on the real deployed site.

- [ ] `https://YOUR-DOMAIN` loads with a valid HTTPS padlock, no warnings
- [ ] `http://YOUR-DOMAIN` redirects to `https://`
- [ ] Every nav link works: Home, Products, Product detail, Capabilities,
      Industries, About, Gallery, Blog, Contact, FAQ, Brochure
- [ ] `/api/health` (both directly and through the frontend's `/api/*`
      proxy) returns `200`
- [ ] A real test RFQ submission succeeds and appears in Supabase
- [ ] A real test file upload succeeds and appears in Supabase Storage
- [ ] An invalid file upload is correctly rejected
- [ ] Both notification and confirmation emails arrive for a test RFQ
- [ ] WhatsApp button opens with the correct number and message
- [ ] Brochure downloads a real PDF
- [ ] Site works correctly on a real phone — no horizontal scroll, no
      cut-off buttons, WhatsApp stays bottom-left
- [ ] Page source shows real domain in title/meta/canonical/OG/structured
      data — not the placeholder
- [ ] `sitemap.xml` and `robots.txt` show your real domain
- [ ] Google Search Console is verified and the sitemap is submitted
- [ ] `CORS_ORIGIN` on the backend matches your real frontend domain(s)
      exactly, with no `*` anywhere
- [ ] No `.env` file, secret key, or `node_modules` folder exists in
      your GitHub repository (spot-check by browsing the repo on
      github.com)
- [ ] An admin account exists and you can log into `admin/` (see
      `ADMIN-DASHBOARD-ARCHITECTURE.md` for provisioning one) and see
      your test RFQ there

Once every box above is genuinely checked — by you, against the real
live site — Henil Enterprise has a professional, live, working B2B
manufacturing website.
