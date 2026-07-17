# CDS DESIGN.md Profiles

Codexy Design System(CDS)의 시각 언어를 코드·패키지 설치 없이 다른 제작 환경으로 옮기기 위한 독립형 테마 번역본이다. 각 프로필의 `DESIGN.md`는 하나만 전달해도 사용할 수 있으며, 다른 프로필을 불러오거나 병합하지 않는다.

## Source of truth

```text
CDS code (implementation SSOT)
  → curated platform translation
    → standalone DESIGN.md profile
```

- CDS 코드는 실제 토큰, 컴포넌트, 동작의 SSOT다.
- 이 디렉터리는 코드를 대체하지 않고 시각적 의도와 플랫폼 적용 규칙을 번역한다.
- `general`은 개념적 기준이지만 파일 상속은 없다. Desktop, Mobile, Web은 공통 내용을 각 파일 안에 완전히 포함한다.
- Mobile과 Web에만 있는 navigation, sheet, safe-area, responsive 규칙은 `new translation`이며 현재 CDS 컴포넌트 구현을 의미하지 않는다.

## Profiles

| Profile | Primary scenario | Density and input | Explicitly avoids |
| --- | --- | --- | --- |
| `general` | 플랫폼이 아직 정해지지 않은 UI, 테마 탐색, 범용 프로토타입 | 특정 viewport·입력 장치 비종속 | AppShell, 영구 sidebar, bottom navigation을 기본값으로 강제하지 않음 |
| `desktop` | macOS/Windows 데스크탑 앱, Electron/Tauri, 고밀도 작업 도구 | 14px body, comfortable controls, pointer + keyboard | mobile safe area, bottom navigation, full-screen sheet |
| `mobile` | native mobile 또는 app-like PWA | 16px body, 44px 이상 touch target, touch-first | hover 의존, 영구 sidebar, 3-panel shell |
| `web` | 320px부터 wide desktop까지 반응하는 SaaS/product UI | 16px body, keyboard + pointer + coarse touch | OS titlebar, draggable window chrome, marketing hero 중심 구성 |

## Profile contract

### Shared invariants

다음은 네 프로필에서 동일해야 한다.

| Area | Invariant |
| --- | --- |
| Color | 중립적인 black primary, blue focus ring, semantic status 색, light canvas/surface 관계 |
| Typography | SF Pro/Pretendard 계열 sans, SF Mono 계열 mono, 동일한 role과 weight 체계 |
| Spacing | 0/0.5/1/2/4/6/8/10/12/14/16/20/24/32/40/48/56/64/72/80px 스케일 |
| Shape | 0/2/4/6/8/10/12/16/full radius와 부드러운 squircle 성격 |
| Elevation | box/drop/glow의 역할 구분, 무겁고 탁한 그림자 억제 |
| Motion | 빠르고 절제된 transition, standard easing, reduced-motion 우선 |
| Components | solid/outlined/frosted/danger의 의미, semantic color 우선, primary CTA 절제 |
| AI UI | user message bubble, assistant plain content, trace와 composer의 명확한 상태 표현 |

### Platform adaptations

다음은 프로필 목적에 따라 의도적으로 달라진다.

| Area | General | Desktop | Mobile | Web |
| --- | --- | --- | --- | --- |
| Body type | CDS role baseline | 14px | 16px | 16px |
| Control size | 특정 높이 강제 안 함 | 28/32/36/44px | 40/44/48/56px | 40–44px baseline |
| Layout | 플랫폼 비종속 | 960px 이상, 최대 3-panel | 320–599px single column | compact/medium/wide responsive |
| Navigation | 의미만 정의 | persistent sidebar, tabs | bottom navigation, temporary drawer | app header, collapsible sidebar |
| Overlay | modal/popover 역할 | centered dialog, popover, tooltip | bottom sheet/full-screen 우선 | viewport-aware dialog/popover |
| Feedback | 입력 방식 중립 | hover + focus + keyboard | pressed + selected + focus | hover + focus, coarse touch 동등 지원 |

## Provenance

| Field | Value |
| --- | --- |
| Translation baseline | CDS packages `0.2.1` |
| Source commit | `3719f27` |
| DESIGN.md format | Google Labs alpha specification |
| Theme coverage | Light only |
| Last reviewed | 2026-07-17 |

프로필을 갱신할 때 package version, source commit, format version, last reviewed를 함께 변경한다. 작업 트리의 미커밋 변경은 provenance 기준에 포함하지 않는다.

## Source map

| Translation area | Primary code source | Design rationale source | Provenance |
| --- | --- | --- | --- |
| Primitive and semantic color | `packages/cds-core/src/styles/tokens/color-*.css` | `apps/docs/content/docs/foundations/color.mdx` | `source` |
| Typography | `packages/cds-core/src/styles/tokens/typography.css` | `apps/docs/content/docs/foundations/typography.mdx` | `source` |
| Spacing | `packages/cds-core/src/styles/tokens/spacing.css` | `apps/docs/content/docs/foundations/spacing.mdx` | `source` |
| Radius and squircle | `packages/cds-core/src/styles/tokens/radius.css` | `apps/docs/content/docs/foundations/radius.mdx` | `source` |
| Control density | `packages/cds-core/src/styles/tokens/control.css` | component MDX files | Desktop `source`, Mobile/Web `derived` |
| Elevation | `packages/cds-core/src/styles/tokens/shadow.css` | `apps/docs/content/docs/foundations/shadow.mdx` | `source` |
| Motion | `packages/cds-core/src/styles/tokens/motion.css` | `apps/docs/content/docs/foundations/motion.mdx` | `source` |
| Layering | `packages/cds-core/src/styles/tokens/zindex.css` | `apps/docs/content/docs/foundations/z-index.mdx` | Desktop `source`, others `derived` |
| Component tone and state | `packages/cds-ui/src/components/*.tsx` | `apps/docs/content/docs/components/*.mdx` | `source` |
| Desktop shell/sidebar/chat | AppShell and chat component sources | `apps/docs/content/docs/patterns/*.mdx` | Desktop `source` |
| Mobile navigation/sheet/safe area | — | CDS visual principles + touch density | `new translation` |
| Web responsive layout | — | CDS visual principles + browser constraints | `new translation` |

### Provenance labels

- `source`: 현재 CDS 코드와 문서에서 직접 확인되는 값 또는 규칙.
- `derived`: CDS의 기존 토큰과 원칙을 다른 density나 viewport에 맞게 조정한 규칙.
- `new translation`: 현재 CDS 코드에는 없지만 해당 플랫폼에서 같은 시각 언어를 유지하기 위해 새로 정의한 규칙.

## Semantic color translation

frontmatter에는 CSS 변수 이름 대신 생성 도구가 바로 이해할 semantic role을 사용한다.

| DESIGN.md role | CDS source role | Intent |
| --- | --- | --- |
| `primary` | `primary-normal` | 가장 중요한 action과 강한 강조 |
| `on-primary` | `inverse-label` | primary surface 위 content |
| `focus-ring` | `focus-ring` | keyboard focus와 선택 확인 |
| `canvas` | `background-normal-normal` | 기본 화면 배경 |
| `canvas-subtle` | `background-normal-alternative` | 낮은 단계의 배경 구획 |
| `surface` | `background-elevated-normal` | 카드·패널·dialog surface |
| `label` | `label-normal` | 기본 텍스트 |
| `label-strong` | `label-strong` | 제목과 핵심 정보 |
| `label-muted` | `label-alternative` | 보조 설명과 metadata |
| `label-assistive` | `label-assistive` | placeholder와 약한 안내 |
| `line` | `line-normal-normal` | 기본 separator와 outline |
| `fill` | `fill-normal` | subtle interaction fill |
| `positive` | `status-positive` | 성공 상태 |
| `cautionary` | `status-cautionary` | 경고 상태 |
| `negative` | `status-negative` | 오류·파괴적 상태 |

`spacing.css`가 현재 `theme.css` 기본 import에서 제외되는 것은 Tailwind 소비 방식의 제약이다. DESIGN.md에서는 spacing scale 자체가 유효한 시각 언어이므로 그대로 번역하며, 코드 import 동작과 혼동하지 않는다.

## Scope boundaries

- v1은 light theme만 제공한다. CDS 코드에 dark token이 추가되기 전에는 값을 추정하지 않는다.
- Web은 SaaS/product UI를 기본으로 하며 marketing landing page와 editorial publication을 다루지 않는다.
- Mobile은 디자인 번역만 제공한다. React Native, SwiftUI, Android View 구현을 제공하지 않는다.
- Desktop은 OS window chrome을 재현하지 않는다. CDS가 담당하는 것은 window 내부 layout과 surface hierarchy다.
- DESIGN.md는 React props, package import, Tailwind utility, Radix API 문서가 아니다.
- 모든 프로필의 정식 제목은 공식 DESIGN.md section order를 따른다. responsive, motion, safe area는 canonical section 아래 하위 규칙으로 둔다.
