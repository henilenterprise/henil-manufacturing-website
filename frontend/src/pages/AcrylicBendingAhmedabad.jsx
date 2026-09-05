import MainLayout from "../layouts/MainLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./AcrylicBendingAhmedabad.css";

const applications = [
  {
    number: "01",
    title: "Machine Covers",
    text: "Formed acrylic covers and panels fabricated around machinery and equipment geometry.",
  },
  {
    number: "02",
    title: "Protective Guards",
    text: "Bent acrylic components used as transparent guards and protective covers for industrial equipment.",
  },
  {
    number: "03",
    title: "Equipment Housings",
    text: "Custom formed panels for equipment housings, enclosures and transparent assemblies.",
  },
  {
    number: "04",
    title: "Display Components",
    text: "Bent acrylic components for commercial displays, product presentation and point-of-sale applications.",
  },
  {
    number: "05",
    title: "Custom Fabricated Parts",
    text: "Formed components manufactured according to drawings, dimensions, photographs or existing samples.",
  },
  {
    number: "06",
    title: "Transparent Enclosures",
    text: "Multi-panel acrylic assemblies where bending helps create the required enclosure geometry.",
  },
];

const formingOptions = [
  {
    number: "01",
    title: "Straight Bends",
    text: "Acrylic sheets formed along specified lines to create angled panels and components.",
  },
  {
    number: "02",
    title: "Multi-Bend Components",
    text: "Components requiring multiple bends can be fabricated according to the required geometry.",
  },
  {
    number: "03",
    title: "Custom Angles",
    text: "Bent components can be produced around the dimensions and angles specified in your drawing.",
  },
  {
    number: "04",
    title: "Formed Covers",
    text: "Custom covers and housings can combine bending with cutting, drilling and bonding.",
  },
];

const capabilities = [
  {
    title: "CNC Routing",
    text: "Pre-machining and profile cutting for components requiring precise geometry before or after forming.",
  },
  {
    title: "Acrylic Cutting",
    text: "Sheets can be cut to the required dimensions before the forming process.",
  },
  {
    title: "Acrylic Bending",
    text: "Controlled forming for custom angles, covers, panels and transparent fabricated components.",
  },
  {
    title: "Polycarbonate Bending",
    text: "Polycarbonate forming is also available for applications requiring higher impact resistance.",
  },
  {
    title: "Bonding",
    text: "Bent components can be joined with additional acrylic parts to create complete assemblies.",
  },
  {
    title: "Custom Fabrication",
    text: "Complete products can be fabricated from your drawing, sample or application requirement.",
  },
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

const processSteps = [
  {
    number: "01",
    title: "Share Your Requirement",
    text: "Send your drawing, dimensions, photograph, sample or required component geometry.",
  },
  {
    number: "02",
    title: "Material & Geometry Review",
    text: "We review the material, thickness, bend locations, angles and overall fabrication requirement.",
  },
  {
    number: "03",
    title: "Cut & Form",
    text: "The acrylic component is prepared and formed according to the required geometry.",
  },
  {
    number: "04",
    title: "Finish & Inspect",
    text: "The completed component is checked and prepared for assembly, dispatch or further fabrication.",
  },
];

const faqs = [
  {
    question: "What is acrylic bending?",
    answer:
      "Acrylic bending is a fabrication process used to form acrylic sheet into angled or shaped components according to the required geometry.",
  },
  {
    question: "Can you bend acrylic according to a drawing?",
    answer:
      "Yes. Custom acrylic bent components can be fabricated according to drawings, dimensions, photographs or existing samples.",
  },
  {
    question: "Can you manufacture bent acrylic covers?",
    answer:
      "Yes. Bent acrylic can be combined with cutting, machining and bonding to manufacture custom equipment covers, machine housings and transparent enclosures.",
  },
  {
    question: "Can polycarbonate also be bent?",
    answer:
      "Yes. Polycarbonate can also be formed for applications where higher impact resistance is an important consideration.",
  },
  {
    question: "Can you combine bending with CNC cutting?",
    answer:
      "Yes. CNC routing, cutting, drilling, bending and bonding can be combined depending on the component design.",
  },
  {
    question: "Do you manufacture prototypes and quantity orders?",
    answer:
      "Yes. Prototype, repeat and B2B quantity requirements can be reviewed depending on the component and production requirement.",
  },
];

export default function AcrylicBendingAhmedabad() {
  useSeo(SEO.acrylicBendingAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      {
        name: "Acrylic Bending Ahmedabad",
        path: "/acrylic-bending-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="acrylic-bending-page">

        {/* HERO */}
        <section className="acrylic-bending-hero">
          <div className="container acrylic-bending-hero__inner">
            <span className="bending-eyebrow">
              Acrylic Forming & Fabrication
            </span>

            <h1>
              Acrylic Bending in{" "}
              <em>Ahmedabad.</em>
            </h1>

            <p className="acrylic-bending-hero__lead">
              Custom acrylic bending and formed components in Ahmedabad for
              machine covers, guards, housings, enclosures and fabricated
              products — manufactured to your drawings and dimensions.
            </p>

            <div className="acrylic-bending-hero__actions">
              <a
                href="/quote?material=Acrylic&service=Bending"
                className="btn-primary"
              >
                Request a Quote
              </a>

              <a href="/acrylic-fabrication-ahmedabad" className="btn-secondary">
                Explore Acrylic Fabrication
              </a>
            </div>

            <div className="acrylic-bending-hero__trust">
              <span>Custom Angles</span>
              <span>Custom Dimensions</span>
              <span>Drawing Based</span>
              <span>Prototype & Quantity</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="acrylic-bending-intro">
          <div className="container acrylic-bending-intro__grid">
            <div>
              <span className="section-eyebrow">
                Acrylic Forming
              </span>

              <h2>
                Flat acrylic sheets,
                <em> formed around your design.</em>
              </h2>
            </div>

            <div>
              <p>
                Henil Enterprise provides custom acrylic bending for machine
                components, equipment covers, transparent housings,
                protective guards and other fabricated products.
              </p>

              <p>
                Formed components can be manufactured according to your
                dimensions, bend locations, angles and overall application
                requirements.
              </p>

              <p>
                Bending can also be combined with CNC routing, cutting,
                drilling and bonding to produce complete custom assemblies.
              </p>
            </div>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="acrylic-bending-applications">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Applications
              </span>

              <h2>
                Formed acrylic for
                <em> custom applications.</em>
              </h2>

              <p>
                Acrylic bending can simplify the fabrication of components
                that require angled panels, formed covers or shaped
                transparent housings.
              </p>
            </div>

            <div className="bending-applications-grid">
              {applications.map((application) => (
                <article
                  className="bending-application-card"
                  key={application.number}
                >
                  <span className="bending-application-card__number">
                    {application.number}
                  </span>

                  <h3>{application.title}</h3>

                  <p>{application.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FORMING OPTIONS */}
        <section className="acrylic-bending-options">
          <div className="container acrylic-bending-options__grid">
            <div>
              <span className="section-eyebrow">
                Forming Options
              </span>

              <h2>
                Built around the
                <em> required geometry.</em>
              </h2>

              <p>
                Different component designs require different forming
                arrangements. Share your drawing or sample so the required
                fabrication approach can be reviewed.
              </p>

              <a href="/quote?material=Acrylic&service=Bending" className="text-link">
                Discuss Your Requirement →
              </a>
            </div>

            <div className="bending-options-list">
              {formingOptions.map((option) => (
                <article
                  className="bending-option"
                  key={option.number}
                >
                  <span>{option.number}</span>

                  <div>
                    <h3>{option.title}</h3>
                    <p>{option.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MATERIALS */}
        <section className="acrylic-bending-materials">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Materials
              </span>

              <h2>
                Acrylic and polycarbonate
                <em> forming.</em>
              </h2>

              <p>
                Material selection depends on the required appearance,
                fabrication characteristics and application requirements.
              </p>
            </div>

            <div className="bending-material-grid">
              <article className="bending-material-card">
                <span>01</span>

                <h3>Acrylic</h3>

                <p>
                  Acrylic is widely used for transparent formed covers,
                  housings, panels, guards and fabricated components where
                  clarity and appearance are important.
                </p>

                <ul>
                  <li>Transparent appearance</li>
                  <li>Custom formed components</li>
                  <li>Machine covers and housings</li>
                  <li>Display and commercial applications</li>
                </ul>

                <a href="/acrylic-fabrication-ahmedabad">
                  Explore Acrylic Fabrication →
                </a>
              </article>

              <article className="bending-material-card bending-material-card--dark">
                <span>02</span>

                <h3>Polycarbonate</h3>

                <p>
                  Polycarbonate can be selected for formed components where
                  higher impact resistance is an important requirement.
                </p>

                <ul>
                  <li>Higher impact resistance</li>
                  <li>Transparent machine protection</li>
                  <li>Industrial guarding</li>
                  <li>Custom formed components</li>
                </ul>

                <a href="/polycarbonate-fabrication-ahmedabad">
                  Explore Polycarbonate Fabrication →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="acrylic-bending-capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Manufacturing Capabilities
              </span>

              <h2>
                Bending combined with
                <em> complete fabrication.</em>
              </h2>

              <p>
                Forming is often one stage of a larger fabrication process.
                Components can be cut, machined, bent and assembled according
                to the design.
              </p>
            </div>

            <div className="bending-capability-grid">
              {capabilities.map((capability, index) => (
                <article
                  className="bending-capability-card"
                  key={capability.title}
                >
                  <span>
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
        <section className="acrylic-bending-custom">
          <div className="container acrylic-bending-custom__grid">
            <div className="bending-custom-panel bending-custom-panel--main">
              <span className="section-eyebrow">
                Custom Fabrication
              </span>

              <h2>
                Not just a bend.
                <em> A complete component.</em>
              </h2>

              <p>
                When required, formed acrylic can be combined with additional
                machining and fabrication processes to create a finished
                component.
              </p>

              <ul>
                <li>Custom length and width</li>
                <li>Specified bend locations</li>
                <li>Custom angles</li>
                <li>Cutouts and openings</li>
                <li>Mounting holes</li>
                <li>CNC-machined profiles</li>
                <li>Bonded assemblies</li>
                <li>Prototype and production quantities</li>
              </ul>
            </div>

            <div className="bending-custom-panel bending-custom-panel--side">
              <span className="section-eyebrow">
                Need More?
              </span>

              <h3>
                Need CNC cutting before bending?
              </h3>

              <p>
                Explore custom acrylic CNC cutting for profiles, holes,
                openings and component geometries.
              </p>

              <a href="/acrylic-cnc-cutting-ahmedabad">
                Explore Acrylic CNC Cutting →
              </a>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="acrylic-bending-industries">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Industries
              </span>

              <h2>
                Acrylic fabrication for
                <em> industrial applications.</em>
              </h2>
            </div>

            <div className="bending-industry-grid">
              {industries.map((industry) => (
                <a
                  href="/industries"
                  className="bending-industry-item"
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
        <section className="acrylic-bending-process">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Manufacturing Process
              </span>

              <h2>
                From flat sheet to
                <em> finished component.</em>
              </h2>

              <p>
                The fabrication process starts with your required geometry and
                ends with a formed component ready for use or further
                assembly.
              </p>
            </div>

            <div className="bending-process-grid">
              {processSteps.map((step) => (
                <article
                  className="bending-process-card"
                  key={step.number}
                >
                  <span>{step.number}</span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="acrylic-bending-faq">
          <div className="container acrylic-bending-faq__grid">
            <div>
              <span className="section-eyebrow">
                FAQ
              </span>

              <h2>
                Acrylic bending
                <em> questions.</em>
              </h2>

              <p>
                Have a custom formed acrylic component in mind? Send the
                drawing, dimensions or sample for review.
              </p>

              <a
                href="/quote?material=Acrylic&service=Bending"
                className="btn-primary"
              >
                Get a Bending Quote
              </a>
            </div>

            <div className="bending-faq-list">
              {faqs.map((faq) => (
                <details
                  className="bending-faq-item"
                  key={faq.question}
                >
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
        <section className="acrylic-bending-related">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Related Solutions
              </span>

              <h2>
                Complete the
                <em> fabrication.</em>
              </h2>
            </div>

            <div className="bending-related-grid">
              <a
                href="/acrylic-cnc-cutting-ahmedabad"
                className="bending-related-card"
              >
                <span>01</span>

                <h3>Acrylic CNC Cutting</h3>

                <p>
                  CNC-cut acrylic profiles, panels, openings and custom
                  components.
                </p>

                <strong>Explore →</strong>
              </a>

              <a
                href="/acrylic-machine-guard-manufacturer-ahmedabad"
                className="bending-related-card"
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
                href="/custom-acrylic-fabrication-ahmedabad"
                className="bending-related-card"
              >
                <span>03</span>

                <h3>Custom Acrylic Fabrication</h3>

                <p>
                  Complete custom acrylic components manufactured from your
                  drawing or sample.
                </p>

                <strong>Explore →</strong>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="acrylic-bending-cta">
          <div className="container">
            <span className="section-eyebrow">
              Need Custom Acrylic Bending?
            </span>

            <h2>
              Show us the shape.
              <br />
              <em>We'll fabricate it.</em>
            </h2>

            <p>
              Share your drawing, dimensions, photograph or existing sample
              with Henil Enterprise for a custom acrylic bending quotation.
            </p>

            <a
              href="/quote?material=Acrylic&service=Bending"
              className="btn-primary"
            >
              Request Acrylic Bending Quote
            </a>
          </div>
        </section>

      </main>
    </MainLayout>
  );
}