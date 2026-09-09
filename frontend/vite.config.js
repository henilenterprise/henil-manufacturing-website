import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_POSTS } from "./src/data/blogPosts.data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCT_ROUTES = [
  "/products/acrylic-machine-panel",
  "/products/acrylic-structural-component",
  "/products/polycarbonate-impact-panel",
  "/products/polycarbonate-structural-part",
  "/products/cnc-machine-guard",
  "/products/conveyor-guard-panel",
  "/products/equipment-protective-cover",
  "/products/control-panel-cover",
  "/products/custom-acrylic-tank",
  "/products/acrylic-storage-box",
  "/products/acrylic-display-cabinet",
  "/products/machine-inspection-window",
  "/products/process-sight-glass",
  "/products/transparent-equipment-enclosure",
  "/products/custom-fabricated-part",
  "/products/commercial-display-fixture",
];

const SEO_ROUTES = [
  "/acrylic-fabrication-ahmedabad",
  "/custom-acrylic-fabrication-ahmedabad",
  "/polycarbonate-fabrication-ahmedabad",
  "/acrylic-machine-guard-manufacturer-ahmedabad",
  "/polycarbonate-machine-guard-manufacturer-ahmedabad",
  "/acrylic-tank-manufacturer-ahmedabad",
  "/acrylic-box-manufacturer-ahmedabad",
  "/acrylic-sight-glass-manufacturer-ahmedabad",
  "/acrylic-inspection-window-manufacturer-ahmedabad",
  "/acrylic-cnc-cutting-ahmedabad",
  "/acrylic-bending-ahmedabad",
];

const BLOG_ROUTES = [
  "/blog",
  ...BLOG_POSTS
    .filter((post) => post.published)
    .map((post) => `/blog/${post.slug}`),
];

// Core static pages. "/" is prerendered automatically as the plugin's
// entry route and doesn't need to be listed here, but everything below
// previously had no static HTML at all — see src/prerender.jsx's
// STATIC_PAGES map, which is what actually renders each of these.
const STATIC_ROUTES = [
  "/about",
  "/capabilities",
  "/industries",
  "/custom-fabrication",
  "/gallery",
  "/contact",
  "/faq",
  "/quote",
  "/brochure",
  "/products",
];

export default defineConfig({
  plugins: [
    react(),

    vitePrerenderPlugin({
      renderTarget: "#root",

      prerenderScript: path.resolve(
        __dirname,
        "src/prerender.jsx"
      ),

      additionalPrerenderRoutes: [
        ...STATIC_ROUTES,
        ...PRODUCT_ROUTES,
        ...SEO_ROUTES,
        ...BLOG_ROUTES,
      ],
    }),
  ],

  server: {
    port: 5173,

    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": [
            "react",
            "react-dom",
            "react-router-dom",
          ],

          "vendor-icons": [
            "lucide-react",
          ],
        },
      },
    },
  },
});