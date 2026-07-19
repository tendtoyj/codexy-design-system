"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import { CircleNotch } from "@tendtoyj/cds-icons/icons";
import * as React from "react";

const textButton = tv({
  slots: {
    root: [
      "relative inline-flex items-center justify-center align-middle box-border",
      "whitespace-nowrap leading-none cursor-pointer select-none",
      "border-0 bg-transparent",
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
    color: {
      primary: {
        root: [
          "text-[color:var(--cds-primary-normal)]",
          "hover:bg-[var(--cds-fill-normal)]",
          "disabled:text-[color:var(--cds-label-disable)] disabled:bg-transparent",
          "aria-disabled:text-[color:var(--cds-label-disable)] aria-disabled:bg-transparent",
        ],
      },
      assistive: {
        root: [
          "text-[color:var(--cds-label-neutral)]",
          "hover:bg-[var(--cds-fill-normal)]",
          "disabled:text-[color:var(--cds-label-disable)] disabled:bg-transparent",
          "aria-disabled:text-[color:var(--cds-label-disable)] aria-disabled:bg-transparent",
        ],
      },
    },
    size: {
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
    },
    loading: {
      true: { content: "invisible" },
      false: {},
    },
  },
  defaultVariants: {
    color: "primary",
    size: "sm",
    loading: false,
  },
});

type TextButtonVariants = VariantProps<typeof textButton>;

type TextButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  color?: TextButtonVariants["color"];
  size?: TextButtonVariants["size"];
  loading?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  asChild?: boolean;
};

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(function TextButton(
  {
    className,
    color = "primary",
    size = "sm",
    loading = false,
    disabled,
    leadingContent,
    trailingContent,
    asChild,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const styles = textButton({ color, size, loading });
  const Component: React.ElementType = asChild ? Slot : "button";
  return (
    <Component
      ref={ref}
      type={asChild ? undefined : type}
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

export type { TextButtonProps };
export { TextButton, textButton };
