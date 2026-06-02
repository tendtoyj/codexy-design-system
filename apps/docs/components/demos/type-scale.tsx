/**
 * 15 variant 타이포 스케일을 실물 샘플로 렌더.
 * 각 행: variant 이름 · size/line/letter-spacing · 한글 영문 혼용 샘플.
 */

type Variant = {
  name: string;
  size: string;
  line: string;
  tracking: string;
  mono?: boolean;
  note?: string;
};

const VARIANTS: Variant[] = [
  { name: "display1", size: "32", line: "42", tracking: "-0.0319em" },
  { name: "title1", size: "22", line: "30", tracking: "-0.0253em" },
  { name: "title2", size: "18", line: "26", tracking: "-0.0236em" },
  { name: "title3", size: "16", line: "22", tracking: "-0.023em" },
  { name: "heading1", size: "15", line: "22", tracking: "-0.0194em" },
  { name: "heading2", size: "14", line: "20", tracking: "-0.012em" },
  { name: "headline1", size: "14", line: "22", tracking: "-0.002em" },
  { name: "body1", size: "14", line: "22", tracking: "0.0057em", note: "★ 기본 본문" },
  { name: "body1-reading", size: "14", line: "24", tracking: "0.0057em" },
  { name: "body2", size: "13", line: "20", tracking: "0.0096em" },
  { name: "label1", size: "13", line: "18", tracking: "0.0145em" },
  { name: "label2", size: "12", line: "16", tracking: "0.0194em" },
  { name: "caption1", size: "11", line: "14", tracking: "0.0252em" },
  { name: "caption2", size: "10", line: "13", tracking: "0.0311em" },
  { name: "code", size: "13", line: "20", tracking: "0", mono: true },
];

const SAMPLE = "Pluto Design System — 디자인 시스템 MVP";
const SAMPLE_MONO = "const tokens = getPdsTokens();";

export function TypeScale() {
  return (
    <div className="pds-type-scale">
      {VARIANTS.map((v) => {
        const styleVar = `--text-${v.name}`;
        return (
          <article key={v.name} className="pds-type-row">
            <header className="pds-type-meta">
              <span className="pds-type-name">
                {v.name}
                {v.note ? <small className="pds-type-note"> {v.note}</small> : null}
              </span>
              <span className="pds-type-specs">
                {v.size} / {v.line} · tracking {v.tracking}
                {v.mono ? " · mono" : ""}
              </span>
            </header>
            <p
              className="pds-type-sample"
              style={{
                fontSize: `var(${styleVar})`,
                lineHeight: `var(${styleVar}--line-height)`,
                letterSpacing: `var(${styleVar}--letter-spacing)`,
                fontFamily: v.mono ? "var(--pds-font-mono)" : "var(--pds-font-sans)",
              }}
            >
              {v.mono ? SAMPLE_MONO : SAMPLE}
            </p>
          </article>
        );
      })}
      <style>{`
        .pds-type-scale {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 16px 0;
        }
        .pds-type-row {
          padding: 14px 16px;
          border: 1px solid var(--pds-line-solid-normal);
          border-radius: var(--pds-radius-lg);
          background: var(--pds-background-normal-normal);
        }
        .pds-type-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .pds-type-name {
          font-size: var(--text-label1);
          line-height: var(--text-label1--line-height);
          color: var(--pds-label-normal);
          font-weight: var(--pds-font-weight-semibold);
          font-variant-numeric: tabular-nums;
        }
        .pds-type-note {
          font-weight: var(--pds-font-weight-regular);
          color: var(--pds-primary-normal);
        }
        .pds-type-specs {
          font-family: var(--pds-font-mono);
          font-size: var(--text-caption1);
          line-height: var(--text-caption1--line-height);
          color: var(--pds-label-alternative);
        }
        .pds-type-sample {
          margin: 0;
          color: var(--pds-label-normal);
        }
      `}</style>
    </div>
  );
}
