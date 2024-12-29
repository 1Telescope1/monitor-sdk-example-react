import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // 禁用生产环境的 Source Map
  },
  server: {
    sourcemapIgnoreList: () => true, // 开发环境禁用 Source Map 映射
  },
});
