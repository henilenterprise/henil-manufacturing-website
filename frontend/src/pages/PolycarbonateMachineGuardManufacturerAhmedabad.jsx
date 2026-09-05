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

import "./PolycarbonateMachineGuardManufacturerAhmedabad.css";

const GUARD_TYPES = [
  {
    icon: Cog,
    title: "CNC Machine Guards",
    description:
      "Custom polycarbonate guarding fabricated around CNC machines and automated equipment where visibility and impact resistance are important.",
  },
  {
    icon: Shield,
    title: "Industrial Safety Guards",
    description:
      "Transparent protective panels designed for machinery and equipment requiring a clear physical barrier around operating areas.",
  },
  {
    icon: Layers,
    title: "Conveyor Guard Panels",
    description:
      "Polycarbonate panels fabricated for conveyor systems and production lines while maintaining visibility of the process.",
  },
  {
    icon: Eye,
    title: "Machine Inspection Windows",
    description:
      "Clear polycarbonate viewing windows for machine housings and equipment where operators need to monitor internal processes.",
  },
  {
    icon: Factory,
    title: "Equipment Enclosures",
    description:
      "Custom transparent enclosures and protective covers for industrial equipment, machinery and automated systems.",
  },
];

const BENEFITS = [
  "High impact resistance compared with acrylic",
  "Clear visibility of machinery and processes",
  "Custom dimensions and machine geometry",
  "CNC routing and precision cutting",
  "Custom holes, slots and profiles",
  "Bending and formed sections where suitable",
  "Bonded multi-part assemblies",
  "Prototype and quantity manufacturing",
];

const APPLICATIONS = [
  "CNC machinery",
  "Automated equipment",
  "Conveyor systems",
  "Production lines",
  "Machine protection",
  "Safety guarding",
  "Industrial enclosures",
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
    question: "Why use polycarbonate for a machine guard?",
    answer:
      "Polycarbonate is often selected when higher impact resistance is important while maintaining transparency and visibility of the machinery or process.",
  },
  {
    question: "Can you manufacture custom polycarbonate machine guards?",
    answer:
      "Yes. Henil Enterprise manufactures custom polycarbonate guards according to drawings, dimensions, samples and application requirements, including custom profiles and openings.",
  },
  {
    question: "Can polycarbonate guards be CNC cut?",
    answer:
      "Yes. Polycarbonate components can be precision cut and routed according to the approved drawing and required geometry.",
  },
  {
    question: "Can you bend polycarbonate machine guards?",
    answer:
      "Polycarbonate can be formed or bent for suitable designs. The required geometry, thickness and application are reviewed before manufacturing.",
  },
  {
    question: "Can you manufacture polycarbonate guards in quantity?",
    answer:
      "Yes. Henil Enterprise handles B2B requirements ranging from custom prototypes to quantity production, depending on the project requirements.",
  },
  {
    question: "Can acrylic and polycarbonate be used together?",
    answer:
      "Yes. Different materials can be considered for different parts of a machine guarding system depending on visibility, impact requirements, fabrication and design considerations.",
  },
];

export default function PolycarbonateMachineGuardManufacturerAhmedabad() {
  useSeo(SEO.polycarbonateMachineGuardManufacturerAhmedabad);

  useJsonLd(
    buildBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      {
        name: "Polycarbonate Machine Guard Manufacturer Ahmedabad",
        path: "/polycarbonate-machine-guard-manufacturer-ahmedabad",
      },
    ])
  );

  return (
    <MainLayout>
      <main className="poly-machine-guard-page">
        {/* HERO */}
        <section className="poly-machine-guard-hero">
          <div className="container poly-machine-guard-hero__inner">
            <Badge>Polycarbonate Machine Guard Manufacturer</Badge>

            <h1>
              Polycarbonate Machine Guard Manufacturer in{" "}
              <em>Ahmedabad.</em>
            </h1>

            <p className="poly-machine-guard-hero__lead">
              Custom transparent polycarbonate machine guards, safety panels
              and protective covers manufactured in Ahmedabad for CNC
              machinery, automation systems, production lines and industrial
              equipment.
            </p>

            <div className="poly-machine-guard-hero__actions">
              <Button
                href="/quote?material=Polycarbonate&product=cnc-machine-guard"
                variant="solid"
                size="lg"
                icon={ArrowRight}
              >
                Request a Quote
              </Button>

              <Button
                href="/polycarbonate-fabrication-ahmedabad"
                variant="ghost"
                size="lg"
              >
                Polycarbonate Fabrication
              </Button>
            </div>

            <div className="poly-machine-guard-hero__trust">
              <span>Custom Manufacturing</span>
              <span>•</span>
              <span>Drawing-Based Production</span>
              <span>•</span>
              <span>B2B Quantity Orders</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="section poly-machine-guard-intro">
          <div className="container poly-machine-guard-intro__grid">
            <div>
              <span className="eyebrow">Industrial Polycarbonate Guarding</span>

              <h2>
                Protective guarding with visibility and{" "}
                <em>impact resistance.</em>
              </h2>
            </div>

            <div>
              <p>
                Henil Enterprise manufactures custom polycarbonate machine
                guards in Ahmedabad for industrial machinery, CNC equipment,
                automation systems and production environments.
              </p>

              <p>
                Polycarbonate can be considered where a transparent protective
                barrier needs greater impact resistance than acrylic. Guards
                can be produced from your drawing, sample, dimensions or
                application requirements.
              </p>
            </div>
          </div>
        </section>

        {/* GUARD TYPES */}
        <section className="section poly-machine-guard-types">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">What We Manufacture</span>

              <h2>
                Custom polycarbonate guards for{" "}
                <em>industrial machinery.</em>
              </h2>

              <p>
                We fabricate individual protection panels, viewing windows,
                machine guards and complete transparent equipment enclosures
                according to the required geometry.
              </p>
            </div>

            <div className="poly-machine-guard-types__grid">
              {GUARD_TYPES.map((item) => {
                const Icon = item.icon;

                return (
                  <GlassCard
                    key={item.title}
                    className="poly-machine-guard-type-card"
                  >
                    <div className="poly-machine-guard-type-card__icon">
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

        {/* BENEFITS */}
        <section className="section poly-machine-guard-benefits">
          <div className="container poly-machine-guard-benefits__grid">
            <div className="poly-machine-guard-benefits__content">
              <span className="eyebrow">Why Polycarbonate</span>

              <h2>
                Built for applications where{" "}
                <em>impact resistance matters.</em>
              </h2>

              <p>
                Polycarbonate is commonly considered for transparent machine
                guarding where the application places greater importance on
                impact resistance while still requiring visibility.
              </p>

              <p>
                The final material and thickness should be selected according
                to the machine, operating environment, guard geometry and
                application requirements.
              </p>
            </div>

            <GlassCard className="poly-machine-guard-checklist">
              {BENEFITS.map((benefit) => (
                <div
                  className="poly-machine-guard-checklist__item"
                  key={benefit}
                >
                  <Check size={18} strokeWidth={2} />
                  <span>{benefit}</span>
                </div>
              ))}
            </GlassCard>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="section poly-machine-guard-applications">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Applications</span>

              <h2>
                Polycarbonate guarding for{" "}
                <em>industrial equipment.</em>
              </h2>
            </div>

            <div className="poly-machine-guard-tags">
              {APPLICATIONS.map((application) => (
                <div className="poly-machine-guard-tag" key={application}>
                  <Check size={16} />
                  <span>{application}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="section poly-machine-guard-capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Fabrication Capabilities</span>

              <h2>
                Polycarbonate fabrication from{" "}
                <em>cutting to assembly.</em>
              </h2>

              <p>
                Depending on the design, machine guards can combine cutting,
                routing, bending and bonding processes.
              </p>
            </div>

            <div className="poly-machine-guard-capabilities__grid">
              {[
                "CNC Routing",
                "Polycarbonate Cutting",
                "Precision Cutting",
                "Polycarbonate Bending",
                "Custom Cutouts",
                "Bonding",
                "Custom Fabrication",
                "Assembly",
              ].map((capability) => (
                <GlassCard
                  key={capability}
                  className="poly-machine-guard-capability-card"
                >
                  <Scissors size={20} strokeWidth={1.6} />
                  <span>{capability}</span>
                </GlassCard>
              ))}
            </div>

            <div className="poly-machine-guard-capabilities__cta">
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

        {/* ACRYLIC VS POLYCARBONATE */}
        <section className="section poly-machine-guard-comparison">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Material Selection</span>

              <h2>
                Acrylic or polycarbonate for your{" "}
                <em>machine guard?</em>
              </h2>

              <p>
                The correct material depends on the requirements of the
                application rather than simply choosing one material for every
                machine.
              </p>
            </div>

            <div className="poly-machine-guard-comparison__grid">
              <GlassCard>
                <h3>Acrylic Machine Guards</h3>

                <p>
                  Acrylic is often selected where excellent optical clarity,
                  appearance and clean fabrication are important.
                </p>

                <Button
                  href="/acrylic-machine-guard-manufacturer-ahmedabad"
                  variant="outline"
                  size="sm"
                  icon={ArrowRight}
                >
                  Explore Acrylic Guards
                </Button>
              </GlassCard>

              <GlassCard>
                <h3>Polycarbonate Machine Guards</h3>

                <p>
                  Polycarbonate can be considered where higher impact
                  resistance is an important requirement while maintaining
                  transparency.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="section poly-machine-guard-industries">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Industries Served</span>

              <h2>
                Polycarbonate guarding across{" "}
                <em>industrial sectors.</em>
              </h2>
            </div>

            <div className="poly-machine-guard-industries__grid">
              {INDUSTRIES.map((industry) => (
                <div key={industry} className="poly-machine-guard-industry">
                  <Factory size={18} strokeWidth={1.6} />
                  <span>{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section poly-machine-guard-process">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Manufacturing Process</span>

              <h2>
                From machine requirement to{" "}
                <em>finished guard.</em>
              </h2>
            </div>

            <div className="poly-machine-guard-process__grid">
              {[
                [
                  "01",
                  "Send Requirement",
                  "Share your drawing, sample, dimensions or machine details.",
                ],
                [
                  "02",
                  "Review Application",
                  "We review geometry, material requirements and fabrication details.",
                ],
                [
                  "03",
                  "Manufacturing",
                  "The required cutting, routing, bending and bonding operations are completed.",
                ],
                [
                  "04",
                  "Quality Check",
                  "Finished components are checked against the approved requirements.",
                ],
                [
                  "05",
                  "Dispatch",
                  "Completed machine guards are prepared for delivery.",
                ],
              ].map(([number, title, description]) => (
                <GlassCard
                  key={number}
                  className="poly-machine-guard-process-card"
                >
                  <span className="poly-machine-guard-process-card__number">
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
        <section className="section poly-machine-guard-faq">
          <div className="container poly-machine-guard-faq__inner">
            <div className="section-heading">
              <span className="eyebrow">FAQ</span>

              <h2>
                Polycarbonate machine guard{" "}
                <em>questions.</em>
              </h2>
            </div>

            <div className="poly-machine-guard-faq__list">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="poly-machine-guard-faq__item"
                >
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="section poly-machine-guard-related">
          <div className="container poly-machine-guard-related__grid">
            <GlassCard>
              <span className="eyebrow">Related Service</span>

              <h3>Polycarbonate Fabrication Ahmedabad</h3>

              <p>
                Explore our complete polycarbonate fabrication services,
                including cutting, bending, machine guards and custom
                components.
              </p>

              <Button
                href="/polycarbonate-fabrication-ahmedabad"
                variant="outline"
                size="md"
                icon={ArrowRight}
              >
                Explore Polycarbonate Fabrication
              </Button>
            </GlassCard>

            <GlassCard>
              <span className="eyebrow">Related Product</span>

              <h3>Polycarbonate Impact Panel</h3>

              <p>
                Explore custom polycarbonate impact panels for industrial
                equipment, enclosures and protective applications.
              </p>

              <Button
                href="/products/polycarbonate-impact-panel"
                variant="outline"
                size="md"
                icon={ArrowRight}
              >
                View Product
              </Button>
            </GlassCard>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section poly-machine-guard-final-cta">
          <div className="container">
            <div className="poly-machine-guard-final-cta__box">
              <span className="eyebrow">
                Request a Polycarbonate Guard Quote
              </span>

              <h2>
                Need a custom polycarbonate machine guard{" "}
                <em>in Ahmedabad?</em>
              </h2>

              <p>
                Send your drawing, dimensions, sample or machine requirement
                and our team can review the fabrication requirements for your
                project.
              </p>

              <Button
                href="/quote?material=Polycarbonate&product=cnc-machine-guard"
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