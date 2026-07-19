# @tendtoyj/cds-markdown

## 0.3.0

## 0.2.2

### Patch Changes

- bbf6bed: Synchronize `cds-markdown` at the `0.2.2` migration baseline so core, icons, markdown, and the immutable UI registry manifest resolve to one release version. There are no markdown runtime or style changes from `0.2.1`.

## 0.2.1

Fixed group version synchronization only; no consumer-visible markdown changes.

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

- 5feb4ff: 신규 패키지 `@tendtoyj/cds-markdown` 추가, `ChatUserMessage` 에 `renderMarkdown` slot 추가.

  채팅 메시지(user/assistant) 양쪽 모두 markdown 이 필요하지만 CDS 자체는 렌더러 의존을 가지지 않는다는 슬롯 패턴을 유지한다. 권장 구현체로 `react-markdown + remark-gfm` 기반 패키지를 별도로 제공.

  - `@tendtoyj/cds-markdown` 신규 — `Markdown` 컴포넌트 + `renderMarkdown(text)` 헬퍼 export. ChatUser/Assistant 의 `renderMarkdown` slot 에 그대로 꽂아 쓰는 형태.
  - `ChatUserMessage` 에 `renderMarkdown?: (text) => ReactNode` slot 추가. `ChatThread` 가 동일 함수를 user/assistant 양쪽에 패스스루.
  - `ChatAssistantMessage` 의 `renderMarkdown` 미주입 폴백을 `<pre>` 에서 `whitespace-pre-wrap` plain text 로 변경 (user 와 톤 통일).
  - 문서 신규: [Chat Markdown](/docs/components/chat-markdown) — 권장 패키지 설치·사용·보안·커스터마이즈 가이드.

  분리 이유: chat 안 쓰는데 markdown 만 필요한 컨슈머가 `cds-ui` deps 그래프를 받지 않도록. `cds-icons` 가 `cds-ui` 와 분리된 것과 같은 원칙.

### Patch Changes

- 7bb540f: 마크다운 표 스타일 정리 + chat assistant 표 가로 스크롤 격리.
  - `cds-markdown`: fumadocs `.prose` 컨텍스트에서 leak 되던 헤더 셀 배경(`var(--color-fd-muted)`) 명시적으로 transparent 로 reset. `:is(th, td)` 가 Lightning CSS 의 `:-webkit-any()` fallback emission 으로 의도치 않게 (0,2,0) specificity 가 돼 `thead th` border 를 덮어쓰는 문제를 `th, td` 분리 selector 로 해결. 마지막 `tbody` row 의 bottom border 제거 (표 맨 아래 outer line 사라짐). 헤더 아래 / row 사이 line 은 유지. 셀 `min-width: 120px` 추가 — 컬럼 squish 방지 + 채팅 폭보다 자연스럽게 넓어져 가로 스크롤 트리거.
  - `cds-ui` `ChatAssistantMessage`: root / text slot 에 `w-full min-w-0` 추가. flex item 의 기본 `min-width: auto` 때문에 wide 테이블이 메시지 영역 자체를 부풀리던 문제 해결. 이제 메시지는 채팅 폭에 묶이고 표 영역(`.cds-markdown-table-scroll`) 안에서만 가로 스크롤.
