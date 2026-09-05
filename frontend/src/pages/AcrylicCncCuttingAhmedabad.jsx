import MainLayout from "../layouts/MainLayout.jsx";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./AcrylicCncCuttingAhmedabad.css";

const services = [
  {
    number: "01",
    title: "Profile Cutting",
    text: "Custom acrylic profiles, contours and irregular shapes cut according to your drawing or digital dimensions.",
  },
  {
    number: "02",
    title: "Precision Openings",
    text: "Custom holes, slots, cutouts and internal openings for machine components and fabricated assemblies.",
  },
  {
    number: "03",
    title: "Machine Components",
    text: "CNC-cut acrylic components manufactured for machinery, equipment housings and industrial assemblies.",
  },
  {
    number: "04",
    title: "Panel & Plate Cutting",
    text: "Acrylic panels and plates cut to specified dimensions with additional machining where required.",
  },
  {
    number: "05",
    title: "Prototype Components",
    text: "One-off and prototype CNC components can be produced directly from your drawing or sample.",
  },
  {
    number: "06",
    title: "Quantity Production",
    text: "Repeat CNC cutting for production requirements and B2B quantity orders.",
  },
];

const applications = [
  "Machine panels",
  "Machine guards",
  "Equipment covers",
  "Control panel fascias",
  "Transparent enclosures",
  "Industrial components",
  "Custom brackets and plates",
  "Inspection components",
  "Display components",
  "Engineering parts",
];

const materials = [
  {
    title: "Acrylic",
    text: "CNC routing acrylic is suitable for transparent panels, machine components, housings, covers, fixtures and custom fabricated parts.",
    points: [
      "Clear and transparent fabrication",
      "Custom profiles and cutouts",
      "Machine panels and covers",
      "Industrial fabricated components",
    ],
    link: "/acrylic-fabrication-ahmedabad",
    linkText: "Explore Acrylic Fabrication →",
  },
  {
    title: "Polycarbonate",
    text: "Polycarbonate can also be CNC machined for applications requiring transparent components with higher impact resistance.",
    points: [
      "Impact-resistant components",
      "Machine guarding",
      "Industrial protective panels",
      "Custom machined parts",
    ],
    link: "/polycarbonate-fabrication-ahmedabad",
    linkText: "Explore Polycarbonate Fabrication →",
  },
];

const capabilities = [
  {
    title: "CNC Routing",
    text: "Computer-controlled routing for custom profiles, cutouts, slots and component geometries.",
  },
  {
    title: "Cutting",
    text: "Straight and profile cutting to required dimensions for panels and fabricated components.",
  },
  {
    title: "Drilling & Openings",
    text: "Custom holes and openings can be incorporated into components according to drawings.",
  },
  {
    title: "Bending",
    text: "CNC-cut components can be combined with acrylic or polycarbonate bending where required.",
  },
  {
    title: "Bonding",
    text: "Machined components can be assembled and bonded into complete fabricated products.",
  },
  {
    title: "Custom Fabrication",
    text: "From individual machined parts to complete transparent assemblies built to specification.",
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
    title: "Send Your Drawing",
    text: "Share your CAD drawing, PDF, dimensions, sample or photograph of the required component.",
  },
  {
    number: "02",
    title: "Requirement Review",
    text: "We review dimensions, material, thickness, profiles, openings and quantity requirements.",
  },
  {
    number: "03",
    title: "CNC Cutting",
    text: "The material is routed and machined according to the approved component geometry.",
  },
  {
    number: "04",
    title: "Finishing & Dispatch",
    text: "Components are checked, finished and prepared for assembly or dispatch according to the requirement.",
  },
];

const faqs = [
  {
    question: "What is acrylic CNC cutting?",
    answer:
      "Acrylic CNC cutting uses computer-controlled routing to produce custom profiles, cutouts, holes, slots and component geometries from acrylic sheets or panels.",
  },
  {
    question: "Can you CNC cut acrylic according to my drawing?",
    answer:
      "Yes. CNC-cut acrylic components can be manufactured according to CAD files, PDF drawings, dimensions, photographs or existing samples.",
  },
  {
    question: "What acrylic thicknesses can you CNC cut?",
    answer:
      "CNC cutting requirements depend on the material, geometry and application. Share your required thickness and component drawing so the fabrication requirement can be reviewed.",
  },
  {
    question: "Can you CNC cut polycarbonate?",
    answer:
      "Yes. Polycarbonate can also be CNC machined for industrial components, protective panels, machine guards and other custom applications.",
  },
  {
    question: "Can you make holes and slots in acrylic?",
    answer:
      "Yes. Custom holes, slots, openings and profiles can be incorporated into CNC-cut acrylic components according to the drawing.",
  },
  {
    question: "Do you accept quantity orders?",
    answer:
      "Yes. Henil Enterprise works on prototype, repeat and B2B quantity requirements depending on the component and production requirement.",
  },
];

export default function AcrylicCncCuttingAhmedabad() {
  useSeo(SEO.acrylicCncCuttingAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      {
        name: "Acrylic CNC Cutting Ahmedabad",
        path: "/acrylic-cnc-cutting-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="acrylic-cnc-cutting-page">

        {/* HERO */}
        <section className="acrylic-cnc-cutting-hero">
          <div className="container acrylic-cnc-cutting-hero__inner">
            <span className="cnc-eyebrow">
              Precision Acrylic Machining
            </span>

            <h1>
              Acrylic CNC Cutting in{" "}
              <em>Ahmedabad.</em>
            </h1>

            <p className="acrylic-cnc-cutting-hero__lead">
              Custom acrylic CNC cutting and routing in Ahmedabad for machine
              panels, guards, covers, enclosures and industrial components —
              manufactured from your drawing, dimensions or sample.
            </p>

            <div className="acrylic-cnc-cutting-hero__actions">
              <a
                href="/quote?material=Acrylic&service=CNC%20Cutting"
                className="btn-primary"
              >
                Request a Quote
              </a>

              <a href="/capabilities" className="btn-secondary">
                View Capabilities
              </a>
            </div>

            <div className="acrylic-cnc-cutting-hero__trust">
              <span>Custom Profiles</span>
              <span>Precision Cutouts</span>
              <span>Drawing Based</span>
              <span>Prototype & Quantity</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="acrylic-cnc-cutting-intro">
          <div className="container acrylic-cnc-cutting-intro__grid">
            <div>
              <span className="section-eyebrow">
                CNC Acrylic Cutting
              </span>

              <h2>
                Complex acrylic geometries,
                <em> cut to your requirement.</em>
              </h2>
            </div>

            <div>
              <p>
                Henil Enterprise provides custom CNC cutting and routing of
                acrylic sheets and panels for industrial, engineering,
                machinery and commercial applications.
              </p>

              <p>
                CNC routing is useful when a component requires more than a
                simple straight cut — including profiles, internal cutouts,
                slots, holes and custom geometries.
              </p>

              <p>
                Components can be produced from CAD drawings, PDF drawings,
                dimensions, photographs or existing samples depending on the
                requirement.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="acrylic-cnc-cutting-services">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                CNC Cutting Services
              </span>

              <h2>
                More than straight
                <em> sheet cutting.</em>
              </h2>

              <p>
                CNC routing allows custom acrylic components to be produced
                around the exact geometry of your machine, equipment or
                assembly.
              </p>
            </div>

            <div className="cnc-services-grid">
              {services.map((service) => (
                <article
                  className="cnc-service-card"
                  key={service.number}
                >
                  <span className="cnc-service-card__number">
                    {service.number}
                  </span>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="acrylic-cnc-cutting-applications">
          <div className="container acrylic-cnc-cutting-applications__grid">
            <div>
              <span className="section-eyebrow">
                Applications
              </span>

              <h2>
                CNC-cut components for
                <em> real-world equipment.</em>
              </h2>

              <p>
                Custom routed acrylic components can be incorporated into
                machinery, equipment, guards, covers, enclosures and
                fabricated assemblies.
              </p>

              <a href="/products" className="text-link">
                Explore Products →
              </a>
            </div>

            <div className="cnc-application-list">
              {applications.map((application) => (
                <div
                  className="cnc-application-item"
                  key={application}
                >
                  <span>+</span>
                  {application}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MATERIALS */}
        <section className="acrylic-cnc-cutting-materials">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Materials
              </span>

              <h2>
                Acrylic CNC cutting —
                <em> and polycarbonate machining.</em>
              </h2>

              <p>
                Select the material based on the visual, mechanical and
                application requirements of the component.
              </p>
            </div>

            <div className="cnc-material-grid">
              {materials.map((material, index) => (
                <article
                  className={`cnc-material-card ${
                    index === 1 ? "cnc-material-card--dark" : ""
                  }`}
                  key={material.title}
                >
                  <span className="cnc-material-card__number">
                    0{index + 1}
                  </span>

                  <h3>{material.title}</h3>

                  <p>{material.text}</p>

                  <ul>
                    {material.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>

                  <a href={material.link}>
                    {material.linkText}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="acrylic-cnc-cutting-capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Manufacturing Capabilities
              </span>

              <h2>
                CNC cutting can be part of a
                <em> complete fabrication.</em>
              </h2>

              <p>
                CNC routing can be combined with cutting, bending, bonding and
                fabrication to produce complete custom components.
              </p>
            </div>

            <div className="cnc-capability-grid">
              {capabilities.map((capability, index) => (
                <article
                  className="cnc-capability-card"
                  key={capability.title}
                >
                  <span className="cnc-capability-card__number">
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

        {/* CUSTOM PARTS */}
        <section className="acrylic-cnc-cutting-custom">
          <div className="container acrylic-cnc-cutting-custom__grid">
            <div className="cnc-custom-panel cnc-custom-panel--main">
              <span className="section-eyebrow">
                Custom Components
              </span>

              <h2>
                Have a drawing?
                <em> We'll cut the component.</em>
              </h2>

              <p>
                Send your component drawing or existing sample and we can
                review the required CNC cutting and fabrication process.
              </p>

              <ul>
                <li>CAD and PDF drawings</li>
                <li>Custom dimensions</li>
                <li>Complex profiles</li>
                <li>Internal cutouts</li>
                <li>Slots and holes</li>
                <li>Prototype components</li>
                <li>Repeat production</li>
                <li>B2B quantity orders</li>
              </ul>
            </div>

            <div className="cnc-custom-panel cnc-custom-panel--side">
              <span className="section-eyebrow">
                Related Fabrication
              </span>

              <h3>
                Need bending, bonding or complete fabrication too?
              </h3>

              <p>
                Explore the complete acrylic fabrication capabilities offered
                by Henil Enterprise.
              </p>

              <a href="/acrylic-fabrication-ahmedabad">
                Explore Acrylic Fabrication →
              </a>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="acrylic-cnc-cutting-industries">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                Industries
              </span>

              <h2>
                CNC fabrication for
                <em> industrial applications.</em>
              </h2>
            </div>

            <div className="cnc-industry-grid">
              {industries.map((industry) => (
                <a
                  href="/industries"
                  className="cnc-industry-item"
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
        <section className="acrylic-cnc-cutting-process">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">
                CNC Manufacturing Process
              </span>

              <h2>
                From digital drawing to
                <em> finished component.</em>
              </h2>

              <p>
                Our process is built around your component requirements,
                geometry and production quantity.
              </p>
            </div>

            <div className="cnc-process-grid">
              {processSteps.map((step) => (
                <article className="cnc-process-card" key={step.number}>
                  <span>{step.number}</span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="acrylic-cnc-cutting-faq">
          <div className="container acrylic-cnc-cutting-faq__grid">
            <div>
              <span className="section-eyebrow">
                FAQ
              </span>

              <h2>
                Acrylic CNC cutting
                <em> questions.</em>
              </h2>

              <p>
                Have a custom acrylic component? Send your drawing, dimensions
                or sample for review.
              </p>

              <a
                href="/quote?material=Acrylic&service=CNC%20Cutting"
                className="btn-primary"
              >
                Get a CNC Cutting Quote
              </a>
            </div>

            <div className="cnc-faq-list">
              {faqs.map((faq) => (
                <details className="cnc-faq-item" key={faq.question}>
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
        <section className="acrylic-cnc-cutting-related">
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

            <div className="cnc-related-grid">
              <a
                href="/acrylic-machine-guard-manufacturer-ahmedabad"
                className="cnc-related-card"
              >
                <span>01</span>
                <h3>Acrylic Machine Guards</h3>
                <p>
                  Custom transparent machine guards fabricated from acrylic
                  and polycarbonate.
                </p>
                <strong>Explore →</strong>
              </a>

              <a
                href="/acrylic-bending-ahmedabad"
                className="cnc-related-card"
              >
                <span>02</span>
                <h3>Acrylic Bending</h3>
                <p>
                  Formed acrylic components manufactured according to your
                  required geometry.
                </p>
                <strong>Explore →</strong>
              </a>

              <a
                href="/custom-acrylic-fabrication-ahmedabad"
                className="cnc-related-card"
              >
                <span>03</span>
                <h3>Custom Acrylic Fabrication</h3>
                <p>
                  Complete acrylic fabrication from drawing or sample to
                  finished component.
                </p>
                <strong>Explore →</strong>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="acrylic-cnc-cutting-cta">
          <div className="container">
            <span className="section-eyebrow">
              Need Acrylic CNC Cutting?
            </span>

            <h2>
              Send your drawing.
              <br />
              <em>Let's build the component.</em>
            </h2>

            <p>
              Share your CAD file, PDF drawing, dimensions or existing sample
              with Henil Enterprise for a custom CNC cutting quotation.
            </p>

            <a
              href="/quote?material=Acrylic&service=CNC%20Cutting"
              className="btn-primary"
            >
              Request CNC Cutting Quote
            </a>
          </div>
        </section>

      </main>
    </MainLayout>
  );
}