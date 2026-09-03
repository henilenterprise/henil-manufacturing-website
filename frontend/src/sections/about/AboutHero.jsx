import Logo from "../../components/Logo.jsx";
import GlassPanel from "../../components/ui/GlassPanel.jsx";
import "./AboutHero.css";

const PLACEHOLDER_FACTS = [
  { label: "Founded", value: "Add founding year" },
  { label: "Team Size", value: "Add team size" },
  { label: "Certifications", value: "Add certifications, if any" },
];

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="container about-hero__inner">
        <div className="about-hero__copy">
          <span className="eyebrow">About Henil Enterprise</span>
          <h1 className="about-hero__title">
            Acrylic &amp; polycarbonate fabrication, <em>built around your drawing.</em>
          </h1>
          <p className="about-hero__sub">
            Henil Enterprise is a business-to-business acrylic and polycarbonate manufacturer
            and fabricator based in Ahmedabad, Gujarat — building custom components at
            quantity, to your specification rather than from a fixed catalogue.
          </p>
        </div>

        <GlassPanel className="about-hero__panel">
          <div className="about-hero__panel-brand">
            <Logo variant="mark" size={40} />
            <span className="about-hero__panel-location">Ahmedabad, Gujarat, India</span>
          </div>

          <dl className="about-hero__facts">
            {PLACEHOLDER_FACTS.map((fact) => (
              <div key={fact.label} className="about-hero__fact">
                <dt>{fact.label}</dt>
                <dd className="about-hero__fact-placeholder">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="about-hero__panel-note">
            Shown as placeholders until confirmed — nothing here is invented.
          </p>
        </GlassPanel>
      </div>
    </section>
  );
}
