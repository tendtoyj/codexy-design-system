"use client";

import { Check, Gear, Lightning, MagnifyingGlass, Warning, X } from "@tendtoyj/cds-icons/icons";
import { Icon } from "@tendtoyj/cds-ui/components/icon";

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
    <div className="cds-icon-card">
      <div className="cds-icon-row">
        {SIZES.map((s) => (
          <div key={s} className="cds-icon-cell">
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
    <div className="cds-icon-card">
      <div className="cds-icon-row">
        {COLORS.map((c) => (
          <div key={c} className="cds-icon-cell">
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
    <div className="cds-icon-card">
      <div className="cds-icon-row">
        {items.map((it) => (
          <div key={it.name} className="cds-icon-cell">
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
      .cds-icon-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
      .cds-icon-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 20px;
      }
      .cds-icon-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .cds-icon-cell code {
        font-family: var(--cds-font-mono);
        font-size: var(--text-caption1);
        color: var(--cds-label-alternative);
      }
    `}</style>
  );
}
