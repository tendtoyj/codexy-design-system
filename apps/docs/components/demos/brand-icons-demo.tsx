"use client";

import {
  Anthropic,
  Antigravity,
  Claude,
  ClaudeCode,
  Codex,
  Copilot,
  Cursor,
  Gemini,
  GeminiCLI,
  Google,
  Grok,
  OpenAI,
  OpenCode,
  XAI,
} from "@tendtoyj/cds-icons/brands";
import type { ComponentType } from "react";

type BrandGlyph = ComponentType<{ size?: number; className?: string }>;

type BrandEntry = {
  name: string;
  Mono: BrandGlyph;
  Color?: BrandGlyph;
};

const BRANDS: BrandEntry[] = [
  { name: "Anthropic", Mono: Anthropic },
  { name: "OpenAI", Mono: OpenAI },
  { name: "Google", Mono: Google, Color: Google.Color },
  { name: "XAI", Mono: XAI },
  { name: "Claude", Mono: Claude, Color: Claude.Color },
  { name: "Gemini", Mono: Gemini, Color: Gemini.Color },
  { name: "Grok", Mono: Grok },
  { name: "ClaudeCode", Mono: ClaudeCode, Color: ClaudeCode.Color },
  { name: "Codex", Mono: Codex, Color: Codex.Color },
  { name: "GeminiCLI", Mono: GeminiCLI, Color: GeminiCLI.Color },
  { name: "OpenCode", Mono: OpenCode },
  { name: "Cursor", Mono: Cursor },
  { name: "Antigravity", Mono: Antigravity, Color: Antigravity.Color },
  { name: "Copilot", Mono: Copilot, Color: Copilot.Color },
];

export function BrandIconsGalleryDemo() {
  return (
    <div className="cds-brand-card">
      <div className="cds-brand-grid">
        {BRANDS.map(({ name, Mono, Color }) => (
          <div key={name} className="cds-brand-cell">
            <div className="cds-brand-glyphs">
              <Mono size={24} />
              {Color ? <Color size={24} /> : <span className="cds-brand-empty">—</span>}
            </div>
            <code>{name}</code>
            <div className="cds-brand-variants">
              <span>Mono</span>
              <span className={Color ? undefined : "cds-brand-na"}>{Color ? "Color" : "n/a"}</span>
            </div>
          </div>
        ))}
      </div>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-brand-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
      .cds-brand-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 16px;
      }
      .cds-brand-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px 12px;
        border: 1px solid var(--cds-line-normal-alternative);
        border-radius: var(--cds-radius-md);
      }
      .cds-brand-glyphs {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        min-height: 28px;
        color: var(--cds-label-normal);
      }
      .cds-brand-empty {
        color: var(--cds-label-disable);
        font-family: var(--cds-font-mono);
      }
      .cds-brand-cell code {
        font-family: var(--cds-font-mono);
        font-size: var(--text-caption1);
        color: var(--cds-label-normal);
      }
      .cds-brand-variants {
        display: flex;
        gap: 12px;
        font-family: var(--cds-font-mono);
        font-size: var(--text-caption2);
        color: var(--cds-label-alternative);
      }
      .cds-brand-na {
        color: var(--cds-label-disable);
      }
    `}</style>
  );
}
