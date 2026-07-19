#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(import.meta.url), "../..");
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cds-chat-consumer-"));
const packsRoot = path.join(fixtureRoot, "packs");
const shadcnPackage = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "apps/docs/node_modules/shadcn/package.json"), "utf8"),
);
const releaseVersion = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "packages/cds-ui/package.json"), "utf8"),
).version;
const snapshotRoot = path.join(
  repoRoot,
  "packages/cds-ui/registry-snapshots",
  releaseVersion,
);
const shadcnBinary = path.join(repoRoot, "apps/docs/node_modules/.bin/shadcn");
const chatRoots = [
  "chat-types",
  "chat-copy-button",
  "chat-user-message",
  "chat-attachment-chip",
  "chat-composer",
  "chat-assistant-message",
];

function run(command, args, cwd = repoRoot) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`${command} ${args.join(" ")} failed\n${stdout}${stderr}`));
    });
  });
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function assertFile(file, label) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    throw new Error(`${label} is missing: ${file}`);
  }
}

function assertImmutableRegistryDependencies() {
  const expectedPrefix = `https://codexy-design-system-docs.vercel.app/r/${releaseVersion}/`;
  for (const name of fs.readdirSync(snapshotRoot)) {
    if (!name.endsWith(".json") || name === "release.json") continue;
    const document = readJson(path.join(snapshotRoot, name));
    const items = Array.isArray(document.items) ? document.items : [document];
    for (const item of items) {
      for (const dependency of item.registryDependencies ?? []) {
        if (!dependency.startsWith(expectedPrefix) || dependency.includes("/latest/")) {
          throw new Error(`${name} contains a mutable registry dependency: ${dependency}`);
        }
      }
    }
  }
}

function createRegistryServer() {
  let origin = "";
  const server = http.createServer((request, response) => {
    const match = request.url?.match(new RegExp(`^/r/${releaseVersion}/([a-z0-9-]+)\\.json$`));
    if (!match) {
      response.writeHead(404).end();
      return;
    }
    const source = path.join(snapshotRoot, `${match[1]}.json`);
    if (!fs.existsSync(source)) {
      response.writeHead(404).end();
      return;
    }
    const document = readJson(source);
    document.dependencies = (document.dependencies ?? []).filter(
      (dependency) => !dependency.startsWith("@tendtoyj/cds-"),
    );
    document.registryDependencies = (document.registryDependencies ?? []).map((dependency) => {
      const itemName = path.basename(new URL(dependency).pathname);
      return `${origin}/r/${releaseVersion}/${itemName}`;
    });
    response.writeHead(200, { "content-type": "application/json" });
    response.end(`${JSON.stringify(document)}\n`);
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("registry fixture server did not expose a TCP port"));
        return;
      }
      origin = `http://127.0.0.1:${address.port}`;
      resolve({ origin, server });
    });
  });
}

async function packPackages() {
  fs.mkdirSync(packsRoot, { recursive: true });
  const tarballs = {};
  for (const packageDirectory of ["cds-core", "cds-icons"]) {
    const output = await run("pnpm", [
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
  return tarballs;
}

async function createConsumer(name, tarballs, electron = false) {
  const root = path.join(fixtureRoot, name);
  const sourceRelative = electron ? "src/renderer/src" : "src";
  const sourceRoot = path.join(root, sourceRelative);
  const componentsRoot = path.join(sourceRoot, "components");
  const cssRelative = `${sourceRelative}/globals.css`;
  const aliases = electron
    ? {
        components: "#components",
        ui: "#components/ui",
        lib: "#lib",
        hooks: "#hooks",
        utils: "#lib/utils",
      }
    : {
        components: "@/components",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
        utils: "@/lib/utils",
      };

  const packageJson = {
    name: `cds-chat-${name}-fixture`,
    private: true,
    type: "module",
    dependencies: {
      "@tendtoyj/cds-core": `file:${tarballs["cds-core"]}`,
      "@tendtoyj/cds-icons": `file:${tarballs["cds-icons"]}`,
      "@types/react": "19.2.14",
      "@types/react-dom": "19.2.3",
      "framer-motion": "11.18.2",
      react: "19.2.5",
      "react-dom": "19.2.5",
      tailwindcss: "4.2.2",
      typescript: "5.9.3",
    },
  };
  if (electron) {
    packageJson.imports = {
      "#components/*": `./${sourceRelative}/components/*`,
      "#hooks/*": `./${sourceRelative}/hooks/*`,
      "#lib/*": `./${sourceRelative}/lib/*`,
    };
  }
  writeJson(path.join(root, "package.json"), packageJson);
  writeJson(path.join(root, "components.json"), {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "",
      css: cssRelative,
      baseColor: "neutral",
      cssVariables: true,
      prefix: "",
    },
    aliases,
  });
  writeJson(path.join(root, "tsconfig.json"), {
    compilerOptions: {
      jsx: "react-jsx",
      module: "ESNext",
      moduleResolution: "Bundler",
      noEmit: true,
      skipLibCheck: false,
      strict: true,
      target: "ES2022",
      ...(electron ? {} : { baseUrl: ".", paths: { "@/*": ["./src/*"] } }),
    },
    include: [`${sourceRelative}/**/*`],
  });
  fs.mkdirSync(sourceRoot, { recursive: true });
  fs.writeFileSync(path.join(root, cssRelative), "");
  await run("pnpm", ["install", "--prefer-offline", "--ignore-scripts"], root);
  return { componentsRoot, root, sourceRoot };
}

function resetInstalledFiles(consumer) {
  fs.rmSync(consumer.componentsRoot, { recursive: true, force: true });
  fs.mkdirSync(consumer.componentsRoot, { recursive: true });
}

async function installAndTypecheck(consumer, origin, names) {
  resetInstalledFiles(consumer);
  const urls = names.map((name) => `${origin}/r/${releaseVersion}/${name}.json`);
  await run(shadcnBinary, ["add", ...urls, "--yes", "--overwrite", "--silent"], consumer.root);
  await run("pnpm", ["exec", "tsc", "--noEmit"], consumer.root);
}

try {
  if (shadcnPackage.version !== "4.7.0") {
    throw new Error(`expected shadcn 4.7.0, received ${shadcnPackage.version}`);
  }
  assertFile(path.join(snapshotRoot, "release.json"), "release candidate snapshot");
  assertImmutableRegistryDependencies();

  const tarballs = await packPackages();
  const { origin, server } = await createRegistryServer();
  try {
    const standard = await createConsumer("standard", tarballs);
    await installAndTypecheck(standard, origin, ["chat-types"]);
    assertFile(path.join(standard.componentsRoot, "types/chat.ts"), "standalone chat-types target");

    await installAndTypecheck(standard, origin, ["chat-copy-button"]);
    assertFile(path.join(standard.componentsRoot, "types/chat.ts"), "chat-copy-button chat types");

    await installAndTypecheck(standard, origin, ["chat-user-message"]);
    assertFile(path.join(standard.componentsRoot, "types/chat.ts"), "chat-user-message chat types");

    await installAndTypecheck(standard, origin, chatRoots);
    assertFile(path.join(standard.componentsRoot, "types/chat.ts"), "complete chat graph types");

    const electron = await createConsumer("electron", tarballs, true);
    await installAndTypecheck(electron, origin, chatRoots);
    assertFile(path.join(electron.componentsRoot, "types/chat.ts"), "Electron chat graph types");
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }

  console.log(
    `✓ shadcn ${shadcnPackage.version} chat installs and strict consumer typechecks OK — standard and Electron layouts at ${releaseVersion}`,
  );
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
