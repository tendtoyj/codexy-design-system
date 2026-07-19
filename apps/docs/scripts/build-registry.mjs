#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  buildShadcnRegistry,
  createTemporaryDirectory,
  publicRegistryRoot,
  snapshotsRoot,
  syncFlatJsonDirectory,
} from "./registry-release.mjs";
import { validateRegistryArtifacts } from "./validate-registry.mjs";

const temporaryDirectory = createTemporaryDirectory("cds-registry-latest-");

try {
  buildShadcnRegistry(temporaryDirectory);
  syncFlatJsonDirectory(temporaryDirectory, publicRegistryRoot);

  for (const entry of fs.readdirSync(snapshotsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    syncFlatJsonDirectory(
      path.join(snapshotsRoot, entry.name),
      path.join(publicRegistryRoot, entry.name),
    );
  }
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}

validateRegistryArtifacts({ requirePublic: true });
