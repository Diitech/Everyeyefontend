import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // UI & Animation
          "ui-vendor": ["framer-motion", "lucide-react"],
          // Charts (admin only)
          charts: ["recharts"],
          // Radix UI
          radix: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tabs",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tooltip",
          ],
          // Stripe
          stripe: ["@stripe/stripe-js", "@stripe/react-stripe-js"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion"],
  },
  server: {
    hmr: { overlay: false },
    // ── Added: proxy /api calls to Express backend ──
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
