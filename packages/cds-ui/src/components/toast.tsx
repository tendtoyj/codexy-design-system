"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import {
  CheckCircleFill,
  QuestionCircleFill,
  WarningTriangleFill,
  XCircleFill,
} from "@tendtoyj/cds-icons/custom";
import type { PhosphorIcon } from "@tendtoyj/cds-icons/icons";
import * as React from "react";
import { Icon } from "./icon";

/**
 * Toast — Montage(WDS) 포팅. 어두운 반투명(blur) 표면 + 메시지 한 줄.
 * 하단 중앙에서 자동 소멸하는 비대화형 피드백. close·action·설명이 필요하면 Snackbar.
 *
 * 표면은 두 겹 오버레이(inverse-background 52% + primary 5%) 위에 backdrop-blur(32px).
 * 데스크톱 min 356 / max 420px, 모바일 full-width.
 */
const toast = tv({
  slots: {
    viewport: [
      "fixed z-[var(--cds-z-toast)] bottom-[40px] left-1/2 -translate-x-1/2",
      "flex flex-col items-center gap-[8px] m-0 p-0 list-none outline-none",
      "w-[calc(100vw-40px)] max-w-[420px] sm:w-auto",
    ],
    root: [
      "w-full max-w-[420px] sm:w-auto sm:min-w-[356px]",
      "rounded-[12px] backdrop-blur-[32px] [will-change:backdrop-filter]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2",
      "data-[swipe=move]:translate-y-[var(--radix-toast-swipe-move-y)]",
      "data-[swipe=cancel]:translate-y-0 data-[swipe=cancel]:transition-transform",
      "data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-bottom-full",
    ],
    surface: [
      "relative overflow-hidden rounded-[inherit]",
      "flex items-center gap-[8px] px-[16px] py-[11px]",
    ],
    overlay1:
      "absolute inset-0 bg-[color-mix(in_srgb,var(--cds-inverse-background)_52%,transparent)]",
    overlay2: "absolute inset-0 bg-[color-mix(in_srgb,var(--cds-primary-normal)_5%,transparent)]",
    iconWrap: "relative z-[1] shrink-0 inline-flex items-center justify-center",
    iconBacking:
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[10px] rounded-full bg-[var(--cds-color-common-100)]",
    message: [
      "relative z-[1] flex-1 min-w-0 m-0 px-[2px] py-[5px]",
      "text-[13px] leading-[20px] font-bold text-[color:var(--cds-color-common-100)] opacity-[0.88]",
      "[word-break:keep-all] [overflow-wrap:anywhere]",
    ],
  },
  variants: {
    variant: {
      normal: { iconWrap: "text-[color:var(--cds-color-common-100)]" },
      positive: { iconWrap: "text-[color:var(--cds-color-green-60)]" },
      cautionary: { iconWrap: "text-[color:var(--cds-color-orange-60)]" },
      negative: { iconWrap: "text-[color:var(--cds-color-red-60)]" },
      question: { iconWrap: "text-[color:var(--cds-color-common-100)]" },
    },
  },
  defaultVariants: {
    variant: "normal",
  },
});

type ToastVariants = VariantProps<typeof toast>;
type ToastVariant = NonNullable<ToastVariants["variant"]>;

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  const styles = toast();
  return (
    <ToastPrimitive.Viewport ref={ref} className={cn(styles.viewport(), className)} {...props} />
  );
});

/** variant 기본 아이콘. normal 은 Montage 와 동일하게 아이콘 없음. */
const VARIANT_ICON: Record<ToastVariant, PhosphorIcon | null> = {
  normal: null,
  positive: CheckCircleFill as unknown as PhosphorIcon,
  cautionary: WarningTriangleFill as unknown as PhosphorIcon,
  negative: XCircleFill as unknown as PhosphorIcon,
  question: QuestionCircleFill as unknown as PhosphorIcon,
};

type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
  variant?: ToastVariant;
  /**
   * leading 아이콘 제어.
   * - 미지정: variant 기본 아이콘 (normal 은 없음)
   * - 컴포넌트 전달: 커스텀(Custom) 아이콘 — 흰색, backing 없음
   * - `false`/`null`: 아이콘 숨김
   */
  icon?: PhosphorIcon | React.ComponentType<React.SVGAttributes<SVGSVGElement>> | false | null;
};

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastRootProps>(
  function Toast({ className, variant = "normal", icon, children, ...props }, ref) {
    const styles = toast({ variant });
    const isCustom = icon !== undefined;
    const LeadingIcon = isCustom ? icon || null : VARIANT_ICON[variant];
    // 빌트인 fill 아이콘은 컷아웃 글리프가 비치도록 흰 backing 을 깐다. 커스텀은 제외.
    const showBacking = !isCustom && LeadingIcon != null;
    const iconColorClass = isCustom ? toast({ variant: "normal" }).iconWrap() : styles.iconWrap();
    return (
      <ToastPrimitive.Root ref={ref} className={cn(styles.root(), className)} {...props}>
        <div className={styles.surface()}>
          <div role="presentation" aria-hidden className={styles.overlay1()} />
          <div role="presentation" aria-hidden className={styles.overlay2()} />
          {LeadingIcon ? (
            <span className={cn(styles.iconWrap(), iconColorClass)}>
              {showBacking ? <span aria-hidden className={styles.iconBacking()} /> : null}
              <Icon icon={LeadingIcon as PhosphorIcon} size="md" className="relative z-[1]" />
            </span>
          ) : null}
          <ToastPrimitive.Title className={styles.message()}>{children}</ToastPrimitive.Title>
        </div>
      </ToastPrimitive.Root>
    );
  },
);

const ToastAction = ToastPrimitive.Action;

export type { ToastRootProps };
export { Toast, ToastAction, ToastProvider, ToastViewport, toast };
