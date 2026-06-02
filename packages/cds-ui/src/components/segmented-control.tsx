"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import * as React from "react";

const segmentedControl = tv({
  slots: {
    root: ["inline-flex items-center"],
    item: [
      "inline-flex items-center justify-center whitespace-nowrap select-none cursor-pointer",
      "font-medium leading-none",
      "text-[color:var(--cds-label-assistive)] bg-transparent",
      "transition-[background-color,color] duration-[var(--cds-duration-fast)]",
      "hover:bg-[var(--cds-fill-alternative)] hover:text-[color:var(--cds-label-neutral)]",
      "data-[state=checked]:bg-[var(--cds-fill-normal)]",
      "data-[state=checked]:text-[color:var(--cds-label-normal)]",
      "data-[state=checked]:hover:bg-[var(--cds-fill-normal)]",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--cds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--cds-background-normal-normal)]",
      "disabled:cursor-default disabled:pointer-events-none",
      "disabled:text-[color:var(--cds-label-disable)]",
      "disabled:data-[state=checked]:bg-[var(--cds-interaction-disable)]",
    ],
  },
  variants: {
    size: {
      sm: {
        root: "gap-[2px]",
        item: "h-[var(--cds-control-height-sm)] px-[var(--cds-control-pad-x-sm)] rounded-[var(--cds-control-radius-sm)] text-[length:var(--cds-control-text-sm)]",
      },
      md: {
        root: "gap-[4px]",
        item: "h-[var(--cds-control-height-md)] px-[var(--cds-control-pad-x-md)] rounded-[var(--cds-control-radius-md)] text-[length:var(--cds-control-text-md)]",
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
