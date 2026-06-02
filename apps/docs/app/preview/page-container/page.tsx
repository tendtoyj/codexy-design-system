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
import { PageContainer } from "@fluxloop-ai/pds-ui/components/page-container";
import { useState } from "react";

/**
 * PageContainer preview — AppShell 안에서 PageContainer 3개 variant 의 실제 폭을 비교.
 * AppShell preview 와 동일한 mock window chrome 을 두고, Main 영역에서 sidebar/sidepanel
 * 폭에 따라 max-width 가 어떻게 적용되는지(또는 capped 되는지) 직접 보여준다.
 */

const VARIANTS = [
  { variant: "narrow" as const, label: "narrow", spec: "480px", note: "단일 컬럼 텍스트·폼·문서" },
  { variant: "default" as const, label: "default", spec: "800px", note: "일반 페이지 (기본)" },
  {
    variant: "full" as const,
    label: "full",
    spec: "max-width 없음",
    note: "테이블·리스트 등 full-bleed (gutter 32 유지)",
  },
];

export default function PageContainerPreviewPage() {
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
              <SidePlaceholder label="Sidebar" />
            </AppShellSidebarBody>
          </AppShellSidebar>

          <AppShellSplitter target="sidebar" doubleClickResetWidth={220} />

          <AppShellMain>
            <AppShellMainHeader />
            <AppShellMainBody>
              {VARIANTS.map(({ variant, label, spec, note }) => (
                <PageContainer key={variant} variant={variant}>
                  <VariantBlock label={label} spec={spec} note={note} />
                </PageContainer>
              ))}
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
              <SidePlaceholder label="SidePanel" />
            </AppShellSidePanelBody>
          </AppShellSidePanel>
        </AppShell>
      </div>
    </div>
  );
}

function VariantBlock({ label, spec, note }: { label: string; spec: string; note: string }) {
  return (
    <div
      className="flex flex-col gap-[6px] rounded-[var(--pds-radius-12)] border border-dashed px-[24px] py-[20px]"
      style={{
        borderColor: "var(--pds-line-solid-normal)",
        background: "var(--pds-background-normal-alternative)",
      }}
    >
      <div className="flex items-baseline gap-[8px]">
        <span style={{ font: "var(--pds-font-title3-bold)", color: "var(--pds-label-strong)" }}>
          {label}
        </span>
        <span
          className="font-mono"
          style={{ font: "var(--pds-font-label2-regular)", color: "var(--pds-label-neutral)" }}
        >
          {spec}
        </span>
      </div>
      <span
        style={{ font: "var(--pds-font-label1-regular)", color: "var(--pds-label-alternative)" }}
      >
        {note}
      </span>
    </div>
  );
}

function SidePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--pds-label-assistive)]">
        {label}
      </span>
    </div>
  );
}
