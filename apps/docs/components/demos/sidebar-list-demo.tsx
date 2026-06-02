"use client";

import {
  DotsThree,
  Funnel,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
} from "@fluxloop-ai/pds-icons/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@fluxloop-ai/pds-ui/components/dropdown-menu";
import { IconButton } from "@fluxloop-ai/pds-ui/components/icon-button";
import { SidebarList } from "@fluxloop-ai/pds-ui/components/sidebar-list";
import * as React from "react";

const SKILLS = [
  "audience-profiler",
  "brainstorming-guide",
  "brand-voice",
  "campaign-planning",
  "card-news-contents-maker",
  "card-news-copy-evaluator",
  "card-news-copy-writer",
  "card-news-image-generator",
  "card-news-maker",
  "card-news-orchestrator",
  "competitor-analysis",
  "content-calendar",
  "creative-director",
  "data-summary",
  "demo-script-writer",
].map((name) => ({ id: name, label: name }));

export function SidebarListBasicDemo() {
  const [selected, setSelected] = React.useState<string | null>(SKILLS[0]?.id ?? null);
  return (
    <SidebarFrame>
      <SidebarList
        title="Library"
        count={SKILLS.length}
        actions={
          <>
            <IconButton size="xs" variant="subtle" aria-label="신규 스킬">
              <Plus />
            </IconButton>
            <IconButton size="xs" variant="subtle" aria-label="검색">
              <MagnifyingGlass />
            </IconButton>
            <IconButton size="xs" variant="subtle" aria-label="정렬">
              <Funnel />
            </IconButton>
          </>
        }
        items={SKILLS}
        selectedId={selected}
        onSelect={setSelected}
        initialVisibleCount={10}
      />
    </SidebarFrame>
  );
}

export function SidebarListItemActionsDemo() {
  const items = SKILLS.slice(0, 6);
  const [selected, setSelected] = React.useState<string | null>(items[0]?.id ?? null);
  return (
    <SidebarFrame>
      <SidebarList
        title="Library"
        count={items.length}
        items={items}
        selectedId={selected}
        onSelect={setSelected}
        renderItemTrailing={(item) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton size="sm" variant="subtle" aria-label={`${item.label} 메뉴 열기`}>
                <DotsThree />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent size="sm" align="end" sideOffset={4}>
              <DropdownMenuItem onSelect={() => console.log("rename", item.id)}>
                <PencilSimple />
                <span>이름 변경</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => console.log("delete", item.id)}>
                <Trash />
                <span>삭제</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </SidebarFrame>
  );
}

export function SidebarListWithoutMoreDemo() {
  const items = SKILLS.slice(0, 4);
  const [selected, setSelected] = React.useState<string | null>(items[0]?.id ?? null);
  return (
    <SidebarFrame>
      <SidebarList
        title="Pinned"
        count={items.length}
        items={items}
        selectedId={selected}
        onSelect={setSelected}
      />
    </SidebarFrame>
  );
}

function SidebarFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        style={{
          width: 220,
          padding: "8px 12px",
          background: "var(--pds-fill-alternative)",
          borderRadius: "var(--pds-radius-lg)",
          border: "1px solid var(--pds-line-solid-normal)",
        }}
      >
        {children}
      </div>
      <Styles />
    </>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-demo-row {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
