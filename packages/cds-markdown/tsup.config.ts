import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  treeshake: true,
  external: ["react", "react-dom", "react-markdown", "remark-gfm"],
  loader: {
    ".css": "copy",
  },
});
