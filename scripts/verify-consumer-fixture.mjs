#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(import.meta.url), "../..");
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cds-consumer-"));
const packsRoot = path.join(fixtureRoot, "packs");
const releaseVersion = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "packages/cds-core/package.json"), "utf8"),
).version;
const snapshotRoot = path.join(
  repoRoot,
  "packages/cds-ui/registry-snapshots",
  releaseVersion,
);

function run(command, args, cwd = repoRoot) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed\n${result.stdout}${result.stderr}`);
  }
  return result.stdout;
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

try {
  fs.mkdirSync(packsRoot, { recursive: true });
  const packageDirectories = ["cds-core", "cds-icons", "cds-markdown"];
  const tarballs = {};

  for (const packageDirectory of packageDirectories) {
    const output = run("pnpm", [
      "--dir",
      path.join(repoRoot, "packages", packageDirectory),
      "pack",
      "--json",
      "--pack-destination",
      packsRoot,
    ]);
    const packed = JSON.parse(output);
    const tarball = Array.isArray(packed) ? packed[0].filename : packed.filename;
    tarballs[packageDirectory] = path.resolve(repoRoot, tarball);
  }

  writeJson(path.join(fixtureRoot, "package.json"), {
    name: `cds-${releaseVersion}-consumer-fixture`,
    private: true,
    type: "module",
    dependencies: {
      "@tendtoyj/cds-core": `file:${tarballs["cds-core"]}`,
      "@tendtoyj/cds-icons": `file:${tarballs["cds-icons"]}`,
      "@tendtoyj/cds-markdown": `file:${tarballs["cds-markdown"]}`,
      "@types/react": "19.2.14",
      "@types/react-dom": "19.2.3",
      react: "19.2.5",
      "react-dom": "19.2.5",
      tailwindcss: "4.2.2",
      typescript: "5.9.3",
    },
  });
  writeJson(path.join(fixtureRoot, "tsconfig.json"), {
    compilerOptions: {
      jsx: "react-jsx",
      module: "ESNext",
      moduleResolution: "Bundler",
      noEmit: true,
      skipLibCheck: true,
      strict: true,
      target: "ES2022",
    },
    include: ["src"],
  });
  fs.mkdirSync(path.join(fixtureRoot, "src"));
  fs.writeFileSync(
    path.join(fixtureRoot, "src/index.tsx"),
    `import { cdsStylesEntry } from "@tendtoyj/cds-core";\n` +
      `import { CheckCircleFill } from "@tendtoyj/cds-icons/custom";\n` +
      `import { Plus } from "@tendtoyj/cds-icons/icons";\n` +
      `import { renderMarkdown } from "@tendtoyj/cds-markdown";\n` +
      `export const fixture = { cdsStylesEntry, CheckCircleFill, Plus, rendered: renderMarkdown("ok") };\n`,
  );
  fs.writeFileSync(
    path.join(fixtureRoot, "src/verify-styles.mjs"),
    `import fs from "node:fs";\n` +
      `for (const specifier of ["@tendtoyj/cds-core/styles", "@tendtoyj/cds-markdown/styles"]) {\n` +
      `  const resolved = new URL(import.meta.resolve(specifier));\n` +
      `  if (!fs.statSync(resolved).isFile()) throw new Error(\`Missing CSS export: \${specifier}\`);\n` +
      `}\n`,
  );

  run("pnpm", ["install", "--prefer-offline", "--ignore-scripts"], fixtureRoot);
  run("pnpm", ["exec", "tsc", "--noEmit"], fixtureRoot);
  run("node", ["src/verify-styles.mjs"], fixtureRoot);

  const manifest = JSON.parse(fs.readFileSync(path.join(snapshotRoot, "release.json"), "utf8"));
  for (const [name, version] of Object.entries(manifest.packages)) {
    const installed = JSON.parse(
      fs.readFileSync(path.join(fixtureRoot, "node_modules", name, "package.json"), "utf8"),
    );
    if (installed.version !== version) {
      throw new Error(`${name} fixture version ${installed.version} != registry version ${version}`);
    }
  }

  const registryItem = JSON.parse(fs.readFileSync(path.join(snapshotRoot, "button.json"), "utf8"));
  for (const dependency of [
    `@tendtoyj/cds-core@${releaseVersion}`,
    `@tendtoyj/cds-icons@${releaseVersion}`,
  ]) {
    if (!registryItem.dependencies.includes(dependency)) {
      throw new Error(`versioned button registry is missing exact dependency ${dependency}`);
    }
  }
  const source = registryItem.files.map((file) => file.content ?? "").join("\n");
  if (!source.includes('from "@tendtoyj/cds-core"') || !source.includes('from "@tendtoyj/cds-icons')) {
    throw new Error("versioned button registry contains unexpected package import paths");
  }

  console.log(
    `✓ consumer fixture OK — packed packages, CSS exports, and registry snapshot match ${releaseVersion}`,
  );
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
