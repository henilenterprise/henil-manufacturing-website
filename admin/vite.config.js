import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This app talks directly to Supabase (see src/lib/supabaseClient.js) —
// there is no dev proxy to a backend here, unlike frontend/vite.config.js.
// Row Level Security is what makes that safe; see
// ADMIN-DASHBOARD-ARCHITECTURE.md for the full reasoning.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
});
