"use client";

import { ArrowRight, Plus } from "@fluxloop-ai/pds-icons/icons";
import { Icon } from "@fluxloop-ai/pds-ui/components/icon";
import { TextButton } from "@fluxloop-ai/pds-ui/components/text-button";
import { useState } from "react";

export function TextButtonColorDemo() {
  return (
    <div className="pds-tbtn-card">
      <div className="pds-tbtn-row">
        <TextButton color="primary">Primary</TextButton>
        <TextButton color="assistive">Assistive</TextButton>
      </div>
      <div className="pds-tbtn-row">
        <TextButton color="primary" disabled>
          Primary
        </TextButton>
        <TextButton color="assistive" disabled>
          Assistive
        </TextButton>
      </div>
      <Styles />
    </div>
  );
}

export function TextButtonSizeDemo() {
  return (
    <div className="pds-tbtn-card">
      <div className="pds-tbtn-row">
        <TextButton size="sm">Small</TextButton>
        <TextButton size="md">Medium</TextButton>
      </div>
      <Styles />
    </div>
  );
}

export function TextButtonWithIconDemo() {
  return (
    <div className="pds-tbtn-card">
      <div className="pds-tbtn-row">
        <TextButton leadingContent={<Icon icon={Plus} />}>새로 만들기</TextButton>
        <TextButton trailingContent={<Icon icon={ArrowRight} />}>더 보기</TextButton>
        <TextButton color="assistive" trailingContent={<Icon icon={ArrowRight} />}>
          전체 보기
        </TextButton>
      </div>
      <Styles />
    </div>
  );
}

export function TextButtonLoadingDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="pds-tbtn-card">
      <div className="pds-tbtn-row">
        <TextButton
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
          }}
        >
          저장
        </TextButton>
        <TextButton color="assistive" loading>
          업로드 중
        </TextButton>
      </div>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-tbtn-card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-tbtn-row {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
      }
    `}</style>
  );
}
