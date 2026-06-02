"use client";

import { Hash, X } from "@tendtoyj/cds-icons/icons";
import { Chip } from "@tendtoyj/cds-ui/components/chip";
import * as React from "react";

export function ChipSizeDemo() {
  return (
    <div className="cds-demo-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {(["xsmall", "small", "medium", "large"] as const).map((s) => (
        <Chip key={s} size={s}>
          size {s}
        </Chip>
      ))}
      <Styles />
    </div>
  );
}

export function ChipVariantDemo() {
  return (
    <div className="cds-demo-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Chip variant="solid">solid</Chip>
      <Chip variant="solid" active>
        solid · active
      </Chip>
      <Chip variant="outlined">outlined</Chip>
      <Chip variant="outlined" active>
        outlined · active
      </Chip>
      <Chip variant="solid" disabled>
        disabled
      </Chip>
      <Styles />
    </div>
  );
}

export function ChipToggleDemo() {
  const [active, setActive] = React.useState<string[]>(["design"]);
  const options = ["design", "code", "docs", "ops"];
  const toggle = (key: string) =>
    setActive((a) => (a.includes(key) ? a.filter((x) => x !== key) : [...a, key]));
  return (
    <div className="cds-demo-row" style={{ display: "flex", gap: 6 }}>
      {options.map((opt) => (
        <Chip
          key={opt}
          size="small"
          interactive
          active={active.includes(opt)}
          onClick={() => toggle(opt)}
          leadingContent={<Hash />}
        >
          {opt}
        </Chip>
      ))}
      <Styles />
    </div>
  );
}

function RemoveButton({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      aria-label={`${label} 제거`}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="cds-chip-remove"
    >
      <X />
    </button>
  );
}

export function ChipRemovableDemo() {
  const [outlined, setOutlined] = React.useState(["React", "Tailwind", "Radix"]);
  const [solid, setSolid] = React.useState(["React", "Tailwind", "Radix"]);
  return (
    <div className="cds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ width: 64, fontSize: 12, color: "var(--cds-label-assistive)" }}>
          outlined
        </span>
        {outlined.map((t) => (
          <Chip
            key={t}
            size="small"
            variant="outlined"
            trailingContent={
              <RemoveButton
                label={t}
                onRemove={() => setOutlined((xs) => xs.filter((x) => x !== t))}
              />
            }
          >
            {t}
          </Chip>
        ))}
        {outlined.length === 0 ? (
          <span style={{ fontSize: 12, color: "var(--cds-label-assistive)" }}>(모두 제거됨)</span>
        ) : null}
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ width: 64, fontSize: 12, color: "var(--cds-label-assistive)" }}>solid</span>
        {solid.map((t) => (
          <Chip
            key={t}
            size="small"
            variant="solid"
            trailingContent={
              <RemoveButton
                label={t}
                onRemove={() => setSolid((xs) => xs.filter((x) => x !== t))}
              />
            }
          >
            {t}
          </Chip>
        ))}
        {solid.length === 0 ? (
          <span style={{ fontSize: 12, color: "var(--cds-label-assistive)" }}>(모두 제거됨)</span>
        ) : null}
      </div>
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
      }
      .cds-chip-remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 0;
        padding: 0;
        margin-left: 1px;
        cursor: pointer;
        color: currentColor;
        opacity: 0.6;
        transition: opacity 0.15s ease;
      }
      .cds-chip-remove:hover { opacity: 1; }
      button.cds-chip-remove svg { width: 10px !important; height: 10px !important; }
    `}</style>
  );
}
