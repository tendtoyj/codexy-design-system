"use client";

import { useScrollFade } from "@tendtoyj/cds-ui";
import { ScrollArea } from "@tendtoyj/cds-ui/components/scroll-area";

const TAGS = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`);

export function ScrollAreaVerticalDemo() {
  return (
    <div className="cds-sa-card">
      <ScrollArea className="cds-sa-box">
        <div className="cds-sa-list">
          {TAGS.map((t) => (
            <div key={t} className="cds-sa-row">
              {t}
            </div>
          ))}
        </div>
      </ScrollArea>
      <Styles />
    </div>
  );
}

export function ScrollAreaFadeDemo() {
  const { ref, onScroll, maskImage } = useScrollFade<HTMLDivElement>({ size: 40 });
  return (
    <div className="cds-sa-card">
      <ScrollArea
        className="cds-sa-box"
        viewportRef={ref}
        onViewportScroll={onScroll}
        viewportStyle={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <div className="cds-sa-list">
          {TAGS.map((t) => (
            <div key={t} className="cds-sa-row">
              {t}
            </div>
          ))}
        </div>
      </ScrollArea>
      <Styles />
    </div>
  );
}

export function ScrollAreaHorizontalDemo() {
  return (
    <div className="cds-sa-card">
      <ScrollArea className="cds-sa-box-h" scrollBarSize="sm">
        <div className="cds-sa-strip">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <figure key={`tile-${n}`} className="cds-sa-tile">
              #{n}
            </figure>
          ))}
        </div>
      </ScrollArea>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-sa-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
      .cds-sa-box {
        height: 220px;
        width: 320px;
        border: 1px solid var(--cds-line-normal-neutral);
        border-radius: var(--cds-radius-md);
      }
      .cds-sa-box-h {
        width: 100%;
        height: 120px;
        border: 1px solid var(--cds-line-normal-neutral);
        border-radius: var(--cds-radius-md);
      }
      .cds-sa-list {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .cds-sa-row {
        padding: 8px 10px;
        font-size: var(--text-body2);
        color: var(--cds-label-normal);
        border-radius: var(--cds-radius-sm);
      }
      .cds-sa-row:hover {
        background: var(--cds-fill-normal);
      }
      .cds-sa-strip {
        display: flex;
        gap: 10px;
        padding: 12px;
      }
      .cds-sa-tile {
        flex: 0 0 auto;
        width: 96px;
        height: 96px;
        border-radius: var(--cds-radius-md);
        background: linear-gradient(135deg, var(--cds-color-blue-70), var(--cds-color-violet-60));
        color: var(--cds-static-white, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--cds-font-weight-semibold);
      }
    `}</style>
  );
}
