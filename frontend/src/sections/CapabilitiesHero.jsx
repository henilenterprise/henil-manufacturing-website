import DownloadBrochureButton from "../components/DownloadBrochureButton.jsx";
import "./CapabilitiesHero.css";

export default function CapabilitiesHero() {
  return (
    <section className="caps-hero">
      <div className="container caps-hero__inner">
        <span className="eyebrow">Manufacturing Capabilities</span>
        <h1 className="caps-hero__title">Eight processes, one finished part.</h1>
        <p className="caps-hero__sub">
          From a single routed panel to a fully bonded, multi-material assembly — explore
          each process below, or send your drawing straight through for a quote. All
          fabrication is carried out at our Ahmedabad facility.
        </p>
        <DownloadBrochureButton className="caps-hero__brochure" />
      </div>
    </section>
  );
}
