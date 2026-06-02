"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import * as React from "react";

const switchStyles = tv({
  slots: {
    root: [
      "group relative inline-flex shrink-0 cursor-pointer items-center",
      "rounded-full border-0 box-border",
      "bg-[var(--cds-fill-strong)]",
      "transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--cds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--cds-background-normal-normal)]",
      "data-[state=checked]:bg-[var(--cds-primary-normal)]",
      "disabled:cursor-default disabled:opacity-[0.43] disabled:pointer-events-none",
    ],
    thumb: [
      "pointer-events-none block rounded-full",
      "bg-[var(--cds-color-common-100)]",
      "transition-[transform,width] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
      "will-change-transform",
    ],
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SwitchSize = NonNullable<VariantProps<typeof switchStyles>["size"]>;

type SwitchSpec = {
  width: number;
  height: number;
  thumb: number;
  padding: number;
};

const SWITCH_SPECS: Record<SwitchSize, SwitchSpec> = {
  sm: { width: 30, height: 18, thumb: 14, padding: 2 },
  md: { width: 39, height: 24, thumb: 18, padding: 3 },
  lg: { width: 52, height: 32, thumb: 24, padding: 4 },
};

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  size?: SwitchSize;
};

const SWITCH_CSS = `
[data-cds-switch] > [data-cds-switch-thumb] { transform: translateX(0); }
[data-cds-switch][data-state="checked"] > [data-cds-switch-thumb] {
  transform: translateX(var(--cds-switch-on));
}
[data-cds-switch]:not([data-disabled]):active > [data-cds-switch-thumb] {
  width: var(--cds-switch-thumb-pressed);
}
[data-cds-switch][data-state="checked"]:not([data-disabled]):active > [data-cds-switch-thumb] {
  transform: translateX(var(--cds-switch-on-pressed));
}
`;

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  function Switch({ className, size = "md", style, ...props }, ref) {
    const styles = switchStyles({ size });
    const spec = SWITCH_SPECS[size];
    const onTranslate = spec.width - spec.thumb - spec.padding * 2;
    const thumbPressed = spec.thumb + spec.padding;
    const onTranslatePressed = onTranslate - spec.padding;
    return (
      <>
        <style>{SWITCH_CSS}</style>
        <SwitchPrimitive.Root
          ref={ref}
          data-cds-switch=""
          className={cn(styles.root(), className)}
          style={
            {
              width: `${spec.width}px`,
              height: `${spec.height}px`,
              padding: `${spec.padding}px`,
              ["--cds-switch-thumb" as string]: `${spec.thumb}px`,
              ["--cds-switch-thumb-pressed" as string]: `${thumbPressed}px`,
              ["--cds-switch-on" as string]: `${onTranslate}px`,
              ["--cds-switch-on-pressed" as string]: `${onTranslatePressed}px`,
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          <SwitchPrimitive.Thumb
            data-cds-switch-thumb=""
            className={styles.thumb()}
            style={{
              width: "var(--cds-switch-thumb)",
              height: "var(--cds-switch-thumb)",
            }}
          />
        </SwitchPrimitive.Root>
      </>
    );
  },
);

export type { SwitchProps };
export { Switch, switchStyles };
