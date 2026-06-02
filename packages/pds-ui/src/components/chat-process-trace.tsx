"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import { CaretRight } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import type { TextBlock, ThinkingBlock, ToolResultBlock, ToolUseBlock } from "../types/chat";

export type ProcessTraceBlock = TextBlock | ThinkingBlock | ToolUseBlock | ToolResultBlock;

const chatProcessTrace = tv({
  slots: {
    root: "flex w-full flex-col",
    trigger: [
      "inline-flex items-center gap-[6px] self-start",
      "text-[13px] leading-[18px]",
      "text-[color:var(--pds-label-alternative)]",
      "cursor-pointer select-none border-0 bg-transparent p-0",
      "transition-colors hover:text-[color:var(--pds-label-neutral)]",
    ],
    triggerLabelRunning: "pds-animate-text-shimmer",
    triggerChevron: [
      "h-[14px] w-[14px] shrink-0",
      "transition-transform duration-[var(--pds-motion-duration-fast,150ms)]",
      "data-[expanded=true]:rotate-90",
    ],
    content: ["pds-chat-collapsible"],
    contentInner: ["flex flex-col gap-[10px] pt-[10px]"],
    text: [
      "text-[13px] leading-[20px]",
      "text-[color:var(--pds-label-neutral)]",
      "whitespace-pre-wrap break-words",
    ],
    row: ["flex flex-col gap-[4px]"],
    rowHeader: [
      "flex w-full items-center gap-[6px]",
      "text-[13px] leading-[18px] text-left",
      "text-[color:var(--pds-label-alternative)]",
      "border-0 bg-transparent p-0",
    ],
    rowHeaderInteractive: [
      "cursor-pointer transition-colors",
      "hover:text-[color:var(--pds-label-neutral)]",
    ],
    rowIcon: ["inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center"],
    rowLabel: ["min-w-0 truncate"],
    rowFailed: [
      "inline-flex shrink-0 items-center px-[6px] py-[1px]",
      "text-[11px] leading-[14px]",
      "rounded-[4px]",
      "bg-[color:var(--pds-chat-tone-error-bg,var(--pds-fill-alternative))]",
      "text-[color:var(--pds-status-negative)]",
    ],
    rowResult: ["pds-chat-collapsible"],
    rowResultInner: [
      "pl-[20px] pt-[2px] pb-[4px]",
      "text-[12px] leading-[18px]",
      "text-[color:var(--pds-label-alternative)]",
      "whitespace-pre-wrap break-words",
    ],
  },
});

type ChatProcessTraceStyles = ReturnType<typeof chatProcessTrace>;

type ResolveToolLabel = (name: string, input: unknown) => string | undefined;
type ResolveToolIcon = (name: string, input: unknown) => React.ReactNode | undefined;
type RenderMarkdown = (text: string) => React.ReactNode;

type ChatProcessTraceProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "content" | "onChange"
> & {
  /**
   * trace 에 포함될 콘텐츠 블록들. thinking·tool_use·tool_result·중간 text 블록만.
   * 최종 답변(text) 블록은 외부에서 분리해 ChatAssistantMessage 등으로 렌더한다.
   */
  blocks: ProcessTraceBlock[];

  /** 진행 중이면 trigger 라벨 shimmer + "Thinking" 표시. */
  isRunning?: boolean;

  /** 완료 시 trigger 라벨 "Thought for {⌈ms/1000⌉}s" 에 사용. */
  durationMs?: number;

  /**
   * 도구 라벨 resolver. 반환이 `undefined` 이면 PDS 빌트인(bash, text_editor,
   * web_search, code_execution) → 도구명 raw 순으로 fallback.
   *
   * @example
   *   resolveToolLabel={(name, input) => {
   *     if (name.startsWith("mcp__linear__"))
   *       return `Linear · ${name.replace("mcp__linear__", "")}`;
   *   }}
   */
  resolveToolLabel?: ResolveToolLabel;

  /** 도구 카테고리 아이콘 resolver. 미주입 시 아이콘 생략. */
  resolveToolIcon?: ResolveToolIcon;

  /** 마크다운 렌더러. 미주입 시 plain text. thinking·중간 멘트·tool 결과 모두 동일 적용. */
  renderMarkdown?: RenderMarkdown;

  /** controlled 모드. */
  open?: boolean;
  /** uncontrolled 모드 초기값. 기본 false. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  className?: string;
};

const BUILTIN_TOOL_LABELS: Record<string, (input: unknown) => string> = {
  bash: (input) => {
    const command = pickString(input, "command");
    return command ? `Ran ${command}` : "Ran command";
  },
  web_search: (input) => {
    const query = pickString(input, "query");
    return query ? `Searched "${query}"` : "Searched the web";
  },
  text_editor: textEditorLabel,
  str_replace_editor: textEditorLabel,
  str_replace_based_edit_tool: textEditorLabel,
  code_execution: () => "Executed code",
};

function textEditorLabel(input: unknown): string {
  const path = pickString(input, "path");
  const command = pickString(input, "command");
  const target = path ?? "file";
  switch (command) {
    case "view":
      return `Read ${target}`;
    case "create":
      return `Created ${target}`;
    case "str_replace":
    case "insert":
      return `Edited ${target}`;
    default:
      return path ? `Edited ${target}` : "Edited file";
  }
}

function pickString(input: unknown, key: string): string | undefined {
  if (!input || typeof input !== "object") return undefined;
  const value = (input as Record<string, unknown>)[key];
  return typeof value === "string" ? value : undefined;
}

function resolveLabel(name: string, input: unknown, resolver?: ResolveToolLabel): string {
  const userLabel = resolver?.(name, input);
  if (typeof userLabel === "string" && userLabel.length > 0) return userLabel;
  const builtin = BUILTIN_TOOL_LABELS[name];
  if (builtin) {
    const label = builtin(input);
    if (label.length > 0) return label;
  }
  return name;
}

function extractToolResultText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    const parts: string[] = [];
    for (const item of content) {
      if (
        item &&
        typeof item === "object" &&
        (item as { type?: unknown }).type === "text" &&
        typeof (item as { text?: unknown }).text === "string"
      ) {
        parts.push((item as { text: string }).text);
      }
    }
    return parts.join("\n");
  }
  return "";
}

function formatDuration(ms: number): string {
  const seconds = Math.max(1, Math.ceil(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return remaining > 0 ? `${minutes}m ${remaining}s` : `${minutes}m`;
}

const ChatProcessTrace = React.forwardRef<HTMLDivElement, ChatProcessTraceProps>(
  function ChatProcessTrace(
    {
      blocks,
      isRunning = false,
      durationMs,
      resolveToolLabel,
      resolveToolIcon,
      renderMarkdown,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      className,
      ...rest
    },
    ref,
  ) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const toggle = React.useCallback(() => {
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    }, [isOpen, isControlled, onOpenChange]);

    const resultMap = React.useMemo(() => {
      const map = new Map<string, ToolResultBlock>();
      for (const b of blocks) {
        if (b.type === "tool_result") map.set(b.tool_use_id, b);
      }
      return map;
    }, [blocks]);

    const items = React.useMemo(() => blocks.filter((b) => b.type !== "tool_result"), [blocks]);

    const styles = chatProcessTrace();

    const triggerLabel = isRunning
      ? "Thinking"
      : durationMs !== undefined
        ? `Thought for ${formatDuration(durationMs)}`
        : "Thought";

    return (
      <div
        ref={ref}
        data-slot="chat-process-trace"
        data-expanded={isOpen}
        data-running={isRunning}
        className={cn(styles.root(), className)}
        {...rest}
      >
        <button
          type="button"
          data-slot="chat-process-trace-trigger"
          data-expanded={isOpen}
          aria-expanded={isOpen}
          onClick={toggle}
          className={styles.trigger()}
        >
          <span className={cn(isRunning && styles.triggerLabelRunning())}>{triggerLabel}</span>
          {isRunning ? null : (
            <CaretRight
              data-expanded={isOpen}
              aria-hidden="true"
              className={styles.triggerChevron()}
            />
          )}
        </button>
        <div
          data-slot="chat-process-trace-content"
          data-expanded={isOpen}
          className={styles.content()}
        >
          <div>
            <div className={styles.contentInner()}>
              {items.map((block, i) => {
                if (block.type === "thinking") {
                  const key = `thinking-${i}-${block.thinking.slice(0, 16)}`;
                  return (
                    <div key={key} className={styles.text()}>
                      {renderMarkdown ? renderMarkdown(block.thinking) : block.thinking}
                    </div>
                  );
                }
                if (block.type === "text") {
                  const key = `text-${i}-${block.text.slice(0, 16)}`;
                  return (
                    <div key={key} className={styles.text()}>
                      {renderMarkdown ? renderMarkdown(block.text) : block.text}
                    </div>
                  );
                }
                if (block.type === "tool_use") {
                  return (
                    <ToolRow
                      key={`tool-${block.id}`}
                      block={block}
                      result={resultMap.get(block.id)}
                      resolveToolLabel={resolveToolLabel}
                      resolveToolIcon={resolveToolIcon}
                      renderMarkdown={renderMarkdown}
                      styles={styles}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

type ToolRowProps = {
  block: ToolUseBlock;
  result: ToolResultBlock | undefined;
  resolveToolLabel: ResolveToolLabel | undefined;
  resolveToolIcon: ResolveToolIcon | undefined;
  renderMarkdown: RenderMarkdown | undefined;
  styles: ChatProcessTraceStyles;
};

function ToolRow({
  block,
  result,
  resolveToolLabel,
  resolveToolIcon,
  renderMarkdown,
  styles,
}: ToolRowProps) {
  const [open, setOpen] = React.useState(false);

  const label = resolveLabel(block.name, block.input, resolveToolLabel);
  const icon = resolveToolIcon?.(block.name, block.input);
  const resultText = result ? extractToolResultText(result.content) : "";
  const hasResult = resultText.length > 0;
  const isFailed = result?.is_error === true;

  const headerInner = (
    <>
      {icon ? (
        <span aria-hidden="true" className={styles.rowIcon()}>
          {icon}
        </span>
      ) : null}
      <span className={styles.rowLabel()}>{label}</span>
      {isFailed ? <span className={styles.rowFailed()}>failed</span> : null}
    </>
  );

  return (
    <div data-slot="chat-process-trace-row" className={styles.row()}>
      {hasResult ? (
        <button
          type="button"
          data-slot="chat-process-trace-row-header"
          data-expanded={open}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(styles.rowHeader(), styles.rowHeaderInteractive())}
        >
          {headerInner}
        </button>
      ) : (
        <div data-slot="chat-process-trace-row-header" className={styles.rowHeader()}>
          {headerInner}
        </div>
      )}
      {hasResult ? (
        <div data-expanded={open} className={styles.rowResult()}>
          <div>
            <div className={styles.rowResultInner()}>
              {renderMarkdown ? renderMarkdown(resultText) : resultText}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export type { ChatProcessTraceProps, ResolveToolIcon, ResolveToolLabel };
export { ChatProcessTrace, chatProcessTrace };
