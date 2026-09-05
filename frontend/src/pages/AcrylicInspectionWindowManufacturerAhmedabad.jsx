import MainLayout from "../layouts/MainLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./AcrylicInspectionWindowManufacturerAhmedabad.css";

const windowTypes = [
  {
    number: "01",
    title: "Machine Inspection Windows",
    text: "Clear viewing windows fabricated for machine housings and enclosures, allowing operators to observe equipment without opening the enclosure.",
  },
  {
    number: "02",
    title: "Equipment Viewing Windows",
    text: "Custom transparent panels designed for industrial equipment where visibility and access to the working area are required.",
  },
  {
    number: "03",
    title: "Process Viewing Panels",
    text: "Fabricated viewing sections for equipment and process systems where visual monitoring is part of normal operation.",
  },
  {
    number: "04",
    title: "CNC Machine Viewing Panels",
    text: "Custom acrylic or polycarbonate viewing panels fabricated around the geometry of CNC and automated machinery.",
  },
  {
    number: "05",
    title: "Replacement Inspection Windows",
    text: "Replacement viewing components manufactured from existing samples, dimensions, photographs or drawings.",
  },
  {
    number: "06",
    title: "Custom Viewing Assemblies",
    text: "Complete custom fabricated viewing assemblies incorporating panels, profiles, openings and other required features.",
  },
];

const applications = [
  "CNC machine enclosures",
  "Industrial machinery",
  "Automated equipment",
  "Machine housings",
  "Process equipment",
  "Production lines",
  "Equipment inspection",
  "Transparent enclosures",
];

const industries = [
  "Pharmaceutical",
  "Engineering",
  "Machinery & Manufacturing",
  "Chemical",
  "Food Processing",
  "Packaging",
  "Automotive",
  "Industrial Equipment",
];

const capabilities = [
  {
    title: "CNC Routing",
    text: "Precision routing for custom profiles, openings, slots and mounting geometries.",
  },
  {
    title: "Acrylic Cutting",
    text: "Accurate acrylic cutting for viewing panels and custom inspection components.",
  },
  {
    title: "Polycarbonate Cutting",
    text: "Custom polycarbonate panels for applications requiring higher impact resistance.",
  },
  {
    title: "Bending",
    text: "Acrylic and polycarbonate can be formed where the viewing component requires a custom shape.",
  },
  {
    title: "Bonding",
    text: "Fabrication and joining of transparent components into custom assemblies.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Send Your Requirement",
    text: "Share your drawing, dimensions, photograph, existing sample or machine details.",
  },
  {
    number: "02",
    title: "Design Review",
    text: "We review the required dimensions, mounting arrangement, openings and material requirements.",
  },
  {
    number: "03",
    title: "Fabrication",
    text: "The viewing component is cut, machined, formed and fabricated according to the requirement.",
  },
  {
    number: "04",
    title: "Final Inspection",
    text: "Finished components are checked for dimensions, fabrication quality and overall finish before dispatch.",
  },
];

const faqs = [
  {
    question: "What is an acrylic inspection window?",
    answer:
      "An acrylic inspection window is a transparent fabricated panel installed into machinery, equipment or an enclosure to provide visual access for inspection or monitoring.",
  },
  {
    question: "Can you manufacture custom inspection windows?",
    answer:
      "Yes. Inspection windows can be manufactured according to drawings, dimensions, samples, photographs and equipment requirements.",
  },
  {
    question: "Can inspection windows be made from polycarbonate?",
    answer:
      "Yes. Polycarbonate can also be used where the application requires higher impact resistance compared with acrylic.",
  },
  {
    question: "Can you make holes and mounting openings?",
    answer:
      "Yes. Custom holes, slots, profiles and other machined features can be produced according to the drawing or installation requirement.",
  },
  {
    question: "Can I send an old inspection window as a sample?",
    answer:
      "Yes. An existing component or sample can be used as a reference for dimensions and fabrication requirements.",
  },
  {
    question: "Do you manufacture machine guards as well?",
    answer:
      "Yes. Henil Enterprise manufactures acrylic and polycarbonate machine guards, protective covers and transparent equipment enclosures.",
  },
];

export default function AcrylicInspectionWindowManufacturerAhmedabad() {
  useSeo(SEO.acrylicInspectionWindowManufacturerAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      {
        name: "Acrylic Inspection Window Manufacturer Ahmedabad",
        path: "/acrylic-inspection-window-manufacturer-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="acrylic-inspection-window-page">

        {/* HERO */}
        <section className="acrylic-inspection-window-hero">
          <div className="container acrylic-inspection-window-hero__inner">
            <span className="inspection-eyebrow">
              Custom Machine Viewing Components
            </span>

            <h1>
              Acrylic Inspection Window Manufacturer in{" "}
              <em>Ahmedabad.</em>
            </h1>

            <p className="acrylic-inspection-window-hero__lead">
              Custom acrylic and polycarbonate inspection windows fabricated
              in Ahmedabad for CNC machines, industrial equipment, machinery
              and transparent enclosures — manufactured to your drawings,
              dimensions and application requirements.
            </p>

            <div className="acrylic-inspection-window-hero__actions">
              <a
                href="/quote?product=machine-inspection-window"
                className="btn-primary"
              >
                Request a Quote
              </a>

              <a
                href="/products/machine-inspection-window"
                className="btn-secondary"
              >
                View Inspection Window
              </a>
            </div>

            <div className="acrylic-inspection-window-hero__trust">
              <span>Custom Dimensions</span>
              <span>Acrylic & Polycarbonate</span>
              <span>Drawing & Sample Based</span>
              <span>B2B Quantity Orders</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="acrylic-inspection-window-intro">
          <div className="container acrylic-inspection-window-intro__grid">
            <div>
              <span className="section-eyebrow">
                Machine Inspection
              </span>

              <h2>
                Visibility where your
                <em> equipment needs it.</em>
              </h2>
            </div>

            <div>
              <p>
                Henil Enterprise manufactures custom acrylic and polycarbonate
                inspection windows for machinery, equipment housings and
                transparent enclosures.
              </p>

              <p>
                Viewing panels can be fabricated according to your machine
                geometry, dimensions and mounting requirements, including
                custom holes, profiles and openings.
              </p>

              <p>
                Components can be manufactured from drawings, dimensions,
                photographs or existing samples for prototype and quantity
                requirements.
              </p>
            </div>
          </div>
        </section>

        {/* TYPES */}
        <section className="acrylic-inspection-window-types">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Inspection Window Solutions
              </span>

              <h2>
                Viewing components for
                <em> machinery and equipment.</em>
              </h2>

              <p>
                From simple replacement panels to complex custom viewing
                assemblies, components are fabricated according to the
                application.
              </p>
            </div>

            <div className="inspection-window-types__grid">
              {windowTypes.map((item) => (
                <article
                  className="inspection-window-card"
                  key={item.number}
                >
                  <span className="inspection-window-card__number">
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
        <section className="acrylic-inspection-window-applications">
          <div className="container acrylic-inspection-window-applications__grid">
            <div>
              <span className="section-eyebrow">
                Applications
              </span>

              <h2>
                Designed around
                <em> your machine.</em>
              </h2>

              <p>
                Inspection windows provide clear visual access to machinery,
                equipment and enclosed working areas without requiring the
                complete enclosure to be opened.
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

        {/* MATERIALS */}
        <section className="acrylic-inspection-window-materials">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Material Selection
              </span>

              <h2>
                Acrylic or polycarbonate?
                <em> We fabricate both.</em>
              </h2>

              <p>
                Material selection depends on the application's visibility,
                impact and fabrication requirements.
              </p>
            </div>

            <div className="material-grid">
              <article className="material-card">
                <span className="material-card__number">01</span>

                <h3>Acrylic</h3>

                <p>
                  Acrylic is a strong choice for transparent viewing
                  components where clarity, appearance and dimensional
                  fabrication are important.
                </p>

                <ul>
                  <li>High visual clarity</li>
                  <li>Custom machined profiles</li>
                  <li>Easy fabrication</li>
                  <li>Suitable for viewing panels</li>
                </ul>

                <a href="/acrylic-fabrication-ahmedabad">
                  Explore Acrylic Fabrication →
                </a>
              </article>

              <article className="material-card material-card--dark">
                <span className="material-card__number">02</span>

                <h3>Polycarbonate</h3>

                <p>
                  Polycarbonate can be selected for applications where higher
                  impact resistance is an important requirement alongside
                  transparency.
                </p>

                <ul>
                  <li>Higher impact resistance</li>
                  <li>Transparent protection</li>
                  <li>Custom machining</li>
                  <li>Suitable for industrial guarding</li>
                </ul>

                <a href="/polycarbonate-fabrication-ahmedabad">
                  Explore Polycarbonate Fabrication →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="acrylic-inspection-window-capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Manufacturing Capabilities
              </span>

              <h2>
                Precision fabrication for
                <em> custom inspection windows.</em>
              </h2>

              <p>
                Components can be cut, machined, formed and assembled
                according to the required geometry.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability, index) => (
                <article
                  className="capability-card"
                  key={capability.title}
                >
                  <span className="capability-card__number">
                    0{index + 1}
                  </span>

                  <h3>{capability.title}</h3>

                  <p>{capability.text}</p>

                  <a href="/capabilities">
                    Learn More →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CUSTOMIZATION */}
        <section className="acrylic-inspection-window-custom">
          <div className="container acrylic-inspection-window-custom__grid">
            <div className="custom-panel custom-panel--main">
              <span className="section-eyebrow">
                Customisation
              </span>

              <h2>
                Your machine isn't standard.
                <em> Your window doesn't have to be.</em>
              </h2>

              <p>
                Inspection windows can be fabricated around your existing
                machine housing, mounting arrangement and required viewing
                area.
              </p>

              <ul>
                <li>Custom length and width</li>
                <li>Custom thickness</li>
                <li>Mounting holes</li>
                <li>Slots and openings</li>
                <li>Custom profiles</li>
                <li>Drawing or sample based fabrication</li>
                <li>Prototype quantities</li>
                <li>Production quantities</li>
              </ul>
            </div>

            <div className="custom-panel custom-panel--side">
              <span className="section-eyebrow">
                Related Solution
              </span>

              <h3>
                Need complete transparent machine protection?
              </h3>

              <p>
                Explore custom acrylic and polycarbonate machine guards and
                protective covers.
              </p>

              <a href="/acrylic-machine-guard-manufacturer-ahmedabad">
                Explore Machine Guards →
              </a>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="acrylic-inspection-window-industries">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Industries
              </span>

              <h2>
                Built for
                <em> industrial equipment.</em>
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
        <section className="acrylic-inspection-window-process">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Manufacturing Process
              </span>

              <h2>
                From your drawing to
                <em> finished viewing component.</em>
              </h2>

              <p>
                Send your existing component, drawing or dimensions and we
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
        <section className="acrylic-inspection-window-faq">
          <div className="container acrylic-inspection-window-faq__grid">
            <div>
              <span className="section-eyebrow">
                FAQ
              </span>

              <h2>
                Inspection window
                <em> questions.</em>
              </h2>

              <p>
                Have a machine viewing window requirement? Send the drawing,
                dimensions, photograph or existing sample for review.
              </p>

              <a
                href="/quote?product=machine-inspection-window"
                className="btn-primary"
              >
                Get a Quote
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
        <section className="acrylic-inspection-window-related">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Related Solutions
              </span>

              <h2>
                More transparent
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
                  Custom transparent guards and protective covers for
                  industrial machinery.
                </p>

                <strong>Explore →</strong>
              </a>

              <a
                href="/polycarbonate-machine-guard-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>02</span>

                <h3>Polycarbonate Machine Guards</h3>

                <p>
                  Impact-resistant transparent guarding for machinery and
                  production equipment.
                </p>

                <strong>Explore →</strong>
              </a>

              <a
                href="/acrylic-sight-glass-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>03</span>

                <h3>Acrylic Sight Glass</h3>

                <p>
                  Custom acrylic viewing components for tanks, equipment and
                  process monitoring.
                </p>

                <strong>Explore →</strong>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="acrylic-inspection-window-cta">
          <div className="container">
            <span className="section-eyebrow">
              Need a Custom Inspection Window?
            </span>

            <h2>
              Send your drawing.
              <br />
              <em>We'll review the requirement.</em>
            </h2>

            <p>
              Share your dimensions, machine details, existing sample or
              drawing with Henil Enterprise for a custom quotation.
            </p>

            <a
              href="/quote?product=machine-inspection-window"
              className="btn-primary"
            >
              Request Inspection Window Quote
            </a>
          </div>
        </section>

      </main>
    </MainLayout>
  );
}