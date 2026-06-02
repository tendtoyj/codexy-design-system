import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@fluxloop-ai/pds-core", "@fluxloop-ai/pds-icons", "@fluxloop-ai/pds-ui"],
  outputFileTracingRoot: path.join(import.meta.dirname ?? "", "..", ".."),
};

export default withMDX(config);
