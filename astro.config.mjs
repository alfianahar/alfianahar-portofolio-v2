import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://alfianahar.com",
  output: "server",
  adapter: cloudflare({ mode: "directory" }),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "components"),
        "@content": path.resolve(__dirname, "content"),
        "@lib": path.resolve(__dirname, "lib"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@app-types": path.resolve(__dirname, "types"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
      },
    },
  },
});
