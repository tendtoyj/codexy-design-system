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
} from "@fluxloop-ai/pds-icons/brands";
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
    <div className="pds-brand-card">
      <div className="pds-brand-grid">
        {BRANDS.map(({ name, Mono, Color }) => (
          <div key={name} className="pds-brand-cell">
            <div className="pds-brand-glyphs">
              <Mono size={24} />
              {Color ? <Color size={24} /> : <span className="pds-brand-empty">—</span>}
            </div>
            <code>{name}</code>
            <div className="pds-brand-variants">
              <span>Mono</span>
              <span className={Color ? undefined : "pds-brand-na"}>{Color ? "Color" : "n/a"}</span>
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
      .pds-brand-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-brand-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 16px;
      }
      .pds-brand-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px 12px;
        border: 1px solid var(--pds-line-normal-alternative);
        border-radius: var(--pds-radius-md);
      }
      .pds-brand-glyphs {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        min-height: 28px;
        color: var(--pds-label-normal);
      }
      .pds-brand-empty {
        color: var(--pds-label-disable);
        font-family: var(--pds-font-mono);
      }
      .pds-brand-cell code {
        font-family: var(--pds-font-mono);
        font-size: var(--text-caption1);
        color: var(--pds-label-normal);
      }
      .pds-brand-variants {
        display: flex;
        gap: 12px;
        font-family: var(--pds-font-mono);
        font-size: var(--text-caption2);
        color: var(--pds-label-alternative);
      }
      .pds-brand-na {
        color: var(--pds-label-disable);
      }
    `}</style>
  );
}
