import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three-vendor is intentionally large but lazy-loaded (only when a 3D
    // section scrolls into view), so the warning would be noise.
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("gsap")) {
            return "gsap-vendor";
          }

          if (id.includes("framer-motion")) {
            return "motion-vendor";
          }

          if (id.includes("@emailjs")) {
            return "email-vendor";
          }

          // Keep the heavy WebGL graph in its own long-term-cacheable chunk.
          if (
            id.includes("three") ||
            id.includes("@react-three") ||
            id.includes("postprocessing")
          ) {
            return "three-vendor";
          }
        },
      },
    },
  },
});
