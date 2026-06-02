"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

const tooltip = tv({
  slots: {
    content: [
      "z-[var(--pds-z-tooltip)] inline-flex items-center gap-[4px]",
      "bg-[var(--pds-background-elevated-normal)] text-[color:var(--pds-label-normal)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
      "data-[side=top]:slide-in-from-bottom-1 data-[side=bottom]:slide-in-from-top-1",
      "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
    ],
    label: "text-left",
    shortcut: [
      "inline-flex items-center",
      "bg-[var(--pds-fill-normal)] text-[color:var(--pds-label-normal)]",
      "font-[var(--pds-font-mono)] tracking-wide",
      "px-[4px] py-[1px] rounded-[4px]",
    ],
  },
  variants: {
    size: {
      sm: {
        content: "px-[8px] py-[4px] text-[12px] rounded-[8px]",
        shortcut: "text-[10px]",
      },
      md: {
        content: "px-[10px] py-[6px] text-[13px] rounded-[10px]",
        shortcut: "text-[10px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type TooltipVariants = VariantProps<typeof tooltip>;

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipRoot = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  size?: TooltipVariants["size"];
  shortcut?: React.ReactNode;
};

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(function TooltipContent(
  { className, size = "md", shortcut, sideOffset = 6, children, ...props },
  ref,
) {
  const styles = tooltip({ size });
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(styles.content(), className)}
        {...props}
      >
        <span className={styles.label()}>{children}</span>
        {shortcut ? <span className={styles.shortcut()}>{shortcut}</span> : null}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});

type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> & {
  mode?: "hover" | "always" | "click";
};

function Tooltip({ mode = "hover", open, defaultOpen, onOpenChange, ...props }: TooltipProps) {
  if (mode === "always") {
    return <TooltipPrimitive.Root open onOpenChange={onOpenChange} {...props} />;
  }
  if (mode === "click") {
    return (
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={0}
        disableHoverableContent
        {...props}
      />
    );
  }
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...props}
    />
  );
}

export type { TooltipContentProps, TooltipProps };
export { Tooltip, TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger, tooltip };
