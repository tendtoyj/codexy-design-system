"use client";

import {
  Bookmark,
  ChartBar,
  Compass,
  Sparkle,
  Stethoscope,
  Wrench,
} from "@fluxloop-ai/pds-icons/icons";
import {
  ActionTile,
  ActionTileContent,
  ActionTileDescription,
  ActionTileFooter,
  ActionTileHeader,
  ActionTileLeading,
  ActionTileTitle,
} from "@fluxloop-ai/pds-ui/components/action-tile";
import { Badge } from "@fluxloop-ai/pds-ui/components/badge";
import { Icon } from "@fluxloop-ai/pds-ui/components/icon";
import { IconButton } from "@fluxloop-ai/pds-ui/components/icon-button";
import * as React from "react";

export function ActionTileBasicDemo() {
  const items = [
    { icon: Compass, title: "Where to start", desc: "Pick the first thing to look at" },
    { icon: Stethoscope, title: "Diagnose", desc: "Surface improvements from logs" },
    { icon: ChartBar, title: "Review runs", desc: "Walk through recent runs" },
  ];
  return (
    <div className="pds-demo-row pds-demo-grid">
      {items.map((it) => (
        <ActionTile key={it.title} onClick={() => {}}>
          <ActionTileContent>
            <ActionTileLeading>
              <Icon icon={it.icon} size="lg" color="label-strong" />
            </ActionTileLeading>
            <ActionTileTitle>{it.title}</ActionTileTitle>
            <ActionTileDescription>{it.desc}</ActionTileDescription>
          </ActionTileContent>
        </ActionTile>
      ))}
      <Styles />
    </div>
  );
}

export function ActionTileCenterDemo() {
  const items = [
    { icon: Compass, title: "Where to start", desc: "Pick the first thing to look at" },
    { icon: Stethoscope, title: "Diagnose", desc: "Surface improvements from logs" },
    { icon: ChartBar, title: "Review runs", desc: "Walk through recent runs" },
  ];
  return (
    <div className="pds-demo-row pds-demo-grid">
      {items.map((it) => (
        <ActionTile key={it.title} contentAlign="center" onClick={() => {}}>
          <ActionTileContent>
            <ActionTileLeading>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "var(--pds-fill-normal)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-hidden
              >
                <Icon icon={it.icon} size="md" color="label-strong" />
              </div>
            </ActionTileLeading>
            <ActionTileTitle>{it.title}</ActionTileTitle>
            <ActionTileDescription>{it.desc}</ActionTileDescription>
          </ActionTileContent>
        </ActionTile>
      ))}
      <Styles />
    </div>
  );
}

export function ActionTileFooterDemo() {
  const items = [
    {
      icon: Compass,
      title: "Where to start",
      desc: "Pick the first thing to look at",
      footer: (
        <>
          <Badge size="xs" color="neutral" neutralColor="alternative">
            Tutorial
          </Badge>
          <Badge size="xs" color="accent" accentColor="violet">
            5 min
          </Badge>
        </>
      ),
    },
    {
      icon: Stethoscope,
      title: "Diagnose",
      desc: "Surface improvements from logs",
      footer: (
        <Badge size="xs" color="neutral" neutralColor="alternative">
          Diagnostic
        </Badge>
      ),
    },
    {
      icon: Wrench,
      title: "Auto-improve",
      desc: "Let AI patch the skill",
      footer: (
        <Badge size="xs" color="neutral" neutralColor="alternative">
          Beta
        </Badge>
      ),
    },
  ];
  return (
    <div className="pds-demo-row pds-demo-grid">
      {items.map((it) => (
        <ActionTile key={it.title} footerGap="wide" onClick={() => {}}>
          <ActionTileContent>
            <ActionTileLeading>
              <Icon icon={it.icon} size="lg" color="label-strong" />
            </ActionTileLeading>
            <ActionTileTitle>{it.title}</ActionTileTitle>
            <ActionTileDescription>{it.desc}</ActionTileDescription>
          </ActionTileContent>
          <ActionTileFooter>{it.footer}</ActionTileFooter>
        </ActionTile>
      ))}
      <Styles />
    </div>
  );
}

export function ActionTileHeaderDemo() {
  const items = [
    {
      label: "Tutorial",
      title: "Where to start",
      desc: "Pick the first thing to look at",
      tag: (
        <Badge size="xs" color="accent" accentColor="blue">
          NEW
        </Badge>
      ),
    },
    {
      label: "Diagnostic",
      title: "Diagnose",
      desc: "Surface improvements from logs",
      tag: (
        <Badge size="xs" color="accent" accentColor="red">
          3
        </Badge>
      ),
    },
    {
      label: "Beta",
      title: "Auto-improve",
      desc: "Let AI patch the skill",
      tag: null,
    },
  ];
  return (
    <div className="pds-demo-row pds-demo-grid">
      {items.map((it) => (
        <ActionTile key={it.title} headerGap="tight" headerAlign="between" onClick={() => {}}>
          <ActionTileHeader>
            <span style={{ fontSize: 12, color: "var(--pds-label-alternative)", fontWeight: 500 }}>
              {it.label}
            </span>
            {it.tag}
          </ActionTileHeader>
          <ActionTileContent>
            <ActionTileTitle startIcon={Sparkle}>{it.title}</ActionTileTitle>
            <ActionTileDescription>{it.desc}</ActionTileDescription>
          </ActionTileContent>
        </ActionTile>
      ))}
      <Styles />
    </div>
  );
}

function DiagnoseCard() {
  const [bookmarked, setBookmarked] = React.useState(false);
  return (
    <div style={{ position: "relative" }}>
      <ActionTile
        padding="compact"
        headerGap="tight"
        footerGap="wide"
        onClick={() => {}}
        // Bookmark IconButton 자리 (overlay) 만큼 우측 상단에 여유 — 카드
        // 콘텐츠가 button 바로 위까지 깔리지 않도록 padding 으로 가드.
        className="pr-[52px]"
      >
        <ActionTileContent>
          <ActionTileTitle>Diagnose</ActionTileTitle>
          <ActionTileDescription>Surface improvements from usage logs</ActionTileDescription>
        </ActionTileContent>
        <ActionTileFooter>
          <Badge size="xs" color="accent" accentColor="red">
            3 issues
          </Badge>
        </ActionTileFooter>
      </ActionTile>
      <IconButton
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
        variant="subtle"
        size="sm"
        style={{ position: "absolute", top: 12, right: 12 }}
        onClick={(e) => {
          e.stopPropagation();
          setBookmarked((b) => !b);
        }}
      >
        <Icon icon={Bookmark} weight={bookmarked ? "fill" : "regular"} />
      </IconButton>
    </div>
  );
}

export function ActionTileFullSpecDemo() {
  return (
    <div className="pds-demo-row pds-demo-grid">
      <ActionTile padding="compact" headerGap="tight" footerGap="wide" onClick={() => {}}>
        <ActionTileHeader>
          <span style={{ fontSize: 12, color: "var(--pds-label-alternative)", fontWeight: 500 }}>
            Tutorial
          </span>
        </ActionTileHeader>
        <ActionTileContent>
          <ActionTileTitle startIcon={Sparkle}>Where to start</ActionTileTitle>
          <ActionTileDescription>
            Pick the first thing to look at in this skill
          </ActionTileDescription>
        </ActionTileContent>
        <ActionTileFooter>
          <Badge size="xs" color="accent" accentColor="violet">
            5 min
          </Badge>
        </ActionTileFooter>
      </ActionTile>

      <DiagnoseCard />

      <ActionTile padding="compact" headerAlign="center" contentAlign="center" onClick={() => {}}>
        <ActionTileHeader>
          <Badge size="xs" color="neutral" neutralColor="alternative">
            Beta
          </Badge>
        </ActionTileHeader>
        <ActionTileContent>
          <ActionTileLeading>
            <Icon icon={Wrench} size="lg" color="label-strong" />
          </ActionTileLeading>
          <ActionTileTitle>Auto-improve</ActionTileTitle>
          <ActionTileDescription>Let AI patch the skill based on diagnosis</ActionTileDescription>
        </ActionTileContent>
      </ActionTile>
      <Styles />
    </div>
  );
}

export function ActionTileVariantDemo() {
  const variants = ["outlined", "filled", "ghost"] as const;
  return (
    <div className="pds-demo-row pds-demo-grid">
      {variants.map((v) => (
        <ActionTile key={v} variant={v} onClick={() => {}}>
          <ActionTileContent>
            <ActionTileLeading>
              <Icon icon={Compass} size="lg" color="label-strong" />
            </ActionTileLeading>
            <ActionTileTitle>variant=&quot;{v}&quot;</ActionTileTitle>
            <ActionTileDescription>Pick the first thing to look at</ActionTileDescription>
          </ActionTileContent>
        </ActionTile>
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
      .pds-demo-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
    `}</style>
  );
}
