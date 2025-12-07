import { defineConfig } from "vite";

export default defineConfig(() => {
  const base = process.env.VITE_BASE_OVERRIDE || "/chesspuzzles/";
  console.log("Using base:", base);
  
  return {
    base,
    server: { port: 3000 },
    preview: { port: 4173 },
    build: { outDir: "dist" }
  };
});
