import "./GalleryHero.css";

export default function GalleryHero() {
  return (
    <section className="gallery-hero">
      <div className="container gallery-hero__inner">
        <span className="eyebrow">Our Work</span>
        <h1 className="gallery-hero__title">Inside the fabrication process.</h1>
        <p className="gallery-hero__sub">
          From raw sheet to dispatched component — browse by category, or view everything
          together. All work shown here is fabricated at our Ahmedabad facility.
        </p>
      </div>
    </section>
  );
}
