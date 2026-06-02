"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as React from "react";

/* ============================================================================
 * PageContainer — 페이지 본문 frame (max-width · gutter · padding)
 * ============================================================================
 *
 * AppShell 과 독립된 generic wrapper. AppShellMain / Modal / SidePanel /
 * AppShell 없는 단독 페이지 어디서든 본문을 감싸는 표준 컨테이너.
 *
 * 책임
 *   • max-width  — variant 로 결정 (narrow | default | full)
 *   • 좌우 gutter — 32px 고정 (full variant 도 유지)
 *   • 상하 padding — top 32 / bottom 64 (스크롤 끝 호흡)
 *   • 가운데 정렬 — mx-auto
 *
 * 비책임
 *   • scroll  — 부모가 책임 (예: AppShellMainBody 의 overflow-y-auto)
 *   • header slot — 페이지 코드 자유. 첫 자식에 그대로 헤더 마크업 둠
 *   • 좌측 정렬 옵션 — YAGNI. 필요해지면 비파괴적으로 추가
 *
 * @example
 * ```tsx
 * <AppShellMain>
 *   <AppShellMainHeader>...</AppShellMainHeader>
 *   <AppShellMainBody>
 *     <PageContainer>
 *       <h1>제목</h1>
 *       <p>본문</p>
 *     </PageContainer>
 *   </AppShellMainBody>
 * </AppShellMain>
 *
 * // 단일 컬럼 텍스트·폼·문서
 * <PageContainer variant="narrow">...</PageContainer>
 *
 * // full-bleed (테이블/리스트). gutter 32 는 그대로 유지됨
 * <PageContainer variant="full">...</PageContainer>
 * ```
 * ========================================================================== */

const pageContainer = tv({
  base: ["w-full mx-auto", "px-[32px] pt-[32px] pb-[64px]"],
  variants: {
    variant: {
      narrow: "max-w-[480px]",
      default: "max-w-[800px]",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type PageContainerVariants = VariantProps<typeof pageContainer>;

interface PageContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * 본문 max-width 변종.
   * - `narrow`  480px — 단일 컬럼 텍스트·폼·문서
   * - `default` 800px — 일반 페이지 (기본)
   * - `full`    제한 없음 — 테이블·리스트 등 full-bleed (gutter 32 는 유지)
   */
  variant?: PageContainerVariants["variant"];
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(function PageContainer(
  { className, variant = "default", ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-pds-component="page-container"
      data-pds-variant={variant}
      className={cn(pageContainer({ variant }), className)}
      {...rest}
    />
  );
});

export type { PageContainerProps };
export { PageContainer, pageContainer };
