 import MainLayout from "../layouts/MainLayout.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import { ArrowRight, Check, Cog, Scissors, Shield, GitMerge, Wrench } from "lucide-react";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./AcrylicFabricationAhmedabad.css";

const SERVICES = [
  {
    title: "CNC Routing",
    description:
      "Precision CNC routing for acrylic panels, machine components, cut-outs and custom profiles manufactured from your drawings.",
    icon: Cog,
  },
  {
    title: "Acrylic Cutting",
    description:
      "Accurate acrylic cutting to specified dimensions for industrial components, panels, boxes and fabricated assemblies.",
    icon: Scissors,
  },
  {
    title: "Acrylic Bending",
    description:
      "Custom acrylic bending and forming for guards, covers, enclosures and other fabricated components.",
    icon: Shield,
  },
  {
    title: "Bonding",
    description:
      "Clean and precise bonding of acrylic components for boxes, tanks, covers, enclosures and multi-part assemblies.",
    icon: GitMerge,
  },
  {
    title: "Custom Fabrication",
    description:
      "Complete acrylic fabrication based on your drawing, sample, dimensions or application requirements.",
    icon: Wrench,
  },
];

const PRODUCTS = [
  "Acrylic Machine Guards",
  "Custom Acrylic Tanks",
  "Acrylic Boxes",
  "Acrylic Inspection Windows",
  "Acrylic Sight Glasses",
  "Transparent Equipment Enclosures",
  "Custom Acrylic Components",
  "Machine Covers & Panels",
];

const INDUSTRIES = [
  "Pharmaceutical",
  "Engineering",
  "Machinery & Manufacturing",
  "Chemical",
  "Food Processing",
  "Packaging",
  "Industrial Equipment",
  "Commercial & Retail",
];

const PROCESS = [
  {
    number: "01",
    title: "Send Your Requirement",
    description:
      "Share your drawing, dimensions, sample, photographs or technical requirements with our team.",
  },
  {
    number: "02",
    title: "Requirement Review",
    description:
      "We review the application, material, dimensions and fabrication requirements before production.",
  },
  {
    number: "03",
    title: "Manufacturing",
    description:
      "The component is cut, routed, bent, bonded and fabricated according to the approved requirement.",
  },
  {
    number: "04",
    title: "Quality Check",
    description:
      "Finished components are checked against the required dimensions and fabrication specifications.",
  },
];

const FAQS = [
  {
    question: "What type of acrylic fabrication does Henil Enterprise provide?",
    answer:
      "Henil Enterprise provides custom acrylic fabrication including CNC routing, cutting, bending, bonding and complete fabrication of industrial and commercial acrylic components.",
  },
  {
    question: "Can you manufacture acrylic products from a drawing?",
    answer:
      "Yes. Components can be manufactured from customer drawings, dimensions, samples or application requirements, depending on the project.",
  },
  {
    question: "Do you manufacture acrylic machine guards?",
    answer:
      "Yes. Henil Enterprise manufactures custom acrylic and transparent machine guards designed around the dimensions and geometry of industrial machinery.",
  },
  {
    question: "Do you accept quantity orders?",
    answer:
      "Yes. Henil Enterprise focuses on B2B manufacturing and can produce custom acrylic components for quantity requirements.",
  },
  {
    question: "Where is Henil Enterprise located?",
    answer:
      "Henil Enterprise is based in Ahmedabad, Gujarat and provides custom acrylic and polycarbonate fabrication for businesses across India.",
  },
];

export default function AcrylicFabricationAhmedabad() {
  useSeo(SEO.acrylicFabricationAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      {
        name: "Acrylic Fabrication Ahmedabad",
        path: "/acrylic-fabrication-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="acrylic-fab-page">
        {/* HERO */}
        <section className="acrylic-fab-hero">
          <div className="container acrylic-fab-hero__inner">
            <div className="acrylic-fab-hero__content">
              <Badge variant="outline" tone="accent">
                Acrylic Fabrication • Ahmedabad
              </Badge>

              <h1>
                Acrylic Fabrication in{" "}
                <em>Ahmedabad.</em>
              </h1>

              <p className="acrylic-fab-hero__lead">
                Custom acrylic components, guards, covers, tanks, boxes and
                fabricated parts manufactured to your drawings, dimensions
                and requirements by Henil Enterprise.
              </p>

              <div className="acrylic-fab-hero__actions">
                <Button
                  href="/quote"
                  variant="solid"
                  size="lg"
                  icon={ArrowRight}
                >
                  Get a Quote
                </Button>

                <Button
                  href="/products"
                  variant="outline"
                  size="lg"
                  icon={ArrowRight}
                >
                  View Acrylic Products
                </Button>
              </div>

              <div className="acrylic-fab-hero__trust">
                <span>
                  <Check size={17} />
                  Custom manufacturing
                </span>

                <span>
                  <Check size={17} />
                  Drawing & sample based
                </span>

                <span>
                  <Check size={17} />
                  B2B quantity orders
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="section acrylic-fab-intro">
          <div className="container acrylic-fab-intro__grid">
            <div>
              <span className="section-eyebrow">
                Custom Acrylic Manufacturing
              </span>

              <h2>
                Industrial acrylic fabrication built around your
                requirement.
              </h2>
            </div>

            <div className="acrylic-fab-intro__copy">
              <p>
                Henil Enterprise manufactures custom acrylic components for
                machinery, equipment, industrial processes, commercial
                applications and other engineering requirements.
              </p>

              <p>
                Instead of limiting fabrication to standard sizes, we work
                from your drawing, sample, dimensions or specification to
                produce components suited to the intended application.
              </p>

              <p>
                Our fabrication capabilities include CNC routing, cutting,
                bending, bonding and complete custom fabrication in acrylic
                and polycarbonate.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section acrylic-fab-services">
          <div className="container">
            <div className="acrylic-fab-section-heading">
              <span className="section-eyebrow">
                Fabrication Capabilities
              </span>

              <h2>How We Fabricate Acrylic Components</h2>

              <p>
                From precision cutting to complete fabricated assemblies,
                each process is selected according to the component and
                application.
              </p>
            </div>

            <div className="acrylic-fab-services__grid">
              {SERVICES.map((service) => {
                const Icon = service.icon;

                return (
                  <GlassCard
                    key={service.title}
                    className="acrylic-fab-service"
                  >
                    <div className="acrylic-fab-service__icon">
                      <Icon size={22} strokeWidth={1.7} />
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <a href="/capabilities">
                      Explore capability
                      <ArrowRight size={16} />
                    </a>
                  </GlassCard>
                );
              })}
            </div>

            <div className="acrylic-fab-section-cta">
              <Button
                href="/capabilities"
                variant="outline"
                size="md"
                icon={ArrowRight}
              >
                Explore All Capabilities
              </Button>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="section acrylic-fab-products">
          <div className="container">
            <div className="acrylic-fab-section-heading">
              <span className="section-eyebrow">
                What We Manufacture
              </span>

              <h2>Custom Acrylic Products & Components</h2>

              <p>
                Our acrylic fabrication capabilities can be applied to a
                wide range of industrial, engineering and commercial
                components.
              </p>
            </div>

            <div className="acrylic-fab-products__grid">
              {PRODUCTS.map((product) => (
                <a
                  key={product}
                  href="/products"
                  className="acrylic-fab-product-link"
                >
                  <span className="acrylic-fab-product-link__check">
                    <Check size={16} />
                  </span>

                  <span>{product}</span>

                  <ArrowRight size={16} />
                </a>
              ))}
            </div>

            <div className="acrylic-fab-section-cta">
              <Button
                href="/products"
                variant="solid"
                size="md"
                icon={ArrowRight}
              >
                Browse All Products
              </Button>
            </div>
          </div>
        </section>

        {/* WHY HENIL */}
        <section className="section acrylic-fab-why">
          <div className="container acrylic-fab-why__grid">
            <div>
              <span className="section-eyebrow">
                Why Henil Enterprise
              </span>

              <h2>
                A practical fabrication partner for B2B requirements.
              </h2>

              <p>
                We work with businesses that require custom fabricated
                acrylic and polycarbonate components rather than
                off-the-shelf products.
              </p>
            </div>

            <div className="acrylic-fab-why__list">
              <div>
                <Check size={19} />
                <span>Manufacturing based on drawings and samples</span>
              </div>

              <div>
                <Check size={19} />
                <span>Custom dimensions and fabrication requirements</span>
              </div>

              <div>
                <Check size={19} />
                <span>CNC routing and precision cutting</span>
              </div>

              <div>
                <Check size={19} />
                <span>Acrylic bending and bonding</span>
              </div>

              <div>
                <Check size={19} />
                <span>Industrial and commercial applications</span>
              </div>

              <div>
                <Check size={19} />
                <span>B2B quantity manufacturing</span>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="section acrylic-fab-industries">
          <div className="container">
            <div className="acrylic-fab-section-heading">
              <span className="section-eyebrow">
                Industries We Serve
              </span>

              <h2>Acrylic Components for Different Industries</h2>

              <p>
                Custom fabricated acrylic components can be developed for
                machinery, manufacturing, engineering and other business
                applications.
              </p>
            </div>

            <div className="acrylic-fab-industries__grid">
              {INDUSTRIES.map((industry) => (
                <a
                  key={industry}
                  href="/industries"
                  className="acrylic-fab-industry"
                >
                  {industry}
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section acrylic-fab-process">
          <div className="container">
            <div className="acrylic-fab-section-heading">
              <span className="section-eyebrow">
                Our Process
              </span>

              <h2>From Drawing to Finished Component</h2>

              <p>
                A straightforward process keeps custom fabrication aligned
                with your technical requirements.
              </p>
            </div>

            <div className="acrylic-fab-process__grid">
              {PROCESS.map((step) => (
                <GlassCard
                  key={step.number}
                  className="acrylic-fab-process__card"
                >
                  <span className="acrylic-fab-process__number">
                    {step.number}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section acrylic-fab-faq">
          <div className="container acrylic-fab-faq__layout">
            <div>
              <span className="section-eyebrow">
                Frequently Asked Questions
              </span>

              <h2>Acrylic Fabrication FAQs</h2>

              <p>
                Common questions about custom acrylic manufacturing,
                fabrication and B2B orders.
              </p>
            </div>

            <div className="acrylic-fab-faq__list">
              {FAQS.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <ArrowRight size={17} />
                  </summary>

                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section acrylic-fab-final">
          <div className="container">
            <GlassCard className="acrylic-fab-final__card">
              <span className="section-eyebrow">
                Start Your Project
              </span>

              <h2>
                Need a custom acrylic component?
              </h2>

              <p>
                Send us your drawing, sample, dimensions or requirement and
                our team can review the fabrication requirement with you.
              </p>

              <div className="acrylic-fab-final__actions">
                <Button
                  href="/quote"
                  variant="solid"
                  size="lg"
                  icon={ArrowRight}
                >
                  Request a Quote
                </Button>

                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  icon={ArrowRight}
                >
                  Contact Henil Enterprise
                </Button>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}