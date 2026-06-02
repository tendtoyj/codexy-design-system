import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@tendtoyj/cds-core", "@tendtoyj/cds-icons", "@tendtoyj/cds-ui"],
  outputFileTracingRoot: path.join(import.meta.dirname ?? "", "..", ".."),
};

export default withMDX(config);
