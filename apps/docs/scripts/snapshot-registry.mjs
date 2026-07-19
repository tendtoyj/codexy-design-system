#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  buildShadcnRegistry,
  createTemporaryDirectory,
  directoriesMatch,
  getReleaseVersions,
  prepareVersionedSnapshot,
  snapshotsRoot,
} from "./registry-release.mjs";

const release = getReleaseVersions();
const temporaryDirectory = createTemporaryDirectory("cds-registry-snapshot-");
const destination = path.join(snapshotsRoot, release.version);

try {
  buildShadcnRegistry(temporaryDirectory);
  prepareVersionedSnapshot(temporaryDirectory, release);

  if (fs.existsSync(destination)) {
    if (!directoriesMatch(temporaryDirectory, destination)) {
      throw new Error(
        `Immutable registry snapshot ${release.version} already exists with different content`,
      );
    }
    console.log(`✓ registry snapshot ${release.version} already matches release source`);
  } else {
    fs.mkdirSync(snapshotsRoot, { recursive: true });
    fs.cpSync(temporaryDirectory, destination, { recursive: true });
    console.log(`✓ created immutable registry snapshot ${release.version}`);
  }
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}
