#!/usr/bin/env node
/**
 * publish 직전 가드 — pds-core 가 노출해야 하는 named export 가 빠진 채
 * 패키지가 나가는 사고를 막는다. 과거 dist 가 src 보다 더 많은 export 를
 * 갖고 있었던(stale dist) 시기에 src/index.ts 에서 export 라인이 빠진 채
 * 대량 publish 가 일어났던 사고에서 출발한 검증.
 *
 * dist/index.js 를 실제로 import 해서 named export 존재를 확인한다.
 * 빠진 게 있으면 비제로 종료. CI 의 build / pre-publish 단계에서 호출.
 */
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const distEntry = path.resolve(here, "../dist/index.js");

const required = [
  "cn",
  "tv",
  "twMergeConfig",
  "PDS_TYPOGRAPHY_VARIANTS",
  "pdsCardIn",
  "pdsDuration",
  "pdsEasing",
  "pdsFadeCollapse",
  "pdsStepIn",
  "pdsStylesEntry",
];

let mod;
try {
  mod = await import(distEntry);
} catch (err) {
  console.error(`✖ pds-core dist 를 import 할 수 없음: ${distEntry}`);
  console.error(`  → tsup 빌드가 먼저 실행됐는지 확인.`);
  console.error(err);
  process.exit(1);
}

const missing = required.filter((name) => !(name in mod));
if (missing.length) {
  console.error("✖ pds-core export 검증 실패 — 다음 named export 가 누락:");
  for (const name of missing) console.error(`    - ${name}`);
  console.error(
    "\n  → packages/pds-core/src/index.ts 에서 해당 심볼을 re-export 하고 빌드를 다시 돌려라.",
  );
  process.exit(1);
}

console.log(`✓ pds-core exports OK — ${required.length} named exports present`);
