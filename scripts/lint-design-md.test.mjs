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
  assert.match(validateDocuments(documents).join("\n"), /general과 공통 colors invariant/);
});

test("rejects a mobile touch target below 44px", () => {
  const documents = readProfileDocuments().map((document) =>
    document.profile === "mobile"
      ? { ...document, content: document.content.replace("height: 48px", "height: 40px") }
      : document,
  );
  assert.match(validateDocuments(documents).join("\n"), /touch target은 44px 이상/);
});

test("rejects a missing standalone profile", () => {
  const documents = readProfileDocuments().filter((document) => document.profile !== "web");
  assert.match(validateDocuments(documents).join("\n"), /design-md\/web\/DESIGN.md: 파일이 정확히 하나/);
});

for (const [name, profile, before, after, expected] of [
  [
    "font family",
    "desktop",
    "SF Pro Text, Pretendard Variable",
    "Arial, Pretendard Variable",
    /typography family\/weight invariant/,
  ],
  ["spacing", "mobile", '"8": 32px', '"8": 30px', /spacing invariant/],
  ["rounded", "web", "3xl: 16px", "3xl: 18px", /rounded invariant/],
]) {
  test(`rejects a cross-profile ${name} drift`, () => {
    const documents = readProfileDocuments().map((document) =>
      document.profile === profile
        ? { ...document, content: document.content.replace(before, after) }
        : document,
    );
    assert.match(validateDocuments(documents).join("\n"), expected);
  });
}

test("rejects canonical sections in the wrong order", () => {
  const documents = readProfileDocuments().map((document) =>
    document.profile === "general"
      ? {
          ...document,
          content: document.content.replace("## Colors", "## Typography"),
        }
      : document,
  );
  assert.match(validateDocuments(documents).join("\n"), /canonical order/);
});
