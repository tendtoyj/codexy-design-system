"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { CaretDown, CaretUp, Check } from "@fluxloop-ai/pds-icons/icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";

const select = tv({
  slots: {
    trigger: [
      "group inline-flex items-center justify-between gap-[8px]",
      "text-[color:var(--pds-label-normal)]",
      "transition-[box-shadow,background-color] duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none",
      "focus-visible:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-focus-ring)_43%,transparent)]",
      "data-[placeholder]:text-[color:var(--pds-label-assistive)]",
      "disabled:cursor-default disabled:bg-[var(--pds-fill-alternative)]",
      "disabled:text-[color:var(--pds-label-alternative)]",
      "aria-invalid:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-status-negative)_43%,transparent)]",
    ],
    icon: [
      "shrink-0 text-[color:var(--pds-interaction-inactive)]",
      "transition-transform duration-[var(--pds-duration-fast)]",
      "group-data-[state=open]:rotate-180",
    ],
    content: [
      "relative z-[var(--pds-z-dropdown)] overflow-hidden",
      "bg-[var(--pds-background-elevated-normal)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "shadow-[var(--pds-shadow-lg)]",
      "min-w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
    ],
    viewport: "p-[4px]",
    item: [
      "relative flex cursor-pointer select-none items-center gap-[8px]",
      "outline-none text-[color:var(--pds-label-normal)]",
      "data-[highlighted]:bg-[var(--pds-fill-normal)]",
      "data-[disabled]:pointer-events-none data-[disabled]:[color:var(--pds-label-disable)]",
    ],
    itemIndicator: [
      "ml-auto inline-flex items-center justify-center text-[color:var(--pds-primary-normal)]",
    ],
    label: "font-semibold [color:var(--pds-label-alternative)]",
    separator: "h-px bg-[var(--pds-line-normal-neutral)]",
    scrollButton: [
      "flex items-center justify-center py-[4px]",
      "text-[color:var(--pds-interaction-inactive)]",
      "cursor-default bg-[var(--pds-background-elevated-normal)]",
    ],
  },
  variants: {
    variant: {
      outlined: {
        trigger: [
          "bg-[var(--pds-background-transparent-normal)]",
          "shadow-[inset_0_0_0_1px_var(--pds-line-normal-neutral)]",
        ],
      },
      filled: {
        trigger: [
          "bg-[var(--pds-fill-normal)]",
          "hover:bg-[var(--pds-fill-strong)]",
          "data-[state=open]:bg-[var(--pds-fill-strong)]",
        ],
      },
    },
    size: {
      sm: {
        trigger: "h-[32px] px-[10px] rounded-[10px] text-[13px]",
        icon: "w-[14px] h-[14px]",
        content: "rounded-[10px]",
        item: "px-[8px] py-[4px] rounded-[8px] text-[13px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
        itemIndicator: "w-[14px] h-[14px]",
        label: "px-[8px] py-[4px] text-[11px]",
        separator: "my-[2px] mx-[8px]",
      },
      md: {
        trigger: "h-[36px] px-[12px] rounded-[12px] text-[14px]",
        icon: "w-[16px] h-[16px]",
        content: "rounded-[12px]",
        item: "px-[10px] py-[6px] rounded-[10px] text-[14px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
        itemIndicator: "w-[16px] h-[16px]",
        label: "px-[10px] py-[4px] text-[12px]",
        separator: "my-[4px] mx-[10px]",
      },
      lg: {
        trigger: "h-[44px] px-[14px] rounded-[12px] text-[14px]",
        icon: "w-[18px] h-[18px]",
        content: "rounded-[12px]",
        item: "px-[12px] py-[8px] rounded-[10px] text-[14px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
        itemIndicator: "w-[16px] h-[16px]",
        label: "px-[12px] py-[4px] text-[12px]",
        separator: "my-[4px] mx-[12px]",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "outlined",
  },
});

type SelectVariants = VariantProps<typeof select>;
type SelectSize = NonNullable<SelectVariants["size"]>;
type SelectVariant = NonNullable<SelectVariants["variant"]>;

const SizeContext = React.createContext<SelectSize>("sm");
const useSelectSize = () => React.useContext(SizeContext);

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  size?: SelectSize;
  variant?: SelectVariant;
  invalid?: boolean;
};

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(function SelectTrigger(
  { className, size = "sm", variant = "outlined", invalid, children, ...props },
  ref,
) {
  const styles = select({ size, variant });
  return (
    <SizeContext.Provider value={size}>
      <SelectPrimitive.Trigger
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(styles.trigger(), className)}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <CaretDown className={styles.icon()} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </SizeContext.Provider>
  );
});

type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  size?: SelectSize;
};

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(function SelectContent(
  { className, size: sizeProp, position = "popper", sideOffset = 4, children, ...props },
  ref,
) {
  const ctxSize = useSelectSize();
  const size = sizeProp ?? ctxSize;
  const styles = select({ size });
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={position === "popper" ? sideOffset : undefined}
        className={cn(styles.content(), className)}
        {...props}
      >
        <SizeContext.Provider value={size}>
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport className={styles.viewport()}>
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SizeContext.Provider>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

const SelectViewport = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(function SelectViewport({ className, ...props }, ref) {
  const styles = select({ size: useSelectSize() });
  return (
    <SelectPrimitive.Viewport ref={ref} className={cn(styles.viewport(), className)} {...props} />
  );
});

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  const styles = select({ size: useSelectSize() });
  return (
    <SelectPrimitive.Item ref={ref} className={cn(styles.item(), className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={styles.itemIndicator()}>
        <Check weight="bold" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

const SelectItemText = SelectPrimitive.ItemText;
const SelectItemIndicator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>
>(function SelectItemIndicator({ className, ...props }, ref) {
  const styles = select({ size: useSelectSize() });
  return (
    <SelectPrimitive.ItemIndicator
      ref={ref}
      className={cn(styles.itemIndicator(), className)}
      {...props}
    />
  );
});

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  const styles = select({ size: useSelectSize() });
  return <SelectPrimitive.Label ref={ref} className={cn(styles.label(), className)} {...props} />;
});

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  const styles = select({ size: useSelectSize() });
  return (
    <SelectPrimitive.Separator ref={ref} className={cn(styles.separator(), className)} {...props} />
  );
});

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(function SelectScrollUpButton({ className, ...props }, ref) {
  const styles = select({ size: useSelectSize() });
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(styles.scrollButton(), className)}
      {...props}
    >
      <CaretUp className="h-[14px] w-[14px]" />
    </SelectPrimitive.ScrollUpButton>
  );
});

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(function SelectScrollDownButton({ className, ...props }, ref) {
  const styles = select({ size: useSelectSize() });
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(styles.scrollButton(), className)}
      {...props}
    >
      <CaretDown className="h-[14px] w-[14px]" />
    </SelectPrimitive.ScrollDownButton>
  );
});

export type { SelectContentProps, SelectTriggerProps };
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  select,
};
