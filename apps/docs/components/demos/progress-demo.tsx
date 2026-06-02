"use client";

import { Progress } from "@fluxloop-ai/pds-ui/components/progress";
import * as React from "react";

export function ProgressStaticDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 40,
              fontSize: 12,
              color: "var(--pds-label-alternative)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {v}%
          </span>
          <Progress value={v} />
        </div>
      ))}
      <Styles />
    </div>
  );
}

export function ProgressSizeDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Styles />
    </div>
  );
}

export function ProgressIndeterminateDemo() {
  const [running, setRunning] = React.useState(true);
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Progress value={running ? null : 100} />
      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        style={{
          alignSelf: "flex-start",
          padding: "6px 12px",
          borderRadius: 8,
          background: "var(--pds-fill-normal)",
          color: "var(--pds-label-normal)",
          border: 0,
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        {running ? "완료로 표시" : "다시 로딩"}
      </button>
      <Styles />
    </div>
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
