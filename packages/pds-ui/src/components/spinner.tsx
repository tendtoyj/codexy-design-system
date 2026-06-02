"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as React from "react";

const spinner = tv({
  base: [
    "inline-block shrink-0 animate-spin",
    "[animation-duration:var(--pds-duration-slower)]",
    "motion-reduce:animate-none",
  ],
  variants: {
    size: {
      sm: "w-[16px] h-[16px]",
      md: "w-[20px] h-[20px]",
      lg: "w-[28px] h-[28px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SpinnerVariants = VariantProps<typeof spinner>;

type SpinnerProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  size?: SpinnerVariants["size"];
  label?: string;
};

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { className, size = "md", label = "Loading", ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(spinner({ size }), className)}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="h-full w-full"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" opacity="1" />
      </svg>
    </span>
  );
});

export type { SpinnerProps };
export { Spinner, spinner };
