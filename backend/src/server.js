import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { config } from "./config/env.js";
import { generalLimiter } from "./config/rateLimit.config.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import healthRoutes from "./routes/health.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import { isSupabaseConfigured } from "./config/supabaseClient.js";

const app = express();

// Required for express-rate-limit (and any other IP-based logic) to see
// the real client IP rather than the proxy's, when deployed behind any
// standard reverse proxy/host (nginx, Render, Railway, Vercel, etc.) —
// without this, X-Forwarded-For is ignored and every request can appear
// to come from the same upstream IP, either breaking rate limiting
// entirely (nothing ever looks like abuse) or over-triggering it
// (everyone shares one IP's quota). Trusting exactly one hop (the
// immediate proxy in front of this app) rather than `true` (trust
// every hop, which lets a client spoof its own IP via the header)
// keeps this from becoming its own spoofing vector — set
// TRUST_PROXY_HOPS if a deployment sits behind more than one proxy.
app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS) || 1);

// Baseline security headers (X-Content-Type-Options, X-Frame-Options,
// a conservative default Content-Security-Policy, etc.) — this is a
// pure JSON/file-upload API with no HTML views of its own to protect,
// but these headers cost nothing and are the standard-practice default
// for any Express API, not just ones that render pages.
app.use(helmet());

// gzip/brotli-negotiated compression on every JSON response — this API
// has no HTML/JS/CSS of its own to compress (that's the frontend's
// static host's job, and Vite's build output is already minified), but
// its own JSON payloads (the upload-config response, inquiry
// confirmations) benefit the same way any text response does. Cheap to
// add, real savings on slower mobile connections, which is exactly the
// audience "remain fast on normal mobile devices" is about.
app.use(compression());

app.use(cors({ origin: config.corsOrigin }));

// Explicit body size limit — the default (100kb) was already reasonable
// for this API (every real payload here is form fields, not file
// bytes; files go through multer's multipart parsing, not this JSON
// body parser), but pinning it explicitly means it can't silently
// change if express's own default ever does, and documents that this
// was a deliberate choice, not an unexamined default.
app.use(express.json({ limit: "100kb" }));

// General rate limiting on the whole API; POST /api/inquiries and
// POST /api/uploads additionally get the stricter writeLimiter — see
// routes/inquiry.routes.js and routes/upload.routes.js.
app.use("/api", generalLimiter);

app.use("/api", healthRoutes);
app.use("/api", uploadRoutes);
app.use("/api", inquiryRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Henil Enterprise backend running on http://localhost:${config.port}`);
  if (!isSupabaseConfigured()) {
    console.warn(
      "WARNING: Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env). " +
        "The server will start, but /api/uploads and /api/inquiries will return 503 until it's configured."
    );
  }
});
