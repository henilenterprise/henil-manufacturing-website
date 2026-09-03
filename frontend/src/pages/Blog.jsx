import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import BlogCard from "../components/BlogCard.jsx";
import { Spinner } from "../components/ui/index.js";
import { getPublishedBlogPosts } from "../services/blogService.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useMetaDescription } from "../hooks/useMetaDescription.js";
import { useCanonical } from "../hooks/useCanonical.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./Blog.css";

export default function Blog() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getPublishedBlogPosts().then((data) => {
      if (!cancelled) setPosts(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useDocumentTitle("Blog | Acrylic & Polycarbonate Fabrication Insights — Henil Enterprise");
  useMetaDescription(
    "Notes on acrylic and polycarbonate fabrication — materials, processes, and applications — from Henil Enterprise, an Ahmedabad-based manufacturer and fabricator."
  );
  useCanonical("/blog");
  useJsonLd(buildBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]));

  return (
    <MainLayout>
      <section className="blog-page">
        <div className="container blog-page__head">
          <span className="eyebrow">Blog</span>
          <h1 className="blog-page__title">Notes on acrylic and polycarbonate fabrication</h1>
          <p className="blog-page__sub">
            Practical guidance on materials, processes, and applications — no invented
            specifications, just what actually matters when specifying a fabricated part.
          </p>
        </div>

        <div className="container">
          {posts === null && (
            <div className="blog-page__loading">
              <Spinner label="Loading articles…" />
            </div>
          )}

          {posts !== null && (
            <div className="blog-page__grid">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
