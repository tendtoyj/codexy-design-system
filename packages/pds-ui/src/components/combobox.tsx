"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { CaretDown } from "@fluxloop-ai/pds-icons/icons";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandRoot } from "cmdk";
import * as React from "react";

const combobox = tv({
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
      "z-[var(--pds-z-popover)] overflow-hidden",
      "bg-[var(--pds-background-elevated-normal)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "shadow-[var(--pds-shadow-lg)]",
      "w-[var(--radix-popover-trigger-width)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
    ],
    commandRoot: "flex flex-col",
    inputWrap: "flex items-center gap-[6px]",
    input: [
      "flex-1 min-w-0 bg-transparent outline-none border-0",
      "text-[color:var(--pds-label-normal)]",
      "placeholder:text-[color:var(--pds-label-assistive)]",
      "caret-[color:var(--pds-primary-normal)]",
      "disabled:cursor-default disabled:text-[color:var(--pds-label-alternative)]",
    ],
    list: "max-h-[256px] overflow-y-auto overflow-x-hidden p-[4px]",
    empty: [
      "py-[16px] px-[12px] text-center",
      "text-[12px] text-[color:var(--pds-label-assistive)]",
    ],
    group: [
      "py-[2px]",
      "[&_[cmdk-group-heading]]:py-[4px]",
      "[&_[cmdk-group-heading]]:font-semibold",
      "[&_[cmdk-group-heading]]:text-[color:var(--pds-label-alternative)]",
    ],
    item: [
      "relative flex cursor-pointer select-none items-center gap-[8px]",
      "outline-none text-[color:var(--pds-label-normal)]",
      "data-[selected=true]:bg-[var(--pds-fill-normal)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:[color:var(--pds-label-disable)]",
      "aria-selected:bg-[var(--pds-fill-normal)]",
    ],
    separator: "h-px bg-[var(--pds-line-normal-neutral)]",
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
        inputWrap: "h-[32px] px-[10px]",
        input: "text-[13px]",
        item: "px-[8px] py-[4px] rounded-[8px] text-[13px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
        group: "[&_[cmdk-group-heading]]:px-[8px] [&_[cmdk-group-heading]]:text-[11px]",
        separator: "my-[2px] mx-[8px]",
      },
      md: {
        trigger: "h-[36px] px-[12px] rounded-[12px] text-[14px]",
        icon: "w-[16px] h-[16px]",
        content: "rounded-[12px]",
        inputWrap: "h-[36px] px-[12px]",
        input: "text-[14px]",
        item: "px-[10px] py-[6px] rounded-[10px] text-[14px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
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
