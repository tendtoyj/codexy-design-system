"use client";

import { Code, FolderSimple, MagnifyingGlass, Terminal } from "@fluxloop-ai/pds-icons/icons";
import { renderMarkdown } from "@fluxloop-ai/pds-markdown";
import { ChatAssistantMessage } from "@fluxloop-ai/pds-ui/components/chat-assistant-message";
import {
  ChatProcessTrace,
  type ProcessTraceBlock,
  type ResolveToolIcon,
} from "@fluxloop-ai/pds-ui/components/chat-process-trace";
import { useEffect, useState } from "react";

const ICON_BY_NAME: Record<string, React.ReactNode> = {
  bash: <Terminal />,
  text_editor: <FolderSimple />,
  str_replace_editor: <FolderSimple />,
  str_replace_based_edit_tool: <FolderSimple />,
  web_search: <MagnifyingGlass />,
  code_execution: <Code />,
};

const resolveToolIcon: ResolveToolIcon = (name) => ICON_BY_NAME[name];

const THINKING_ONLY: ProcessTraceBlock[] = [
  {
    type: "thinking",
    thinking:
      "PDF 텍스트 추출 가능 여부부터 확인할게요. 슬라이드라서 텍스트 레이어가 있으면 바로 요약, 이미지 기반이면 페이지 렌더/OCR 필요 여부만 짧게 말하겠습니다.",
  },
];

const SINGLE_TOOL: ProcessTraceBlock[] = [
  {
    type: "thinking",
    thinking: "먼저 디렉터리 구조를 확인하겠습니다.",
  },
  {
    type: "tool_use",
    id: "t1",
    name: "bash",
    input: { command: "ls -la src/" },
  },
  {
    type: "tool_result",
    tool_use_id: "t1",
    content: "total 24\ndrwxr-xr-x  components\ndrwxr-xr-x  hooks\n-rw-r--r--  index.ts",
  },
];

const MULTI_TOOL: ProcessTraceBlock[] = [
  {
    type: "thinking",
    thinking: "레포의 현재 폴더 구성을 읽어서 핵심 구조만 정리하겠습니다. 코드 변경 없음.",
  },
  {
    type: "tool_use",
    id: "m1",
    name: "bash",
    input: { command: "ls -la" },
  },
  {
    type: "tool_result",
    tool_use_id: "m1",
    content: "Listed files in .\nListed files in .",
  },
  {
    type: "text",
    text: "의존성/빌드 산출물까지 섞이면 구조가 흐려져서, `.git`, `.next`, `node_modules` 는 제외하고 앱 중심 구조를 다시 좁혀 보겠습니다.",
  },
  {
    type: "tool_use",
    id: "m2",
    name: "text_editor",
    input: { command: "view", path: "package.json" },
  },
  {
    type: "tool_result",
    tool_use_id: "m2",
    content: '{"name":"my-app","version":"0.1.0"}',
  },
  {
    type: "tool_use",
    id: "m3",
    name: "web_search",
    input: { query: "React 19 collapsible patterns" },
  },
  {
    type: "tool_result",
    tool_use_id: "m3",
    content: "Found 5 results discussing grid-template-rows transition technique.",
  },
];

const FAILED_TOOL: ProcessTraceBlock[] = [
  {
    type: "tool_use",
    id: "f1",
    name: "bash",
    input: { command: "pdftotext input.pdf" },
  },
  {
    type: "tool_result",
    tool_use_id: "f1",
    content: "command not found: pdftotext",
    is_error: true,
  },
  {
    type: "text",
    text: "`pdftotext` 는 없고 Python 런타임만 보입니다. 번들 PDF 라이브러리로 텍스트를 뽑아보겠습니다.",
  },
  {
    type: "tool_use",
    id: "f2",
    name: "bash",
    input: { command: "python -c 'import pypdf; print(\"ok\")'" },
  },
  {
    type: "tool_result",
    tool_use_id: "f2",
    content: "ok",
  },
];

const RUNNING_BLOCKS: ProcessTraceBlock[] = [
  {
    type: "thinking",
    thinking: "사용자 의도를 먼저 파악하고, 가장 짧은 답변을 준비합니다.",
  },
];

const RUNNING_CYCLE_MS = 4000;

export function ChatProcessTraceDemo() {
  const [running, setRunning] = useState(true);
  const [duration, setDuration] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      setRunning(false);
      setDuration(4200);
    }, RUNNING_CYCLE_MS);
    return () => clearTimeout(t);
  }, [running]);

  useEffect(() => {
    if (running) return;
    const t = setTimeout(() => {
      setRunning(true);
      setDuration(undefined);
    }, RUNNING_CYCLE_MS);
    return () => clearTimeout(t);
  }, [running]);

  return (
    <div className="pds-trace-demo">
      <Section title="① Thinking only (정적)">
        <ChatProcessTrace
          blocks={THINKING_ONLY}
          durationMs={3200}
          renderMarkdown={renderMarkdown}
        />
        <ChatAssistantMessage
          content="텍스트 레이어가 있는 일반 PDF 라면 그대로 추출 가능합니다."
          renderMarkdown={renderMarkdown}
        />
      </Section>

      <Section title="② Single tool call (정적)">
        <ChatProcessTrace
          blocks={SINGLE_TOOL}
          durationMs={1800}
          resolveToolIcon={resolveToolIcon}
          renderMarkdown={renderMarkdown}
        />
        <ChatAssistantMessage
          content="`src/` 아래에 components / hooks / index.ts 가 있어요."
          renderMarkdown={renderMarkdown}
        />
      </Section>

      <Section title="③ Multi-tool with intermediate text (정적)">
        <ChatProcessTrace
          blocks={MULTI_TOOL}
          durationMs={42_000}
          resolveToolIcon={resolveToolIcon}
          renderMarkdown={renderMarkdown}
        />
        <ChatAssistantMessage
          content="앱 중심 구조는 `app/` `components/` `lib/` 세 갈래로 나뉘어 있고, package.json 은 v0.1.0 입니다."
          renderMarkdown={renderMarkdown}
        />
      </Section>

      <Section title="④ Failed tool 포함 (정적)">
        <ChatProcessTrace
          blocks={FAILED_TOOL}
          durationMs={6800}
          resolveToolIcon={resolveToolIcon}
          renderMarkdown={renderMarkdown}
        />
        <ChatAssistantMessage
          content="`pdftotext` 가 없어서 `pypdf` 로 우회했어요."
          renderMarkdown={renderMarkdown}
        />
      </Section>

      <Section title="⑤ Running ↔ Done 자동 토글 (라이브)">
        <ChatProcessTrace
          blocks={RUNNING_BLOCKS}
          isRunning={running}
          durationMs={duration}
          resolveToolIcon={resolveToolIcon}
          renderMarkdown={renderMarkdown}
        />
        <p className="pds-trace-demo__caption">
          {running ? "진행 중 — trigger 라벨에 shimmer 적용" : "완료 — 'Thought for Xs' 정적 표시"}
        </p>
      </Section>

      <Styles />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pds-trace-demo__section">
      <h4 className="pds-trace-demo__title">{title}</h4>
      <div className="pds-trace-demo__card">{children}</div>
    </section>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-trace-demo {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 16px 0;
      }
      .pds-trace-demo__section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .pds-trace-demo__title {
        margin: 0;
        font-size: var(--text-caption1);
        font-weight: var(--pds-font-weight-semibold);
        color: var(--pds-label-neutral);
      }
      .pds-trace-demo__card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 400px;
        max-width: 100%;
        padding: 16px 18px;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-trace-demo__caption {
        margin: 0;
        font-size: var(--text-caption1);
        color: var(--pds-label-assistive);
      }
    `}</style>
  );
}
