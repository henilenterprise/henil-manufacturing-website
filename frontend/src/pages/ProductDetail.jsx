import { useParams } from "react-router-dom";
import { ArrowRight, PackageX } from "lucide-react";
import MainLayout from "../layouts/MainLayout.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import ProductGallery from "../components/ProductGallery.jsx";
import StickyInquiryPanel from "../components/StickyInquiryPanel.jsx";
import MobileStickyCTA from "../components/MobileStickyCTA.jsx";
import RelatedProducts from "../sections/RelatedProducts.jsx";
import { getProductById } from "../data/products.data.js";
import { getCategoryById } from "../data/categories.data.js";
import { PRODUCT_POLICY } from "../data/productPolicy.data.js";
import { useSeo } from "../hooks/useSeo.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { buildProductSeo } from "../config/seo.config.js";
import { buildBreadcrumbStructuredData, buildProductStructuredData } from "../utils/structuredData.js";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductById(slug);
  const category = product ? getCategoryById(product.categoryId) : null;

  useSeo(product ? buildProductSeo(product, category) : { title: "Product not found | Henil Enterprise", noindex: true });
  useJsonLd(
    product
      ? buildBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          ...(category ? [{ name: category.label, path: "/products" }] : []),
          { name: product.name, path: `/products/${product.id}` },
        ])
      : null
  );
  useJsonLd(product ? buildProductStructuredData(product, category) : null);

  if (!product) {
    return (
      <MainLayout>
        <div className="container product-not-found">
          <PackageX size={40} strokeWidth={1.5} />
          <h1>Product not found</h1>
          <p>We couldn't find a product at this address. It may have been renamed or removed.</p>
          <Button href="/products" variant="solid" icon={ArrowRight}>
            Browse all products
          </Button>
        </div>
      </MainLayout>
    );
  }

  // The quote form reads these to automatically know which product the
  // inquiry is for — no manual re-entry needed on the visitor's part.
  const productUrl = typeof window !== "undefined" ? `${window.location.origin}/products/${product.id}` : `/products/${product.id}`;
  const quoteHref = `/quote?productId=${encodeURIComponent(product.id)}&product=${encodeURIComponent(product.name)}&productUrl=${encodeURIComponent(productUrl)}`;

  return (
    <MainLayout>
      <div className="container product-detail">
        <nav className="product-detail__breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          {category && (
            <>
              <span>/</span>
              <span>{category.label}</span>
            </>
          )}
          <span>/</span>
          <span className="product-detail__breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail__layout">
          <div className="product-detail__main">
            <ProductGallery categoryId={product.categoryId} />

            <div className="product-detail__header">
              {category && (
                <Badge variant="outline" tone="accent">{category.label}</Badge>
              )}
              <h1 className="product-detail__name">{product.name}</h1>
              <p className="product-detail__description">{product.shortDescription}</p>
            </div>

            <div className="product-detail__blocks">
              <DetailCard label="Applications">
                <div className="product-detail__chips">
                  {product.applications.map((a) => (
                    <Badge key={a} variant="outline" tone="neutral">{a}</Badge>
                  ))}
                </div>
              </DetailCard>

              <DetailCard label="Material">
                <div className="product-detail__chips">
                  {product.materials.map((m) => (
                    <Badge key={m} variant="solid" tone="accent">{m}</Badge>
                  ))}
                </div>
              </DetailCard>

              <DetailCard label="Thickness">
                <p>{PRODUCT_POLICY.thickness}</p>
              </DetailCard>

              <DetailCard label="Dimensions">
                <p>{PRODUCT_POLICY.dimensions}</p>
              </DetailCard>

              <DetailCard label="Customization">
                <p>{PRODUCT_POLICY.customization}</p>
              </DetailCard>

              <DetailCard label="Quantity Orders">
                <p>{PRODUCT_POLICY.quantityOrders}</p>
              </DetailCard>

              <DetailCard label="Technical Information" className="product-detail__block--wide">
                <p>{PRODUCT_POLICY.technicalInfo}</p>
              </DetailCard>
            </div>
          </div>

          <aside className="product-detail__aside">
            <StickyInquiryPanel product={product} quoteHref={quoteHref} />
          </aside>
        </div>
      </div>

      <RelatedProducts product={product} />

      <MobileStickyCTA quoteHref={quoteHref} />
    </MainLayout>
  );
}

function DetailCard({ label, children, className = "" }) {
  return (
    <GlassCard className={`product-detail__block ${className}`}>
      <span className="product-detail__block-label">{label}</span>
      {children}
    </GlassCard>
  );
}
