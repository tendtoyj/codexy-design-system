"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { Check, Info, Warning, WarningCircle } from "@fluxloop-ai/pds-icons/icons";
import * as ToastPrimitive from "@radix-ui/react-toast";
import * as React from "react";
import { Icon } from "./icon";
import { CloseButton } from "./internal/close-button";

const toast = tv({
  slots: {
    viewport: [
      "fixed z-[var(--pds-z-toast)] top-[16px] right-[16px] flex flex-col gap-[8px]",
      "w-[280px] max-w-[calc(100vw-32px)] m-0 p-0 list-none outline-none",
    ],
    root: [
      "relative flex items-start gap-[6px] p-[14px] pr-[44px] rounded-[12px]",
      "bg-[var(--pds-background-elevated-normal)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "shadow-[var(--pds-shadow-lg)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-2",
      "data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full",
    ],
    icon: "mt-[2px]",
    body: "flex-1 min-w-0 flex flex-col gap-[4px]",
    title: "text-[14px] leading-[20px] font-semibold m-0",
    description: "text-[13px] leading-[18px] text-[color:var(--pds-label-alternative)] m-0",
    close: "absolute right-[10px] top-[10px]",
  },
  variants: {
    variant: {
      info: {
        icon: "text-[color:var(--pds-label-normal)]",
        title: "text-[color:var(--pds-label-normal)]",
      },
      success: {
        icon: "text-[color:var(--pds-color-blue-50)]",
        title: "text-[color:var(--pds-color-blue-50)]",
      },
      warning: {
        icon: "text-[color:var(--pds-status-cautionary)]",
        title: "text-[color:var(--pds-status-cautionary)]",
      },
      error: {
        icon: "text-[color:var(--pds-status-negative)]",
        title: "text-[color:var(--pds-status-negative)]",
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type ToastVariants = VariantProps<typeof toast>;

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

const VARIANT_ICON = {
  info: Info,
  success: Check,
  warning: Warning,
  error: WarningCircle,
} as const;

type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
  variant?: ToastVariants["variant"];
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastRootProps>(
  function Toast(
    { className, variant = "info", title, description, action, children, ...props },
    ref,
  ) {
    const styles = toast({ variant });
    const key = variant ?? "info";
    const VariantIcon = VARIANT_ICON[key];
    return (
      <ToastPrimitive.Root ref={ref} className={cn(styles.root(), className)} {...props}>
        <Icon icon={VariantIcon} size="sm" className={styles.icon()} />
        <div className={styles.body()}>
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
        {action}
        <ToastPrimitive.Close asChild>
          <CloseButton size="sm" className={styles.close()} />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  },
);

const ToastAction = ToastPrimitive.Action;

export type { ToastRootProps };
export { Toast, ToastAction, ToastProvider, ToastViewport, toast };
