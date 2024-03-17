import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import { rehypePlugins, remarkPlugins } from "./config/plugins";

export default defineConfig({
  site: "https://vorillaz.com",
  markdown: {
    smartypants: true,
    drafts: true,
    syntaxHighlight: false,
    extendDefaultPlugins: true,
    rehypePlugins,
    remarkPlugins,
  },

  integrations: [mdx(), react(), sitemap()],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  output: "server",
  adapter: vercel(),
});
