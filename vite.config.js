import { defineConfig } from "vite";

export default defineConfig(() => ({
  base: process.env.VITE_BASE_OVERRIDE || "/chesspuzzles/",
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: "dist"
  }
}));
