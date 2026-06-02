/**
 * Semantic / chat 토큰을 이름 + 실제 색 미리보기로 나열.
 * 알파가 섞인 토큰(label-alternative 등)은 투명 배경 위에서 확인 가능하도록
 * 체커보드 위에 얹는다.
 */

type TokenEntry = {
  name: string;
  variable: string;
  note?: string;
};

type Section = {
  title: string;
  items: TokenEntry[];
};

const SEMANTIC_SECTIONS: Section[] = [
  {
    title: "Primary",
    items: [
      {
        name: "primary-normal",
        variable: "--pds-primary-normal",
        note: "브랜드 기본 (cool-neutral.15)",
      },
      { name: "primary-strong", variable: "--pds-primary-strong" },
      { name: "primary-heavy", variable: "--pds-primary-heavy" },
      { name: "focus-ring", variable: "--pds-focus-ring", note: "포커스 전용 (blue.50)" },
    ],
  },
  {
    title: "Label",
    items: [
      { name: "label-normal", variable: "--pds-label-normal", note: "본문 기본" },
      { name: "label-strong", variable: "--pds-label-strong" },
      { name: "label-neutral", variable: "--pds-label-neutral", note: "alpha 88%" },
      { name: "label-alternative", variable: "--pds-label-alternative", note: "alpha 61%" },
      { name: "label-assistive", variable: "--pds-label-assistive", note: "alpha 28%" },
      { name: "label-disable", variable: "--pds-label-disable", note: "alpha 16%" },
    ],
  },
  {
    title: "Background",
    items: [
      { name: "background-normal-normal", variable: "--pds-background-normal-normal" },
      { name: "background-normal-alternative", variable: "--pds-background-normal-alternative" },
      { name: "background-elevated-normal", variable: "--pds-background-elevated-normal" },
      {
        name: "background-elevated-alternative",
        variable: "--pds-background-elevated-alternative",
      },
      {
        name: "background-transparent-normal",
        variable: "--pds-background-transparent-normal",
        note: "alpha 8%",
      },
      {
        name: "background-transparent-alternative",
        variable: "--pds-background-transparent-alternative",
        note: "alpha 28%",
      },
    ],
  },
  {
    title: "Interaction",
    items: [
      { name: "interaction-inactive", variable: "--pds-interaction-inactive" },
      { name: "interaction-disable", variable: "--pds-interaction-disable" },
    ],
  },
  {
    title: "Line",
    items: [
      { name: "line-normal-normal", variable: "--pds-line-normal-normal", note: "alpha" },
      { name: "line-normal-neutral", variable: "--pds-line-normal-neutral", note: "alpha" },
      { name: "line-normal-alternative", variable: "--pds-line-normal-alternative", note: "alpha" },
      { name: "line-solid-normal", variable: "--pds-line-solid-normal" },
      { name: "line-solid-neutral", variable: "--pds-line-solid-neutral" },
      { name: "line-solid-alternative", variable: "--pds-line-solid-alternative" },
    ],
  },
  {
    title: "Status",
    items: [
      { name: "status-positive", variable: "--pds-status-positive" },
      { name: "status-cautionary", variable: "--pds-status-cautionary" },
      { name: "status-negative", variable: "--pds-status-negative" },
    ],
  },
  {
    title: "Accent · Background",
    items: [
      { name: "accent-background-red-orange", variable: "--pds-accent-background-red-orange" },
      { name: "accent-background-lime", variable: "--pds-accent-background-lime" },
      { name: "accent-background-cyan", variable: "--pds-accent-background-cyan" },
      { name: "accent-background-light-blue", variable: "--pds-accent-background-light-blue" },
      { name: "accent-background-violet", variable: "--pds-accent-background-violet" },
      { name: "accent-background-purple", variable: "--pds-accent-background-purple" },
      { name: "accent-background-pink", variable: "--pds-accent-background-pink" },
    ],
  },
  {
    title: "Accent · Foreground",
    items: [
      { name: "accent-foreground-red", variable: "--pds-accent-foreground-red" },
      { name: "accent-foreground-red-orange", variable: "--pds-accent-foreground-red-orange" },
      { name: "accent-foreground-orange", variable: "--pds-accent-foreground-orange" },
      { name: "accent-foreground-lime", variable: "--pds-accent-foreground-lime" },
      { name: "accent-foreground-green", variable: "--pds-accent-foreground-green" },
      { name: "accent-foreground-cyan", variable: "--pds-accent-foreground-cyan" },
      { name: "accent-foreground-light-blue", variable: "--pds-accent-foreground-light-blue" },
      { name: "accent-foreground-blue", variable: "--pds-accent-foreground-blue" },
      { name: "accent-foreground-violet", variable: "--pds-accent-foreground-violet" },
      { name: "accent-foreground-purple", variable: "--pds-accent-foreground-purple" },
      { name: "accent-foreground-pink", variable: "--pds-accent-foreground-pink" },
    ],
  },
  {
    title: "Inverse",
    items: [
      { name: "inverse-primary", variable: "--pds-inverse-primary" },
      { name: "inverse-background", variable: "--pds-inverse-background" },
      { name: "inverse-label", variable: "--pds-inverse-label" },
    ],
  },
  {
    title: "Fill · Material",
    items: [
      { name: "fill-normal", variable: "--pds-fill-normal", note: "alpha 8%" },
      { name: "fill-strong", variable: "--pds-fill-strong", note: "alpha 16%" },
      { name: "fill-alternative", variable: "--pds-fill-alternative", note: "alpha 5%" },
      { name: "material-dimmer", variable: "--pds-material-dimmer", note: "모달 백드롭 52%" },
    ],
  },
];

const CHAT_TOKENS: TokenEntry[] = [
  { name: "chat-dot-idle", variable: "--pds-chat-dot-idle", note: "→ label-assistive" },
  { name: "chat-dot-done", variable: "--pds-chat-dot-done", note: "→ status-positive" },
  { name: "chat-dot-error", variable: "--pds-chat-dot-error", note: "→ status-negative" },
  { name: "chat-dot-action", variable: "--pds-chat-dot-action", note: "→ status-cautionary" },
];

function TokenList({ items }: { items: TokenEntry[] }) {
  return (
    <ul className="pds-token-list">
      {items.map((t) => (
        <li key={t.variable} className="pds-token-row">
          <span className="pds-token-checker">
            <span className="pds-token-chip" style={{ background: `var(${t.variable})` }} />
          </span>
          <span className="pds-token-name">{t.name}</span>
          <code className="pds-token-var">{t.variable}</code>
          {t.note ? <span className="pds-token-note">{t.note}</span> : <span />}
        </li>
      ))}
    </ul>
  );
}

export function SemanticTokenList() {
  return (
    <div className="pds-token-sections">
      {SEMANTIC_SECTIONS.map((section) => (
        <section key={section.title}>
          <h4 className="pds-token-section-title">{section.title}</h4>
          <TokenList items={section.items} />
        </section>
      ))}
      <StyleBlock />
    </div>
  );
}

export function ChatTokenList() {
  return (
    <div className="pds-token-sections">
      <TokenList items={CHAT_TOKENS} />
      <StyleBlock />
    </div>
  );
}

function StyleBlock() {
  return (
    <style>{`
      .pds-token-sections {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin: 16px 0;
      }
      .pds-token-section-title {
        font-size: var(--text-heading2);
        line-height: var(--text-heading2--line-height);
        letter-spacing: var(--text-heading2--letter-spacing);
        font-weight: var(--pds-font-weight-semibold);
        color: var(--pds-label-normal);
        margin: 0 0 8px;
      }
      .pds-token-list {
        list-style: none;
        padding: 0;
        margin: 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        overflow: hidden;
      }
      .pds-token-row {
        display: grid;
        grid-template-columns: 36px minmax(180px, 1fr) minmax(220px, 2fr) minmax(0, 1.2fr);
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border-bottom: 1px solid var(--pds-line-solid-alternative);
      }
      .pds-token-row:last-child {
        border-bottom: none;
      }
      .pds-token-checker {
        width: 28px;
        height: 28px;
        border-radius: var(--pds-radius-sm);
        background-image:
          linear-gradient(45deg, var(--pds-line-solid-normal) 25%, transparent 25%),
          linear-gradient(-45deg, var(--pds-line-solid-normal) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, var(--pds-line-solid-normal) 75%),
          linear-gradient(-45deg, transparent 75%, var(--pds-line-solid-normal) 75%);
        background-size: 8px 8px;
        background-position: 0 0, 0 4px, 4px -4px, -4px 0;
        overflow: hidden;
        position: relative;
      }
      .pds-token-chip {
        position: absolute;
        inset: 0;
      }
      .pds-token-name {
        font-size: var(--text-body2);
        line-height: var(--text-body2--line-height);
        color: var(--pds-label-normal);
        font-weight: var(--pds-font-weight-medium);
      }
      .pds-token-var {
        font-family: var(--pds-font-mono);
        font-size: var(--text-code);
        line-height: var(--text-code--line-height);
        color: var(--pds-label-alternative);
        white-space: nowrap;
        overflow-x: auto;
      }
      .pds-token-note {
        font-size: var(--text-caption1);
        line-height: var(--text-caption1--line-height);
        color: var(--pds-label-assistive);
      }
    `}</style>
  );
}
