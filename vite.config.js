import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve("index.html"),
        assure3d: resolve("assure3d/index.html"),
        method: resolve("method/index.html"),
        applications: resolve("applications/index.html"),
        evidence: resolve("evidence/index.html"),
        pilot: resolve("pilot/index.html"),
        privacy: resolve("privacy/index.html"),
        terms: resolve("terms/index.html"),
      },
    },
  },
});
