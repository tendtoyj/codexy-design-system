"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import * as React from "react";
import { ChatLoadingDots } from "./chat-loading-dots";
import { ChatCopyButton } from "./internal/chat-copy-button";
import { TooltipProvider } from "./tooltip";

const chatAssistantMessage = tv({
  slots: {
    root: "group/msg flex w-full min-w-0 flex-col items-start",
    text: [
      "w-full min-w-0 max-w-full break-words",
      "text-body2 text-[color:var(--pds-label-normal)]",
    ],
    actions: [
      "flex gap-[2px] mt-[4px]",
      "opacity-0 group-hover/msg:opacity-100 group-focus-within/msg:opacity-100",
      "transition-opacity duration-[var(--pds-motion-duration-fast)]",
    ],
  },
});

type ChatAssistantMessageProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "content"
> & {
  content: string;
  renderMarkdown?: (text: string) => React.ReactNode;
  /**
   * 스트리밍 중 표시. true 면 markdown 렌더와 actions(복사 포함)가 모두 꺼지고,
   * 본문 끝(또는 빈 본문일 때 단독)에 `<ChatLoadingDots />` 가 inline 노출된다.
   */
  loading?: boolean;
  /** 메시지 아래 추가 액션. `showCopy` 가 true 면 기본 복사 버튼 옆에 함께 노출. */
  actions?: React.ReactNode;
  /** 기본 복사 버튼 노출 여부. 텍스트 컨텐츠가 있을 때만 실제로 그려짐. 기본 true. */
  showCopy?: boolean;
  className?: string;
};

const ChatAssistantMessage = React.forwardRef<HTMLDivElement, ChatAssistantMessageProps>(
  function ChatAssistantMessage(
    { content, renderMarkdown, loading = false, actions, showCopy = true, className, ...props },
    ref,
  ) {
    const styles = chatAssistantMessage();

    const hasCopy = !loading && showCopy && content.length > 0;
    const hasActionBar = !loading && (hasCopy || Boolean(actions));

    return (
      <div
        ref={ref}
        data-slot="chat-assistant-message"
        data-role="assistant"
        data-loading={loading || undefined}
        className={cn(styles.root(), className)}
        {...props}
      >
        <div className={styles.text()}>
          {loading ? (
            <span className="whitespace-pre-wrap">
              {content}
              <ChatLoadingDots />
            </span>
          ) : renderMarkdown ? (
            renderMarkdown(content)
          ) : (
            <span className="whitespace-pre-wrap">{content}</span>
          )}
        </div>
        {hasActionBar ? (
          <TooltipProvider>
            <div className={styles.actions()}>
              {hasCopy ? <ChatCopyButton text={content} /> : null}
              {actions}
            </div>
          </TooltipProvider>
        ) : null}
      </div>
    );
  },
);

export type { ChatAssistantMessageProps };
export { ChatAssistantMessage, chatAssistantMessage };
