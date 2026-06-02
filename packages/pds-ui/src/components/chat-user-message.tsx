"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { ImageBroken } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import type { ContentBlock, DocumentBlock, ImageBlock, TextBlock } from "../types/chat";
import { ChatAttachmentChip } from "./chat-attachment-chip";
import { ChatCopyButton, extractCopyText } from "./internal/chat-copy-button";
import { TooltipProvider } from "./tooltip";

const chatUserMessage = tv({
  slots: {
    root: "group/msg flex flex-col items-end",
    attachments: [
      "flex flex-row-reverse items-end gap-[6px] mb-[8px] w-full",
      "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    ],
    bubble: [
      "flex flex-col gap-[8px]",
      "bg-[var(--pds-fill-normal)] text-[color:var(--pds-label-normal)]",
      "rounded-[10px] px-[14px] py-[10px]",
      "text-body2 max-w-[min(85%,600px)] break-words",
    ],
    actions: [
      "flex gap-[2px] mt-[4px]",
      "opacity-0 group-hover/msg:opacity-100 group-focus-within/msg:opacity-100",
      "transition-opacity duration-[var(--pds-motion-duration-fast)]",
    ],
    image: "block w-[64px] h-[64px] shrink-0 !my-0 rounded-[10px] object-cover",
    imageError: [
      "inline-flex items-center justify-center shrink-0",
      "w-[64px] h-[64px] rounded-[10px]",
      "bg-[var(--pds-fill-alternative)] text-[color:var(--pds-label-assistive)]",
      "[&_svg]:w-[20px] [&_svg]:h-[20px]",
    ],
  },
  variants: {
    role: {
      user: {},
    },
  },
  defaultVariants: {
    role: "user",
  },
});

type ChatUserMessageVariants = VariantProps<typeof chatUserMessage>;

type ChatUserMessageProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "content"> & {
  content: string | ContentBlock[];
  role?: ChatUserMessageVariants["role"];
  /**
   * 텍스트 블록 렌더러. 기본은 미주입 = plain text (사용자 입력은 보통 plain).
   * 명시적으로 넘기면 마크다운 렌더링 (`<p>` wrapping 으로 인한 위/아래 마진 발생 가능).
   */
  renderMarkdown?: (text: string) => React.ReactNode;
  /** 풍선 아래 추가 액션. `showCopy` 가 true 면 기본 복사 버튼 옆에 함께 노출. */
  actions?: React.ReactNode;
  /** 기본 복사 버튼 노출 여부. 텍스트 컨텐츠가 있을 때만 실제로 그려짐. 기본 true. */
  showCopy?: boolean;
  className?: string;
};

function MessageImage({ block }: { block: ImageBlock }) {
  const [failed, setFailed] = React.useState(false);
  const styles = chatUserMessage();

  const src =
    block.source.type === "url"
      ? block.source.url
      : `data:${block.source.media_type};base64,${block.source.data}`;

  if (failed || !src) {
    return (
      <div role="img" aria-label="첨부 파일" className={styles.imageError()}>
        <ImageBroken />
      </div>
    );
  }

  return (
    <img src={src} alt="사용자 첨부" onError={() => setFailed(true)} className={styles.image()} />
  );
}

function MessageDocument({ block }: { block: DocumentBlock }) {
  return <ChatAttachmentChip type="file" name={block.title ?? "Document"} />;
}

const ChatUserMessage = React.forwardRef<HTMLDivElement, ChatUserMessageProps>(
  function ChatUserMessage(
    { content, role = "user", renderMarkdown, actions, showCopy = true, className, ...props },
    ref,
  ) {
    const styles = chatUserMessage({ role });
    const blocks: ContentBlock[] =
      typeof content === "string" ? [{ type: "text", text: content }] : content;

    const textBlocks = blocks.filter((b): b is TextBlock => b.type === "text");
    const documentBlocks = blocks.filter((b): b is DocumentBlock => b.type === "document");
    const imageBlocks = blocks.filter((b): b is ImageBlock => b.type === "image");
    /**
     * 첨부 row 정렬 규칙: 파일(chip) 좌측, 이미지(thumbnail) 우측.
     * - 시각 무게가 무거운 thumbnail 을 bubble 가까이(우측) 배치
     * - 좁은 컨테이너에선 horizontal scroll, image 가 우측에 항상 노출되고 chip 이 좌측으로 가려짐
     * - DOM 순서는 [image, ...docs] (역순) — `flex-row-reverse` 로 시각상 [docs, image] 가 됨
     */
    const attachmentBlocks: (ImageBlock | DocumentBlock)[] = [...imageBlocks, ...documentBlocks];

    const hasText = textBlocks.length > 0;
    const hasAttachments = attachmentBlocks.length > 0;

    const copyText = showCopy && hasText ? extractCopyText(textBlocks) : "";
    const hasCopy = copyText.length > 0;

    const hasActionBar = hasCopy || Boolean(actions);

    return (
      <div
        ref={ref}
        data-slot="chat-user-message"
        data-role={role}
        className={cn(styles.root(), className)}
        {...props}
      >
        {hasAttachments ? (
          <div className={styles.attachments()}>
            {attachmentBlocks.map((block, i) => {
              if (block.type === "image") {
                const src =
                  block.source.type === "url" ? block.source.url : block.source.data.slice(0, 16);
                // biome-ignore lint/suspicious/noArrayIndexKey: attachment ordering is stable within a single message render; src may repeat for inline duplicates
                return <MessageImage key={`image-${i}-${src}`} block={block} />;
              }
              const key = `doc-${i}-${block.title ?? ""}`;
              return <MessageDocument key={key} block={block} />;
            })}
          </div>
        ) : null}
        {hasText ? (
          <div className={styles.bubble()}>
            {textBlocks.map((block, i) => {
              const key = `text-${i}-${block.text.slice(0, 16)}`;
              return (
                <div key={key} className="whitespace-pre-wrap">
                  {renderMarkdown ? renderMarkdown(block.text) : block.text}
                </div>
              );
            })}
          </div>
        ) : null}
        {hasActionBar ? (
          <TooltipProvider>
            <div className={styles.actions()}>
              {hasCopy ? <ChatCopyButton text={copyText} /> : null}
              {actions}
            </div>
          </TooltipProvider>
        ) : null}
      </div>
    );
  },
);

export type { ChatUserMessageProps };
export { ChatUserMessage, chatUserMessage };
