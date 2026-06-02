"use client";

import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import { CaretDown } from "@tendtoyj/cds-icons/icons";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandRoot } from "cmdk";
import * as React from "react";

const combobox = tv({
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
      "z-[var(--cds-z-popover)] overflow-hidden",
      "bg-[var(--cds-background-elevated-normal)]",
      "border border-[var(--cds-line-normal-neutral)]",
      "shadow-[var(--cds-shadow-lg)]",
      "w-[var(--radix-popover-trigger-width)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
    ],
    commandRoot: "flex flex-col",
    inputWrap: "flex items-center gap-[6px]",
    input: [
      "flex-1 min-w-0 bg-transparent outline-none border-0",
      "text-[color:var(--cds-label-normal)]",
      "placeholder:text-[color:var(--cds-label-assistive)]",
      "caret-[color:var(--cds-primary-normal)]",
      "disabled:cursor-default disabled:text-[color:var(--cds-label-alternative)]",
    ],
    list: "max-h-[256px] overflow-y-auto overflow-x-hidden p-[var(--cds-menu-content-pad-sm)]",
    empty: [
      "py-[16px] px-[12px] text-center",
      "text-[12px] text-[color:var(--cds-label-assistive)]",
    ],
    group: [
      "py-[2px]",
      "[&_[cmdk-group-heading]]:py-[4px]",
      "[&_[cmdk-group-heading]]:font-semibold",
      "[&_[cmdk-group-heading]]:text-[color:var(--cds-label-alternative)]",
    ],
    item: [
      "relative flex cursor-pointer select-none items-center gap-[8px]",
      "outline-none text-[color:var(--cds-label-normal)]",
      "data-[selected=true]:bg-[var(--cds-fill-normal)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:[color:var(--cds-label-disable)]",
      "aria-selected:bg-[var(--cds-fill-normal)]",
    ],
    separator: "h-px bg-[var(--cds-line-normal-neutral)]",
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
        inputWrap: "h-[var(--cds-control-height-sm)] px-[var(--cds-control-pad-x-sm)]",
        input: "text-[length:var(--cds-control-text-sm)]",
        item: "px-[var(--cds-menu-item-pad-x-sm)] py-[var(--cds-menu-item-pad-y-sm)] rounded-[var(--cds-menu-item-radius-sm)] text-[13px] [&_svg]:w-[var(--cds-menu-item-icon-sm)] [&_svg]:h-[var(--cds-menu-item-icon-sm)]",
        group: "[&_[cmdk-group-heading]]:px-[8px] [&_[cmdk-group-heading]]:text-[11px]",
        separator: "my-[2px] mx-[8px]",
      },
      md: {
        trigger: "h-[var(--cds-control-height-md)] px-[var(--cds-control-pad-x-md)] rounded-[var(--cds-control-radius-md)] text-[length:var(--cds-control-text-md)]",
        icon: "w-[var(--cds-field-icon-sm)] h-[var(--cds-field-icon-sm)]",
        content: "rounded-[var(--cds-menu-content-radius-md)]",
        inputWrap: "h-[var(--cds-control-height-md)] px-[var(--cds-control-pad-x-md)]",
        input: "text-[length:var(--cds-control-text-md)]",
        item: "px-[var(--cds-menu-item-pad-x-md)] py-[var(--cds-menu-item-pad-y-md)] rounded-[var(--cds-menu-item-radius-md)] text-[14px] [&_svg]:w-[var(--cds-menu-item-icon-md)] [&_svg]:h-[var(--cds-menu-item-icon-md)]",
        group: "[&_[cmdk-group-heading]]:px-[10px] [&_[cmdk-group-heading]]:text-[12px]",
        separator: "my-[4px] mx-[10px]",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "outlined",
  },
});

type ComboboxVariants = VariantProps<typeof combobox>;
type ComboboxSize = NonNullable<ComboboxVariants["size"]>;
type ComboboxVariant = NonNullable<ComboboxVariants["variant"]>;

type ComboboxFilter = (value: string, search: string, keywords?: string[]) => number;

type ComboboxContextValue = {
  size: ComboboxSize;
  value: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  inputValue: string | undefined;
  onInputValueChange: ((value: string) => void) | undefined;
  setOpen: (open: boolean) => void;
};

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);
const useComboboxContext = (caller: string): ComboboxContextValue => {
  const ctx = React.useContext(ComboboxContext);
  if (!ctx) throw new Error(`<${caller}> must be used inside <Combobox>.`);
  return ctx;
};

type ComboboxProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  inputValue?: string;
  onInputValueChange?: (value: string) => void;
  defaultInputValue?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  filter?: ComboboxFilter;
  disabled?: boolean;
  size?: ComboboxSize;
  children?: React.ReactNode;
};

function Combobox({
  value: controlledValue,
  onValueChange,
  defaultValue,
  inputValue: controlledInputValue,
  onInputValueChange,
  defaultInputValue,
  open,
  defaultOpen,
  onOpenChange,
  filter,
  disabled,
  size = "sm",
  children,
}: ComboboxProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
    defaultValue,
  );
  const [uncontrolledInput, setUncontrolledInput] = React.useState<string>(defaultInputValue ?? "");
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(defaultOpen ?? false);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const inputValue = controlledInputValue !== undefined ? controlledInputValue : uncontrolledInput;
  const openState = open !== undefined ? open : uncontrolledOpen;

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (controlledValue === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange],
  );
  const handleInputValueChange = React.useCallback(
    (next: string) => {
      if (controlledInputValue === undefined) setUncontrolledInput(next);
      onInputValueChange?.(next);
    },
    [controlledInputValue, onInputValueChange],
  );
  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolledOpen(next);
      // Reset search input on close so the next open shows the full list
      if (!next) {
        if (controlledInputValue === undefined) setUncontrolledInput("");
        onInputValueChange?.("");
      }
      onOpenChange?.(next);
    },
    [open, controlledInputValue, onInputValueChange, onOpenChange],
  );

  const ctx = React.useMemo<ComboboxContextValue>(
    () => ({
      size,
      value,
      onValueChange: handleValueChange,
      inputValue,
      onInputValueChange: handleInputValueChange,
      setOpen: handleOpenChange,
    }),
    [size, value, handleValueChange, inputValue, handleInputValueChange, handleOpenChange],
  );

  const styles = combobox({ size });

  return (
    <ComboboxContext.Provider value={ctx}>
      <PopoverPrimitive.Root open={openState} onOpenChange={handleOpenChange}>
        <CommandRoot
          filter={filter}
          shouldFilter={filter ? undefined : true}
          label="Combobox"
          className={styles.commandRoot()}
          // Disable cmdk's own vim keybindings since the trigger opens via popover
          vimBindings={false}
        >
          <fieldset
            disabled={disabled}
            style={{ border: 0, margin: 0, padding: 0, minInlineSize: "auto" }}
          >
            {children}
          </fieldset>
        </CommandRoot>
      </PopoverPrimitive.Root>
    </ComboboxContext.Provider>
  );
}

type ComboboxTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
  invalid?: boolean;
  placeholder?: string;
  variant?: ComboboxVariant;
};

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  ComboboxTriggerProps
>(function ComboboxTrigger(
  { className, invalid, placeholder, variant = "outlined", children, ...props },
  ref,
) {
  const ctx = useComboboxContext("ComboboxTrigger");
  const styles = combobox({ size: ctx.size, variant });
  const showPlaceholder = !children && !ctx.value;
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      aria-invalid={invalid || undefined}
      data-placeholder={showPlaceholder || undefined}
      className={cn(styles.trigger(), className)}
      {...props}
    >
      <span className="truncate">{children ?? (ctx.value || placeholder || "선택")}</span>
      <CaretDown className={styles.icon()} />
    </PopoverPrimitive.Trigger>
  );
});

type ComboboxContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  "children"
> & {
  children?: React.ReactNode;
};

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  ComboboxContentProps
>(function ComboboxContent(
  { className, align = "start", sideOffset = 4, children, ...props },
  ref,
) {
  const ctx = useComboboxContext("ComboboxContent");
  const styles = combobox({ size: ctx.size });
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(styles.content(), className)}
        onOpenAutoFocus={(e) => {
          // Let cmdk manage focus inside the list
          e.preventDefault();
        }}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

type ComboboxInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandRoot.Input>,
  "value" | "onValueChange"
> & {
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
};

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(function ComboboxInput(
  { className, leadingContent, trailingContent, ...props },
  ref,
) {
  const ctx = useComboboxContext("ComboboxInput");
  const styles = combobox({ size: ctx.size });
  return (
    <div className={styles.inputWrap()}>
      {leadingContent}
      <CommandRoot.Input
        ref={ref}
        value={ctx.inputValue ?? ""}
        onValueChange={ctx.onInputValueChange}
        className={cn(styles.input(), className)}
        {...props}
      />
      {trailingContent}
    </div>
  );
});

const ComboboxList = React.forwardRef<
  React.ElementRef<typeof CommandRoot.List>,
  React.ComponentPropsWithoutRef<typeof CommandRoot.List>
>(function ComboboxList({ className, ...props }, ref) {
  const ctx = useComboboxContext("ComboboxList");
  const styles = combobox({ size: ctx.size });
  return <CommandRoot.List ref={ref} className={cn(styles.list(), className)} {...props} />;
});

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof CommandRoot.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandRoot.Empty>
>(function ComboboxEmpty({ className, ...props }, ref) {
  const ctx = useComboboxContext("ComboboxEmpty");
  const styles = combobox({ size: ctx.size });
  return <CommandRoot.Empty ref={ref} className={cn(styles.empty(), className)} {...props} />;
});

const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof CommandRoot.Group>,
  React.ComponentPropsWithoutRef<typeof CommandRoot.Group>
>(function ComboboxGroup({ className, ...props }, ref) {
  const ctx = useComboboxContext("ComboboxGroup");
  const styles = combobox({ size: ctx.size });
  return <CommandRoot.Group ref={ref} className={cn(styles.group(), className)} {...props} />;
});

type ComboboxItemProps = React.ComponentPropsWithoutRef<typeof CommandRoot.Item>;

const ComboboxItem = React.forwardRef<React.ElementRef<typeof CommandRoot.Item>, ComboboxItemProps>(
  function ComboboxItem({ className, onSelect, ...props }, ref) {
    const ctx = useComboboxContext("ComboboxItem");
    const styles = combobox({ size: ctx.size });
    return (
      <CommandRoot.Item
        ref={ref}
        onSelect={(value) => {
          ctx.onValueChange?.(value);
          onSelect?.(value);
          ctx.setOpen(false);
        }}
        className={cn(styles.item(), className)}
        {...props}
      />
    );
  },
);

const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof CommandRoot.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandRoot.Separator>
>(function ComboboxSeparator({ className, ...props }, ref) {
  const ctx = useComboboxContext("ComboboxSeparator");
  const styles = combobox({ size: ctx.size });
  return (
    <CommandRoot.Separator ref={ref} className={cn(styles.separator(), className)} {...props} />
  );
});

export type {
  ComboboxContentProps,
  ComboboxFilter,
  ComboboxItemProps,
  ComboboxProps,
  ComboboxTriggerProps,
};
export {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  combobox,
};
