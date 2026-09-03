import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Copy, ArrowLeft, ArrowRight, Home as HomeIcon } from "lucide-react";
import MainLayout from "../layouts/MainLayout.jsx";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import Button from "../components/ui/Button.jsx";
import QuoteProgress from "../components/QuoteProgress.jsx";
import StepCompany from "../sections/quote/StepCompany.jsx";
import StepRequirement from "../sections/quote/StepRequirement.jsx";
import StepDimensions from "../sections/quote/StepDimensions.jsx";
import StepFile from "../sections/quote/StepFile.jsx";
import StepDelivery from "../sections/quote/StepDelivery.jsx";
import StepMessage from "../sections/quote/StepMessage.jsx";
import StepReview from "../sections/quote/StepReview.jsx";
import { QUOTE_STEPS, emptyQuoteFormState } from "../data/quoteForm.data.js";
import { submitInquiry } from "../services/inquiryService.js";
import { useToast } from "../components/ui/index.js";
import { useSeo } from "../hooks/useSeo.js";
import { SEO } from "../config/seo.config.js";
import "./Quote.css";

export default function Quote() {
  useSeo(SEO.quote);

  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [formState, setFormState] = useState(emptyQuoteFormState());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);
  const [referenceNumber, setReferenceNumber] = useState("");

  // Automatic prefill from a product page's "Get a Quote" link.
  useEffect(() => {
    const productId = searchParams.get("productId");
    const product = searchParams.get("product");
    const productUrl = searchParams.get("productUrl");
    if (productId || product) {
      setFormState((prev) => ({
        ...prev,
        requirement: {
          ...prev.requirement,
          product: product || prev.requirement.product,
          productId: productId || prev.requirement.productId,
          productUrl: productUrl || prev.requirement.productUrl,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSection = (section) => (value) => {
    setFormState((prev) => ({ ...prev, [section]: value }));
  };

  const goToStep = (index) => {
    setCurrentIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isCurrentStepValid = () => {
    if (currentIndex === 0) {
      const { companyName, contactPerson, email, phone } = formState.company;
      if (![companyName, contactPerson, email, phone].every((v) => v.trim() !== "")) return false;
      // Matches the backend's own email regex exactly (see
      // validateInquiryPayload in backend/src/services/inquiry.service.js)
      // — catching an obviously malformed email here, before the review
      // step, means the person fixing it sees the problem right next to
      // the field they're looking at, rather than only finding out after
      // clicking submit on the very last step. The server remains the
      // real enforcement boundary either way; this is purely about
      // surfacing the same rule earlier, not replacing it.
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }
    if (currentIndex === 1) {
      const { product, quantity, material } = formState.requirement;
      if (![product, quantity, material].every((v) => String(v).trim() !== "")) return false;
      // Same reasoning as the email check above — mirrors the backend's
      // own quantity rule (must be a whole number greater than zero).
      const n = Number(quantity);
      return Number.isInteger(n) && n > 0;
    }
    return true;
  };

  const handleNext = () => {
    const next = Math.min(currentIndex + 1, QUOTE_STEPS.length - 1);
    setFurthestIndex((f) => Math.max(f, next));
    goToStep(next);
  };

  const handleBack = () => goToStep(Math.max(currentIndex - 1, 0));

  const handleSubmit = async () => {
    setStatus("loading");
    setErrorMessage("");
    setFieldErrors([]);
    try {
      const result = await submitInquiry(formState);
      setReferenceNumber(result.referenceNumber);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      // The backend returns a specific reason per invalid field (see
      // validateInquiryPayload in backend/src/services/inquiry.service.js)
      // — err.fieldErrors was already being captured here before this
      // fix, just never read by anything downstream, so a person hitting
      // a server-side validation failure (e.g. an email format issue that
      // slipped past the step-by-step client checks) saw only the
      // generic "Missing or invalid fields." with no way to tell which
      // field, or why. Passed through to StepReview now so the actual
      // reasons are visible, not just an admission that something's wrong.
      setFieldErrors(err.fieldErrors || []);
      showToast("Submission failed — see details on the review step.", { tone: "error" });
    }
  };

  if (status === "success") {
    return (
      <MainLayout>
        <div className="container quote-page">
          <QuoteSuccess referenceNumber={referenceNumber} />
        </div>
      </MainLayout>
    );
  }

  const stepProps = {
    company: { data: formState.company, onChange: updateSection("company") },
    requirement: { data: formState.requirement, onChange: updateSection("requirement") },
    dimensions: { data: formState.dimensions, onChange: updateSection("dimensions") },
    file: { files: formState.files, onFilesChange: updateSection("files") },
    delivery: { data: formState.delivery, onChange: updateSection("delivery") },
    message: { data: formState.message, onChange: updateSection("message") },
  };

  return (
    <MainLayout>
      <div className="container quote-page">
        <div className="quote-page__head">
          <span className="eyebrow">Request for Quote</span>
          <h1 className="quote-page__title">Get a Quote</h1>
        </div>

        <QuoteProgress currentIndex={currentIndex} furthestIndex={furthestIndex} onStepClick={goToStep} />

        <GlassPanel className="quote-page__panel">
          {currentIndex === 0 && <StepCompany {...stepProps.company} />}
          {currentIndex === 1 && <StepRequirement {...stepProps.requirement} />}
          {currentIndex === 2 && <StepDimensions {...stepProps.dimensions} />}
          {currentIndex === 3 && <StepFile {...stepProps.file} />}
          {currentIndex === 4 && <StepDelivery {...stepProps.delivery} />}
          {currentIndex === 5 && <StepMessage {...stepProps.message} />}
          {currentIndex === 6 && (
            <StepReview
              formState={formState}
              status={status}
              errorMessage={errorMessage}
              fieldErrors={fieldErrors}
              onSubmit={handleSubmit}
            />
          )}

          {currentIndex < QUOTE_STEPS.length - 1 && (
            <div className="quote-page__nav-wrap">
              <div className="quote-page__nav">
                <Button
                  variant="ghost"
                  size="md"
                  icon={ArrowLeft}
                  iconPosition="left"
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                >
                  Back
                </Button>
                <Button
                  variant="solid"
                  size="md"
                  icon={ArrowRight}
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                >
                  Next
                </Button>
              </div>
              {!isCurrentStepValid() && (
                <p className="quote-page__nav-hint">Check the fields marked * — make sure they're filled in correctly to continue.</p>
              )}
            </div>
          )}

          {currentIndex === QUOTE_STEPS.length - 1 && (
            <div className="quote-page__nav quote-page__nav--review">
              <Button variant="ghost" size="md" icon={ArrowLeft} iconPosition="left" onClick={handleBack}>
                Back
              </Button>
            </div>
          )}
        </GlassPanel>
      </div>
    </MainLayout>
  );
}

function QuoteSuccess({ referenceNumber }) {
  const [copied, setCopied] = useState(false);

  const copyReference = () => {
    navigator.clipboard?.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassPanel className="quote-success">
      <span className="quote-success__icon">
        <CheckCircle2 size={40} strokeWidth={1.5} />
      </span>
      <h1 className="quote-success__title">Inquiry received</h1>
      <p className="quote-success__body">
        Thank you — we've received your request and will follow up shortly.
      </p>

      <div className="quote-success__reference">
        <span className="quote-success__reference-label">Your inquiry reference</span>
        <div className="quote-success__reference-row">
          <span className="quote-success__reference-number">{referenceNumber}</span>
          <button className="quote-success__copy" onClick={copyReference} aria-label="Copy reference number">
            <Copy size={16} />
          </button>
        </div>
        {copied && <span className="quote-success__copied">Copied</span>}
      </div>

      <p className="quote-success__note">
        Save this reference number — quote it in any follow-up communication.
      </p>

      <Button href="/" variant="solid" icon={HomeIcon} iconPosition="left">
        Back to Home
      </Button>
    </GlassPanel>
  );
}
