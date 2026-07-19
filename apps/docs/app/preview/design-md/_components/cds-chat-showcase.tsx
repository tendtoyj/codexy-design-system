"use client";

import { CaretDown, Microphone, Paperclip } from "@tendtoyj/cds-icons/icons";
import { renderMarkdown } from "@tendtoyj/cds-markdown";
import { Button } from "@tendtoyj/cds-ui/components/button";
import { ChatAssistantMessage } from "@tendtoyj/cds-ui/components/chat-assistant-message";
import { ChatAttachmentChip } from "@tendtoyj/cds-ui/components/chat-attachment-chip";
import { ChatComposer } from "@tendtoyj/cds-ui/components/chat-composer";
import {
  ChatProcessTrace,
  type ProcessTraceBlock,
} from "@tendtoyj/cds-ui/components/chat-process-trace";
import { ChatUserMessage } from "@tendtoyj/cds-ui/components/chat-user-message";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@tendtoyj/cds-ui/components/dropdown-menu";
import { IconButton } from "@tendtoyj/cds-ui/components/icon-button";
import { useState } from "react";
import styles from "../chat-showcase.module.css";

type ChatProfile = "general" | "desktop" | "mobile" | "web";

const copy: Record<ChatProfile, { user: string; assistant: string }> = {
  general: {
    user: "코드와 경쟁하지 않는 DESIGN.md의 역할을 한 문장으로 정리해줘.",
    assistant:
      "`DESIGN.md`는 CDS 코드를 복제하는 명세가 아니라, **같은 시각 언어를 제품과 플랫폼 맥락에 맞게 번역하는 가이드**입니다.\n\n색상·형태·AI 응답 위계는 공유하고, 레이아웃과 입력 방식만 각 환경에 맞게 달라집니다.",
  },
  desktop: {
    user: "네 프로필에서 채팅 경험이 어떻게 달라지는지 비교해줘.",
    assistant:
      "핵심 메시지 문법은 같고 작업 밀도만 달라집니다.\n\n- **General** — 사용자 풍선과 비풍선형 AI 응답의 기본 위계\n- **Desktop** — 멀티탭, process trace, 보조 패널을 함께 운영\n- **Mobile** — 단일 스레드와 엄지 도달 범위 우선\n- **Web** — 반응형 작업 영역 안에 AI 패널을 재배치",
  },
  mobile: {
    user: "모바일 채팅에서는 무엇을 가장 먼저 바꿔야 해?",
    assistant:
      "메시지 문법은 유지하고 조작 방식을 바꿔야 해요. composer는 safe area 위에 고정하고, 모든 주요 액션은 **44px 이상** 터치 영역을 확보합니다.",
  },
  web: {
    user: "Web 프로필의 compact 구간을 점검해줘.",
    assistant:
      "AI 패널은 본문 아래로 이동하고, 사용자 메시지의 최대 폭과 composer는 컨테이너 폭을 따라 줄어듭니다. 테이블만 내부 가로 스크롤을 허용합니다.",
  },
};

const traceBlocks: ProcessTraceBlock[] = [
  {
    type: "thinking",
    thinking: "네 문서의 공통 채팅 규칙과 플랫폼별 입력 제약을 함께 확인합니다.",
  },
  {
    type: "tool_use",
    id: "read-design-profiles",
    name: "text_editor",
    input: { command: "view", path: "design-md/*/DESIGN.md" },
  },
  {
    type: "tool_result",
    tool_use_id: "read-design-profiles",
    content:
      "Shared: message hierarchy, composer anatomy, AI trace\nTranslated: density, navigation, touch target, responsive placement",
  },
];

const toneOptions = [
  { id: "friendly", label: "친근하게" },
  { id: "concise", label: "간결하게" },
  { id: "formal", label: "정중하게" },
];

const modelOptions = [
  { id: "5.5-high", label: "5.5 높음" },
  { id: "5.5-balanced", label: "5.5 균형" },
  { id: "4.5-fast", label: "4.5 빠름" },
];

export function CdsChatConversation({
  profile,
  showTrace = false,
}: {
  profile: ChatProfile;
  showTrace?: boolean;
}) {
  const content = copy[profile];

  return (
    <div className={styles.conversation}>
      <ChatUserMessage content={content.user} />
      {showTrace ? (
        <ChatProcessTrace blocks={traceBlocks} durationMs={3200} renderMarkdown={renderMarkdown} />
      ) : null}
      <ChatAssistantMessage content={content.assistant} renderMarkdown={renderMarkdown} />
    </div>
  );
}

export function CdsChatComposer({
  placeholder,
  attachment,
  footerText,
}: {
  placeholder: string;
  attachment?: string;
  footerText?: string;
}) {
  const [value, setValue] = useState("");
  const [tone, setTone] = useState("friendly");
  const [model, setModel] = useState("5.5-high");

  return (
    <ChatComposer
      value={value}
      onChange={setValue}
      onSubmit={() => setValue("")}
      placeholder={placeholder}
      minRows={1}
      maxRows={5}
      footerText={footerText}
      topAccessory={
        attachment ? (
          <div className={styles.attachments}>
            <ChatAttachmentChip type="file" name={attachment} />
          </div>
        ) : undefined
      }
      leadingToolbar={
        <IconButton size="sm" variant="subtle" aria-label="파일 첨부">
          <Paperclip />
        </IconButton>
      }
      trailingToolbar={
        <IconButton size="sm" variant="subtle" aria-label="음성 입력">
          <Microphone />
        </IconButton>
      }
      bottomAccessory={
        <div className={styles.composerMeta}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="frosted"
                size="xs"
                trailingContent={<CaretDown aria-hidden="true" />}
              >
                {toneOptions.find((option) => option.id === tone)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent size="sm" align="start">
              <DropdownMenuRadioGroup value={tone} onValueChange={setTone}>
                {toneOptions.map((option) => (
                  <DropdownMenuRadioItem key={option.id} value={option.id}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="frosted"
                size="xs"
                trailingContent={<CaretDown aria-hidden="true" />}
              >
                {modelOptions.find((option) => option.id === model)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent size="sm" align="start">
              <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                {modelOptions.map((option) => (
                  <DropdownMenuRadioItem key={option.id} value={option.id}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    />
  );
}
