"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { CircleNotch } from "@fluxloop-ai/pds-icons/icons";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const button = tv({
  slots: {
    root: [
      "relative inline-flex items-center justify-center align-middle box-border",
      "whitespace-nowrap leading-none cursor-pointer select-none",
      "transition-[background-color,color,box-shadow] duration-[var(--pds-motion-duration-fast)]",
      "ease-[cubic-bezier(0.4,0,0.2,1)]",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
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
          "text-[color:var(--pds-inverse-label)] bg-[var(--pds-primary-normal)]",
          "hover:bg-[color-mix(in_srgb,var(--pds-primary-normal)_86%,white)]",
          "active:bg-[color-mix(in_srgb,var(--pds-primary-normal)_92%,white)]",
          "disabled:text-[color:var(--pds-label-assistive)] disabled:bg-[var(--pds-interaction-disable)]",
          "aria-disabled:text-[color:var(--pds-label-assistive)] aria-disabled:bg-[var(--pds-interaction-disable)]",
        ],
      },
      outlined: {
        root: [
          "text-[color:var(--pds-label-normal)] bg-transparent",
          "shadow-[inset_0_0_0_1px_var(--pds-line-normal-neutral)]",
          "hover:bg-[var(--pds-fill-normal)]",
          "disabled:text-[color:var(--pds-label-disable)] disabled:bg-transparent",
          "aria-disabled:text-[color:var(--pds-label-disable)] aria-disabled:bg-transparent",
        ],
      },
      frosted: {
        root: [
          "text-[color:var(--pds-label-neutral)] bg-[var(--pds-fill-normal)]",
          "[backdrop-filter:blur(32px)] [will-change:backdrop-filter]",
          "hover:bg-[var(--pds-fill-strong)]",
          "disabled:text-[color:var(--pds-label-assistive)] disabled:bg-[var(--pds-interaction-disable)]",
          "disabled:[backdrop-filter:none]",
          "aria-disabled:text-[color:var(--pds-label-assistive)] aria-disabled:bg-[var(--pds-interaction-disable)]",
        ],
      },
      danger: {
        root: [
          "text-[color:var(--pds-accent-foreground-red)] bg-[var(--pds-color-red-95)]",
          "hover:bg-[var(--pds-color-red-90)]",
          "active:bg-[var(--pds-color-red-80)]",
          "disabled:text-[color:var(--pds-label-assistive)] disabled:bg-[var(--pds-interaction-disable)]",
          "aria-disabled:text-[color:var(--pds-label-assistive)] aria-disabled:bg-[var(--pds-interaction-disable)]",
        ],
      },
    },
    size: {
      xs: {
        root: "h-[28px] px-[8px] rounded-[8px] text-[12px] font-medium",
        content:
          "[&_svg]:w-[12px] [&_svg]:h-[12px] [&_[data-slot=leading]]:mr-[4px] [&_[data-slot=trailing]]:ml-[2px]",
        loading: "[&_svg]:w-[12px] [&_svg]:h-[12px]",
      },
      sm: {
        root: "h-[32px] px-[10px] rounded-[10px] text-[13px] font-medium",
        content:
          "[&_svg]:w-[14px] [&_svg]:h-[14px] [&_[data-slot=leading]]:mr-[4px] [&_[data-slot=trailing]]:ml-[2px]",
        loading: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
      },
      md: {
        root: "h-[36px] px-[12px] rounded-[12px] text-[14px] font-medium",
        content:
          "[&_svg]:w-[16px] [&_svg]:h-[16px] [&_[data-slot=leading]]:mr-[4px] [&_[data-slot=trailing]]:ml-[2px]",
        loading: "[&_svg]:w-[16px] [&_svg]:h-[16px]",
      },
      lg: {
        root: "h-[44px] px-[14px] rounded-[12px] text-[14px] font-medium",
        content:
          "[&_svg]:w-[16px] [&_svg]:h-[16px] [&_[data-slot=leading]]:mr-[4px] [&_[data-slot=trailing]]:ml-[2px]",
        loading: "[&_svg]:w-[16px] [&_svg]:h-[16px]",
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
