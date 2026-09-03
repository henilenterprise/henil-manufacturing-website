import "./WhoWeAre.css";

export default function WhoWeAre() {
  return (
    <section className="section who-we-are">
      <div className="container who-we-are__inner">
        <div className="section__head">
          <span className="eyebrow">Who We Are</span>
          <h2 className="section__title">A fabricator, not a catalogue</h2>
        </div>
        <div className="who-we-are__body">
          <p>
            Henil Enterprise manufactures and fabricates acrylic and polycarbonate
            components for industrial and commercial customers, based in Ahmedabad,
            Gujarat. We work business-to-business — building components to a customer's
            drawing, dimensions, sample, or specification, rather than from a fixed retail
            catalogue.
          </p>
          <p>
            Our focus is quantity and repeat-order manufacturing — from a first prototype
            through to a standing production order — for companies that need consistent
            components on an ongoing basis, not a single retail purchase.
          </p>
        </div>
      </div>
    </section>
  );
}
