"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import { CircleNotch } from "@tendtoyj/cds-icons/icons";
import * as React from "react";

const button = tv({
  slots: {
    root: [
      "relative inline-flex items-center justify-center align-middle box-border",
      "whitespace-nowrap leading-none cursor-pointer select-none",
      "transition-[background-color,color,box-shadow] duration-[var(--cds-duration-fast)]",
      "ease-[cubic-bezier(0.4,0,0.2,1)]",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--cds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--cds-background-normal-normal)]",
      "disabled:pointer-events-none aria-disabled:pointer-events-none",
      "data-[loading=true]:cursor-wait",
    ],
    loading: "absolute inset-0 m-auto flex items-center justify-center",
    content: "inline-flex items-center justify-center",
  },
  variants: {
    variant: {
      solid: {
        root: [
          "text-[color:var(--cds-inverse-label)] bg-[var(--cds-primary-normal)]",
          "hover:bg-[color-mix(in_srgb,var(--cds-primary-normal)_86%,white)]",
          "active:bg-[color-mix(in_srgb,var(--cds-primary-normal)_92%,white)]",
          "disabled:text-[color:var(--cds-label-assistive)] disabled:bg-[var(--cds-interaction-disable)]",
          "aria-disabled:text-[color:var(--cds-label-assistive)] aria-disabled:bg-[var(--cds-interaction-disable)]",
        ],
      },
      outlined: {
        root: [
          "text-[color:var(--cds-label-normal)] bg-transparent",
          "shadow-[inset_0_0_0_1px_var(--cds-line-normal-neutral)]",
          "hover:bg-[var(--cds-fill-normal)]",
          "disabled:text-[color:var(--cds-label-disable)] disabled:bg-transparent",
          "aria-disabled:text-[color:var(--cds-label-disable)] aria-disabled:bg-transparent",
        ],
      },
      frosted: {
        root: [
          "text-[color:var(--cds-label-neutral)] bg-[var(--cds-fill-normal)]",
          "[backdrop-filter:blur(32px)] [will-change:backdrop-filter]",
          "hover:bg-[var(--cds-fill-strong)]",
          "disabled:text-[color:var(--cds-label-assistive)] disabled:bg-[var(--cds-interaction-disable)]",
          "disabled:[backdrop-filter:none]",
          "aria-disabled:text-[color:var(--cds-label-assistive)] aria-disabled:bg-[var(--cds-interaction-disable)]",
        ],
      },
      danger: {
        root: [
          "text-[color:var(--cds-accent-foreground-red)] bg-[var(--cds-color-red-95)]",
          "hover:bg-[var(--cds-color-red-90)]",
          "active:bg-[var(--cds-color-red-80)]",
          "disabled:text-[color:var(--cds-label-assistive)] disabled:bg-[var(--cds-interaction-disable)]",
          "aria-disabled:text-[color:var(--cds-label-assistive)] aria-disabled:bg-[var(--cds-interaction-disable)]",
        ],
      },
    },
    /**
     * 사이즈는 density-aware 시맨틱 토큰(--cds-control-*)만 참조한다.
     * 리터럴 px 없음 → <html data-density="touch"> 한 줄로 전체 밀도가 전환된다.
     * (토큰 정의: @tendtoyj/cds-core › styles/tokens/control.css)
     */
    size: {
      xs: {
        root: "h-[var(--cds-control-height-xs)] px-[var(--cds-control-pad-x-xs)] rounded-[var(--cds-control-radius-xs)] text-[length:var(--cds-control-text-xs)] font-medium",
        content:
          "[&_svg]:w-[var(--cds-control-icon-xs)] [&_svg]:h-[var(--cds-control-icon-xs)] [&_[data-slot=leading]]:mr-[var(--cds-control-gap-lead)] [&_[data-slot=trailing]]:ml-[var(--cds-control-gap-trail)]",
        loading: "[&_svg]:w-[var(--cds-control-icon-xs)] [&_svg]:h-[var(--cds-control-icon-xs)]",
      },
      sm: {
        root: "h-[var(--cds-control-height-sm)] px-[var(--cds-control-pad-x-sm)] rounded-[var(--cds-control-radius-sm)] text-[length:var(--cds-control-text-sm)] font-medium",
        content:
          "[&_svg]:w-[var(--cds-control-icon-sm)] [&_svg]:h-[var(--cds-control-icon-sm)] [&_[data-slot=leading]]:mr-[var(--cds-control-gap-lead)] [&_[data-slot=trailing]]:ml-[var(--cds-control-gap-trail)]",
        loading: "[&_svg]:w-[var(--cds-control-icon-sm)] [&_svg]:h-[var(--cds-control-icon-sm)]",
      },
      md: {
        root: "h-[var(--cds-control-height-md)] px-[var(--cds-control-pad-x-md)] rounded-[var(--cds-control-radius-md)] text-[length:var(--cds-control-text-md)] font-medium",
        content:
          "[&_svg]:w-[var(--cds-control-icon-md)] [&_svg]:h-[var(--cds-control-icon-md)] [&_[data-slot=leading]]:mr-[var(--cds-control-gap-lead)] [&_[data-slot=trailing]]:ml-[var(--cds-control-gap-trail)]",
        loading: "[&_svg]:w-[var(--cds-control-icon-md)] [&_svg]:h-[var(--cds-control-icon-md)]",
      },
      lg: {
        root: "h-[var(--cds-control-height-lg)] px-[var(--cds-control-pad-x-lg)] rounded-[var(--cds-control-radius-lg)] text-[length:var(--cds-control-text-lg)] font-medium",
        content:
          "[&_svg]:w-[var(--cds-control-icon-lg)] [&_svg]:h-[var(--cds-control-icon-lg)] [&_[data-slot=leading]]:mr-[var(--cds-control-gap-lead)] [&_[data-slot=trailing]]:ml-[var(--cds-control-gap-trail)]",
        loading: "[&_svg]:w-[var(--cds-control-icon-lg)] [&_svg]:h-[var(--cds-control-icon-lg)]",
      },
    },
    fullWidth: {
      true: { root: "w-full" },
      false: { root: "w-fit" },
    },
    loading: {
      true: { content: "invisible" },
      false: {},
    },
  },
  defaultVariants: {
    variant: "outlined",
    size: "sm",
    fullWidth: false,
    loading: false,
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  fullWidth?: boolean;
  loading?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  asChild?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "outlined",
    size = "sm",
    fullWidth = false,
    loading = false,
    disabled,
    leadingContent,
    trailingContent,
    asChild,
    children,
    ...props
  },
  ref,
) {
  const styles = button({ variant, size, fullWidth, loading });
  const Component: React.ElementType = asChild ? Slot : "button";
  return (
    <Component
      ref={ref}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(styles.root(), className)}
      {...props}
    >
      <span className={styles.content()}>
        {leadingContent ? (
          <span data-slot="leading" className="inline-flex shrink-0">
            {leadingContent}
          </span>
        ) : null}
        {children}
        {trailingContent ? (
          <span data-slot="trailing" className="inline-flex shrink-0">
            {trailingContent}
          </span>
        ) : null}
      </span>
      {loading ? (
        <span className={styles.loading()} aria-hidden="true">
          <CircleNotch className="animate-spin" />
        </span>
      ) : null}
    </Component>
  );
});

export type { ButtonProps };
export { Button, button };
