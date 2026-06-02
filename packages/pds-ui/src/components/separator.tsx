"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

const separator = tv({
  base: "shrink-0 border-0",
  variants: {
    orientation: {
      horizontal: "w-full h-px",
      vertical: "h-[1em] w-px",
    },
    color: {
      normal: "bg-[var(--pds-line-solid-normal)]",
      neutral: "bg-[var(--pds-line-solid-neutral)]",
      alternative: "bg-[var(--pds-line-solid-alternative)]",
      "alpha-normal": "bg-[var(--pds-line-normal-normal)]",
      "alpha-neutral": "bg-[var(--pds-line-normal-neutral)]",
      "alpha-alternative": "bg-[var(--pds-line-normal-alternative)]",
    },
    thickness: {
      1: "",
      2: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", thickness: 2, class: "h-[2px]" },
    { orientation: "vertical", thickness: 2, class: "w-[2px]" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    color: "normal",
    thickness: 1,
  },
});

type SeparatorVariants = VariantProps<typeof separator>;

type SeparatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
  "orientation"
> & {
  orientation?: SeparatorVariants["orientation"];
  color?: SeparatorVariants["color"];
  thickness?: SeparatorVariants["thickness"];
};

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator(
  {
    className,
    orientation = "horizontal",
    color = "normal",
    thickness = 1,
    decorative = true,
    ...props
  },
  ref,
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation ?? "horizontal"}
      className={cn(separator({ orientation, color, thickness }), className)}
      {...props}
    />
  );
});

export type { SeparatorProps };
export { Separator, separator };
