"use client";

import { ArrowSquareOut } from "@fluxloop-ai/pds-icons/icons";
import { Button } from "@fluxloop-ai/pds-ui/components/button";

/**
 * Sidebar 패턴은 AppShell 전체 레이아웃 안에서 의미가 있어서
 * docs 컬럼 안 미니어처가 아니라 풀 viewport preview 로 띄운다.
 */
export function SidebarPatternDemo() {
  return (
    <div className="my-[16px] flex items-center justify-between gap-[16px] rounded-[var(--pds-radius-12)] border border-[var(--pds-line-normal-alternative)] bg-[var(--pds-background-normal-alternative)] px-[20px] py-[16px]">
      <div className="flex flex-col gap-[2px]">
        <span className="font-medium text-[13px] text-[color:var(--pds-label-normal)]">
          전체 화면에서 보기
        </span>
        <span className="text-[12px] text-[color:var(--pds-label-alternative)]">
          AppShellSidebar + SidebarMenu + SidebarList 조립을 풀 viewport 로 띄운다.
        </span>
      </div>
      <Button
        variant="outlined"
        size="sm"
        trailingContent={<ArrowSquareOut />}
        onClick={() => window.open("/preview/sidebar-pattern", "_blank", "noopener,noreferrer")}
      >
        Preview 열기
      </Button>
    </div>
  );
}
