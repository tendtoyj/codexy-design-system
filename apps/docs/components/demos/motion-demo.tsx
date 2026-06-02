"use client";

import { useCallback, useState } from "react";

type Keyframe = {
  id: string;
  name: string;
  description: string;
  util?: string;
  duration: string;
  render: (playKey: number) => React.ReactNode;
};

/**
 * 재생 버튼을 누를 때마다 playKey 가 바뀌어 React 가 노드를 다시 마운트 → 애니메이션 재시작.
 * key 를 바꾸는 게 브라우저 호환·구현 모두 가장 짧은 길.
 */
const KEYFRAMES: Keyframe[] = [
  {
    id: "fade-in-up",
    name: "cds-fade-in-up",
    util: ".cds-animate-step-in",
    description: "메시지 6px step-in — 채팅 말풍선 기본",
    duration: "duration-slower (450ms)",
    render: (k) => (
      <div
        key={k}
        className="cds-motion-box cds-animate-step-in"
        style={{ background: "var(--cds-primary-normal)", color: "var(--cds-color-common-100)" }}
      >
        step-in
      </div>
    ),
  },
  {
    id: "fade-in-card",
    name: "cds-fade-in-card",
    util: ".cds-animate-card-in",
    description: "카드 10px 등장 (500ms)",
    duration: "500ms",
    render: (k) => (
      <div key={k} className="cds-motion-card cds-animate-card-in">
        card
      </div>
    ),
  },
  {
    id: "fade-collapse",
    name: "cds-fade-collapse",
    description: "섹션 접기 (max-height → 0). --cds-collapse-from 로 시작 높이 제어",
    duration: "duration-normal (200ms)",
    render: (k) => (
      <div
        key={k}
        className="cds-motion-collapse"
        style={{
          background: "var(--cds-background-normal-alternative)",
          color: "var(--cds-label-normal)",
          padding: "8px 12px",
          border: "1px solid var(--cds-line-solid-normal)",
          borderRadius: "var(--cds-radius-md)",
          animation: "cds-fade-collapse var(--cds-duration-slow) var(--cds-ease-standard) forwards",
          ["--cds-collapse-from" as string]: "80px",
        }}
      >
        접히는 섹션
      </div>
    ),
  },
  {
    id: "dot-pulse",
    name: "cds-dot-pulse",
    util: ".cds-animate-dot-pulse",
    description: "단일 점 펄스 (scale 0.85↔1, opacity 0.5↔1)",
    duration: "1.4s loop",
    render: (k) => (
      <span
        key={k}
        className="cds-animate-dot-pulse"
        style={{ width: 8, height: 8, color: "var(--cds-primary-normal)" }}
      />
    ),
  },
  {
    id: "dot-ripple",
    name: "cds-dot-ripple",
    description: "Agent 상태 pulse — idle dot 주변 ripple",
    duration: "1.6s loop",
    render: (k) => (
      <div key={k} className="cds-motion-ripple">
        <span className="cds-motion-ripple-core" />
        <span className="cds-motion-ripple-ring" />
      </div>
    ),
  },
  {
    id: "shimmer",
    name: "cds-shimmer",
    util: ".cds-animate-shimmer",
    description: "스켈레톤 로더 (1.6s linear 루프)",
    duration: "1.6s loop",
    render: (k) => (
      <div
        key={k}
        className="cds-animate-shimmer"
        style={{
          width: "200px",
          height: "14px",
          borderRadius: "var(--cds-radius-sm)",
        }}
      />
    ),
  },
];

export function MotionDemo() {
  const [playTick, setPlayTick] = useState<Record<string, number>>({});

  const play = useCallback((id: string) => {
    setPlayTick((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  return (
    <div className="cds-motion-demo">
      {KEYFRAMES.map((kf) => (
        <article key={kf.id} className="cds-motion-item">
          <header className="cds-motion-item-meta">
            <code className="cds-motion-name">@keyframes {kf.name}</code>
            <span className="cds-motion-dur">{kf.duration}</span>
          </header>
          <p className="cds-motion-desc">{kf.description}</p>
          {kf.util ? <code className="cds-motion-util">{kf.util}</code> : null}
          <div className="cds-motion-stage">{kf.render(playTick[kf.id] ?? 0)}</div>
          <button type="button" className="cds-motion-play" onClick={() => play(kf.id)}>
            ▸ 재생
          </button>
        </article>
      ))}
      <style>{`
        .cds-motion-demo {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
          margin: 16px 0;
        }
        .cds-motion-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 14px;
          border: 1px solid var(--cds-line-solid-normal);
          border-radius: var(--cds-radius-lg);
          background: var(--cds-background-normal-normal);
        }
        .cds-motion-item-meta {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cds-motion-name {
          font-family: var(--cds-font-mono);
          font-size: var(--text-label1);
          color: var(--cds-label-normal);
          font-weight: var(--cds-font-weight-semibold);
        }
        .cds-motion-dur {
          font-size: var(--text-caption1);
          color: var(--cds-label-alternative);
        }
        .cds-motion-desc {
          margin: 0;
          font-size: var(--text-body2);
          line-height: var(--text-body2--line-height);
          color: var(--cds-label-neutral);
        }
        .cds-motion-util {
          font-family: var(--cds-font-mono);
          font-size: var(--text-caption1);
          color: var(--cds-primary-normal);
        }
        .cds-motion-stage {
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          background: var(--cds-background-normal-alternative);
          border-radius: var(--cds-radius-md);
          overflow: hidden;
        }
        .cds-motion-play {
          align-self: flex-start;
          padding: 4px 10px;
          font-size: var(--text-label2);
          font-family: var(--cds-font-sans);
          border: 1px solid var(--cds-line-solid-normal);
          border-radius: var(--cds-radius-md);
          background: var(--cds-background-normal-normal);
          color: var(--cds-label-normal);
          cursor: pointer;
          transition: var(--cds-transition-all);
        }
        .cds-motion-play:hover {
          border-color: var(--cds-primary-normal);
          color: var(--cds-primary-normal);
        }
        .cds-motion-box {
          padding: 8px 14px;
          border-radius: var(--cds-radius-md);
          font-size: var(--text-body2);
        }
        .cds-motion-card {
          padding: 10px 14px;
          border-radius: var(--cds-radius-lg);
          border: 1px solid var(--cds-line-solid-normal);
          background: var(--cds-background-normal-normal);
          box-shadow: var(--cds-shadow-sm);
          color: var(--cds-label-normal);
          font-size: var(--text-body2);
        }
        .cds-motion-collapse {
          overflow: hidden;
        }
        .cds-motion-ripple {
          position: relative;
          width: 10px;
          height: 10px;
        }
        .cds-motion-ripple-core {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--cds-primary-normal);
        }
        .cds-motion-ripple-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--cds-primary-normal);
          animation: cds-dot-ripple 1.6s var(--cds-ease-standard) infinite;
        }
      `}</style>
    </div>
  );
}

type TokenRow = { name: string; value: string; note?: string };
const DURATIONS: TokenRow[] = [
  { name: "--cds-duration-instant", value: "80ms", note: "tooltip 등장 등" },
  { name: "--cds-duration-fast", value: "150ms", note: "hover/focus 색 변경" },
  { name: "--cds-duration-normal", value: "200ms", note: "기본 transition" },
  { name: "--cds-duration-slow", value: "300ms", note: "fade-collapse" },
  { name: "--cds-duration-slower", value: "450ms", note: "step-in 기본" },
];
const EASINGS: TokenRow[] = [
  { name: "--cds-ease-linear", value: "linear" },
  { name: "--cds-ease-standard", value: "cubic-bezier(0.23, 1, 0.32, 1)", note: "★ 기본" },
  { name: "--cds-ease-in", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { name: "--cds-ease-out", value: "cubic-bezier(0, 0, 0.2, 1)" },
  { name: "--cds-ease-in-out", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { name: "--cds-ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
];

export function MotionTokenTable() {
  return (
    <div className="cds-motion-tables">
      <Table title="Duration" rows={DURATIONS} />
      <Table title="Easing" rows={EASINGS} />
      <style>{`
        .cds-motion-tables {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 16px 0;
        }
        .cds-motion-table {
          border: 1px solid var(--cds-line-solid-normal);
          border-radius: var(--cds-radius-lg);
          overflow: hidden;
        }
        .cds-motion-table h4 {
          margin: 0;
          padding: 10px 14px;
          font-size: var(--text-heading2);
          font-weight: var(--cds-font-weight-semibold);
          color: var(--cds-label-normal);
          background: var(--cds-background-normal-alternative);
          border-bottom: 1px solid var(--cds-line-solid-alternative);
        }
        .cds-motion-table-row {
          display: grid;
          grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr) minmax(0, 1fr);
          gap: 12px;
          padding: 8px 14px;
          border-bottom: 1px solid var(--cds-line-solid-alternative);
          align-items: center;
        }
        .cds-motion-table-row:last-child {
          border-bottom: none;
        }
        .cds-motion-table-row code {
          font-family: var(--cds-font-mono);
          font-size: var(--text-code);
          color: var(--cds-label-normal);
        }
        .cds-motion-table-row .cds-val {
          color: var(--cds-primary-normal);
        }
        .cds-motion-table-row .cds-note {
          font-size: var(--text-caption1);
          color: var(--cds-label-assistive);
        }
      `}</style>
    </div>
  );
}

function Table({ title, rows }: { title: string; rows: TokenRow[] }) {
  return (
    <section className="cds-motion-table">
      <h4>{title}</h4>
      {rows.map((r) => (
        <div key={r.name} className="cds-motion-table-row">
          <code>{r.name}</code>
          <code className="cds-val">{r.value}</code>
          <span className="cds-note">{r.note ?? ""}</span>
        </div>
      ))}
    </section>
  );
}
