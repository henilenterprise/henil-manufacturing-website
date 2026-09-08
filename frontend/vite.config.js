import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

export default defineConfig({
  plugins: [
    react(),

    vitePrerenderPlugin({
      renderTarget: "#root",

      prerenderScript: path.resolve(
        __dirname,
        "src/prerender.jsx"
      ),

      additionalPrerenderRoutes: PRODUCT_ROUTES,
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