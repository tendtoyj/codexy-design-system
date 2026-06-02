"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import { File, X } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";

const chatAttachmentChip = tv({
  slots: {
    root: [
      "group/attachment relative inline-flex items-center gap-[4px] shrink-0",
      "h-[24px] max-w-[160px] pl-[3px] pr-[10px] py-[2px]",
      "rounded-full border border-[color:var(--pds-line-normal-normal)]",
      "bg-[var(--pds-background-normal-normal)]",
      "text-[12px] leading-[14px] text-[color:var(--pds-label-normal)]",
    ],
    leadingImageWrap: [
      "shrink-0 inline-flex items-center justify-center",
      "w-[18px] h-[18px] rounded-full overflow-hidden",
    ],
    leadingImage: "w-full h-full object-cover",
    leadingIcon: [
      "shrink-0 inline-flex items-center justify-center",
      "w-[18px] h-[18px] pl-[4px]",
      "text-[color:var(--pds-label-alternative)]",
      "[&_svg]:w-[14px] [&_svg]:h-[14px]",
    ],
    label: "min-w-0 truncate",
    remove: [
      "absolute right-[4px] top-1/2 -translate-y-1/2",
      "inline-flex items-center justify-center shrink-0",
      "w-[16px] h-[16px] rounded-full cursor-pointer",
      "bg-[var(--pds-background-normal-normal)] text-[color:var(--pds-label-alternative)]",
      "hover:text-[color:var(--pds-label-normal)]",
      "opacity-0 pointer-events-none",
      "group-hover/attachment:opacity-100 group-hover/attachment:pointer-events-auto",
      "focus-visible:opacity-100 focus-visible:pointer-events-auto",
      "focus-visible:outline-none",
      "transition-[opacity,color] duration-[var(--pds-duration-fast)]",
      "[&_svg]:w-[10px] [&_svg]:h-[10px]",
    ],
  },
});

type ChatAttachmentChipProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onRemove"> & {
  /** 파일명. truncate 처리됨. */
  name: string;
  /** image: 썸네일 노출, file: 통일된 문서 아이콘 노출. */
  type: "image" | "file";
  /** image 타입일 때 썸네일 src (URL 또는 data: URL). */
  imageSrc?: string;
  /** 지정 시 hover/focus 에서 × 버튼 노출. */
  onRemove?: () => void;
  /** × 버튼 aria-label. 기본 `Remove ${name}`. */
  removeLabel?: string;
};

const ChatAttachmentChip = React.forwardRef<HTMLDivElement, ChatAttachmentChipProps>(
  function ChatAttachmentChip(
    { className, name, type, imageSrc, onRemove, removeLabel, ...props },
    ref,
  ) {
    const styles = chatAttachmentChip();
    return (
      <div
        ref={ref}
        data-slot="chat-attachment-chip"
        data-type={type}
        className={cn(styles.root(), className)}
        {...props}
      >
        {type === "image" && imageSrc ? (
          <span className={styles.leadingImageWrap()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="" className={styles.leadingImage()} />
          </span>
        ) : (
          <span className={styles.leadingIcon()}>
            <File />
          </span>
        )}
        <span className={styles.label()}>{name}</span>
        {onRemove ? (
          <button
            type="button"
            aria-label={removeLabel ?? `Remove ${name}`}
            className={styles.remove()}
            onClick={(event) => {
              event.stopPropagation();
              onRemove();
            }}
          >
            <X weight="bold" />
          </button>
        ) : null}
      </div>
    );
  },
);

export type { ChatAttachmentChipProps };
export { ChatAttachmentChip, chatAttachmentChip };
