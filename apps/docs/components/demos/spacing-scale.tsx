/**
 * 20-step spacing 스케일을 가로 막대로 시각화.
 * 막대 길이는 실제 px. Tailwind v4 --spacing-{step} 값 그대로.
 */

const STEPS = [
  { label: "0", px: 0 },
  { label: "0.5", px: 0.5 },
  { label: "1", px: 1 },
  { label: "2", px: 2 },
  { label: "4", px: 4 },
  { label: "6", px: 6 },
  { label: "8", px: 8 },
  { label: "10", px: 10 },
  { label: "12", px: 12 },
  { label: "14", px: 14 },
  { label: "16", px: 16 },
  { label: "20", px: 20 },
  { label: "24", px: 24 },
  { label: "32", px: 32 },
  { label: "40", px: 40 },
  { label: "48", px: 48 },
  { label: "56", px: 56 },
  { label: "64", px: 64 },
  { label: "72", px: 72 },
  { label: "80", px: 80 },
];

export function SpacingScale() {
  return (
    <div className="pds-spacing-scale">
      {STEPS.map((s) => (
        <div key={s.label} className="pds-spacing-row">
          <code className="pds-spacing-label">spacing-{s.label}</code>
          <span className="pds-spacing-px">{s.px}px</span>
          <div
            className="pds-spacing-bar"
            style={{ width: `max(1px, ${s.px}px)` }}
            aria-hidden="true"
          />
        </div>
      ))}
      <style>{`
        .pds-spacing-scale {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 16px 0;
          padding: 16px;
          border: 1px solid var(--pds-line-solid-normal);
          border-radius: var(--pds-radius-lg);
          background: var(--pds-background-normal-normal);
        }
        .pds-spacing-row {
          display: grid;
          grid-template-columns: 140px 56px 1fr;
          align-items: center;
          gap: 12px;
        }
        .pds-spacing-label {
          font-family: var(--pds-font-mono);
          font-size: var(--text-code);
          color: var(--pds-label-normal);
        }
        .pds-spacing-px {
          font-size: var(--text-caption1);
          line-height: var(--text-caption1--line-height);
          color: var(--pds-label-alternative);
          font-variant-numeric: tabular-nums;
          text-align: right;
        }
        .pds-spacing-bar {
          height: 14px;
          background: var(--pds-primary-normal);
          border-radius: var(--pds-radius-xs);
        }
      `}</style>
    </div>
  );
}
