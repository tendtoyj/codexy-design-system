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
    <div className="pds-shadow-row">
      {STEPS.map((step) => (
        <div key={step} className="pds-shadow-cell">
          <div className="pds-shadow-box" style={{ boxShadow: `var(--pds-shadow-${step})` }} />
          <code>shadow-{step}</code>
        </div>
      ))}
      <StyleBlock />
    </div>
  );
}

export function DropShadowRow() {
  return (
    <div className="pds-shadow-row">
      {STEPS.map((step) => (
        <div key={step} className="pds-shadow-cell">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            style={{ filter: `var(--pds-drop-${step})` }}
            aria-hidden="true"
          >
            <path
              d="M40 8 L68 24 L68 56 L40 72 L12 56 L12 24 Z"
              fill="var(--pds-background-normal-normal)"
              stroke="var(--pds-line-solid-normal)"
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
    <div className="pds-shadow-row">
      {GLOW_STEPS.map((step) => (
        <div key={step} className="pds-shadow-cell">
          <div className="pds-shadow-box" style={{ boxShadow: `var(--pds-glow-${step})` }} />
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
      .pds-shadow-row {
        display: flex;
        flex-wrap: wrap;
        gap: 28px;
        padding: 36px;
        background: var(--pds-background-normal-alternative);
        border-radius: var(--pds-radius-lg);
        margin: 16px 0;
      }
      .pds-shadow-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      .pds-shadow-cell code {
        font-family: var(--pds-font-mono);
        font-size: var(--text-caption1);
        color: var(--pds-label-alternative);
      }
      .pds-shadow-box {
        width: 80px;
        height: 80px;
        background: var(--pds-background-normal-normal);
        border: 1px solid var(--pds-line-solid-alternative);
        border-radius: var(--pds-radius-lg);
      }
    `}</style>
  );
}
