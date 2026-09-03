import { ArrowRight } from "lucide-react";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import Button from "../components/ui/Button.jsx";
import "./FinalCtaSection.css";

export default function FinalCtaSection() {
  return (
    <section className="section final-cta">
      <div className="container">
        <GlassPanel className="final-cta__panel">
          <h2 className="final-cta__title">Have a Requirement?</h2>
          <p className="final-cta__body">
            Send your drawing, dimensions, or specification — we'll come back with a quote.
          </p>
          <Button href="/quote" variant="solid" size="lg" icon={ArrowRight}>
            Get a Quote
          </Button>
        </GlassPanel>
      </div>
    </section>
  );
}
