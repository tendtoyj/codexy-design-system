"use client";

import { Switch } from "@fluxloop-ai/pds-ui/components/switch";
import * as React from "react";

function LabeledSwitch({
  id,
  label,
  ...props
}: { id: string; label: string } & React.ComponentProps<typeof Switch>) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <Switch id={id} {...props} />
      <label htmlFor={id} style={{ fontSize: 13 }}>
        {label}
      </label>
    </span>
  );
}

export function SwitchSizeDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <LabeledSwitch key={s} id={`sw-size-${s}`} size={s} defaultChecked label={s} />
      ))}
      <Styles />
    </div>
  );
}

export function SwitchStatesDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <LabeledSwitch id="sw-ctrl" checked={on} onCheckedChange={setOn} label={on ? "ON" : "OFF"} />
      <LabeledSwitch id="sw-disabled" disabled label="disabled" />
      <LabeledSwitch id="sw-disabled-on" defaultChecked disabled label="disabled on" />
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
