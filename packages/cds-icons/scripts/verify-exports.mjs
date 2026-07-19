#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(fileURLToPath(import.meta.url), "../..");
const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));

for (const entry of Object.values(packageJson.exports)) {
  for (const target of Object.values(entry)) {
    const file = path.join(packageRoot, target);
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      throw new Error(`Missing package export: ${target}`);
    }
  }
}

const iconsDeclaration = fs.readFileSync(path.join(packageRoot, "dist/icons.d.ts"), "utf8");
if (iconsDeclaration.includes("@lobehub/icons")) {
  throw new Error("The icons declaration entry imports brand-only @lobehub/icons types");
}

const brandsDeclaration = fs.readFileSync(path.join(packageRoot, "dist/brands/index.d.ts"), "utf8");
if (!brandsDeclaration.includes("@lobehub/icons")) {
  throw new Error("The brands declaration entry is missing its @lobehub/icons export");
}

console.log("✓ cds-icons exports OK — public entries exist and declaration graphs are isolated");
