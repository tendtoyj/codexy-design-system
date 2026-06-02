"use client";

import {
  type RemovableTab,
  RemovableTabBar,
} from "@fluxloop-ai/pds-ui/components/removable-tab-bar";
import { useState } from "react";

const INITIAL: RemovableTab[] = [
  { id: "t1", title: "새 탭" },
  { id: "t2", title: "PDS 토큰 질문" },
  { id: "t3", title: "Bug triage" },
  { id: "t4", title: "Refactor notes" },
];

const TRUNCATED: RemovableTab[] = [
  { id: "tr1", title: "RemovableTabBar — width truncation behavior preview" },
  { id: "tr2", title: "Token system migration retrospective document" },
  { id: "tr3", title: "Q3 디자인 토큰 일괄 마이그레이션 회의록 정리본" },
];

function TabBarPreview({ size, initial }: { size: "sm" | "md"; initial: RemovableTab[] }) {
  const [tabs, setTabs] = useState<RemovableTab[]>(initial);
  const [activeId, setActiveId] = useState<string | null>(initial[1]?.id ?? null);

  return (
    <RemovableTabBar
      size={size}
      tabs={tabs}
      activeId={activeId}
      onSwitch={setActiveId}
      onClose={(id) => {
        setTabs((prev) => prev.filter((t) => t.id !== id));
        setActiveId((prev) => {
          if (prev !== id) return prev;
          const remaining = tabs.filter((t) => t.id !== id);
          return remaining[0]?.id ?? null;
        });
      }}
    />
  );
}

export function RemovableTabBarDemo() {
  return (
    <div className="pds-removable-tab-demo-card">
      <div className="pds-removable-tab-demo-row">
        <span className="pds-removable-tab-demo-label">sm</span>
        <TabBarPreview size="sm" initial={INITIAL} />
      </div>
      <div className="pds-removable-tab-demo-row">
        <span className="pds-removable-tab-demo-label">md</span>
        <TabBarPreview size="md" initial={INITIAL} />
      </div>
      <div className="pds-removable-tab-demo-row">
        <span className="pds-removable-tab-demo-label">sm — truncate</span>
        <TabBarPreview size="sm" initial={TRUNCATED} />
      </div>
      <div className="pds-removable-tab-demo-row">
        <span className="pds-removable-tab-demo-label">md — truncate</span>
        <TabBarPreview size="md" initial={TRUNCATED} />
      </div>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-removable-tab-demo-card {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 12px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-removable-tab-demo-row {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }
      .pds-removable-tab-demo-label {
        font-size: 11px;
        font-weight: 500;
        color: var(--pds-label-assistive);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
    `}</style>
  );
}
