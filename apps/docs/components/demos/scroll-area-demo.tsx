"use client";

import { useScrollFade } from "@fluxloop-ai/pds-ui";
import { ScrollArea } from "@fluxloop-ai/pds-ui/components/scroll-area";

const TAGS = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`);

export function ScrollAreaVerticalDemo() {
  return (
    <div className="pds-sa-card">
      <ScrollArea className="pds-sa-box">
        <div className="pds-sa-list">
          {TAGS.map((t) => (
            <div key={t} className="pds-sa-row">
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
    <div className="pds-sa-card">
      <ScrollArea
        className="pds-sa-box"
        viewportRef={ref}
        onViewportScroll={onScroll}
        viewportStyle={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <div className="pds-sa-list">
          {TAGS.map((t) => (
            <div key={t} className="pds-sa-row">
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
    <div className="pds-sa-card">
      <ScrollArea className="pds-sa-box-h" scrollBarSize="sm">
        <div className="pds-sa-strip">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <figure key={`tile-${n}`} className="pds-sa-tile">
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
      .pds-sa-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-sa-box {
        height: 220px;
        width: 320px;
        border: 1px solid var(--pds-line-normal-neutral);
        border-radius: var(--pds-radius-md);
      }
      .pds-sa-box-h {
        width: 100%;
        height: 120px;
        border: 1px solid var(--pds-line-normal-neutral);
        border-radius: var(--pds-radius-md);
      }
      .pds-sa-list {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .pds-sa-row {
        padding: 8px 10px;
        font-size: var(--text-body2);
        color: var(--pds-label-normal);
        border-radius: var(--pds-radius-sm);
      }
      .pds-sa-row:hover {
        background: var(--pds-fill-normal);
      }
      .pds-sa-strip {
        display: flex;
        gap: 10px;
        padding: 12px;
      }
      .pds-sa-tile {
        flex: 0 0 auto;
        width: 96px;
        height: 96px;
        border-radius: var(--pds-radius-md);
        background: linear-gradient(135deg, var(--pds-color-blue-70), var(--pds-color-violet-60));
        color: var(--pds-static-white, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--pds-font-weight-semibold);
      }
    `}</style>
  );
}
