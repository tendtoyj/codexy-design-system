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
    name: "pds-fade-in-up",
    util: ".pds-animate-step-in",
    description: "메시지 6px step-in — 채팅 말풍선 기본",
    duration: "duration-slower (450ms)",
    render: (k) => (
      <div
        key={k}
        className="pds-motion-box pds-animate-step-in"
        style={{ background: "var(--pds-primary-normal)", color: "var(--pds-color-common-100)" }}
      >
        step-in
      </div>
    ),
  },
  {
    id: "fade-in-card",
    name: "pds-fade-in-card",
    util: ".pds-animate-card-in",
    description: "카드 10px 등장 (500ms)",
    duration: "500ms",
    render: (k) => (
      <div key={k} className="pds-motion-card pds-animate-card-in">
        card
      </div>
    ),
  },
  {
    id: "fade-collapse",
    name: "pds-fade-collapse",
    description: "섹션 접기 (max-height → 0). --pds-collapse-from 로 시작 높이 제어",
    duration: "duration-normal (200ms)",
    render: (k) => (
      <div
        key={k}
        className="pds-motion-collapse"
        style={{
          background: "var(--pds-background-normal-alternative)",
          color: "var(--pds-label-normal)",
          padding: "8px 12px",
          border: "1px solid var(--pds-line-solid-normal)",
          borderRadius: "var(--pds-radius-md)",
          animation: "pds-fade-collapse var(--pds-duration-slow) var(--pds-ease-standard) forwards",
          ["--pds-collapse-from" as string]: "80px",
        }}
      >
        접히는 섹션
      </div>
    ),
  },
  {
    id: "dot-pulse",
    name: "pds-dot-pulse",
    util: ".pds-animate-dot-pulse",
    description: "단일 점 펄스 (scale 0.85↔1, opacity 0.5↔1)",
    duration: "1.4s loop",
    render: (k) => (
      <span
        key={k}
        className="pds-animate-dot-pulse"
        style={{ width: 8, height: 8, color: "var(--pds-primary-normal)" }}
      />
    ),
  },
  {
    id: "dot-ripple",
    name: "pds-dot-ripple",
    description: "Agent 상태 pulse — idle dot 주변 ripple",
    duration: "1.6s loop",
    render: (k) => (
      <div key={k} className="pds-motion-ripple">
        <span className="pds-motion-ripple-core" />
        <span className="pds-motion-ripple-ring" />
      </div>
    ),
  },
  {
    id: "shimmer",
    name: "pds-shimmer",
    util: ".pds-animate-shimmer",
    description: "스켈레톤 로더 (1.6s linear 루프)",
    duration: "1.6s loop",
    render: (k) => (
      <div
        key={k}
        className="pds-animate-shimmer"
        style={{
          width: "200px",
          height: "14px",
          borderRadius: "var(--pds-radius-sm)",
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
    <div className="pds-motion-demo">
      {KEYFRAMES.map((kf) => (
        <article key={kf.id} className="pds-motion-item">
          <header className="pds-motion-item-meta">
            <code className="pds-motion-name">@keyframes {kf.name}</code>
            <span className="pds-motion-dur">{kf.duration}</span>
          </header>
          <p className="pds-motion-desc">{kf.description}</p>
          {kf.util ? <code className="pds-motion-util">{kf.util}</code> : null}
          <div className="pds-motion-stage">{kf.render(playTick[kf.id] ?? 0)}</div>
          <button type="button" className="pds-motion-play" onClick={() => play(kf.id)}>
            ▸ 재생
          </button>
        </article>
      ))}
      <style>{`
        .pds-motion-demo {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
          margin: 16px 0;
        }
        .pds-motion-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 14px;
          border: 1px solid var(--pds-line-solid-normal);
          border-radius: var(--pds-radius-lg);
          background: var(--pds-background-normal-normal);
        }
        .pds-motion-item-meta {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pds-motion-name {
          font-family: var(--pds-font-mono);
          font-size: var(--text-label1);
          color: var(--pds-label-normal);
          font-weight: var(--pds-font-weight-semibold);
        }
        .pds-motion-dur {
          font-size: var(--text-caption1);
          color: var(--pds-label-alternative);
        }
        .pds-motion-desc {
          margin: 0;
          font-size: var(--text-body2);
          line-height: var(--text-body2--line-height);
          color: var(--pds-label-neutral);
        }
        .pds-motion-util {
          font-family: var(--pds-font-mono);
          font-size: var(--text-caption1);
          color: var(--pds-primary-normal);
        }
        .pds-motion-stage {
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          background: var(--pds-background-normal-alternative);
          border-radius: var(--pds-radius-md);
          overflow: hidden;
        }
        .pds-motion-play {
          align-self: flex-start;
          padding: 4px 10px;
          font-size: var(--text-label2);
          font-family: var(--pds-font-sans);
          border: 1px solid var(--pds-line-solid-normal);
          border-radius: var(--pds-radius-md);
          background: var(--pds-background-normal-normal);
          color: var(--pds-label-normal);
          cursor: pointer;
          transition: var(--pds-transition-all);
        }
        .pds-motion-play:hover {
          border-color: var(--pds-primary-normal);
          color: var(--pds-primary-normal);
        }
        .pds-motion-box {
          padding: 8px 14px;
          border-radius: var(--pds-radius-md);
          font-size: var(--text-body2);
        }
        .pds-motion-card {
          padding: 10px 14px;
          border-radius: var(--pds-radius-lg);
          border: 1px solid var(--pds-line-solid-normal);
          background: var(--pds-background-normal-normal);
          box-shadow: var(--pds-shadow-sm);
          color: var(--pds-label-normal);
          font-size: var(--text-body2);
        }
        .pds-motion-collapse {
          overflow: hidden;
        }
        .pds-motion-ripple {
          position: relative;
          width: 10px;
          height: 10px;
        }
        .pds-motion-ripple-core {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--pds-primary-normal);
        }
        .pds-motion-ripple-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--pds-primary-normal);
          animation: pds-dot-ripple 1.6s var(--pds-ease-standard) infinite;
        }
      `}</style>
    </div>
  );
}

type TokenRow = { name: string; value: string; note?: string };
const DURATIONS: TokenRow[] = [
  { name: "--pds-duration-instant", value: "80ms", note: "tooltip 등장 등" },
  { name: "--pds-duration-fast", value: "150ms", note: "hover/focus 색 변경" },
  { name: "--pds-duration-normal", value: "200ms", note: "기본 transition" },
  { name: "--pds-duration-slow", value: "300ms", note: "fade-collapse" },
  { name: "--pds-duration-slower", value: "450ms", note: "step-in 기본" },
];
const EASINGS: TokenRow[] = [
  { name: "--pds-ease-linear", value: "linear" },
  { name: "--pds-ease-standard", value: "cubic-bezier(0.23, 1, 0.32, 1)", note: "★ 기본" },
  { name: "--pds-ease-in", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { name: "--pds-ease-out", value: "cubic-bezier(0, 0, 0.2, 1)" },
  { name: "--pds-ease-in-out", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { name: "--pds-ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
];

export function MotionTokenTable() {
  return (
    <div className="pds-motion-tables">
      <Table title="Duration" rows={DURATIONS} />
      <Table title="Easing" rows={EASINGS} />
      <style>{`
        .pds-motion-tables {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 16px 0;
        }
        .pds-motion-table {
          border: 1px solid var(--pds-line-solid-normal);
          border-radius: var(--pds-radius-lg);
          overflow: hidden;
        }
        .pds-motion-table h4 {
          margin: 0;
          padding: 10px 14px;
          font-size: var(--text-heading2);
          font-weight: var(--pds-font-weight-semibold);
          color: var(--pds-label-normal);
          background: var(--pds-background-normal-alternative);
          border-bottom: 1px solid var(--pds-line-solid-alternative);
        }
        .pds-motion-table-row {
          display: grid;
          grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr) minmax(0, 1fr);
          gap: 12px;
          padding: 8px 14px;
          border-bottom: 1px solid var(--pds-line-solid-alternative);
          align-items: center;
        }
        .pds-motion-table-row:last-child {
          border-bottom: none;
        }
        .pds-motion-table-row code {
          font-family: var(--pds-font-mono);
          font-size: var(--text-code);
          color: var(--pds-label-normal);
        }
        .pds-motion-table-row .pds-val {
          color: var(--pds-primary-normal);
        }
        .pds-motion-table-row .pds-note {
          font-size: var(--text-caption1);
          color: var(--pds-label-assistive);
        }
      `}</style>
    </div>
  );
}

function Table({ title, rows }: { title: string; rows: TokenRow[] }) {
  return (
    <section className="pds-motion-table">
      <h4>{title}</h4>
      {rows.map((r) => (
        <div key={r.name} className="pds-motion-table-row">
          <code>{r.name}</code>
          <code className="pds-val">{r.value}</code>
          <span className="pds-note">{r.note ?? ""}</span>
        </div>
      ))}
    </section>
  );
}
