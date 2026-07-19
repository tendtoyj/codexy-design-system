# @tendtoyj/cds-core

## 0.3.1

## 0.3.0

## 0.2.2

### Patch Changes

- bbf6bed: Publish `0.2.2` as the synchronized PDS→CDS migration baseline. Runtime token values remain compatible with the density-aware `0.2.1` release; release metadata now ties the exact core version to the immutable UI registry snapshot, and the public guidance correctly identifies `@tendtoyj/cds-core/styles` as the Tailwind v4 CSS-first entry and `cdsStylesEntry` as its tooling string constant.

## 0.2.1

### Patch Changes

- Historical correction: `data-density="touch"`에서 control 크기와 간격을 확장하는 density-aware token family를 `control.css`에 추가했다. field affordance, toggle, menu, chip, icon button, radio, navigation item token이 포함되며 기존 comfortable 값은 유지된다.

- 65bf874: 라이선스를 `UNLICENSED` 에서 **MIT** 로 변경.

  - 각 패키지에 `LICENSE` 동봉 — MIT (c) 2026 The Codexy + `THIRD-PARTY NOTICES` 에 Wanted Montage(WDS) 원저작권 고지(© 2026 Wanted Lab, Inc., MIT) 포함. CDS 토큰 값이 Montage 에서 이식된 부분이 있어 MIT 고지 의무를 이행하는 것.
  - npm tarball 에 `LICENSE` 가 자동 포함되므로 소비자에게 고지가 함께 전달됨.
  - 배포 채널(`access: "restricted"`)은 변경 없음 — 라이선스만 개방.

## 0.2.0

### Minor Changes

- ec67fe3: `tv` 팩토리와 `tw-merge-config` 를 `@tendtoyj/cds-core` 로 이동.

  - cds-core 가 `tv`, `VariantProps`, `twMergeConfig`, `CDS_TYPOGRAPHY_VARIANTS` 를 새로 export. `cn` 도 `extendTailwindMerge(twMergeConfig)` 로 강화돼 CDS typography 그룹(`text-body2` 등) 과 임의 색 클래스 충돌이 해소됨.
  - cds-ui 컴포넌트는 `../utils/cn`, `../utils/tv` 가 아니라 `@tendtoyj/cds-core` 에서 직접 import. 레지스트리 `utils` 항목은 제거됐고, 컴포넌트별 `dependencies` 에 `@tendtoyj/cds-core` 가 추가돼 `npx shadcn add` 한 번이면 추가 파일 fetch 없이 빌드된다.
  - 소비자 측: 기존에 `lib/utils.ts` 로 복사된 `cn` 을 쓰고 있었다면, `@tendtoyj/cds-core` 의 `cn` 으로 옮기거나 그대로 둬도 됨(중복일 뿐 동작 무방). 단 CDS typography 그룹 인지가 필요한 새 컴포넌트는 core 의 `cn`/`tv` 사용 권장.

## 0.1.2

### Patch Changes

- 4f3e4bf: `reset.css` 의 전역 `*` squircle 룰을 `[data-cds-squircle]` opt-in 으로 한정.

  - 기존: 모든 요소에 `corner-shape: squircle` + `-electron-corner-smoothing` 이 적용돼 있었음. Electron 37+ 환경에서는 superellipse 곡선이 활성화돼 `rounded-full` 인 24×24 버튼이 완전한 원이 아니라 macOS 아이콘 모양(둥근 사각형) 으로 그려졌고, 브라우저에서는 이 속성들이 무시돼 표준 원으로 fallback — 같은 컴포넌트인데 데스크탑 앱과 docs/웹에서 모양이 달라지는 문제.
  - 변경: squircle 은 `data-cds-squircle` 표식이 붙은 요소에만 적용. CDS 컴포넌트 어디에도 아직 표식을 부여하지 않았으므로 결과적으로 모든 표면이 표준 round 로 그려진다. 이게 의도된 단기 방향이고, 어느 표면(Card, Modal, Sheet 등) 이 다시 squircle 을 켤지는 후속 디자인 결정 라운드에서 정한다.
  - 소비자 영향: published 0.1.1 에서 squircle 로 그려지던 모든 컨테이너·버튼이 표준 round 로 바뀐다. 별도 코드 변경은 필요 없음 — 패키지만 0.1.2 로 올리면 즉시 반영.
  - 다시 squircle 을 켜고 싶다면: `<div data-cds-squircle className="...">` 처럼 명시적 opt-in.

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

### Patch Changes

- 2e0cb99: `ChatLoadingDots` 를 3-dot wave 에서 단일 점 pulse 로 변경하고 `size` prop 제거.

  3-dot 메신저식 typing indicator 가 AI 어시스턴트 컨텍스트에서 올드하게 읽히는 문제 해결. 단일 점(8px)이 `scale 0.85↔1` + `opacity 0.5↔1` 로 호흡한다 (1.4s ease-in-out). 동일한 컴포넌트로 block placeholder · inline trailing 두 컨텍스트를 모두 커버하므로 `size` variant 는 불필요해 제거.

  cds-core 에서는 `cds-dot-wave` keyframe / `.cds-animate-dot-wave` 유틸을 `cds-dot-pulse` / `.cds-animate-dot-pulse` 로 교체.

- aebd24b: **ChatProcessTrace — thinking·tool 호출·중간 멘트를 한 접힘 컨테이너로 묶는 process-trace 컴포넌트 추가.**

  Anthropic Messages API 의 `thinking` · `tool_use` · `tool_result` · 중간 `text` 블록을 시간순으로 받아 단일 collapsible 로 표시한다. 최종 답변(`text`) 블록은 trace 외부에서 `ChatAssistantMessage` 등으로 분리.

  - **항상 접힘** 기본. 진행 중에도 자동 펼침 없음. 사용자 클릭으로만 펼침.
  - **Trigger 라벨**: `Thinking` (shimmer) → `Thought for {duration}` 단일 슬롯. 도구 사용 여부와 무관하게 동일 문구.
  - **Tool row 단위**: 1 `tool_use` = 1 row. 같은 도구 연속 호출이어도 묶지 않음.
  - **빌트인 도구 라벨 매핑**: bash, text_editor / str_replace_editor / str_replace_based_edit_tool, web_search, code_execution 4종을 CDS 가 알아서 영어 라벨 생성. MCP / 커스텀 도구는 `resolveToolLabel(name, input)` resolver 로 override.
  - **카테고리 아이콘**: 옵션. `resolveToolIcon` 미주입 시 아이콘 생략. 도구별 1:1 매핑이 아니라 카테고리 단위로 묶기를 권장.
  - **Failed row**: `tool_result.is_error === true` 일 때 row 우측에 작은 `failed` 칩.
  - **redacted_thinking 미표시** (의도적).

  cds-core 에서 텍스트 shimmer 용 `cds-text-shimmer` keyframe + `.cds-animate-text-shimmer` 유틸 추가 (`background-clip: text` 기반). 기존 `cds-shimmer` (skeleton background sweep) 와 별개. `prefers-reduced-motion` 시 정적 fallback.

- 87d4191: **CDS v0.3 — Phase 3 Tier 3 AI / Agent Chat 10개 이식 완료.**

  codexy-note `apps/desktop/src/components/chat-panel/` 의 9개 소스를 Anthropic Messages API 계약의 controlled 컴포넌트로 이식. `@assistant-ui/react` · Zustand · `@codexy/wds-icon` 의존성 전면 제거.

  ### cds-ui (신규)

  - `ChatLoadingDots` — 3-dot wave primitive, size(sm/md)
  - `ChatStepDot` — phase(pending/running/complete/error/requires-action) 상태 도트, ripple
  - `AgentStatusIndicator` — agent status 텍스트 라벨 + 스피너/도트 애니메이션
  - `ChatBlock` — step-dot + 헤더 + 접힘 region (grid-template-rows 트릭)
  - `ChatBubble` — user 메시지 풍선, text/image 블록 지원, onError fallback
  - `ChatComposer` — 제어형 textarea, auto-grow, IME guard, streaming toggle, 3종 toolbar slot
  - `ThinkingBlock` — running 자동 펼침 + duration 계산 + 1s 뒤 auto-close, `renderMarkdown` slot
  - `ToolCodeBlock` — Request/Response 코드 블록, `renderCode` slot (shiki 의존성 0)
  - `ToolCallCard` — tool_use/result 페어 카드, phase별 톤 분기, key-param 추출
  - `ChatThread` — messages 배열 순회, tool_use ↔ tool_result 페어링
  - `ChatTabBar` — controlled 대화 탭 바

  ### cds-ui 계약

  - `@tendtoyj/cds-ui/types` 서브패스 신설 — `ChatMessage`, `ContentBlock`, `ChatStatusPhase`, `ChatAgentStatus` 공개
  - Markdown / syntax highlighter 는 **slot 주입**으로 CDS 본체와 분리

  ### cds-core (토큰 추가)

  - `--cds-chat-tone-error-bg`, `--cds-chat-tone-error-card-bg`, `--cds-chat-tone-caution-bg` — color-mix alpha 배경 (codexy-note 하드코딩 rgba 제거)
  - `.cds-animate-dot-ripple` / `.cds-chat-collapsible` — keyframes.css 유틸 클래스

  ### 문서

  - `apps/docs` — "AI / Agent Chat" 섹션 신설, 10개 MDX + live demo
  - 각 페이지에 phase/size/streaming 토글 데모

  ### Breaking changes

  없음. 기존 Phase 1 컴포넌트 API 그대로 유지.

- 56143ee: **`SidebarMenu` — selected 진입 시 아이콘 1회 pop 모션 추가.**

  `cds-core` 에 `@keyframes cds-icon-pop` + `.cds-animate-icon-pop` 유틸을 추가하고, `SidebarMenu` 항목이 selected 가 될 때 아이콘에 1회 적용한다. 회전 -12deg → +5deg(overshoot) → 0deg + scale 0.88 → 1.06 → 1, `--cds-duration-slow` / `--cds-ease-out`. 책이 비스듬히 탁 자리 잡는 느낌.

  `prefers-reduced-motion: reduce` 환경에서는 다른 CDS 모션과 동일하게 비활성화된다. `regular → fill` weight 전환은 종전과 동일.
