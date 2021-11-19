import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 80,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
