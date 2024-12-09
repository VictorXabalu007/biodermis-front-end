import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://melhorenvio.com.br",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    // mkcert(),
    react(),
  ],
});
