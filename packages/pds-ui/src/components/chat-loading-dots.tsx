"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import * as React from "react";

const chatLoadingDots = tv({
  slots: {
    root: ["inline-flex items-center px-[2px]", "text-[color:var(--pds-label-assistive)]"],
    dot: ["pds-animate-dot-pulse w-[8px] h-[8px]"],
  },
});

type ChatLoadingDotsProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

const ChatLoadingDots = React.forwardRef<HTMLDivElement, ChatLoadingDotsProps>(
  function ChatLoadingDots({ className, ...props }, ref) {
    const styles = chatLoadingDots();
    return (
      <div
        ref={ref}
        data-slot="chat-loading-dots"
        className={cn(styles.root(), className)}
        {...props}
      >
        <span aria-hidden="true" className={styles.dot()} />
      </div>
    );
  },
);

export type { ChatLoadingDotsProps };
export { ChatLoadingDots, chatLoadingDots };
