#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(import.meta.url), "../..");
const packageDirectories = ["cds-core", "cds-icons", "cds-markdown"];
const tags = packageDirectories.map((directory) => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "packages", directory, "package.json"), "utf8"),
  );
  return `${manifest.name}@${manifest.version}`;
});
const commits = tags.map((tag) =>
  execFileSync("git", ["rev-list", "-n", "1", tag], { cwd: repoRoot, encoding: "utf8" }).trim(),
);

if (new Set(commits).size !== 1) {
  throw new Error(`CDS release tags point to different commits: ${JSON.stringify({ tags, commits })}`);
}
if (process.env.GITHUB_SHA && commits[0] !== process.env.GITHUB_SHA) {
  throw new Error(`CDS release tags point to ${commits[0]}, expected workflow SHA ${process.env.GITHUB_SHA}`);
}

console.log(`✓ CDS release tags share commit ${commits[0]} — ${tags.join(", ")}`);
