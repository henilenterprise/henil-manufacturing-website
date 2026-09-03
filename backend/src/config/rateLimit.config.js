import rateLimit from "express-rate-limit";

// Two tiers, not one blanket limiter:
//
// - `generalLimiter` on the whole API — a loose backstop against basic
//   abuse/scraping, generous enough that no real user of this site
//   (which makes very few requests — a handful of page loads, one
//   upload-config fetch) would ever notice it.
// - `writeLimiter` specifically on POST /api/inquiries and
//   POST /api/uploads — the two endpoints that actually cost something
//   (a database write, a Storage upload, an outbound email) and are
//   the meaningful target for spam/abuse. Tighter, per-IP.
//
// Numbers are deliberately generous relative to real usage (a genuine
// customer submits one RFQ, not twenty) while still making a scripted
// flood cost real time to carry out. Both are configurable via env so
// they can be tuned without a code change if real traffic patterns turn
// out to need it.
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: Number(process.env.RATE_LIMIT_GENERAL_MAX) || 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: "error", message: "Too many requests. Please try again later." },
});

export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_WRITE_MAX) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many submissions from this connection. Please wait a while before trying again.",
  },
});
