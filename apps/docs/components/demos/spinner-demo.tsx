"use client";

import { Spinner } from "@tendtoyj/cds-ui/components/spinner";

export function SpinnerSizeDemo() {
  return (
    <div className="cds-demo-row" style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Spinner size={s} />
          <span style={{ fontSize: 12, color: "var(--cds-label-alternative)" }}>{s}</span>
        </div>
      ))}
      <Styles />
    </div>
  );
}

export function SpinnerOnBackgroundDemo() {
  return (
    <div
      className="cds-demo-row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cds-primary-normal)",
        color: "var(--cds-inverse-label)",
        minHeight: 64,
      }}
    >
      <Spinner size="md" label="요청 처리 중" />
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-demo-row {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
        color: var(--cds-label-normal);
      }
    `}</style>
  );
}
