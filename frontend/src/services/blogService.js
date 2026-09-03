// Read layer for blog posts, deliberately written as if it were already
// backed by a real Supabase query — every function is async and returns
// the same shape a real query would — even though today it reads
// straight from the static BLOG_POSTS array.
//
// The point: when this actually gets connected to Supabase (following
// the exact pattern already used for inquiries — see
// backend/src/services/inquiry.service.js's dependency-injected
// `supabase` client), swapping the implementation means rewriting the
// bodies of these three functions to real `.from("blog_posts").select()`
// calls. No calling component (BlogList, BlogPost pages) needs to
// change at all, because the function signatures and return shapes are
// already what a real query would produce.
//
// This intentionally stays on the frontend for now, unlike inquiries/
// uploads — there's no user-submitted data here needing a secure
// backend intermediary, and blog content is meant to be publicly
// readable by anyone (see the "Public read access to published posts"
// RLS policy already written for blog_posts). A future real
// integration would likely call Supabase directly from here using the
// public anon key, which is safe to expose — unlike the service role
// key backend/src/config/supabaseClient.js guards.

import { BLOG_POSTS } from "../data/blogPosts.data.js";
import { getRelatedPosts as getRelatedPostsFrom } from "../utils/blog.js";

export async function getPublishedBlogPosts() {
  return BLOG_POSTS.filter((p) => p.published).sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
}

export async function getBlogPostBySlug(slug) {
  const post = BLOG_POSTS.find((p) => p.slug === slug && p.published);
  return post || null;
}

export async function getRelatedBlogPosts(currentPost, limit = 3) {
  return getRelatedPostsFrom(currentPost, BLOG_POSTS, limit);
}
