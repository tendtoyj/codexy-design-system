#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import ts from "typescript";

const repoRoot = path.resolve(import.meta.dirname, "..");
const readme = fs.readFileSync(path.join(repoRoot, "README.md"), "utf8");
const packageDirectories = fs
  .readdirSync(path.join(repoRoot, "packages"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(repoRoot, "packages", entry.name));
const packages = new Map(
  packageDirectories.map((directory) => {
    const manifest = JSON.parse(fs.readFileSync(path.join(directory, "package.json"), "utf8"));
    return [manifest.name, { directory, manifest }];
  }),
);

const imports = [];
const namedImportPattern = /import\s+\{([^}]+)\}\s+from\s+["'](@tendtoyj\/cds-[^"']+)["']/g;
for (const match of readme.matchAll(namedImportPattern)) {
  imports.push({ specifier: match[2], statement: match[0] });
}

const sideEffectPattern = /(?:@import\s+|import\s+)["'](@tendtoyj\/cds-[^"']+)["']/g;
for (const match of readme.matchAll(sideEffectPattern)) {
  imports.push({ specifier: match[1], statement: null });
}

function resolvePackageImport(specifier) {
  const packageName = [...packages.keys()].find(
    (name) => specifier === name || specifier.startsWith(`${name}/`),
  );
  if (!packageName) throw new Error(`README imports unknown package: ${specifier}`);

  const packageInfo = packages.get(packageName);
  const subpath = specifier === packageName ? "." : `.${specifier.slice(packageName.length)}`;
  const exported = packageInfo.manifest.exports?.[subpath];
  if (!exported) throw new Error(`README imports unexported subpath: ${specifier}`);

  const target = typeof exported === "string" ? exported : (exported.types ?? exported.import);
  if (!target) throw new Error(`README import has no ESM target: ${specifier}`);
  const absoluteTarget = path.resolve(packageInfo.directory, target);
  if (!fs.existsSync(absoluteTarget)) {
    throw new Error(`README import target does not exist: ${specifier} -> ${target}`);
  }
  return absoluteTarget;
}

for (const entry of imports) {
  entry.target = resolvePackageImport(entry.specifier);
}

const typedImports = imports.filter((entry) => entry.statement);
const fixtureDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "cds-readme-imports-"));
const fixturePath = path.join(fixtureDirectory, "readme-imports.ts");
fs.writeFileSync(fixturePath, `${typedImports.map((entry) => entry.statement).join("\n")}\n`);

const paths = Object.fromEntries(
  typedImports.map((entry) => [
    entry.specifier,
    [path.relative(repoRoot, entry.target).replaceAll(path.sep, "/")],
  ]),
);
const program = ts.createProgram([fixturePath], {
  baseUrl: repoRoot,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  noEmit: true,
  paths,
  skipLibCheck: true,
  target: ts.ScriptTarget.ES2022,
});
const diagnostics = ts.getPreEmitDiagnostics(program);
fs.rmSync(fixtureDirectory, { recursive: true });

if (diagnostics.length > 0) {
  throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => repoRoot,
    getNewLine: () => "\n",
  }));
}

console.log(`✓ README package imports OK — ${imports.length} examples verified`);
