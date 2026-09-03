import { useState } from "react";
import { Download, ExternalLink, Eye, EyeOff, FileText } from "lucide-react";
import MainLayout from "../layouts/MainLayout.jsx";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import Button from "../components/ui/Button.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { Spinner } from "../components/ui/index.js";
import { BROCHURE_URL, BROCHURE_FILENAME } from "../config/brochure.config.js";
import { useBrochureAvailability } from "../hooks/useBrochureAvailability.js";
import { useSeo } from "../hooks/useSeo.js";
import { SEO } from "../config/seo.config.js";
import "./Brochure.css";

export default function Brochure() {
  useSeo(SEO.brochure);
  const status = useBrochureAvailability();
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <MainLayout>
      <div className="container brochure-page">
        <span className="eyebrow">Company Brochure</span>
        <h1 className="brochure-page__title">Henil Enterprise Brochure</h1>
        <p className="brochure-page__sub">
          Our capabilities, product range, and fabrication process in one document.
        </p>

        {status === "checking" && (
          <div className="brochure-page__checking">
            <Spinner label="Checking brochure availability…" />
          </div>
        )}

        {status === "unavailable" && (
          <EmptyState
            icon={FileText}
            title="Brochure coming soon"
            description="The downloadable brochure hasn't been uploaded yet. In the meantime, reach out directly and we'll be glad to help."
            action={
              <Button href="/quote" variant="ghost" size="sm">
                Get a Quote
              </Button>
            }
          />
        )}

        {status === "available" && (
          <>
            <div className="brochure-page__actions">
              <Button href={BROCHURE_URL} target="_blank" rel="noopener noreferrer" variant="solid" icon={ExternalLink}>
                Open Brochure
              </Button>
              <Button href={BROCHURE_URL} download={BROCHURE_FILENAME} variant="ghost" icon={Download}>
                Download Brochure
              </Button>
              <Button
                variant="ghost"
                icon={previewOpen ? EyeOff : Eye}
                onClick={() => setPreviewOpen((v) => !v)}
              >
                {previewOpen ? "Hide Preview" : "Preview Brochure"}
              </Button>
            </div>

            {previewOpen && (
              <GlassPanel className="brochure-page__preview" padding="sm">
                <iframe
                  src={BROCHURE_URL}
                  title="Henil Enterprise Brochure Preview"
                  className="brochure-page__frame"
                />
              </GlassPanel>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
