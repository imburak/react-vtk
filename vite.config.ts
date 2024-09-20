import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["@itk-wasm/dicom", "@itk-wasm/image-io"],
  },
  plugins: [react()],
});
