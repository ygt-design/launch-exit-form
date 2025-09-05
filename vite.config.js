import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/launch-exit-form/',
  // No dev proxy needed; forms submit directly to Formspree
});
