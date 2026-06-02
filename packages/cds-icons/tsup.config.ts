import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    icons: "src/icons.ts",
    "custom/index": "src/custom/index.ts",
    "brands/index": "src/brands/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  treeshake: true,
  splitting: false,
  external: ["react", "react-dom", "@phosphor-icons/react", "@lobehub/icons"],
});
