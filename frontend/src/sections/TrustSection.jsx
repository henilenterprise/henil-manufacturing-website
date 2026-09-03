import { Ruler, RefreshCw, ShieldCheck, Package, Wrench } from "lucide-react";
import GlassCard from "../components/ui/GlassCard.jsx";
import TestimonialCarousel from "../components/TestimonialCarousel.jsx";
import { COMMITMENTS } from "../data/commitments.data.js";
import { TESTIMONIALS } from "../data/testimonials.data.js";
import { WHY_HENIL } from "../config/site.config.js";
import { INDUSTRIES_DETAIL } from "../data/industries.data.js";
import "./TrustSection.css";

const ICONS = { Ruler, RefreshCw, ShieldCheck, Package, Wrench };

// Cross-referencing real, already-vetted data rather than writing new,
// independent trust claims that could drift out of sync with what
// /about and the homepage's "Why Henil" section already say.
const qualityCommitment = COMMITMENTS.find((c) => c.id === "consistency");
const repeatOrderCapability = WHY_HENIL.find((w) => w.id === "quantity-orders");
const customManufacturing = WHY_HENIL.find((w) => w.id === "custom-fabrication");
const industriesPreview = INDUSTRIES_DETAIL.slice(0, 5);

export default function TrustSection() {
  return (
    <section className="section trust-section">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Why Businesses Work With Us</span>
          <h2 className="section__title">Built to be trusted with a repeat order</h2>
        </div>

        <div className="trust-section__pillars">
          <TrustPillar
            icon={ShieldCheck}
            label="Quality Commitment"
            title={qualityCommitment.title}
            body={qualityCommitment.description}
          />
          <TrustPillar
            icon={RefreshCw}
            label="Repeat-Order Capability"
            title={repeatOrderCapability.title}
            body={repeatOrderCapability.description}
          />
          <TrustPillar
            icon={Wrench}
            label="Custom Manufacturing"
            title={customManufacturing.title}
            body={customManufacturing.description}
          />
          <TrustPillar
            icon={Package}
            label="Industries Served"
            title="Across manufacturing and industrial sectors"
            body={
              <>
                {industriesPreview.map((i) => i.label).join(", ")}, and more.{" "}
                <a href="/industries" className="trust-section__pillar-link">
                  See all industries
                </a>
              </>
            }
          />
        </div>

        <div className="trust-section__testimonials">
          <div className="trust-section__testimonials-head">
            <span className="eyebrow">Customer Testimonials</span>
            <h3 className="trust-section__testimonials-title">What businesses say</h3>
            <p className="trust-section__placeholder-note">
              Sample testimonials shown below — real customer feedback will replace these.
            </p>
          </div>

          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </div>
    </section>
  );
}

function TrustPillar({ icon: Icon, label, title, body }) {
  return (
    <GlassCard className="trust-section__pillar">
      <span className="trust-section__pillar-icon">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <span className="trust-section__pillar-label">{label}</span>
      <h3 className="trust-section__pillar-title">{title}</h3>
      <p className="trust-section__pillar-body">{body}</p>
    </GlassCard>
  );
}
