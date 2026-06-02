"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { CloseButton } from "./internal/close-button";

const popover = tv({
  slots: {
    content: [
      "z-[var(--pds-z-popover)] outline-none",
      "bg-[var(--pds-background-elevated-normal)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "shadow-[var(--pds-shadow-lg)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
      "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
    ],
    header: "flex items-start justify-between gap-[8px] shrink-0",
    titleRow: "flex flex-col gap-[2px] min-w-0",
    title: "text-[13px] font-semibold text-[color:var(--pds-label-normal)] m-0",
    description: "text-[12px] text-[color:var(--pds-label-alternative)] m-0",
    body: "text-[13px] text-[color:var(--pds-label-normal)]",
    actionArea: "flex items-center justify-end gap-[8px] shrink-0",
    arrow: "fill-[var(--pds-background-elevated-normal)]",
  },
  variants: {
    size: {
      sm: {
        content: "min-w-[200px] rounded-[10px] p-[10px]",
        body: "text-[12px]",
      },
      md: {
        content: "min-w-[240px] rounded-[12px] p-[12px]",
      },
      lg: {
        content: "min-w-[320px] rounded-[12px] p-[16px]",
        body: "text-[14px]",
      },
    },
    variant: {
      normal: {
        content: "flex flex-col gap-[8px]",
      },
      custom: {},
    },
  },
  defaultVariants: {
    size: "md",
    variant: "normal",
  },
});

type PopoverVariants = VariantProps<typeof popover>;
type PopoverSize = NonNullable<PopoverVariants["size"]>;

const SizeContext = React.createContext<PopoverSize>("md");
const usePopoverSize = () => React.useContext(SizeContext);

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  size?: PopoverVariants["size"];
  variant?: PopoverVariants["variant"];
};

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(
  {
    className,
    size = "md",
    variant = "normal",
    sideOffset = 6,
    align = "start",
    children,
    ...props
  },
  ref,
) {
  const styles = popover({ size, variant });
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(styles.content(), className)}
        {...props}
      >
        <SizeContext.Provider value={size}>{children}</SizeContext.Provider>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

const PopoverHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function PopoverHeader({ className, ...props }, ref) {
    const styles = popover({ size: usePopoverSize() });
    return <div ref={ref} className={cn(styles.header(), className)} {...props} />;
  },
);

const PopoverTitleRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function PopoverTitleRow({ className, ...props }, ref) {
    const styles = popover({ size: usePopoverSize() });
    return <div ref={ref} className={cn(styles.titleRow(), className)} {...props} />;
  },
);

const PopoverTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function PopoverTitle({ className, ...props }, ref) {
    const styles = popover({ size: usePopoverSize() });
    return <h3 ref={ref} className={cn(styles.title(), className)} {...props} />;
  },
);

const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function PopoverDescription({ className, ...props }, ref) {
  const styles = popover({ size: usePopoverSize() });
  return <p ref={ref} className={cn(styles.description(), className)} {...props} />;
});

const PopoverBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function PopoverBody({ className, ...props }, ref) {
    const styles = popover({ size: usePopoverSize() });
    return <div ref={ref} className={cn(styles.body(), className)} {...props} />;
  },
);

const PopoverActionArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function PopoverActionArea({ className, ...props }, ref) {
    const styles = popover({ size: usePopoverSize() });
    return <div ref={ref} className={cn(styles.actionArea(), className)} {...props} />;
  },
);

type PopoverCloseProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close> & {
  size?: "sm" | "md" | "lg";
};

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  PopoverCloseProps
>(function PopoverClose({ className, asChild, size = "sm", children, ...props }, ref) {
  if (asChild) {
    return (
      <PopoverPrimitive.Close ref={ref} asChild {...props}>
        {children}
      </PopoverPrimitive.Close>
    );
  }
  return (
    <PopoverPrimitive.Close asChild {...props}>
      <CloseButton ref={ref as React.Ref<HTMLButtonElement>} size={size} className={className}>
        {children as React.ReactNode}
      </CloseButton>
    </PopoverPrimitive.Close>
  );
});

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(function PopoverArrow({ className, ...props }, ref) {
  const styles = popover();
  return <PopoverPrimitive.Arrow ref={ref} className={cn(styles.arrow(), className)} {...props} />;
});

export type { PopoverContentProps };
export {
  Popover,
  PopoverActionArea,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTitleRow,
  PopoverTrigger,
  popover,
};
