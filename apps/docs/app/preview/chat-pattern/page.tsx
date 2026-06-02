"use client";

import {
  CaretDown,
  Clock,
  DotsThree,
  FolderSimple,
  HandWaving,
  Microphone,
  Plus,
  SidebarSimple,
  Terminal,
} from "@fluxloop-ai/pds-icons/icons";
import { renderMarkdown } from "@fluxloop-ai/pds-markdown";
import {
  AppShell,
  AppShellLeadingControls,
  AppShellMain,
  AppShellMainBody,
  AppShellMainHeader,
  AppShellSidebar,
  AppShellSidebarBody,
  AppShellSidebarFooter,
  AppShellSidebarHeader,
  AppShellSidePanel,
  AppShellSidePanelHeader,
  AppShellSplitter,
  AppShellTrailingControls,
  SegmentedControl,
  SegmentedControlItem,
  useScrollFade,
} from "@fluxloop-ai/pds-ui";
import { ChatAssistantMessage } from "@fluxloop-ai/pds-ui/components/chat-assistant-message";
import { ChatComposer } from "@fluxloop-ai/pds-ui/components/chat-composer";
import {
  ChatProcessTrace,
  type ProcessTraceBlock,
  type ResolveToolIcon,
} from "@fluxloop-ai/pds-ui/components/chat-process-trace";
import { ChatUserMessage } from "@fluxloop-ai/pds-ui/components/chat-user-message";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@fluxloop-ai/pds-ui/components/dropdown-menu";
import { IconButton } from "@fluxloop-ai/pds-ui/components/icon-button";
import {
  type RemovableTab,
  RemovableTabBar,
} from "@fluxloop-ai/pds-ui/components/removable-tab-bar";
import { Separator } from "@fluxloop-ai/pds-ui/components/separator";
import { useEffect, useState } from "react";

const TONE_OPTIONS = [
  { id: "wave", label: "친근하게" },
  { id: "formal", label: "정중하게" },
  { id: "concise", label: "간결하게" },
];

const MODEL_OPTIONS = [
  { id: "5.5-high", label: "5.5 높음" },
  { id: "5.5-mid", label: "5.5 보통" },
  { id: "4.5", label: "4.5 일반" },
];

const composerChip =
  "inline-flex items-center gap-[4px] h-[24px] px-[6px] text-[12px] text-[color:var(--pds-label-alternative)] rounded-[6px] bg-transparent border-0 cursor-pointer hover:bg-[color:var(--pds-background-normal-alternative)] hover:text-[color:var(--pds-label-normal)]";

const CASES = [
  { id: "static", label: "정적 멀티탭" },
  { id: "live", label: "응답 생성 (라이브)" },
] as const;
type CaseId = (typeof CASES)[number]["id"];

const LIVE_ICON_BY_NAME: Record<string, React.ReactNode> = {
  bash: <Terminal />,
  text_editor: <FolderSimple />,
};
const liveResolveToolIcon: ResolveToolIcon = (name) => LIVE_ICON_BY_NAME[name];

const LIVE_USER_MESSAGE = "여기 주 색상 토큰이 어디서 정의돼? 한 줄만.";

const LIVE_REPLY =
  "주 색은 `packages/pds-tokens/src/light.css` 의 `--pds-primary-normal: #0063F8` 입니다. Tailwind v4 의 `@theme` 가 같은 변수를 별칭화해서 `bg-primary-normal` 로 사용돼요.";

const LIVE_TRACE_BLOCKS: ProcessTraceBlock[] = [
  {
    type: "thinking",
    thinking: "토큰 정의는 CSS 변수 파일을 봐야 정확합니다. tokens 패키지부터 확인할게요.",
  },
  {
    type: "tool_use",
    id: "lt1",
    name: "bash",
    input: { command: "ls packages/pds-tokens/src" },
  },
  {
    type: "tool_result",
    tool_use_id: "lt1",
    content: "light.css\ndark.css\nindex.ts",
  },
  {
    type: "tool_use",
    id: "lt2",
    name: "text_editor",
    input: { command: "view", path: "packages/pds-tokens/src/light.css" },
  },
  {
    type: "tool_result",
    tool_use_id: "lt2",
    content:
      "--pds-primary-normal: #0063F8;\n--pds-label-normal: #18181b;\n--pds-background-normal-normal: #ffffff;\n…",
  },
];

const LIVE_TRACE_DURATION_MS = 3800;
const LIVE_TYPING_INTERVAL_MS = 28;

type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text: string };

type Thread = {
  tab: RemovableTab;
  messages: Message[];
};

const INITIAL_THREADS: Thread[] = [
  {
    tab: { id: "tokens", title: "PDS 토큰 질문" },
    messages: [
      {
        id: "u1",
        role: "user",
        text: "PDS 의 spacing 스케일이 4-base 라고 했는데, 컴포넌트 안에서는 왜 arbitrary [12px] 처럼 직접 쓰는 거야? 토큰 클래스로 가면 안 돼?",
      },
      {
        id: "a1",
        role: "assistant",
        text: 'spacing 토큰은 **Montage 호환 px 인덱스**(`--spacing-4: 4px`, `--spacing-12: 12px` …)라 의미적인 시맨틱 토큰이 아니라 **단순 별칭**입니다. 그래서 컴포넌트 내부에서 `gap-[12px]` 처럼 쓰는 게 의미 손실이 없고, 빌드된 CSS 도 1:1 입니다.\n\n반면 색·radius·shadow 는 시맨틱이 붙어 있어서 **반드시 토큰 변수**(`var(--pds-label-normal)`, `var(--pds-radius-12)`)로 참조합니다.\n\n```tsx\n<div className="px-[12px] py-[8px] rounded-[var(--pds-radius-8)]">\n  …\n</div>\n```',
      },
      {
        id: "u2",
        role: "user",
        text: "그럼 px 그대로 쓰면 디자이너가 토큰 변경할 때 일괄 갱신은 어떻게 해?",
      },
      {
        id: "a2",
        role: "assistant",
        text: '솔직히 말하면 **자동 갱신은 안 됩니다.** spacing 은 의도적으로 그렇게 둔 트레이드오프예요.\n\n- spacing 은 *비주얼 스케일* 자체가 거의 안 바뀐다는 전제 — 4·8·12·16·20·24… 가 흔들리면 컴포넌트 비율이 다 깨집니다.\n- 그래서 "한 번에 갱신" 보다 "한 번 정해놓고 안 건드림" 쪽 비용이 훨씬 쌉니다.\n- 진짜 일괄 갱신이 필요한 축 (의미가 변할 수 있는 축) 은 색·radius·shadow 라서 그쪽만 변수로 빼둔 거고요.',
      },
      {
        id: "u3",
        role: "user",
        text: "radius 는 그럼 컴포넌트 안에서 `rounded-[var(--pds-radius-12)]` 이렇게 매번 길게 쓰는 거야? 너무 verbose 한데",
      },
      {
        id: "a3",
        role: "assistant",
        text: 'verbose 한 거 맞습니다. 두 가지 단축 방식이 있어요.\n\n1. **시맨틱 alias** — `rounded-lg` / `rounded-md` 같은 의미 단위. PDS 는 컴포넌트 사이즈와 짝지어 `var(--pds-radius-sm|md|lg)` 로 묶어두는 쪽을 권장.\n2. **컴포넌트 내부 const** — 한 컴포넌트 안에서 같은 radius 가 여러 슬롯에 반복되면 tailwind-variants 의 `tv` 안에서 한 번만 박는 게 깔끔.\n\n```ts\nconst panel = tv({\n  base: "rounded-[var(--pds-radius-12)] bg-...",\n});\n```\n\n호출부에선 `rounded-` 못 보고, 대신 `panel()` 만 보입니다.',
      },
      {
        id: "u4",
        role: "user",
        text: "한 컴포넌트만 라운드를 다르게 하고 싶을 때는? override 어떻게 해?",
      },
      {
        id: "a4",
        role: "assistant",
        text: '권장 순서는 이렇습니다.\n\n1. **variant 추가** — 그 "다른 라운드" 가 *의도가 있는 한 변형* 이면 컴포넌트에 `radius: { sm | md | lg }` 같은 variant 로 노출. 일회성 외부 className override 보다 의도가 명시적.\n2. **className prop** — 진짜 일회성이고 한 곳에서만 쓰면 호출부에서 `className="rounded-[var(--pds-radius-8)]"` 로 덮어쓰기. tailwind-merge 가 처리.\n3. **금지** — 컴포넌트 내부에서 `data-[…]` 로 임의 분기 만들지 않기. variant 로 승격하거나 외부 override 둘 중 하나.\n\n---\n\n어느 쪽인지 케이스 알려주면 더 구체적으로 잡을 수 있어요.',
      },
      {
        id: "u5",
        role: "user",
        text: "Figma 쪽 토큰이랑 sync 는 어떻게 맞춰? 코드가 SSOT 라며.",
      },
      {
        id: "a5",
        role: "assistant",
        text: '방향은 **코드 → Figma 단방향**입니다.\n\n- 코드의 CSS 변수 (`--pds-*`) 가 SSOT.\n- Figma Variables 는 *역생성* — 코드에서 정의된 값으로부터 Figma 쪽 변수를 갱신.\n- 디자이너가 Figma 에서 직접 변수를 바꾸면 그건 *제안* 일 뿐, 코드에 반영되어야 비로소 시스템 값.\n\n역생성 파이프라인은 아직 수동입니다 (Figma MCP `set_variables` 로 일괄 push). 자동 sync 는 첫 릴리즈 이후 검토 예정이고, 그전까지는 토큰 변경 PR 에서 "Figma 도 갱신했음" 체크박스를 수동으로 관리합니다.',
      },
    ],
  },
  {
    tab: { id: "sidebar", title: "Sidebar pattern 정리" },
    messages: [
      {
        id: "u1",
        role: "user",
        text: "사이드바를 컴포넌트 하나로 안 만들고 패턴으로 푼 이유 한 줄 정리해줄래?",
      },
      {
        id: "a1",
        role: "assistant",
        text: "재사용 단위는 `SidebarMenu` / `SidebarList` 같은 **빌딩 블록**이고, *어떤 메뉴를 넣고 어떤 섹션이 있는지*는 제품 결정이라 prop API 로 흡수하면 비대해지기 때문입니다. 셸(`AppShellSidebar`)은 토글·리사이즈·titlebar inset 같은 **셸 책임만** 지고, 안의 조립은 패턴이 풉니다.",
      },
    ],
  },
  {
    tab: { id: "new", title: "새 탭" },
    messages: [],
  },
];

export default function ChatPatternPreviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [tone, setTone] = useState("wave");
  const [model, setModel] = useState("5.5-high");
  const [caseId, setCaseId] = useState<CaseId>("static");

  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeId, setActiveId] = useState<string | null>(INITIAL_THREADS[0]?.tab.id ?? null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const active = threads.find((t) => t.tab.id === activeId) ?? null;
  const draft = activeId ? (drafts[activeId] ?? "") : "";

  const setDraft = (next: string) => {
    if (!activeId) return;
    setDrafts((prev) => ({ ...prev, [activeId]: next }));
  };

  const submit = (value: string) => {
    if (!activeId || value.trim().length === 0) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.tab.id === activeId
          ? {
              ...t,
              messages: [
                ...t.messages,
                { id: `${activeId}-${Date.now()}`, role: "user", text: value },
              ],
            }
          : t,
      ),
    );
    setDrafts((prev) => ({ ...prev, [activeId]: "" }));
  };

  const closeTab = (id: string) => {
    setThreads((prev) => prev.filter((t) => t.tab.id !== id));
    setActiveId((prev) => {
      if (prev !== id) return prev;
      const remaining = threads.filter((t) => t.tab.id !== id);
      return remaining[0]?.tab.id ?? null;
    });
    setDrafts((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const addTab = () => {
    const id = `tab-${Date.now()}`;
    const next: Thread = {
      tab: { id, title: "새 탭" },
      messages: [],
    };
    setThreads((prev) => [...prev, next]);
    setActiveId(id);
  };

  const tabs = threads.map((t) => t.tab);

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-gradient-to-br from-[#2a2d35] via-[#1f2127] to-[#14151a] p-[32px]">
      <div
        className="relative h-[calc(100dvh-64px)] max-h-[840px] w-full max-w-[1280px] overflow-hidden rounded-[12px]"
        style={{
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[16px] left-[16px] z-50 flex gap-[8px]"
        >
          <span className="h-[12px] w-[12px] rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="h-[12px] w-[12px] rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="h-[12px] w-[12px] rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
        </div>

        <AppShell leftInset={72} className="h-full">
          <AppShellLeadingControls>
            <IconButton
              size="sm"
              variant="normal"
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <SidebarSimple />
            </IconButton>
          </AppShellLeadingControls>

          {!sidePanelOpen ? (
            <AppShellTrailingControls style={{ right: 12 }}>
              <IconButton
                size="sm"
                variant="subtle"
                aria-label="채팅 패널 열기"
                onClick={() => setSidePanelOpen(true)}
              >
                <SidebarSimple style={{ transform: "scaleX(-1)" }} />
              </IconButton>
            </AppShellTrailingControls>
          ) : null}

          <AppShellSidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            defaultWidth={240}
            minWidth={220}
            maxWidth={320}
          >
            <AppShellSidebarHeader />
            <AppShellSidebarBody>
              <div className="flex h-full items-center justify-center">
                <span className="font-mono text-[11px] text-[color:var(--pds-label-alternative)] uppercase tracking-[0.16em]">
                  Sidebar
                </span>
              </div>
            </AppShellSidebarBody>
            <AppShellSidebarFooter />
          </AppShellSidebar>

          <AppShellSplitter target="sidebar" doubleClickResetWidth={240} />

          <AppShellMain>
            <AppShellMainHeader />
            <AppShellMainBody>
              <div className="flex h-full flex-col items-center justify-center gap-[14px] p-[24px]">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--pds-label-alternative)]">
                  Case
                </span>
                <SegmentedControl
                  size="sm"
                  value={caseId}
                  onValueChange={(v) => setCaseId(v as CaseId)}
                >
                  {CASES.map((c) => (
                    <SegmentedControlItem key={c.id} value={c.id}>
                      {c.label}
                    </SegmentedControlItem>
                  ))}
                </SegmentedControl>
              </div>
            </AppShellMainBody>
          </AppShellMain>

          <AppShellSplitter target="sidePanel" doubleClickResetWidth={420} />

          <AppShellSidePanel
            open={sidePanelOpen}
            onOpenChange={setSidePanelOpen}
            defaultWidth={420}
            minWidth={320}
            maxWidth={560}
            className="transition-none"
          >
            <AppShellSidePanelHeader
              tauriDragRegion={false}
              className="gap-[4px]"
              style={{ paddingLeft: 16, paddingRight: 16 }}
            >
              {caseId === "static" ? (
                <>
                  <div className="min-w-0 flex-1">
                    <RemovableTabBar
                      size="sm"
                      tabs={tabs}
                      activeId={activeId}
                      onSwitch={setActiveId}
                      onClose={closeTab}
                    />
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <IconButton size="xs" variant="subtle" aria-label="새 채팅" onClick={addTab}>
                      <Plus />
                    </IconButton>
                    <IconButton size="xs" variant="subtle" aria-label="채팅 기록">
                      <Clock />
                    </IconButton>
                    <IconButton size="xs" variant="subtle" aria-label="더보기">
                      <DotsThree />
                    </IconButton>
                  </div>
                  <Separator orientation="vertical" color="alternative" className="h-[16px]" />
                </>
              ) : (
                <div className="flex min-w-0 flex-1 items-center gap-[8px] pl-[4px]">
                  <span className="truncate text-[13px] font-medium text-[color:var(--pds-label-normal)]">
                    응답 생성 시연
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--pds-label-alternative)]">
                    LIVE
                  </span>
                </div>
              )}
              <IconButton
                size="sm"
                variant="subtle"
                aria-label="채팅 패널 접기"
                onClick={() => setSidePanelOpen(false)}
              >
                <SidebarSimple style={{ transform: "scaleX(-1)" }} />
              </IconButton>
            </AppShellSidePanelHeader>
            {caseId === "static" ? (
              <>
                <ChatThread thread={active} />
                <ChatComposer
                  value={draft}
                  onChange={setDraft}
                  onSubmit={submit}
                  disabled={!active}
                  placeholder={active ? "메시지를 입력하세요…" : "탭을 먼저 추가하거나 선택하세요"}
                  leadingToolbar={
                    <IconButton size="sm" variant="subtle" aria-label="첨부" disabled={!active}>
                      <Plus />
                    </IconButton>
                  }
                  trailingToolbar={
                    <IconButton
                      size="sm"
                      variant="subtle"
                      aria-label="음성 입력"
                      disabled={!active}
                    >
                      <Microphone />
                    </IconButton>
                  }
                  bottomAccessory={
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button type="button" className={composerChip} aria-label="톤 선택">
                            <HandWaving width={14} height={14} />
                            <CaretDown width={10} height={10} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" size="sm">
                          <DropdownMenuRadioGroup value={tone} onValueChange={setTone}>
                            {TONE_OPTIONS.map((o) => (
                              <DropdownMenuRadioItem key={o.id} value={o.id}>
                                {o.label}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button type="button" className={composerChip} aria-label="모델 선택">
                            {MODEL_OPTIONS.find((o) => o.id === model)?.label}
                            <CaretDown width={10} height={10} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" size="sm">
                          <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                            {MODEL_OPTIONS.map((o) => (
                              <DropdownMenuRadioItem key={o.id} value={o.id}>
                                {o.label}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  }
                />
              </>
            ) : (
              <>
                <LiveResponseThread />
                <ChatComposer
                  value=""
                  onChange={() => {}}
                  onSubmit={() => {}}
                  disabled
                  placeholder="응답 생성 중입니다…"
                  leadingToolbar={
                    <IconButton size="sm" variant="subtle" aria-label="첨부" disabled>
                      <Plus />
                    </IconButton>
                  }
                  trailingToolbar={
                    <IconButton size="sm" variant="subtle" aria-label="음성 입력" disabled>
                      <Microphone />
                    </IconButton>
                  }
                />
              </>
            )}
          </AppShellSidePanel>
        </AppShell>
      </div>
    </div>
  );
}

function ChatThread({ thread }: { thread: Thread | null }) {
  const { ref: scrollRef, onScroll, maskImage } = useScrollFade<HTMLDivElement>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollRef from useScrollFade is a stable ref; listed deps reflect intentional re-trigger on thread change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [scrollRef, thread?.tab.id, thread?.messages.length]);

  if (!thread) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center text-[13px] text-[color:var(--pds-label-alternative)]">
        열린 탭이 없습니다. 우측 상단의 + 로 새 채팅을 시작하세요.
      </div>
    );
  }

  if (thread.messages.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center text-[13px] text-[color:var(--pds-label-alternative)]">
        아래에서 첫 메시지를 보내세요.
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="min-h-0 flex-1 overflow-y-auto"
      style={{ WebkitMaskImage: maskImage, maskImage }}
    >
      <div className="flex flex-col gap-[8px] pl-[24px] pr-[20px] py-[20px]">
        {thread.messages.map((m) =>
          m.role === "user" ? (
            <ChatUserMessage key={m.id} content={m.text} />
          ) : (
            <ChatAssistantMessage key={m.id} content={m.text} renderMarkdown={renderMarkdown} />
          ),
        )}
      </div>
    </div>
  );
}

type LivePhase = "dots" | "trace_run" | "trace_done" | "typing" | "complete";

function LiveResponseThread() {
  const { ref: scrollRef, onScroll, maskImage } = useScrollFade<HTMLDivElement>();
  const [phase, setPhase] = useState<LivePhase>("dots");
  const [traceLen, setTraceLen] = useState(0);
  const [typedLen, setTypedLen] = useState(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const at = (delay: number, fn: () => void) => {
      timeouts.push(setTimeout(fn, delay));
    };

    let t = 0;
    t += 600;
    at(t, () => {
      setPhase("trace_run");
      setTraceLen(1);
    });
    t += 800;
    at(t, () => setTraceLen(2));
    t += 700;
    at(t, () => setTraceLen(3));
    t += 700;
    at(t, () => setTraceLen(4));
    t += 700;
    at(t, () => setTraceLen(5));
    t += 500;
    at(t, () => setPhase("trace_done"));
    t += 400;
    at(t, () => setPhase("typing"));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typedLen >= LIVE_REPLY.length) {
      setPhase("complete");
      return;
    }
    const t = setTimeout(() => setTypedLen((n) => n + 1), LIVE_TYPING_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [phase, typedLen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollRef is a stable ref; deps drive re-trigger on phase/length progression
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [scrollRef, phase, traceLen, typedLen]);

  const visibleTrace = LIVE_TRACE_BLOCKS.slice(0, traceLen);
  const traceRunning = phase === "trace_run";
  const showDots = phase === "dots";
  const showTrace = phase !== "dots";
  const showReply = phase === "typing" || phase === "complete";

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="min-h-0 flex-1 overflow-y-auto"
      style={{ WebkitMaskImage: maskImage, maskImage }}
    >
      <div className="flex flex-col gap-[12px] pl-[24px] pr-[20px] py-[20px]">
        <ChatUserMessage content={LIVE_USER_MESSAGE} />
        {showDots ? <ChatAssistantMessage content="" loading /> : null}
        {showTrace ? (
          <ChatProcessTrace
            blocks={visibleTrace}
            isRunning={traceRunning}
            durationMs={traceRunning ? undefined : LIVE_TRACE_DURATION_MS}
            resolveToolIcon={liveResolveToolIcon}
            renderMarkdown={renderMarkdown}
          />
        ) : null}
        {showReply ? (
          phase === "typing" ? (
            <ChatAssistantMessage content={LIVE_REPLY.slice(0, typedLen)} loading />
          ) : (
            <ChatAssistantMessage content={LIVE_REPLY} renderMarkdown={renderMarkdown} />
          )
        ) : null}
      </div>
    </div>
  );
}
