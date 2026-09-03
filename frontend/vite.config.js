import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev proxy: any frontend fetch to /api/* is forwarded to the Express
// backend, so the browser never has to deal with cross-origin requests
// during development.
export default defineConfig({
  plugins: [react()],
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
        // Splits stable, rarely-changing third-party code into its own
        // chunk(s), separate from this project's own code. Two real
        // benefits: (1) a returning visitor's browser can keep serving
        // react/react-dom/react-router-dom from cache across deploys
        // where only app code changed — those libraries' chunk hash
        // only changes when a dependency actually bumps, not on every
        // release — and (2) route-based code splitting (see App.jsx's
        // React.lazy() calls) works better when the shared vendor code
        // each lazy chunk depends on isn't duplicated into every one of
        // them. lucide-react gets its own chunk specifically because
        // it's an icon library imported from a large number of
        // components across this codebase — grouping it keeps it from
        // being pulled piecemeal into many separate route chunks.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-icons": ["lucide-react"],
        },
      },
    },
  },
});
