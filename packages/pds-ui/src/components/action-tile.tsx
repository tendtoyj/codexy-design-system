"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import type { PhosphorIcon } from "@fluxloop-ai/pds-icons/icons";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Icon } from "./icon";

/* ============================================================================
 * ActionTile — 세로 stack 타일형 클릭 카드
 * ============================================================================
 *
 * 3 개의 영역(Header / Content / Footer)으로 나뉘는 클릭 표면.
 *
 *   ┌────────────────────────┐
 *   │ Header                 │  ← free-form (옵션). 메타 row · NEW pill 등
 *   │                        │
 *   │ Content                │  ← 의미 슬롯 (Leading + Title + Description)
 *   │                        │
 *   │ Footer                 │  ← free-form (옵션). 하단 메타 row · 액션 등
 *   └────────────────────────┘
 *
 * 영역 책임
 *   • Header / Footer — free-form 박스. 안에 무엇을 어떻게 분포할지는
 *     호출부 자유. 다만 정렬은 `headerAlign` / `footerAlign` prop 으로 제어
 *   • Content — 의미 슬롯 묶음. 내부 typography 와 슬롯 간 간격은 컴포넌트가
 *     책임 (Leading 8px → Title 2px → Description). 가로 정렬은 `contentAlign`
 *
 * 영역 간 간격
 *   • `gap` prop — `tight` (8) / `normal` (16, 기본) / `wide` (24)
 *
 * @example
 * ```tsx
 * <ActionTile gap="normal" headerAlign="between">
 *   <ActionTileHeader>
 *     <span>Tutorial</span>
 *     <Badge size="xs" color="accent" accentColor="blue">NEW</Badge>
 *   </ActionTileHeader>
 *
 *   <ActionTileContent>
 *     <ActionTileLeading><Icon icon={Compass} size="lg" /></ActionTileLeading>
 *     <ActionTileTitle>Where to start</ActionTileTitle>
 *     <ActionTileDescription>Pick the first thing to look at</ActionTileDescription>
 *   </ActionTileContent>
 *
 *   <ActionTileFooter>
 *     <Badge size="xs">5 min</Badge>
 *   </ActionTileFooter>
 * </ActionTile>
 * ```
 * ========================================================================== */

const actionTile = tv({
  slots: {
    root: [
      "group/action-tile relative w-full",
      "flex flex-col",
      "rounded-[16px]",
      "text-[color:var(--pds-label-normal)]",
      "transition-[background-color,border-color] duration-[var(--pds-duration-fast)]",
      "cursor-pointer select-none",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "disabled:cursor-not-allowed disabled:opacity-60",
      "aria-disabled:cursor-not-allowed aria-disabled:opacity-60",
    ],
    header: ["flex flex-row items-center gap-[6px] w-full"],
    content: ["flex flex-col w-full"],
    footer: ["flex flex-row items-center gap-[6px] w-full"],
    leading: ["shrink-0 inline-flex items-center justify-center", "mb-[8px]"],
    title: [
      "inline-flex items-center gap-[8px] min-w-0",
      "text-title3 font-medium",
      "text-[color:var(--pds-label-strong)]",
      "mb-[2px] last:mb-0",
    ],
    titleStartIcon: [
      "shrink-0 inline-flex items-center justify-center",
      "w-[16px] h-[16px]",
      "[&_svg]:w-[16px] [&_svg]:h-[16px]",
      "[&>img]:w-full [&>img]:h-full [&>img]:object-cover",
    ],
    titleText: "min-w-0 truncate",
    description: [
      "min-w-0 self-stretch",
      "text-label2 font-normal",
      "text-[color:var(--pds-label-alternative)]",
      "last:mb-0",
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
    padding: {
      compact: { root: ["pt-[18px] pb-[20px] px-[20px]"] },
      normal: { root: ["pt-[26px] pb-[28px] px-[24px]"] },
      spacious: { root: ["pt-[36px] pb-[38px] px-[28px]"] },
    },
    headerGap: {
      tight: { header: ["mb-[4px]"] },
      normal: { header: ["mb-[8px]"] },
      wide: { header: ["mb-[12px]"] },
    },
    footerGap: {
      tight: { footer: ["mt-[4px]"] },
      normal: { footer: ["mt-[8px]"] },
      wide: { footer: ["mt-[12px]"] },
    },
    headerAlign: {
      start: { header: ["justify-start"] },
      center: { header: ["justify-center"] },
      end: { header: ["justify-end"] },
      between: { header: ["justify-between"] },
    },
    contentAlign: {
      start: {
        content: ["items-start text-left"],
        description: ["text-left"],
      },
      center: {
        content: ["items-center text-center"],
        description: ["text-center"],
      },
      end: {
        content: ["items-end text-right"],
        description: ["text-right"],
      },
      between: {
        // column main-axis 분포. Content 가 flex-1 로 카드 세로 공간을 채울
        // 때 의미가 있다. 기본 height 가 content-driven 인 카드에선 시각적으로
        // start 와 비슷하게 보일 수 있음.
        content: ["justify-between flex-1"],
      },
    },
    footerAlign: {
      start: { footer: ["justify-start"] },
      center: { footer: ["justify-center"] },
      end: { footer: ["justify-end"] },
      between: { footer: ["justify-between"] },
    },
  },
  defaultVariants: {
    variant: "outlined",
    padding: "normal",
    headerGap: "normal",
    footerGap: "normal",
    headerAlign: "start",
    contentAlign: "start",
    footerAlign: "start",
  },
});

type ActionTileVariants = VariantProps<typeof actionTile>;

interface ActionTileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 자식 element 를 trigger 로 합성. true 면 button 대신 자식 element 가
   * 클릭 표면이 된다. `<a>` / Next `<Link>` 등 polymorphic 사용.
   */
  asChild?: boolean;
  /**
   * 시각 variant. `ActionCard` 와 토큰 동일.
   * - `outlined` (default) — border 1px + bg 투명, hover 시 fill
   * - `filled` — border 없음 + bg fill, hover 시 한 단계 진한 fill
   * - `ghost` — border·bg 모두 없음, hover 시에만 fill
   */
  variant?: ActionTileVariants["variant"];
  /**
   * 카드 외곽 padding.
   * - `compact` — `pt-[18px] pb-[20px] px-[20px]` (밀집 grid · 작은 타일)
   * - `normal` (default) — `pt-[26px] pb-[28px] px-[24px]`
   * - `spacious` — `pt-[36px] pb-[38px] px-[28px]` (hero · 단일 카드)
   */
  padding?: ActionTileVariants["padding"];
  /**
   * Header ↔ Content 사이 간격. Header 가 없으면 무시됨.
   * - `tight` — 4px
   * - `normal` (default) — 8px
   * - `wide` — 12px
   */
  headerGap?: ActionTileVariants["headerGap"];
  /**
   * Content ↔ Footer 사이 간격. Footer 가 없으면 무시됨.
   * - `tight` — 4px
   * - `normal` (default) — 8px
   * - `wide` — 12px
   */
  footerGap?: ActionTileVariants["footerGap"];
  /**
   * Header 영역 내부 정렬 (row main-axis).
   * - `start` (default) / `center` / `end` / `between` (양 끝 분포)
   */
  headerAlign?: ActionTileVariants["headerAlign"];
  /**
   * Content 영역 내부 가로 정렬.
   * - `start` (default) — text-left, items-start
   * - `center` — text-center, items-center
   * - `end` — text-right, items-end
   * - `between` — column main-axis 분포 (Content 가 카드 세로 공간을 채울 때 의미)
   */
  contentAlign?: ActionTileVariants["contentAlign"];
  /**
   * Footer 영역 내부 정렬 (row main-axis).
   * - `start` (default) / `center` / `end` / `between` (양 끝 분포)
   */
  footerAlign?: ActionTileVariants["footerAlign"];
}

const ActionTileStylesContext = React.createContext<ReturnType<typeof actionTile> | null>(null);

function useActionTileStyles() {
  const ctx = React.useContext(ActionTileStylesContext);
  return ctx ?? actionTile();
}

const ActionTile = React.forwardRef<HTMLButtonElement, ActionTileProps>(function ActionTile(
  {
    asChild,
    variant,
    padding,
    headerGap,
    footerGap,
    headerAlign,
    contentAlign,
    footerAlign,
    className,
    type,
    children,
    ...props
  },
  ref,
) {
  const styles = actionTile({
    variant,
    padding,
    headerGap,
    footerGap,
    headerAlign,
    contentAlign,
    footerAlign,
  });
  const Comp: React.ElementType = asChild ? Slot : "button";
  return (
    <ActionTileStylesContext.Provider value={styles}>
      <Comp
        ref={ref}
        data-pds-component="action-tile"
        data-variant={variant ?? "outlined"}
        type={asChild ? undefined : (type ?? "button")}
        className={cn(styles.root(), className)}
        {...props}
      >
        {children}
      </Comp>
    </ActionTileStylesContext.Provider>
  );
});

type ActionTileHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const ActionTileHeader = React.forwardRef<HTMLDivElement, ActionTileHeaderProps>(
  function ActionTileHeader({ className, ...props }, ref) {
    const styles = useActionTileStyles();
    return (
      <div
        ref={ref}
        data-slot="action-tile-header"
        className={cn(styles.header(), className)}
        {...props}
      />
    );
  },
);

type ActionTileContentProps = React.HTMLAttributes<HTMLDivElement>;

const ActionTileContent = React.forwardRef<HTMLDivElement, ActionTileContentProps>(
  function ActionTileContent({ className, ...props }, ref) {
    const styles = useActionTileStyles();
    return (
      <div
        ref={ref}
        data-slot="action-tile-content"
        className={cn(styles.content(), className)}
        {...props}
      />
    );
  },
);

type ActionTileFooterProps = React.HTMLAttributes<HTMLDivElement>;

const ActionTileFooter = React.forwardRef<HTMLDivElement, ActionTileFooterProps>(
  function ActionTileFooter({ className, ...props }, ref) {
    const styles = useActionTileStyles();
    return (
      <div
        ref={ref}
        data-slot="action-tile-footer"
        className={cn(styles.footer(), className)}
        {...props}
      />
    );
  },
);

type ActionTileLeadingProps = React.HTMLAttributes<HTMLDivElement>;

const ActionTileLeading = React.forwardRef<HTMLDivElement, ActionTileLeadingProps>(
  function ActionTileLeading({ className, ...props }, ref) {
    const styles = useActionTileStyles();
    return (
      <div
        ref={ref}
        data-slot="action-tile-leading"
        className={cn(styles.leading(), className)}
        {...props}
      />
    );
  },
);

type TitleIconValue =
  | PhosphorIcon
  | React.ComponentType<React.SVGAttributes<SVGSVGElement>>
  | React.ReactNode;

interface ActionTileTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title text 좌측 inline 요소.
   *
   * - 컴포넌트 함수 (Phosphor 아이콘 등) → 자동으로 `<Icon size="sm" />` 로 감싸짐
   * - ReactNode (`<img>` / emoji / 커스텀 SVG) → 그대로 렌더, 호출부가 사이즈 책임
   *
   * 16px 정사각 슬롯에 들어간다.
   */
  startIcon?: TitleIconValue;
}

function renderTitleIcon(icon: TitleIconValue): React.ReactNode {
  if (icon == null) return null;
  if (React.isValidElement(icon) || typeof icon === "string" || typeof icon === "number") {
    return icon as React.ReactNode;
  }
  return <Icon icon={icon as React.ComponentType<React.SVGAttributes<SVGSVGElement>>} size="sm" />;
}

const ActionTileTitle = React.forwardRef<HTMLDivElement, ActionTileTitleProps>(
  function ActionTileTitle({ className, startIcon, children, ...props }, ref) {
    const styles = useActionTileStyles();
    const renderedStart = renderTitleIcon(startIcon);
    return (
      <div
        ref={ref}
        data-slot="action-tile-title"
        className={cn(styles.title(), className)}
        {...props}
      >
        {renderedStart ? <span className={styles.titleStartIcon()}>{renderedStart}</span> : null}
        <span className={styles.titleText()}>{children}</span>
      </div>
    );
  },
);

type ActionTileDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

const ActionTileDescription = React.forwardRef<HTMLDivElement, ActionTileDescriptionProps>(
  function ActionTileDescription({ className, ...props }, ref) {
    const styles = useActionTileStyles();
    return (
      <div
        ref={ref}
        data-slot="action-tile-description"
        className={cn(styles.description(), className)}
        {...props}
      />
    );
  },
);

export type {
  ActionTileContentProps,
  ActionTileDescriptionProps,
  ActionTileFooterProps,
  ActionTileHeaderProps,
  ActionTileLeadingProps,
  ActionTileProps,
  ActionTileTitleProps,
};
export {
  ActionTile,
  ActionTileContent,
  ActionTileDescription,
  ActionTileFooter,
  ActionTileHeader,
  ActionTileLeading,
  ActionTileTitle,
  actionTile,
};
