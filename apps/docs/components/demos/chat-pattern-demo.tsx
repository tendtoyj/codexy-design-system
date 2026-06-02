"use client";

import { ArrowSquareOut } from "@fluxloop-ai/pds-icons/icons";
import { Button } from "@fluxloop-ai/pds-ui/components/button";

/**
 * Chat 패턴은 RemovableTabBar + 메시지 스레드 + ChatComposer 가
 * 한 컨테이너 안에서 어떻게 호흡하는지를 보여줘야 해서,
 * docs 컬럼 안 미니어처가 아니라 풀 viewport preview 로 띄운다.
 */
export function ChatPatternDemo() {
  return (
    <div className="my-[16px] flex items-center justify-between gap-[16px] rounded-[var(--pds-radius-12)] border border-[var(--pds-line-normal-alternative)] bg-[var(--pds-background-normal-alternative)] px-[20px] py-[16px]">
      <div className="flex flex-col gap-[2px]">
        <span className="font-medium text-[13px] text-[color:var(--pds-label-normal)]">
          전체 화면에서 보기
        </span>
        <span className="text-[12px] text-[color:var(--pds-label-alternative)]">
          RemovableTabBar + ChatUserMessage + ChatAssistantMessage + ChatComposer 조립을 풀 viewport
          로 띄운다.
        </span>
      </div>
      <Button
        variant="outlined"
        size="sm"
        trailingContent={<ArrowSquareOut />}
        onClick={() => window.open("/preview/chat-pattern", "_blank", "noopener,noreferrer")}
      >
        Preview 열기
      </Button>
    </div>
  );
}
