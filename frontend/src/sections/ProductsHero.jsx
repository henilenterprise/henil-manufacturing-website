import DownloadBrochureButton from "../components/DownloadBrochureButton.jsx";
import "./ProductsHero.css";

export default function ProductsHero() {
  return (
    <section className="products-hero">
      <div className="container products-hero__inner">
        <span className="eyebrow">Product Catalogue</span>
        <h1 className="products-hero__title">Acrylic &amp; polycarbonate, by category.</h1>
        <p className="products-hero__sub">
          Browse by category or search directly — every listing here can also be built as a
          custom fabrication if what you need isn't shown. Fabricated in Ahmedabad, Gujarat,
          for customers across India.
        </p>
        <DownloadBrochureButton className="products-hero__brochure" />
      </div>
    </section>
  );
}
