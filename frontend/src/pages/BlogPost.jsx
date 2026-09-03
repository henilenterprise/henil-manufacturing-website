import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clock, ArrowRight, FileX } from "lucide-react";
import MainLayout from "../layouts/MainLayout.jsx";
import BlogVisual from "../components/BlogVisual.jsx";
import BlogCard from "../components/BlogCard.jsx";
import Button from "../components/ui/Button.jsx";
import { Spinner } from "../components/ui/index.js";
import { getBlogPostBySlug, getRelatedBlogPosts } from "../services/blogService.js";
import { calculateReadingTime, formatPublishedDate, buildBlogPostingStructuredData } from "../utils/blog.js";
import { useJsonLd } from "../hooks/useJsonLd.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useMetaDescription } from "../hooks/useMetaDescription.js";
import { useCanonical } from "../hooks/useCanonical.js";
import { buildBreadcrumbStructuredData } from "../utils/structuredData.js";
import "./BlogPost.css";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined); // undefined = loading, null = not found
  const [related, setRelated] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setPost(undefined);
    setRelated([]);

    getBlogPostBySlug(slug).then(async (data) => {
      if (cancelled) return;
      setPost(data);
      if (data) {
        const relatedPosts = await getRelatedBlogPosts(data, 3);
        if (!cancelled) setRelated(relatedPosts);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useDocumentTitle(post ? `${post.title} | Henil Enterprise Blog` : undefined);
  useMetaDescription(post ? post.excerpt : undefined);
  useCanonical(post ? `/blog/${post.slug}` : undefined);
  useJsonLd(post ? buildBlogPostingStructuredData(post) : null);
  useJsonLd(
    post
      ? buildBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])
      : null
  );

  if (post === undefined) {
    return (
      <MainLayout>
        <div className="container blog-post__loading">
          <Spinner label="Loading article…" />
        </div>
      </MainLayout>
    );
  }

  if (post === null) {
    return (
      <MainLayout>
        <div className="container blog-post__not-found">
          <FileX size={40} strokeWidth={1.5} />
          <h1>Article not found</h1>
          <p>We couldn't find an article at this address. It may have moved or been removed.</p>
          <Button href="/blog" variant="solid" icon={ArrowRight}>
            Back to Blog
          </Button>
        </div>
      </MainLayout>
    );
  }

  const readingTime = calculateReadingTime(post.content);
  const paragraphs = post.content.split(/\n\n+/);
  const quoteHref = `/quote?blogPost=${encodeURIComponent(post.slug)}`;

  return (
    <MainLayout>
      <article className="container blog-post">
        <nav className="blog-post__breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/blog">Blog</a>
          <span>/</span>
          <span className="blog-post__breadcrumb-current">{post.title}</span>
        </nav>

        <BlogVisual icon={post.coverImageIcon} large />

        <header className="blog-post__header">
          <h1 className="blog-post__title">{post.title}</h1>
          <div className="blog-post__meta">
            <span className="blog-post__meta-item">
              <Calendar size={14} />
              {formatPublishedDate(post.publishedAt)}
            </span>
            <span className="blog-post__meta-item">{post.author}</span>
            <span className="blog-post__meta-item">
              <Clock size={14} />
              {readingTime} min read
            </span>
          </div>
        </header>

        <div className="blog-post__content">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="blog-post__cta">
          <h2>Have a requirement like this?</h2>
          <p>Send your drawing, dimensions, or specification and we'll come back with a quote.</p>
          <Button href={quoteHref} variant="solid" size="lg" icon={ArrowRight}>
            Get a Quote
          </Button>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section blog-post__related">
          <div className="container">
            <div className="section__head">
              <span className="eyebrow">Related</span>
              <h2 className="section__title">More articles</h2>
            </div>
            <div className="blog-post__related-grid">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
