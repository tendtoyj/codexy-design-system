# PDS 알려진 이슈 / 보류 결정 모음

디자인 시스템 작업 중 임시로 우회한 결정과, 그에 대한 정석적인 해결안을 적어둡니다.
컴포넌트가 늘어나거나 같은 패턴이 다른 곳에 등장하면 다시 펼쳐서 정리할 것.

---

## 1. ChatComposer 하단 셀렉터 — chip 모양 트리거 + 메뉴 동작

### 현재 (임시, 2026-05-04)

`ChatComposerAccessoriesDemo` 의 bottomAccessory 에서 톤(👋▼) / 모델(5.5 높음 ▼) 선택을
다음과 같이 구현:

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="pds-chat-demo-chip">…</button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>…</DropdownMenuContent>
</DropdownMenu>
```

- `DropdownMenu` 의 `asChild` 로 raw chip 모양 버튼을 트리거로 감쌌음.
- chip 시각 (h-22, padding/gap, transparent bg) 은 데모 전용 CSS (`.pds-chat-demo-chip`).

### 왜 임시인가

PDS 차원에서 "compact select 트리거 = chip 모양" 이라는 정의가 없는 상태.
같은 패턴이 다른 화면에 또 등장하면 매번 컨슈머가:

1. 트리거 버튼 모양을 직접 만들고
2. `DropdownMenu` 또는 `Select` 시멘틱을 매번 결정해야 함

→ 디자인 시스템의 가치(시각·동작 일관성) 가 약해진다.

또한 `Chip` 컴포넌트를 트리거로 재사용하면 시멘틱 충돌:
- `Chip` 의 의미는 태그·필터·라벨 (정적 또는 토글)
- 메뉴 트리거는 "클릭해서 옵션 선택" 으로 동작이 다름
- 같은 외형이 두 의미를 갖게 되면 컨슈머가 헷갈림

### 정석적 해결안 (TBD)

다음 중 하나를 PDS 차원에서 결정해야 함.

**(가) `Select` 에 `xsmall` size + `ghost` variant 추가**
- "compact form select" 를 PDS 1급 시민으로 등록.
- form-field 시멘틱 유지 → toolbar/footer 같은 비-form 맥락에선 의미상 어색할 수 있음.

**(나) 신규 컴포넌트 `MenuChip` (또는 `InlineSelect` / `SelectChip` 등)**
- chip 외형 + 단일 선택 메뉴 동작 을 묶은 1급 컴포넌트.
- 모델 선택, 톤 선택, 환경 선택 같은 "압축형 단일선택" 패턴 전용.
- 비용: 컴포넌트 설계 + 문서 + 시각 토큰 정의.
- 추천 사유: chat composer 외 toolbar/header 류에 같은 패턴 재등장 가능성 높음.

**(다) `SelectTrigger` 에 `asChild` 지원 추가**
- 트리거 모양 자유, PDS 는 시멘틱·동작만 책임.
- 단점: "어떻게 생겨야 하는가" 를 시스템이 안 정해줌 → 결국 chip 을 매번 직접 만들게 됨.
  - 현재 (c) 임시안과 사실상 같은 한계.

### 트리거 조건

- 같은 "compact selector" 패턴이 다른 컴포넌트 (예: app-shell 의 환경 셀렉터,
  thread header 의 모델 표시 등) 에 한 번 더 등장하면, 그 시점에서 (가)/(나)/(다) 중 하나로 결정.
- 그 전까지는 데모는 현재 임시 구현 유지.
