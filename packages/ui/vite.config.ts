import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      aliasesExclude: ["stories.tsx", "stories.ts"],
      exclude: "src/themed/**/*"
    }),
  ],
  build: {
    lib: {
      entry: ["src/primitive/Box", "src/primitive/Button"],
      name: "@warrrui-test/ui",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      input: {
        Box: "/src/primitive/Box",
        Button: "/src/primitive/Button",
      },
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          dir: "dist",
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          dir: "dist",
        },
        {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      ],
    },
  },
});
