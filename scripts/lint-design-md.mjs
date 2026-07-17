#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lint } from "@google/design.md/linter";
import { parse } from "yaml";

const repoRoot = path.resolve(fileURLToPath(import.meta.url), "../..");
export const profileNames = ["general", "desktop", "mobile", "web"];
const canonicalSections = [
  "Overview",
  "Colors",
  "Typography",
  "Layout",
  "Elevation & Depth",
  "Shapes",
  "Components",
  "Do's and Don'ts",
];

function parseFrontmatter(content, profile) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`${profile}: YAML frontmatter가 없습니다.`);
  return parse(match[1]);
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => [key, stable(child)]),
  );
}

function same(left, right) {
  return JSON.stringify(stable(left)) === JSON.stringify(stable(right));
}

function typographyInvariant(typography = {}) {
  return Object.fromEntries(
    Object.entries(typography).map(([role, value]) => [
      role,
      { fontFamily: value.fontFamily, fontWeight: value.fontWeight },
    ]),
  );
}

function findStructuralErrors(document) {
  const errors = [];
  const headings = [...document.content.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
  const duplicates = headings.filter((heading, index) => headings.indexOf(heading) !== index);
  if (duplicates.length) errors.push(`중복 section: ${[...new Set(duplicates)].join(", ")}`);

  const recognized = headings.filter((heading) => canonicalSections.includes(heading));
  if (!same(recognized, canonicalSections)) {
    errors.push(`section은 canonical order 전체를 포함해야 합니다: ${canonicalSections.join(" → ")}`);
  }

  const prohibited = [
    [/^\s*extends\s*:/m, "extends"],
    [/@tendtoyj\//, "CDS package import"],
    [/var\(--cds-[^)]+\)/, "CDS CSS variable"],
    [/\bclass(?:Name)?\s*=\s*["'{]/, "Tailwind/class code snippet"],
  ];
  for (const [pattern, label] of prohibited) {
    if (pattern.test(document.content)) errors.push(`금지된 ${label} 표현이 남아 있습니다.`);
  }

  return errors;
}

function findOfficialErrors(document) {
  const report = lint(document.content);
  return report.findings
    .filter(
      (finding) =>
        finding.severity === "error" ||
        finding.message.includes("below WCAG AA") ||
        finding.message.includes("no 'primary'") ||
        finding.message.includes("No typography") ||
        finding.message.includes("canonical order"),
    )
    .map((finding) => `${finding.path ? `${finding.path}: ` : ""}${finding.message}`);
}

function findPlatformErrors(document) {
  const errors = [];
  if (document.profile === "mobile") {
    const interactive = Object.entries(document.tokens.components ?? {}).filter(([name]) =>
      /(button|input|select|checkbox|radio|switch|navigation|tab)/i.test(name),
    );
    if (!interactive.length) errors.push("mobile profile에 touch control이 없습니다.");
    for (const [name, component] of interactive) {
      const rawSize = component.height ?? component.size;
      const size = Number.parseFloat(String(rawSize ?? ""));
      if (!Number.isFinite(size) || size < 44) {
        errors.push(`components.${name}의 touch target은 44px 이상이어야 합니다.`);
      }
    }
  }

  if (document.profile === "web") {
    for (const range of ["compact", "medium", "wide"]) {
      if (!new RegExp(`\\b${range}\\b`, "i").test(document.content)) {
        errors.push(`web profile에 ${range} viewport rule이 없습니다.`);
      }
    }
  }
  return errors;
}

export function validateDocuments(inputs) {
  const errors = [];
  const documents = [];

  for (const input of inputs) {
    try {
      const document = { ...input, tokens: parseFrontmatter(input.content, input.profile) };
      documents.push(document);
      for (const message of [
        ...findStructuralErrors(document),
        ...findOfficialErrors(document),
        ...findPlatformErrors(document),
      ]) {
        errors.push(`${document.profile}: ${message}`);
      }
    } catch (error) {
      errors.push(`${input.profile}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const baseline = documents.find((document) => document.profile === "general");
  if (baseline) {
    const invariants = [
      ["colors", (tokens) => tokens.colors],
      ["typography family/weight", (tokens) => typographyInvariant(tokens.typography)],
      ["spacing", (tokens) => tokens.spacing],
      ["rounded", (tokens) => tokens.rounded],
    ];
    for (const document of documents.filter((item) => item !== baseline)) {
      for (const [label, select] of invariants) {
        if (!same(select(baseline.tokens), select(document.tokens))) {
          errors.push(`${document.profile}: general과 공통 ${label} invariant가 다릅니다.`);
        }
      }
    }
  }

  return errors;
}

export function readProfileDocuments(root = repoRoot) {
  return profileNames.map((profile) => {
    const filePath = path.join(root, "design-md", profile, "DESIGN.md");
    return { profile, filePath, content: fs.readFileSync(filePath, "utf8") };
  });
}

function run() {
  let documents;
  try {
    documents = readProfileDocuments();
  } catch (error) {
    console.error(`✖ DESIGN.md 파일을 읽을 수 없습니다: ${error.message}`);
    process.exit(1);
  }

  const errors = validateDocuments(documents);
  if (errors.length) {
    console.error("✖ DESIGN.md validation failed\n");
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }
  console.log(`✓ DESIGN.md validation OK — ${documents.length} standalone profiles`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) run();
