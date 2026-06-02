"use client";

import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import { CaretDown, CaretUp, Check } from "@tendtoyj/cds-icons/icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";

const select = tv({
  slots: {
    trigger: [
      "group inline-flex items-center justify-between gap-[8px]",
      "text-[color:var(--cds-label-normal)]",
      "transition-[box-shadow,background-color] duration-[var(--cds-duration-fast)]",
      "focus-visible:outline-none",
      "focus-visible:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--cds-focus-ring)_43%,transparent)]",
      "data-[placeholder]:text-[color:var(--cds-label-assistive)]",
      "disabled:cursor-default disabled:bg-[var(--cds-fill-alternative)]",
      "disabled:text-[color:var(--cds-label-alternative)]",
      "aria-invalid:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--cds-status-negative)_43%,transparent)]",
    ],
    icon: [
      "shrink-0 text-[color:var(--cds-interaction-inactive)]",
      "transition-transform duration-[var(--cds-duration-fast)]",
      "group-data-[state=open]:rotate-180",
    ],
    content: [
      "relative z-[var(--cds-z-dropdown)] overflow-hidden",
      "bg-[var(--cds-background-elevated-normal)]",
      "border border-[var(--cds-line-normal-neutral)]",
      "shadow-[var(--cds-shadow-lg)]",
      "min-w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
    ],
    viewport: "p-[var(--cds-menu-content-pad-sm)]",
    item: [
      "relative flex cursor-pointer select-none items-center gap-[8px]",
      "outline-none text-[color:var(--cds-label-normal)]",
      "data-[highlighted]:bg-[var(--cds-fill-normal)]",
      "data-[disabled]:pointer-events-none data-[disabled]:[color:var(--cds-label-disable)]",
    ],
    itemIndicator: [
      "ml-auto inline-flex items-center justify-center text-[color:var(--cds-primary-normal)]",
    ],
    label: "font-semibold [color:var(--cds-label-alternative)]",
    separator: "h-px bg-[var(--cds-line-normal-neutral)]",
    scrollButton: [
      "flex items-center justify-center py-[4px]",
      "text-[color:var(--cds-interaction-inactive)]",
      "cursor-default bg-[var(--cds-background-elevated-normal)]",
    ],
  },
  variants: {
    variant: {
      outlined: {
        trigger: [
          "bg-[var(--cds-background-transparent-normal)]",
          "shadow-[inset_0_0_0_1px_var(--cds-line-normal-neutral)]",
        ],
      },
      filled: {
        trigger: [
          "bg-[var(--cds-fill-normal)]",
          "hover:bg-[var(--cds-fill-strong)]",
          "data-[state=open]:bg-[var(--cds-fill-strong)]",
        ],
      },
    },
    size: {
      sm: {
        trigger: "h-[var(--cds-control-height-sm)] px-[var(--cds-control-pad-x-sm)] rounded-[var(--cds-control-radius-sm)] text-[length:var(--cds-control-text-sm)]",
        icon: "w-[var(--cds-field-icon-xs)] h-[var(--cds-field-icon-xs)]",
        content: "rounded-[var(--cds-menu-content-radius-sm)]",
        item: "px-[var(--cds-menu-item-pad-x-sm)] py-[var(--cds-menu-item-pad-y-sm)] rounded-[var(--cds-menu-item-radius-sm)] text-[13px] [&_svg]:w-[var(--cds-menu-item-icon-sm)] [&_svg]:h-[var(--cds-menu-item-icon-sm)]",
        itemIndicator: "w-[var(--cds-menu-item-icon-sm)] h-[var(--cds-menu-item-icon-sm)]",
        label: "px-[var(--cds-menu-item-pad-x-sm)] py-[var(--cds-menu-item-pad-y-sm)] text-[11px]",
        separator: "my-[2px] mx-[8px]",
      },
      md: {
        trigger: "h-[var(--cds-control-height-md)] px-[var(--cds-control-pad-x-md)] rounded-[var(--cds-control-radius-md)] text-[length:var(--cds-control-text-md)]",
        icon: "w-[var(--cds-field-icon-sm)] h-[var(--cds-field-icon-sm)]",
        content: "rounded-[var(--cds-menu-content-radius-md)]",
        item: "px-[var(--cds-menu-item-pad-x-md)] py-[var(--cds-menu-item-pad-y-md)] rounded-[var(--cds-menu-item-radius-md)] text-[14px] [&_svg]:w-[var(--cds-menu-item-icon-md)] [&_svg]:h-[var(--cds-menu-item-icon-md)]",
        itemIndicator: "w-[var(--cds-menu-item-icon-md)] h-[var(--cds-menu-item-icon-md)]",
        label: "px-[var(--cds-menu-item-pad-x-md)] py-[4px] text-[12px]",
        separator: "my-[4px] mx-[10px]",
      },
      lg: {
        trigger: "h-[var(--cds-control-height-lg)] px-[var(--cds-control-pad-x-lg)] rounded-[var(--cds-control-radius-lg)] text-[length:var(--cds-control-text-lg)]",
        icon: "w-[var(--cds-field-icon-lg)] h-[var(--cds-field-icon-lg)]",
        content: "rounded-[var(--cds-menu-content-radius-md)]",
        item: "px-[12px] py-[8px] rounded-[var(--cds-menu-item-radius-md)] text-[14px] [&_svg]:w-[var(--cds-menu-item-icon-md)] [&_svg]:h-[var(--cds-menu-item-icon-md)]",
        itemIndicator: "w-[var(--cds-menu-item-icon-md)] h-[var(--cds-menu-item-icon-md)]",
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
