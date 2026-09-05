import {
  ArrowRight,
  Check,
  Cog,
  Scissors,
  Shield,
  GitMerge,
  Layers,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";

import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";

import "./PolycarbonateFabricationAhmedabad.css";

const SERVICES = [
  {
    icon: Cog,
    title: "CNC Polycarbonate Cutting",
    text: "Precision-cut polycarbonate components produced from your drawings, dimensions or CAD files.",
  },
  {
    icon: Scissors,
    title: "Polycarbonate Cutting",
    text: "Polycarbonate sheets and components cut to required sizes and profiles for industrial applications.",
  },
  {
    icon: Layers,
    title: "Polycarbonate Bending",
    text: "Formed polycarbonate components manufactured to specified angles and machine requirements.",
  },
  {
    icon: Shield,
    title: "Machine Guards & Covers",
    text: "Transparent impact-resistant guards and covers designed to provide visibility and equipment protection.",
  },
  {
    icon: GitMerge,
    title: "Bonding & Assembly",
    text: "Multi-part polycarbonate assemblies fabricated according to your design and application.",
  },
];

const PRODUCTS = [
  "Polycarbonate machine guards",
  "Polycarbonate protective covers",
  "Polycarbonate impact panels",
  "Machine inspection windows",
  "Transparent equipment enclosures",
  "Polycarbonate structural components",
  "Custom fabricated polycarbonate parts",
  "Industrial safety panels",
];

const APPLICATIONS = [
  "Industrial machinery",
  "CNC and automated equipment",
  "Machine protection",
  "Safety guarding",
  "Production lines",
  "Engineering equipment",
  "Electrical and control equipment",
  "Industrial enclosures",
];

const INDUSTRIES = [
  "Pharmaceutical",
  "Engineering",
  "Machinery & Manufacturing",
  "Chemical",
  "Food Processing",
  "Packaging",
  "Automotive",
  "Industrial Equipment",
];

const FAQS = [
  {
    question: "What polycarbonate products can Henil Enterprise manufacture?",
    answer:
      "We manufacture custom polycarbonate machine guards, protective covers, impact panels, inspection windows, enclosures, structural components and other fabricated parts according to your drawing or specification.",
  },
  {
    question: "Can you fabricate polycarbonate parts from our drawing?",
    answer:
      "Yes. We manufacture custom components from drawings, dimensions, CAD files, samples or application requirements.",
  },
  {
    question: "Do you manufacture polycarbonate machine guards?",
    answer:
      "Yes. Polycarbonate is suitable for applications where transparency and impact resistance are important. We fabricate machine guards and protective panels to suit the required machine geometry.",
  },
  {
    question: "Can polycarbonate be bent or formed?",
    answer:
      "Yes. Polycarbonate components can be formed according to the required application and geometry. Our fabrication process can include bending, cutting, machining and assembly.",
  },
  {
    question: "Do you accept quantity orders?",
    answer:
      "Yes. Henil Enterprise works with businesses requiring both custom development and quantity production. Share your required quantity along with the drawing or specifications for a quotation.",
  },
];

export default function PolycarbonateFabricationAhmedabad() {
  useSeo(SEO.polycarbonateFabricationAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      {
        name: "Polycarbonate Fabrication Ahmedabad",
        path: "/polycarbonate-fabrication-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="poly-fabrication-page">
        {/* HERO */}
        <section className="poly-fabrication-hero">
          <div className="container poly-fabrication-hero__inner">
            <Badge>POLYCARBONATE FABRICATION • AHMEDABAD</Badge>

            <h1>
              Polycarbonate Fabrication in{" "}
              <em>Ahmedabad.</em>
            </h1>

            <p className="poly-fabrication-hero__lead">
              Custom polycarbonate components, machine guards, covers,
              impact panels and fabricated parts manufactured to your
              drawings, dimensions and application requirements by Henil
              Enterprise.
            </p>

            <div className="poly-fabrication-hero__actions">
              <Button
                href="/quote?material=Polycarbonate"
                variant="solid"
                size="lg"
                icon={ArrowRight}
              >
                Get a Quote
              </Button>

              <Button
                href="/products"
                variant="ghost"
                size="lg"
                icon={ArrowRight}
              >
                View Polycarbonate Products
              </Button>
            </div>

            <div className="poly-fabrication-hero__points">
              <span>
                <Check size={17} />
                Drawing based manufacturing
              </span>
              <span>
                <Check size={17} />
                Industrial applications
              </span>
              <span>
                <Check size={17} />
                B2B quantity orders
              </span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="section poly-fabrication-intro">
          <div className="container">
            <div className="poly-fabrication-section-heading">
              <span className="section-eyebrow">
                CUSTOM POLYCARBONATE FABRICATION
              </span>

              <h2>
                Polycarbonate components built for demanding applications.
              </h2>

              <p>
                Henil Enterprise provides custom polycarbonate fabrication
                in Ahmedabad for businesses that need transparent,
                protective and application-specific components. We work
                from your drawing, sample, dimensions or specification
                rather than limiting production to standard sizes.
              </p>
            </div>

            <div className="poly-fabrication-intro__grid">
              <GlassCard>
                <h3>Why polycarbonate?</h3>
                <p>
                  Polycarbonate is widely used where transparency,
                  toughness and impact resistance are important. It can be
                  fabricated into guards, covers, panels, windows and
                  custom components for industrial equipment.
                </p>
              </GlassCard>

              <GlassCard>
                <h3>Built to your requirement</h3>
                <p>
                  Each project can be developed around the machine,
                  equipment or assembly it needs to fit. Share your
                  drawing, dimensions, sample or quantity and we can
                  manufacture the required component.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section poly-fabrication-services">
          <div className="container">
            <div className="poly-fabrication-section-heading">
              <span className="section-eyebrow">
                MANUFACTURING CAPABILITIES
              </span>

              <h2>From sheet to finished component.</h2>

              <p>
                Our polycarbonate fabrication process can combine cutting,
                CNC routing, bending, machining, bonding and custom
                assembly depending on the component.
              </p>
            </div>

            <div className="poly-fabrication-services__grid">
              {SERVICES.map((service) => {
                const Icon = service.icon;

                return (
                  <GlassCard
                    key={service.title}
                    className="poly-fabrication-service"
                  >
                    <div className="poly-fabrication-service__icon">
                      <Icon size={23} strokeWidth={1.7} />
                    </div>

                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </GlassCard>
                );
              })}
            </div>

            <div className="poly-fabrication-centered-cta">
              <Button
                href="/capabilities"
                variant="ghost"
                size="md"
                icon={ArrowRight}
              >
                Explore All Manufacturing Capabilities
              </Button>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="section poly-fabrication-products">
          <div className="container">
            <div className="poly-fabrication-section-heading">
              <span className="section-eyebrow">WHAT WE FABRICATE</span>

              <h2>Custom polycarbonate products and components.</h2>
            </div>

            <div className="poly-fabrication-list-grid">
              {PRODUCTS.map((product) => (
                <div className="poly-fabrication-list-item" key={product}>
                  <Check size={18} />
                  <span>{product}</span>
                </div>
              ))}
            </div>

            <div className="poly-fabrication-centered-cta">
              <Button
                href="/products"
                variant="solid"
                size="md"
                icon={ArrowRight}
              >
                Explore Products
              </Button>
            </div>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="section poly-fabrication-applications">
          <div className="container">
            <div className="poly-fabrication-section-heading">
              <span className="section-eyebrow">APPLICATIONS</span>

              <h2>
                Polycarbonate fabrication for industrial equipment.
              </h2>

              <p>
                Components can be developed for applications where
                visibility and protection need to work together.
              </p>
            </div>

            <div className="poly-fabrication-list-grid">
              {APPLICATIONS.map((application) => (
                <div
                  className="poly-fabrication-list-item"
                  key={application}
                >
                  <Check size={18} />
                  <span>{application}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="section poly-fabrication-industries">
          <div className="container">
            <div className="poly-fabrication-section-heading">
              <span className="section-eyebrow">INDUSTRIES</span>

              <h2>Serving businesses across industrial sectors.</h2>

              <p>
                Our custom fabrication approach is suitable for companies
                requiring repeatable polycarbonate components for
                machinery, equipment and production environments.
              </p>
            </div>

            <div className="poly-fabrication-list-grid poly-fabrication-list-grid--four">
              {INDUSTRIES.map((industry) => (
                <div className="poly-fabrication-list-item" key={industry}>
                  <Check size={18} />
                  <span>{industry}</span>
                </div>
              ))}
            </div>

            <div className="poly-fabrication-centered-cta">
              <Button
                href="/industries"
                variant="ghost"
                size="md"
                icon={ArrowRight}
              >
                View Industries We Serve
              </Button>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section poly-fabrication-process">
          <div className="container">
            <div className="poly-fabrication-section-heading">
              <span className="section-eyebrow">OUR PROCESS</span>

              <h2>From your requirement to finished part.</h2>
            </div>

            <div className="poly-fabrication-process__grid">
              <GlassCard>
                <span className="poly-fabrication-process__number">
                  01
                </span>
                <h3>Share your requirement</h3>
                <p>
                  Send your drawing, CAD file, sample, dimensions or
                  application details.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="poly-fabrication-process__number">
                  02
                </span>
                <h3>Review & quotation</h3>
                <p>
                  We review the component requirements, material,
                  fabrication method and quantity.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="poly-fabrication-process__number">
                  03
                </span>
                <h3>Fabrication</h3>
                <p>
                  The component is cut, machined, bent, bonded or
                  assembled according to the requirement.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="poly-fabrication-process__number">
                  04
                </span>
                <h3>Inspection & dispatch</h3>
                <p>
                  Finished components are checked against the agreed
                  requirements before dispatch.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section poly-fabrication-faq">
          <div className="container">
            <div className="poly-fabrication-section-heading">
              <span className="section-eyebrow">
                FREQUENTLY ASKED QUESTIONS
              </span>

              <h2>Polycarbonate fabrication FAQs.</h2>
            </div>

            <div className="poly-fabrication-faq__list">
              {FAQS.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section poly-fabrication-final-cta">
          <div className="container">
            <GlassCard className="poly-fabrication-final-cta__card">
              <span className="section-eyebrow">
                HAVE A POLYCARBONATE REQUIREMENT?
              </span>

              <h2>Send us your drawing or requirement.</h2>

              <p>
                Tell us the dimensions, quantity, material requirements and
                application. Our Ahmedabad team can review the requirement
                and prepare a quotation.
              </p>

              <Button
                href="/quote?material=Polycarbonate"
                variant="solid"
                size="lg"
                icon={ArrowRight}
              >
                Request a Polycarbonate Quote
              </Button>
            </GlassCard>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}