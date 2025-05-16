import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest-setup.ts"],
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    coverage: {
      all: false,
      include: ["src/**/*.{js,ts,jsx,tsx}"],
      exclude: ["node_modules", "dist", "src/types/**", "**/*.d.ts", "src/**/*.test-d.ts"],
      reporter: ["text", "html"],
    },
  },
});
