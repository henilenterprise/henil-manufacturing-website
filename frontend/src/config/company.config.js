// ============================================================
// COMPANY CONFIGURATION — single source of truth
// ============================================================
// This is the one place that holds Henil Enterprise's real-world
// identity: name, address, phone, email, website, business
// description, and social/profile links. Every other config file
// (site.config.js for nav/whatsapp, localBusiness.config.js for
// map/geo/hours) and every structured-data builder in
// utils/structuredData.js reads from here rather than duplicating
// these values, so there is exactly one field to edit when a real
// phone number, address, or social link becomes available.
//
// Rule, unchanged from every other config file in this project:
// nothing here is invented. Confirmed facts are hardcoded directly
// (company name, city, state, country — all confirmed by the brief
// and the real logo). Anything not yet confirmed reads from an
// environment variable and falls back to an empty string, which every
// consumer (structured data, the Contact page, the footer) treats as
// "omit this field" rather than filling in a placeholder that could
// look like a real, wrong fact.
//
// See .env.example for every VITE_ variable referenced below, and
// SEO-SETUP.md for how these feed into Search Console / Analytics.
//
// Every `import.meta.env?.VITE_...` access below uses optional
// chaining on `.env` itself, not just the property — this file is
// imported transitively by frontend/scripts/test-blog.mjs (via
// utils/blog.js's Article/BlogPosting structured-data builder), which
// runs under plain `node`, not Vite. `import.meta.env` only exists in
// a Vite context; under plain Node it's `undefined`, and
// `undefined.VITE_STREET_ADDRESS` throws before the `|| ""` fallback
// ever gets a chance to run. The `?.` fixes that: in the real app
// (always running under Vite) it's a no-op, since `import.meta.env` is
// always a defined object there — this changes nothing about real
// behavior, it only stops a plain-Node import of this module from
// crashing at module-evaluation time.

export const company = {
  // ---- Confirmed ----
  name: "Henil Enterprise",
  legalName: "Henil Enterprise",

  address: {
    locality: "Ahmedabad",
    region: "Gujarat",
    regionCode: "GJ",
    country: "India",
    countryCode: "IN",
    // Not yet confirmed — see .env.example. Omitted from structured
    // data and display when blank, never guessed at.
    street: import.meta.env?.VITE_STREET_ADDRESS || "",
    postalCode: import.meta.env?.VITE_POSTAL_CODE || "",
  },

  // ---- Not yet confirmed — env-driven, blank by default ----
  phone: import.meta.env?.VITE_PHONE_NUMBER || "",
  email: import.meta.env?.VITE_CONTACT_EMAIL || "",

  // The production domain this site will actually be deployed at.
  // Used for canonical URLs' origin fallback, Organization/LocalBusiness
  // `url`, and generating absolute URLs in structured data when
  // `window` isn't available. Falls back to window.location.origin at
  // runtime in the browser, so leaving this blank in development is
  // fine — it only matters for build-time/static contexts.
  website: import.meta.env?.VITE_SITE_URL || "",

  // A short, factual description of what the business does — used as
  // the Organization/LocalBusiness `description` and can double as
  // fallback SEO copy. This is the same description already used
  // elsewhere in this project's own about/hero copy (WhoWeAre.jsx,
  // AboutHero.jsx) — not a new invented claim, just centralized so
  // structured data can't drift out of sync with the visible page copy
  // it's describing. Overridable via env if the wording ever changes.
  description:
    import.meta.env?.VITE_BUSINESS_DESCRIPTION ||
    "B2B acrylic and polycarbonate manufacturer and fabricator based in Ahmedabad, Gujarat, building custom components to customer drawings, dimensions, samples, and specifications.",

  // A real, currently-hosted logo asset (not a placeholder) — used for
  // Organization structured data and Open Graph fallback images.
  logoPath: "/favicon-512.png",

  // ---- Social / profile links ----
  // Every one of these is blank unless a real profile exists — no
  // placeholder social handles are invented. Each becomes a `sameAs`
  // entry in structured data only when populated (see
  // utils/structuredData.js → getSocialLinks()).
  social: {
    facebook: import.meta.env?.VITE_SOCIAL_FACEBOOK || "",
    instagram: import.meta.env?.VITE_SOCIAL_INSTAGRAM || "",
    linkedin: import.meta.env?.VITE_SOCIAL_LINKEDIN || "",
    twitter: import.meta.env?.VITE_SOCIAL_TWITTER || "",
    youtube: import.meta.env?.VITE_SOCIAL_YOUTUBE || "",
    // Google Business Profile is a "social" / public-profile link for
    // schema.org `sameAs` purposes even though it isn't a social
    // network — grouped here rather than in localBusiness.config.js so
    // every outbound profile link lives in one array.
    googleBusinessProfile: import.meta.env?.VITE_GOOGLE_BUSINESS_PROFILE_URL || "",
  },
};

/** Every configured social/profile URL, for schema.org `sameAs`. Never invents an entry. */
export function getSocialLinks() {
  return Object.values(company.social).filter(Boolean);
}

/** Full postal address as a single display string, only using confirmed fields. */
export function formatAddress() {
  const { street, locality, region, postalCode, country } = company.address;
  const parts = [street, locality, region, postalCode].filter(Boolean);
  return parts.length > 1 ? parts.join(", ") : `${locality}, ${region}, ${country}`;
}
