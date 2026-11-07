// vite.config.js
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-cloudflare";

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
      prerender: {
        entries: ["*"],
      },
    }),
  ],
});
