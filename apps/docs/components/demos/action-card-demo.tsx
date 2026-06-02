"use client";

import { ChartBar, Check, Compass, Stethoscope, Wrench } from "@fluxloop-ai/pds-icons/icons";
import {
  ActionCard,
  ActionCardDescription,
  ActionCardLeading,
  ActionCardTitle,
  ActionCardTrailing,
} from "@fluxloop-ai/pds-ui/components/action-card";
import { Badge } from "@fluxloop-ai/pds-ui/components/badge";
import { Icon } from "@fluxloop-ai/pds-ui/components/icon";
import * as React from "react";

export function ActionCardSuggestionsDemo() {
  const items = [
    {
      icon: Compass,
      title: "Where should I start?",
      desc: "Pick the first thing to look at in this skill, together",
    },
    {
      icon: Stethoscope,
      title: "Diagnose this skill",
      desc: "Surface improvements from usage logs",
    },
    {
      icon: ChartBar,
      title: "Review recent runs",
      desc: "Walk through recent runs and flag what felt off",
    },
    {
      icon: Wrench,
      title: "Auto-improve skill",
      desc: "Let AI patch the skill based on diagnosis results",
    },
  ];
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((it) => (
        <ActionCard key={it.title} onClick={() => {}}>
          <ActionCardTitle icon={it.icon}>{it.title}</ActionCardTitle>
          <ActionCardDescription>{it.desc}</ActionCardDescription>
        </ActionCard>
      ))}
      <Styles />
    </div>
  );
}

export function ActionCardWithLeadingTrailingDemo() {
  const items = [
    {
      id: "cc",
      title: "Claude Code 대화 히스토리 접근 허용",
      desc: "~/.claude에서 과거 대화내역을 바탕으로 분석합니다",
      label: "CC",
    },
    {
      id: "cx",
      title: "Codex 대화 히스토리 접근 허용",
      desc: "~/.codex에서 과거 대화내역을 바탕으로 분석합니다",
      label: "CX",
    },
  ];
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>({
    cc: true,
    cx: false,
  });
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((it) => {
        const on = !!enabled[it.id];
        return (
          <ActionCard key={it.id} onClick={() => setEnabled((s) => ({ ...s, [it.id]: !s[it.id] }))}>
            <ActionCardLeading>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "var(--pds-fill-normal)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--pds-label-alternative)",
                }}
                aria-hidden
              >
                {it.label}
              </div>
            </ActionCardLeading>
            <ActionCardTitle>{it.title}</ActionCardTitle>
            <ActionCardDescription>{it.desc}</ActionCardDescription>
            <ActionCardTrailing>
              <Icon icon={Check} size="md" color={on ? "label-strong" : "label-assistive"} />
            </ActionCardTrailing>
          </ActionCard>
        );
      })}
      <Styles />
    </div>
  );
}

export function ActionCardTrailingBadgeDemo() {
  const items = [
    {
      icon: ChartBar,
      title: "Review recent runs",
      desc: "Walk through recent runs and flag what felt off",
      badge: (
        <Badge size="xs" color="accent" accentColor="red">
          3
        </Badge>
      ),
    },
    {
      icon: Wrench,
      title: "Auto-improve skill",
      desc: "Let AI patch the skill based on diagnosis results",
      badge: (
        <Badge size="xs" color="accent" accentColor="violet">
          NEW
        </Badge>
      ),
    },
    {
      icon: Stethoscope,
      title: "Diagnose this skill",
      desc: "Surface improvements from usage logs",
      badge: (
        <Badge size="xs" color="neutral" neutralColor="alternative">
          BETA
        </Badge>
      ),
    },
  ];
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((it) => (
        <ActionCard key={it.title} onClick={() => {}}>
          <ActionCardTitle icon={it.icon}>{it.title}</ActionCardTitle>
          <ActionCardDescription>{it.desc}</ActionCardDescription>
          <ActionCardTrailing>{it.badge}</ActionCardTrailing>
        </ActionCard>
      ))}
      <Styles />
    </div>
  );
}

export function ActionCardTitleOnlyDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <ActionCard onClick={() => {}}>
        <ActionCardTitle>Just a title — no description, no slots</ActionCardTitle>
      </ActionCard>
      <ActionCard onClick={() => {}}>
        <ActionCardTitle icon={Compass}>Title with inline icon only</ActionCardTitle>
      </ActionCard>
      <Styles />
    </div>
  );
}

export function ActionCardImageIconDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <ActionCard onClick={() => {}}>
        <ActionCardTitle icon={Stethoscope}>Phosphor 컴포넌트 — 자동 wrap</ActionCardTitle>
        <ActionCardDescription>
          icon prop 에 컴포넌트 참조를 넘기면 Icon 으로 자동 렌더
        </ActionCardDescription>
      </ActionCard>
      <ActionCard onClick={() => {}}>
        <ActionCardTitle
          icon={
            <span
              aria-hidden
              style={{
                width: "100%",
                height: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                background: "var(--pds-fill-normal)",
                fontSize: 9,
                fontWeight: 700,
                color: "var(--pds-label-alternative)",
              }}
            >
              IMG
            </span>
          }
        >
          Custom element — img / 로고 / 커스텀 SVG
        </ActionCardTitle>
        <ActionCardDescription>icon prop 에 element 를 넘기면 그대로 렌더</ActionCardDescription>
      </ActionCard>
      <Styles />
    </div>
  );
}

export function ActionCardVariantDemo() {
  const variants = ["outlined", "filled", "ghost"] as const;
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {variants.map((v) => (
        <div key={v} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--pds-label-alternative)",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            variant=&quot;{v}&quot;
          </span>
          <ActionCard variant={v} onClick={() => {}}>
            <ActionCardTitle icon={Compass}>Where should I start?</ActionCardTitle>
            <ActionCardDescription>
              Pick the first thing to look at in this skill, together
            </ActionCardDescription>
          </ActionCard>
        </div>
      ))}
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
      .pds-demo-row > *:not(style) {
        max-width: 480px;
      }
    `}</style>
  );
}
