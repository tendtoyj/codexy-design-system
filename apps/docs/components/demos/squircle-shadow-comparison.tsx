"use client";

/**
 * squircle.js × shadow 손실 비교 데모.
 * Tauri 전환 시 macOS 에서 떠 있는 패널에 squircle.js 를 적용했을 때
 * drop shadow 가 얼마나 잘리는지, filter: drop-shadow 우회가 얼마나 회복되는지 직관 확인용.
 *
 * - A: arc + box-shadow (현재 PDS 기준)
 * - B: arc + filter: drop-shadow (필터 기반 그림자 베이스라인)
 * - C: squircle.js + box-shadow (clip-path 로 그림자 잘림)
 * - D: squircle.js + filter: drop-shadow (우회)
 */

import { useEffect, useRef, useState } from "react";

type Variant = "arc-box" | "arc-filter" | "squircle-box" | "squircle-filter";

const VARIANTS: { id: Variant; title: string; note: string }[] = [
  { id: "arc-box", title: "A. arc + box-shadow", note: "현재 PDS 기본" },
  { id: "arc-filter", title: "B. arc + filter: drop-shadow", note: "필터 베이스라인" },
  {
    id: "squircle-box",
    title: "C. squircle.js + box-shadow",
    note: "← clip-path 로 그림자 잘림",
  },
  {
    id: "squircle-filter",
    title: "D. squircle.js + filter: drop-shadow",
    note: "← 우회",
  },
];

function Panel({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const [clipApplied, setClipApplied] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (variant !== "squircle-box" && variant !== "squircle-filter") return;
    let cancelled = false;
    import("squircle.js").then(({ squirclify }) => {
      if (!cancelled && ref.current) {
        squirclify(ref.current);
        // 다음 프레임에 실제로 clipPath 가 박혔는지 검증
        requestAnimationFrame(() => {
          if (!cancelled && ref.current) {
            setClipApplied(Boolean(ref.current.style.clipPath));
          }
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [variant]);

  const useBoxShadow = variant === "arc-box" || variant === "squircle-box";
  const useFilter = variant === "arc-filter" || variant === "squircle-filter";

  // filter: drop-shadow 는 부모 wrapper 에 걸어야 clip-path 로 잘리지 않는다.
  const wrapperStyle: React.CSSProperties = useFilter ? { filter: "var(--pds-drop-xl)" } : {};

  const panelStyle: React.CSSProperties = {
    boxShadow: useBoxShadow ? "var(--pds-shadow-xl)" : "none",
    // squircle.js 는 corner-shape: squircle (Chromium 139+) 영향과 분리해서 보기 위해 강제로 round
    ["cornerShape" as never]: "round",
  };

  return (
    <figure className="pds-sqsh-cell">
      <div className="pds-sqsh-panel-wrapper" style={wrapperStyle}>
        <div ref={ref} className="pds-sqsh-panel" style={panelStyle}>
          <div className="pds-sqsh-panel-header">Floating Panel</div>
          <div className="pds-sqsh-panel-body">
            Dialog · Popover · DropdownMenu 같은 떠 있는 레이어의 elevation 을 그림자로 표현합니다.
          </div>
        </div>
      </div>
      <figcaption>
        <strong>{VARIANTS.find((v) => v.id === variant)?.title}</strong>
        <span>{VARIANTS.find((v) => v.id === variant)?.note}</span>
        {(variant === "squircle-box" || variant === "squircle-filter") && (
          <span className="pds-sqsh-applied" data-on={clipApplied}>
            {clipApplied ? "✓ clip-path applied" : "… not applied"}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function SquircleShadowComparison() {
  return (
    <div className="pds-sqsh-grid">
      {VARIANTS.map((v) => (
        <Panel key={v.id} variant={v.id} />
      ))}
      <style>{`
        .pds-sqsh-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px 32px;
          padding: 64px 40px;
          background: var(--pds-background-normal-alternative);
          border-radius: var(--pds-radius-lg);
          margin: 16px 0;
        }
        .pds-sqsh-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          margin: 0;
        }
        .pds-sqsh-panel-wrapper {
          /* filter: drop-shadow 가 걸리는 레이어 */
        }
        .pds-sqsh-panel {
          width: 260px;
          padding: 32px 28px;
          background: var(--pds-background-normal-normal);
          border: 1px solid var(--pds-line-solid-alternative);
          border-radius: 30px;
        }
        .pds-sqsh-panel-header {
          font-size: var(--text-label1);
          font-weight: var(--pds-font-weight-semibold);
          color: var(--pds-label-normal);
          margin-bottom: 8px;
        }
        .pds-sqsh-panel-body {
          font-size: var(--text-body2);
          line-height: 1.5;
          color: var(--pds-label-alternative);
        }
        .pds-sqsh-cell figcaption {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }
        .pds-sqsh-cell figcaption strong {
          font-size: var(--text-label2);
          color: var(--pds-label-normal);
          font-family: var(--pds-font-mono);
        }
        .pds-sqsh-cell figcaption span {
          font-size: var(--text-caption1);
          color: var(--pds-label-alternative);
        }
        .pds-sqsh-applied {
          font-family: var(--pds-font-mono);
          padding: 2px 8px;
          border-radius: 999px;
          margin-top: 4px;
        }
        .pds-sqsh-applied[data-on="true"] {
          background: var(--pds-color-green-95, color-mix(in srgb, green 12%, transparent));
          color: var(--pds-color-green-30, green);
        }
        .pds-sqsh-applied[data-on="false"] {
          background: color-mix(in srgb, var(--pds-label-alternative) 12%, transparent);
        }
      `}</style>
    </div>
  );
}

export function SquircleShadowSizes() {
  // 같은 variant (squircle.js + box-shadow vs filter) 에서 모서리 반경별 손실 차이
  const radii = [8, 12, 16, 24] as const;

  return (
    <div className="pds-sqsh-sizes">
      {radii.map((r) => (
        <div key={r} className="pds-sqsh-size-row">
          <div className="pds-sqsh-size-label">radius {r}px</div>
          <SizeCell radius={r} mode="box" />
          <SizeCell radius={r} mode="filter" />
        </div>
      ))}
      <style>{`
        .pds-sqsh-sizes {
          display: flex;
          flex-direction: column;
          gap: 40px;
          padding: 48px 32px;
          background: var(--pds-background-normal-alternative);
          border-radius: var(--pds-radius-lg);
          margin: 16px 0;
        }
        .pds-sqsh-size-row {
          display: grid;
          grid-template-columns: 100px 1fr 1fr;
          align-items: center;
          gap: 24px;
        }
        .pds-sqsh-size-label {
          font-family: var(--pds-font-mono);
          font-size: var(--text-caption1);
          color: var(--pds-label-alternative);
        }
      `}</style>
    </div>
  );
}

function SizeCell({ radius, mode }: { radius: number; mode: "box" | "filter" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    import("squircle.js").then(({ squirclify }) => {
      if (!cancelled && ref.current) squirclify(ref.current);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const wrapperStyle: React.CSSProperties =
    mode === "filter" ? { filter: "var(--pds-drop-xl)" } : {};
  const panelStyle: React.CSSProperties = {
    boxShadow: mode === "box" ? "var(--pds-shadow-xl)" : "none",
    borderRadius: `${radius}px`,
    ["cornerShape" as never]: "round",
  };

  return (
    <div className="pds-sqsh-size-cell">
      <div style={wrapperStyle}>
        <div
          ref={ref}
          style={{
            width: 160,
            height: 80,
            background: "var(--pds-background-normal-normal)",
            border: "1px solid var(--pds-line-solid-alternative)",
            ...panelStyle,
          }}
        />
      </div>
      <code
        style={{
          fontFamily: "var(--pds-font-mono)",
          fontSize: "var(--text-caption1)",
          color: "var(--pds-label-alternative)",
          marginTop: 12,
          display: "block",
          textAlign: "center",
        }}
      >
        squircle.js + {mode === "box" ? "box-shadow" : "drop-shadow"}
      </code>
      <style>{`
        .pds-sqsh-size-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
