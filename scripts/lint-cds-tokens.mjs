#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FORBIDDEN_MOTION_DURATION = /--cds-motion-duration-[a-z0-9-]+/gi;

export function findForbiddenMotionTokens(source, file = "<source>") {
  const findings = [];

  for (const match of source.matchAll(FORBIDDEN_MOTION_DURATION)) {
    const before = source.slice(0, match.index);
    findings.push({
      file,
      line: before.split("\n").length,
      token: match[0],
    });
  }

  return findings;
}

function listSourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSourceFiles(absolutePath);
    return /\.[cm]?[jt]sx?$/.test(entry.name) ? [absolutePath] : [];
  });
}

export function lintCdsUiTokens(repoRoot) {
  const sourceRoot = path.join(repoRoot, "packages/cds-ui/src");
  return listSourceFiles(sourceRoot).flatMap((file) =>
    findForbiddenMotionTokens(
      fs.readFileSync(file, "utf8"),
      path.relative(repoRoot, file),
    ),
  );
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const findings = lintCdsUiTokens(repoRoot);

  if (findings.length > 0) {
    console.error("✖ CDS token namespace check failed");
    for (const finding of findings) {
      console.error(`  ${finding.file}:${finding.line} — ${finding.token}`);
    }
    console.error("  → use the defined --cds-duration-* motion tokens");
    process.exit(1);
  }

  console.log("✓ CDS token namespace OK — no --cds-motion-duration-* references");
}
