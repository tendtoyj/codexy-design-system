"use client";

import { RadioGroup, RadioGroupItem } from "@fluxloop-ai/pds-ui/components/radio-group";
import * as React from "react";

const OPTIONS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
];

export function RadioGroupBasicDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
      {(["sm", "md"] as const).map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, color: "var(--pds-label-alternative)" }}>{s}</span>
          <RadioGroup
            defaultValue="b"
            size={s}
            style={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
            {["a", "b", "c"].map((v) => {
              const id = `basic-${s}-${v}`;
              return (
                <label
                  key={v}
                  htmlFor={id}
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <RadioGroupItem id={id} value={v} />
                  <span>option {v}</span>
                </label>
              );
            })}
          </RadioGroup>
        </div>
      ))}
      <Styles />
    </div>
  );
}

export function RadioGroupVerticalDemo() {
  const [value, setValue] = React.useState("pro");
  return (
    <div className="pds-demo-row">
      <RadioGroup
        value={value}
        onValueChange={setValue}
        style={{ display: "flex", flexDirection: "column", gap: 6 }}
      >
        {OPTIONS.map((o) => {
          const id = `plan-${o.value}`;
          return (
            <label
              key={o.value}
              htmlFor={id}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <RadioGroupItem id={id} value={o.value} />
              <span>{o.label}</span>
            </label>
          );
        })}
      </RadioGroup>
      <Styles />
    </div>
  );
}

export function RadioGroupHorizontalDemo() {
  return (
    <div className="pds-demo-row">
      <RadioGroup
        defaultValue="sm"
        orientation="horizontal"
        size="sm"
        style={{ display: "flex", flexDirection: "row", gap: 12 }}
      >
        {["sm", "md", "lg"].map((v) => {
          const id = `size-${v}`;
          return (
            <label key={v} htmlFor={id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <RadioGroupItem id={id} value={v} />
              <span>{v}</span>
            </label>
          );
        })}
      </RadioGroup>
      <Styles />
    </div>
  );
}

export function RadioGroupDisabledDemo() {
  return (
    <div className="pds-demo-row">
      <style>{`
        .pds-radio-row { display: flex; align-items: center; gap: 4px; }
        .pds-radio-row:has(:disabled) > span { color: var(--pds-label-disable); }
      `}</style>
      <RadioGroup defaultValue="a" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="opt-a" className="pds-radio-row">
          <RadioGroupItem id="opt-a" value="a" />
          <span>enabled</span>
        </label>
        <label htmlFor="opt-b" className="pds-radio-row">
          <RadioGroupItem id="opt-b" value="b" disabled />
          <span>disabled</span>
        </label>
      </RadioGroup>
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
