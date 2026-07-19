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
import { X } from "@tendtoyj/cds-icons/icons";
import * as React from "react";
import { Icon } from "./icon";

/**
 * Snackbar — Montage(WDS) 포팅. Toast 와 동일한 어두운 반투명(blur) 표면 위에
 * heading/description + 인라인 action + close 를 얹은 대화형 피드백.
 * 단순 메시지 한 줄이면 Toast 를 사용한다.
 *
 * @radix-ui/react-toast 프리미티브 기반. Toast 와 함께 쓰려면 Provider/Viewport 를 중첩.
 */
const snackbar = tv({
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
      "flex items-center px-[16px] py-[11px]",
    ],
    overlay1:
      "absolute inset-0 bg-[color-mix(in_srgb,var(--cds-inverse-background)_52%,transparent)]",
    overlay2: "absolute inset-0 bg-[color-mix(in_srgb,var(--cds-primary-normal)_5%,transparent)]",
    container: "relative z-[1] flex items-center gap-[12px] w-full",
    content: "flex-1 min-w-0 flex items-center gap-[8px]",
    iconWrap: "relative shrink-0 inline-flex items-center justify-center",
    iconBacking:
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[10px] rounded-full bg-[var(--cds-color-common-100)]",
    textCol: "min-w-0 flex flex-col px-[2px] py-[5px]",
    title:
      "m-0 text-[13px] leading-[20px] font-bold text-[color:var(--cds-color-common-100)] opacity-[0.88] [word-break:keep-all] [overflow-wrap:anywhere]",
    description:
      "m-0 text-[12px] leading-[16px] font-normal text-[color:var(--cds-color-common-100)] opacity-[0.88] [word-break:keep-all] [overflow-wrap:anywhere] line-clamp-2",
    close: [
      "shrink-0 inline-flex items-center justify-center p-[2px] rounded-[6px]",
      "text-[color:var(--cds-color-common-100)] opacity-[0.61]",
      "hover:opacity-100 hover:bg-[color-mix(in_srgb,var(--cds-color-common-100)_12%,transparent)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cds-focus-ring)]",
      "transition-[opacity,background-color] duration-[var(--cds-duration-fast)]",
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

type SnackbarVariants = VariantProps<typeof snackbar>;
type SnackbarVariant = NonNullable<SnackbarVariants["variant"]>;

const SnackbarProvider = ToastPrimitive.Provider;

const SnackbarViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(function SnackbarViewport({ className, ...props }, ref) {
  const styles = snackbar();
  return (
    <ToastPrimitive.Viewport ref={ref} className={cn(styles.viewport(), className)} {...props} />
  );
});

const VARIANT_ICON: Record<SnackbarVariant, PhosphorIcon | null> = {
  normal: null,
  positive: CheckCircleFill as unknown as PhosphorIcon,
  cautionary: WarningTriangleFill as unknown as PhosphorIcon,
  negative: XCircleFill as unknown as PhosphorIcon,
  question: QuestionCircleFill as unknown as PhosphorIcon,
};

type SnackbarRootProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
  variant?: SnackbarVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** undo 등 action. SnackbarAction 으로 감싸 전달하면 인라인(수직 중앙)에 놓인다. */
  action?: React.ReactNode;
  /**
   * leading content 제어.
   * - 미지정: variant 기본 아이콘 (normal 은 없음)
   * - 컴포넌트 전달: 커스텀 아이콘/이미지 — 흰색, backing 없음
   * - `false`/`null`: leading 숨김
   */
  icon?: PhosphorIcon | React.ComponentType<React.SVGAttributes<SVGSVGElement>> | false | null;
  /** close 버튼 표시. 기본 true. */
  closable?: boolean;
  closeLabel?: string;
};

const Snackbar = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, SnackbarRootProps>(
  function Snackbar(
    {
      className,
      variant = "normal",
      title,
      description,
      action,
      icon,
      closable = true,
      closeLabel = "닫기",
      children,
      ...props
    },
    ref,
  ) {
    const styles = snackbar({ variant });
    const isCustom = icon !== undefined;
    const LeadingIcon = isCustom ? icon || null : VARIANT_ICON[variant];
    const showBacking = !isCustom && LeadingIcon != null;
    const iconColorClass = isCustom
      ? snackbar({ variant: "normal" }).iconWrap()
      : styles.iconWrap();
    return (
      <ToastPrimitive.Root ref={ref} className={cn(styles.root(), className)} {...props}>
        <div className={styles.surface()}>
          <div role="presentation" aria-hidden className={styles.overlay1()} />
          <div role="presentation" aria-hidden className={styles.overlay2()} />
          <div className={styles.container()}>
            <div className={styles.content()}>
              {LeadingIcon ? (
                <span className={cn(styles.iconWrap(), iconColorClass)}>
                  {showBacking ? <span aria-hidden className={styles.iconBacking()} /> : null}
                  <Icon icon={LeadingIcon as PhosphorIcon} size="md" className="relative z-[1]" />
                </span>
              ) : null}
              <div className={styles.textCol()}>
                {title ? (
                  <ToastPrimitive.Title className={styles.title()}>{title}</ToastPrimitive.Title>
                ) : null}
                {description ? (
                  <ToastPrimitive.Description className={styles.description()}>
                    {description}
                  </ToastPrimitive.Description>
                ) : null}
                {children}
              </div>
            </div>
            {action}
            {closable ? (
              <ToastPrimitive.Close aria-label={closeLabel} className={styles.close()}>
                <Icon icon={X} size="md" />
              </ToastPrimitive.Close>
            ) : null}
          </div>
        </div>
      </ToastPrimitive.Root>
    );
  },
);

const snackbarAction = tv({
  base: [
    "shrink-0 mx-[2px] inline-flex items-center rounded-[6px] px-[6px] py-[4px]",
    "text-[13px] leading-[20px] font-bold text-[color:var(--cds-color-common-100)]",
    "hover:bg-[color-mix(in_srgb,var(--cds-color-common-100)_12%,transparent)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cds-focus-ring)]",
    "transition-colors duration-[var(--cds-duration-fast)]",
  ],
});

type SnackbarActionProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>;

const SnackbarAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  SnackbarActionProps
>(function SnackbarAction({ className, ...props }, ref) {
  return <ToastPrimitive.Action ref={ref} className={cn(snackbarAction(), className)} {...props} />;
});

const SnackbarClose = ToastPrimitive.Close;

export type { SnackbarActionProps, SnackbarRootProps };
export { Snackbar, SnackbarAction, SnackbarClose, SnackbarProvider, SnackbarViewport, snackbar };
