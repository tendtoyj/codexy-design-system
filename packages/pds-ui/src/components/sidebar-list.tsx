"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import { DotsThree } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import { Icon } from "./icon";

const sidebarList = tv({
  slots: {
    root: "flex flex-col",
    header: [
      "flex items-center justify-between h-[28px] pl-[8px] pr-[4px] pb-[4px] box-content",
      "data-[sticky=true]:sticky data-[sticky=true]:top-0 data-[sticky=true]:z-10",
      "data-[sticky=true]:bg-[var(--pds-background-normal-alternative,var(--pds-fill-normal))]",
    ],
    headerLeading: "flex items-center gap-[6px] min-w-0",
    title: [
      "text-[12px] leading-[16px] font-semibold tracking-tight",
      "text-[color:var(--pds-label-alternative)]",
      "truncate",
    ],
    count: [
      "inline-flex items-center justify-center min-w-[16px] h-[16px] px-[4px]",
      "rounded-full bg-[var(--pds-fill-normal)]",
      "text-[10px] leading-[10px] font-semibold",
      "text-[color:var(--pds-label-alternative)]",
    ],
    actions: "flex items-center gap-[2px] shrink-0",
    body: "flex flex-col gap-[2px]",
    item: [
      "group/item",
      "flex items-center w-full h-[32px] px-[10px] data-[has-trailing=true]:pr-[6px] rounded-[8px]",
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
    itemLabel: "min-w-0 flex-1 truncate",
    itemTrailing: [
      "ml-[4px] shrink-0 inline-flex items-center",
      "opacity-0 transition-opacity duration-[var(--pds-duration-fast)]",
      "group-hover/item:opacity-100",
      "group-focus-within/item:opacity-100",
      "group-data-[selected=true]/item:opacity-100",
      "has-[[data-state=open]]:opacity-100",
    ],
    more: [
      "flex items-center gap-[10px] w-full h-[28px] px-[10px] rounded-[8px]",
      "text-[13px] leading-[18px] text-left",
      "text-[color:var(--pds-label-assistive)] bg-transparent",
      "transition-[background-color,color] duration-[var(--pds-duration-fast)]",
      "cursor-pointer select-none",
      "hover:bg-[var(--pds-fill-alternative)] hover:text-[color:var(--pds-label-alternative)]",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
    ],
  },
});

type SidebarListItem = {
  id: string;
  label: string;
};

type SidebarListProps = Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> & {
  title: string;
  count?: number;
  /** 헤더 우측 액션 슬롯 (e.g., IconButton 묶음). */
  actions?: React.ReactNode;
  items: SidebarListItem[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** 지정 시 그 개수까지만 노출하고 초과분은 'more' 토글로 펼친다. 미지정 시 전체 노출. */
  initialVisibleCount?: number;
  /** 'more' 토글 라벨. 기본 "more". */
  moreLabel?: string;
  /**
   * 각 항목 우측에 들어갈 trailing 슬롯. 평소 숨김, hover/focus-within/selected/dropdown-open 시 노출.
   * 클릭/키 이벤트는 내부에서 stopPropagation 되어 item 선택을 트리거하지 않는다.
   * (e.g., `<DropdownMenu>` + `<IconButton>` 메뉴 트리거)
   */
  renderItemTrailing?: (item: SidebarListItem) => React.ReactNode;
  /**
   * 헤더를 스크롤 컨테이너 상단에 sticky 로 고정. 기본 false.
   * 부모가 스크롤 가능해야(`overflow-y-auto`) 의미가 있다.
   */
  stickyHeader?: boolean;
};

const SidebarList = React.forwardRef<HTMLElement, SidebarListProps>(function SidebarList(
  {
    title,
    count,
    actions,
    items,
    selectedId = null,
    onSelect,
    initialVisibleCount,
    moreLabel = "more",
    renderItemTrailing,
    stickyHeader = false,
    className,
    ...props
  },
  ref,
) {
  const styles = sidebarList();
  const [expanded, setExpanded] = React.useState(false);
  const truncating =
    typeof initialVisibleCount === "number" &&
    initialVisibleCount >= 0 &&
    items.length > initialVisibleCount;
  const visibleItems = truncating && !expanded ? items.slice(0, initialVisibleCount) : items;
  const showMore = truncating && !expanded;

  return (
    <section ref={ref} data-slot="sidebar-list" className={cn(styles.root(), className)} {...props}>
      <header data-sticky={stickyHeader || undefined} className={styles.header()}>
        <div className={styles.headerLeading()}>
          <span className={styles.title()}>{title}</span>
          {typeof count === "number" ? <span className={styles.count()}>{count}</span> : null}
        </div>
        {actions ? <div className={styles.actions()}>{actions}</div> : null}
      </header>

      <div className={styles.body()}>
        {visibleItems.map((item) => {
          const selected = item.id === selectedId;
          const trailing = renderItemTrailing?.(item);
          return (
            // biome-ignore lint/a11y/useSemanticElements: row is a div+role to allow nested interactive controls (trailing slot) without nested-button violation
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              data-selected={selected}
              data-has-trailing={trailing ? true : undefined}
              aria-current={selected ? "true" : undefined}
              className={styles.item()}
              onClick={() => onSelect?.(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect?.(item.id);
                }
              }}
            >
              <span className={styles.itemLabel()}>{item.label}</span>
              {trailing ? (
                // biome-ignore lint/a11y/noStaticElementInteractions: trailing slot is a non-interactive wrapper; handlers exist solely to stop propagation to the row
                <div
                  className={styles.itemTrailing()}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {trailing}
                </div>
              ) : null}
            </div>
          );
        })}
        {showMore ? (
          <button type="button" className={styles.more()} onClick={() => setExpanded(true)}>
            <Icon icon={DotsThree} size="sm" />
            <span>{moreLabel}</span>
          </button>
        ) : null}
      </div>
    </section>
  );
});

export type { SidebarListItem, SidebarListProps };
export { SidebarList, sidebarList };
