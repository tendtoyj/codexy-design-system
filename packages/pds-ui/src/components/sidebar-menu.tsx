"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import type { PhosphorIcon } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import { Icon } from "./icon";

const sidebarMenu = tv({
  slots: {
    root: "flex flex-col gap-[2px]",
    item: [
      "flex items-center gap-[10px] w-full h-[32px] px-[10px] rounded-[8px]",
      "text-[13px] leading-[18px] text-left",
      "text-[color:var(--pds-label-neutral)] bg-transparent",
      "transition-[background-color,color] duration-[var(--pds-duration-fast)]",
      "cursor-pointer select-none",
      "hover:bg-[var(--pds-fill-alternative)]",
      "data-[selected=true]:bg-[var(--pds-fill-normal)]",
      "data-[selected=true]:text-[color:var(--pds-label-normal)]",
      "data-[selected=true]:font-medium",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
    ],
    label: "min-w-0 truncate",
  },
});

type SidebarMenuItem = {
  id: string;
  icon: PhosphorIcon | React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
  label: string;
};

type SidebarMenuProps = Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> & {
  items: SidebarMenuItem[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** `<nav>` 의 aria-label. 페이지에 nav 가 여러 개 있을 때 식별을 위해 권장. */
  "aria-label"?: string;
};

const SidebarMenu = React.forwardRef<HTMLElement, SidebarMenuProps>(function SidebarMenu(
  { items, selectedId = null, onSelect, className, ...props },
  ref,
) {
  const styles = sidebarMenu();
  return (
    <nav ref={ref} data-slot="sidebar-menu" className={cn(styles.root(), className)} {...props}>
      {items.map((item) => {
        const selected = item.id === selectedId;
        return (
          <button
            key={item.id}
            type="button"
            data-selected={selected}
            aria-current={selected ? "page" : undefined}
            className={styles.item()}
            onClick={() => onSelect?.(item.id)}
          >
            <Icon
              icon={item.icon}
              size="sm"
              weight={selected ? "fill" : "regular"}
              className={selected ? "pds-animate-icon-pop" : undefined}
            />
            <span className={styles.label()}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
});

export type { SidebarMenuItem, SidebarMenuProps };
export { SidebarMenu, sidebarMenu };
