"use client";

import { ArrowSquareOut } from "@fluxloop-ai/pds-icons/icons";
import { Button } from "@fluxloop-ai/pds-ui/components/button";

/**
 * AppShell 은 viewport 전체를 차지하는 데스크탑 셸이라 docs 페이지 안에서 충분히 보여주기 어렵다.
 * 인라인 미니어처 대신 *전체 화면 preview* 라우트로 새 창에서 띄운다.
 */
export function AppShellDemo() {
  return (
    <div className="my-[16px] flex items-center justify-between gap-[16px] rounded-[var(--pds-radius-12)] border border-[var(--pds-line-normal-alternative)] bg-[var(--pds-background-normal-alternative)] px-[20px] py-[16px]">
      <div className="flex flex-col gap-[2px]">
        <span className="font-medium text-[13px] text-[color:var(--pds-label-normal)]">
          전체 화면에서 보기
        </span>
        <span className="text-[12px] text-[color:var(--pds-label-alternative)]">
          AppShell 은 데스크탑 셸이라 새 창에서 풀 viewport 로 띄운다.
        </span>
      </div>
      <Button
        variant="outlined"
        size="sm"
        trailingContent={<ArrowSquareOut />}
        onClick={() => window.open("/preview/app-shell", "_blank", "noopener,noreferrer")}
      >
        Preview 열기
      </Button>
    </div>
  );
}
