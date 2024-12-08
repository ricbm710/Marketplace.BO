import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || "/", // Use the base path from .env or default to '/'
  };
});
