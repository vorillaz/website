import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  site: "https://vorillaz.com",
  markdown: {
    smartypants: true,
    drafts: true,
  },
  integrations: [
    expressiveCode({
      styleOverrides: {
        uiFontFamily: "Inter",
        codeFontFamily: "JetBrains Mono",
      },
      themes: ["nord", "solarized-light"],
    }),
    mdx(),
    react(),
    sitemap(),
    tailwind(),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  output: "server",
  adapter: vercel(),
});
