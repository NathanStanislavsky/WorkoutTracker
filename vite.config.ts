import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ['.svelte-kit', 'node_modules', "dist"],
  },
  resolve: {
    conditions: mode === "test" ? ["browser"] : [],
  },
  plugins: [sveltekit()],
}));
