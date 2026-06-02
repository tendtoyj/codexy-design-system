import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "motion/variants": "src/motion/variants.ts",
    "utils/cn": "src/utils/cn.ts",
    "utils/tv": "src/utils/tv.ts",
    "utils/tw-merge-config": "src/utils/tw-merge-config.ts",
    "tailwind-preset": "src/tailwind-preset.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  treeshake: true,
  external: ["framer-motion", "tailwindcss"],
});
