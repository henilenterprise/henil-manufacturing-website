import { useState } from "react";
import {
  ArrowRight,
  Search,
  Mail,
  Layers,
  Zap,
  Filter,
  MoreVertical,
  PackageSearch,
  Ruler,
} from "lucide-react";
import Logo from "../components/Logo.jsx";
import LogoLoader from "../components/LogoLoader.jsx";
import { useSeo } from "../hooks/useSeo.js";
import {
  GlassCard,
  GlassPanel,
  GlassModal,
  GlassNavbar,
  GlassBadge,
  NeoButton,
  NeoInput,
  NeoToggle,
  NeoControl,
  Button,
  Input,
  Card,
  Table,
  Badge,
  Dropdown,
  Select,
  Spinner,
  Skeleton,
  EmptyState,
  ErrorState,
  useToast,
} from "../components/ui/index.js";
import "./DesignSystem.css";

const COLOR_TOKENS = [
  { name: "Background", varName: "--color-bg" },
  { name: "Surface", varName: "--color-surface" },
  { name: "Glass", varName: "--color-glass" },
  { name: "Glass Border", varName: "--color-glass-border" },
  { name: "Primary Text", varName: "--color-text-primary" },
  { name: "Secondary Text", varName: "--color-text-secondary" },
  { name: "Muted Text", varName: "--color-text-muted" },
  { name: "Accent", varName: "--color-accent" },
  { name: "Success", varName: "--color-success" },
  { name: "Warning", varName: "--color-warning" },
  { name: "Error", varName: "--color-error" },
];

const SAMPLE_ROWS = [
  { id: 1, material: "Acrylic", thickness: "5mm", qty: "250 pcs", lead: "Sample" },
  { id: 2, material: "Polycarbonate", thickness: "8mm", qty: "120 pcs", lead: "Sample" },
  { id: 3, material: "Acrylic", thickness: "3mm", qty: "600 pcs", lead: "Sample" },
];

const NAV_LINKS = [
  { label: "Logo", href: "#logo" },
  { label: "Colors", href: "#colors" },
  { label: "Type", href: "#type" },
  { label: "Buttons", href: "#buttons" },
  { label: "Inputs", href: "#inputs" },
  { label: "Cards", href: "#cards" },
  { label: "Badges", href: "#badges" },
  { label: "Table", href: "#table" },
  { label: "Feedback", href: "#feedback" },
];

export default function DesignSystem() {
  useSeo({ title: "Design System | Henil Enterprise", path: "/design-system", noindex: true });

  return (
    <>
      <GlassNavbar
        brand="Design System"
        links={NAV_LINKS}
        cta={<Button variant="solid" size="sm">Get a Quote</Button>}
      />
      <main className="ds-page">
        <IntroSection />
        <LogoSection />
        <ColorsSection />
        <TypeSection />
        <ButtonsSection />
        <InputsSection />
        <CardsSection />
        <BadgesSection />
        <TableSection />
        <FeedbackSection />
      </main>
    </>
  );
}

function IntroSection() {
  return (
    <section className="ds-intro container">
      <span className="eyebrow">Henil Enterprise — Visual Design System</span>
      <h1 className="ds-intro__title">Brand System</h1>
      <p className="ds-intro__sub">
        Every color here traces back to the real logo — background and gold sampled directly
        from the artwork, not chosen from a mood board. Glassmorphism for surfaces that hold
        content, neomorphism for controls you press, both used with restraint so the site
        still reads as a serious industrial supplier to a procurement team, not a luxury
        storefront.
      </p>
    </section>
  );
}

function LogoSection() {
  const [showLoader, setShowLoader] = useState(false);

  const previewLoader = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 2600);
  };

  return (
    <section id="logo" className="ds-section container">
      <SectionHead eyebrow="Brand" title="Logo System" />
      <p className="ds-note ds-note--intro">
        The source file is a flat image with its background baked in — every placement below
        sits on a tile matching that exact background color (#161616) so there's never a
        visible seam, whatever surface it's dropped onto.
      </p>

      <div className="ds-logo-grid">
        <GlassCard className="ds-logo-card">
          <span className="eyebrow">Header</span>
          <div className="ds-logo-card__preview">
            <Logo variant="mark" size={44} />
          </div>
          <p className="ds-card-body">Mark only, compact — used in the navbar at 40–44px.</p>
        </GlassCard>

        <GlassCard className="ds-logo-card">
          <span className="eyebrow">Mobile</span>
          <div className="ds-logo-card__preview">
            <Logo variant="mark" size={32} />
          </div>
          <p className="ds-card-body">Same mark, smaller — 32px keeps the header compact on phones.</p>
        </GlassCard>

        <GlassCard className="ds-logo-card">
          <span className="eyebrow">Footer</span>
          <div className="ds-logo-card__preview">
            <Logo variant="full" size={90} />
          </div>
          <p className="ds-card-body">Full lockup with wordmark — used where there's more room.</p>
        </GlassCard>

        <GlassCard className="ds-logo-card">
          <span className="eyebrow">Favicon</span>
          <div className="ds-logo-card__preview ds-logo-card__preview--favicon">
            <img src="/favicon-32.png" alt="Favicon preview" width={32} height={32} />
            <img src="/favicon-16.png" alt="Favicon preview small" width={16} height={16} />
          </div>
          <p className="ds-card-body">
            Cropped to the mark and downsampled. At 16px the thin double-line diamond
            softens into a glow rather than a crisp outline — see the note below.
          </p>
        </GlassCard>
      </div>

      <GlassPanel eyebrow="Loading treatment" title="Full-screen splash">
        <p className="ds-card-body" style={{ marginBottom: "16px" }}>
          A fade-in plus a soft diagonal light sweep across the existing mark — no redrawn
          artwork, just motion layered on top of the real logo.
        </p>
        <Button variant="ghost" size="sm" onClick={previewLoader}>Preview loading treatment</Button>
      </GlassPanel>

      <div className="ds-logo-note">
        <strong>A real limitation worth flagging:</strong> the logo's diamond outline is drawn
        as two very thin parallel lines. That reads beautifully at header size, but at 16–32px
        (browser tabs, some mobile bookmarks) those thin lines blur together and the mark reads
        as a soft gold glow rather than a crisp diamond — visible in the favicon preview above.
        It's still recognizably "gold on dark" and functions fine as a tab icon, but if a
        pixel-perfect small icon matters, the fix is a simplified single-weight version of the
        mark from whoever designed the original artwork — not something to solve by further
        compressing this file.
      </div>

      {showLoader && <LogoLoader label="Previewing loading treatment…" />}
    </section>
  );
}

function ColorsSection() {
  return (
    <section id="colors" className="ds-section container">
      <SectionHead eyebrow="Tokens" title="Color" />
      <div className="ds-color-grid">
        {COLOR_TOKENS.map((c) => (
          <div className="ds-color-swatch" key={c.varName}>
            <div className="ds-color-swatch__chip" style={{ background: `var(${c.varName})` }} />
            <div>
              <span className="ds-color-swatch__name">{c.name}</span>
              <span className="ds-color-swatch__var">{c.varName}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TypeSection() {
  return (
    <section id="type" className="ds-section container">
      <SectionHead eyebrow="Tokens" title="Typography" />
      <GlassCard padding="lg" className="ds-type-card">
        <p className="ds-type-label">Display / Playfair Display</p>
        <h1 className="ds-type-sample ds-type-sample--h1">Acrylic &amp; Polycarbonate</h1>
        <h2 className="ds-type-sample ds-type-sample--h2">Fabricated to your drawing</h2>
        <h3 className="ds-type-sample ds-type-sample--h3">Manufacturing Capabilities</h3>
        <div className="ds-type-divider" />
        <p className="ds-type-label">Body / Inter</p>
        <p className="ds-type-sample ds-type-sample--body">
          Custom fabrication for machine builders, OEMs and industrial companies — quoted
          against your drawing, not a fixed catalogue.
        </p>
        <div className="ds-type-divider" />
        <p className="ds-type-label">Mono / IBM Plex Mono — used for specs, data, labels</p>
        <p className="ds-type-sample ds-type-sample--mono">THK 5MM · QTY 250 · MATERIAL ACRYLIC</p>
      </GlassCard>
    </section>
  );
}

function ButtonsSection() {
  return (
    <section id="buttons" className="ds-section container">
      <SectionHead eyebrow="Components" title="Buttons" />
      <div className="ds-row-wrap">
        <Button variant="solid" icon={ArrowRight}>Get a Quote</Button>
        <Button variant="ghost">Send RFQ</Button>
        <Button variant="glass">View Capabilities</Button>
        <Button variant="solid" size="sm">Small</Button>
        <Button variant="solid" size="lg">Large</Button>
      </div>
      <p className="ds-note">Neomorphic (tactile — for toolbars, filters, icon actions):</p>
      <div className="ds-row-wrap">
        <NeoButton icon={Filter}>Filter</NeoButton>
        <NeoButton icon={Layers} active>Layers</NeoButton>
        <NeoButton icon={MoreVertical} size="sm" aria-label="More options" />
      </div>
    </section>
  );
}

function InputsSection() {
  const [toggleOn, setToggleOn] = useState(true);
  const [material, setMaterial] = useState("acrylic");
  const [country, setCountry] = useState("in");

  return (
    <section id="inputs" className="ds-section container">
      <SectionHead eyebrow="Components" title="Inputs & Controls" />
      <div className="ds-inputs-grid">
        <Input variant="flat" label="Company Name" placeholder="Acme Engineering Pvt. Ltd." icon={Mail} />
        <Input variant="glass" label="Search Products" placeholder="e.g. machine guard" icon={Search} />
        <NeoInput label="Quantity" placeholder="250" icon={Ruler} />
        <Select
          label="Country"
          value={country}
          onChange={setCountry}
          options={[
            { label: "India", value: "in" },
            { label: "UAE", value: "ae" },
            { label: "Other", value: "other" },
          ]}
        />
      </div>
      <div className="ds-row-wrap ds-row-wrap--top">
        <NeoControl
          options={[
            { label: "Acrylic", value: "acrylic" },
            { label: "Polycarbonate", value: "polycarbonate" },
          ]}
          value={material}
          onChange={setMaterial}
        />
        <NeoToggle label="Email me updates" checked={toggleOn} onChange={setToggleOn} />
      </div>
    </section>
  );
}

function CardsSection() {
  return (
    <section id="cards" className="ds-section container">
      <SectionHead eyebrow="Components" title="Cards & Panels" />
      <div className="ds-cards-grid">
        <GlassCard>
          <span className="eyebrow">Glass Card</span>
          <p className="ds-card-body">
            Translucent, blurred, gold hairline border. Use for product tiles and content
            cards inside a section.
          </p>
        </GlassCard>
        <Card>
          <span className="eyebrow">Solid Card</span>
          <p className="ds-card-body">
            Opaque surface for dense or critical content — spec tables, RFQ summaries —
            where full legibility matters more than depth.
          </p>
        </Card>
      </div>
      <GlassPanel
        eyebrow="Glass Panel"
        title="Section-scale container"
        actions={<Button variant="ghost" size="sm">Action</Button>}
      >
        <p className="ds-card-body">
          A larger glass surface for wrapping a whole block of content — a form, a full
          capability breakdown — rather than a single small card.
        </p>
      </GlassPanel>
    </section>
  );
}

function BadgesSection() {
  const tones = ["neutral", "accent", "success", "warning", "error"];
  return (
    <section id="badges" className="ds-section container">
      <SectionHead eyebrow="Components" title="Badges" />
      <div className="ds-badge-block">
        <p className="ds-note">Outline</p>
        <div className="ds-row-wrap">
          {tones.map((t) => <Badge key={t} variant="outline" tone={t}>{t}</Badge>)}
        </div>
      </div>
      <div className="ds-badge-block">
        <p className="ds-note">Solid</p>
        <div className="ds-row-wrap">
          {tones.map((t) => <Badge key={t} variant="solid" tone={t}>{t}</Badge>)}
        </div>
      </div>
      <div className="ds-badge-block">
        <p className="ds-note">Glass (GlassBadge)</p>
        <div className="ds-row-wrap">
          {tones.map((t) => <GlassBadge key={t} tone={t}>{t}</GlassBadge>)}
        </div>
      </div>
    </section>
  );
}

function TableSection() {
  return (
    <section id="table" className="ds-section container">
      <SectionHead eyebrow="Components" title="Table" />
      <p className="ds-note">Sample data for design system reference only.</p>
      <Table
        columns={[
          { key: "material", label: "Material" },
          { key: "thickness", label: "Thickness" },
          { key: "qty", label: "Quantity" },
          { key: "lead", label: "Lead Time" },
        ]}
        rows={SAMPLE_ROWS}
      />
    </section>
  );
}

function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownDemo, setDropdownDemo] = useState("Choose an action");
  const { showToast } = useToast();

  return (
    <section id="feedback" className="ds-section container">
      <SectionHead eyebrow="Components" title="Feedback & States" />

      <div className="ds-feedback-grid">
        <GlassCard>
          <span className="eyebrow">Modal</span>
          <div className="ds-card-body">
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
          </div>
        </GlassCard>

        <GlassCard>
          <span className="eyebrow">Toast</span>
          <div className="ds-row-wrap ds-row-wrap--top">
            <NeoButton size="sm" onClick={() => showToast("Quote request sent", { tone: "success" })}>
              Success
            </NeoButton>
            <NeoButton size="sm" onClick={() => showToast("Drawing file is large", { tone: "warning" })}>
              Warning
            </NeoButton>
            <NeoButton size="sm" onClick={() => showToast("Upload failed", { tone: "error" })}>
              Error
            </NeoButton>
          </div>
        </GlassCard>

        <GlassCard>
          <span className="eyebrow">Dropdown</span>
          <div className="ds-card-body">
            <Dropdown
              trigger={dropdownDemo}
              items={[
                { label: "Download brochure", onSelect: () => setDropdownDemo("Download brochure") },
                { label: "Duplicate RFQ", onSelect: () => setDropdownDemo("Duplicate RFQ") },
                { label: "Delete draft", onSelect: () => setDropdownDemo("Delete draft"), danger: true },
              ]}
            />
          </div>
        </GlassCard>

        <GlassCard>
          <span className="eyebrow">Loading</span>
          <div className="ds-card-body">
            <Spinner label="Fetching quote status…" />
            <div style={{ marginTop: "16px" }}>
              <Skeleton lines={3} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="ds-feedback-grid__wide">
          <span className="eyebrow">Empty state</span>
          <EmptyState
            icon={PackageSearch}
            title="No products match your filters"
            description="Try a different material or clear your filters to see the full catalogue."
            action={<Button variant="ghost" size="sm">Clear filters</Button>}
          />
        </GlassCard>

        <GlassCard className="ds-feedback-grid__wide">
          <span className="eyebrow">Error state</span>
          <ErrorState
            description="We couldn't load your saved RFQ drafts. Check your connection and try again."
            onRetry={() => showToast("Retrying…", { tone: "neutral" })}
          />
        </GlassCard>
      </div>

      <GlassModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request a Callback"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button
              variant="solid"
              size="sm"
              icon={Zap}
              onClick={() => {
                setModalOpen(false);
                showToast("We'll call you back shortly", { tone: "success" });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p>Leave your number and a materials specialist will call you back within one business day.</p>
        <div style={{ marginTop: "16px" }}>
          <Input variant="flat" label="Phone Number" placeholder="+91 98XXXXXXXX" />
        </div>
      </GlassModal>
    </section>
  );
}

function SectionHead({ eyebrow, title }) {
  return (
    <div className="ds-section__head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="ds-section__title">{title}</h2>
    </div>
  );
}
