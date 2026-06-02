"use client";

import { ChatCircle, SidebarSimple } from "@fluxloop-ai/pds-icons/icons";
import {
  AppShell,
  AppShellLeadingControls,
  AppShellMain,
  AppShellMainBody,
  AppShellMainHeader,
  AppShellSidebar,
  AppShellSidebarBody,
  AppShellSidebarHeader,
  AppShellSidePanel,
  AppShellSidePanelBody,
  AppShellSidePanelHeader,
  AppShellSplitter,
  AppShellTrailingControls,
} from "@fluxloop-ai/pds-ui";
import { IconButton } from "@fluxloop-ai/pds-ui/components/icon-button";
import { useState } from "react";

/**
 * AppShell preview — viewport 전체에 띄우는 full-screen 레이아웃 데모.
 * 컨텐츠는 의도적으로 비워두고 *레이아웃 구조*만 확인할 수 있게 한다.
 */
export default function AppShellPreviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

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
              <PlaceholderLabel label="Sidebar" tone="back" />
            </AppShellSidebarBody>
          </AppShellSidebar>

          <AppShellSplitter target="sidebar" doubleClickResetWidth={220} />

          <AppShellMain>
            <AppShellMainHeader />
            <AppShellMainBody>
              <PlaceholderLabel label="Main" tone="front" />
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
            ? "text-[color:var(--pds-label-assistive)]"
            : "text-[color:var(--pds-label-alternative)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
