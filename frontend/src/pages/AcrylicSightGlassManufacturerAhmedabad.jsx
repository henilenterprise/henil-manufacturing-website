import MainLayout from "../layouts/MainLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./AcrylicSightGlassManufacturerAhmedabad.css";

const sightGlassTypes = [
  {
    number: "01",
    title: "Acrylic Sight Glass",
    text: "Clear acrylic viewing components fabricated for visual observation of tanks, equipment and enclosed processes.",
  },
  {
    number: "02",
    title: "Tank Viewing Windows",
    text: "Transparent viewing sections designed to provide visibility into tanks and fabricated equipment.",
  },
  {
    number: "03",
    title: "Process Viewing Components",
    text: "Custom acrylic components for applications where visual monitoring of a process or enclosure is required.",
  },
  {
    number: "04",
    title: "Equipment Viewing Panels",
    text: "Clear fabricated panels designed to provide visibility while remaining integrated into equipment assemblies.",
  },
  {
    number: "05",
    title: "Custom Sight Glass Components",
    text: "Non-standard shapes, profiles, holes and dimensions manufactured according to your drawing.",
  },
  {
    number: "06",
    title: "Replacement Viewing Components",
    text: "Custom fabricated replacement components based on an existing sample, dimensions or drawing.",
  },
];

const applications = [
  "Tank level viewing",
  "Process monitoring",
  "Equipment inspection",
  "Machine housings",
  "Industrial enclosures",
  "Laboratory equipment",
  "Fabricated tanks",
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
    text: "Accurate cutting of acrylic sheet to the required dimensions and component geometry.",
  },
  {
    title: "CNC Routing",
    text: "Precision routing for profiles, holes, slots and custom machining requirements.",
  },
  {
    title: "Drilling & Machining",
    text: "Custom holes and machined features produced according to drawings and specifications.",
  },
  {
    title: "Acrylic Bending",
    text: "Controlled forming for viewing components requiring custom bends or shaped sections.",
  },
  {
    title: "Bonding",
    text: "Fabrication and joining of acrylic components into custom viewing assemblies.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Share Drawing or Sample",
    text: "Send your existing component, drawing, dimensions, photograph or application details.",
  },
  {
    number: "02",
    title: "Requirement Review",
    text: "We review dimensions, geometry, openings and the intended installation or application.",
  },
  {
    number: "03",
    title: "Fabrication",
    text: "The acrylic component is cut, machined, formed and fabricated according to the requirement.",
  },
  {
    number: "04",
    title: "Quality Check",
    text: "The finished component is checked for dimensions, fabrication and overall finish before dispatch.",
  },
];

const faqs = [
  {
    question: "What is an acrylic sight glass used for?",
    answer:
      "Acrylic sight glass components can be used where visual observation of tanks, equipment or enclosed processes is required.",
  },
  {
    question: "Can Henil Enterprise manufacture custom acrylic sight glasses?",
    answer:
      "Yes. Custom sight glass components can be fabricated according to drawings, dimensions, samples and application requirements.",
  },
  {
    question: "Can the sight glass include holes or custom profiles?",
    answer:
      "Yes. Holes, slots, profiles and other machined features can be incorporated according to the required design.",
  },
  {
    question: "Can I send an existing sight glass as a sample?",
    answer:
      "Yes. An existing component or sample can be useful for determining dimensions and fabrication requirements.",
  },
  {
    question: "Why choose acrylic for a viewing component?",
    answer:
      "Acrylic is commonly selected for applications where transparency and visual inspection are important.",
  },
  {
    question: "Do you manufacture other viewing products?",
    answer:
      "Yes. Henil Enterprise also manufactures acrylic inspection windows, machine guards, tanks, covers and custom fabricated components.",
  },
];

export default function AcrylicSightGlassManufacturerAhmedabad() {
  useSeo(SEO.acrylicSightGlassManufacturerAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      {
        name: "Acrylic Sight Glass Manufacturer Ahmedabad",
        path: "/acrylic-sight-glass-manufacturer-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="acrylic-sight-glass-page">
        {/* HERO */}
        <section className="acrylic-sight-glass-hero">
          <div className="container acrylic-sight-glass-hero__inner">
            <span className="acrylic-sight-glass-eyebrow">
              Custom Acrylic Viewing Components
            </span>

            <h1>
              Acrylic Sight Glass Manufacturer in <em>Ahmedabad.</em>
            </h1>

            <p className="acrylic-sight-glass-hero__lead">
              Custom acrylic sight glass components fabricated in Ahmedabad for
              tanks, equipment, machinery and process-monitoring applications —
              manufactured according to your drawings, dimensions and
              requirements.
            </p>

            <div className="acrylic-sight-glass-hero__actions">
              <a
                href="/quote?product=process-sight-glass"
                className="btn-primary"
              >
                Request a Quote
              </a>

              <a
                href="/products/process-sight-glass"
                className="btn-secondary"
              >
                View Sight Glass Product
              </a>
            </div>

            <div className="acrylic-sight-glass-hero__trust">
              <span>Custom Dimensions</span>
              <span>Drawing & Sample Based</span>
              <span>B2B Quantity Orders</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="acrylic-sight-glass-intro">
          <div className="container acrylic-sight-glass-intro__grid">
            <div>
              <span className="section-eyebrow">Custom Fabrication</span>

              <h2>
                Clear viewing components built for
                <em> your application.</em>
              </h2>
            </div>

            <div>
              <p>
                Henil Enterprise manufactures custom acrylic sight glass
                components for applications where visual monitoring of tanks,
                equipment or enclosed processes is required.
              </p>

              <p>
                Components can be manufactured from technical drawings,
                dimensions, samples or photographs, with custom holes,
                profiles and other machined features where required.
              </p>

              <p>
                Our capabilities include acrylic cutting, CNC routing,
                machining, bending, bonding and complete custom fabrication.
              </p>
            </div>
          </div>
        </section>

        {/* TYPES */}
        <section className="acrylic-sight-glass-types">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Viewing Components</span>

              <h2>
                Acrylic sight glass solutions for
                <em> different applications.</em>
              </h2>

              <p>
                We fabricate custom viewing components according to the
                required geometry, dimensions and application.
              </p>
            </div>

            <div className="acrylic-sight-glass-types__grid">
              {sightGlassTypes.map((item) => (
                <article className="sight-glass-card" key={item.number}>
                  <span className="sight-glass-card__number">
                    {item.number}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="acrylic-sight-glass-applications">
          <div className="container acrylic-sight-glass-applications__grid">
            <div>
              <span className="section-eyebrow">Applications</span>

              <h2>
                Designed for
                <em> visual monitoring.</em>
              </h2>

              <p>
                Acrylic viewing components can be fabricated for tanks,
                equipment and machinery where clear visual access is required.
              </p>

              <a href="/products" className="text-link">
                Explore All Products →
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
        <section className="acrylic-sight-glass-capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Manufacturing Capabilities
              </span>

              <h2>
                Precision machining for
                <em> custom viewing components.</em>
              </h2>

              <p>
                Our fabrication capabilities allow viewing components to be
                produced with custom dimensions, profiles and machined
                features.
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

        {/* CUSTOMISATION */}
        <section className="acrylic-sight-glass-custom">
          <div className="container acrylic-sight-glass-custom__grid">
            <div className="custom-panel custom-panel--main">
              <span className="section-eyebrow">Customisation</span>

              <h2>
                Not a standard size?
                <em> That's the point.</em>
              </h2>

              <p>
                Custom sight glass components can be manufactured around the
                actual dimensions and installation requirements of your
                equipment.
              </p>

              <ul>
                <li>Custom length and width</li>
                <li>Custom thickness requirements</li>
                <li>Custom holes and openings</li>
                <li>Profiles and machined edges</li>
                <li>Drawing or sample based fabrication</li>
                <li>Prototype and quantity production</li>
              </ul>
            </div>

            <div className="custom-panel custom-panel--side">
              <span className="section-eyebrow">Related Product</span>

              <h3>
                Need a complete inspection solution?
              </h3>

              <p>
                Explore custom acrylic and polycarbonate inspection windows
                for machinery and equipment.
              </p>

              <a
                href="/acrylic-inspection-window-manufacturer-ahmedabad"
              >
                Explore Inspection Windows →
              </a>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="acrylic-sight-glass-industries">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Industries</span>

              <h2>
                Fabricated for
                <em> industrial applications.</em>
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
        <section className="acrylic-sight-glass-process">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Our Process</span>

              <h2>
                From sample or drawing to
                <em> finished component.</em>
              </h2>

              <p>
                Share your existing component, drawing or dimensions and we
                can review the fabrication requirement.
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
        <section className="acrylic-sight-glass-faq">
          <div className="container acrylic-sight-glass-faq__grid">
            <div>
              <span className="section-eyebrow">FAQ</span>

              <h2>
                Sight glass
                <em> questions.</em>
              </h2>

              <p>
                Have an existing sight glass or viewing component that needs to
                be fabricated? Send the drawing, sample or dimensions for
                review.
              </p>

              <a
                href="/quote?product=process-sight-glass"
                className="btn-primary"
              >
                Get a Sight Glass Quote
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
        <section className="acrylic-sight-glass-related">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Related Solutions</span>

              <h2>
                More acrylic
                <em> fabrication.</em>
              </h2>
            </div>

            <div className="related-grid">
              <a
                href="/acrylic-tank-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>01</span>

                <h3>Acrylic Tanks</h3>

                <p>
                  Custom transparent acrylic tanks fabricated to your
                  dimensions and configuration.
                </p>

                <strong>Explore →</strong>
              </a>

              <a
                href="/acrylic-machine-guard-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>02</span>

                <h3>Acrylic Machine Guards</h3>

                <p>
                  Transparent machine guards and protective covers fabricated
                  for industrial equipment.
                </p>

                <strong>Explore →</strong>
              </a>

              <a
                href="/acrylic-box-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>03</span>

                <h3>Acrylic Boxes</h3>

                <p>
                  Custom acrylic storage boxes, covers and fabricated
                  enclosures.
                </p>

                <strong>Explore →</strong>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="acrylic-sight-glass-cta">
          <div className="container">
            <span className="section-eyebrow">
              Have a Viewing Component Requirement?
            </span>

            <h2>
              Send your drawing.
              <br />
              <em>We'll review the requirement.</em>
            </h2>

            <p>
              Share your sight glass dimensions, drawing, sample or application
              details with Henil Enterprise for a custom quotation.
            </p>

            <a
              href="/quote?product=process-sight-glass"
              className="btn-primary"
            >
              Request Sight Glass Quote
            </a>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}