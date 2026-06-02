"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import * as React from "react";

const iconButton = tv({
  base: [
    "inline-flex items-center justify-center shrink-0 align-middle box-border",
    "cursor-pointer select-none",
    "transition-[background-color,color,box-shadow,filter] duration-[var(--cds-motion-duration-fast)]",
    "ease-[cubic-bezier(0.4,0,0.2,1)]",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[color:var(--cds-focus-ring)] focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[color:var(--cds-background-normal-normal)]",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
  ],
  variants: {
    variant: {
      normal: [
        "text-[color:var(--cds-label-normal)] bg-transparent",
        "hover:bg-[var(--cds-fill-normal)]",
        "disabled:text-[color:var(--cds-label-disable)] disabled:bg-transparent",
        "aria-disabled:text-[color:var(--cds-label-disable)] aria-disabled:bg-transparent",
      ],
      subtle: [
        "text-[color:var(--cds-label-alternative)] bg-transparent",
        "hover:text-[color:var(--cds-label-normal)] hover:bg-[var(--cds-fill-normal)]",
        "disabled:text-[color:var(--cds-label-disable)] disabled:bg-transparent",
        "aria-disabled:text-[color:var(--cds-label-disable)] aria-disabled:bg-transparent",
      ],
      background: [
        "text-[color:var(--cds-label-neutral)] bg-[var(--cds-fill-normal)]",
        "hover:bg-[var(--cds-fill-strong)]",
        "disabled:text-[color:var(--cds-label-assistive)] disabled:bg-[var(--cds-interaction-disable)]",
        "aria-disabled:text-[color:var(--cds-label-assistive)] aria-disabled:bg-[var(--cds-interaction-disable)]",
      ],
      outlined: [
        "text-[color:var(--cds-label-normal)] bg-transparent",
        "shadow-[inset_0_0_0_1px_var(--cds-line-normal-neutral)]",
        "hover:bg-[var(--cds-fill-normal)]",
        "disabled:text-[color:var(--cds-label-disable)] disabled:bg-transparent",
        "aria-disabled:text-[color:var(--cds-label-disable)] aria-disabled:bg-transparent",
      ],
      solid: [
        "text-[color:var(--cds-inverse-label)] bg-[var(--cds-primary-normal)]",
        "hover:bg-[color-mix(in_srgb,var(--cds-primary-normal)_86%,white)]",
        "active:bg-[color-mix(in_srgb,var(--cds-primary-normal)_92%,white)]",
        "disabled:text-[color:var(--cds-label-assistive)] disabled:bg-[var(--cds-interaction-disable)]",
        "aria-disabled:text-[color:var(--cds-label-assistive)] aria-disabled:bg-[var(--cds-interaction-disable)]",
      ],
    },
    size: {
      xs: "w-[var(--cds-iconbtn-size-xs)] h-[var(--cds-iconbtn-size-xs)] rounded-[var(--cds-iconbtn-radius-xs)] [&_svg]:w-[var(--cds-iconbtn-icon-xs)] [&_svg]:h-[var(--cds-iconbtn-icon-xs)]",
      sm: "w-[var(--cds-iconbtn-size-sm)] h-[var(--cds-iconbtn-size-sm)] rounded-[var(--cds-iconbtn-radius-sm)] [&_svg]:w-[var(--cds-iconbtn-icon-sm)] [&_svg]:h-[var(--cds-iconbtn-icon-sm)]",
      md: "w-[var(--cds-iconbtn-size-md)] h-[var(--cds-iconbtn-size-md)] rounded-[var(--cds-iconbtn-radius-md)] [&_svg]:w-[var(--cds-iconbtn-icon-md)] [&_svg]:h-[var(--cds-iconbtn-icon-md)]",
      lg: "w-[var(--cds-iconbtn-size-lg)] h-[var(--cds-iconbtn-size-lg)] rounded-[var(--cds-iconbtn-radius-lg)] [&_svg]:w-[var(--cds-iconbtn-icon-lg)] [&_svg]:h-[var(--cds-iconbtn-icon-lg)]",
    },
  },
  defaultVariants: {
    variant: "normal",
    size: "md",
  },
});

type IconButtonVariants = VariantProps<typeof iconButton>;

type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "children"> & {
  variant?: IconButtonVariants["variant"];
  size?: IconButtonVariants["size"];
  /** 접근성을 위해 필수. asChild 사용 시 자식 요소가 자체 라벨을 가진다면 생략 가능. */
  "aria-label"?: string;
  asChild?: boolean;
  children: React.ReactNode;
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, variant = "normal", size = "md", asChild, type = "button", children, ...props },
  ref,
) {
  const Component: React.ElementType = asChild ? Slot : "button";
  return (
    <Component
      ref={ref}
      type={asChild ? undefined : type}
      className={cn(iconButton({ variant, size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

export type { IconButtonProps };
export { IconButton, iconButton };
