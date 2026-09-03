import { ArrowRight } from "lucide-react";
import GlassPanel from "./ui/GlassPanel.jsx";
import Button from "./ui/Button.jsx";
import "./PagePlaceholder.css";

/**
 * Used for routes that exist and are reachable today, but whose full page
 * content is scoped for a later build phase. Keeps navigation honest —
 * every nav link goes somewhere real — without pretending the content is
 * finished.
 */
export default function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <div className="page-placeholder container">
      <GlassPanel eyebrow={eyebrow} title={title}>
        <p className="page-placeholder__body">{description}</p>
        <p className="page-placeholder__note">
          This page is reachable and routed correctly — full content is scoped for a later
          build phase.
        </p>
        <Button href="/quote" variant="solid" size="md" icon={ArrowRight}>
          Get a Quote in the meantime
        </Button>
      </GlassPanel>
    </div>
  );
}
