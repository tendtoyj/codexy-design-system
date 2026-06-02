"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { CircleNotch } from "@fluxloop-ai/pds-icons/icons";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const textButton = tv({
  slots: {
    root: [
      "relative inline-flex items-center justify-center align-middle box-border",
      "whitespace-nowrap leading-none cursor-pointer select-none",
      "border-0 bg-transparent",
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
    color: {
      primary: {
        root: [
          "text-[color:var(--pds-primary-normal)]",
          "hover:bg-[var(--pds-fill-normal)]",
          "disabled:text-[color:var(--pds-label-disable)] disabled:bg-transparent",
          "aria-disabled:text-[color:var(--pds-label-disable)] aria-disabled:bg-transparent",
        ],
      },
      assistive: {
        root: [
          "text-[color:var(--pds-label-neutral)]",
          "hover:bg-[var(--pds-fill-normal)]",
          "disabled:text-[color:var(--pds-label-disable)] disabled:bg-transparent",
          "aria-disabled:text-[color:var(--pds-label-disable)] aria-disabled:bg-transparent",
        ],
      },
    },
    size: {
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
