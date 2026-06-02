/**
 * 9단계 radius 박스 샘플 + squircle on/off 비교.
 * 글로벌 squircle 은 cds-core reset.css 에서 모든 요소에 `corner-shape: squircle` 를 건다.
 * 여기서 squircle-off 열은 `corner-shape: round` 로 강제 오버라이드.
 */

const RADII = [
  { name: "0", value: "0", cssVar: "--cds-radius-0" },
  { name: "2", value: "2px", cssVar: "--cds-radius-2" },
  { name: "4", value: "4px", cssVar: "--cds-radius-4" },
  { name: "6", value: "6px", cssVar: "--cds-radius-6" },
  { name: "8", value: "8px", cssVar: "--cds-radius-8" },
  { name: "10", value: "10px", cssVar: "--cds-radius-10" },
  { name: "12", value: "12px", cssVar: "--cds-radius-12" },
  { name: "16", value: "16px", cssVar: "--cds-radius-16" },
  { name: "full", value: "9999px", cssVar: "--cds-radius-full" },
];

export function RadiusGrid() {
  return (
    <div className="cds-radius-grid">
      {RADII.map((r) => (
        <article key={r.name} className="cds-radius-card">
          <div
            className="cds-radius-swatch"
            style={{ borderRadius: `var(${r.cssVar})` }}
            aria-hidden="true"
          />
          <div className="cds-radius-meta">
            <strong>{r.name}</strong>
            <code>{r.value}</code>
          </div>
        </article>
      ))}
      <style>{`
        .cds-radius-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
          margin: 16px 0;
        }
        .cds-radius-card {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          padding: 12px;
          border: 1px solid var(--cds-line-solid-normal);
          border-radius: var(--cds-radius-lg);
          background: var(--cds-background-normal-normal);
        }
        .cds-radius-swatch {
          aspect-ratio: 1 / 1;
          background: linear-gradient(135deg, var(--cds-color-blue-70), var(--cds-color-violet-60));
          border: 1px solid var(--cds-line-solid-normal);
        }
        .cds-radius-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 6px;
        }
        .cds-radius-meta strong {
          font-size: var(--text-label1);
          color: var(--cds-label-normal);
          font-weight: var(--cds-font-weight-semibold);
        }
        .cds-radius-meta code {
          font-family: var(--cds-font-mono);
          font-size: var(--text-caption1);
          color: var(--cds-label-alternative);
        }
      `}</style>
    </div>
  );
}

export function SquircleCompare() {
  return (
    <div className="cds-squircle-compare">
      <figure className="cds-squircle-item">
        <div className="cds-squircle-box" data-mode="on" />
        <figcaption>squircle (CDS 기본)</figcaption>
      </figure>
      <figure className="cds-squircle-item">
        <div className="cds-squircle-box" data-mode="off" />
        <figcaption>round (CSS 표준)</figcaption>
      </figure>
      <style>{`
        .cds-squircle-compare {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 16px 0;
        }
        .cds-squircle-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px;
          border: 1px solid var(--cds-line-solid-normal);
          border-radius: var(--cds-radius-lg);
          background: var(--cds-background-normal-normal);
        }
        .cds-squircle-item figcaption {
          font-size: var(--text-body2);
          color: var(--cds-label-alternative);
        }
        .cds-squircle-box {
          width: 120px;
          height: 120px;
          border-radius: 28px;
          background: linear-gradient(135deg, var(--cds-primary-normal), var(--cds-color-violet-60));
          -electron-corner-smoothing: var(--cds-corner-smoothing);
        }
        .cds-squircle-box[data-mode="off"] {
          corner-shape: round;
          -electron-corner-smoothing: 0;
        }
      `}</style>
    </div>
  );
}
