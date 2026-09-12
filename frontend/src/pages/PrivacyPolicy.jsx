import LegalPageLayout from "../components/LegalPageLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import { company } from "../config/company.config.js";
import { trackEvent } from "../utils/analytics.js";

// Whether Google Analytics is actually active on this deployment —
// read directly, the same way useAnalytics.js itself does, so this
// page can only describe analytics as active when it genuinely is.
const GA_ENABLED = Boolean(import.meta.env?.VITE_GA_MEASUREMENT_ID);

export default function PrivacyPolicy() {
  useSeo(SEO.privacyPolicy);
  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ])
  );

  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="September 2026">
      <p>
        This page explains what information {company.name} collects through this website, how it is
        used, and who it may be shared with. This policy covers this website only — it does not
        describe any offline processes.
      </p>

      <h2>Information you provide to us</h2>
      <p>
        When you submit a Request for Quotation (RFQ) or use the contact form on this website, you may
        provide information such as your name, company name, email address, phone number, WhatsApp
        number, city, country, the product or service you are enquiring about, dimensions, quantities,
        application details, additional requirements, and any drawings, specifications, or reference
        files you choose to upload.
      </p>
      <p>We use this information only to:</p>
      <ul>
        <li>Review your inquiry and respond with information or a quotation;</li>
        <li>Contact you by email, phone, or WhatsApp about your inquiry;</li>
        <li>Keep a record of the inquiry for our own internal business purposes.</li>
      </ul>
      <p>
        We do not sell your information, and we do not share it with third parties for their own
        marketing purposes.
      </p>

      <h2>Files you upload</h2>
      <p>
        Drawings and files you upload as part of an RFQ are stored securely and used only to review and
        respond to that inquiry. Access to uploaded files is restricted to our team.
      </p>

      <h2>Service providers we use</h2>
      <p>
        We use third-party service providers to operate this website and process inquiries, including a
        database and file storage provider to store inquiry details and uploaded files, and a
        transactional email provider to send inquiry confirmations and internal notifications. These
        providers process information as part of delivering their service to us; we have not
        independently reviewed or made representations about their own data-handling terms, and we
        encourage you to review their respective privacy policies if you'd like more detail.
      </p>

      <h2>Analytics and cookies</h2>
      <p>
        {GA_ENABLED
          ? "This website uses Google Analytics to understand how visitors use the site. Google Analytics may set cookies in your browser to do this. See our Cookie Policy for details."
          : "At this time, this website does not have analytics cookies active. If that changes, this section and our Cookie Policy will be updated to reflect it."}
      </p>

      <h2>How long we keep information</h2>
      <p>
        We retain inquiry information for as long as reasonably necessary to respond to your inquiry and
        for our own legitimate business record-keeping. We have not set a fixed automatic deletion
        schedule at this time.
      </p>

      <h2>Your choices</h2>
      <p>
        You can contact us at any time to ask what information we hold about you, to correct it, or to
        request that we delete it, using the details below. We will respond to reasonable requests
        within a reasonable time.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The "last updated" date at the top of this page
        reflects the most recent change.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy can be sent to{" "}
        {company.email ? (
          <a
            href={`mailto:${company.email}`}
            onClick={() =>
              trackEvent("email_click", {
                cta_location: "privacy_policy_page",
                cta_label: company.email,
              })
            }
          >
            {company.email}
          </a>
        ) : (
          "our contact email"
        )}
        {company.phone ? <> or by phone at {company.phone}</> : null}.
      </p>
    </LegalPageLayout>
  );
}
