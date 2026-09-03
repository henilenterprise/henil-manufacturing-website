import { ArrowRight } from "lucide-react";
import GlassCard from "./ui/GlassCard.jsx";
import Badge from "./ui/Badge.jsx";
import Button from "./ui/Button.jsx";
import ProductVisual from "./ProductVisual.jsx";
import { getCategoryById } from "../data/categories.data.js";
import "./ProductCard.css";

/**
 * Purely presentational — receives a product object as a prop and renders
 * it. No product data is defined here; it all comes from
 * frontend/src/data/products.data.js via whichever page/section passes it in.
 */
export default function ProductCard({ product }) {
  const category = getCategoryById(product.categoryId);

  return (
    <GlassCard className="product-card">
      <a href={`/products/${product.id}`} className="product-card__link">
        <ProductVisual categoryId={product.categoryId} />

        <div className="product-card__body">
          {category && (
            <Badge variant="outline" tone="accent" className="product-card__category">
              {category.label}
            </Badge>
          )}
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__description">{product.shortDescription}</p>

          <div className="product-card__applications">
            {product.applications.slice(0, 3).map((app) => (
              <span key={app} className="product-card__app-tag">{app}</span>
            ))}
          </div>
        </div>
      </a>

      <Button
        href={`/quote?productId=${encodeURIComponent(product.id)}&product=${encodeURIComponent(product.name)}&productUrl=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/products/${product.id}` : `/products/${product.id}`)}`}
        variant="solid"
        size="sm"
        icon={ArrowRight}
        className="product-card__cta"
      >
        Get a Quote
      </Button>
    </GlassCard>
  );
}
