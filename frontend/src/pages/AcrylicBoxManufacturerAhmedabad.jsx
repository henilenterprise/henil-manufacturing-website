import MainLayout from "../layouts/MainLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./AcrylicBoxManufacturerAhmedabad.css";

const boxTypes = [
  {
    number: "01",
    title: "Custom Acrylic Boxes",
    text: "Clear acrylic boxes manufactured to your required length, width, height and configuration.",
  },
  {
    number: "02",
    title: "Acrylic Storage Boxes",
    text: "Fabricated boxes for organizing components, parts, samples, tools and other items.",
  },
  {
    number: "03",
    title: "Acrylic Display Boxes",
    text: "Transparent display boxes designed for products, samples, models and commercial presentation.",
  },
  {
    number: "04",
    title: "Equipment Covers",
    text: "Custom transparent covers designed to protect equipment while keeping the contents visible.",
  },
  {
    number: "05",
    title: "Machine Component Boxes",
    text: "Fabricated enclosures and boxes designed to integrate with machinery and industrial assemblies.",
  },
  {
    number: "06",
    title: "Special-Shape Boxes",
    text: "Non-standard shapes, cut-outs, openings and configurations fabricated from your drawing.",
  },
];

const applications = [
  "Component storage",
  "Machine components",
  "Equipment protection",
  "Product display",
  "Retail presentation",
  "Sample storage",
  "Laboratory applications",
  "Industrial organisation",
  "Demonstration systems",
  "Custom enclosures",
];

const industries = [
  "Pharmaceutical",
  "Engineering",
  "Machinery & Manufacturing",
  "Chemical",
  "Food Processing",
  "Packaging",
  "Retail & Commercial",
  "Industrial Equipment",
];

const capabilities = [
  {
    title: "Acrylic Cutting",
    text: "Accurate sheet cutting according to the required dimensions of each box component.",
  },
  {
    title: "CNC Routing",
    text: "Precision machining for holes, slots, profiles, cut-outs and custom features.",
  },
  {
    title: "Acrylic Bending",
    text: "Controlled forming for box components requiring bends or shaped sections.",
  },
  {
    title: "Bonding",
    text: "Careful joining of acrylic components to produce clean fabricated box assemblies.",
  },
  {
    title: "Custom Fabrication",
    text: "Complete fabrication based on drawings, samples, dimensions or application requirements.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Share Your Requirement",
    text: "Send your dimensions, drawing, sample, photograph or basic box requirements.",
  },
  {
    number: "02",
    title: "Review & Quote",
    text: "We review the dimensions, construction, openings and required fabrication details.",
  },
  {
    number: "03",
    title: "Manufacturing",
    text: "Components are cut, machined, formed and bonded according to the approved requirement.",
  },
  {
    number: "04",
    title: "Quality Check",
    text: "The finished box is checked for dimensions, assembly and overall fabrication quality.",
  },
];

const faqs = [
  {
    question: "Can Henil Enterprise manufacture acrylic boxes in custom sizes?",
    answer:
      "Yes. Acrylic boxes can be fabricated according to your required length, width, height, thickness and configuration.",
  },
  {
    question: "Can I provide a drawing or sample for an acrylic box?",
    answer:
      "Yes. You can provide a technical drawing, dimensions, sample, photograph or specification for review and quotation.",
  },
  {
    question: "What are acrylic boxes commonly used for?",
    answer:
      "Acrylic boxes are commonly used for storage, display, equipment protection, component organisation, laboratory applications and custom enclosures.",
  },
  {
    question: "Can acrylic boxes have holes and cut-outs?",
    answer:
      "Yes. Holes, slots, profiles and other machined features can be incorporated according to the drawing or application requirement.",
  },
  {
    question: "Can you manufacture transparent equipment covers?",
    answer:
      "Yes. Custom transparent acrylic covers and enclosures can be fabricated for equipment, machinery and other applications where visibility is useful.",
  },
  {
    question: "Do you manufacture acrylic boxes in quantity?",
    answer:
      "Yes. Henil Enterprise handles custom fabrication for prototypes as well as B2B quantity requirements, depending on the project.",
  },
];

export default function AcrylicBoxManufacturerAhmedabad() {
  useSeo(SEO.acrylicBoxManufacturerAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      {
        name: "Acrylic Box Manufacturer Ahmedabad",
        path: "/acrylic-box-manufacturer-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="acrylic-box-page">
        {/* HERO */}
        <section className="acrylic-box-hero">
          <div className="container acrylic-box-hero__inner">
            <span className="acrylic-box-eyebrow">
              Custom Acrylic Box Fabrication
            </span>

            <h1>
              Acrylic Box Manufacturer in <em>Ahmedabad.</em>
            </h1>

            <p className="acrylic-box-hero__lead">
              Custom acrylic boxes manufactured in Ahmedabad for industrial,
              commercial, storage, display and equipment applications — built
              according to your drawings, dimensions and requirements.
            </p>

            <div className="acrylic-box-hero__actions">
              <a
                href="/quote?product=acrylic-storage-box"
                className="btn-primary"
              >
                Request a Quote
              </a>

              <a
                href="/products/acrylic-storage-box"
                className="btn-secondary"
              >
                View Acrylic Box Product
              </a>
            </div>

            <div className="acrylic-box-hero__trust">
              <span>Custom Dimensions</span>
              <span>Clear Acrylic Fabrication</span>
              <span>B2B Quantity Orders</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="acrylic-box-intro">
          <div className="container acrylic-box-intro__grid">
            <div>
              <span className="section-eyebrow">Custom Fabrication</span>

              <h2>
                Acrylic boxes built around your
                <em> application.</em>
              </h2>
            </div>

            <div>
              <p>
                Henil Enterprise manufactures custom acrylic boxes for
                industrial, commercial, storage, display and equipment
                applications.
              </p>

              <p>
                Boxes can be produced from your dimensions, engineering
                drawing, sample or application requirements, including custom
                openings, profiles and other machined features where required.
              </p>

              <p>
                Our fabrication capabilities include acrylic cutting, CNC
                routing, bending, bonding and complete custom assembly for B2B
                requirements.
              </p>
            </div>
          </div>
        </section>

        {/* BOX TYPES */}
        <section className="acrylic-box-types">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Box Types</span>

              <h2>
                Custom acrylic boxes for
                <em> different requirements.</em>
              </h2>

              <p>
                From simple storage boxes to application-specific equipment
                enclosures, each box can be fabricated according to the
                required dimensions and configuration.
              </p>
            </div>

            <div className="acrylic-box-types__grid">
              {boxTypes.map((item) => (
                <article className="box-card" key={item.number}>
                  <span className="box-card__number">{item.number}</span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="acrylic-box-applications">
          <div className="container acrylic-box-applications__grid">
            <div>
              <span className="section-eyebrow">Applications</span>

              <h2>
                Built for storage,
                <em> protection and visibility.</em>
              </h2>

              <p>
                Transparent acrylic boxes can be fabricated for a wide range of
                industrial, commercial and equipment-related requirements.
              </p>

              <a
                href="/acrylic-fabrication-ahmedabad"
                className="text-link"
              >
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
        <section className="acrylic-box-capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Manufacturing Capabilities
              </span>

              <h2>
                Precision machining meets
                <em> acrylic fabrication.</em>
              </h2>

              <p>
                Our fabrication process combines accurate cutting, machining,
                forming and bonding to manufacture custom acrylic box
                assemblies.
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

        {/* DESIGN / FEATURES */}
        <section className="acrylic-box-features">
          <div className="container acrylic-box-features__grid">
            <div className="feature-panel feature-panel--main">
              <span className="section-eyebrow">Customisation</span>

              <h2>
                More than a standard box.
                <em> Built to your drawing.</em>
              </h2>

              <p>
                When an off-the-shelf enclosure does not fit your application,
                a fabricated acrylic box can be designed around your actual
                dimensions and equipment.
              </p>

              <ul>
                <li>Custom length, width and height</li>
                <li>Custom openings and cut-outs</li>
                <li>Holes and mounting features</li>
                <li>Custom profiles and configurations</li>
                <li>Drawing or sample based fabrication</li>
                <li>Prototype and quantity requirements</li>
              </ul>
            </div>

            <div className="feature-panel feature-panel--side">
              <span className="section-eyebrow">Product Range</span>

              <h3>Looking for another acrylic product?</h3>

              <p>
                Explore machine guards, tanks, inspection windows, sight
                glasses, cabinets and other fabricated acrylic components.
              </p>

              <a href="/products">Explore Products →</a>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="acrylic-box-industries">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Industries</span>

              <h2>
                Acrylic fabrication for
                <em> business requirements.</em>
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
        <section className="acrylic-box-process">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Our Process</span>

              <h2>
                From requirement to
                <em> finished box.</em>
              </h2>

              <p>
                Share your requirement with our team and we can review the
                fabrication details before quotation and production.
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
        <section className="acrylic-box-faq">
          <div className="container acrylic-box-faq__grid">
            <div>
              <span className="section-eyebrow">FAQ</span>

              <h2>
                Acrylic box
                <em> questions.</em>
              </h2>

              <p>
                Have a custom box requirement? Send us your dimensions,
                drawing, sample or application details for review.
              </p>

              <a
                href="/quote?product=acrylic-storage-box"
                className="btn-primary"
              >
                Get an Acrylic Box Quote
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
        <section className="acrylic-box-related">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Related Solutions</span>

              <h2>
                More custom acrylic
                <em> products.</em>
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
                  Custom transparent acrylic tanks fabricated to your required
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
                  Custom transparent guards and covers for machinery and
                  industrial equipment.
                </p>

                <strong>Explore →</strong>
              </a>

              <a
                href="/acrylic-inspection-window-manufacturer-ahmedabad"
                className="related-card"
              >
                <span>03</span>

                <h3>Inspection Windows</h3>

                <p>
                  Clear viewing windows fabricated for machine and equipment
                  inspection.
                </p>

                <strong>Explore →</strong>
              </a>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="acrylic-box-cta">
          <div className="container">
            <span className="section-eyebrow">Have a Box Requirement?</span>

            <h2>
              Send your dimensions.
              <br />
              <em>We'll review the requirement.</em>
            </h2>

            <p>
              Share your drawing, dimensions, sample or application details
              with Henil Enterprise for a custom acrylic box quotation.
            </p>

            <a
              href="/quote?product=acrylic-storage-box"
              className="btn-primary"
            >
              Request Acrylic Box Quote
            </a>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}