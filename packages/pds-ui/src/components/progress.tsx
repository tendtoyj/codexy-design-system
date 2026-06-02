"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

const progress = tv({
  slots: {
    root: ["relative w-full overflow-hidden rounded-full", "bg-[var(--pds-fill-alternative)]"],
    indicator: [
      "h-full w-full rounded-full",
      "bg-[var(--pds-primary-normal)]",
      "transition-transform duration-[var(--pds-duration-slow)]",
      "motion-reduce:transition-none",
    ],
    indeterminate: [
      "absolute inset-y-0 w-1/3 rounded-full",
      "bg-[var(--pds-primary-normal)]",
      "[animation:pds-progress-indeterminate_1.4s_ease-in-out_infinite]",
      "motion-reduce:animate-none motion-reduce:left-0 motion-reduce:w-1/2",
    ],
  },
  variants: {
    size: {
      sm: { root: "h-[4px]" },
      md: { root: "h-[6px]" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ProgressVariants = VariantProps<typeof progress>;

type ProgressProps = Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  "value"
> & {
  size?: ProgressVariants["size"];
  value?: number | null;
  max?: number;
};

const ProgressKeyframes = () => (
  <style>{`
    @keyframes pds-progress-indeterminate {
      0% { left: -33%; }
      100% { left: 100%; }
    }
  `}</style>
);

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  function Progress({ className, size = "md", value, max = 100, children, ...props }, ref) {
    const styles = progress({ size });
    const isIndeterminate = value === null || value === undefined;
    return (
      <>
        <ProgressKeyframes />
        <ProgressPrimitive.Root
          ref={ref}
          value={isIndeterminate ? null : Math.min(Math.max(value, 0), max)}
          max={max}
          className={cn(styles.root(), className)}
          {...props}
        >
          {children ??
            (isIndeterminate ? (
              <span className={styles.indeterminate()} />
            ) : (
              <ProgressPrimitive.Indicator
                className={styles.indicator()}
                style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
              />
            ))}
        </ProgressPrimitive.Root>
      </>
    );
  },
);

type ProgressIndicatorProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator> & {
  value?: number;
  max?: number;
};

const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Indicator>,
  ProgressIndicatorProps
>(function ProgressIndicator({ className, value, max = 100, style, ...props }, ref) {
  const styles = progress();
  const translate =
    typeof value === "number" ? `translateX(-${100 - (value / max) * 100}%)` : undefined;
  return (
    <ProgressPrimitive.Indicator
      ref={ref}
      className={cn(styles.indicator(), className)}
      style={{ ...(translate ? { transform: translate } : null), ...style }}
      {...props}
    />
  );
});

export type { ProgressIndicatorProps, ProgressProps };
export { Progress, ProgressIndicator, progress };
