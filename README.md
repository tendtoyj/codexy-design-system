# Codexy Design System (CDS)

The Codexy 앱의 **단일 UI 소스**. 토큰 · 프리미티브 · AI 친화 컴포넌트가 하나의 체계로 묶인 모노레포.

- **코드가 SSOT** — Figma 는 역생성으로 유지
- **macOS-first, Windows-ready** — Electron 37+ 대상 최적화
- **AI 친화** — Claude / Cursor 가 읽고 수정하기 쉬운 구조
- **Stack** — Tailwind v4 + Radix UI + `tailwind-variants`, React 19

---

## 상태

**Pre-1.0.** 0.x 동안은 breaking change 가 자유롭게 들어옵니다. 1.0 이전까지는 마이너 단위 차이도 깨지는 변경을 포함할 수 있습니다.

| 버전 | 날짜 | 요약 |
| --- | --- | --- |
| `0.1.0` | 2026-05-05 | 첫 공개 — 토큰 7 카테고리(color · typography · spacing · radius · shadow · z-index · motion), 컴포넌트 8 그룹(Primitives · Actions · Form · Layout · Navigation · Overlays · Feedback · AI/Agent Chat), `cds-markdown` chat 슬롯 렌더러 동봉 |

---

## 패키지 구성

CDS 는 **하이브리드 배포** — 패키지마다 소비 방식이 다르다.

| 패키지 | 역할 | 배포 채널 | 소비자 입장 |
| --- | --- | --- | --- |
| [`@tendtoyj/cds-core`](packages/cds-core) | 토큰(`@theme`), Tailwind preset, Pretendard, motion, utility helpers (`cn`/`tv`) | **npm** (GitHub Packages) | `pnpm add` 후 `import` |
| [`@tendtoyj/cds-icons`](packages/cds-icons) | phosphor 래퍼 + CDS 네이티브 아이콘 + 브랜드 아이콘 | **npm** (GitHub Packages) | `pnpm add` 후 `import` |
| [`@tendtoyj/cds-markdown`](packages/cds-markdown) | chat 슬롯용 markdown 렌더러 (react-markdown + remark-gfm) | **npm** (GitHub Packages) | `pnpm add` 후 `import` |
| [`@tendtoyj/cds-ui`](packages/cds-ui) | Radix + Tailwind 컴포넌트 | **shadcn 레지스트리** (소스 복사) | `npx shadcn add` 로 파일을 소비자 레포에 복사 |

### 왜 둘로 나눠 놨나

- **core / icons / markdown** 은 한 번 정해지면 거의 안 바뀌는 인프라(토큰 · CSS · 아이콘 · 마크다운). 의존성으로 잠가두고 한꺼번에 업데이트하는 게 깔끔.
- **ui** 는 컴포넌트 — 앱마다 살짝씩 다른 인터랙션 · 스타일 요구가 생긴다. shadcn 모델은 "복사해서 그 자리에서 고친다" 가 핵심. 변형 자유도가 필요한 컴포넌트는 의존성으로 잠그지 않고 소스로 푼다.

---

## 빠른 시작

### 1. `.npmrc` 인증 (1회)

GitHub Packages 는 비공개 레지스트리. 소비자 레포 루트에:

```ini
# .npmrc
@tendtoyj:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

각 개발자는 로컬 `~/.npmrc` 또는 환경변수 `GITHUB_TOKEN` 으로 자기 PAT(`read:packages` scope) 를 주입. CI 에서는 `secrets.GITHUB_TOKEN` 을 그대로 쓰면 된다.

### 2. core / icons / markdown 설치

```bash
pnpm add @tendtoyj/cds-core @tendtoyj/cds-icons @tendtoyj/cds-markdown
```

> `cds-markdown` 은 chat 메시지 렌더링이 필요한 앱만 설치하면 된다.

### 3. 토큰 + Tailwind preset 연결

앱 루트 CSS 한 줄:

```css
/* app/globals.css 같은 데 */
@import "@tendtoyj/cds-core/styles";
```

이걸 import 하면 토큰(`--cds-color-*`, `--cds-spacing-*`, `--cds-motion-*` 등) · Pretendard · 기본 reset 이 한 번에 들어온다.

Tailwind 설정에 preset:

```ts
// tailwind.config.ts
import { codexyPreset } from "@tendtoyj/cds-core/tailwind-preset";

export default {
  presets: [codexyPreset],
  // ...
};
```

### 4. UI 컴포넌트 설치 (필요한 것만)

```bash
npx shadcn add https://codexy-design-system-docs.vercel.app/r/button
npx shadcn add https://codexy-design-system-docs.vercel.app/r/dialog
npx shadcn add https://codexy-design-system-docs.vercel.app/r/chat-user-message
```

설치 가능한 컴포넌트 전체 목록은 레지스트리 인덱스에서 확인 — 브라우저나 `curl` 로 한번 받아두면 된다:

```
https://codexy-design-system-docs.vercel.app/r/registry.json
```

(`/r/index.json` 아님 — shadcn 컨벤션상 인덱스 파일명은 `registry.json` 이다.)

이게 하는 일: CDS 레포의 `packages/cds-ui/src/components/button.tsx` 를 **너의 레포 안의 `components/ui/button.tsx` 로 복사**. 의존성이 아니다. 이후 그 파일은 소비자 레포가 소유 — 마음대로 수정 가능.

복사된 파일은 `@tendtoyj/cds-core` 에서 `cn` / `tv` / `VariantProps` 를 import 한다 — 위 3 단계에서 `cds-core` 를 이미 깔았다면 그대로 빌드된다. shadcn 의 `lib/utils.ts` 를 따로 만들 필요 없음 (레지스트리에 `utils` 항목이 없고, `cn` 의 SSOT 는 `cds-core`).

---

## 사용

### 컴포넌트

```tsx
import { Button } from "@/components/ui/button";

<Button variant="solid" size="md">저장</Button>
```

### 아이콘

```tsx
import { Plus, ArrowRight } from "@tendtoyj/cds-icons/icons";

<Plus size={16} />
```

브랜드 로고(AI 모델/벤더):

```tsx
import { Anthropic, OpenAI } from "@tendtoyj/cds-icons/brands";
```

### Markdown 렌더러 (chat 메시지 슬롯)

```tsx
import { renderMarkdown } from "@tendtoyj/cds-markdown";
import "@tendtoyj/cds-markdown/styles";

<ChatAssistantMessage content={text} renderMarkdown={renderMarkdown} />
```

### Utility helpers (자체 컴포넌트 만들 때)

CDS 와 동일한 `cn` / `tv` 헬퍼 사용 가능. `tv` 는 CDS typography variants(`text-body2` 등) 까지 인식하는 `tailwind-variants` 래퍼이고, `cn` 도 같은 config 를 공유한다.

```tsx
import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
```

소비자 레포에서 별도로 `tailwind-variants` 를 설치할 필요 없음 — `cds-core` 가 잠긴 의존으로 갖고 있다.

### 소비자 레포 최종 구조

```
소비자 레포
├── .npmrc                                    # 1회 세팅
├── package.json
│   └── deps: @tendtoyj/cds-core,
│             @tendtoyj/cds-icons,
│             @tendtoyj/cds-markdown        ← 잠긴 의존성
├── app/globals.css
│   └── @import "@tendtoyj/cds-core/styles" ← 토큰 진입점
├── components/ui/                            ← shadcn 으로 복사된 CDS-UI 컴포넌트
│   ├── button.tsx
│   ├── dialog.tsx
│   └── ...
└── tailwind.config.ts
    └── presets: [codexyPreset]
```

---

## 업데이트

두 채널이 다르게 동작.

### core / icons / markdown — 자동 / 잠금

CDS 레포에 변경 → Changesets 가 버전 bump → publish → 소비자 레포에서:

```bash
pnpm update @tendtoyj/cds-core @tendtoyj/cds-icons @tendtoyj/cds-markdown
```

semver 따라 자동 호환. 토큰 값이 변하거나 새 토큰이 추가되면 다음 빌드부터 반영. **소비자가 수정하지 않는 영역**이라 충돌 없음.

### ui — 수동 / 명시적

shadcn 모델은 **자동 업데이트가 없다**. 컴포넌트는 이미 소비자 레포의 일부니까 CDS 가 변경됐는지 모른다. 두 가지 길:

1. **재실행해서 덮어쓰기** (소비자가 수정 안 했을 때)
   ```bash
   npx shadcn add https://codexy-design-system-docs.vercel.app/r/button --overwrite
   ```
2. **수동 머지** (소비자가 컴포넌트를 수정해서 살짝 갈라졌을 때)
   - CDS 레포의 새 버전 소스를 보고 변경분만 골라 적용.
   - 또는 `git diff` 로 비교해서 cherry-pick.

#### Tradeoff

- **자유도**: 컴포넌트별 변형 · 삭제 · 확장 가능 (앱마다 다른 요구 흡수).
- **부담**: 업데이트가 명시적 → 누락 위험. CDS 변경 공지(GitHub Release / `CHANGELOG.md` / Slack) 를 잘 받아야 함.

부담을 줄이려고 보통 — 앱들은 주기적으로 (예: 스프린트 시작 때) 의도적인 "CDS sync" 시간을 따로 잡는다.

---

## FAQ

**Q. UI 컴포넌트를 고쳐서 쓰고 싶다**
→ 그게 바로 shadcn 모델의 의도. 복사된 파일은 그 레포 소유라 마음대로 수정. CDS 자체에 반영하고 싶다면 CDS 레포로 PR.

**Q. 토큰 값만 바뀌고 컴포넌트 코드는 그대로일 때**
→ `cds-core` 만 업데이트. 컴포넌트는 `var(--cds-*)` 만 참조하니 자동으로 새 값을 따라간다.

**Q. 0.x 동안 잦은 breaking change 가 걱정된다**
→ 0.x 동안은 정확한 버전(`~0.1.0` 또는 정확 버전) 으로 핀 권장. 1.0 이후엔 semver 안전.

**Q. 앱이 두 개 이상이면 동기화는?**
→ 모든 앱이 같은 changelog 를 보고 같은 타이밍에 sync. CDS 가 메인 채널(GitHub Release / Slack 알림 등) 로 공지하면 된다. 강제할 도구는 없음 (의도적). 앱별로 CDS 버전 다르게 가져갈 수 있는 게 단점이자 장점.

**Q. Markdown 렌더러를 직접 만들고 싶다**
→ `cds-markdown` 은 권장 구현체일 뿐. `ChatUserMessage` · `ChatAssistantMessage` 가 받는 `renderMarkdown?: (text: string) => ReactNode` slot 에 임의 렌더러를 끼워도 된다. streaming 친화 변형, 자체 syntax highlighter, Anthropic SDK helper 등 — 앱이 원하는 대로.

---

## 메인테이너 — 변경이 CDS 안에서 흘러가는 경로

```
1. CDS 레포에서 컴포넌트 / 토큰 수정 (예: Button.tsx)
2. PR 만들 때 `pnpm changeset` 으로 변경 종류 기록 (major/minor/patch)
3. PR 머지 → main push
4. release.yml 발동
   → Changesets 가 누적된 changeset 들을 모아 "Release PR" 자동 생성
     (이 PR 안에 version bump + CHANGELOG 업데이트)
5. 메인테이너가 Release PR 검토 후 머지
6. release.yml 다시 발동
   → core/icons/markdown 은 GitHub Packages 에 publish
   → ui 는 registry.json 이 갱신되어 shadcn 으로 항상 최신을 받게 됨
   → GitHub Release 자동 생성
7. 소비자 레포들이 변경분을 수신 (위 "업데이트" 절차)
```

**핵심**: 메인테이너는 changeset 만 신경 쓰면 된다. 버전 매기기 · publish · 태그 · changelog 는 모두 워크플로우가 처리.

---

## 문서 (카탈로그)

`apps/docs` 가 CDS 의 **컴포넌트 · 토큰 카탈로그**입니다.
[fumadocs](https://fumadocs.vercel.app/) (Next.js 15) 기반이고, 다음 영역으로 구성됩니다.

| 경로 | 내용 |
| --- | --- |
| `/` | 홈 — CDS 개요 |
| `/docs/foundations/*` | 컬러 · 타이포 · 간격 · 라디우스 · 그림자 · 모션 · z-index 토큰 가이드 |
| `/docs/components/*` | 컴포넌트별 사용법 · variant · slot · 코드 예시 |
| `/docs/patterns/*` | 컴포넌트 조합 가이드 (chat · sidebar 등) |
| `/docs/examples/*` | 화면 단위 데모 |

로컬 실행:

```bash
pnpm install
pnpm --filter docs dev
# → http://localhost:3000
```

> 0.1.1 부터 https://codexy-design-system-docs.vercel.app 에서 docs + shadcn registry 가 호스팅됩니다. 커스텀 도메인은 후속.

---

## 개발

이 모노레포는 [pnpm](https://pnpm.io) + [Turborepo](https://turbo.build/repo) 기반입니다.

```bash
pnpm install        # 의존성 설치
pnpm build          # 모든 패키지 빌드
pnpm typecheck      # 타입 체크
pnpm lint           # Biome 린트
pnpm dev            # docs 앱 + watch 빌드
```

요구 조건:

- Node.js `>= 22.11.0`
- pnpm `10.6.5` (`packageManager` 필드로 고정)

### 변경사항 기록

PR 단위로 [Changesets](https://github.com/changesets/changesets) 를 사용합니다.
사용자 영향 변경이 있으면 PR 에 changeset 을 첨부:

```bash
pnpm changeset
```

`major` / `minor` / `patch` 중 선택 → 짧은 요약 작성. 누적된 changeset 은 머지 시점에 Release PR 로 자동 묶여 다음 버전에 반영됩니다.

---

## 라이선스

[MIT](LICENSE) — Copyright (c) 2026 The Codexy. 상업적 목적을 포함한 모든 용도로 자유롭게 사용·수정·배포할 수 있으며, 저작권 표시와 라이선스 전문을 포함해야 합니다.

CDS 의 일부는 [Wanted Montage (WDS)](https://github.com/wanteddev/montage-web) 를 토대로 합니다 (Copyright (c) 2026 Wanted Lab, Inc., MIT). 원저작권 고지는 [`LICENSE`](LICENSE) 의 THIRD-PARTY NOTICES 에 포함되어 있습니다.
