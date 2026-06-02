"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

type TabsVariant = "segmented" | "label";

const tabs = tv({
  slots: {
    root: [
      "flex",
      "data-[orientation=horizontal]:flex-col",
      "data-[orientation=vertical]:flex-row",
    ],
    list: ["inline-flex items-center", "data-[orientation=vertical]:flex-col"],
    trigger: [
      "inline-flex items-center justify-center shrink-0 cursor-pointer",
      "transition-colors duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-1",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "disabled:pointer-events-none disabled:text-[color:var(--pds-label-disable)]",
    ],
    content: "focus-visible:outline-none",
  },
  variants: {
    variant: {
      segmented: {
        list: "gap-[2px]",
        trigger: [
          "w-[24px] h-[24px] rounded-[var(--pds-radius-6)]",
          "[&>svg]:!w-[18px] [&>svg]:!h-[18px]",
          "text-[color:var(--pds-label-alternative)]",
          "hover:bg-[var(--pds-fill-normal)] hover:text-[color:var(--pds-label-neutral)]",
          "aria-selected:bg-[var(--pds-fill-strong)]",
          "aria-selected:text-[color:var(--pds-label-normal)]",
        ],
      },
      label: {
        list: "gap-[4px]",
        trigger: [
          "h-[28px] px-[8px] rounded-[var(--pds-radius-10)]",
          "text-[13px] leading-[18px]",
          "text-[color:var(--pds-label-alternative)]",
          "hover:text-[color:var(--pds-label-normal)]",
          "aria-selected:bg-[var(--pds-fill-normal)]",
          "aria-selected:text-[color:var(--pds-label-normal)]",
          "aria-selected:font-medium",
        ],
      },
    },
  },
  defaultVariants: {
    variant: "segmented",
  },
});

const TabsVariantContext = React.createContext<TabsVariant>("segmented");

type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant;
};

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(function Tabs(
  { className, variant = "segmented", ...props },
  ref,
) {
  const styles = tabs({ variant });
  return (
    <TabsVariantContext.Provider value={variant}>
      <TooltipProvider>
        <TabsPrimitive.Root ref={ref} className={cn(styles.root(), className)} {...props} />
      </TooltipProvider>
    </TabsVariantContext.Provider>
  );
});

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  const variant = React.useContext(TabsVariantContext);
  const styles = tabs({ variant });
  return <TabsPrimitive.List ref={ref} className={cn(styles.list(), className)} {...props} />;
});

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  /** 툴팁 텍스트 + 스크린리더 라벨. `segmented` variant 에서는 필수 (icon-only). `label` variant 에서는 children 텍스트가 라벨 역할을 하므로 옵셔널. */
  "aria-label"?: string;
  /** 툴팁 노출 위치 (`segmented` variant 전용) */
  tooltipSide?: "top" | "bottom" | "left" | "right";
};

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, tooltipSide = "bottom", ...props }, ref) {
  const variant = React.useContext(TabsVariantContext);
  const styles = tabs({ variant });
  const trigger = (
    <TabsPrimitive.Trigger ref={ref} className={cn(styles.trigger(), className)} {...props} />
  );
  if (variant === "label") {
    return trigger;
  }
  const label = props["aria-label"];
  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent side={tooltipSide} size="sm">
        {label}
      </TooltipContent>
    </Tooltip>
  );
});

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  const styles = tabs();
  return <TabsPrimitive.Content ref={ref} className={cn(styles.content(), className)} {...props} />;
});

export type { TabsProps, TabsTriggerProps, TabsVariant };
export { Tabs, TabsContent, TabsList, TabsTrigger, tabs };
