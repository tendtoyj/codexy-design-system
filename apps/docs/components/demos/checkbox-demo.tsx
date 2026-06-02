"use client";

import { Checkbox } from "@fluxloop-ai/pds-ui/components/checkbox";
import * as React from "react";

function LabeledCheckbox({
  id,
  label,
  size = "md",
  ...props
}: { id: string; label: string } & React.ComponentProps<typeof Checkbox>) {
  const gap = size === "sm" ? 4 : 6;
  const fontSize = size === "sm" ? 12 : 13;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      <Checkbox id={id} size={size} {...props} />
      <label htmlFor={id} style={{ fontSize }}>
        {label}
      </label>
    </span>
  );
}

export function CheckboxSizeDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["sm", "md"] as const).map((s) => (
        <LabeledCheckbox key={s} id={`cb-size-${s}`} size={s} defaultChecked label={s} />
      ))}
      <Styles />
    </div>
  );
}

export function CheckboxStatesDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <LabeledCheckbox id="cb-unchecked" label="unchecked" />
      <LabeledCheckbox id="cb-checked" defaultChecked label="checked" />
      <LabeledCheckbox id="cb-indeterminate" indeterminate label="indeterminate" />
      <LabeledCheckbox id="cb-disabled" disabled label="disabled" />
      <LabeledCheckbox id="cb-disabled-checked" defaultChecked disabled label="disabled checked" />
      <LabeledCheckbox id="cb-invalid" invalid label="invalid" />
      <Styles />
    </div>
  );
}

export function CheckboxIndeterminateDemo() {
  const [ones, setOnes] = React.useState([false, true, false]);
  const allChecked = ones.every(Boolean);
  const noneChecked = ones.every((v) => !v);
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
        <Checkbox
          id="cb-all"
          checked={allChecked}
          indeterminate={!allChecked && !noneChecked}
          onCheckedChange={(c) => setOnes([Boolean(c), Boolean(c), Boolean(c)])}
        />
        <label htmlFor="cb-all">모두 선택</label>
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 20 }}>
        {ones.map((v, i) => {
          const id = `cb-opt-${i}`;
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: demo only
              key={i}
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Checkbox
                id={id}
                checked={v}
                onCheckedChange={(c) =>
                  setOnes((arr) => arr.map((x, idx) => (idx === i ? Boolean(c) : x)))
                }
              />
              <label htmlFor={id}>{`option ${i + 1}`}</label>
            </span>
          );
        })}
      </div>
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
