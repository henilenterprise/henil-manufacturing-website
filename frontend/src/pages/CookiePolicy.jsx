import LegalPageLayout from "../components/LegalPageLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import { company } from "../config/company.config.js";
import { trackEvent } from "../utils/analytics.js";

// Same live check useAnalytics.js and PrivacyPolicy.jsx use — this page
// must never claim analytics cookies are active when they aren't, or
// vice versa, on whichever deployment it's actually viewed on.
const GA_ENABLED = Boolean(import.meta.env?.VITE_GA_MEASUREMENT_ID);

export default function CookiePolicy() {
  useSeo(SEO.cookiePolicy);
  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Cookie Policy", path: "/cookie-policy" },
    ])
  );

  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="September 2026">
      <p>
        This page explains how {company.name} uses cookies on this website. Cookies are small text
        files stored in your browser.
      </p>

      <h2>Cookies this website sets itself</h2>
      <p>
        This website does not set any cookies of its own for tracking, session management, or
        preferences. Submitting the RFQ form or contact form does not set a cookie.
      </p>

      <h2>Analytics cookies</h2>
      <p>
        {GA_ENABLED ? (
          <>
            This website currently uses Google Analytics to understand how visitors use the site — for
            example, which pages are viewed and how visitors navigate between them. Google Analytics may
            set cookies (such as those starting with <code>_ga</code>) in your browser to do this.
            Google's own privacy policy explains how Google Analytics handles data.
          </>
        ) : (
          "Analytics cookies are not currently active on this website. If that changes, this page will be updated to describe exactly what is used."
        )}
      </p>

      <h2>Controlling cookies</h2>
      <p>
        Most browsers let you view, block, or delete cookies through their settings. You can also use
        your browser's "do not track" or private/incognito browsing mode. Blocking analytics cookies
        will not affect your ability to browse this website, request a quote, or contact us.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy if the cookies used on this website change. The "last updated" date
        at the top of this page reflects the most recent change.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy can be sent to{" "}
        {company.email ? (
          <a
            href={`mailto:${company.email}`}
            onClick={() =>
              trackEvent("email_click", {
                cta_location: "cookie_policy_page",
                cta_label: company.email,
              })
            }
          >
            {company.email}
          </a>
        ) : (
          "our contact email"
        )}.
      </p>
    </LegalPageLayout>
  );
}
