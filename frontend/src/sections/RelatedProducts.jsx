import ProductCard from "../components/ProductCard.jsx";
import { getRelatedProducts } from "../data/products.data.js";
import "./RelatedProducts.css";

export default function RelatedProducts({ product }) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="section related-products">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Explore More</span>
          <h2 className="section__title">Related Products</h2>
        </div>
        <div className="related-products__grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
