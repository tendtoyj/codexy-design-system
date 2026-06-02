/**
 * AI 모델/벤더/제품 브랜드 로고 어댑터. lobehub/icons 위 얇은 재노출.
 *
 *   import { Anthropic, Claude } from "@fluxloop-ai/pds-icons/brands";
 *
 *   <Anthropic size={20} />        // Mono (default)
 *   <Claude.Color size={20} />     // Color (있는 브랜드만)
 *
 * 컴파운드: 각 아이콘은 default = Mono, `.Color` / `.Avatar` / `.Text` /
 * `.Combine` 가 브랜드별로 선택적으로 붙어 있다. TS 타입이 가용 여부를
 * 그대로 강제하므로 `<Anthropic.Color />` 처럼 없는 변형은 컴파일 에러로 막힌다.
 *
 * 공급자(@lobehub/icons) 직접 import 금지. 새 브랜드는 이 파일의 allowlist 에 추가.
 */

export {
  Anthropic,
  type AnthropicProps,
  Antigravity,
  type AntigravityProps,
  Claude,
  ClaudeCode,
  type ClaudeCodeProps,
  type ClaudeProps,
  Codex,
  type CodexProps,
  Copilot,
  type CopilotProps,
  Cursor,
  type CursorProps,
  Gemini,
  GeminiCLI,
  type GeminiCLIProps,
  type GeminiProps,
  Google,
  type GoogleProps,
  Grok,
  type GrokProps,
  OpenAI,
  type OpenAIProps,
  OpenCode,
  type OpenCodeProps,
  XAI,
  type XAIProps,
} from "@lobehub/icons";
