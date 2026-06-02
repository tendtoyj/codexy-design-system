"use client";

import { CaretDown, HandWaving, Microphone, Plus } from "@fluxloop-ai/pds-icons/icons";
import { ChatAttachmentChip } from "@fluxloop-ai/pds-ui/components/chat-attachment-chip";
import { ChatComposer } from "@fluxloop-ai/pds-ui/components/chat-composer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@fluxloop-ai/pds-ui/components/dropdown-menu";
import { IconButton } from "@fluxloop-ai/pds-ui/components/icon-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@fluxloop-ai/pds-ui/components/tooltip";
import { useState } from "react";

export function ChatComposerIdleDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          window.alert(`Submitted: ${v}`);
          setValue("");
        }}
      />
      <Styles />
    </div>
  );
}

export function ChatComposerStreamingDemo() {
  const [value, setValue] = useState("작성 중인 메시지…");
  const [streaming, setStreaming] = useState(true);
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer
        value={value}
        onChange={setValue}
        isStreaming={streaming}
        onSubmit={(v) => {
          setStreaming(true);
          setValue(v);
        }}
        onCancel={() => {
          setStreaming(false);
          window.alert("Cancelled");
        }}
      />
      <button type="button" className="pds-chat-demo-ctrl" onClick={() => setStreaming((s) => !s)}>
        toggle streaming
      </button>
      <Styles />
    </div>
  );
}

const TONE_OPTIONS = [
  { id: "wave", label: "친근하게" },
  { id: "formal", label: "정중하게" },
  { id: "concise", label: "간결하게" },
];

const MODEL_OPTIONS = [
  { id: "5.5-high", label: "5.5 높음" },
  { id: "5.5-mid", label: "5.5 보통" },
  { id: "4.5", label: "4.5 일반" },
];

const ATTACHMENT_THUMB_A =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23FFB347'/><stop offset='1' stop-color='%23FF6B6B'/></linearGradient></defs><rect width='40' height='40' fill='url(%23g)'/><circle cx='14' cy='16' r='5' fill='%23FFFFFF' opacity='0.9'/><circle cx='27' cy='24' r='7' fill='%23FFFFFF' opacity='0.7'/></svg>";

const ATTACHMENT_THUMB_B =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%231F2937'/><stop offset='1' stop-color='%234B5563'/></linearGradient></defs><rect width='40' height='40' fill='url(%23g)'/><path d='M28 12a10 10 0 0 1-12 14 8 8 0 0 0 12-14z' fill='%23FCD34D'/></svg>";

const INITIAL_ATTACHMENTS: Array<
  | { id: string; type: "image"; name: string; imageSrc: string }
  | { id: string; type: "file"; name: string }
> = [
  {
    id: "img-1",
    type: "image",
    name: "ui-reference.png",
    imageSrc: ATTACHMENT_THUMB_A,
  },
  {
    id: "img-2",
    type: "image",
    name: "color-palette-draft-2026.jpg",
    imageSrc: ATTACHMENT_THUMB_B,
  },
  { id: "file-1", type: "file", name: "release-notes-2026-q2.md" },
  { id: "file-2", type: "file", name: "design-tokens.json" },
  { id: "file-3", type: "file", name: "archive.zip" },
];

export function ChatComposerAccessoriesDemo() {
  const [value, setValue] = useState("");
  const [tone, setTone] = useState("wave");
  const [model, setModel] = useState("5.5-high");
  const [attachments, setAttachments] = useState(INITIAL_ATTACHMENTS);
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          window.alert(`Submitted: ${v}`);
          setValue("");
        }}
        placeholder="후속 변경 사항을 부탁하세요"
        topAccessory={
          attachments.length > 0 ? (
            <div className="pds-chat-demo-attachments">
              {attachments.map((a) =>
                a.type === "image" ? (
                  <ChatAttachmentChip
                    key={a.id}
                    type="image"
                    name={a.name}
                    imageSrc={a.imageSrc}
                    onRemove={() => setAttachments((list) => list.filter((x) => x.id !== a.id))}
                  />
                ) : (
                  <ChatAttachmentChip
                    key={a.id}
                    type="file"
                    name={a.name}
                    onRemove={() => setAttachments((list) => list.filter((x) => x.id !== a.id))}
                  />
                ),
              )}
            </div>
          ) : null
        }
        leadingToolbar={
          <IconButton size="sm" variant="subtle" aria-label="첨부">
            <Plus />
          </IconButton>
        }
        trailingToolbar={
          <IconButton size="sm" variant="subtle" aria-label="음성">
            <Microphone />
          </IconButton>
        }
        bottomAccessory={
          <div className="pds-chat-demo-row">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="pds-chat-demo-chip" aria-label="톤 선택">
                  <HandWaving width={14} height={14} />
                  <CaretDown width={10} height={10} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" size="sm">
                <DropdownMenuRadioGroup value={tone} onValueChange={setTone}>
                  {TONE_OPTIONS.map((o) => (
                    <DropdownMenuRadioItem key={o.id} value={o.id}>
                      {o.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="pds-chat-demo-chip" aria-label="모델 선택">
                  {MODEL_OPTIONS.find((o) => o.id === model)?.label}
                  <CaretDown width={10} height={10} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" size="sm">
                <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                  {MODEL_OPTIONS.map((o) => (
                    <DropdownMenuRadioItem key={o.id} value={o.id}>
                      {o.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <ContextRingTrigger percent={0.08} />
          </div>
        }
      />
      <Styles />
    </div>
  );
}

export function ChatComposerStatesDemo() {
  const [v1, setV1] = useState("");
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer value={v1} onChange={setV1} onSubmit={() => {}} disabled />
      <Styles />
    </div>
  );
}

function ContextRingTrigger({ percent }: { percent: number }) {
  const pct = Math.round(percent * 100);
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton
            size="sm"
            variant="subtle"
            className="ml-auto"
            aria-label={`컨텍스트 ${pct}/100% 사용`}
          >
            <ContextRing percent={percent} />
          </IconButton>
        </TooltipTrigger>
        <TooltipContent size="sm" side="top">{`${pct}/100% 사용`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ContextRing({ percent }: { percent: number }) {
  const r = 5.5;
  const c = 2 * Math.PI * r;
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle
        cx="7"
        cy="7"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
      />
      <circle
        cx="7"
        cy="7"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - percent)}
        transform="rotate(-90 7 7)"
      />
    </svg>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-chat-demo-card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 0;
        margin: 16px 0;
        max-width: 400px;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-chat-demo-ctrl {
        align-self: flex-end;
        margin-right: 16px;
        padding: 4px 10px;
        font-size: 12px;
        border: 1px solid var(--pds-line-normal-normal);
        border-radius: var(--pds-radius-sm);
        background: var(--pds-background-normal-normal);
        cursor: pointer;
      }
      .pds-chat-demo-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        height: 24px;
        padding: 0 6px;
        font-size: 12px;
        color: var(--pds-label-alternative);
        border: 0;
        border-radius: 6px;
        background: transparent;
        cursor: pointer;
      }
      .pds-chat-demo-chip:hover {
        background: var(--pds-background-normal-alternative);
        color: var(--pds-label-normal);
      }
      .pds-chat-demo-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0 6px;
      }
      .pds-chat-demo-attachments {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
    `}</style>
  );
}
