"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { X } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";

const closeButton = tv({
  base: [
    "inline-flex items-center justify-center shrink-0",
    "text-[color:var(--pds-label-alternative)]",
    "hover:bg-[var(--pds-fill-normal)]",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[color:var(--pds-focus-ring)]",
    "transition-colors duration-[var(--pds-motion-duration-fast)]",
    "disabled:pointer-events-none disabled:text-[color:var(--pds-label-disable)]",
  ],
  variants: {
    size: {
      sm: "w-[20px] h-[20px] rounded-[4px] [&_svg]:w-[12px] [&_svg]:h-[12px]",
      md: "w-[24px] h-[24px] rounded-[6px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
      lg: "w-[28px] h-[28px] rounded-[6px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CloseButtonVariants = VariantProps<typeof closeButton>;

type CloseButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  size?: CloseButtonVariants["size"];
  label?: string;
  children?: React.ReactNode;
};

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(
  { className, size = "md", label = "닫기", children, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cn(closeButton({ size }), className)}
      {...props}
    >
      {children ?? <X />}
    </button>
  );
});

export type { CloseButtonProps };
export { CloseButton, closeButton };
