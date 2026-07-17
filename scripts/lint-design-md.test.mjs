import assert from "node:assert/strict";
import test from "node:test";
import { readProfileDocuments, validateDocuments } from "./lint-design-md.mjs";

test("accepts the four repository profiles", () => {
  assert.deepEqual(validateDocuments(readProfileDocuments()), []);
});

test("rejects a cross-profile color drift", () => {
  const documents = readProfileDocuments().map((document) =>
    document.profile === "desktop"
      ? { ...document, content: document.content.replace('primary: "#1b1c1e"', 'primary: "#222222"') }
      : document,
  );
  assert.match(validateDocuments(documents).join("\n"), /desktop: general과 공통 colors invariant/);
});

test("rejects a mobile touch target below 44px", () => {
  const documents = readProfileDocuments().map((document) =>
    document.profile === "mobile"
      ? { ...document, content: document.content.replace("height: 48px", "height: 40px") }
      : document,
  );
  assert.match(validateDocuments(documents).join("\n"), /touch target은 44px 이상/);
});
