"use client";

import { Button } from "@fluxloop-ai/pds-ui/components/button";
import { Toast, ToastProvider, ToastViewport } from "@fluxloop-ai/pds-ui/components/toast";
import { useState } from "react";

type Item = {
  id: number;
  variant: "info" | "success" | "warning" | "error";
  title: string;
  description?: string;
};

export function ToastDemo() {
  const [items, setItems] = useState<Item[]>([]);

  const push = (variant: Item["variant"], title: string, description?: string) => {
    setItems((xs) => [...xs, { id: Date.now() + Math.random(), variant, title, description }]);
  };

  return (
    <ToastProvider swipeDirection="right" duration={3000}>
      <div className="not-prose pds-toast-card">
        <div className="pds-toast-section-label">With description</div>
        <div className="pds-toast-row">
          <Button onClick={() => push("info", "정보", "새 업데이트가 있어요.")}>Info</Button>
          <Button
            variant="frosted"
            onClick={() => push("success", "저장됨", "변경사항이 저장되었습니다.")}
          >
            Success
          </Button>
          <Button variant="frosted" onClick={() => push("warning", "주의", "연결이 불안정합니다.")}>
            Warning
          </Button>
          <Button
            variant="danger"
            onClick={() => push("error", "실패", "요청을 처리하지 못했습니다.")}
          >
            Error
          </Button>
        </div>
        <div className="pds-toast-section-label">Title only</div>
        <div className="pds-toast-row">
          <Button onClick={() => push("info", "새 업데이트가 있어요")}>Info</Button>
          <Button variant="frosted" onClick={() => push("success", "저장됨")}>
            Success
          </Button>
          <Button variant="frosted" onClick={() => push("warning", "연결이 불안정합니다")}>
            Warning
          </Button>
          <Button variant="danger" onClick={() => push("error", "요청 실패")}>
            Error
          </Button>
        </div>
        {items.map((item) => (
          <Toast
            key={item.id}
            variant={item.variant}
            title={item.title}
            description={item.description}
            onOpenChange={(open) => {
              if (!open) setItems((xs) => xs.filter((x) => x.id !== item.id));
            }}
          />
        ))}
        <ToastViewport />
        <Styles />
      </div>
    </ToastProvider>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-toast-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .pds-toast-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .pds-toast-section-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--pds-label-alternative);
        margin-top: 4px;
      }
      .pds-toast-section-label:first-child {
        margin-top: 0;
      }
    `}</style>
  );
}
