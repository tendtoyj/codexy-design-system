"use client";

import { Books, Flask, Ghost } from "@fluxloop-ai/pds-icons/icons";
import { SidebarMenu } from "@fluxloop-ai/pds-ui/components/sidebar-menu";
import * as React from "react";

const ITEMS = [
  { id: "playground", icon: Flask, label: "Playground" },
  { id: "spirit", icon: Ghost, label: "Spirit" },
  { id: "inventory", icon: Books, label: "Inventory" },
];

export function SidebarMenuBasicDemo() {
  const [selected, setSelected] = React.useState<string | null>("playground");
  return (
    <SidebarFrame>
      <SidebarMenu
        aria-label="기본 메뉴"
        items={ITEMS}
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
