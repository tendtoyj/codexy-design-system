#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(import.meta.url), "../..");
const pdsUi = path.join(repoRoot, "packages/pds-ui");
const registryPath = path.join(pdsUi, "registry.json");
const componentsDir = path.join(pdsUi, "src/components");

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

const registeredPaths = new Set();
for (const item of registry.items ?? []) {
  for (const f of item.files ?? []) {
    if (f.path) registeredPaths.add(f.path);
  }
}

const missingOnDisk = [];
for (const rel of registeredPaths) {
  if (!fs.existsSync(path.join(pdsUi, rel))) missingOnDisk.push(rel);
}

const topLevelComponents = fs
  .readdirSync(componentsDir)
  .filter((name) => name.endsWith(".tsx"))
  .map((name) => `src/components/${name}`);

const unregistered = topLevelComponents.filter((p) => !registeredPaths.has(p));

const errors = [];
if (missingOnDisk.length) {
  errors.push(
    `registry.json references files that don't exist on disk:\n` +
      missingOnDisk.map((s) => `    - ${s}`).join("\n") +
      `\n  → restore the file, or remove its entry from registry.json`,
  );
}
if (unregistered.length) {
  errors.push(
    `src/components has top-level files not registered in registry.json:\n` +
      unregistered.map((s) => `    - ${s}`).join("\n") +
      `\n  → add a registry:ui entry, or move the file under src/components/internal/ if it's a private helper`,
  );
}

if (errors.length) {
  console.error("✖ registry consistency check failed\n");
  for (const err of errors) console.error("  " + err + "\n");
  process.exit(1);
}

console.log(
  `✓ registry consistency OK — ${registeredPaths.size} files across ${registry.items.length} items`,
);
