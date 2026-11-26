import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In development the React app (port 5173) forwards API calls to the Express server (port 3000).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
    },
  },
});
