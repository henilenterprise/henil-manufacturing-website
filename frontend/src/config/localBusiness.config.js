// Location-presentation details that are specifically about *how the
// business appears locally* — map embed, geo-coordinates, business
// hours — as opposed to the core identity fields (name, address,
// phone, email, social links), which live in company.config.js, the
// single canonical configuration area. Kept separate because these
// fields matter for the Contact page and LocalBusiness structured data
// specifically, not for Organization structured data or the nav/footer.
//
// Same rule as company.config.js: nothing here is invented. Geo
// coordinates and precise hours are genuinely unconfirmed and are left
// blank rather than guessed.

import { company, formatAddress } from "./company.config.js";

export const localBusiness = {
  // Re-exported for convenience so pages that only care about location
  // display don't need to import two config files.
  city: company.address.locality,
  state: company.address.region,
  country: company.address.country,
  countryCode: company.address.countryCode,
  streetAddress: company.address.street,
  postalCode: company.address.postalCode,

  latitude: import.meta.env?.VITE_GEO_LATITUDE || "",
  longitude: import.meta.env?.VITE_GEO_LONGITUDE || "",

  // Embeddable map. Defaults to a city-level Ahmedabad, Gujarat map
  // (no API key required) so the Contact page always has a real map
  // rather than a blank space — swap in a precise pinned-address embed
  // URL from Google Maps ("Share" → "Embed a map") once the exact
  // address is confirmed.
  mapEmbedUrl:
    import.meta.env?.VITE_GOOGLE_MAPS_EMBED_URL ||
    "https://www.google.com/maps?q=Ahmedabad,+Gujarat,+India&output=embed",

  // Business hours are not yet confirmed anywhere in this project's
  // brief, so no openingHours structured-data field is generated and
  // no specific hours are printed on the Contact page — only this
  // honest, non-committal line.
  hoursNote: import.meta.env?.VITE_BUSINESS_HOURS_NOTE || "Contact us to confirm current business hours.",
};

export { formatAddress };
