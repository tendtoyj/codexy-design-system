/**
 * shadow 3계열 × 5단계 시각화.
 * - box: 사각 카드 기본
 * - drop: SVG/비사각 외곽 (여기선 둥근 블롭 모양에 filter로 적용)
 * - glow: ambient halo (포커스/AI 글로우)
 */

const STEPS = ["xs", "sm", "md", "lg", "xl"] as const;
const GLOW_STEPS = ["sm", "md"] as const;

export function BoxShadowRow() {
  return (
    <div className="cds-shadow-row">
      {STEPS.map((step) => (
        <div key={step} className="cds-shadow-cell">
          <div className="cds-shadow-box" style={{ boxShadow: `var(--cds-shadow-${step})` }} />
          <code>shadow-{step}</code>
        </div>
      ))}
      <StyleBlock />
    </div>
  );
}

export function DropShadowRow() {
  return (
    <div className="cds-shadow-row">
      {STEPS.map((step) => (
        <div key={step} className="cds-shadow-cell">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            style={{ filter: `var(--cds-drop-${step})` }}
            aria-hidden="true"
          >
            <path
              d="M40 8 L68 24 L68 56 L40 72 L12 56 L12 24 Z"
              fill="var(--cds-background-normal-normal)"
              stroke="var(--cds-line-solid-normal)"
            />
          </svg>
          <code>drop-{step}</code>
        </div>
      ))}
      <StyleBlock />
    </div>
  );
}

export function GlowRow() {
  return (
    <div className="cds-shadow-row">
      {GLOW_STEPS.map((step) => (
        <div key={step} className="cds-shadow-cell">
          <div className="cds-shadow-box" style={{ boxShadow: `var(--cds-glow-${step})` }} />
          <code>glow-{step}</code>
        </div>
      ))}
      <StyleBlock />
    </div>
  );
}

function StyleBlock() {
  return (
    <style>{`
      .cds-shadow-row {
        display: flex;
        flex-wrap: wrap;
        gap: 28px;
        padding: 36px;
        background: var(--cds-background-normal-alternative);
        border-radius: var(--cds-radius-lg);
        margin: 16px 0;
      }
      .cds-shadow-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      .cds-shadow-cell code {
        font-family: var(--cds-font-mono);
        font-size: var(--text-caption1);
        color: var(--cds-label-alternative);
      }
      .cds-shadow-box {
        width: 80px;
        height: 80px;
        background: var(--cds-background-normal-normal);
        border: 1px solid var(--cds-line-solid-alternative);
        border-radius: var(--cds-radius-lg);
      }
    `}</style>
  );
}
