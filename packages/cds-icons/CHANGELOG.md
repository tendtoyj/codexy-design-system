# @tendtoyj/cds-icons

## 0.3.0

## 0.2.2

### Patch Changes

- bbf6bed: Add six CDS-native status fill icons to `@tendtoyj/cds-icons/custom`: `CheckCircleFill`, `ExclamationCircleFill`, `InfoCircleFill`, `QuestionCircleFill`, `WarningTriangleFill`, and `XCircleFill`.

## 0.2.1

Fixed group version synchronization only; no consumer-visible icon changes.

## 0.2.0

## 0.1.2

## 0.1.1

### Patch Changes

- 2a873e3: Repair install/registry consumer flow surfaced by 0.1.0 dogfooding.
  - cds-ui: marked private (shadcn-copy only — was unintentionally publishing); 17 missing components registered (app-shell, sidebar-menu/list, action-card/tile, icon-button, text-button, panel, page-container, section-header, removable-tab-bar, full chat-\* family + chat-types lib + internal chat-copy-button); AppShell root switched to h-dvh
  - cds-markdown: built via tsup, ships dist with CSS auto-load (was raw .ts source)
  - cds-core: tailwind-merge bumped to v3 (Tailwind v4 alignment)
  - root + apps/docs: shadcn registry now hosted via Vercel build pipeline (`<host>/r/<name>.json`) — placeholder URL `codexy-design-system-docs.vercel.app`
  - root: silenced stale @emoji-mart/react React-18 peer cap (transitive of @lobehub/ui, runtime unused)

## 0.1.0

### Minor Changes

- 6cdfa90: **`@tendtoyj/cds-icons/brands` 서브패스 추가 — AI 모델/벤더/제품 브랜드 로고.**

  `@lobehub/icons` 위에 얹은 얇은 어댑터. CDS 의 phosphor 어댑터 컨벤션과 동일하게 공급자 직접 import 를 막고 단일 진입점으로만 노출.

  - 노출 브랜드 (14):
    - 회사: `Anthropic`, `OpenAI`, `Google`, `XAI`
    - 모델: `Claude`, `Gemini`, `Grok`
    - 코딩 에이전트 / IDE: `ClaudeCode`, `Codex`, `GeminiCLI`, `OpenCode`, `Cursor`, `Antigravity`, `Copilot`
  - 각 아이콘은 default = Mono, `.Color` 가 컴파운드 속성으로 붙어 있다 (있는 브랜드만). 브랜드 자체가 모노 마크인 경우(Anthropic, OpenAI, XAI, Grok, OpenCode, Cursor) Color 없음 — TS 가 호출 자체를 막음.
  - Allowlist 방식: 신규 브랜드는 `packages/cds-icons/src/brands/index.ts` 에 명시적으로 추가.
  - `@lobehub/icons` 는 external 처리 (consumer 쪽 트리쉐이킹).

- 2fe1899: **CDS v0.1 — Phase 1 Tier 1 기본 위젯 10개 이식 완료.**

  Wanted Montage 구조를 뼈대로, Radix headless + Tailwind v4 + `tailwind-variants` 로 번역·개량.

  ### cds-ui (신규)

  - `Separator` — Radix Separator, `--cds-line-*` 토큰, orientation/color/thickness
  - `Avatar` — Radix Avatar, 8단계 size (xs~4xl), person/company/academy
  - `Icon` — phosphor 래퍼 + cds-icons 슬롯, size(xs~xl) + semantic color
  - `Button` — 4 variant (primary/secondary/ghost/danger) × sm/md/lg, leading/trailing, loading, asChild
  - `Input` — 9 slot TextField, invalid/positive/disabled/readOnly, reset 버튼, leading/trailing/trailingButton
  - `Tooltip` — Radix Tooltip, size(sm/md), shortcut slot, mode(hover/always/click)
  - `DropdownMenu` — Item/CheckboxItem/RadioItem/Sub/Shortcut/Label/Separator
  - `Dialog` — popup/full × sm/md/lg/xl × fixed/free, Navigation/Body/ActionArea slots (bottom variant 제외)
  - `Toast` — info/success/warning/error, Radix Toast 기반
  - `ScrollArea` — Radix ScrollArea + macOS 얇은 스크롤바 hover-expand

  ### cds-icons

  - `tsup` config: `splitting: false` — Next.js 번들러의 `export *` 재노출 안정화

  ### 레지스트리

  - `packages/cds-ui/registry.json` — shadcn registry items 11개 (`utils` + 10 컴포넌트)
  - 소비: `npx shadcn add https://cds.codexy.com/r/{component}`

  ### 도구

  - `packages/cds-ui/src/utils/cn.ts` — clsx + tailwind-merge v3
  - 공통 deps: `@radix-ui/react-*`, `tailwind-variants`, `clsx`, `tailwind-merge@^3`, `@phosphor-icons/react`

  ### 문서

  - `apps/docs` — Components 섹션 신설, 10개 MDX + live demo
  - `apps/docs/app/global.css` — `@source` directive 로 cds-ui Tailwind 스캐닝
