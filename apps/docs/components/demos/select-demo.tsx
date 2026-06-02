"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@fluxloop-ai/pds-ui/components/select";
import * as React from "react";

export function SelectBasicDemo() {
  const [value, setValue] = React.useState("seoul");
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 12 }}>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger size="sm" style={{ width: 200 }}>
          <SelectValue placeholder="지역 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="seoul">서울</SelectItem>
          <SelectItem value="busan">부산</SelectItem>
          <SelectItem value="jeju">제주</SelectItem>
          <SelectItem value="ny" disabled>
            New York (disabled)
          </SelectItem>
        </SelectContent>
      </Select>
      <Styles />
    </div>
  );
}

export function SelectSizeDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <Select key={s} defaultValue="apple">
          <SelectTrigger size={s} style={{ width: 160 }}>
            <SelectValue placeholder={`size ${s}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      ))}
      <Styles />
    </div>
  );
}

export function SelectGroupDemo() {
  return (
    <div className="pds-demo-row">
      <Select defaultValue="react">
        <SelectTrigger size="sm" style={{ width: 200 }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>프론트엔드</SelectLabel>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>백엔드</SelectLabel>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
            <SelectItem value="ts">Node / TS</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Styles />
    </div>
  );
}

export function SelectVariantDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["outlined", "filled"] as const).map((v) => (
        <Select key={v} defaultValue="always">
          <SelectTrigger variant={v} size="md" style={{ width: 200 }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">절대 안 함</SelectItem>
            <SelectItem value="unfocused">집중하지 않았을 때만</SelectItem>
            <SelectItem value="always">항상</SelectItem>
          </SelectContent>
        </Select>
      ))}
      <Styles />
    </div>
  );
}

export function SelectInvalidDemo() {
  return (
    <div className="pds-demo-row">
      <Select>
        <SelectTrigger size="sm" invalid style={{ width: 200 }}>
          <SelectValue placeholder="필수 항목" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
          <SelectItem value="b">B</SelectItem>
        </SelectContent>
      </Select>
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
