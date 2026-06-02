"use client";

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@tendtoyj/cds-ui/components/segmented-control";
import * as React from "react";

export function SegmentedControlSizeDemo() {
  return (
    <div className="cds-demo-row" style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {(["sm", "md"] as const).map((s) => (
        <SegmentedControl key={s} size={s} defaultValue="inline">
          <SegmentedControlItem value="inline">인라인</SegmentedControlItem>
          <SegmentedControlItem value="split">분리됨</SegmentedControlItem>
        </SegmentedControl>
      ))}
      <Styles />
    </div>
  );
}

export function SegmentedControlControlledDemo() {
  const [value, setValue] = React.useState("queue");
  return (
    <div className="cds-demo-row" style={{ display: "flex", gap: 16, flexDirection: "column" }}>
      <SegmentedControl value={value} onValueChange={setValue}>
        <SegmentedControlItem value="queue">대기열 추가</SegmentedControlItem>
        <SegmentedControlItem value="steering">스티어링</SegmentedControlItem>
      </SegmentedControl>
      <span style={{ fontSize: 12, color: "var(--cds-label-assistive)" }}>
        선택값: <code>{value}</code>
      </span>
      <Styles />
    </div>
  );
}

export function SegmentedControlFullWidthDemo() {
  return (
    <div className="cds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SegmentedControl fullWidth defaultValue="a">
        <SegmentedControlItem value="a">옵션 A</SegmentedControlItem>
        <SegmentedControlItem value="b">옵션 B</SegmentedControlItem>
        <SegmentedControlItem value="c">옵션 C</SegmentedControlItem>
      </SegmentedControl>
      <Styles />
    </div>
  );
}

export function SegmentedControlDisabledDemo() {
  return (
    <div className="cds-demo-row" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <SegmentedControl defaultValue="a" disabled>
        <SegmentedControlItem value="a">전체 비활성</SegmentedControlItem>
        <SegmentedControlItem value="b">옵션 B</SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl defaultValue="a">
        <SegmentedControlItem value="a">활성</SegmentedControlItem>
        <SegmentedControlItem value="b" disabled>
          항목만
        </SegmentedControlItem>
      </SegmentedControl>
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
    `}</style>
  );
}
