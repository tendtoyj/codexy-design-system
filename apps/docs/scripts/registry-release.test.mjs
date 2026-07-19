import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import {
  cdsUiRoot,
  pinVersionedRegistryDocument,
  readJson,
} from "./registry-release.mjs";

const release = {
  homepage: "https://example.com",
  version: "0.2.2",
  versions: {
    "@tendtoyj/cds-core": "0.2.2",
    "@tendtoyj/cds-icons": "0.2.2",
  },
};

test("pins package and local registry dependencies to one release", () => {
  const document = pinVersionedRegistryDocument(
    {
      dependencies: ["@tendtoyj/cds-core", "react"],
      registryDependencies: ["icon", "https://vendor.example/r/item.json", "@vendor/item"],
    },
    release,
  );

  assert.deepEqual(document.dependencies, ["@tendtoyj/cds-core@0.2.2", "react"]);
  assert.deepEqual(document.registryDependencies, [
    "https://example.com/r/0.2.2/icon.json",
    "https://vendor.example/r/item.json",
    "@vendor/item",
  ]);
});

test("pins every item in a registry catalog", () => {
  const document = pinVersionedRegistryDocument(
    { items: [{ dependencies: ["@tendtoyj/cds-icons"] }] },
    release,
  );
  assert.deepEqual(document.items[0].dependencies, ["@tendtoyj/cds-icons@0.2.2"]);
});

test("ships the AppShell page-header slot as one complete registry install", () => {
  const registry = readJson(path.join(cdsUiRoot, "registry.json"));
  const appShell = registry.items.find((item) => item.name === "app-shell");

  assert.deepEqual(
    appShell.files.map((file) => file.target).sort(),
    [
      "components/ui/app-shell.tsx",
      "components/ui/internal/app-shell-page-header-slot.tsx",
    ],
  );
});
