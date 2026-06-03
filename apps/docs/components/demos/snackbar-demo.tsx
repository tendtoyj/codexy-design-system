"use client";

import { Button } from "@tendtoyj/cds-ui/components/button";
import {
  Snackbar,
  SnackbarAction,
  SnackbarProvider,
  SnackbarViewport,
} from "@tendtoyj/cds-ui/components/snackbar";
import { useState } from "react";

type Variant = "normal" | "positive" | "cautionary" | "negative" | "question";

type Item = {
  id: number;
  variant: Variant;
  title: string;
  description?: string;
  withAction?: boolean;
};

export function SnackbarDemo() {
  const [items, setItems] = useState<Item[]>([]);

  const push = (item: Omit<Item, "id">) => {
    setItems((xs) => [...xs, { id: Date.now() + Math.random(), ...item }]);
  };

  const dismiss = (id: number) => setItems((xs) => xs.filter((x) => x.id !== id));

  return (
    <SnackbarProvider swipeDirection="down" duration={4000}>
      <div className="not-prose cds-snackbar-card">
        <div className="cds-snackbar-row">
          <Button
            onClick={() =>
              push({ variant: "normal", title: "정보", description: "새 업데이트가 있어요." })
            }
          >
            Normal
          </Button>
          <Button
            variant="frosted"
            onClick={() =>
              push({
                variant: "positive",
                title: "저장됨",
                description: "변경사항을 저장했어요.",
              })
            }
          >
            Positive
          </Button>
          <Button
            variant="frosted"
            onClick={() =>
              push({ variant: "cautionary", title: "주의", description: "연결이 불안정해요." })
            }
          >
            Cautionary
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              push({
                variant: "negative",
                title: "실패",
                description: "요청을 처리하지 못했어요.",
              })
            }
          >
            Negative
          </Button>
          <Button
            variant="frosted"
            onClick={() =>
              push({
                variant: "normal",
                title: "항목을 삭제했어요",
                description: "필요하면 되돌릴 수 있어요.",
                withAction: true,
              })
            }
          >
            With action
          </Button>
        </div>
        {items.map((item) => (
          <Snackbar
            key={item.id}
            variant={item.variant}
            title={item.title}
            description={item.description}
            action={
              item.withAction ? (
                <SnackbarAction altText="되돌리기" onClick={() => dismiss(item.id)}>
                  되돌리기
                </SnackbarAction>
              ) : undefined
            }
            onOpenChange={(open) => {
              if (!open) dismiss(item.id);
            }}
          />
        ))}
        <SnackbarViewport />
        <Styles />
      </div>
    </SnackbarProvider>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-snackbar-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .cds-snackbar-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    `}</style>
  );
}
