import assert from "node:assert/strict";
import test from "node:test";
import { findForbiddenMotionTokens } from "./lint-cds-tokens.mjs";

test("accepts the defined duration namespace", () => {
  assert.deepEqual(findForbiddenMotionTokens("var(--cds-duration-fast)"), []);
});

test("rejects the legacy namespace without a fallback", () => {
  assert.deepEqual(
    findForbiddenMotionTokens("var(--cds-motion-duration-fast)", "button.tsx"),
    [{ file: "button.tsx", line: 1, token: "--cds-motion-duration-fast" }],
  );
});

test("rejects the legacy namespace even when var() has a fallback", () => {
  assert.equal(findForbiddenMotionTokens("var(--cds-motion-duration-fast, 150ms)").length, 1);
});

test("ignores dynamic custom property expressions", () => {
  assert.deepEqual(findForbiddenMotionTokens("var(${durationToken}, 150ms)"), []);
});
