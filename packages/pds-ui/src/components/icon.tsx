"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import type { IconWeight, PhosphorIcon } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";

const icon = tv({
  base: "inline-block shrink-0",
  variants: {
    size: {
      xs: "w-[12px] h-[12px]",
      sm: "w-[16px] h-[16px]",
      md: "w-[20px] h-[20px]",
      lg: "w-[24px] h-[24px]",
      xl: "w-[28px] h-[28px]",
    },
    color: {
      inherit: "text-[color:inherit]",
      "label-normal": "text-[color:var(--pds-label-normal)]",
      "label-strong": "text-[color:var(--pds-label-strong)]",
      "label-neutral": "text-[color:var(--pds-label-neutral)]",
      "label-alternative": "text-[color:var(--pds-label-alternative)]",
      "label-assistive": "text-[color:var(--pds-label-assistive)]",
      "label-disable": "text-[color:var(--pds-label-disable)]",
      primary: "text-[color:var(--pds-primary-normal)]",
      positive: "text-[color:var(--pds-status-positive)]",
      cautionary: "text-[color:var(--pds-status-cautionary)]",
      negative: "text-[color:var(--pds-status-negative)]",
    },
  },
  defaultVariants: {
    size: "md",
    color: "inherit",
  },
});

type IconVariants = VariantProps<typeof icon>;

type IconProps = Omit<React.SVGAttributes<SVGSVGElement>, "color"> & {
  icon: PhosphorIcon | React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
  size?: IconVariants["size"];
  color?: IconVariants["color"];
  /** Phosphor icon weight. 비-Phosphor 아이콘에는 무시된다. */
  weight?: IconWeight;
  label?: string;
};

const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { icon: Component, size = "md", color = "inherit", weight, label, className, ...props },
  ref,
) {
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const };
  const weightProp = weight ? ({ weight } as { weight: IconWeight }) : null;
  return (
    <Component
      ref={ref as never}
      className={cn(icon({ size, color }), className)}
      {...a11y}
      {...weightProp}
      {...props}
    />
  );
});

export type { IconProps };
export { Icon, icon };
