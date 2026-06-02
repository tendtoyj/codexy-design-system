"use client";

import { Check, Gear, Lightning, MagnifyingGlass, Warning, X } from "@fluxloop-ai/pds-icons/icons";
import { Icon } from "@fluxloop-ai/pds-ui/components/icon";

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
const COLORS = [
  "label-normal",
  "label-alternative",
  "label-assistive",
  "primary",
  "positive",
  "cautionary",
  "negative",
] as const;

export function IconSizeDemo() {
  return (
    <div className="pds-icon-card">
      <div className="pds-icon-row">
        {SIZES.map((s) => (
          <div key={s} className="pds-icon-cell">
            <Icon icon={MagnifyingGlass} size={s} />
            <code>{s}</code>
          </div>
        ))}
      </div>
      <Styles />
    </div>
  );
}

export function IconColorDemo() {
  return (
    <div className="pds-icon-card">
      <div className="pds-icon-row">
        {COLORS.map((c) => (
          <div key={c} className="pds-icon-cell">
            <Icon icon={Lightning} size="lg" color={c} />
            <code>{c}</code>
          </div>
        ))}
      </div>
      <Styles />
    </div>
  );
}

export function IconGalleryDemo() {
  const items = [
    { icon: MagnifyingGlass, name: "MagnifyingGlass" },
    { icon: Check, name: "Check" },
    { icon: X, name: "X" },
    { icon: Warning, name: "Warning" },
    { icon: Gear, name: "Gear" },
    { icon: Lightning, name: "Lightning" },
  ];
  return (
    <div className="pds-icon-card">
      <div className="pds-icon-row">
        {items.map((it) => (
          <div key={it.name} className="pds-icon-cell">
            <Icon icon={it.icon} size="lg" color="label-normal" />
            <code>{it.name}</code>
          </div>
        ))}
      </div>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-icon-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-icon-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 20px;
      }
      .pds-icon-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .pds-icon-cell code {
        font-family: var(--pds-font-mono);
        font-size: var(--text-caption1);
        color: var(--pds-label-alternative);
      }
    `}</style>
  );
}
