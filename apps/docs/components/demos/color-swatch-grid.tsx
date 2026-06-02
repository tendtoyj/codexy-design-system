/**
 * Primitive 팔레트 시각화.
 * pds-core의 --pds-color-{hue}-{step} 변수 이름을 그대로 읽어 표시한다.
 * 값은 CSS 변수에서 온다 — 여기선 이름·스텝만 선언.
 */

type Hue = {
  name: string;
  slug: string;
  steps: number[];
};

const HUES: Hue[] = [
  {
    name: "Blue ★ primary",
    slug: "blue",
    steps: [10, 20, 30, 40, 45, 50, 55, 60, 65, 70, 80, 90, 95, 99],
  },
  {
    name: "Neutral",
    slug: "neutral",
    steps: [5, 10, 15, 20, 22, 30, 40, 50, 60, 70, 80, 90, 95, 99],
  },
  {
    name: "Cool Neutral",
    slug: "cool-neutral",
    steps: [5, 7, 10, 15, 17, 20, 22, 23, 25, 30, 40, 50, 60, 70, 80, 90, 95, 96, 97, 98, 99],
  },
  { name: "Common", slug: "common", steps: [0, 100] },
  { name: "Red", slug: "red", steps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99] },
  { name: "Green", slug: "green", steps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99] },
  { name: "Orange", slug: "orange", steps: [10, 20, 30, 39, 40, 50, 60, 70, 80, 90, 95, 99] },
  { name: "Violet", slug: "violet", steps: [10, 20, 30, 40, 45, 50, 60, 70, 80, 90, 95, 99] },
  { name: "Pink", slug: "pink", steps: [10, 20, 30, 40, 46, 50, 60, 70, 80, 90, 95, 99] },
  { name: "Cyan", slug: "cyan", steps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99] },
  { name: "Light Blue", slug: "light-blue", steps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99] },
  {
    name: "Red Orange",
    slug: "red-orange",
    steps: [10, 20, 30, 40, 48, 50, 60, 70, 80, 90, 95, 99],
  },
  { name: "Lime", slug: "lime", steps: [10, 20, 30, 37, 40, 50, 60, 70, 80, 90, 95, 99] },
  { name: "Purple", slug: "purple", steps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99] },
];

export function ColorSwatchGrid() {
  return (
    <div className="pds-swatch-grid">
      {HUES.map((hue) => (
        <section key={hue.slug} className="pds-swatch-row">
          <h4 className="pds-swatch-row-title">{hue.name}</h4>
          <div className="pds-swatch-row-cells">
            {hue.steps.map((step) => {
              const varName = `--pds-color-${hue.slug}-${step}`;
              return (
                <div key={step} className="pds-swatch-cell">
                  <div
                    role="img"
                    aria-label={`${hue.name} ${step}`}
                    className="pds-swatch-chip"
                    style={{ background: `var(${varName})` }}
                  />
                  <span className="pds-swatch-step">{step}</span>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <style>{`
        .pds-swatch-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 16px 0;
        }
        .pds-swatch-row-title {
          font-size: var(--text-heading2);
          line-height: var(--text-heading2--line-height);
          letter-spacing: var(--text-heading2--letter-spacing);
          font-weight: var(--pds-font-weight-semibold);
          margin: 0 0 8px;
          color: var(--pds-label-normal);
        }
        .pds-swatch-row-cells {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
          gap: 6px;
        }
        .pds-swatch-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: stretch;
          min-width: 0;
        }
        .pds-swatch-chip {
          aspect-ratio: 1 / 1;
          border-radius: var(--pds-radius-md);
          border: 1px solid var(--pds-line-solid-normal);
        }
        .pds-swatch-step {
          font-size: var(--text-caption1);
          line-height: var(--text-caption1--line-height);
          letter-spacing: var(--text-caption1--letter-spacing);
          color: var(--pds-label-alternative);
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
}
