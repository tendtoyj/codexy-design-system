# @tendtoyj/cds-ui

## 0.2.2

### Patch Changes

- bbf6bed: Stabilize the source-only UI registry for the `0.2.2` migration baseline.

  - Redesign `Toast` as a bottom-center, message-only Montage-style surface. Variants are now `normal`, `positive`, `cautionary`, `negative`, and `question`; use `Snackbar` when close, action, title, or description controls are required.
  - Add `Snackbar` with leading status/custom icons, title, description, action, and close slots.
  - Replace nine invalid `--cds-motion-duration-fast` references with the defined `--cds-duration-fast` token and add a namespace regression check.
  - Add immutable `/r/0.2.2/*` registry artifacts whose CDS package dependencies and nested registry dependencies are pinned to the same release.

- Updated dependencies [bbf6bed]
- Updated dependencies [bbf6bed]
  - @tendtoyj/cds-core@0.2.2
  - @tendtoyj/cds-icons@0.2.2

## 0.2.1

### Patch Changes

- Historical correction: Button/TextButton/IconButton, Input/Select/Combobox/SegmentedControl, Checkbox/RadioGroup, DropdownMenu, SidebarList/SidebarMenu, Chip의 고정 크기·간격을 cds-core의 density-aware control token 참조로 교체했다. `data-density="touch"` ancestor 아래에서 touch 크기가 적용되고 기본 comfortable 렌더링은 유지된다.

- Updated dependencies [65bf874]
  - @tendtoyj/cds-core@0.2.1
  - @tendtoyj/cds-icons@0.2.1

## 0.2.0

### Minor Changes

- ec67fe3: `tv` 팩토리와 `tw-merge-config` 를 `@tendtoyj/cds-core` 로 이동.

  - cds-core 가 `tv`, `VariantProps`, `twMergeConfig`, `CDS_TYPOGRAPHY_VARIANTS` 를 새로 export. `cn` 도 `extendTailwindMerge(twMergeConfig)` 로 강화돼 CDS typography 그룹(`text-body2` 등) 과 임의 색 클래스 충돌이 해소됨.
  - cds-ui 컴포넌트는 `../utils/cn`, `../utils/tv` 가 아니라 `@tendtoyj/cds-core` 에서 직접 import. 레지스트리 `utils` 항목은 제거됐고, 컴포넌트별 `dependencies` 에 `@tendtoyj/cds-core` 가 추가돼 `npx shadcn add` 한 번이면 추가 파일 fetch 없이 빌드된다.
  - 소비자 측: 기존에 `lib/utils.ts` 로 복사된 `cn` 을 쓰고 있었다면, `@tendtoyj/cds-core` 의 `cn` 으로 옮기거나 그대로 둬도 됨(중복일 뿐 동작 무방). 단 CDS typography 그룹 인지가 필요한 새 컴포넌트는 core 의 `cn`/`tv` 사용 권장.

### Patch Changes

- Updated dependencies [ec67fe3]
  - @tendtoyj/cds-core@0.2.0
  - @tendtoyj/cds-icons@0.2.0

## 0.1.2

### Patch Changes

- Updated dependencies [4f3e4bf]
  - @tendtoyj/cds-core@0.1.2
  - @tendtoyj/cds-icons@0.1.2

## 0.1.1

### Patch Changes

- 2a873e3: Repair install/registry consumer flow surfaced by 0.1.0 dogfooding.

  - cds-ui: marked private (shadcn-copy only — was unintentionally publishing); 17 missing components registered (app-shell, sidebar-menu/list, action-card/tile, icon-button, text-button, panel, page-container, section-header, removable-tab-bar, full chat-\* family + chat-types lib + internal chat-copy-button); AppShell root switched to h-dvh
  - cds-markdown: built via tsup, ships dist with CSS auto-load (was raw .ts source)
  - cds-core: tailwind-merge bumped to v3 (Tailwind v4 alignment)
  - root + apps/docs: shadcn registry now hosted via Vercel build pipeline (`<host>/r/<name>.json`) — placeholder URL `codexy-design-system-docs.vercel.app`
  - root: silenced stale @emoji-mart/react React-18 peer cap (transitive of @lobehub/ui, runtime unused)

- Updated dependencies [2a873e3]
  - @tendtoyj/cds-core@0.1.1
  - @tendtoyj/cds-icons@0.1.1

## 0.1.0

### Minor Changes

- a4b2aa5: **`ActionCard` 신규 추가 — 제목 + 설명에 좌/우 슬롯이 붙는 클릭 가능한 카드.**

  `ActionCard`, `ActionCardLeading`, `ActionCardTitle`, `ActionCardDescription`, `ActionCardTrailing` 5 개로 구성된 flat compound. Suggestion / prompt 카드, permission · option toggle row 등 큰 면적의 액션 표면에 사용.

  - 기본 `<button type="button">`, `asChild` 로 `<a>` 등 polymorphic
  - Leading / Trailing 은 두 행 span, Title / Description 은 가운데 컬럼 두 행. CSS Grid `auto · minmax(0,1fr) · auto` 3-컬럼
  - 슬롯 간 간격은 column-gap 대신 Leading/Trailing 자체 margin 으로 만들어, 슬롯 미사용 시 빈 공간이 생기지 않음
  - `ActionCardTitle` 의 `icon` prop 으로 title 좌측 inline 아이콘(20px) 정렬
  - `variant` 3 종: `outlined` (기본, border 1px + 투명 bg) / `filled` (border 없음 + bg fill) / `ghost` (border·bg 모두 없음, hover 시에만 fill). 모든 variant 의 hover transition 단계는 CDS fill 스케일 (`alternative` < `normal`) 을 따름
  - radius 12px, padding 14×16px

  > 세로 stack 타일 (가로 짧고 세로 긴) 형태는 별도 컴포넌트 `ActionTile` 로 분리되어 있다 — 레이아웃 모델 (3-col row vs 3-region column with free-form header/footer) 이 다르고, 각자 고유 prop 이 다른 컴포넌트로 진화하기 쉬워 한 컴포넌트의 variant 로 묶지 않음.

- e36ad42: **`ActionTile` 신규 추가 — 세로 stack 타일형 클릭 카드 (가로 짧고 세로 긴 형태).**

  3 영역 모델 — `Header` / `Content` / `Footer`. Grid 3-column 같은 화면 구성에서 카드 여러 개를 가로로 배치하는 용도.

  영역

  - `ActionTileHeader` — 옵션. 상단 free-form 박스. 메타 row / NEW pill / 카테고리 라벨 / kebab 등. 안의 element 분포는 호출부 자유. 기본 `flex flex-row items-center gap-[6px]`. 정렬은 `headerAlign` prop
  - `ActionTileContent` — 의미 슬롯 묶음. `ActionTileLeading` (옵션) + `ActionTileTitle` (`startIcon` prop) + `ActionTileDescription` (옵션). 내부 typography 와 슬롯 간 간격은 컴포넌트 책임 (Leading→Title 8px, Title→Description 2px). 가로 정렬은 `contentAlign`
  - `ActionTileFooter` — 옵션. 하단 free-form 박스. 동작은 Header 와 동일. 정렬은 `footerAlign`

  Props

  - `variant` — `outlined` (기본) / `filled` / `ghost`. `ActionCard` 와 토큰 동일
  - `padding` — 카드 외곽 padding. `compact` (18/20/20) / `normal` (26/28/24, 기본) / `spacious` (36/38/28). top/bottom/horizontal
  - `headerGap` — Header ↔ Content 간격. `tight` (4px) / `normal` (8px, 기본) / `wide` (12px). Header 없으면 무시
  - `footerGap` — Content ↔ Footer 간격. 동일 토큰. Footer 없으면 무시
  - `headerAlign` / `contentAlign` / `footerAlign` — 영역별 정렬. `start` (기본) / `center` / `end` / `between` (양 끝 분포). 영역마다 다르게 줄 수 있음
  - `asChild` — polymorphic (`<a>` / `<Link>` 등으로 클릭 표면 교체)

  `ActionCard` 와 공유: `variant` / focus ring / hover transition / asChild / radius 16px.

  토큰 — radius 16px, padding 토큰 (compact 18/20/20 · normal 26/28/24 · spacious 36/38/28), Leading→Title 8px, Title→Description 2px, Header/Footer 내부 default gap 6px, headerGap/footerGap 토큰 4/8/12, 폭 `w-full` (부모 grid/flex 결정).

- 42d0b6e: **AppShell — 데스크탑 앱(Tauri/macOS Overlay)의 3-패널 레이아웃 셸 추가.**

  `<AppShell>` + `<AppShellSidebar>` (back layer) + `<AppShellMain>` / `<AppShellSidePanel>` (foreground card) + `<AppShellSplitter>` 컴포넌트군. 각 패널은 자체 헤더/바디(/푸터) 슬롯을 갖는다.

  - **레이어 모델**: 사이드바는 회색 _back layer_, Main+SidePanel 은 흰 _foreground card_. 사용자가 prop 으로 지정하지 않고 *컴포넌트 종류 자체*에 의미가 박혀있다.
  - **모서리 라운딩 자동**: foreground card 는 background layer 와 만나는 모서리만 둥글게 (`rounded-l-12`). 윈도우 가장자리 쪽은 OS squircle 이 처리하므로 CDS 가 신경쓰지 않음.
  - **Titlebar inset 자동 분배**: `leftInset` / `rightInset` 을 `<AppShell>` 에 주입하면 _현재 열려있는_ 좌/우 끝 패널의 헤더에만 자동 적용. 사이드바를 닫으면 Main 헤더가 leftInset 흡수.
  - **상태 모델 (Radix 식)**: `open` / `width` 둘 다 controlled+uncontrolled 양쪽 지원 (`defaultOpen`, `defaultWidth` / `open`, `width` + `onOpenChange`, `onWidthChange`). 단축키, URL 동기화, 패널 간 연동 가능.
  - **닫힘 동작**: `open={false}` 시 width 0 으로만 줄어들고 DOM·내부 상태(스크롤·입력값) 보존.
  - **Splitter**: 명시적 (`target="sidebar" | "sidePanel"`). `doubleClickResetWidth` 옵션. 대상 패널 닫힘/`resizable={false}` 시 자동 비활성.
  - **Floating controls overlay**: `<AppShellLeadingControls>` / `<AppShellTrailingControls>` — titlebar 영역에 absolute 로 떠있는 슬롯. 패널 상태와 무관하게 같은 좌표에 머물러야 하는 사이드바 토글 등에 사용. `leftInset`/`rightInset` 만큼 자동 들여 배치, 컨테이너는 pointer-events pass-through.
  - **Tauri 결합 분리**: CDS 는 OS 감지·트래픽 라이트·드래그 동작을 떠안지 않음. 제품이 Tauri API 로 OS 보고 inset 값 주입하는 경계 유지. `data-tauri-drag-region` 만 헤더에 자동 표식.

  내부 의도 (이름 자체가 layer 를 박는 컨벤션, 자동 라운딩/inset 룰) 는 `apps/docs/content/docs/components/app-shell.mdx` 에 _Design Intent_ 절로 박아두었다 — 향후 새 패널 컴포넌트 추가 시 같은 컨벤션을 따르도록.

- 4fbc656: **Badge — API 재설계.**

  이전 5플랫 컬러(`neutral|accent|positive|cautionary|negative`) 구조와 임의 사이즈/alpha 매핑을 정리하고, foreground 토큰 선택형 API로 환원.

  ### API 변경 (Breaking)

  - `color` 축소: `neutral | accent`. 기본값 `accent`.
  - `accentColor` 추가 — `color=accent` 일 때 foreground 토큰 선택. 기본값 `cyan`.
    - 값: `red | red-orange | orange | lime | green | cyan | light-blue | blue | violet | purple | pink | positive | cautionary | negative`
  - `neutralColor` 추가 — `color=neutral` 일 때 label 토큰 선택. 기본값 `alternative`.
    - 값: `normal | strong | neutral | alternative | assistive | disable`

  기존 `<Badge color="positive">` → `<Badge color="accent" accentColor="positive">` 로 마이그레이션.

  ### 사이즈

  |           | xs      | sm      | md      |
  | --------- | ------- | ------- | ------- |
  | padding   | 3px 6px | 4px 6px | 5px 8px |
  | radius    | 8       | 8       | 10      |
  | font / lh | 11 / 14 | 12 / 16 | 13 / 18 |
  | gap       | 2       | 4       | 4       |
  | svg       | 12      | 14      | 14      |

  `width: fit-content; height: fit-content` — 고정 h 제거.

  ### 컬러 매핑

  런타임에 `--cds-badge-color` 커스텀 프로퍼티로 선택 토큰을 주입, Tailwind는 단일 클래스로 참조.

  - `solid` accent: bg = `var(--cds-badge-color) @ 8%`
  - `solid` neutral: bg = `--cds-fill-normal`
  - `outlined` accent: bg = `--cds-background-normal-normal`, border = `var(--cds-badge-color) @ 43%`
  - `outlined` neutral: bg = white, border = `--cds-line-normal-normal`
  - text(전 variant): `var(--cds-badge-color)`

- 7303e1c: **Button을 3개로 분리 — Button / IconButton / TextButton.**

  Montage(`/components/actions/{button,icon-button,text-button}`)의 분리 모델을 따라, 단일 Button 컴포넌트가 짊어지던 책임을 컨테이너 강도 기준으로 3개로 쪼갰다.

  ### 분리 기준 — 컨테이너

  - **Button** — 배경 또는 테두리(컨테이너 있음). 라벨이 들어가는 액션 버튼.
  - **IconButton** — 컨테이너 옵션 4단계. 텍스트 없이 아이콘만.
  - **TextButton** — 컨테이너 없음. 글자만의 인터랙션.

  ### Button (변경)

  - variant 5종 → 4종으로 정리:
    - `solid` (유지)
    - `primary` → **`outlined`** (실제로는 outline이라 이름 정정)
    - `secondary` → **`frosted`** (`backdrop-filter:blur(32px)` 톤이라 명시적으로 rename)
    - `ghost` 삭제 → TextButton으로 의미 이동
    - `danger` (유지)
  - **`iconOnly` prop 삭제** → IconButton으로 이동
  - default variant: `outlined` (이전 `primary`와 동일한 시각)
  - size, fullWidth, loading, leadingContent/trailingContent, asChild — 모두 유지

  ### IconButton (신규)

  ```tsx
  <IconButton variant="normal" size="md" aria-label="검색">
    <Icon icon={MagnifyingGlass} />
  </IconButton>
  ```

  - variant: `normal` / `background` / `outlined` / `solid` (4종)
  - size: `sm`(24) · `md`(32) · `lg`(40), 정사각형
  - children = 아이콘 1개 (필수). `aria-label` 권장
  - asChild 지원

  ### TextButton (신규)

  ```tsx
  <TextButton color="primary">더 보기</TextButton>
  <TextButton color="assistive" trailingContent={<Icon icon={ArrowRight} />}>
    전체 보기
  </TextButton>
  ```

  - color: `primary` / `assistive`
  - size: `sm`(13px) · `md`(14px)
  - 컨테이너 없음 (배경/테두리 0). 옵션 leading/trailing 슬롯 + loading
  - asChild 지원

  ### 기존 컴포넌트 유지

  - **`CloseButton`** — 기존 20/24/28 스케일 유지 (IconButton의 24/32/40보다 작은 인라인 전용).
  - **chat-composer 송신 버튼** — 24×24 원형 + label-normal 배경의 채팅 UI 관례 유지.

  ### 마이그레이션

  CDS는 0.1.0 미릴리즈 상태이므로 외부 영향 없음. 내부 docs demo 일괄 정리:

  - `<Button variant="primary">` → `<Button variant="outlined">`
  - `<Button variant="secondary">` → `<Button variant="frosted">`
  - `<Button iconOnly variant="ghost">` → `<IconButton variant="normal">`

- 453bb0f: `ChatAssistantMessage` 에 hover-reveal 복사 버튼 내장.

  - 응답 하단 좌측에 복사 버튼이 기본 노출. 메시지 행 호버 / 포커스 시 fade-in (`opacity-0 → 100`), `ChatUserMessage` 와 동일 패턴.
  - 클릭하면 클립보드에 텍스트 저장 + 1.5s 동안 아이콘이 `Copy → Check` 로 스왑, 툴팁도 "복사 → 복사됨" 으로 변경 후 복귀.
  - 텍스트 블록만 join (`thinking`, `tool_use` 블록은 스킵). 텍스트가 비어있으면 복사 버튼 자체를 안 그림.
  - `showCopy={false}` 로 비활성화, `actions` 슬롯은 기본 복사 버튼과 함께 노출 (override 아닌 append).
  - 두 메시지 컴포넌트가 동일 동작을 공유하도록 `ChatCopyButton` / `extractCopyText` 를 `components/internal/` 으로 분리.

- 760788a: **ChatAssistantMessage — `loading` prop 추가.**

  스트리밍 라이프사이클(dots → typing → done)을 한 컴포넌트로 통일. `loading` 이 true 면:

  - 본문 끝(빈 본문이면 단독)에 `<ChatLoadingDots />` 가 inline 으로 붙는다 — text slot 의 `text-body2` 컨텍스트 안에 들어가므로 13px 로 정렬된다.
  - `renderMarkdown` 은 자동으로 무시되고 `whitespace-pre-wrap` plain text 로 떨어진다 (미완성 마크다운 깨짐 방지).
  - 기본 복사 버튼과 `actions` 가 모두 숨겨진다 (미완성 텍스트 복사·액션 차단).
  - 루트에 `data-loading` 속성이 노출된다.

  기존 사용처는 변경 없이 동작 (`loading` 미지정 시 false).

- 0a69b54: **ChatAttachmentChip — 채팅 첨부 컨텍스트(이미지/파일) 표시 pill 추가.**

  `ChatComposer.topAccessory` 안에서 첨부된 컨텍스트를 가벼운 pill 로 나열하기 위한 컴포넌트. 일반 `Chip`(filter/tag, rect)과 의미·시각이 다르기 때문에 별도 컴포넌트로 분리.

  - pill(rounded-full) + 1px border, transparent shell
  - `type="image"` → 22×22 썸네일(`imageSrc`), `type="file"` → 타입 무관 단일 file 아이콘
  - `name` 은 `max-width:200px` 안에서 truncate
  - `onRemove` 지정 시 hover/focus 에 우상단 × 노출(layout shift 없음)

  `chat-composer-demo` 의 mention 자리에 적용 (이미지 2 + 파일 3 wrapping). 기존 `.cds-chat-demo-mention*` raw CSS 제거.

- b515be4: **ChatComposer — `topAccessory` 슬롯을 shell 안쪽으로 이동.**

  레퍼런스 디자인(첨부 chip 이 input 박스 안 상단에 표시되는 형태)에 맞추기 위해 `topAccessory` 가 shell **안쪽** 상단(textarea 위)에 렌더되도록 변경. `bottomAccessory` 는 그대로 shell 바깥 하단을 유지(외부 컨트롤 row 용도).

  기존에 `topAccessory` 를 외부 위 자리(상단 mb-[4px])로 사용하던 코드는 시각적으로 input 박스 안으로 들어오는 변화가 발생합니다. 외부 위 자리가 필요하면 `<ChatComposer/>` 바깥에 직접 wrapper 를 두세요.

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

- baa98be: `ChatBubble` 을 `ChatUserMessage` 로 리네임하고, 어시스턴트 응답을 `ChatAssistantMessage` 로 분리.

  CDS 채팅 모델은 user 는 풍선, assistant 는 풍선 없이 본문만 — 이 비대칭이 컴포넌트 구조에는 반영돼 있지 않아서 user 만 컴포넌트로 빠지고 assistant 는 `ChatThread` 내부 인라인 JSX 였다. role 축으로 짝을 맞춰 둘 다 단독 컴포넌트로 정리.

  - `ChatUserMessage` (구 `ChatBubble`) — 사용자 메시지 풍선. text/image 블록, onError fallback.
    - 풍선 radius `8px → 10px`, 첨부 이미지 radius `6px → 8px` (한 단계 상향).
  - `ChatAssistantMessage` (신규) — 풍선 없는 어시스턴트 응답. text/thinking/tool_use 블록 처리, `renderMarkdown` / `renderToolCall` / `renderThinking` / `actions` slot, `toolResults: Map<string, ToolResultBlock>` prop.
  - `ChatThread` 는 role 분기 dispatcher 로 단순화.

  Breaking: `ChatBubble`, `chatBubble`, `ChatBubbleProps` export 제거. import 경로 `@tendtoyj/cds-ui/components/chat-bubble` → `chat-user-message`.

- 31fff77: `ChatUserMessage` 첨부물(이미지·문서) 표시 방식 개편 + `DocumentBlock` 타입 신규.

  - `types/chat.ts` 에 Anthropic Messages API 호환 `DocumentBlock` 추가 (`type: "document"`, `source` discriminated union, `title?`, `context?`). `ContentBlock` union 에 포함.
  - 이미지/문서 블록은 풍선 위쪽 별도 row 에 우측 정렬로 모아 표시 (텍스트 사이에 끼워도 attachment 그룹으로 lifting). 정렬 규칙: **문서(chip) 좌측, 이미지(thumbnail) 우측**, 같은 타입끼리는 입력 순서 보존.
  - 이미지 썸네일 사양 변경: `max-w-[320px] max-h-[240px]` → `64×64` 정사각, `object-cover`, `rounded-[10px]`. 다중 첨부 시 `flex-wrap-reverse` 로 좁은 폭에서 줄바꿈.
  - 이미지 로드 실패 fallback: 큰 텍스트 박스 → 64×64 회색 박스 + `ImageBroken` 아이콘.
  - 문서 블록은 `ChatAttachmentChip` (`type="file"`) 으로 렌더, 라벨은 `block.title ?? "Document"`.
  - 텍스트 블록이 하나도 없으면 풍선 자체를 그리지 않음. "(no message)" 같은 placeholder 카피는 CDS 가 가지지 않고 앱이 text 블록으로 직접 넣도록 위임.

- 1e66cb5: `ChatUserMessage` 에 hover-reveal 복사 버튼 내장.

  - 풍선 아래 우측에 복사 버튼이 기본 노출. 메시지 행 호버 / 포커스 시 fade-in (`opacity-0 → 100`), 평상시 자리 reserve 로 호버 시 레이아웃 흔들림 없음.
  - 클릭하면 클립보드에 텍스트 저장 + 1.5s 동안 아이콘이 `Copy → Check` 로 스왑, 툴팁도 "복사 → 복사됨" 으로 변경 후 복귀.
  - 이미지+텍스트 메시지면 텍스트 블록만 join (이미지 스킵). 텍스트가 비어있으면 복사 버튼 자체를 안 그림.
  - `showCopy={false}` 로 비활성화, `actions` 슬롯은 기본 복사 버튼과 함께 노출 (override 아닌 append).
  - IconButton `subtle/sm` + Tooltip primitive 재사용.

- daa7f57: **Chip: 기본 렌더 요소를 `<span>` 으로 변경, `<button>` 은 `interactive` 옵트인. (Behavior change)**

  `trailingContent` 에 닫기 버튼(`<button>`)을 둘 때 button-in-button 으로 hydration 에러가 나던 문제를 잡기 위해 Chip 의 기본 렌더 요소를 `<button>` → `<span>` 으로 변경.

  ### 변경

  - `interactive` prop 추가 (`boolean`, 기본 `false`)
    - `false` (기본): `<span>` 으로 렌더. `disabled` 는 `aria-disabled` 로 노출, `aria-pressed` 미연결
    - `true`: `<button>` 으로 렌더 + `type` / `disabled` / `aria-pressed` 연결 (이전 동작)
  - `cursor: pointer` 는 `data-interactive=true` 일 때만 적용
  - 기존 클릭 가능한 Chip 사용처는 `interactive` 를 추가해야 동일 동작 (자동 분기 없음)

  ### 마이그레이션

  ```diff
  - <Chip onClick={fn}>토글</Chip>
  + <Chip interactive onClick={fn}>토글</Chip>

  - <Chip active onClick={fn}>선택됨</Chip>
  + <Chip interactive active onClick={fn}>선택됨</Chip>

    // 제거 버튼 패턴은 이제 그대로 동작 (Chip 이 span 이라 nested button 없음)
    <Chip trailingContent={<RemoveButton />}>React</Chip>
  ```

- 48771ab: **Tag → Chip 으로 리네임 + Montage 스펙 정합화. (Breaking)**

  기존 `Tag` 는 의미가 모호해 Montage 분류와 동일한 `Chip` 으로 정리. API 와 사이즈 스케일을 Montage 스펙에 맞춰 재구성.

  ### Breaking changes

  - `Tag` / `tag` export 제거 → `Chip` / `chip` 사용
  - import 경로: `@tendtoyj/cds-ui/components/tag` → `@tendtoyj/cds-ui/components/chip`
  - `pressed` prop 제거 → `active` 사용 (`aria-pressed` 는 동일하게 출력)
  - `onRemove` prop 제거 → `trailingContent` 자리에 직접 닫기 버튼 배치 (Montage 와 동일)
  - 사이즈 키 변경: `xs/sm/md/lg` → `xsmall/small/medium/large` (Montage 동일)
  - 기본 사이즈 명칭 `md` → `medium` (실제 치수도 변경됨, 아래 표 참고)

  ### 사이즈 스케일 (Montage 동일)

  | size     | radius | padding (y/x) | gap | text            | icon |
  | -------- | ------ | ------------- | --- | --------------- | ---- |
  | `xsmall` | 6px    | 4 / 7         | 2   | caption1 (11px) | 12px |
  | `small`  | 8px    | 6 / 8         | 2   | label1 (13px)   | 14px |
  | `medium` | 8px    | 7 / 11        | 3   | body2 (13px)    | 14px |
  | `large`  | 10px   | 9 / 12        | 3   | body2 (13px)    | 16px |

  높이는 `padding + line-height` 로 결정 (Montage 와 동일하게 `height: fit-content`).

  ### Variant 색

  - `solid`: bg `--cds-fill-alternative` → active 시 `--cds-inverse-background` / `--cds-inverse-label`
  - `outlined`: 1px `--cds-line-normal-neutral` → active 시 `--cds-primary-normal` 5% 채움 + 43% 보더, 텍스트 `--cds-primary-normal`
  - disabled: `--cds-label-disable` + (solid) `--cds-interaction-disable` / (outlined) 보더 유지

  ### 메타

  - 카테고리 이동: Feedback → Actions (Montage 분류 일치)

- 571b681: **IconButton — `subtle` variant 추가.**

  평소 `--cds-label-alternative`(흐림) → hover 시 `--cds-label-normal`(또렷) + `--cds-fill-normal` 배경. 헤더·툴바·sidebar 액션 슬롯처럼 본 콘텐츠 옆에서 시선을 안 뺏어야 하는 보조 액션용. 기존 `normal` variant는 평소부터 진한 톤이라 정렬되지 않음.

  데모 적용처: `chat-composer`(첨부·음성), `sidebar-list`(헤더 액션 3개), `section-header`(headingContent / trailingContent).

- fea1f38: **IconButton — `xs` size 추가.**

  18×18 / radius 4 / icon 14. 기존 `sm`(24)보다 더 좁은 자리(인라인 metadata, chip 옆 close, 작은 row의 trailing action 등)를 위한 사이즈.

- c4d436a: **PageContainer — variant max-width 전반적으로 좁힘.**

  - `narrow`: 720 → **640**
  - `default`: 960 → **720**
  - `wide`: 1200 → **960**
  - `full`: 제한 없음 (변동 없음)

  데스크탑 앱(Tauri/macOS Overlay) AppShell Main 영역에서 sidebar/sidepanel 까지 양쪽으로 빠지면 실제 사용 가능한 본문 폭이 좁다. 기존 960/1200 은 가독성 한계를 넘어 늘어졌고, sidepanel 을 동시에 켜면 wide(1200)는 사실상 capped 되어 의미가 없었다. 한 단계씩 당겨 _읽기 편한 폭_ 쪽으로 정렬.

  Migration: PageContainer 의 variant 명을 그대로 쓰고 있다면 max-width 만 줄어든다 — 페이지가 더 좁아짐. 기존 폭이 필요하면 한 단계 위 variant 로 옮기면 된다 (예: `default` → `wide`).

- 72d0d5f: **`Panel` 컴포넌트 추가 — bordered cell grid layout primitive.**

  외곽선·radius·hairline 디바이더만 책임지는 cell grid 박스. spirit-distiller 의 metadata strip / chart panel grid / sectioned stack 같은 "외곽선 + 셀 분할" 패턴을 단일 primitive 로 흡수.

  - `Panel` (`columns: number`) — CSS Grid 균등 분할 컨테이너. 자식 셀이 좌→우 채워지고 columns 단위로 자동 wrap.
  - `PanelCell` — 셀 단위. `span?: number` (CSS Grid `grid-column: span N`), `title?: string`, `icon?: PhosphorIcon` 헤더 슬롯. 헤더는 옵셔널이라 icon-only / label-only / 둘 다 / 헤더 없음 모두 지원.
  - 시각: `1px var(--cds-line-normal-alternative)` 외곽선·디바이더, `rounded-[16px]`, 셀 padding `20px` 사방 고정.
  - 디바이더는 grid `gap: 1px` + root background 가 line color 로 비치는 방식 — 셀 수·`span` 변화에 무관하게 동작 (nth-child 계산 불필요).
  - 외부 섹션 타이틀 / 우상단 보조 meta 슬롯 미포함 — 박스 책임만 분리. 외곽 헤더가 필요하면 `SectionHeader` 가 위에 얹힘.

- 5feb4ff: 신규 패키지 `@tendtoyj/cds-markdown` 추가, `ChatUserMessage` 에 `renderMarkdown` slot 추가.

  채팅 메시지(user/assistant) 양쪽 모두 markdown 이 필요하지만 CDS 자체는 렌더러 의존을 가지지 않는다는 슬롯 패턴을 유지한다. 권장 구현체로 `react-markdown + remark-gfm` 기반 패키지를 별도로 제공.

  - `@tendtoyj/cds-markdown` 신규 — `Markdown` 컴포넌트 + `renderMarkdown(text)` 헬퍼 export. ChatUser/Assistant 의 `renderMarkdown` slot 에 그대로 꽂아 쓰는 형태.
  - `ChatUserMessage` 에 `renderMarkdown?: (text) => ReactNode` slot 추가. `ChatThread` 가 동일 함수를 user/assistant 양쪽에 패스스루.
  - `ChatAssistantMessage` 의 `renderMarkdown` 미주입 폴백을 `<pre>` 에서 `whitespace-pre-wrap` plain text 로 변경 (user 와 톤 통일).
  - 문서 신규: [Chat Markdown](/docs/components/chat-markdown) — 권장 패키지 설치·사용·보안·커스터마이즈 가이드.

  분리 이유: chat 안 쓰는데 markdown 만 필요한 컨슈머가 `cds-ui` deps 그래프를 받지 않도록. `cds-icons` 가 `cds-ui` 와 분리된 것과 같은 원칙.

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

- c40c012: **CDS Phase 5a — Foundation Primitives 5개 추가.**

  ### cds-ui (신규)

  - `Popover` — `@radix-ui/react-popover` 기반. `size: sm|md|lg` × `variant: normal|custom`. `PopoverHeader` / `PopoverTitle` / `PopoverDescription` / `PopoverBody` / `PopoverActionArea` / `PopoverClose` / `PopoverArrow` 슬롯.
  - `Spinner` — 순수 SVG. `size: sm|md|lg` (16/20/28px), `currentColor` 상속, `prefers-reduced-motion` 지원.
  - `Badge` — `variant: solid|outlined` × `size: xs|sm|md` × `color: neutral|accent|positive|cautionary|negative`. `leadingContent` / `trailingContent` 슬롯. (Montage `ContentBadge` 환원)
  - `Tag` — `variant: solid|outlined` × `size: xs|sm|md|lg`. `pressed`(aria-pressed 연결) 토글, `onRemove`(sibling 버튼) 지원, `asChild` 폴리모픽. (Montage `Chip` 환원)
  - `Progress` — `@radix-ui/react-progress` 기반. `value: number | null`(null=indeterminate), `size: sm|md` 트랙.

  ### Breaking changes

  없음. 기존 Phase 1~3 컴포넌트 API 불변.

- 476215e: **CDS Phase 5b — Form Controls + Glue 5개 추가.**

  ### cds-ui (신규)

  - `Checkbox` — `@radix-ui/react-checkbox` 기반. `size: sm|md`, `indeterminate` boolean prop (내부에서 `checked="indeterminate"` 로 치환), `invalid` / `disabled` / `required`.
  - `Switch` — `@radix-ui/react-switch` 기반. `size: sm|md`, thumb 이동 거리는 `--cds-switch-thumb-on` 로컬 CSS 변수로 인라인 세팅.
  - `RadioGroup` + `RadioGroupItem` — `@radix-ui/react-radio-group` 기반. `size: sm|md`, `orientation: horizontal|vertical`, `loop` 기본 on. Montage 3-class → CDS 2-class 로 단순화.
  - `Select` — `@radix-ui/react-select` 기반. Flat exports(`Select` / `SelectTrigger` / `SelectValue` / `SelectContent` / `SelectItem` / `SelectGroup` / `SelectLabel` / `SelectSeparator` / `SelectScrollUpButton` / `SelectScrollDownButton` / `SelectViewport` / `SelectItemIndicator` / `SelectItemText`). Trigger `size: sm|md|lg` + `invalid`, Input 과 동일한 토큰.
  - `Form` 프리미티브 5종 — `FormField` + `FormLabel` + `FormControl` + `FormDescription` + `FormErrorMessage`. `useId()` 기반 id 4개(label/field/description/error) 를 context 로 공급, `FormControl` 은 `@radix-ui/react-slot` 으로 자식 control 에 `id`/`aria-labelledby`/`aria-describedby`/`aria-invalid` 주입. `invalid` 소유권은 control 쪽(Montage 와 동일).

  ### Breaking changes

  없음. 기존 Phase 1~3 및 5a API 불변.

- c0092c4: **CDS Phase 5c — Navigation + Compound 2개 추가 (Phase 5 완결).**

  ### cds-ui (신규)

  - `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` — `@radix-ui/react-tabs` 기반. `size: sm|md|lg` × `resize: hug|fill`, `orientation: horizontal|vertical`, 활성 탭 밑줄 indicator. Montage 의 측정 기반 indicator 애니메이션 / auto scroll-into-view / iconButton trailing 은 범위 밖.
  - `Combobox` 세트 — `cmdk` + `@radix-ui/react-popover` 를 CDS 공개 API(`Combobox` / `ComboboxTrigger` / `ComboboxContent` / `ComboboxInput` / `ComboboxList` / `ComboboxEmpty` / `ComboboxGroup` / `ComboboxItem` / `ComboboxSeparator`) 뒤로 완전히 래핑.
    - `value` / `onValueChange` / `inputValue` / `onInputValueChange` CDS 어휘 고정, `filter` passthrough, `disabled` 는 루트 `<fieldset>` 으로 적용.
    - 래핑 규율 5개(cmdk 재노출 금지, data-cmdk-\* 공개 계약 제외 등)를 MDX 에 명문화.
    - 이전 트리거 3개(async 로딩 / 한글 composition 버그 / 대폭 필터 커스터마이즈) 명시.

  ### Phase 5 총 12개 컴포넌트 완결

  Phase 5a (5) + Phase 5b (5) + Phase 5c (2) = 12 컴포넌트. 각 컴포넌트 5개 산출물(소스·MDX·demo·registry·changeset) 모두 갖춤. Tier 1 기존 컴포넌트 API 불변.

  ### Breaking changes

  없음.

- f4d5d38: **Radio — 시그니처 룩/halo/tight 도입, 그룹 레이아웃 제거.**

  체크드 시각을 "흰 바탕 + 파랑 보더 + 파랑 dot" → "꽉 찬 `--cds-primary-normal` + 흰 inner dot" 으로 교체. 보더는 `border` 가 아닌 `inset box-shadow` 로 그려 체크 전후 레이아웃 흔들림을 제거하고, 외곽에 2px hit-area 패딩과 hover/press halo (`::before`) 를 추가.

  ### 사이즈

  |                     | sm (구) | sm (new)   | md (구) | md (new)   |
  | ------------------- | ------- | ---------- | ------- | ---------- |
  | 외곽 hit-area       | 16      | 16         | 20      | 20         |
  | 내부 visible ring   | 16      | 14 (pad 1) | 20      | 16 (pad 2) |
  | inner dot (checked) | 8       | 5          | 10      | 6          |

  외곽 hit-area 는 그대로 두고 내부 visible ring 만 hit-area 안쪽에 padding 만큼 들여 그립니다. dot 비율도 함께 축소.

  ### `RadioGroup` 레이아웃 제거 (Breaking)

  `RadioGroup` 의 기본 `flex gap-[12px]` 와 `data-[orientation]` 기반 방향 분기가 모두 빠졌습니다. 그룹은 `role="radiogroup"` + 화살표 키 네비게이션만 담당하고, 시각 정렬은 컨슈머가 `style`/className 으로 직접 부여합니다.

  ```tsx
  // Before
  <RadioGroup orientation="horizontal">…</RadioGroup>

  // After
  <RadioGroup
    orientation="horizontal"
    style={{ display: "flex", flexDirection: "row", gap: 12 }}
  >
    …
  </RadioGroup>
  ```

  권장 항목 간격: **최소 8px (4×n)**.

  ### 스타일 정리

  - 체크 전: `--cds-background-elevated-normal` + `inset 0 0 0 1.5px --cds-line-normal-normal`
  - 체크 후: `--cds-primary-normal` + 흰 dot (`--cds-color-common-100`)
  - Halo: ring 외곽 4px 확장. hover `--cds-fill-normal`, active `--cds-fill-strong`.
  - Focus: visible ring 에 `outline 2px var(--cds-focus-ring)` + offset 2px.
  - Invalid: inset 라인 → `--cds-status-negative`.
  - Disabled: `opacity: 0.43`, halo 숨김 (Switch/Checkbox 와 동일 톤).
  - transition: `var(--cds-duration-fast) var(--cds-ease-standard)`.

- 3023515: **`ChatTabBar` → `RemovableTabBar` 로 일반화. nav 카테고리로 이동 + `size` variant 도입.**

  chat 세션뿐 아니라 노트 등 다른 워크스페이스에서도 동적으로 열고 닫는 탭이 필요해져, AI/Agent Chat 카테고리 전용이던 `ChatTabBar` 를 navigation 컴포넌트로 일반화한다.

  - 신규: `RemovableTabBar`, `removableTabBar`, `RemovableTab`, `RemovableTabBarProps`, `RemovableTabBarSize` (`@tendtoyj/cds-ui/components/removable-tab-bar`).
  - 제거: `ChatTabBar`, `chatTabBar`, `ChatTab`, `ChatTabBarProps` (`@tendtoyj/cds-ui/components/chat-tab-bar`). 사용처는 `RemovableTabBar` 로 교체.
  - `size` prop 추가: `sm` (기존 ChatTabBar — 24h, 12px) / `md` (32h, 14px).
  - width 가 컨텐츠 가변으로 변경 (sm 60–140, md 80–200). 이전 `ChatTabBar` 는 80px 고정이었음.
  - 닫기 버튼·radius·padding 등은 사이즈에 비례.

- befd02b: **`useScrollFade` — `edges` 옵션 추가.**

  특정 가장자리의 페이드를 강제로 끌 수 있는 `edges?: { top?: boolean; bottom?: boolean }` 옵션 추가. 미지정 시 기존 동작(양쪽 자동) 그대로.

  용도: sticky 헤더처럼 스크롤 컨테이너 _상단을 덮는 요소_ 가 있을 때 상단 페이드를 끄지 않으면 sticky 요소 자체가 흐려져 보이는 문제. `edges: { top: false }` 로 해결.

  ```tsx
  useScrollFade({
    size: 24,
    edges: { top: false }, // sticky 헤더가 상단 덮음
  });
  ```

  `isScrolledFromTop` / `isScrolledFromBottom` 측정값 자체는 옵션과 무관하게 그대로 반환된다 (다른 UI 토글에 쓸 수 있게).

- 1d8ee66: **ScrollArea / useScrollFade: 스크롤 가장자리 그라디언트 fade 패턴 추가.**

  스크롤 컨테이너 위·아래에 mask 그라디언트를 입혀 잘리는 가장자리를 부드럽게 처리하는 유틸을 추가. codexy-note Sidebar 에서 검증된 패턴을 CDS 로 끌어올림.

  ### 추가

  - `useScrollFade<T>(options)` 훅 — 스크롤 위치를 측정해 위·아래 fade 를 자동 토글. `{ ref, onScroll, maskImage, isScrolledFromTop, isScrolledFromBottom }` 반환. 컨테이너 리사이즈는 `ResizeObserver` 로 따라감
  - `getScrollFadeMask({ top, bottom, size })` 저수준 함수 — mask 문자열만 반환
  - `ScrollArea` 에 viewport 직접 제어용 prop 추가:
    - `viewportStyle?: CSSProperties`
    - `viewportRef?: Ref<HTMLDivElement>`
    - `onViewportScroll?: UIEventHandler<HTMLDivElement>`

  ### 사용

  ```tsx
  const { ref, onScroll, maskImage } = useScrollFade<HTMLDivElement>({
    size: 40,
  });

  <ScrollArea
    viewportRef={ref}
    onViewportScroll={onScroll}
    viewportStyle={{ maskImage, WebkitMaskImage: maskImage }}
  >
    ...
  </ScrollArea>;
  ```

  ScrollArea 가 아닌 임의 `overflow:auto` 컨테이너에도 동일하게 적용 가능.

- 42d0b6e: **SectionHeader — 섹션 진입을 표시하는 1라인 row 헤더 추가.**

  `<SectionHeader>` + `headingContent` / `trailingContent` 두 슬롯 모델. Montage `section-header` 의 row 패턴(타이틀 + 우측 보조 슬롯 + 우측 끝 액션 슬롯)을 CDS 토큰 위에 이식.

  - **사이즈 4단계** (`xs` / `sm` / `md` / `lg`) — 각각 `text-label1` / `text-headline1` / `text-heading1` / `text-title2` bold. `xs` 만 `label-alternative` 컬러(사이드바 그룹 라벨 용도), 나머지는 `label-strong`.
  - **슬롯 정렬** — `align-items: center`. row 전체 높이 = max(slot heights). Montage 는 baseline 을 쓰지만, 한글 타이틀 + Chip/Button 조합에서 어긋나 보이는 케이스가 있어 CDS 는 center 로 통일.
  - **타이틀 ↔ headingContent gap 은 사이즈별 차등** (xs `4` / sm·md `6` / lg `8`). 한 덩어리로 읽히도록 의도적으로 타이트하게.
  - **`not-prose` 자동 적용** — MDX `.prose` 컨테이너 안에서도 내부 `<h2>` 가 prose 의 margin 영향을 받지 않도록 root 에 박혀있다.
  - **`headingAs` 폴리모픽** — `h1`~`h6` 시맨틱 태그 선택.
  - **`color` override** — root 색만 바꾸고 자식은 inherit. 슬롯 안의 `IconButton` / `TextButton` 등은 자체 variant 색을 유지(헤더 색에 강제 동기화하지 않음).
  - **의도적으로 미포함**: ① `platform` prop (CDS 는 desktop-first 단일 밀도) ② `SectionHeader.Navigation` 페이지네이터 서브(추후 별도 `Pagination` 컴포넌트로) ③ eyebrow + 타이틀 + 설명 수직 적층 패턴(별도 페이지 헤더 컴포넌트로 분리 예정).

- ee00821: **SegmentedControl — 신규 컴포넌트 추가.**

  2-3지 단일 선택 인라인 컨트롤. 드롭다운형 `Select`와 인터랙션 모델이 다른 케이스(예: "인라인 / 분리됨", "대기열 추가 / 스티어링")를 위한 트랙 없는(track-less) 스타일.

  ### 스펙

  - 베이스: `@radix-ui/react-radio-group` (단일 선택 의미와 키보드 내비게이션 그대로 사용).
  - 사이즈: `sm` (`h-32 px-10 rounded-10 text-13`), `md` (`h-36 px-12 rounded-12 text-14`) — Button/Select와 동일 스케일.
  - 톤: neutral 단일. 선택 pill `--cds-fill-normal` + `--cds-label-normal`, 미선택 텍스트 `--cds-label-assistive`, hover 시 `--cds-fill-alternative`.
  - 너비: 기본 hug. `fullWidth` prop 시 컨테이너 채우며 segment 균등 분할.
  - 콘텐츠: 텍스트 라벨만 (아이콘 슬롯은 향후 필요 시 확장).
  - 애니메이션: 스냅 (배경 fade transition만).

  ### API

  ```tsx
  <SegmentedControl size="sm" value={mode} onValueChange={setMode}>
    <SegmentedControlItem value="inline">인라인</SegmentedControlItem>
    <SegmentedControlItem value="split">분리됨</SegmentedControlItem>
  </SegmentedControl>
  ```

  Exports: `SegmentedControl`, `SegmentedControlItem`, `segmentedControl` (tv recipe).

- a99f17d: **Select — `filled` variant 추가.**

  `SelectTrigger`에 `variant` prop 추가. 기본값 `outlined`(기존 동작).

  - `outlined`: 1px inset border + transparent 배경 (기존)
  - `filled`: 무테 + `--cds-fill-normal` grey 배경, hover/open 시 `--cds-fill-strong`로 한 단계 어두워짐

  focus-visible / aria-invalid ring과 disabled 처리는 두 variant 공통.

- 8f914ad: **`SidebarList` — 각 항목 우측에 hover-revealed trailing 슬롯 추가 (`renderItemTrailing`).**

  `renderItemTrailing?: (item) => ReactNode` 으로 각 항목 우측에 액션을 꽂을 수 있다. 평소엔 숨김, **hover · keyboard focus(focus-within) · selected · 내부에 `[data-state=open]` 인 노드(예: 열린 `DropdownMenu` 트리거)가 있을 때** 노출된다. 전형 조합은 `DropdownMenu` + `IconButton(DotsThree)` 메뉴 트리거.

  마크업/접근성 변경:

  - 각 항목을 `<button>` → `<div role="button" tabIndex={0}>` + Enter/Space 핸들러로 변경. 진짜 `<button>` 안에 또 다른 인터랙티브 트리거(IconButton + DropdownMenu)를 넣는 nested-button 위반을 피하기 위함. `aria-current` / `data-selected` / focus-visible ring 동작은 그대로 유지.
  - trailing 슬롯 영역의 `click` / `keydown` / `pointerdown` 은 내부에서 `stopPropagation` 되어 항목의 `onSelect` 를 트리거하지 않는다. consumer 쪽에서 별도로 막아줄 필요 없음.
  - trailing 이 있는 항목은 `pr-[10px]` → `pr-[6px]` 로 살짝 조여 IconButton 의 시각적 가장자리 정렬을 맞춘다 (없는 항목은 종전 그대로).

  기존 사용처는 prop 미지정 시 시각·동작 모두 동일.

- 8f914ad: **`SidebarList` — `stickyHeader` prop 추가.**

  `stickyHeader={true}` 시 섹션 헤더(타이틀 + count + actions)를 부모 스크롤 컨테이너 상단에 `position: sticky; top: 0` 로 고정한다. 항목 수가 많아 사이드바가 세로 스크롤될 때 섹션 헤더가 따라 올라가지 않고 그 자리에 머물게 하기 위함. 부모가 `overflow-y-auto` 일 때만 의미가 있다.

  - 기본값 `false` — 기존 사용처 시각 변화 없음.
  - 헤더 배경은 sticky 상태에서 사이드바 back-layer 토큰(`--cds-background-normal-alternative`, fallback `--cds-fill-normal`)으로 자동 채워서 스크롤되는 항목이 헤더 뒤로 비치지 않게 한다.
  - 헤더 하단 spacing 을 `mb-4px` → `pb-4px` (with `box-content`) 로 변경. 마진은 sticky 상태에서 배경이 비어 항목이 그 사이로 보이는 문제가 있어 패딩으로 흡수.

- 29121fd: **Switch — 사이즈/스테이트 정합성 보정.**

  트랙·thumb 비례를 다시 맞추고, off 트랙 색을 `--cds-fill-strong` 으로 환원. disabled 는 `opacity: 0.43` 으로 통일하고, 누름 탄성 효과(`:active` 시 thumb 가 padding 만큼 늘어남)를 추가.

  ### 사이즈 (Breaking)

  기존 2단(sm/md) → 3단(sm/md/lg) 으로 확장. 기본값은 그대로 `md` 지만, **이전 `md` 가 새 `lg` 에 해당**.

  |              | sm (new) | md (구 sm) | lg (구 md) |
  | ------------ | -------- | ---------- | ---------- |
  | track        | 30×18    | 39×24      | 52×32      |
  | thumb        | 14       | 18         | 24         |
  | padding      | 2        | 3          | 4          |
  | on translate | 12       | 15         | 20         |

  마이그레이션: `<Switch size="md" />` → `<Switch size="lg" />`, `<Switch size="sm" />` → `<Switch size="md" />`.

  ### 스타일

  - off track: `--cds-fill-strong`
  - on track: `--cds-primary-normal`
  - thumb: `--cds-color-common-100` (white) 고정
  - transition: `200ms cubic-bezier(0.4, 0, 0.2, 1)` (transform + width + background-color)
  - disabled: `opacity: 0.43`, `pointer-events: none`

- 3e7a0a7: **Tabs 를 icon-only segmented + 툴팁 내장 패턴으로 전면 교체. (Breaking)**

  기존 underline + text label 스타일을 폐기하고, skilled prototype 의 `SkillTabBar` 패턴을 CDS Tabs 로 흡수. 시맨틱(navigation, Radix Tabs)은 동일, 비주얼만 교체.

  ### Breaking changes

  - 트리거가 **icon-only** 로 전환. 텍스트 라벨은 더 이상 children 으로 받지 않고, `aria-label` 이 툴팁 + 스크린리더 라벨 역할을 동시에 수행
  - `aria-label` 이 `TabsTrigger` 에 **필수 prop**
  - `Tooltip` 이 `TabsTrigger` 내부에 자동으로 wrap. 부모 트리에 `TooltipProvider` 가 없어도 동작 (`Tabs` 가 자체 provider 를 둠)
  - `size` prop 제거 — **24×24 단일 사이즈** (skilled prototype 의 22×22 + icon 16 → CDS spacing 정렬 24 + icon 18, 비율 0.73→0.75 유지)
  - `resize` prop 제거 (`hug | fill`) — 사각 아이콘 버튼에서 fill 의미가 없음
  - underline indicator 제거. selected 상태는 fill bg 로 표현
  - `TabsTrigger` 가 자식 SVG 사이즈를 강제하므로 consumer 는 `<Icon>` 에 `size` 를 넘길 필요 없음

  ### 신규 prop

  - `TabsTrigger.tooltipSide`: `top | bottom | left | right` (기본 `bottom`). vertical Tabs 에서는 `right` 권장.

  ### 토큰 매핑

  | 속성           | 값                        |
  | -------------- | ------------------------- |
  | trigger size   | 24×24, 아이콘 18          |
  | trigger radius | `--cds-radius-6`          |
  | 컨테이너 gap   | `--spacing-2`             |
  | selected bg    | `--cds-fill-strong`       |
  | selected text  | `--cds-label-normal`      |
  | inactive text  | `--cds-label-alternative` |
  | hover bg       | `--cds-fill-normal`       |
  | hover text     | `--cds-label-neutral`     |
  | disabled text  | `--cds-label-disable`     |

  ### 시맨틱 분리

  비주얼이 `SegmentedControl` 과 비슷해 보일 수 있으나 시맨틱이 다르므로 두 컴포넌트는 분리 유지:

  - `Tabs` — 콘텐츠 패널 navigation (Radix Tabs, role=tab/tabpanel, arrow key)
  - `SegmentedControl` — form field value 선택

- a6d366b: **Tabs 에 `label` variant 추가.**

  기존 `segmented` (icon-only) 옆에 텍스트 라벨 형태의 `label` variant 를 더해 페이지 상단의 섹션 스위처 같은 용도를 흡수. 시맨틱(Radix Tabs)은 동일, 시각만 분기.

  ### 신규 prop

  - `Tabs.variant`: `segmented | label` (기본 `segmented`).
  - `label` variant 의 `TabsTrigger` 는 children 자리에 텍스트를 직접 넣고, 툴팁은 띄우지 않음 (텍스트 자체가 라벨 역할). `aria-label` 이 옵셔널로 완화.

  ### 토큰 매핑 — label variant

  | 속성            | 토큰                                  |
  | --------------- | ------------------------------------- |
  | trigger height  | 28px                                  |
  | trigger padding | `--spacing-8`                         |
  | trigger radius  | `--cds-radius-10`                     |
  | text            | 13/18 (label1)                        |
  | 컨테이너 gap    | `--spacing-4`                         |
  | selected bg     | `--cds-fill-normal`                   |
  | selected text   | `--cds-label-normal` + `font-medium`  |
  | hover text      | `--cds-label-normal` (배경 변화 없음) |

  `segmented` 가 `--cds-fill-strong` (chip 톤) 인 데 비해 `label` 은 한 단계 옅은 `--cds-fill-normal` 을 써서 배경을 약하게 깔고 weight 변화를 함께 시그널.

### Patch Changes

- bafdf3b: **Button/IconButton — solid·danger 인터랙션 시각 보정.**

  `hover:brightness-110 active:brightness-95` 가 사실상 무효였다. 브랜드 primary 가 cool-neutral-15(거의 검정)라 110% 밝기는 변화가 0.6% 수준으로 인지 불가, danger(red-50) 도 brightness 110% 는 톤이 빠지고 명도 변화가 작다.

  - **Button solid / IconButton solid** — 검정 위에선 더 밝아지는 방향이 자연스러우므로 `color-mix(in srgb, var(--cds-primary-normal) 86%, white)` (hover) / `92%` (active) 로 white 를 섞음. (`--cds-primary-strong/heavy` 토큰은 cool-neutral 15 → 10 → 5 방향이라 거꾸로 더 어두워져 사용하지 않음.)
  - **Button danger — 톤 자체를 soft 로 변경.** filled 빨강(white-on-red) 대신 light pink + red text 로 재정의. 파괴적 액션을 시각적으로 약하게 가져가서 일반 outlined 와 위계를 분리하면서도 빨강의 의미는 유지.
    - bg `var(--cds-color-red-95)`, text `var(--cds-accent-foreground-red)` (red-40, AA 대비)
    - hover `red-90` / active `red-80` 로 진해짐
  - 더이상 의미 없는 `disabled:hover:brightness-100` 안전망 제거.

- 1d5e9a6: **ChatComposer — root 슬롯의 `pt-[6px]` 제거.**

  상단 6px 의 컴포넌트 자체 패딩이 위쪽 콘텐츠(메시지 스레드의 `padding-bottom` 등) 와 더해져 이중 여백처럼 보이는 케이스가 있어서 제거. 호출자가 필요하면 외부 wrapper 또는 `className` override 로 명시적으로 추가.

  좌우 16px / 하단 16px 은 유지.

- 2e0cb99: `ChatLoadingDots` 를 3-dot wave 에서 단일 점 pulse 로 변경하고 `size` prop 제거.

  3-dot 메신저식 typing indicator 가 AI 어시스턴트 컨텍스트에서 올드하게 읽히는 문제 해결. 단일 점(8px)이 `scale 0.85↔1` + `opacity 0.5↔1` 로 호흡한다 (1.4s ease-in-out). 동일한 컴포넌트로 block placeholder · inline trailing 두 컨텍스트를 모두 커버하므로 `size` variant 는 불필요해 제거.

  cds-core 에서는 `cds-dot-wave` keyframe / `.cds-animate-dot-wave` 유틸을 `cds-dot-pulse` / `.cds-animate-dot-pulse` 로 교체.

- 7bb540f: 마크다운 표 스타일 정리 + chat assistant 표 가로 스크롤 격리.

  - `cds-markdown`: fumadocs `.prose` 컨텍스트에서 leak 되던 헤더 셀 배경(`var(--color-fd-muted)`) 명시적으로 transparent 로 reset. `:is(th, td)` 가 Lightning CSS 의 `:-webkit-any()` fallback emission 으로 의도치 않게 (0,2,0) specificity 가 돼 `thead th` border 를 덮어쓰는 문제를 `th, td` 분리 selector 로 해결. 마지막 `tbody` row 의 bottom border 제거 (표 맨 아래 outer line 사라짐). 헤더 아래 / row 사이 line 은 유지. 셀 `min-width: 120px` 추가 — 컬럼 squish 방지 + 채팅 폭보다 자연스럽게 넓어져 가로 스크롤 트리거.
  - `cds-ui` `ChatAssistantMessage`: root / text slot 에 `w-full min-w-0` 추가. flex item 의 기본 `min-width: auto` 때문에 wide 테이블이 메시지 영역 자체를 부풀리던 문제 해결. 이제 메시지는 채팅 폭에 묶이고 표 영역(`.cds-markdown-table-scroll`) 안에서만 가로 스크롤.

- 6d50734: `Separator` vertical 높이를 `h-full` → `h-[1em]` 으로 변경.

  부모에 명시적 `height` 가 없어도 현재 `font-size` 기준 1em 길이로 자연스럽게 그려지도록 함. 기존에는 부모가 명시 높이를 갖지 않으면 0으로 무너지던 문제 해결.

- 56143ee: **`SidebarMenu` — selected 진입 시 아이콘 1회 pop 모션 추가.**

  `cds-core` 에 `@keyframes cds-icon-pop` + `.cds-animate-icon-pop` 유틸을 추가하고, `SidebarMenu` 항목이 selected 가 될 때 아이콘에 1회 적용한다. 회전 -12deg → +5deg(overshoot) → 0deg + scale 0.88 → 1.06 → 1, `--cds-duration-slow` / `--cds-ease-out`. 책이 비스듬히 탁 자리 잡는 느낌.

  `prefers-reduced-motion: reduce` 환경에서는 다른 CDS 모션과 동일하게 비활성화된다. `regular → fill` weight 전환은 종전과 동일.

- bfec822: **`tv()` / `cn()` — CDS typography 유틸이 `text-[color:...]` 와 충돌하던 silent bug 수정.**

  `tailwind-merge` 의 기본 config 는 `body2`, `title1` 같은 CDS 커스텀 사이즈
  이름을 모르기 때문에 `text-body2 text-[color:var(--cds-label-normal)]` 같은
  조합을 만나면 두 클래스를 같은 그룹으로 보고 한쪽을 드롭했다. 이 때문에
  `ChatAssistantMessage`, `ChatUserMessage`, `Chip`, `SectionHeader` 등에서
  typography 사이즈가 사라지고 부모의 14px 가 그대로 inherit 되던 문제가 발생.

  수정:

  - `packages/cds-ui/src/utils/tw-merge-config.ts` 신설 — CDS typography 변종
    (`display1`, `title1~3`, `heading1~2`, `headline1`, `body1`, `body1-reading`,
    `body2`, `label1~2`, `caption1~2`, `code`) 을 `font-size` 그룹으로 등록.
  - `packages/cds-ui/src/utils/tv.ts` 신설 — `createTV({ twMergeConfig })` 로
    주입한 `tv` 를 export.
  - `cn.ts` — `extendTailwindMerge(twMergeConfig)` 적용.
  - cds-ui 컴포넌트 전부 `tailwind-variants` 직접 import 대신 `../utils/tv` 의
    `tv` 를 사용하도록 정리.

  이제 `text-body2` 와 `text-[color:...]` 를 한 className 안에 같이 써도 모두
  유지된다. 외부 사용자가 직접 `tailwind-variants` 의 `tv` 를 쓰면 같은 함정에
  빠질 수 있으니 CDS 토큰을 className 으로 합성하는 코드는 가급적 CDS 가
  제공하는 컴포넌트/유틸을 통해 사용하길 권장.

- Updated dependencies [2e0cb99]
- Updated dependencies [aebd24b]
- Updated dependencies [6cdfa90]
- Updated dependencies [2fe1899]
- Updated dependencies [87d4191]
- Updated dependencies [56143ee]
  - @tendtoyj/cds-core@0.1.0
  - @tendtoyj/cds-icons@0.1.0
