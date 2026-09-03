import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Clock, ArrowRight, Send } from "lucide-react";
import MainLayout from "../layouts/MainLayout.jsx";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import FinalCtaSection from "../sections/FinalCtaSection.jsx";
import { siteConfig } from "../config/site.config.js";
import { localBusiness } from "../config/localBusiness.config.js";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { SEO } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData, buildLocalBusinessStructuredData } from "../utils/structuredData.js";
import "./Contact.css";

// Honest limitation, matching this project's convention of saying so
// rather than pretending: the `contact_messages` table already exists
// in the database (see database/migrations), but no backend route or
// controller reads from it yet — see backend/src/routes for what's
// actually wired up today (health, inquiries, uploads; no contact
// route). Wiring this form to that table is real, but separate, work.
// Until then, submitting here opens the visitor's own email client with
// the message pre-filled — a genuinely working fallback rather than a
// form that silently goes nowhere. The /quote page remains the fully
// working, database-backed way to send a detailed requirement.
function buildMailtoHref({ name, email, phone, message }) {
  if (!siteConfig.email) return null;
  const subject = `Website enquiry from ${name || "a visitor"}`;
  const bodyLines = [
    message || "",
    "",
    "---",
    name && `Name: ${name}`,
    email && `Email: ${email}`,
    phone && `Phone: ${phone}`,
  ].filter(Boolean);
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    bodyLines.join("\n")
  )}`;
}

export default function Contact() {
  useSeo(SEO.contact);
  useJsonLd(buildBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]));
  // See Home.jsx — LocalBusiness is deliberately mounted only here and
  // on Home, not sitewide.
  useJsonLd(buildLocalBusinessStructuredData());

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  const mailtoHref = buildMailtoHref(form);

  function handleSubmit(e) {
    e.preventDefault();
    if (!mailtoHref) return;
    window.location.href = mailtoHref;
  }

  return (
    <MainLayout>
      <section className="contact-hero">
        <div className="container contact-hero__inner">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="contact-hero__title">
            Reach our <em>Ahmedabad</em> team directly.
          </h1>
          <p className="contact-hero__sub">
            Phone, email, WhatsApp, or a message below — however you'd rather start. For a
            fabrication requirement with a drawing or dimensions, our{" "}
            <a href="/quote">Get a Quote</a> form is the fastest path to a response. We work
            with businesses in Ahmedabad and Gujarat, and ship to customers across India.
          </p>
        </div>
      </section>

      <section className="section contact-page">
        <div className="container contact-page__grid">
          <div className="contact-page__info">
            <GlassCard className="contact-card" itemScope itemType="https://schema.org/LocalBusiness">
              <span className="eyebrow">Henil Enterprise</span>
              <meta itemProp="name" content={siteConfig.companyName} />

              <ul className="contact-card__list">
                {siteConfig.phone && (
                  <li>
                    <Phone size={17} strokeWidth={2} />
                    <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`} itemProp="telephone">
                      {siteConfig.phone}
                    </a>
                  </li>
                )}
                {siteConfig.email && (
                  <li>
                    <Mail size={17} strokeWidth={2} />
                    <a href={`mailto:${siteConfig.email}`} itemProp="email">
                      {siteConfig.email}
                    </a>
                  </li>
                )}
                {siteConfig.whatsapp.href && (
                  <li>
                    <MessageCircle size={17} strokeWidth={2} />
                    <a href={siteConfig.whatsapp.href} target="_blank" rel="noopener noreferrer">
                      WhatsApp Us
                    </a>
                  </li>
                )}
                <li itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <MapPin size={17} strokeWidth={2} />
                  <span>
                    <span itemProp="addressLocality">{localBusiness.city}</span>,{" "}
                    <span itemProp="addressRegion">{localBusiness.state}</span>,{" "}
                    <span itemProp="addressCountry">{localBusiness.country}</span>
                    {localBusiness.streetAddress && (
                      <>
                        <br />
                        <span itemProp="streetAddress">{localBusiness.streetAddress}</span>
                      </>
                    )}
                  </span>
                </li>
                <li>
                  <Clock size={17} strokeWidth={2} />
                  <span>{localBusiness.hoursNote}</span>
                </li>
              </ul>

              {!siteConfig.phone && !siteConfig.email && !siteConfig.whatsapp.href && (
                <p className="contact-card__note">
                  Contact details are configured via environment variables — see{" "}
                  <code>.env.example</code>.
                </p>
              )}
            </GlassCard>

            <div className="contact-map">
              <iframe
                title={`${siteConfig.companyName} location — ${localBusiness.city}, ${localBusiness.state}`}
                src={localBusiness.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <GlassPanel className="contact-page__form" eyebrow="Send a Message" title="Tell us what you need">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form__row">
                <Input variant="flat" id="contact-name" label="Name" value={form.name} onChange={set("name")} required />
                <Input
                  variant="flat"
                  id="contact-phone"
                  label={<>Phone<span className="contact-form__optional">Optional</span></>}
                  value={form.phone}
                  onChange={set("phone")}
                />
              </div>
              <Input
                variant="flat"
                id="contact-email"
                type="email"
                label="Email"
                value={form.email}
                onChange={set("email")}
                required
              />
              <div className="input-group">
                <label htmlFor="contact-message" className="input-group__label">Message</label>
                <textarea
                  id="contact-message"
                  className="contact-form__textarea"
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="What are you looking to fabricate?"
                  required
                />
              </div>
              <Button type="submit" variant="solid" size="lg" icon={Send} iconPosition="left" disabled={!mailtoHref}>
                Send Message
              </Button>
              {!mailtoHref && (
                <p className="contact-form__note">
                  Messaging isn't configured yet — please use WhatsApp or phone above, or{" "}
                  <a href="/quote">request a quote</a> instead.
                </p>
              )}
              <p className="contact-form__note">
                Opens your email app with this filled in — for a fabrication requirement, the{" "}
                <a href="/quote">quote form</a> reaches us directly instead.
              </p>
            </form>
          </GlassPanel>
        </div>

        <div className="container contact-page__related">
          <span className="contact-page__related-label">You might also want:</span>
          <nav className="contact-page__related-links" aria-label="Related pages">
            <a href="/capabilities">Fabrication Capabilities <ArrowRight size={13} /></a>
            <a href="/products">Product Categories <ArrowRight size={13} /></a>
            <a href="/industries">Industries We Serve <ArrowRight size={13} /></a>
            <a href="/faq">Frequently Asked Questions <ArrowRight size={13} /></a>
          </nav>
        </div>
      </section>

      <FinalCtaSection />
    </MainLayout>
  );
}
