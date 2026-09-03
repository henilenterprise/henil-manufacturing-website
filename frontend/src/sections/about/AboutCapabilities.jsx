import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import CapabilityStrip from "../CapabilityStrip.jsx";
import "./AboutCapabilities.css";

/**
 * CapabilityStrip renders its own full-bleed <section> (background,
 * top/bottom borders) — designed to sit as its own top-level band
 * between sections, exactly as it does on the homepage. It's kept as a
 * true sibling here, not nested inside another <section>, so that
 * full-bleed treatment isn't broken and padding doesn't double up.
 */
export default function AboutCapabilities() {
  return (
    <>
      <section className="about-capabilities__head">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Our Capabilities</span>
            <h2 className="section__title">Cutting, forming, and assembly under one roof</h2>
          </div>
        </div>
      </section>

      <CapabilityStrip />

      <section className="about-capabilities__foot-section">
        <div className="container about-capabilities__foot">
          <Button href="/capabilities" variant="ghost" size="md" icon={ArrowRight}>
            Explore capabilities in detail
          </Button>
        </div>
      </section>
    </>
  );
}
