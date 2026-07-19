#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryItemSchema, registrySchema } from "shadcn/schema";
import {
  calculateSnapshotDigest,
  getReleaseVersions,
  listRegistryJson,
  publicRegistryRoot,
  readJson,
  snapshotsRoot,
} from "./registry-release.mjs";

function assertSchema(schema, document, label) {
  const result = schema.safeParse(document);
  if (!result.success) {
    throw new Error(`${label} schema validation failed\n${result.error.message}`);
  }
}

function validateBuiltRegistry(directory, label) {
  assertSchema(registrySchema, readJson(path.join(directory, "registry.json")), `${label}/registry.json`);
  for (const name of listRegistryJson(directory)) {
    if (name === "registry.json") continue;
    assertSchema(registryItemSchema, readJson(path.join(directory, name)), `${label}/${name}`);
  }
}

export function validateSnapshot(directory, version) {
  validateBuiltRegistry(directory, `snapshot ${version}`);
  const manifest = readJson(path.join(directory, "release.json"));
  const expectedTag = `@tendtoyj/cds-core@${version}`;
  if (manifest.version !== version || manifest.releaseTag !== expectedTag) {
    throw new Error(`snapshot ${version} release metadata does not match ${expectedTag}`);
  }
  if (Object.values(manifest.packages).some((packageVersion) => packageVersion !== version)) {
    throw new Error(`snapshot ${version} package versions are not synchronized`);
  }
  if (manifest.registry.version !== version) {
    throw new Error(`snapshot ${version} cds-ui source version is not synchronized`);
  }
  const itemNames = listRegistryJson(directory).filter((name) => name !== "registry.json");
  if (manifest.registry.itemCount !== itemNames.length) {
    throw new Error(`snapshot ${version} item count does not match release metadata`);
  }
  const digest = calculateSnapshotDigest(directory);
  if (manifest.registry.digest !== digest) {
    throw new Error(`snapshot ${version} digest mismatch: ${manifest.registry.digest} != ${digest}`);
  }

  const expectedDependencyPattern = new RegExp(`^@tendtoyj/cds-(?:core|icons|markdown)@${version}$`);
  const expectedRegistryPrefix = `/r/${version}/`;
  for (const name of listRegistryJson(directory)) {
    const document = readJson(path.join(directory, name));
    const items = Array.isArray(document.items) ? document.items : [document];
    for (const item of items) {
      for (const dependency of item.dependencies ?? []) {
        if (dependency.startsWith("@tendtoyj/cds-") && !expectedDependencyPattern.test(dependency)) {
          throw new Error(`snapshot ${version}/${name} has unpinned CDS dependency: ${dependency}`);
        }
      }
      for (const dependency of item.registryDependencies ?? []) {
        if (!dependency.includes(expectedRegistryPrefix) || !dependency.endsWith(".json")) {
          throw new Error(
            `snapshot ${version}/${name} has mutable registry dependency: ${dependency}`,
          );
        }
      }
    }
  }
}

export function validateRegistryArtifacts({ requirePublic = false } = {}) {
  const release = getReleaseVersions();
  assertSchema(
    registrySchema,
    readJson(path.join(snapshotsRoot, "..", "registry.json")),
    "packages/cds-ui/registry.json",
  );

  if (!fs.existsSync(snapshotsRoot)) {
    throw new Error("No immutable registry snapshots exist");
  }
  const versions = fs
    .readdirSync(snapshotsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  if (!versions.includes(release.version)) {
    throw new Error(`Missing registry snapshot for current fixed version ${release.version}`);
  }
  for (const version of versions) validateSnapshot(path.join(snapshotsRoot, version), version);

  if (requirePublic) {
    validateBuiltRegistry(publicRegistryRoot, "public/r latest");
    for (const version of versions) {
      validateSnapshot(path.join(publicRegistryRoot, version), version);
    }
  }

  console.log(`✓ registry schemas and release metadata OK — versions: ${versions.join(", ")}`);
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) validateRegistryArtifacts({ requirePublic: process.argv.includes("--public") });
