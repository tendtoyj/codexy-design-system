"use client";

import {
  Books,
  Copy,
  DotsThree,
  Flask,
  Funnel,
  Gear,
  Ghost,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  SidebarSimple,
  Trash,
} from "@fluxloop-ai/pds-icons/icons";
import {
  AppShell,
  AppShellLeadingControls,
  AppShellMain,
  AppShellMainBody,
  AppShellMainHeader,
  AppShellSidebar,
  AppShellSidebarBody,
  AppShellSidebarFooter,
  AppShellSidebarHeader,
  AppShellSplitter,
  useScrollFade,
} from "@fluxloop-ai/pds-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@fluxloop-ai/pds-ui/components/dropdown-menu";
import { IconButton } from "@fluxloop-ai/pds-ui/components/icon-button";
import { SidebarList } from "@fluxloop-ai/pds-ui/components/sidebar-list";
import { SidebarMenu } from "@fluxloop-ai/pds-ui/components/sidebar-menu";
import { useState } from "react";

const PRIMARY_NAV = [
  { id: "playground", icon: Flask, label: "Playground" },
  { id: "spirit", icon: Ghost, label: "Spirit" },
  { id: "inventory", icon: Books, label: "Inventory" },
];

const LIBRARY_NAMED = [
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
];

const LIBRARY = [
  ...LIBRARY_NAMED,
  ...Array.from(
    { length: 58 - LIBRARY_NAMED.length },
    (_, i) => `skill-${String(LIBRARY_NAMED.length + i + 1).padStart(2, "0")}`,
  ),
].map((name) => ({ id: name, label: name }));

const FOOTER_NAV = [{ id: "settings", icon: Gear, label: "Settings" }];

export default function SidebarPatternPreviewPage() {
  const [primary, setPrimary] = useState<string | null>("playground");
  const [skill, setSkill] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarScroll = useScrollFade<HTMLDivElement>({
    size: 24,
    edges: { top: false }, // sticky Library 헤더가 상단을 덮으므로 상단 페이드 비활성
  });

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2a2d35] via-[#1f2127] to-[#14151a] p-[32px]">
      <div
        className="relative h-full max-h-[840px] w-full max-w-[1280px] overflow-hidden rounded-[12px]"
        style={{
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* mock traffic lights — 실제 Tauri 앱이면 macOS 가 그림 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[16px] left-[16px] z-50 flex gap-[8px]"
        >
          <span className="h-[12px] w-[12px] rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="h-[12px] w-[12px] rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="h-[12px] w-[12px] rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
        </div>

        <AppShell leftInset={72} className="h-full">
          <AppShellLeadingControls>
            <IconButton
              size="sm"
              variant="normal"
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <SidebarSimple />
            </IconButton>
          </AppShellLeadingControls>

          <AppShellSidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            defaultWidth={240}
            minWidth={220}
            maxWidth={320}
          >
            <AppShellSidebarHeader />
            <AppShellSidebarBody
              ref={sidebarScroll.ref}
              onScroll={sidebarScroll.onScroll}
              style={{
                maskImage: sidebarScroll.maskImage,
                WebkitMaskImage: sidebarScroll.maskImage,
              }}
            >
              <div className="flex flex-col gap-[20px] px-[12px] pt-[4px] pb-[16px]">
                <SidebarMenu
                  aria-label="Primary"
                  items={PRIMARY_NAV}
                  selectedId={primary}
                  onSelect={setPrimary}
                />
                <SidebarList
                  title="Library"
                  count={LIBRARY.length}
                  actions={
                    <>
                      <IconButton size="xs" variant="subtle" aria-label="신규 스킬">
                        <Plus />
                      </IconButton>
                      <IconButton size="xs" variant="subtle" aria-label="검색">
                        <MagnifyingGlass />
                      </IconButton>
                      <IconButton size="xs" variant="subtle" aria-label="필터">
                        <Funnel />
                      </IconButton>
                    </>
                  }
                  items={LIBRARY}
                  selectedId={skill}
                  onSelect={setSkill}
                  initialVisibleCount={10}
                  stickyHeader
                  renderItemTrailing={(item) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <IconButton
                          size="sm"
                          variant="subtle"
                          aria-label={`${item.label} 메뉴 열기`}
                        >
                          <DotsThree />
                        </IconButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent size="sm" align="end" sideOffset={4}>
                        <DropdownMenuItem onSelect={() => console.log("rename", item.id)}>
                          <PencilSimple />
                          <span>이름 변경</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => console.log("duplicate", item.id)}>
                          <Copy />
                          <span>복제</span>
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
              </div>
            </AppShellSidebarBody>
            <AppShellSidebarFooter>
              <div className="px-[12px] pt-[8px] pb-[12px]">
                <SidebarMenu aria-label="Footer" items={FOOTER_NAV} />
              </div>
            </AppShellSidebarFooter>
          </AppShellSidebar>

          <AppShellSplitter target="sidebar" doubleClickResetWidth={240} />

          <AppShellMain>
            <AppShellMainHeader />
            <AppShellMainBody>
              <div className="flex h-full items-center justify-center">
                <span className="font-mono text-[11px] text-[color:var(--pds-label-alternative)] uppercase tracking-[0.16em]">
                  Main
                </span>
              </div>
            </AppShellMainBody>
          </AppShellMain>
        </AppShell>
      </div>
    </div>
  );
}
