import { CAPABILITIES } from "../config/site.config.js";
import { company, getSocialLinks } from "../config/company.config.js";
import { localBusiness } from "../config/localBusiness.config.js";

function origin() {
  if (company.website) return company.website.replace(/\/$/, "");
  return typeof window !== "undefined" ? window.location.origin : "";
}

function contactPoint() {
  if (!company.phone && !company.email) return undefined;
  return {
    "@type": "ContactPoint",
    contactType: "customer service",
    ...(company.phone && { telephone: company.phone }),
    ...(company.email && { email: company.email }),
    areaServed: "IN",
  };
}

/**
 * Sitewide Organization structured data — mounted once in App.jsx.
 * This is the entity-level description (who the business is, its
 * logo, its official profile links) as distinct from LocalBusiness
 * below, which is specifically about the physical location. Google's
 * own guidance treats these as separate, valid types that can coexist;
 * splitting them (rather than the single merged array type used
 * earlier) lets each carry only the fields that are actually true of
 * that type.
 */
export function buildOrganizationStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    description: company.description,
    ...(origin() && { url: origin(), logo: `${origin()}${company.logoPath}` }),
  };

  const contact = contactPoint();
  if (contact) data.contactPoint = [contact];

  const sameAs = getSocialLinks();
  if (sameAs.length) data.sameAs = sameAs;

  return data;
}

/**
 * LocalBusiness structured data — mounted only "where appropriate"
 * (Home and Contact, per the brief), not on every single page. A blog
 * post or FAQ page doesn't need the business address repeated in its
 * structured data; Home and Contact are where a searcher or a map
 * result actually needs the location. Every optional field is only
 * included when a real value exists — see company.config.js and
 * localBusiness.config.js for why nothing here is invented.
 */
export function buildLocalBusinessStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    ...(origin() && { url: origin(), image: `${origin()}${company.logoPath}` }),
    address: {
      "@type": "PostalAddress",
      addressLocality: localBusiness.city,
      addressRegion: localBusiness.state,
      addressCountry: localBusiness.countryCode,
      ...(localBusiness.streetAddress && { streetAddress: localBusiness.streetAddress }),
      ...(localBusiness.postalCode && { postalCode: localBusiness.postalCode }),
    },
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: CAPABILITIES.map((c) => c.label),
  };

  if (company.phone) data.telephone = company.phone;
  if (company.email) data.email = company.email;
  if (localBusiness.latitude && localBusiness.longitude) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: localBusiness.latitude,
      longitude: localBusiness.longitude,
    };
  }

  const sameAs = getSocialLinks();
  if (sameAs.length) data.sameAs = sameAs;

  return data;
}

/**
 * BreadcrumbList for any page below the top level. `items` is an
 * ordered array of { name, path }, always starting with Home — matches
 * the visible breadcrumb trails already used on ProductDetail and
 * BlogPost so the structured data reflects what's actually on the page.
 */
export function buildBreadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin()}${item.path}`,
    })),
  };
}

/**
 * Product structured data for /products/:slug. Deliberately omits
 * `offers`/price — this is a B2B custom-fabrication business where
 * every order is quoted individually, so a fixed price would be
 * fabricated data, not a real offer. Product markup without pricing
 * still helps Google understand what the page is about; it just won't
 * be eligible for merchant/price-comparison rich results, which is the
 * honest outcome given there's genuinely no fixed price to show.
 */
export function buildProductStructuredData(product, category) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category: category?.label,
    material: product.materials?.join(", "),
    brand: {
      "@type": "Organization",
      name: company.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: company.name,
      url: origin(),
    },
    sku: product.id,
    url: `${origin()}/products/${product.id}`,
  };
}