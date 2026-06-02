"use client";

import { ArrowSquareOut } from "@fluxloop-ai/pds-icons/icons";
import { Button } from "@fluxloop-ai/pds-ui/components/button";
import { PageContainer } from "@fluxloop-ai/pds-ui/components/page-container";

export function PageContainerBasicDemo() {
  return (
    <ParentFrame>
      <PageContainer>
        <Placeholder label="PageContainer (default · 800px)" />
      </PageContainer>
    </ParentFrame>
  );
}

/**
 * Variants 비교는 docs article column(약 800px) 보다 큰 viewport 가 필요해
 * 별도 preview 라우트에서 띄운다. AppShell 데모와 동일한 패턴.
 */
export function PageContainerVariantsDemo() {
  return (
    <div className="my-[16px] flex items-center justify-between gap-[16px] rounded-[var(--pds-radius-12)] border border-[var(--pds-line-normal-alternative)] bg-[var(--pds-background-normal-alternative)] px-[20px] py-[16px]">
      <div className="flex flex-col gap-[2px]">
        <span className="font-medium text-[13px] text-[color:var(--pds-label-normal)]">
          전체 화면에서 비교하기
        </span>
        <span className="text-[12px] text-[color:var(--pds-label-alternative)]">
          4개 variant 의 max-width 차이는 docs column 보다 넓은 viewport 가 필요해 새 창에서 띄운다.
        </span>
      </div>
      <Button
        variant="outlined"
        size="sm"
        trailingContent={<ArrowSquareOut />}
        onClick={() => window.open("/preview/page-container", "_blank", "noopener,noreferrer")}
      >
        Preview 열기
      </Button>
    </div>
  );
}

export function PageContainerWithContentDemo() {
  return (
    <ParentFrame>
      <PageContainer>
        <h1
          style={{
            margin: 0,
            font: "var(--pds-font-title2-bold)",
            color: "var(--pds-label-strong)",
          }}
        >
          페이지 제목
        </h1>
        <p
          style={{
            marginTop: 8,
            font: "var(--pds-font-body1-regular)",
            color: "var(--pds-label-neutral)",
          }}
        >
          PageContainer 는 max-width · 좌우 gutter · 상하 padding 만 책임지는 wrapper. 첫 자식이
          헤더든 본문이든 동일하게 frame 이 적용된다.
        </p>
        <div
          style={{
            marginTop: 24,
            height: 240,
            borderRadius: "var(--pds-radius-12)",
            background: "var(--pds-fill-normal)",
          }}
        />
      </PageContainer>
    </ParentFrame>
  );
}

/**
 * 부모(예: AppShellMainBody) 를 시각적으로 표현하는 프레임.
 * PageContainer 의 max-width 가 부모 안에서 어디까지 차지하는지 확인용.
 */
function ParentFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: "16px 0",
        borderRadius: "var(--pds-radius-12)",
        border: "1px solid var(--pds-line-solid-normal)",
        background: "var(--pds-background-normal-alternative)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 120,
        borderRadius: "var(--pds-radius-12)",
        border: "1px dashed var(--pds-line-solid-normal)",
        background: "var(--pds-background-normal-normal)",
        color: "var(--pds-label-neutral)",
        font: "var(--pds-font-label1-regular)",
      }}
    >
      {label}
    </div>
  );
}
