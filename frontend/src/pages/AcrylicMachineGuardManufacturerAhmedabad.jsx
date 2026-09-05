import {
  ArrowRight,
  Check,
  Cog,
  Shield,
  Scissors,
  Layers,
  Eye,
  Factory,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";

import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";

import "./AcrylicMachineGuardManufacturerAhmedabad.css";

const GUARD_TYPES = [
  {
    icon: Cog,
    title: "CNC Machine Guards",
    description:
      "Transparent guards fabricated around CNC machines and automated equipment to provide visibility while separating operators from moving machinery.",
  },
  {
    icon: Shield,
    title: "Machine Protective Covers",
    description:
      "Custom acrylic and polycarbonate covers designed around machine components, assemblies and exposed equipment areas.",
  },
  {
    icon: Layers,
    title: "Conveyor Guard Panels",
    description:
      "Transparent guarding for conveyor systems and production lines, allowing operators to monitor processes without removing protection.",
  },
  {
    icon: Eye,
    title: "Inspection Windows",
    description:
      "Clear viewing panels and inspection windows fabricated into machine housings and equipment enclosures.",
  },
  {
    icon: Factory,
    title: "Transparent Equipment Enclosures",
    description:
      "Custom transparent housings for machinery and industrial equipment where protection and process visibility are both required.",
  },
];

const BENEFITS = [
  "Clear visibility of machinery and processes",
  "Custom dimensions, cutouts and mounting points",
  "Acrylic and polycarbonate material options",
  "CNC routing and precision cutting",
  "Acrylic and polycarbonate bending",
  "Bonded multi-part assemblies",
  "Suitable for prototype and quantity orders",
  "Manufactured from your drawing, sample or specification",
];

const APPLICATIONS = [
  "CNC machines",
  "Automated machinery",
  "Production lines",
  "Conveyor systems",
  "Industrial equipment",
  "Machine housings",
  "Operator protection areas",
  "Engineering equipment",
];

const INDUSTRIES = [
  "Pharmaceutical",
  "Engineering",
  "Machinery & Manufacturing",
  "Automotive",
  "Packaging",
  "Chemical",
  "Food Processing",
  "Industrial Equipment",
];

const FAQS = [
  {
    question: "Can Henil Enterprise manufacture machine guards from our drawing?",
    answer:
      "Yes. Machine guards can be manufactured from your engineering drawing, dimensions, sample or application requirements. Custom cutouts, mounting points and fabrication details can be incorporated according to the approved design.",
  },
  {
    question: "Do you manufacture acrylic and polycarbonate machine guards?",
    answer:
      "Yes. Henil Enterprise fabricates machine guards using acrylic and polycarbonate. Material selection can be based on the required visibility, appearance, fabrication requirements and application conditions.",
  },
  {
    question: "What is better for a machine guard, acrylic or polycarbonate?",
    answer:
      "Acrylic provides excellent optical clarity and a clean finished appearance, while polycarbonate is generally preferred when higher impact resistance is required. The suitable material depends on the machine and application.",
  },
  {
    question: "Can you bend acrylic and polycarbonate machine guards?",
    answer:
      "Yes. Acrylic and polycarbonate components can be fabricated with bends and formed sections where the design and material are suitable.",
  },
  {
    question: "Can you manufacture machine guards in quantity?",
    answer:
      "Yes. Henil Enterprise handles B2B manufacturing requirements ranging from custom prototypes to quantity production. Final quantities, dimensions and fabrication requirements can be reviewed before quotation.",
  },
  {
    question: "Can you add holes, slots and custom cutouts?",
    answer:
      "Yes. Custom holes, slots, profiles and cutouts can be produced according to the approved drawing or specification using the appropriate fabrication process.",
  },
];

export default function AcrylicMachineGuardManufacturerAhmedabad() {
  useSeo(SEO.acrylicMachineGuardManufacturerAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      {
        name: "Acrylic Machine Guard Manufacturer Ahmedabad",
        path: "/acrylic-machine-guard-manufacturer-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="machine-guard-page">
        {/* HERO */}
        <section className="machine-guard-hero">
          <div className="container machine-guard-hero__inner">
            <Badge>Acrylic Machine Guard Manufacturer</Badge>

            <h1>
              Acrylic Machine Guard Manufacturer in{" "}
              <em>Ahmedabad.</em>
            </h1>

            <p className="machine-guard-hero__lead">
              Custom transparent acrylic machine guards and protective covers
              manufactured in Ahmedabad for CNC machines, automated equipment,
              production lines and industrial machinery.
            </p>

            <div className="machine-guard-hero__actions">
              <Button
                href="/quote?product=cnc-machine-guard"
                variant="solid"
                size="lg"
                icon={ArrowRight}
              >
                Request a Quote
              </Button>

              <Button
                href="/products/cnc-machine-guard"
                variant="ghost"
                size="lg"
              >
                View CNC Machine Guard
              </Button>
            </div>

            <div className="machine-guard-hero__trust">
              <span>Custom Manufacturing</span>
              <span>•</span>
              <span>Drawing-Based Production</span>
              <span>•</span>
              <span>B2B Quantity Orders</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="section machine-guard-intro">
          <div className="container machine-guard-intro__grid">
            <div>
              <span className="eyebrow">Industrial Machine Guarding</span>

              <h2>
                Custom machine guards built around your{" "}
                <em>equipment.</em>
              </h2>
            </div>

            <div>
              <p>
                Henil Enterprise manufactures custom acrylic and polycarbonate
                machine guards in Ahmedabad for industrial machinery,
                automation systems, CNC equipment and production environments.
              </p>

              <p>
                Guards can be fabricated according to drawings, dimensions,
                samples and application requirements, including custom
                profiles, openings, mounting holes and formed sections.
              </p>
            </div>
          </div>
        </section>

        {/* GUARD TYPES */}
        <section className="section machine-guard-types">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">What We Manufacture</span>

              <h2>
                Machine guards for different{" "}
                <em>industrial applications.</em>
              </h2>

              <p>
                From individual viewing panels to complete transparent
                enclosures, we fabricate guarding solutions around your
                machine geometry.
              </p>
            </div>

            <div className="machine-guard-types__grid">
              {GUARD_TYPES.map((item) => {
                const Icon = item.icon;

                return (
                  <GlassCard
                    key={item.title}
                    className="machine-guard-type-card"
                  >
                    <div className="machine-guard-type-card__icon">
                      <Icon size={24} strokeWidth={1.6} />
                    </div>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="section machine-guard-benefits">
          <div className="container machine-guard-benefits__grid">
            <div className="machine-guard-benefits__content">
              <span className="eyebrow">Why Choose Custom Fabrication</span>

              <h2>
                Designed for visibility, fit and{" "}
                <em>practical machine protection.</em>
              </h2>

              <p>
                Industrial machine guards often need to fit around existing
                machinery, moving components and access points. Custom
                fabrication allows the guard to follow the required geometry
                rather than relying on a standard size.
              </p>

              <p>
                Acrylic is a strong option when optical clarity and appearance
                are important. Polycarbonate can be considered where higher
                impact resistance is required.
              </p>
            </div>

            <GlassCard className="machine-guard-checklist">
              {BENEFITS.map((benefit) => (
                <div className="machine-guard-checklist__item" key={benefit}>
                  <Check size={18} strokeWidth={2} />
                  <span>{benefit}</span>
                </div>
              ))}
            </GlassCard>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="section machine-guard-applications">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Applications</span>

              <h2>
                Transparent guarding for{" "}
                <em>industrial machinery.</em>
              </h2>
            </div>

            <div className="machine-guard-tags">
              {APPLICATIONS.map((application) => (
                <div className="machine-guard-tag" key={application}>
                  <Check size={16} />
                  <span>{application}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="section machine-guard-capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Manufacturing Capabilities</span>

              <h2>
                From cutting to complete{" "}
                <em>fabrication.</em>
              </h2>

              <p>
                Machine guards can combine multiple fabrication processes
                depending on the design and material.
              </p>
            </div>

            <div className="machine-guard-capabilities__grid">
              {[
                "CNC Routing",
                "Acrylic Cutting",
                "Polycarbonate Cutting",
                "Acrylic Bending",
                "Polycarbonate Bending",
                "Bonding",
                "Custom Fabrication",
              ].map((capability) => (
                <GlassCard
                  key={capability}
                  className="machine-guard-capability-card"
                >
                  <Scissors size={20} strokeWidth={1.6} />
                  <span>{capability}</span>
                </GlassCard>
              ))}
            </div>

            <div className="machine-guard-capabilities__cta">
              <Button
                href="/capabilities"
                variant="outline"
                size="md"
                icon={ArrowRight}
              >
                Explore Manufacturing Capabilities
              </Button>
            </div>
          </div>
        </section>

        {/* MATERIALS */}
        <section className="section machine-guard-materials">
          <div className="container machine-guard-materials__grid">
            <div>
              <span className="eyebrow">Material Selection</span>

              <h2>
                Acrylic or polycarbonate — selected for the{" "}
                <em>application.</em>
              </h2>
            </div>

            <div className="machine-guard-materials__cards">
              <GlassCard>
                <h3>Acrylic</h3>
                <p>
                  Suitable where optical clarity, appearance, lightweight
                  fabrication and clean visibility are important.
                </p>
              </GlassCard>

              <GlassCard>
                <h3>Polycarbonate</h3>
                <p>
                  Suitable for applications where higher impact resistance is
                  an important consideration alongside transparency.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="section machine-guard-industries">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Industries Served</span>

              <h2>
                Machine guarding for{" "}
                <em>industrial environments.</em>
              </h2>
            </div>

            <div className="machine-guard-industries__grid">
              {INDUSTRIES.map((industry) => (
                <div key={industry} className="machine-guard-industry">
                  <Factory size={18} strokeWidth={1.6} />
                  <span>{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section machine-guard-process">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Our Process</span>

              <h2>
                From your requirement to the{" "}
                <em>finished guard.</em>
              </h2>
            </div>

            <div className="machine-guard-process__grid">
              {[
                ["01", "Send Requirement", "Share your drawing, sample, dimensions or application details."],
                ["02", "Design Review", "We review geometry, material and fabrication requirements."],
                ["03", "Manufacturing", "The required cutting, routing, bending and bonding processes are completed."],
                ["04", "Quality Check", "Finished components are checked against the approved requirements."],
                ["05", "Dispatch", "Completed machine guards are prepared for delivery."],
              ].map(([number, title, description]) => (
                <GlassCard
                  key={number}
                  className="machine-guard-process-card"
                >
                  <span className="machine-guard-process-card__number">
                    {number}
                  </span>

                  <h3>{title}</h3>

                  <p>{description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section machine-guard-faq">
          <div className="container machine-guard-faq__inner">
            <div className="section-heading">
              <span className="eyebrow">FAQ</span>

              <h2>
                Acrylic machine guard{" "}
                <em>questions.</em>
              </h2>
            </div>

            <div className="machine-guard-faq__list">
              {FAQS.map((faq) => (
                <details key={faq.question} className="machine-guard-faq__item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="section machine-guard-related">
          <div className="container machine-guard-related__grid">
            <GlassCard>
              <span className="eyebrow">Related Product</span>

              <h3>CNC Machine Guard</h3>

              <p>
                Explore our dedicated CNC machine guard product page for
                transparent guarding fabricated for CNC and automated
                machinery.
              </p>

              <Button
                href="/products/cnc-machine-guard"
                variant="outline"
                size="md"
                icon={ArrowRight}
              >
                View Product
              </Button>
            </GlassCard>

            <GlassCard>
              <span className="eyebrow">Related Service</span>

              <h3>Acrylic Fabrication Ahmedabad</h3>

              <p>
                Learn more about our complete acrylic fabrication,
                cutting, bending, bonding and custom manufacturing services.
              </p>

              <Button
                href="/acrylic-fabrication-ahmedabad"
                variant="outline"
                size="md"
                icon={ArrowRight}
              >
                Explore Acrylic Fabrication
              </Button>
            </GlassCard>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section machine-guard-final-cta">
          <div className="container">
            <div className="machine-guard-final-cta__box">
              <span className="eyebrow">Request a Manufacturing Quote</span>

              <h2>
                Need a custom acrylic machine guard{" "}
                <em>in Ahmedabad?</em>
              </h2>

              <p>
                Send your drawing, dimensions, sample or requirement and our
                team can review the fabrication requirements for your machine
                guard.
              </p>

              <Button
                href="/quote?product=cnc-machine-guard"
                variant="solid"
                size="lg"
                icon={ArrowRight}
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}