import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import {
  cdsUiRoot,
  pinVersionedRegistryDocument,
  readJson,
} from "./registry-release.mjs";

function getRegistryItem(registry, name) {
  const item = registry.items.find((candidate) => candidate.name === name);
  assert.ok(item, `missing registry item: ${name}`);
  return item;
}

function collectInstallGraph(registry, roots) {
  const items = new Map(registry.items.map((item) => [item.name, item]));
  const installed = new Set();
  const targets = new Map();
  const pending = [...roots];

  while (pending.length > 0) {
    const name = pending.pop();
    if (!name || installed.has(name)) continue;
    const item = items.get(name);
    assert.ok(item, `missing registry dependency: ${name}`);
    installed.add(name);
    pending.push(...(item.registryDependencies ?? []));

    for (const file of item.files ?? []) {
      const existing = targets.get(file.target);
      assert.ok(!existing || existing === file.path, `conflicting registry target: ${file.target}`);
      targets.set(file.target, file.path);
    }
  }

  return { installed, targets };
}

function resolveRegistryTarget(target, componentsDirectory) {
  if (target.startsWith("@components/")) {
    return path.posix.join(componentsDirectory, target.slice("@components/".length));
  }
  if (target.startsWith("components/")) {
    return path.posix.join(componentsDirectory, target.slice("components/".length));
  }
  return target;
}

function resolveImportTarget(fileTarget, importPath, componentsDirectory) {
  const installedTarget = resolveRegistryTarget(fileTarget, componentsDirectory);
  return path.posix.normalize(path.posix.join(path.posix.dirname(installedTarget), `${importPath}.ts`));
}

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
  const appShell = getRegistryItem(registry, "app-shell");

  assert.deepEqual(
    appShell.files.map((file) => file.target).sort(),
    [
      "components/ui/app-shell.tsx",
      "components/ui/internal/app-shell-page-header-slot.tsx",
    ],
  );
});

test("resolves chat type imports to the portable chat-types target", () => {
  const registry = readJson(path.join(cdsUiRoot, "registry.json"));
  const chatTypes = getRegistryItem(registry, "chat-types");
  const chatCopyButton = getRegistryItem(registry, "chat-copy-button");
  const chatUserMessage = getRegistryItem(registry, "chat-user-message");
  const typeTarget = chatTypes.files[0].target;

  assert.equal(typeTarget, "@components/types/chat.ts");
  for (const componentsDirectory of ["src/components", "src/renderer/src/components"]) {
    const installedTypeTarget = resolveRegistryTarget(typeTarget, componentsDirectory);
    assert.equal(
      resolveImportTarget(
        chatCopyButton.files[0].target,
        "../../types/chat",
        componentsDirectory,
      ),
      installedTypeTarget,
    );
    assert.equal(
      resolveImportTarget(chatUserMessage.files[0].target, "../types/chat", componentsDirectory),
      installedTypeTarget,
    );
  }
});

test("installs chat types directly for each importing chat component", () => {
  const registry = readJson(path.join(cdsUiRoot, "registry.json"));

  for (const name of ["chat-copy-button", "chat-user-message"]) {
    const item = getRegistryItem(registry, name);
    assert.ok(item.registryDependencies.includes("chat-types"));
    const graph = collectInstallGraph(registry, [name]);
    assert.ok(graph.targets.has("@components/types/chat.ts"));
  }
});

test("installs the complete chat graph without duplicate or conflicting targets", () => {
  const registry = readJson(path.join(cdsUiRoot, "registry.json"));
  const roots = [
    "chat-types",
    "chat-copy-button",
    "chat-user-message",
    "chat-attachment-chip",
    "chat-composer",
    "chat-assistant-message",
  ];
  const graph = collectInstallGraph(registry, roots);

  assert.equal(
    [...graph.targets.keys()].filter((target) => target === "@components/types/chat.ts").length,
    1,
  );
  assert.ok(graph.installed.has("app-shell") === false);
});
