"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

const segmentedControl = tv({
  slots: {
    root: ["inline-flex items-center"],
    item: [
      "inline-flex items-center justify-center whitespace-nowrap select-none cursor-pointer",
      "font-medium leading-none",
      "text-[color:var(--pds-label-assistive)] bg-transparent",
      "transition-[background-color,color] duration-[var(--pds-duration-fast)]",
      "hover:bg-[var(--pds-fill-alternative)] hover:text-[color:var(--pds-label-neutral)]",
      "data-[state=checked]:bg-[var(--pds-fill-normal)]",
      "data-[state=checked]:text-[color:var(--pds-label-normal)]",
      "data-[state=checked]:hover:bg-[var(--pds-fill-normal)]",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "disabled:cursor-default disabled:pointer-events-none",
      "disabled:text-[color:var(--pds-label-disable)]",
      "disabled:data-[state=checked]:bg-[var(--pds-interaction-disable)]",
    ],
  },
  variants: {
    size: {
      sm: {
        root: "gap-[2px]",
        item: "h-[32px] px-[10px] rounded-[10px] text-[13px]",
      },
      md: {
        root: "gap-[4px]",
        item: "h-[36px] px-[12px] rounded-[12px] text-[14px]",
      },
    },
    fullWidth: {
      true: {
        root: "w-full",
        item: "flex-1",
      },
      false: {
        root: "w-fit",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    fullWidth: false,
  },
});

type SegmentedControlVariants = VariantProps<typeof segmentedControl>;
type SegmentedControlSize = NonNullable<SegmentedControlVariants["size"]>;

const SegmentedControlContext = React.createContext<{
  size: SegmentedControlSize;
  fullWidth: boolean;
}>({ size: "sm", fullWidth: false });

const useSegmentedControlContext = () => React.useContext(SegmentedControlContext);

type SegmentedControlProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  "orientation"
> & {
  size?: SegmentedControlSize;
  fullWidth?: boolean;
};

const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  SegmentedControlProps
>(function SegmentedControl({ className, size = "sm", fullWidth = false, ...props }, ref) {
  const styles = segmentedControl({ size, fullWidth });
  return (
    <SegmentedControlContext.Provider value={{ size, fullWidth }}>
      <RadioGroupPrimitive.Root
        ref={ref}
        orientation="horizontal"
        className={cn(styles.root(), className)}
        {...props}
      />
    </SegmentedControlContext.Provider>
  );
});

type SegmentedControlItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;

const SegmentedControlItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  SegmentedControlItemProps
>(function SegmentedControlItem({ className, ...props }, ref) {
  const { size, fullWidth } = useSegmentedControlContext();
  const styles = segmentedControl({ size, fullWidth });
  return <RadioGroupPrimitive.Item ref={ref} className={cn(styles.item(), className)} {...props} />;
});

export type { SegmentedControlItemProps, SegmentedControlProps };
export { SegmentedControl, SegmentedControlItem, segmentedControl };
