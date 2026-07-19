import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const repoRoot = path.resolve(import.meta.dirname, "../../..");
export const cdsUiRoot = path.join(repoRoot, "packages/cds-ui");
export const snapshotsRoot = path.join(cdsUiRoot, "registry-snapshots");
export const publicRegistryRoot = path.join(repoRoot, "apps/docs/public/r");

const packagePaths = {
  "@tendtoyj/cds-core": "packages/cds-core/package.json",
  "@tendtoyj/cds-icons": "packages/cds-icons/package.json",
  "@tendtoyj/cds-markdown": "packages/cds-markdown/package.json",
  "@tendtoyj/cds-ui": "packages/cds-ui/package.json",
};

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function getReleaseVersions() {
  const versions = Object.fromEntries(
    Object.entries(packagePaths).map(([name, relativePath]) => [
      name,
      readJson(path.join(repoRoot, relativePath)).version,
    ]),
  );
  const uniqueVersions = new Set(Object.values(versions));
  if (uniqueVersions.size !== 1) {
    throw new Error(`CDS fixed package versions differ: ${JSON.stringify(versions)}`);
  }
  return { version: Object.values(versions)[0], versions };
}

export function pinVersionedRegistryDocument(document, { homepage, version, versions }) {
  const pinItem = (item) => {
    if (item.dependencies) {
      item.dependencies = item.dependencies.map((dependency) => {
        const packageVersion = versions[dependency];
        return packageVersion ? `${dependency}@${packageVersion}` : dependency;
      });
    }
    if (item.registryDependencies) {
      item.registryDependencies = item.registryDependencies.map((dependency) => {
        if (/^(?:https?:\/\/|@)/.test(dependency)) return dependency;
        return `${homepage}/r/${version}/${dependency}.json`;
      });
    }
    return item;
  };

  if (Array.isArray(document.items)) document.items = document.items.map(pinItem);
  else pinItem(document);
  return document;
}

export function listRegistryJson(directory) {
  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".json") && name !== "release.json")
    .sort();
}

export function calculateSnapshotDigest(directory) {
  const hash = createHash("sha256");
  for (const name of listRegistryJson(directory)) {
    hash.update(name);
    hash.update("\0");
    hash.update(fs.readFileSync(path.join(directory, name)));
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

export function buildShadcnRegistry(outputDirectory) {
  const binary = path.join(repoRoot, "apps/docs/node_modules/.bin/shadcn");
  const result = spawnSync(
    binary,
    ["build", "registry.json", "--cwd", cdsUiRoot, "--output", outputDirectory],
    { cwd: repoRoot, encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(`shadcn registry build failed\n${result.stdout}${result.stderr}`);
  }
}

export function prepareVersionedSnapshot(directory, release) {
  const sourceRegistry = readJson(path.join(cdsUiRoot, "registry.json"));
  for (const name of listRegistryJson(directory)) {
    const file = path.join(directory, name);
    const document = readJson(file);
    writeJson(
      file,
      pinVersionedRegistryDocument(document, {
        homepage: sourceRegistry.homepage,
        version: release.version,
        versions: release.versions,
      }),
    );
  }

  const itemCount = listRegistryJson(directory).filter((name) => name !== "registry.json").length;
  writeJson(path.join(directory, "release.json"), {
    schemaVersion: 1,
    version: release.version,
    releaseTag: `@tendtoyj/cds-core@${release.version}`,
    packages: {
      "@tendtoyj/cds-core": release.versions["@tendtoyj/cds-core"],
      "@tendtoyj/cds-icons": release.versions["@tendtoyj/cds-icons"],
      "@tendtoyj/cds-markdown": release.versions["@tendtoyj/cds-markdown"],
    },
    registry: {
      package: "@tendtoyj/cds-ui",
      version: release.versions["@tendtoyj/cds-ui"],
      source: "packages/cds-ui/registry.json",
      itemCount,
      digest: calculateSnapshotDigest(directory),
    },
  });
}

export function createTemporaryDirectory(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

export function directoriesMatch(left, right) {
  const leftNames = fs.readdirSync(left).sort();
  const rightNames = fs.readdirSync(right).sort();
  if (JSON.stringify(leftNames) !== JSON.stringify(rightNames)) return false;
  return leftNames.every((name) =>
    fs.readFileSync(path.join(left, name)).equals(fs.readFileSync(path.join(right, name))),
  );
}

export function syncFlatJsonDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  const sourceNames = new Set(fs.readdirSync(source).filter((name) => name.endsWith(".json")));
  for (const name of fs.readdirSync(destination)) {
    const target = path.join(destination, name);
    if (name.endsWith(".json") && fs.statSync(target).isFile() && !sourceNames.has(name)) {
      fs.rmSync(target);
    }
  }
  for (const name of sourceNames) {
    fs.copyFileSync(path.join(source, name), path.join(destination, name));
  }
}
