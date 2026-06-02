"use client";

import { Envelope, MagnifyingGlass } from "@tendtoyj/cds-icons/icons";
import { Icon } from "@tendtoyj/cds-ui/components/icon";
import { Input } from "@tendtoyj/cds-ui/components/input";
import { useState } from "react";

export function InputBasicDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="cds-input-card">
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
    <div className="cds-input-card">
      <Input size="sm" placeholder="small" width={320} />
      <Input size="md" placeholder="medium" width={320} />
      <Input size="lg" placeholder="large" width={320} />
      <Styles />
    </div>
  );
}

export function InputStateDemo() {
  return (
    <div className="cds-input-card">
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
    <div className="cds-input-card">
      <Input
        placeholder="검색"
        leadingContent={<Icon icon={MagnifyingGlass} size="md" />}
        width={360}
      />
      <Input
        placeholder="email@codexy.com"
        leadingContent={<Icon icon={Envelope} size="md" />}
        trailingContent={
          <span className="text-[color:var(--cds-label-alternative)] text-[12px]">@codexy.com</span>
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
      .cds-input-card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
    `}</style>
  );
}
