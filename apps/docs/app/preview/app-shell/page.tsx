"use client";

import { ChatCircle, MagnifyingGlass, Plus, SidebarSimple } from "@tendtoyj/cds-icons/icons";
import {
  AppShell,
  AppShellLeadingControls,
  AppShellMain,
  AppShellMainBody,
  AppShellMainHeader,
  AppShellPageHeader,
  AppShellSidebar,
  AppShellSidebarBody,
  AppShellSidebarHeader,
  AppShellSidePanel,
  AppShellSidePanelBody,
  AppShellSidePanelHeader,
  AppShellSplitter,
  AppShellTrailingControls,
} from "@tendtoyj/cds-ui";
import { Button } from "@tendtoyj/cds-ui/components/button";
import { IconButton } from "@tendtoyj/cds-ui/components/icon-button";
import { PageContainer } from "@tendtoyj/cds-ui/components/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@tendtoyj/cds-ui/components/tabs";
import { type ReactNode, useState } from "react";

type PreviewPage = "inventory" | "activity" | "empty";

/** Full-screen AppShell preview for page-header lifecycle and layout checks. */
export default function AppShellPreviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [page, setPage] = useState<PreviewPage>("inventory");
  const [inventoryTab, setInventoryTab] = useState("skills");
  const [actionCount, setActionCount] = useState(0);

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2a2d35] via-[#1f2127] to-[#14151a] p-[8px] sm:p-[20px] lg:p-[32px]">
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
          {/* 사이드바 토글 — 사이드바 열림/닫힘 무관하게 같은 자리 */}
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

          {/* 챗 토글 — 닫혔을 때만 보임. 우상단 고정 */}
          {!sidePanelOpen && (
            <AppShellTrailingControls>
              <IconButton
                size="sm"
                variant="normal"
                aria-label="Open side panel"
                onClick={() => setSidePanelOpen(true)}
              >
                <ChatCircle />
              </IconButton>
            </AppShellTrailingControls>
          )}

          <AppShellSidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            defaultWidth={220}
            minWidth={200}
            maxWidth={320}
          >
            <AppShellSidebarHeader />
            <AppShellSidebarBody>
              <nav
                aria-label="Preview pages"
                className="flex flex-col gap-[8px] px-[12px] pt-[8px]"
              >
                <span className="px-[8px] font-medium text-[11px] text-[color:var(--cds-label-assistive)] uppercase tracking-[0.08em]">
                  Page header states
                </span>
                <PageButton active={page === "inventory"} onClick={() => setPage("inventory")}>
                  Inventory
                </PageButton>
                <PageButton active={page === "activity"} onClick={() => setPage("activity")}>
                  Activity
                </PageButton>
                <PageButton active={page === "empty"} onClick={() => setPage("empty")}>
                  No page header
                </PageButton>
              </nav>
            </AppShellSidebarBody>
          </AppShellSidebar>

          <AppShellSplitter target="sidebar" doubleClickResetWidth={220} />

          <AppShellMain>
            <AppShellMainHeader />
            <AppShellMainBody>
              {page === "inventory" ? (
                <Tabs value={inventoryTab} onValueChange={setInventoryTab} variant="label">
                  <AppShellPageHeader>
                    <div className="flex w-full min-w-0 items-center justify-between gap-[12px]">
                      <TabsList>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="plugins">Plugins</TabsTrigger>
                      </TabsList>
                      <div className="flex shrink-0 items-center gap-[4px]">
                        <IconButton size="sm" variant="normal" aria-label="Search inventory">
                          <MagnifyingGlass />
                        </IconButton>
                        <IconButton
                          size="sm"
                          variant="normal"
                          aria-label="Add inventory item"
                          onClick={() => setActionCount((count) => count + 1)}
                        >
                          <Plus />
                        </IconButton>
                      </div>
                    </div>
                  </AppShellPageHeader>
                  <PageContainer>
                    <PreviewHeading
                      title="Inventory"
                      description="페이지 본문 가까이 선언한 tabs와 actions가 main header로 이동합니다."
                      actionCount={actionCount}
                    />
                    <TabsContent value="skills">Skill inventory content</TabsContent>
                    <TabsContent value="plugins">Plugin inventory content</TabsContent>
                  </PageContainer>
                </Tabs>
              ) : page === "activity" ? (
                <>
                  <AppShellPageHeader>
                    <div className="flex w-full min-w-0 items-center justify-between gap-[12px]">
                      <span className="truncate font-medium text-[13px] text-[color:var(--cds-label-normal)]">
                        Recent activity
                      </span>
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() => setActionCount((count) => count + 1)}
                      >
                        Mark all read
                      </Button>
                    </div>
                  </AppShellPageHeader>
                  <PageContainer>
                    <PreviewHeading
                      title="Activity"
                      description="페이지가 바뀌면 이전 header content는 제거되고 새 content만 남습니다."
                      actionCount={actionCount}
                    />
                  </PageContainer>
                </>
              ) : (
                <PageContainer>
                  <PreviewHeading
                    title="No page header"
                    description="활성 AppShellPageHeader가 없으면 main header에 빈 slot도 생성되지 않습니다."
                    actionCount={actionCount}
                  />
                </PageContainer>
              )}
            </AppShellMainBody>
          </AppShellMain>

          <AppShellSplitter target="sidePanel" doubleClickResetWidth={360} />

          <AppShellSidePanel
            open={sidePanelOpen}
            onOpenChange={setSidePanelOpen}
            defaultWidth={360}
            minWidth={280}
            maxWidth={560}
          >
            <AppShellSidePanelHeader>
              <div className="flex w-full items-center justify-end px-[12px]">
                <IconButton
                  size="sm"
                  variant="normal"
                  aria-label="Close side panel"
                  onClick={() => setSidePanelOpen(false)}
                >
                  <ChatCircle />
                </IconButton>
              </div>
            </AppShellSidePanelHeader>
            <AppShellSidePanelBody>
              <PlaceholderLabel label="SidePanel" tone="front" />
            </AppShellSidePanelBody>
          </AppShellSidePanel>
        </AppShell>
      </div>
    </div>
  );
}

function PlaceholderLabel({ label, tone }: { label: string; tone: "back" | "front" }) {
  return (
    <div className="flex h-full items-center justify-center">
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
          tone === "back"
            ? "text-[color:var(--cds-label-assistive)]"
            : "text-[color:var(--cds-label-alternative)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function PageButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button size="sm" variant={active ? "frosted" : "outlined"} onClick={onClick}>
      {children}
    </Button>
  );
}

function PreviewHeading({
  actionCount,
  description,
  title,
}: {
  actionCount: number;
  description: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div>
        <h1 className="font-semibold text-[20px] text-[color:var(--cds-label-normal)]">{title}</h1>
        <p className="mt-[4px] max-w-[36rem] text-[13px] text-[color:var(--cds-label-alternative)]">
          {description}
        </p>
      </div>
      <span className="w-fit rounded-[var(--cds-radius-8)] bg-[var(--cds-fill-normal)] px-[8px] py-[4px] text-[12px] text-[color:var(--cds-label-alternative)]">
        Header actions clicked: {actionCount}
      </span>
    </div>
  );
}
