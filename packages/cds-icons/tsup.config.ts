import { defineConfig } from "tsup";

const sharedConfig = {
  format: ["esm"] as const,
  dts: true,
  sourcemap: true,
  clean: false,
  target: "es2022",
  treeshake: true,
  splitting: false,
  external: ["react", "react-dom", "@phosphor-icons/react", "@lobehub/icons"],
};

export default defineConfig([
  {
    ...sharedConfig,
    name: "icons",
    entry: {
      index: "src/index.ts",
      icons: "src/icons.ts",
      "custom/index": "src/custom/index.ts",
    },
  },
  {
    ...sharedConfig,
    name: "brands",
    entry: {
      "brands/index": "src/brands/index.ts",
    },
  },
]);
