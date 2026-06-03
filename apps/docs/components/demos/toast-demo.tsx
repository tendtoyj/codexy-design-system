"use client";

import { Copy } from "@tendtoyj/cds-icons/icons";
import { Button } from "@tendtoyj/cds-ui/components/button";
import { Toast, ToastProvider, ToastViewport } from "@tendtoyj/cds-ui/components/toast";
import { useState } from "react";

type Variant = "normal" | "positive" | "cautionary" | "negative" | "question";

type Item = {
  id: number;
  variant: Variant;
  message: string;
  custom?: boolean;
};

export function ToastDemo() {
  const [items, setItems] = useState<Item[]>([]);

  const push = (variant: Variant, message: string, custom?: boolean) => {
    setItems((xs) => [...xs, { id: Date.now() + Math.random(), variant, message, custom }]);
  };

  return (
    <ToastProvider swipeDirection="down" duration={3000}>
      <div className="not-prose cds-toast-card">
        <div className="cds-toast-row">
          <Button onClick={() => push("normal", "링크를 복사했어요.", true)}>Custom</Button>
          <Button variant="frosted" onClick={() => push("positive", "변경사항을 저장했어요.")}>
            Positive
          </Button>
          <Button
            variant="frosted"
            onClick={() => push("cautionary", "최대 5개까지 선택할 수 있어요.")}
          >
            Cautionary
          </Button>
          <Button
            variant="danger"
            onClick={() => push("negative", "요청을 처리하지 못했어요. 다시 시도해 주세요.")}
          >
            Negative
          </Button>
        </div>
        {items.map((item) => (
          <Toast
            key={item.id}
            variant={item.variant}
            icon={item.custom ? Copy : undefined}
            onOpenChange={(open) => {
              if (!open) setItems((xs) => xs.filter((x) => x.id !== item.id));
            }}
          >
            {item.message}
          </Toast>
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
      .cds-toast-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .cds-toast-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    `}</style>
  );
}
