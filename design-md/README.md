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

### Selection guide

| If the product is primarily… | Choose | Why |
| --- | --- | --- |
| 아직 플랫폼이 정해지지 않은 프로토타입 또는 테마 탐색 | `general` | 플랫폼 구조를 강제하지 않고 CDS의 시각 언어와 component tone만 전달한다. |
| 설치형 macOS/Windows 작업 도구, Electron/Tauri 앱 | `desktop` | 고밀도 pointer·keyboard UI, persistent navigation, multi-panel workspace를 정의한다. |
| native mobile 또는 app-like PWA의 phone-first 경험 | `mobile` | touch target, bottom navigation, sheet, safe area, keyboard 대응을 정의한다. |
| 브라우저 기반 SaaS/product UI | `web` | compact/medium/wide reflow와 mixed-input interaction을 정의한다. |

여러 파일을 동시에 주지 않는다. 실제 결과가 두 플랫폼을 함께 다뤄야 한다면 대표 소비 환경의 프로필 하나를 선택하고, 다른 환경의 요구사항은 별도 제품 요구사항으로 전달한다.

## Standalone usage

1. 만들려는 결과의 기본 소비 환경을 위 표에서 고른다.
2. 해당 폴더의 `DESIGN.md` 한 파일만 생성 도구 또는 작업자에게 전달한다.
3. 제품 기능, 콘텐츠, 화면 목적을 별도 prompt로 제공한다.
4. 생성 결과를 아래 rubric으로 검토한다.

권장 지시문:

```text
Use the attached DESIGN.md as the complete visual and platform profile.
Apply its structured tokens exactly and follow its prose rules for layout,
interaction, overlays, and AI content. Do not assume access to CDS code or packages.
```

`general/DESIGN.md`를 먼저 주고 다른 파일로 덮어쓰는 방식은 사용하지 않는다. 모든 프로필은 공통 토큰을 이미 포함한 독립 문서다.

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

Format reference는 [Google Labs DESIGN.md repository](https://github.com/google-labs-code/design.md)와 [alpha specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)을 따른다. 현재 spec은 alpha이므로 구조 변경 가능성을 전제로 유지보수한다.

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

## Evaluation prompts

네 프로필을 비교할 때 기능은 같게 유지하고 프로필만 바꾼다. 그래야 브랜드 불변값과 플랫폼 번역값을 분리해서 볼 수 있다.

### Common prompts

**Settings and form**

```text
Create an account settings screen with profile fields, notification preferences,
save and cancel actions, inline validation, loading, success, and error states.
```

**Destructive action**

```text
Add a delete-workspace flow with consequence copy, confirmation input,
cancel path, destructive action, and recoverable error feedback.
```

**AI conversation**

```text
Create an AI conversation area with a user message, long assistant answer,
tool activity trace, attachments, streaming state, and composer with stop action.
```

### Profile-specific prompts

| Profile | Prompt |
| --- | --- |
| Desktop | `Create a multi-panel research workspace with persistent navigation, a resizable context panel, removable chat sessions, and a docked composer.` |
| Mobile | `Create a phone-first session list and single active AI thread with bottom navigation, a bottom sheet action menu, virtual keyboard, and safe-area-aware composer.` |
| Web | `Create a responsive SaaS analytics dashboard that reflows through compact, medium, and wide ranges with collapsible navigation, filters, a data table, and contextual AI panel.` |

### Review rubric

| Axis | Pass condition | Typical failure |
| --- | --- | --- |
| Color identity | black primary, cool neutral layers, blue focus, semantic status가 일관된다. | blue를 모든 CTA의 브랜드 accent로 남용한다. |
| Type hierarchy | role, weight, line height로 정보 위계를 만들고 reading copy가 충분히 열린다. | 모든 텍스트가 같은 크기이거나 marketing display type이 지배한다. |
| Density | General은 중립, Desktop은 고밀도, Mobile은 touch, Web은 responsive baseline이다. | Desktop을 과도하게 키우거나 Mobile target을 44px 아래로 만든다. |
| Navigation | 각 프로필의 기본 구조와 viewport 전환이 문서 규칙을 따른다. | phone에 영구 sidebar를 두거나 Web에 OS titlebar를 그린다. |
| Overlay | Desktop dialog/menu, Mobile sheet/full-screen, Web collision-aware overlay가 구분된다. | 모든 환경에서 같은 centered modal만 사용한다. |
| Interaction | focus, pressed, selected, disabled, loading이 입력 방식에 맞고 hover-only 기능이 없다. | 상태를 색 하나 또는 hover 하나로만 표현한다. |
| AI UI | user bubble, assistant plain content, subordinate trace, stable composer가 유지된다. | assistant까지 큰 bubble로 감싸거나 AI gradient가 콘텐츠를 압도한다. |

## Maintenance workflow

### CDS release checklist

CDS release 또는 source commit을 번역 기준으로 올릴 때 다음을 순서대로 확인한다.

- semantic color 값과 역할, foreground/background 조합의 AA 대비
- typography role, font stack, weight, size, line height, letter spacing
- spacing 및 rounded scale과 squircle fallback 원칙
- comfortable/touch control scale, icon button, field, menu, navigation dimension
- Button, form, overlay, panel, navigation component tone과 state
- AppShell, Sidebar, Chat 등 pattern의 구조 또는 interaction 변경
- 공식 DESIGN.md spec version과 structured field 변경
- 네 파일의 provenance와 README source map

### Change rules

- 공통 invariant가 바뀌면 `general`, `desktop`, `mobile`, `web` 네 파일을 같은 변경에서 갱신한다.
- 플랫폼 전용 번역만 바뀌면 해당 프로필과 README의 platform matrix/rubric만 갱신한다.
- 구현되지 않은 Mobile/Web 규칙은 계속 `new translation`으로 표시하고 CDS 코드 구현처럼 서술하지 않는다.
- package version, source commit, spec version, last reviewed를 함께 검토한다.
- `pnpm design:lint`와 `pnpm design:test`로 공식 형식, AA 대비, 파일 존재, 공통 invariant를 확인한다.

### Migration triggers

현재 responsive range, motion, elevation, safe area는 공식 frontmatter의 first-class token이 아니므로 canonical body section에서 prose extension으로 관리한다. 공식 spec이 해당 필드를 지원하면 다음 release에서 prose의 정확한 값을 structured token으로 옮기고, 네 파일을 동시에 migration한다.

다중 파일 상속이 spec에 추가되더라도 자동 도입하지 않는다. 한 파일 전달만으로 재현되는 현재 계약과 도구 호환성을 먼저 재평가한다.
