import LegalPageLayout from "../components/LegalPageLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import { company } from "../config/company.config.js";
import { trackEvent } from "../utils/analytics.js";

export default function Terms() {
  useSeo(SEO.terms);
  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Terms of Use", path: "/terms" },
    ])
  );

  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="September 2026">
      <p>
        These terms apply to your use of this website, operated by {company.name}. By using this
        website, you agree to these terms. If you do not agree, please do not use this website.
      </p>

      <h2>Website content</h2>
      <p>
        The content on this website — including text, images, and product/service descriptions — is
        provided for general information about {company.name}'s manufacturing and fabrication
        capabilities. We try to keep this information accurate, but specifications, capabilities, and
        availability can change, and any project-specific details should be confirmed with us directly
        before you rely on them.
      </p>

      <h2>Requests for Quotation (RFQs) and inquiries</h2>
      <p>
        Submitting an RFQ, drawing, or inquiry through this website is a request for information or
        pricing — it is not an order, and it does not create a binding agreement between you and{" "}
        {company.name}. Any actual order, quotation, pricing, delivery timeline, or specification is
        only confirmed once we have communicated it to you directly, separately from this website (for
        example, by email, phone, or a formal quotation document).
      </p>
      <p>
        We are not obligated to accept every inquiry or provide a quotation for every request, and we
        reserve the right to ask for further information, drawings, or clarification before responding.
      </p>

      <h2>File uploads</h2>
      <p>
        You are responsible for the accuracy and completeness of any drawing, specification, or file you
        upload. Please ensure you have the right to share any file you upload with us, and do not upload
        files containing information you are not authorized to disclose.
      </p>

      <h2>No warranty on website use</h2>
      <p>
        This website is provided "as is." While we aim to keep it available and accurate, we do not
        guarantee that it will be uninterrupted, error-free, or free of technical issues.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {company.name} is not liable for any indirect, incidental, or
        consequential loss arising from your use of this website. This does not affect any liability
        that cannot be excluded or limited under applicable law, and does not affect the separate terms
        of any actual order or contract we enter into with you outside of this website.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Content on this website belongs to {company.name} unless otherwise noted, and may not be
        reproduced for commercial purposes without our permission.
      </p>

      <h2>Governing law</h2>
      <p>This website and these terms are governed by the laws of India.</p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The "last updated" date at the top of this page
        reflects the most recent change.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these terms can be sent to{" "}
        {company.email ? (
          <a
            href={`mailto:${company.email}`}
            onClick={() =>
              trackEvent("email_click", {
                cta_location: "terms_page",
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
