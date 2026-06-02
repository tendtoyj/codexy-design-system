"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import type { PhosphorIcon } from "@fluxloop-ai/pds-icons/icons";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Icon } from "./icon";

/* ============================================================================
 * ActionCard — 제목 + 설명을 가진 클릭 가능한 카드
 * ============================================================================
 *
 * 좌/우 슬롯과 본문(title + description)으로 구성된 큰 면적의 액션 표면.
 * Suggestion/prompt 카드, permission/option toggle row 등에 쓰인다.
 *
 * 책임
 *   • Border / radius / padding / hover · focus state / 가로 정렬
 *   • Click 가능한 단일 면(기본 `<button>`, `asChild` 로 `<a>` 등 교체)
 *   • Title 의 inline icon 정렬
 *   • Leading / Trailing 슬롯 사용 여부에 따라 column 자동 조정
 *
 * 비책임
 *   • Leading 내부 visual 의 모양/사이즈 (img / 타일 wrapper / Avatar 등 자유)
 *   • Trailing element 자체 (Icon / IconButton / Switch 등 자유)
 *   • Title 외 추가 메타 라인 — 필요해지면 별도 슬롯으로 추가
 *
 * @example
 * ```tsx
 * import {
 *   ActionCard,
 *   ActionCardLeading,
 *   ActionCardTitle,
 *   ActionCardDescription,
 *   ActionCardTrailing,
 * } from "@fluxloop-ai/pds-ui/components/action-card";
 * import { Compass, Check } from "@fluxloop-ai/pds-icons/icons";
 *
 * // Title icon 만 사용 (suggestion 카드)
 * <ActionCard onClick={...}>
 *   <ActionCardTitle icon={Compass}>Where should I start?</ActionCardTitle>
 *   <ActionCardDescription>Pick the first thing to look at</ActionCardDescription>
 * </ActionCard>
 *
 * // Leading + Trailing (permission row)
 * <ActionCard onClick={...}>
 *   <ActionCardLeading>
 *     <div className="w-[40px] h-[40px] rounded-[12px] bg-[var(--pds-fill-normal)] ...">
 *       {visual}
 *     </div>
 *   </ActionCardLeading>
 *   <ActionCardTitle>Claude Code 대화 히스토리 접근 허용</ActionCardTitle>
 *   <ActionCardDescription>~/.claude 에서 과거 대화내역을 분석합니다</ActionCardDescription>
 *   <ActionCardTrailing>
 *     <Icon icon={Check} />
 *   </ActionCardTrailing>
 * </ActionCard>
 * ```
 *
 * 레이아웃: 3-컬럼 grid `auto · 1fr · auto`. Leading/Trailing 은 두 행 span,
 * Title/Description 은 가운데 컬럼 두 행. 슬롯 간 간격은 column-gap 대신
 * Leading/Trailing 자체 margin 으로 만들어, 미사용 시 좌/우 빈 영역이
 * 생기지 않는다.
 * ========================================================================== */

const actionCard = tv({
  slots: {
    root: [
      "group/action-card relative w-full text-left",
      "grid items-center",
      "[grid-template-columns:auto_minmax(0,1fr)_auto]",
      "gap-y-[2px]",
      "pl-[20px] pr-[16px] py-[18px] rounded-[16px]",
      "text-[color:var(--pds-label-normal)]",
      "transition-[background-color,border-color] duration-[var(--pds-duration-fast)]",
      "cursor-pointer select-none",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "disabled:cursor-not-allowed disabled:opacity-60",
      "aria-disabled:cursor-not-allowed aria-disabled:opacity-60",
    ],
    leading: [
      "[grid-column:1] [grid-row:1/span_2] self-center",
      "shrink-0 inline-flex items-center justify-center",
      "mr-[12px]",
    ],
    title: [
      "[grid-column:2] [grid-row:1] self-center",
      "inline-flex items-center gap-[8px] min-w-0",
      "text-title3 font-medium",
      "text-[color:var(--pds-label-strong)]",
    ],
    titleIcon: [
      "shrink-0 inline-flex items-center justify-center",
      "w-[16px] h-[16px]",
      "[&_svg]:w-[16px] [&_svg]:h-[16px]",
      "[&>img]:w-full [&>img]:h-full [&>img]:object-cover",
    ],
    titleText: "min-w-0 truncate",
    description: [
      "[grid-column:2] [grid-row:2] self-center",
      "min-w-0",
      "text-label2 font-normal",
      "text-[color:var(--pds-label-alternative)]",
    ],
    trailing: [
      "[grid-column:3] [grid-row:1/span_2] self-center",
      "shrink-0 inline-flex items-center justify-center",
      "ml-[12px]",
      "text-[color:var(--pds-label-neutral)]",
    ],
  },
  variants: {
    variant: {
      outlined: {
        root: [
          "border border-[color:var(--pds-line-normal-normal)]",
          "bg-transparent",
          "hover:bg-[var(--pds-fill-alternative)]",
        ],
      },
      filled: {
        root: ["border-0", "bg-[var(--pds-fill-alternative)]", "hover:bg-[var(--pds-fill-normal)]"],
      },
      ghost: {
        root: ["border-0", "bg-transparent", "hover:bg-[var(--pds-fill-alternative)]"],
      },
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
});

type ActionCardVariants = VariantProps<typeof actionCard>;

interface ActionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 자식 element 를 trigger 로 합성. true 면 button 대신 자식 element 가
   * 클릭 표면이 된다. `<a>` / Next `<Link>` 등으로 polymorphic 하게 쓰는 경우.
   */
  asChild?: boolean;
  /**
   * 시각 variant.
   * - `outlined` (default) — border 1px + bg 투명, hover 시 fill
   * - `filled` — border 없음 + bg fill, hover 시 한 단계 진한 fill
   * - `ghost` — border·bg 모두 없음, hover 시에만 fill
   */
  variant?: ActionCardVariants["variant"];
}

const ActionCard = React.forwardRef<HTMLButtonElement, ActionCardProps>(function ActionCard(
  { asChild, variant, className, type, ...props },
  ref,
) {
  const styles = actionCard({ variant });
  const Comp: React.ElementType = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-pds-component="action-card"
      data-variant={variant ?? "outlined"}
      type={asChild ? undefined : (type ?? "button")}
      className={cn(styles.root(), className)}
      {...props}
    />
  );
});

type ActionCardLeadingProps = React.HTMLAttributes<HTMLDivElement>;

const ActionCardLeading = React.forwardRef<HTMLDivElement, ActionCardLeadingProps>(
  function ActionCardLeading({ className, ...props }, ref) {
    const styles = actionCard();
    return (
      <div
        ref={ref}
        data-slot="action-card-leading"
        className={cn(styles.leading(), className)}
        {...props}
      />
    );
  },
);

interface ActionCardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title 텍스트 좌측에 들어가는 inline 시각 요소.
   *
   * - 컴포넌트 함수 (Phosphor 아이콘 등) → 자동으로 `<Icon size="md" />` 로 감싸짐
   * - ReactNode (`<img>` / emoji / 커스텀 SVG element) → 그대로 렌더, 호출부가 사이즈/스타일 책임
   *
   * 어느 쪽이든 20px 정사각 정렬 슬롯에 들어간다.
   */
  icon?: PhosphorIcon | React.ComponentType<React.SVGAttributes<SVGSVGElement>> | React.ReactNode;
}

const ActionCardTitle = React.forwardRef<HTMLDivElement, ActionCardTitleProps>(
  function ActionCardTitle({ className, icon, children, ...props }, ref) {
    const styles = actionCard();
    const renderedIcon =
      icon == null ? null : React.isValidElement(icon) ||
        typeof icon === "string" ||
        typeof icon === "number" ? (
        (icon as React.ReactNode)
      ) : (
        <Icon icon={icon as React.ComponentType<React.SVGAttributes<SVGSVGElement>>} size="sm" />
      );
    return (
      <div
        ref={ref}
        data-slot="action-card-title"
        className={cn(styles.title(), className)}
        {...props}
      >
        {renderedIcon ? <span className={styles.titleIcon()}>{renderedIcon}</span> : null}
        <span className={styles.titleText()}>{children}</span>
      </div>
    );
  },
);

type ActionCardDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

const ActionCardDescription = React.forwardRef<HTMLDivElement, ActionCardDescriptionProps>(
  function ActionCardDescription({ className, ...props }, ref) {
    const styles = actionCard();
    return (
      <div
        ref={ref}
        data-slot="action-card-description"
        className={cn(styles.description(), className)}
        {...props}
      />
    );
  },
);

type ActionCardTrailingProps = React.HTMLAttributes<HTMLDivElement>;

const ActionCardTrailing = React.forwardRef<HTMLDivElement, ActionCardTrailingProps>(
  function ActionCardTrailing({ className, ...props }, ref) {
    const styles = actionCard();
    return (
      <div
        ref={ref}
        data-slot="action-card-trailing"
        className={cn(styles.trailing(), className)}
        {...props}
      />
    );
  },
);

export type {
  ActionCardDescriptionProps,
  ActionCardLeadingProps,
  ActionCardProps,
  ActionCardTitleProps,
  ActionCardTrailingProps,
};
export {
  ActionCard,
  ActionCardDescription,
  ActionCardLeading,
  ActionCardTitle,
  ActionCardTrailing,
  actionCard,
};
