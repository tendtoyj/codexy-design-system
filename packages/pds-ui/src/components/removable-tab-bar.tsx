"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as React from "react";

const removableTabBar = tv({
  slots: {
    root: [
      "flex items-center min-w-0 gap-[2px]",
      "overflow-x-auto overflow-y-hidden",
      "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    ],
    tab: [
      "group relative flex items-center cursor-pointer select-none box-border",
      "shrink-0 transition-colors duration-150",
      "bg-transparent",
      "hover:bg-[var(--pds-fill-alternative)]",
      "data-[active=true]:bg-[var(--pds-fill-normal)]",
    ],
    title: [
      "whitespace-nowrap truncate min-w-0 w-full",
      "text-[color:var(--pds-label-alternative)]",
      "group-data-[active=true]:text-[color:var(--pds-label-normal)]",
    ],
    close: [
      "absolute top-1/2 -translate-y-1/2",
      "inline-flex items-center justify-center",
      "border-0 p-0 cursor-pointer",
      "text-[color:var(--pds-label-alternative)]",
      "hover:text-[color:var(--pds-label-normal)]",
      "opacity-0 pointer-events-none",
      "group-hover:opacity-100 group-hover:pointer-events-auto",
      "focus-visible:opacity-100 focus-visible:pointer-events-auto",
      "focus-visible:outline-none",
      "transition-opacity duration-150",
    ],
  },
  variants: {
    size: {
      sm: {
        tab: "h-[24px] min-w-[40px] max-w-[140px] px-[8px] rounded-[6px]",
        title: "text-[12px] font-medium leading-[18px]",
        close: "w-[16px] h-[16px] rounded-[4px] right-[4px]",
      },
      md: {
        tab: "h-[32px] min-w-[56px] max-w-[200px] px-[12px] rounded-[8px]",
        title: "text-[14px] font-medium leading-[21px]",
        close: "w-[20px] h-[20px] rounded-[6px] right-[6px]",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const CLOSE_ICON_SIZE = { sm: 10, md: 12 } as const;

type RemovableTab = {
  id: string;
  title: string;
};

type RemovableTabBarSize = NonNullable<VariantProps<typeof removableTabBar>["size"]>;

type RemovableTabBarProps = {
  tabs: RemovableTab[];
  activeId: string | null;
  onSwitch: (id: string) => void;
  onClose: (id: string) => void;
  size?: RemovableTabBarSize;
  className?: string;
};

function CloseIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2.5 2.5l5 5M7.5 2.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TabChip({
  tab,
  isActive,
  onSelect,
  onClose,
  styles,
  iconSize,
}: {
  tab: RemovableTab;
  isActive: boolean;
  onSelect: () => void;
  onClose: (event: React.MouseEvent) => void;
  styles: ReturnType<typeof removableTabBar>;
  iconSize: number;
}) {
  return (
    <div
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      data-active={isActive}
      className={styles.tab()}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <span className={styles.title()}>{tab.title}</span>
      <button
        type="button"
        aria-label="탭 닫기"
        className={styles.close()}
        style={{
          background: isActive
            ? "linear-gradient(var(--pds-fill-normal), var(--pds-fill-normal)), var(--pds-background-normal-normal)"
            : "linear-gradient(var(--pds-fill-alternative), var(--pds-fill-alternative)), var(--pds-background-normal-normal)",
        }}
        onClick={(event) => {
          event.stopPropagation();
          onClose(event);
        }}
      >
        <CloseIcon size={iconSize} />
      </button>
    </div>
  );
}

const RemovableTabBar = React.forwardRef<HTMLDivElement, RemovableTabBarProps>(
  function RemovableTabBar({ tabs, activeId, onSwitch, onClose, size = "sm", className }, ref) {
    const styles = removableTabBar({ size });
    const iconSize = CLOSE_ICON_SIZE[size];
    return (
      <div
        ref={ref}
        role="tablist"
        data-slot="removable-tab-bar"
        className={cn(styles.root(), className)}
      >
        {tabs.map((tab) => (
          <TabChip
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeId}
            iconSize={iconSize}
            styles={styles}
            onSelect={() => onSwitch(tab.id)}
            onClose={() => onClose(tab.id)}
          />
        ))}
      </div>
    );
  },
);

export type { RemovableTab, RemovableTabBarProps, RemovableTabBarSize };
export { RemovableTabBar, removableTabBar };
