# SEO Setup — Search Console, Analytics, and what's already in place

This file covers two things: (1) a summary of the SEO infrastructure
already implemented in this repo, and (2) exactly how to connect Google
Search Console and Google Analytics — both are opt-in, config-driven,
and off by default until you provide real values. No analytics ID or
verification code is hardcoded anywhere in this codebase.

---

## 1. What's already implemented

### Sitemap & robots
- `frontend/public/sitemap.xml` — every static route, all product
  detail pages, and all published blog posts.
- `frontend/public/robots.txt` — allows full crawling, excludes
  `/design-system` (internal tooling, not real content), points at the
  sitemap.
- **Both use `https://www.henilenterprise.com` as a placeholder
  domain.** This is a static-file limitation of a client-rendered Vite
  SPA with no server-side rendering step to regenerate them — replace
  the domain in both files once the real production domain is live,
  and again if the sitemap's product/blog list ever changes (see the
  comment at the top of `sitemap.xml`).

### Canonical URLs
Every page sets its own `<link rel="canonical">` via the `useSeo` hook
(`frontend/src/hooks/useSeo.js`) or, for Blog/BlogPost/Faq, the
underlying `useCanonical` hook directly. Resolved against
`window.location.origin` at runtime, so it's correct regardless of
which domain the site is actually deployed on.

### Open Graph / Twitter Card
`useSeo` also sets `og:title`, `og:description`, `og:url`,
`og:type`, `og:site_name`, and `twitter:card`/`title`/`description` for
every page. `index.html` sets the site-wide defaults
(`og:site_name`, `og:type`) for the moment before React hydrates.

### Structured data (JSON-LD)
All builders live in `frontend/src/utils/structuredData.js` (plus
`buildFaqStructuredData` in `utils/faq.js` and
`buildBlogPostingStructuredData` in `utils/blog.js`), all sourced from
`company.config.js` so nothing drifts out of sync with the real config:

| Schema type | Where it's mounted | Notes |
|---|---|---|
| `Organization` | Sitewide, once, in `App.jsx` | Name, description, logo, `sameAs` social links, `contactPoint`. Omits anything unconfigured. |
| `LocalBusiness` | Home and Contact only | Deliberately *not* sitewide — a blog post or FAQ page doesn't need the business address repeated. Address, geo (if set), phone/email, `areaServed`. |
| `BreadcrumbList` | Every page below the top level | Matches the visible breadcrumb trail on the page. |
| `Product` | Every `/products/:slug` page | No `offers`/price — every order here is custom-quoted, so a fixed price would be fabricated data. |
| `BlogPosting` (an `Article` subtype) | Every `/blog/:slug` page | Headline, author (Organization), publisher (with logo), `datePublished`/`dateModified`, `mainEntityOfPage`. |
| `FAQPage` | `/faq` | Generated directly from the same `FAQ_ITEMS` array the visible accordion renders, so markup can't drift from visible content. |

Validate any of these at [Google's Rich Results
Test](https://search.google.com/test/rich-results) once the site is
deployed and reachable.

### Configuration area
**`frontend/src/config/company.config.js`** is the single canonical
place for: company name, address, phone, email, website URL, business
description, and social/profile links. Every structured-data builder,
the footer, and the Contact page read from here — nothing is
duplicated or hand-typed twice. `frontend/src/config/localBusiness.config.js`
holds the map embed, geo-coordinates, and hours note (location-display
concerns, kept separate from core identity).

**Nothing in either file is invented.** Confirmed facts (company name,
city, state, country) are hardcoded directly; everything else — street
address, postal code, phone, email, social links — reads from an
environment variable and is simply *omitted* from structured data and
page copy when blank, rather than showing a placeholder that could look
like a real fact. See `.env.example` for the full list of variables and
what each one feeds into.

---

## 2. Connecting Google Search Console

Search Console tells you how Google actually sees the site — indexing
status, search queries, crawl errors, mobile usability, and where the
structured data above is (or isn't) producing rich results.

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
   and add a property. Use the **domain property** (verifies the whole
   domain, all subdomains and protocols) if you can edit DNS; use the
   **URL-prefix property** if you only have access to the site files.
2. **For a URL-prefix property**, the easiest verification method
   already has a hook in this codebase: Search Console → your property
   → **Settings → Ownership verification → HTML tag**. Copy only the
   value inside `content="..."` (a long string, not the whole tag) and
   set it as:
   ```
   VITE_GSC_VERIFICATION_CODE=that-value
   ```
   in `frontend/.env`. Rebuild/redeploy — Vite injects this into
   `index.html`'s `<meta name="google-site-verification">` tag
   automatically (Vite's built-in `%VITE_...%` HTML replacement; see
   the comment above that tag in `frontend/index.html`). Then click
   **Verify** in Search Console.
3. Once verified, go to **Sitemaps** in the left sidebar and submit:
   ```
   sitemap.xml
   ```
   (Search Console appends it to your verified domain automatically.)
   Make sure `frontend/public/sitemap.xml` has had its placeholder
   domain replaced with the real one first (see section 1 above) —
   otherwise Google will try to crawl URLs on a domain that isn't this
   site.
4. Give it a few days, then check **Pages** (indexing status) and
   **Search results** (queries, clicks, impressions). Use **URL
   Inspection** on individual pages to confirm the structured data
   above is being read correctly, and check **Enhancements** for any
   rich-result eligibility (FAQ, Breadcrumb, Product) Google reports.

**Alternative verification methods** (DNS TXT record, HTML file
upload, or Google Analytics/Tag Manager linkage) all work too — the
env-var method above is just the one this codebase has a ready-made
hook for. Any of them is fine; Search Console lets you pick.

---

## 3. Connecting Google Analytics

Analytics is fully inactive by default — no script tag is added, no
network request is made, nothing is tracked — until you set a real
Measurement ID. Nothing is hardcoded; see
`frontend/src/hooks/useAnalytics.js` for the implementation.

1. Go to [analytics.google.com](https://analytics.google.com), create
   an account and a **GA4 property** (Universal Analytics is retired —
   make sure it's GA4, not an older UA property).
2. Under **Admin → Data Streams**, add a **Web** stream with the site's
   real URL. Copy the **Measurement ID** shown — it looks like
   `G-XXXXXXXXXX`.
3. Set it in `frontend/.env`:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Rebuild/redeploy. That's the entire integration — no code changes
   needed. On load, `useAnalytics()` (called once from
   `App.jsx` via the `<Analytics />` component) checks for this env
   var; if it's set, it loads `gtag.js` and sends a `page_view` event.
5. **This is a client-rendered SPA** (React Router, no full page
   reloads between routes), so a bare `gtag.js` drop-in would only ever
   see the first pageview. `useAnalytics` explicitly sends a
   `page_view` event on every route change (via `useLocation`), so
   `/products`, `/about`, `/blog/acrylic-vs-polycarbonate`, etc. all
   show up as distinct pageviews in GA — not just `/`.
6. To confirm it's working: open the deployed site, go to **Reports →
   Realtime** in GA, and navigate a few pages. You should see yourself
   as an active user with the pathnames you visited.

**Note on consent**: this implementation loads analytics unconditionally
once the Measurement ID is set — it does not include a cookie-consent
banner or opt-out mechanism. If the site's audience or jurisdiction
requires consent before tracking (e.g. GDPR-covered visitors), add a
consent gate before calling `useAnalytics()`, or before setting the env
var in that deployment. That's a legal/compliance decision specific to
where and to whom the site is served, not something to default one way
or the other here.

---

## Quick reference: every env var this setup uses

All of these go in `frontend/.env` (copy from `.env.example`, which has
the same variables with explanatory comments inline). None have a
functioning default that fakes real data — a blank value always means
"this feature/field is simply not shown," never a placeholder.

| Variable | Feeds into |
|---|---|
| `VITE_SITE_URL` | Canonical/OG URL origin, structured-data `url` |
| `VITE_BUSINESS_DESCRIPTION` | Organization/LocalBusiness `description` |
| `VITE_STREET_ADDRESS`, `VITE_POSTAL_CODE` | `PostalAddress` in structured data, Contact page |
| `VITE_GEO_LATITUDE`, `VITE_GEO_LONGITUDE` | `GeoCoordinates` in LocalBusiness schema |
| `VITE_GOOGLE_MAPS_EMBED_URL` | Contact page map iframe |
| `VITE_BUSINESS_HOURS_NOTE` | Contact page hours line |
| `VITE_SOCIAL_FACEBOOK` / `_INSTAGRAM` / `_LINKEDIN` / `_TWITTER` / `_YOUTUBE` | `sameAs` in Organization/LocalBusiness schema |
| `VITE_GOOGLE_BUSINESS_PROFILE_URL` | `sameAs`, Contact page link |
| `VITE_GSC_VERIFICATION_CODE` | Search Console ownership verification meta tag |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 |
