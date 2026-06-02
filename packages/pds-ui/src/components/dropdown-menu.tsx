"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { CaretRight, Check } from "@fluxloop-ai/pds-icons/icons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";

const menu = tv({
  slots: {
    content: [
      "z-[var(--pds-z-dropdown)] overflow-hidden",
      "bg-[var(--pds-background-elevated-normal)]",
      "shadow-[var(--pds-shadow-lg)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "[&_svg]:[stroke-width:1.5]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
    ],
    item: [
      "relative flex cursor-pointer select-none items-center outline-none",
      "[color:var(--pds-label-normal)]",
      "data-[highlighted]:bg-[var(--pds-fill-normal)]",
      "data-[state=open]:bg-[var(--pds-fill-normal)]",
      "data-[disabled]:pointer-events-none data-[disabled]:[color:var(--pds-label-disable)]",
      "[&>svg:first-child]:shrink-0",
    ],
    trailing: [
      "ml-auto inline-flex shrink-0 items-center justify-center",
      "[color:var(--pds-label-neutral)]",
    ],
    label: ["font-semibold [color:var(--pds-label-alternative)]"],
    separator: "h-px bg-[var(--pds-line-normal-neutral)]",
    shortcut: [
      "ml-auto tracking-wide",
      "[color:var(--pds-label-assistive)]",
      "font-[var(--pds-font-mono)]",
    ],
  },
  variants: {
    size: {
      sm: {
        content: "min-w-[140px] rounded-[10px] p-[4px]",
        item: [
          "gap-[8px] rounded-[8px] px-[8px] py-[4px] text-body2",
          "[&>svg:first-child]:w-[14px] [&>svg:first-child]:h-[14px]",
        ],
        trailing: "w-[14px] h-[14px]",
        label: "px-[8px] py-[4px] text-caption1",
        separator: "my-[2px] mx-[8px]",
        shortcut: "text-caption1",
      },
      md: {
        content: "min-w-[160px] rounded-[12px] p-[6px]",
        item: [
          "gap-[8px] rounded-[10px] px-[10px] py-[6px] text-body1",
          "[&>svg:first-child]:w-[16px] [&>svg:first-child]:h-[16px]",
        ],
        trailing: "w-[16px] h-[16px]",
        label: "px-[10px] py-[4px] text-body2",
        separator: "my-[4px] mx-[10px]",
        shortcut: "text-label2",
      },
    },
  },
  defaultVariants: { size: "md" },
});

type MenuSize = NonNullable<VariantProps<typeof menu>["size"]>;

const SizeContext = React.createContext<MenuSize>("md");
const useMenuSize = () => React.useContext(SizeContext);

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> & {
  size?: MenuSize;
};

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  { className, sideOffset = 4, align = "start", size = "md", children, ...props },
  ref,
) {
  const styles = menu({ size });
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(styles.content(), className)}
        {...props}
      >
        <SizeContext.Provider value={size}>{children}</SizeContext.Provider>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(function DropdownMenuItem({ className, ...props }, ref) {
  const styles = menu({ size: useMenuSize() });
  return (
    <DropdownMenuPrimitive.Item ref={ref} className={cn(styles.item(), className)} {...props} />
  );
});

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, checked, ...props }, ref) {
  const styles = menu({ size: useMenuSize() });
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(styles.item(), className)}
      checked={checked}
      {...props}
    >
      {children}
      <span className={styles.trailing()}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="w-full h-full" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  const styles = menu({ size: useMenuSize() });
  return (
    <DropdownMenuPrimitive.RadioItem ref={ref} className={cn(styles.item(), className)} {...props}>
      {children}
      <span className={styles.trailing()}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="w-[14px] h-[14px]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    </DropdownMenuPrimitive.RadioItem>
  );
});

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  const styles = menu({ size: useMenuSize() });
  return (
    <DropdownMenuPrimitive.Label ref={ref} className={cn(styles.label(), className)} {...props} />
  );
});

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  const styles = menu({ size: useMenuSize() });
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(styles.separator(), className)}
      {...props}
    />
  );
});

function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const styles = menu({ size: useMenuSize() });
  return <span className={cn(styles.shortcut(), className)} {...props} />;
}

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(function DropdownMenuSubTrigger({ className, children, ...props }, ref) {
  const size = useMenuSize();
  const styles = menu({ size });
  return (
    <DropdownMenuPrimitive.SubTrigger ref={ref} className={cn(styles.item(), className)} {...props}>
      {children}
      <CaretRight
        className={cn(
          "ml-auto shrink-0 [color:var(--pds-label-assistive)]",
          size === "sm" ? "w-[14px] h-[14px]" : "w-[16px] h-[16px]",
        )}
      />
    </DropdownMenuPrimitive.SubTrigger>
  );
});

type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
> & {
  size?: MenuSize;
};

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(function DropdownMenuSubContent({ className, size: sizeProp, children, ...props }, ref) {
  const ctxSize = useMenuSize();
  const size = sizeProp ?? ctxSize;
  const styles = menu({ size });
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(styles.content(), className)}
      {...props}
    >
      <SizeContext.Provider value={size}>{children}</SizeContext.Provider>
    </DropdownMenuPrimitive.SubContent>
  );
});

export type { DropdownMenuContentProps, DropdownMenuSubContentProps, MenuSize };
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  menu,
};
