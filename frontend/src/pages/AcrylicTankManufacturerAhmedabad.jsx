import MainLayout from "../layouts/MainLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./AcrylicTankManufacturerAhmedabad.css";

const tankTypes = [
  {
    title: "Custom Acrylic Tanks",
    text: "Acrylic tanks fabricated according to your required length, width, height, capacity and configuration.",
  },
  {
    title: "Transparent Process Tanks",
    text: "Clear fabricated tanks that allow visual observation of contents, levels and internal processes.",
  },
  {
    title: "Laboratory Acrylic Tanks",
    text: "Custom acrylic tanks produced for laboratory, testing and controlled-use applications.",
  },
  {
    title: "Display & Demonstration Tanks",
    text: "Transparent tanks designed for applications where visibility of the contents is important.",
  },
  {
    title: "Equipment Tanks",
    text: "Fabricated tanks designed to integrate with machinery, equipment and larger assemblies.",
  },
  {
    title: "Special-Shape Acrylic Tanks",
    text: "Non-standard shapes, openings, partitions and configurations manufactured from your drawing.",
  },
];

const applications = [
  "Process fluid containment",
  "Laboratory applications",
  "Equipment integration",
  "Visual process monitoring",
  "Testing applications",
  "Demonstration systems",
  "Industrial equipment",
  "Custom machinery",
];

const industries = [
  "Pharmaceutical",
  "Chemical",
  "Engineering",
  "Machinery & Manufacturing",
  "Food Processing",
  "Packaging",
  "Industrial Equipment",
  "Laboratory & Testing",
];

const capabilities = [
  {
    title: "Acrylic Cutting",
    text: "Accurate cutting of acrylic sheets according to required tank dimensions and component sizes.",
  },
  {
    title: "CNC Routing",
    text: "Precision routing for openings, profiles, holes, slots and custom tank components.",
  },
  {
    title: "Acrylic Bending",
    text: "Controlled forming for applications requiring bent or shaped acrylic components.",
  },
  {
    title: "Bonding",
    text: "Acrylic components assembled using suitable bonding techniques for fabricated tank construction.",
  },
  {
    title: "Custom Fabrication",
    text: "Complete fabrication based on drawings, dimensions, samples or application requirements.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Send Your Requirement",
    text: "Share your drawing, dimensions, sample, photographs or basic tank requirements.",
  },
  {
    number: "02",
    title: "Design & Review",
    text: "We review the dimensions, configuration, openings, joints and intended application.",
  },
  {
    number: "03",
    title: "Fabrication",
    text: "Acrylic components are cut, machined, formed and assembled according to the requirement.",
  },
  {
    number: "04",
    title: "Quality Check",
    text: "The completed fabricated tank is checked for dimensions, assembly and finish before dispatch.",
  },
];

const faqs = [
  {
    question: "Can Henil Enterprise manufacture acrylic tanks to custom dimensions?",
    answer:
      "Yes. Custom acrylic tanks can be fabricated according to your required dimensions, configuration, openings and application requirements.",
  },
  {
    question: "Can I provide a drawing for an acrylic tank?",
    answer:
      "Yes. You can provide a technical drawing, dimensions, sample, photograph or specification for review and quotation.",
  },
  {
    question: "What is acrylic commonly used for in tank fabrication?",
    answer:
      "Acrylic is useful where transparency, visual inspection and a clean finished appearance are important.",
  },
  {
    question: "Can acrylic tanks include holes and fittings?",
    answer:
      "Custom fabrication can include required openings, holes, slots and other machined features according to the drawing or application.",
  },
  {
    question: "Do you manufacture acrylic tanks in quantity?",
    answer:
      "Yes. Henil Enterprise handles custom fabrication for prototypes as well as B2B quantity requirements, depending on the project.",
  },
  {
    question: "Do you manufacture other acrylic components?",
    answer:
      "Yes. Henil Enterprise also manufactures acrylic machine guards, boxes, inspection windows, sight glasses, covers and custom fabricated components.",
  },
];

export default function AcrylicTankManufacturerAhmedabad() {
  useSeo(SEO.acrylicTankManufacturerAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      {
        name: "Acrylic Tank Manufacturer Ahmedabad",
        path: "/acrylic-tank-manufacturer-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="acrylic-tank-page">
        {/* HERO */}
        <section className="acrylic-tank-hero">
          <div className="container acrylic-tank-hero__inner">
            <span className="acrylic-tank-eyebrow">
              Custom Acrylic Tank Fabrication
            </span>

            <h1>
              Acrylic Tank Manufacturer in <em>Ahmedabad.</em>
            </h1>

            <p className="acrylic-tank-hero__lead">
              Custom acrylic tanks fabricated in Ahmedabad for industrial,
              laboratory, equipment and process applications — manufactured
              according to your drawings, dimensions and configuration
              requirements.
            </p>

            <div className="acrylic-tank-hero__actions">
              <a href="/quote?product=custom-acrylic-tank" className="btn-primary">
                Request a Quote
              </a>

              <a href="/products/custom-acrylic-tank" className="btn-secondary">
                View Acrylic Tank Product
              </a>
            </div>

            <div className="acrylic-tank-hero__trust">
              <span>Custom Dimensions</span>
              <span>Drawing-Based Fabrication</span>
              <span>B2B Quantity Orders</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="acrylic-tank-intro">
          <div className="container acrylic-tank-intro__grid">
            <div>
              <span className="section-eyebrow">Custom Fabrication</span>

              <h2>
                Transparent acrylic tanks built around your
                <em> requirements.</em>
              </h2>
            </div>

            <div>
              <p>
                Henil Enterprise manufactures custom acrylic tanks for
                applications where transparency, visual inspection and
                fabricated construction are important.
              </p>

              <p>
                Tanks can be manufactured from your dimensions, engineering
                drawing, sample or application requirements, with custom
                openings, profiles and configurations where required.
              </p>

              <p>
                Our fabrication capabilities include acrylic cutting, CNC
                routing, bending, bonding and complete custom assembly for B2B
                requirements.
              </p>
            </div>
          </div>
        </section>

        {/* TANK TYPES */}
        <section className="acrylic-tank-types">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Tank Types</span>

              <h2>
                Acrylic tanks for <em>different applications.</em>
              </h2>

              <p>
                From straightforward transparent tanks to application-specific
                fabricated assemblies, we manufacture according to the
                required configuration.
              </p>
            </div>

            <div className="acrylic-tank-types__grid">
              {tankTypes.map((item, index) => (
                <article className="tank-card" key={item.title}>
                  <span className="tank-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="acrylic-tank-applications">
          <div className="container acrylic-tank-applications__grid">
            <div>
              <span className="section-eyebrow">Applications</span>

              <h2>
                Where custom acrylic tanks
                <em> can be used.</em>
              </h2>

              <p>
                Acrylic tanks can be fabricated for a wide range of industrial,
                equipment, laboratory and visual-monitoring requirements.
              </p>

              <a href="/acrylic-fabrication-ahmedabad" className="text-link">
                Explore Acrylic Fabrication →
              </a>
            </div>

            <div className="application-list">
              {applications.map((application) => (
                <div className="application-item" key={application}>
                  <span>+</span>
                  {application}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="acrylic-tank-capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Manufacturing Capabilities
              </span>

              <h2>
                From sheet to finished
                <em> fabricated tank.</em>
              </h2>

              <p>
                Our manufacturing process combines machining, forming and
                fabrication capabilities to produce custom acrylic assemblies.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability, index) => (
                <article className="capability-card" key={capability.title}>
                  <span className="capability-card__number">
                    0{index + 1}
                  </span>

                  <h3>{capability.title}</h3>

                  <p>{capability.text}</p>

                  <a href="/capabilities">Learn More →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MATERIAL */}
        <section className="acrylic-tank-material">
          <div className="container acrylic-tank-material__grid">
            <div className="material-panel material-panel--main">
              <span className="section-eyebrow">Material</span>

              <h2>
                Acrylic selected for
                <em> visibility.</em>
              </h2>

              <p>
                Acrylic is commonly selected for fabricated tanks when clear
                visibility of the contents or internal process is important.
              </p>

              <ul>
                <li>Transparent appearance</li>
                <li>Useful for visual inspection</li>
                <li>Suitable for custom fabricated shapes</li>
                <li>Can be machined and bonded</li>
                <li>Available for custom dimensions</li>
              </ul>
            </div>

            <div className="material-panel material-panel--link">
              <span className="section-eyebrow">Other Fabrication</span>

              <h3>Need a different acrylic component?</h3>

              <p>
                We also manufacture machine guards, boxes, inspection windows,
                sight glasses, covers and custom fabricated parts.
              </p>

              <a href="/products">Explore Products →</a>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="acrylic-tank-industries">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Industries</span>

              <h2>
                Fabrication for
                <em> industrial requirements.</em>
              </h2>
            </div>

            <div className="industry-grid">
              {industries.map((industry) => (
                <a
                  href="/industries"
                  className="industry-item"
                  key={industry}
                >
                  {industry}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="acrylic-tank-process">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Our Process</span>

              <h2>
                Simple process.
                <em> Custom result.</em>
              </h2>

              <p>
                Share your requirement and our team can review the fabrication
                details before quotation and production.
              </p>
            </div>

            <div className="process-grid">
              {processSteps.map((step) => (
                <article className="process-card" key={step.number}>
                  <span>{step.number}</span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="acrylic-tank-faq">
          <div className="container acrylic-tank-faq__grid">
            <div>
              <span className="section-eyebrow">FAQ</span>

              <h2>
                Acrylic tank
                <em> questions.</em>
              </h2>

              <p>
                Have a custom tank requirement? Send us your dimensions or
                drawing and we can review the fabrication requirement.
              </p>

              <a
                href="/quote?product=custom-acrylic-tank"
                className="btn-primary"
              >
                Get a Tank Quote
              </a>
            </div>

            <div className="faq-list">
              {faqs.map((faq) => (
                <details className="faq-item" key={faq.question}>
                  <summary>
                    {faq.question}
                    <span>+</span>
                  </summary>

                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="acrylic-tank-related">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Related Solutions</span>

              <h2>
                More custom acrylic
                <em> fabrication.</em>
              </h2>
            </div>

            <div className="related-grid">
              <a
                href="/acrylic-machine-guard-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>01</span>
                <h3>Acrylic Machine Guards</h3>
                <p>
                  Transparent custom guards and covers for industrial
                  machinery.
                </p>
                <strong>Explore →</strong>
              </a>

              <a
                href="/acrylic-sight-glass-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>02</span>
                <h3>Acrylic Sight Glass</h3>
                <p>
                  Fabricated viewing components for visual process monitoring.
                </p>
                <strong>Explore →</strong>
              </a>

              <a
                href="/acrylic-inspection-window-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>03</span>
                <h3>Acrylic Inspection Windows</h3>
                <p>
                  Clear viewing windows fabricated for machinery and equipment.
                </p>
                <strong>Explore →</strong>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="acrylic-tank-cta">
          <div className="container">
            <span className="section-eyebrow">Have a Tank Requirement?</span>

            <h2>
              Send your drawing.
              <br />
              <em>We'll review the requirement.</em>
            </h2>

            <p>
              Share your dimensions, drawing, sample or application details
              with Henil Enterprise for a custom acrylic tank quotation.
            </p>

            <a
              href="/quote?product=custom-acrylic-tank"
              className="btn-primary"
            >
              Request Acrylic Tank Quote
            </a>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}