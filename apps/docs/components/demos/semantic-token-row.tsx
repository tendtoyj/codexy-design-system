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
        variable: "--cds-primary-normal",
        note: "브랜드 기본 (cool-neutral.15)",
      },
      { name: "primary-strong", variable: "--cds-primary-strong" },
      { name: "primary-heavy", variable: "--cds-primary-heavy" },
      { name: "focus-ring", variable: "--cds-focus-ring", note: "포커스 전용 (blue.50)" },
    ],
  },
  {
    title: "Label",
    items: [
      { name: "label-normal", variable: "--cds-label-normal", note: "본문 기본" },
      { name: "label-strong", variable: "--cds-label-strong" },
      { name: "label-neutral", variable: "--cds-label-neutral", note: "alpha 88%" },
      { name: "label-alternative", variable: "--cds-label-alternative", note: "alpha 61%" },
      { name: "label-assistive", variable: "--cds-label-assistive", note: "alpha 28%" },
      { name: "label-disable", variable: "--cds-label-disable", note: "alpha 16%" },
    ],
  },
  {
    title: "Background",
    items: [
      { name: "background-normal-normal", variable: "--cds-background-normal-normal" },
      { name: "background-normal-alternative", variable: "--cds-background-normal-alternative" },
      { name: "background-elevated-normal", variable: "--cds-background-elevated-normal" },
      {
        name: "background-elevated-alternative",
        variable: "--cds-background-elevated-alternative",
      },
      {
        name: "background-transparent-normal",
        variable: "--cds-background-transparent-normal",
        note: "alpha 8%",
      },
      {
        name: "background-transparent-alternative",
        variable: "--cds-background-transparent-alternative",
        note: "alpha 28%",
      },
    ],
  },
  {
    title: "Interaction",
    items: [
      { name: "interaction-inactive", variable: "--cds-interaction-inactive" },
      { name: "interaction-disable", variable: "--cds-interaction-disable" },
    ],
  },
  {
    title: "Line",
    items: [
      { name: "line-normal-normal", variable: "--cds-line-normal-normal", note: "alpha" },
      { name: "line-normal-neutral", variable: "--cds-line-normal-neutral", note: "alpha" },
      { name: "line-normal-alternative", variable: "--cds-line-normal-alternative", note: "alpha" },
      { name: "line-solid-normal", variable: "--cds-line-solid-normal" },
      { name: "line-solid-neutral", variable: "--cds-line-solid-neutral" },
      { name: "line-solid-alternative", variable: "--cds-line-solid-alternative" },
    ],
  },
  {
    title: "Status",
    items: [
      { name: "status-positive", variable: "--cds-status-positive" },
      { name: "status-cautionary", variable: "--cds-status-cautionary" },
      { name: "status-negative", variable: "--cds-status-negative" },
    ],
  },
  {
    title: "Accent · Background",
    items: [
      { name: "accent-background-red-orange", variable: "--cds-accent-background-red-orange" },
      { name: "accent-background-lime", variable: "--cds-accent-background-lime" },
      { name: "accent-background-cyan", variable: "--cds-accent-background-cyan" },
      { name: "accent-background-light-blue", variable: "--cds-accent-background-light-blue" },
      { name: "accent-background-violet", variable: "--cds-accent-background-violet" },
      { name: "accent-background-purple", variable: "--cds-accent-background-purple" },
      { name: "accent-background-pink", variable: "--cds-accent-background-pink" },
    ],
  },
  {
    title: "Accent · Foreground",
    items: [
      { name: "accent-foreground-red", variable: "--cds-accent-foreground-red" },
      { name: "accent-foreground-red-orange", variable: "--cds-accent-foreground-red-orange" },
      { name: "accent-foreground-orange", variable: "--cds-accent-foreground-orange" },
      { name: "accent-foreground-lime", variable: "--cds-accent-foreground-lime" },
      { name: "accent-foreground-green", variable: "--cds-accent-foreground-green" },
      { name: "accent-foreground-cyan", variable: "--cds-accent-foreground-cyan" },
      { name: "accent-foreground-light-blue", variable: "--cds-accent-foreground-light-blue" },
      { name: "accent-foreground-blue", variable: "--cds-accent-foreground-blue" },
      { name: "accent-foreground-violet", variable: "--cds-accent-foreground-violet" },
      { name: "accent-foreground-purple", variable: "--cds-accent-foreground-purple" },
      { name: "accent-foreground-pink", variable: "--cds-accent-foreground-pink" },
    ],
  },
  {
    title: "Inverse",
    items: [
      { name: "inverse-primary", variable: "--cds-inverse-primary" },
      { name: "inverse-background", variable: "--cds-inverse-background" },
      { name: "inverse-label", variable: "--cds-inverse-label" },
    ],
  },
  {
    title: "Fill · Material",
    items: [
      { name: "fill-normal", variable: "--cds-fill-normal", note: "alpha 8%" },
      { name: "fill-strong", variable: "--cds-fill-strong", note: "alpha 16%" },
      { name: "fill-alternative", variable: "--cds-fill-alternative", note: "alpha 5%" },
      { name: "material-dimmer", variable: "--cds-material-dimmer", note: "모달 백드롭 52%" },
    ],
  },
];

const CHAT_TOKENS: TokenEntry[] = [
  { name: "chat-dot-idle", variable: "--cds-chat-dot-idle", note: "→ label-assistive" },
  { name: "chat-dot-done", variable: "--cds-chat-dot-done", note: "→ status-positive" },
  { name: "chat-dot-error", variable: "--cds-chat-dot-error", note: "→ status-negative" },
  { name: "chat-dot-action", variable: "--cds-chat-dot-action", note: "→ status-cautionary" },
];

function TokenList({ items }: { items: TokenEntry[] }) {
  return (
    <ul className="cds-token-list">
      {items.map((t) => (
        <li key={t.variable} className="cds-token-row">
          <span className="cds-token-checker">
            <span className="cds-token-chip" style={{ background: `var(${t.variable})` }} />
          </span>
          <span className="cds-token-name">{t.name}</span>
          <code className="cds-token-var">{t.variable}</code>
          {t.note ? <span className="cds-token-note">{t.note}</span> : <span />}
        </li>
      ))}
    </ul>
  );
}

export function SemanticTokenList() {
  return (
    <div className="cds-token-sections">
      {SEMANTIC_SECTIONS.map((section) => (
        <section key={section.title}>
          <h4 className="cds-token-section-title">{section.title}</h4>
          <TokenList items={section.items} />
        </section>
      ))}
      <StyleBlock />
    </div>
  );
}

export function ChatTokenList() {
  return (
    <div className="cds-token-sections">
      <TokenList items={CHAT_TOKENS} />
      <StyleBlock />
    </div>
  );
}

function StyleBlock() {
  return (
    <style>{`
      .cds-token-sections {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin: 16px 0;
      }
      .cds-token-section-title {
        font-size: var(--text-heading2);
        line-height: var(--text-heading2--line-height);
        letter-spacing: var(--text-heading2--letter-spacing);
        font-weight: var(--cds-font-weight-semibold);
        color: var(--cds-label-normal);
        margin: 0 0 8px;
      }
      .cds-token-list {
        list-style: none;
        padding: 0;
        margin: 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        overflow: hidden;
      }
      .cds-token-row {
        display: grid;
        grid-template-columns: 36px minmax(180px, 1fr) minmax(220px, 2fr) minmax(0, 1.2fr);
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border-bottom: 1px solid var(--cds-line-solid-alternative);
      }
      .cds-token-row:last-child {
        border-bottom: none;
      }
      .cds-token-checker {
        width: 28px;
        height: 28px;
        border-radius: var(--cds-radius-sm);
        background-image:
          linear-gradient(45deg, var(--cds-line-solid-normal) 25%, transparent 25%),
          linear-gradient(-45deg, var(--cds-line-solid-normal) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, var(--cds-line-solid-normal) 75%),
          linear-gradient(-45deg, transparent 75%, var(--cds-line-solid-normal) 75%);
        background-size: 8px 8px;
        background-position: 0 0, 0 4px, 4px -4px, -4px 0;
        overflow: hidden;
        position: relative;
      }
      .cds-token-chip {
        position: absolute;
        inset: 0;
      }
      .cds-token-name {
        font-size: var(--text-body2);
        line-height: var(--text-body2--line-height);
        color: var(--cds-label-normal);
        font-weight: var(--cds-font-weight-medium);
      }
      .cds-token-var {
        font-family: var(--cds-font-mono);
        font-size: var(--text-code);
        line-height: var(--text-code--line-height);
        color: var(--cds-label-alternative);
        white-space: nowrap;
        overflow-x: auto;
      }
      .cds-token-note {
        font-size: var(--text-caption1);
        line-height: var(--text-caption1--line-height);
        color: var(--cds-label-assistive);
      }
    `}</style>
  );
}
