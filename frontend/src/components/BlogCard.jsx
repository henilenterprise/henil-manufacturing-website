import { Calendar, Clock } from "lucide-react";
import GlassCard from "./ui/GlassCard.jsx";
import BlogVisual from "./BlogVisual.jsx";
import { calculateReadingTime, formatPublishedDate } from "../utils/blog.js";
import "./BlogCard.css";

export default function BlogCard({ post }) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <a href={`/blog/${post.slug}`} className="blog-card-link">
      <GlassCard className="blog-card">
        <BlogVisual icon={post.coverImageIcon} />
        <div className="blog-card__body">
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <div className="blog-card__meta">
            <span className="blog-card__meta-item">
              <Calendar size={13} />
              {formatPublishedDate(post.publishedAt)}
            </span>
            <span className="blog-card__meta-item">
              <Clock size={13} />
              {readingTime} min read
            </span>
          </div>
        </div>
      </GlassCard>
    </a>
  );
}
