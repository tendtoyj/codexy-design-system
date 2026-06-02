"use client";

import { Envelope, MagnifyingGlass } from "@fluxloop-ai/pds-icons/icons";
import { Icon } from "@fluxloop-ai/pds-ui/components/icon";
import { Input } from "@fluxloop-ai/pds-ui/components/input";
import { useState } from "react";

export function InputBasicDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="pds-input-card">
      <Input
        placeholder="프로젝트 이름"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        width={320}
      />
      <Styles />
    </div>
  );
}

export function InputSizeDemo() {
  return (
    <div className="pds-input-card">
      <Input size="sm" placeholder="small" width={320} />
      <Input size="md" placeholder="medium" width={320} />
      <Input size="lg" placeholder="large" width={320} />
      <Styles />
    </div>
  );
}

export function InputStateDemo() {
  return (
    <div className="pds-input-card">
      <Input placeholder="기본" width={320} />
      <Input placeholder="invalid" invalid defaultValue="잘못된 값" width={320} />
      <Input placeholder="positive" positive defaultValue="좋아요" width={320} />
      <Input placeholder="readonly" readOnly defaultValue="읽기 전용" width={320} />
      <Input placeholder="disabled" disabled defaultValue="비활성" width={320} />
      <Styles />
    </div>
  );
}

export function InputWithSlotsDemo() {
  return (
    <div className="pds-input-card">
      <Input
        placeholder="검색"
        leadingContent={<Icon icon={MagnifyingGlass} size="md" />}
        width={360}
      />
      <Input
        placeholder="email@pluto.com"
        leadingContent={<Icon icon={Envelope} size="md" />}
        trailingContent={
          <span className="text-[color:var(--pds-label-alternative)] text-[12px]">@pluto.com</span>
        }
        width={360}
      />
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-input-card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
