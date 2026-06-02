"use client";

import { ChatAttachmentChip } from "@fluxloop-ai/pds-ui/components/chat-attachment-chip";
import { useState } from "react";

const THUMB_A =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23FFB347'/><stop offset='1' stop-color='%23FF6B6B'/></linearGradient></defs><rect width='40' height='40' fill='url(%23g)'/><circle cx='14' cy='16' r='5' fill='%23FFFFFF' opacity='0.9'/><circle cx='27' cy='24' r='7' fill='%23FFFFFF' opacity='0.7'/></svg>";

const THUMB_B =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%231F2937'/><stop offset='1' stop-color='%234B5563'/></linearGradient></defs><rect width='40' height='40' fill='url(%23g)'/><path d='M28 12a10 10 0 0 1-12 14 8 8 0 0 0 12-14z' fill='%23FCD34D'/></svg>";

export function ChatAttachmentChipBasicDemo() {
  return (
    <div className="pds-attach-frame">
      <ChatAttachmentChip type="image" name="ui-reference.png" imageSrc={THUMB_A} />
      <ChatAttachmentChip type="image" name="color-palette-draft-2026.jpg" imageSrc={THUMB_B} />
      <ChatAttachmentChip type="file" name="release-notes-2026-q2.md" />
      <ChatAttachmentChip type="file" name="design-tokens.json" />
      <ChatAttachmentChip type="file" name="archive.zip" />
      <Styles />
    </div>
  );
}

const REMOVABLE_INITIAL: Array<
  | { id: string; type: "image"; name: string; imageSrc: string }
  | { id: string; type: "file"; name: string }
> = [
  { id: "1", type: "image", name: "screenshot.png", imageSrc: THUMB_A },
  { id: "2", type: "file", name: "spec.md" },
  { id: "3", type: "file", name: "schema.json" },
];

export function ChatAttachmentChipRemovableDemo() {
  const [items, setItems] = useState(REMOVABLE_INITIAL);
  return (
    <div className="pds-attach-frame">
      {items.map((a) =>
        a.type === "image" ? (
          <ChatAttachmentChip
            key={a.id}
            type="image"
            name={a.name}
            imageSrc={a.imageSrc}
            onRemove={() => setItems((list) => list.filter((x) => x.id !== a.id))}
          />
        ) : (
          <ChatAttachmentChip
            key={a.id}
            type="file"
            name={a.name}
            onRemove={() => setItems((list) => list.filter((x) => x.id !== a.id))}
          />
        ),
      )}
      {items.length === 0 ? (
        <button
          type="button"
          className="pds-attach-reset"
          onClick={() => setItems(REMOVABLE_INITIAL)}
        >
          reset
        </button>
      ) : null}
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-attach-frame {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding: 24px;
        margin: 16px 0;
        max-width: 560px;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-attach-reset {
        height: 28px;
        padding: 0 12px;
        font-size: 12px;
        border: 1px solid var(--pds-line-normal-normal);
        border-radius: 999px;
        background: transparent;
        color: var(--pds-label-alternative);
        cursor: pointer;
      }
      .pds-attach-reset:hover {
        background: var(--pds-fill-normal);
        color: var(--pds-label-normal);
      }
    `}</style>
  );
}
