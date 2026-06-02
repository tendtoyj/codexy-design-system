"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const iconButton = tv({
  base: [
    "inline-flex items-center justify-center shrink-0 align-middle box-border",
    "cursor-pointer select-none",
    "transition-[background-color,color,box-shadow,filter] duration-[var(--pds-motion-duration-fast)]",
    "ease-[cubic-bezier(0.4,0,0.2,1)]",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
  ],
  variants: {
    variant: {
      normal: [
        "text-[color:var(--pds-label-normal)] bg-transparent",
        "hover:bg-[var(--pds-fill-normal)]",
        "disabled:text-[color:var(--pds-label-disable)] disabled:bg-transparent",
        "aria-disabled:text-[color:var(--pds-label-disable)] aria-disabled:bg-transparent",
      ],
      subtle: [
        "text-[color:var(--pds-label-alternative)] bg-transparent",
        "hover:text-[color:var(--pds-label-normal)] hover:bg-[var(--pds-fill-normal)]",
        "disabled:text-[color:var(--pds-label-disable)] disabled:bg-transparent",
        "aria-disabled:text-[color:var(--pds-label-disable)] aria-disabled:bg-transparent",
      ],
      background: [
        "text-[color:var(--pds-label-neutral)] bg-[var(--pds-fill-normal)]",
        "hover:bg-[var(--pds-fill-strong)]",
        "disabled:text-[color:var(--pds-label-assistive)] disabled:bg-[var(--pds-interaction-disable)]",
        "aria-disabled:text-[color:var(--pds-label-assistive)] aria-disabled:bg-[var(--pds-interaction-disable)]",
      ],
      outlined: [
        "text-[color:var(--pds-label-normal)] bg-transparent",
        "shadow-[inset_0_0_0_1px_var(--pds-line-normal-neutral)]",
        "hover:bg-[var(--pds-fill-normal)]",
        "disabled:text-[color:var(--pds-label-disable)] disabled:bg-transparent",
        "aria-disabled:text-[color:var(--pds-label-disable)] aria-disabled:bg-transparent",
      ],
      solid: [
        "text-[color:var(--pds-inverse-label)] bg-[var(--pds-primary-normal)]",
        "hover:bg-[color-mix(in_srgb,var(--pds-primary-normal)_86%,white)]",
        "active:bg-[color-mix(in_srgb,var(--pds-primary-normal)_92%,white)]",
        "disabled:text-[color:var(--pds-label-assistive)] disabled:bg-[var(--pds-interaction-disable)]",
        "aria-disabled:text-[color:var(--pds-label-assistive)] aria-disabled:bg-[var(--pds-interaction-disable)]",
      ],
    },
    size: {
      xs: "w-[18px] h-[18px] rounded-[4px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
      sm: "w-[24px] h-[24px] rounded-[6px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
      md: "w-[32px] h-[32px] rounded-[8px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
      lg: "w-[40px] h-[40px] rounded-[10px] [&_svg]:w-[20px] [&_svg]:h-[20px]",
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
