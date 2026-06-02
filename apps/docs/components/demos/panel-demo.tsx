"use client";

import {
  CalendarCheck,
  ChartBar,
  Clock,
  Globe,
  Lightning,
  Robot,
  Ruler,
  Translate,
} from "@fluxloop-ai/pds-icons/icons";
import { Panel, PanelCell } from "@fluxloop-ai/pds-ui/components/panel";

export function PanelMetadataStripDemo() {
  return (
    <Panel columns={3}>
      <PanelCell title="언어" icon={Translate}>
        <Value>한국어</Value>
      </PanelCell>
      <PanelCell title="지역" icon={Globe}>
        <Value>Asia/Seoul</Value>
      </PanelCell>
      <PanelCell title="검증날짜" icon={CalendarCheck}>
        <Value>02/28/2026</Value>
      </PanelCell>
    </Panel>
  );
}

export function PanelGridDemo() {
  return (
    <Panel columns={2}>
      <PanelCell title="에이전트" icon={Robot}>
        <ChartPlaceholder height={120} label="donut" />
      </PanelCell>
      <PanelCell title="Work hours" icon={Clock}>
        <ChartPlaceholder height={120} label="heatmap" />
      </PanelCell>
      <PanelCell title="Stats" icon={ChartBar}>
        <ChartPlaceholder height={120} label="radar" />
      </PanelCell>
      <PanelCell title="Brevity" icon={Ruler}>
        <ChartPlaceholder height={120} label="histogram" />
      </PanelCell>
      <PanelCell title="Reply Reflex" icon={Lightning}>
        <ChartPlaceholder height={120} label="bars" />
      </PanelCell>
      <PanelCell title="Notes">
        <Value>자유 텍스트 셀</Value>
      </PanelCell>
    </Panel>
  );
}

export function PanelStackDemo() {
  return (
    <Panel columns={1}>
      <PanelCell title="표준 shape">
        <Body>「현재 X 진행 중인데, [의문 한 줄]」 — 상태 선언이 의도보다 먼저.</Body>
      </PanelCell>
      <PanelCell title="길이는 짧게">
        <Body>절반이 73자 이하. 길어지는 건 컨셉 dump · 번호 매김 본문 · 모드 선언일 때만.</Body>
      </PanelCell>
      <PanelCell title="위치 단서를 거의 항상 끌어옴">
        <Body>파일 경로 · &lt;컴포넌트명&gt; · 이미지 첨부 · URL 중 하나.</Body>
      </PanelCell>
    </Panel>
  );
}

export function PanelSpanDemo() {
  return (
    <Panel columns={4}>
      <PanelCell span={2} title="요약" icon={Robot}>
        <Value>span=2 로 두 칸 차지</Value>
      </PanelCell>
      <PanelCell title="Avg">
        <Value>47</Value>
      </PanelCell>
      <PanelCell title="Median">
        <Value>43</Value>
      </PanelCell>
      <PanelCell title="P50">
        <Value>52</Value>
      </PanelCell>
      <PanelCell title="P95">
        <Value>118</Value>
      </PanelCell>
      <PanelCell span={2} title="Max">
        <Value>657</Value>
      </PanelCell>
    </Panel>
  );
}

export function PanelHeaderlessDemo() {
  return (
    <Panel columns={3}>
      <PanelCell>
        <Value>icon · title 없는 셀</Value>
      </PanelCell>
      <PanelCell icon={Robot}>
        <Value>icon-only 셀</Value>
      </PanelCell>
      <PanelCell title="title-only">
        <Value>title-only 셀</Value>
      </PanelCell>
    </Panel>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        font: "var(--pds-font-body1-medium)",
        color: "var(--pds-label-strong)",
      }}
    >
      {children}
    </span>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        font: "var(--pds-font-label1-regular)",
        color: "var(--pds-label-neutral)",
      }}
    >
      {children}
    </span>
  );
}

function ChartPlaceholder({ height, label }: { height: number; label: string }) {
  return (
    <div
      style={{
        height,
        borderRadius: "var(--pds-radius-8)",
        border: "1px dashed var(--pds-line-solid-normal)",
        background: "var(--pds-background-normal-alternative)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--pds-label-alternative)",
        font: "var(--pds-font-label1-regular)",
      }}
    >
      {label}
    </div>
  );
}
