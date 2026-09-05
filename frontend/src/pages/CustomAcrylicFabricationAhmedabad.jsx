import MainLayout from "../layouts/MainLayout.jsx";
import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./CustomAcrylicFabricationAhmedabad.css";

const fabricationAreas = [
  {
    title: "Custom Acrylic Components",
    text: "Acrylic components manufactured according to your dimensions, drawings, samples and assembly requirements.",
  },
  {
    title: "Acrylic Machine Guards",
    text: "Transparent machine guards and protective covers fabricated for CNC machines, automation and industrial equipment.",
  },
  {
    title: "Acrylic Tanks",
    text: "Custom fabricated acrylic tanks built according to required dimensions, capacity and configuration.",
  },
  {
    title: "Acrylic Boxes & Enclosures",
    text: "Clear acrylic boxes, housings and transparent enclosures for industrial, commercial and equipment applications.",
  },
  {
    title: "Inspection Windows",
    text: "Viewing windows and transparent inspection components designed for machinery and enclosed equipment.",
  },
  {
    title: "Acrylic Fabricated Assemblies",
    text: "Multi-part acrylic assemblies manufactured through cutting, routing, bending, bonding and finishing.",
  },
];

const capabilities = [
  {
    title: "CNC Routing",
    text: "Precision profiles, cutouts, holes and complex shapes manufactured from your drawing.",
  },
  {
    title: "Acrylic Cutting",
    text: "Acrylic sheets cut to required dimensions for prototypes, components and quantity production.",
  },
  {
    title: "Acrylic Bending",
    text: "Acrylic formed to specified angles and shapes for covers, housings and fabricated assemblies.",
  },
  {
    title: "Laser Cutting",
    text: "Detailed acrylic geometries and smaller components produced with accurate cutting.",
  },
  {
    title: "Bonding",
    text: "Acrylic parts assembled into boxes, tanks, covers, housings and other fabricated structures.",
  },
  {
    title: "Custom Fabrication",
    text: "Complete fabrication from drawing, sample or specification through finished component.",
  },
];

const applications = [
  "Machine components",
  "Machine guards",
  "Equipment covers",
  "Transparent enclosures",
  "Acrylic tanks",
  "Inspection windows",
  "Process viewing components",
  "Control panel covers",
  "Industrial boxes",
  "Custom engineering parts",
  "Display components",
  "Protective covers",
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

const process = [
  {
    number: "01",
    title: "Send Your Requirement",
    text: "Share your drawing, sample, dimensions, photographs or application requirements with our team.",
  },
  {
    number: "02",
    title: "Requirement Review",
    text: "We review the geometry, material, thickness, fabrication method and quantity requirements.",
  },
  {
    number: "03",
    title: "Fabrication",
    text: "The component is manufactured using the appropriate cutting, routing, bending, bonding and fabrication processes.",
  },
  {
    number: "04",
    title: "Quality Check",
    text: "Dimensions, fit, finish and fabrication quality are checked before dispatch.",
  },
];

const faqs = [
  {
    question: "Can you manufacture acrylic parts from a drawing?",
    answer:
      "Yes. Custom acrylic components can be manufactured from technical drawings, dimensions, samples or clear specifications.",
  },
  {
    question: "Can you manufacture acrylic products in quantity?",
    answer:
      "Yes. Henil Enterprise works with B2B requirements ranging from prototypes and development parts to quantity production orders.",
  },
  {
    question: "Which acrylic fabrication processes do you provide?",
    answer:
      "Fabrication can include CNC routing, cutting, laser cutting, bending, bonding and complete custom assembly depending on the component.",
  },
  {
    question: "Can you make complex acrylic shapes?",
    answer:
      "Yes. CNC routing, cutting, bending and bonding can be combined to manufacture components with profiles, cutouts, holes, bends and multi-part assemblies.",
  },
  {
    question: "Can you fabricate acrylic machine guards?",
    answer:
      "Yes. Custom acrylic machine guards, transparent covers, inspection windows and equipment enclosures can be fabricated according to machine dimensions.",
  },
  {
    question: "Do you also work with polycarbonate?",
    answer:
      "Yes. Polycarbonate fabrication is also available for applications where its higher impact resistance is preferred.",
  },
];

export default function CustomAcrylicFabricationAhmedabad() {
  useSeo(SEO.customAcrylicFabricationAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      {
        name: "Custom Acrylic Fabrication Ahmedabad",
        path: "/custom-acrylic-fabrication-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      {/* HERO */}
      <section className="custom-acrylic-hero">
        <div className="container custom-acrylic-hero__inner">
          <span className="custom-acrylic-eyebrow">
            Custom Acrylic Manufacturing
          </span>

          <h1>
            Custom Acrylic Fabrication in <em>Ahmedabad.</em>
          </h1>

          <p className="custom-acrylic-hero__lead">
            Custom acrylic components, machine guards, tanks, boxes, covers,
            enclosures and fabricated parts manufactured from your drawing,
            sample or specification by Henil Enterprise.
          </p>

          <div className="custom-acrylic-hero__actions">
            <Link
              to="/quote?material=Acrylic&service=Custom%20Fabrication"
              className="custom-acrylic-btn custom-acrylic-btn--primary"
            >
              Get a Quote
            </Link>

            <Link
              to="/acrylic-fabrication-ahmedabad"
              className="custom-acrylic-btn custom-acrylic-btn--secondary"
            >
              Acrylic Fabrication
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="custom-acrylic-section custom-acrylic-intro">
        <div className="container custom-acrylic-intro__grid">
          <div>
            <span className="custom-acrylic-eyebrow">Built To Requirement</span>

            <h2>
              Acrylic fabrication based on your{" "}
              <em>drawing, sample or dimensions.</em>
            </h2>
          </div>

          <div className="custom-acrylic-intro__content">
            <p>
              Henil Enterprise manufactures custom acrylic products and
              components for businesses, machinery manufacturers, engineering
              companies and industrial applications in Ahmedabad and across
              India.
            </p>

            <p>
              Instead of limiting fabrication to standard sizes, components can
              be developed around your actual application, including required
              dimensions, cutouts, holes, bends, joints, mounting features and
              assembly requirements.
            </p>

            <p>
              Share your drawing, sample or requirement and we can evaluate the
              appropriate fabrication approach for your component.
            </p>
          </div>
        </div>
      </section>

      {/* FABRICATION AREAS */}
      <section className="custom-acrylic-section custom-acrylic-fabrication">
        <div className="container">
          <div className="custom-acrylic-heading">
            <span className="custom-acrylic-eyebrow">What We Fabricate</span>

            <h2>
              Custom acrylic products for{" "}
              <em>industrial applications.</em>
            </h2>

            <p>
              From individual components to complete fabricated assemblies,
              acrylic products can be manufactured according to your
              application and quantity requirements.
            </p>
          </div>

          <div className="custom-acrylic-card-grid">
            {fabricationAreas.map((item) => (
              <article className="custom-acrylic-card" key={item.title}>
                <span className="custom-acrylic-card__line" />

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="custom-acrylic-section custom-acrylic-applications">
        <div className="container custom-acrylic-split">
          <div>
            <span className="custom-acrylic-eyebrow">Applications</span>

            <h2>
              Where custom acrylic fabrication{" "}
              <em>can be used.</em>
            </h2>

            <p>
              Acrylic components can be fabricated for machinery, equipment,
              industrial processes, commercial environments and custom
              engineering requirements.
            </p>
          </div>

          <div className="custom-acrylic-tag-grid">
            {applications.map((application) => (
              <div className="custom-acrylic-tag" key={application}>
                {application}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="custom-acrylic-section custom-acrylic-capabilities">
        <div className="container">
          <div className="custom-acrylic-heading">
            <span className="custom-acrylic-eyebrow">Manufacturing Capabilities</span>

            <h2>
              From raw sheet to{" "}
              <em>finished fabricated component.</em>
            </h2>

            <p>
              Multiple fabrication processes can be combined depending on the
              geometry and requirements of your acrylic component.
            </p>
          </div>

          <div className="custom-acrylic-capability-grid">
            {capabilities.map((capability) => (
              <Link
                to="/capabilities"
                className="custom-acrylic-capability"
                key={capability.title}
              >
                <span className="custom-acrylic-capability__number">
                  {String(capabilities.indexOf(capability) + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </div>

                <span className="custom-acrylic-capability__arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIAL */}
      <section className="custom-acrylic-section custom-acrylic-material">
        <div className="container custom-acrylic-material__grid">
          <div>
            <span className="custom-acrylic-eyebrow">Material Selection</span>

            <h2>
              Acrylic fabrication with{" "}
              <em>polycarbonate options.</em>
            </h2>

            <p>
              Acrylic is often selected where transparency, appearance,
              machinability and fabricated form are important. For applications
              requiring higher impact resistance, polycarbonate may be a more
              suitable material.
            </p>

            <div className="custom-acrylic-material__links">
              <Link to="/acrylic-fabrication-ahmedabad">
                Acrylic Fabrication
              </Link>

              <Link to="/polycarbonate-fabrication-ahmedabad">
                Polycarbonate Fabrication
              </Link>
            </div>
          </div>

          <div className="custom-acrylic-material__comparison">
            <div>
              <strong>Acrylic</strong>
              <span>Clarity & appearance</span>
              <span>Fabrication flexibility</span>
              <span>Suitable for custom components</span>
            </div>

            <div>
              <strong>Polycarbonate</strong>
              <span>Higher impact resistance</span>
              <span>Machine protection applications</span>
              <span>Industrial guarding applications</span>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="custom-acrylic-section custom-acrylic-industries">
        <div className="container custom-acrylic-split">
          <div>
            <span className="custom-acrylic-eyebrow">Industries Served</span>

            <h2>
              Fabrication for{" "}
              <em>industrial and commercial requirements.</em>
            </h2>

            <p>
              Custom acrylic products can be manufactured for different
              industries where transparent components, covers, guards,
              enclosures or fabricated parts are required.
            </p>
          </div>

          <div className="custom-acrylic-industry-grid">
            {industries.map((industry) => (
              <div className="custom-acrylic-industry" key={industry}>
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="custom-acrylic-section custom-acrylic-process">
        <div className="container">
          <div className="custom-acrylic-heading">
            <span className="custom-acrylic-eyebrow">Our Process</span>

            <h2>
              From requirement to{" "}
              <em>finished acrylic component.</em>
            </h2>
          </div>

          <div className="custom-acrylic-process-grid">
            {process.map((step) => (
              <div className="custom-acrylic-process-card" key={step.number}>
                <span>{step.number}</span>

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="custom-acrylic-section custom-acrylic-faq">
        <div className="container custom-acrylic-faq__grid">
          <div>
            <span className="custom-acrylic-eyebrow">FAQ</span>

            <h2>
              Custom acrylic fabrication{" "}
              <em>questions.</em>
            </h2>

            <p>
              Have a specific component requirement? Send us your drawing,
              dimensions or sample for review.
            </p>
          </div>

          <div className="custom-acrylic-faq__list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="custom-acrylic-related">
        <div className="container">
          <span className="custom-acrylic-eyebrow">Explore More</span>

          <h2>
            Related acrylic{" "}
            <em>solutions.</em>
          </h2>

          <div className="custom-acrylic-related__grid">
            <Link to="/acrylic-machine-guard-manufacturer-ahmedabad">
              <strong>Acrylic Machine Guards</strong>
              <span>Custom guards and protective covers</span>
            </Link>

            <Link to="/acrylic-tank-manufacturer-ahmedabad">
              <strong>Acrylic Tanks</strong>
              <span>Custom fabricated acrylic tanks</span>
            </Link>

            <Link to="/acrylic-box-manufacturer-ahmedabad">
              <strong>Acrylic Boxes</strong>
              <span>Clear boxes and fabricated enclosures</span>
            </Link>

            <Link to="/acrylic-sight-glass-manufacturer-ahmedabad">
              <strong>Acrylic Sight Glasses</strong>
              <span>Transparent process viewing components</span>
            </Link>

            <Link to="/acrylic-inspection-window-manufacturer-ahmedabad">
              <strong>Inspection Windows</strong>
              <span>Custom machine viewing windows</span>
            </Link>

            <Link to="/acrylic-cnc-cutting-ahmedabad">
              <strong>Acrylic CNC Cutting</strong>
              <span>Precision CNC-cut acrylic components</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="custom-acrylic-final-cta">
        <div className="container">
          <span className="custom-acrylic-eyebrow">Have A Requirement?</span>

          <h2>
            Send your drawing.{" "}
            <em>We'll take it from there.</em>
          </h2>

          <p>
            Tell us what you need to manufacture, the required quantity and
            your material preference. Our team can review the requirement and
            help determine the appropriate fabrication approach.
          </p>

          <Link
            to="/quote?material=Acrylic&service=Custom%20Fabrication"
            className="custom-acrylic-btn custom-acrylic-btn--primary"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}