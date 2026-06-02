"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { Check, Minus } from "@fluxloop-ai/pds-icons/icons";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

const checkbox = tv({
  slots: {
    root: [
      "peer inline-flex shrink-0 items-center justify-center",
      "rounded-[4px] border",
      "border-[var(--pds-line-normal-neutral)]",
      "bg-[var(--pds-background-elevated-normal)]",
      "text-[color:var(--pds-inverse-label)]",
      "transition-[background-color,border-color,color]",
      "duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "data-[state=checked]:bg-[var(--pds-primary-normal)]",
      "data-[state=checked]:border-[var(--pds-primary-normal)]",
      "data-[state=indeterminate]:bg-[var(--pds-primary-normal)]",
      "data-[state=indeterminate]:border-[var(--pds-primary-normal)]",
      "disabled:cursor-default disabled:pointer-events-none",
      "disabled:bg-[var(--pds-interaction-disable)]",
      "disabled:border-[var(--pds-line-normal-alternative)]",
      "aria-invalid:border-[var(--pds-status-negative)]",
    ],
    indicator: ["flex items-center justify-center", "text-[color:var(--pds-inverse-label)]"],
  },
  variants: {
    size: {
      sm: {
        root: "w-[12px] h-[12px]",
        indicator: "[&_svg]:w-[8px] [&_svg]:h-[8px]",
      },
      md: {
        root: "w-[16px] h-[16px]",
        indicator: "[&_svg]:w-[12px] [&_svg]:h-[12px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CheckboxVariants = VariantProps<typeof checkbox>;

type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  "checked" | "defaultChecked"
> & {
  size?: CheckboxVariants["size"];
  invalid?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
};

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  function Checkbox(
    {
      className,
      size = "md",
      invalid = false,
      indeterminate = false,
      checked,
      defaultChecked,
      ...props
    },
    ref,
  ) {
    const styles = checkbox({ size });
    const resolvedChecked: CheckboxPrimitive.CheckedState | undefined = indeterminate
      ? "indeterminate"
      : checked;
    const resolvedDefault: CheckboxPrimitive.CheckedState | undefined = indeterminate
      ? "indeterminate"
      : defaultChecked;

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        checked={resolvedChecked}
        defaultChecked={resolvedDefault}
        aria-invalid={invalid || undefined}
        className={cn(styles.root(), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={styles.indicator()}>
          {indeterminate ? <Minus weight="bold" /> : <Check weight="bold" />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

export type { CheckboxProps };
export { Checkbox, checkbox };
