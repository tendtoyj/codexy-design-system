"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

const scrollArea = tv({
  slots: {
    root: "relative overflow-hidden",
    viewport: "h-full w-full rounded-[inherit] outline-none",
    scrollbar: [
      "flex touch-none select-none p-[2px] transition-[width,height,background] ease-out",
      "data-[orientation=vertical]:h-full data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-[var(--pds-sb-size)]",
      "data-[orientation=vertical]:w-[var(--pds-sb-size)]",
      "hover:[--pds-sb-size:10px]",
    ],
    thumb: [
      "relative flex-1 rounded-full",
      "bg-[color:color-mix(in_srgb,var(--pds-label-alternative)_45%,transparent)]",
      "before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
      "before:h-full before:w-full before:min-h-[44px] before:min-w-[44px] before:content-['']",
      "transition-[background] ease-out hover:bg-[color:color-mix(in_srgb,var(--pds-label-alternative)_65%,transparent)]",
    ],
    corner: "bg-transparent",
  },
  variants: {
    scrollBarSize: {
      sm: { root: "[--pds-sb-size:6px]" },
      md: { root: "[--pds-sb-size:8px]" },
      responsive: { root: "[--pds-sb-size:6px]" },
    },
  },
  defaultVariants: {
    scrollBarSize: "md",
  },
});

type ScrollAreaVariants = VariantProps<typeof scrollArea>;

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  scrollBarSize?: ScrollAreaVariants["scrollBarSize"];
  viewportClassName?: string;
  viewportStyle?: React.CSSProperties;
  viewportRef?: React.Ref<HTMLDivElement>;
  onViewportScroll?: React.UIEventHandler<HTMLDivElement>;
};

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(function ScrollArea(
  {
    className,
    viewportClassName,
    viewportStyle,
    viewportRef,
    onViewportScroll,
    scrollBarSize = "md",
    type = "hover",
    children,
    ...props
  },
  ref,
) {
  const styles = scrollArea({ scrollBarSize });
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      type={type}
      className={cn(styles.root(), className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        onScroll={onViewportScroll}
        style={viewportStyle}
        className={cn(styles.viewport(), viewportClassName)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner className={styles.corner()} />
    </ScrollAreaPrimitive.Root>
  );
});

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(function ScrollBar({ className, orientation = "vertical", ...props }, ref) {
  const styles = scrollArea();
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(styles.scrollbar(), className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className={styles.thumb()} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});

export type { ScrollAreaProps };
export { ScrollArea, ScrollBar, scrollArea };
