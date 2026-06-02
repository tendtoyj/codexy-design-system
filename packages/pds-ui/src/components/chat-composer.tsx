"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import { ArrowUp } from "@fluxloop-ai/pds-icons/icons";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as React from "react";

const chatComposer = tv({
  slots: {
    root: "px-[16px] pb-[16px]",
    shell: [
      "flex flex-col overflow-hidden",
      "rounded-[12px] border border-[color:var(--pds-line-normal-normal)]",
      "bg-[var(--pds-background-normal-normal)] shadow-[var(--pds-shadow-sm)]",
    ],
    field: [
      "w-full resize-none border-0 outline-none bg-transparent",
      "px-[14px] pt-[12px]",
      "text-[14px] leading-[20px] text-[color:var(--pds-label-normal)]",
      "placeholder:text-[color:var(--pds-label-assistive)]",
      "disabled:cursor-not-allowed disabled:text-[color:var(--pds-label-alternative)]",
    ],
    helper: "px-[14px] pt-[8px] text-[12px] leading-[18px] text-[color:var(--pds-label-assistive)]",
    error: "px-[14px] pt-[8px] text-[12px] leading-[18px] text-[color:var(--pds-status-negative)]",
    footer: "px-[14px] pt-[8px] text-[12px] leading-[18px] text-[color:var(--pds-label-assistive)]",
    toolbar: ["flex items-center justify-between gap-[12px]", "px-[10px] pt-[4px] pb-[10px]"],
    toolbarStart: [
      "flex items-center gap-[6px] min-w-0",
      "text-[12px] font-medium text-[color:var(--pds-label-normal)]",
    ],
    sendButton: [
      "inline-flex items-center justify-center shrink-0",
      "w-[24px] h-[24px] rounded-full border-0",
      "bg-[var(--pds-label-normal)] text-[color:var(--pds-inverse-label)]",
      "cursor-pointer transition-opacity duration-150",
      "disabled:opacity-40 disabled:cursor-not-allowed",
    ],
    topAccessory: "px-[10px] pt-[10px]",
    bottomAccessory: "mt-[8px]",
  },
});

type ChatComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
  isStreaming?: boolean;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  footerText?: React.ReactNode;
  leadingToolbar?: React.ReactNode;
  trailingToolbar?: React.ReactNode;
  topAccessory?: React.ReactNode;
  bottomAccessory?: React.ReactNode;
  className?: string;
  textareaRef?: React.Ref<HTMLTextAreaElement>;
};

function StopIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1" fill="currentColor" />
    </svg>
  );
}

const LINE_HEIGHT = 20;
const VERTICAL_PADDING = 12;

const ChatComposer = React.forwardRef<HTMLDivElement, ChatComposerProps>(function ChatComposer(
  {
    value,
    onChange,
    onSubmit,
    onCancel,
    isStreaming = false,
    placeholder = "ask a question...",
    minRows = 2,
    maxRows = 10,
    disabled = false,
    helperText,
    errorText,
    footerText,
    leadingToolbar,
    trailingToolbar,
    topAccessory,
    bottomAccessory,
    className,
    textareaRef,
  },
  ref,
) {
  const internalRef = React.useRef<HTMLTextAreaElement>(null);
  const composedRef = useComposedRefs(internalRef, textareaRef ?? null);
  const composingRef = React.useRef(false);
  const styles = chatComposer();

  // biome-ignore lint/correctness/useExhaustiveDependencies: `value` is read via the DOM on re-render
  React.useLayoutEffect(() => {
    const el = internalRef.current;
    if (!el) return;
    el.style.height = "auto";
    const minHeight = minRows * LINE_HEIGHT + VERTICAL_PADDING;
    const maxHeight = maxRows * LINE_HEIGHT + VERTICAL_PADDING;
    const next = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value, minRows, maxRows]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter") return;
    if (event.shiftKey) return;
    if (composingRef.current) return;
    event.preventDefault();
    if (disabled || isStreaming) return;
    if (value.trim().length === 0) return;
    onSubmit(value);
  };

  const canSend = !disabled && !isStreaming && value.trim().length > 0;

  return (
    <div ref={ref} data-slot="chat-composer" className={cn(styles.root(), className)}>
      <div className={styles.shell()}>
        {topAccessory ? <div className={styles.topAccessory()}>{topAccessory}</div> : null}
        <textarea
          ref={composedRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => {
            composingRef.current = true;
          }}
          onCompositionEnd={() => {
            composingRef.current = false;
          }}
          disabled={disabled}
          placeholder={placeholder}
          rows={minRows}
          className={styles.field()}
          style={{ minHeight: minRows * LINE_HEIGHT + VERTICAL_PADDING }}
        />
        {helperText ? <div className={styles.helper()}>{helperText}</div> : null}
        {errorText ? (
          <div role="alert" className={styles.error()}>
            {errorText}
          </div>
        ) : null}
        {footerText ? <div className={styles.footer()}>{footerText}</div> : null}
        <div className={styles.toolbar()}>
          <div className={styles.toolbarStart()}>{leadingToolbar}</div>
          <div className="flex items-center gap-[8px]">
            {trailingToolbar}
            {isStreaming ? (
              <button
                type="button"
                aria-label="취소"
                className={styles.sendButton()}
                onClick={() => onCancel?.()}
              >
                <StopIcon />
              </button>
            ) : (
              <button
                type="button"
                aria-label="보내기"
                disabled={!canSend}
                className={styles.sendButton()}
                onClick={() => {
                  if (!canSend) return;
                  onSubmit(value);
                }}
              >
                <ArrowUp width={14} height={14} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </div>
      {bottomAccessory ? <div className={styles.bottomAccessory()}>{bottomAccessory}</div> : null}
    </div>
  );
});

export type { ChatComposerProps };
export { ChatComposer, chatComposer };
