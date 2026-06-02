"use client";

import { Spinner } from "@fluxloop-ai/pds-ui/components/spinner";

export function SpinnerSizeDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Spinner size={s} />
          <span style={{ fontSize: 12, color: "var(--pds-label-alternative)" }}>{s}</span>
        </div>
      ))}
      <Styles />
    </div>
  );
}

export function SpinnerOnBackgroundDemo() {
  return (
    <div
      className="pds-demo-row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--pds-primary-normal)",
        color: "var(--pds-inverse-label)",
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
      .pds-demo-row {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
        color: var(--pds-label-normal);
      }
    `}</style>
  );
}
