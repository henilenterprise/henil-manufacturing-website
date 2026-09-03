import { useMemo, useState } from "react";
import { Search, PackageSearch, X } from "lucide-react";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import GlassBadge from "../components/ui/GlassBadge.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Button from "../components/ui/Button.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.data.js";
import { CATEGORIES } from "../data/categories.data.js";
import "./ProductsExplorer.css";

const SORT_OPTIONS = [
  { label: "Name (A–Z)", value: "name-asc" },
  { label: "Name (Z–A)", value: "name-desc" },
  { label: "Category", value: "category" },
  { label: "Featured First", value: "featured" },
];

export default function ProductsExplorer() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  const featuredProducts = useMemo(() => PRODUCTS.filter((p) => p.featured), []);
  const showFeatured = search.trim() === "" && categoryId === "all";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = categoryId === "all" || p.categoryId === categoryId;
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = [p.name, p.shortDescription, ...p.applications].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [search, categoryId]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case "name-desc":
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case "category":
        return list.sort((a, b) => a.categoryId.localeCompare(b.categoryId));
      case "featured":
        return list.sort((a, b) => Number(b.featured) - Number(a.featured));
      case "name-asc":
      default:
        return list.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filtered, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setCategoryId("all");
  };

  return (
    <section className="section products-explorer">
      <div className="container">
        {showFeatured && featuredProducts.length > 0 && (
          <div className="products-explorer__featured">
            <div className="section__head">
              <span className="eyebrow">Featured</span>
              <h2 className="section__title">Featured Products</h2>
            </div>
            <div className="products-explorer__grid">
              {featuredProducts.map((product) => (
                <div className="products-explorer__featured-item" key={product.id}>
                  <GlassBadge tone="accent" className="products-explorer__featured-badge">
                    Featured
                  </GlassBadge>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="section__head">
          <span className="eyebrow">Full Catalogue</span>
          <h2 className="section__title">All Products</h2>
        </div>

        <div className="products-explorer__toolbar">
          <Input
            variant="glass"
            icon={Search}
            placeholder="Search products, applications…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
            className="products-explorer__search"
          />
          <Select
            label="Sort"
            value={sortBy}
            onChange={setSortBy}
            options={SORT_OPTIONS}
            className="products-explorer__sort"
          />
        </div>

        <div className="products-explorer__chips" role="group" aria-label="Filter by category">
          <button
            className={`products-explorer__chip ${categoryId === "all" ? "products-explorer__chip--active" : ""}`}
            onClick={() => setCategoryId("all")}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`products-explorer__chip ${categoryId === cat.id ? "products-explorer__chip--active" : ""}`}
              onClick={() => setCategoryId(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {sorted.length > 0 ? (
          <div className="products-explorer__grid">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={PackageSearch}
            title="No products match your filters"
            description="Try a different search term or clear the category filter."
            action={
              <Button variant="ghost" size="sm" icon={X} onClick={clearFilters}>
                Clear filters
              </Button>
            }
          />
        )}
      </div>
    </section>
  );
}
