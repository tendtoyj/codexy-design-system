"use client";

import { Check, Copy } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import type { ContentBlock, TextBlock } from "../../types/chat";
import { IconButton } from "../icon-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

const COPY_RESET_MS = 1500;

function extractCopyText(content: string | ContentBlock[]): string {
  if (typeof content === "string") return content;
  return content
    .filter((b): b is TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n\n");
}

function ChatCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch {
      // clipboard 미지원/거부 — 시각 피드백 없이 무시
    }
  };

  const label = copied ? "복사됨" : "복사";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton variant="subtle" size="sm" aria-label={label} onClick={handleClick}>
          {copied ? <Check /> : <Copy />}
        </IconButton>
      </TooltipTrigger>
      <TooltipContent size="sm">{label}</TooltipContent>
    </Tooltip>
  );
}

export { ChatCopyButton, extractCopyText };
