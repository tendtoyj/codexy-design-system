"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import * as React from "react";

/* ============================================================================
 * AppShell — 데스크탑 앱 셸 (3-패널 레이아웃)
 * ============================================================================
 *
 * 레이어 모델 (전체 설명: docs/components/app-shell.mdx)
 *
 *   ┌─ window (Tauri/macOS 가 외곽 squircle·shadow·traffic lights 처리) ─┐
 *   │                                                                   │
 *   │  ┌─ Sidebar ─┐  ┌─ Foreground Card ──────────────────────────┐   │
 *   │  │  back     │  │   Main          │   SidePanel               │   │
 *   │  │  layer    │  │   (front)       │   (front)                 │   │
 *   │  │  (회색)   │  │   ↑                                          │   │
 *   │  │           │  │   사이드바와 만나는 좌측만 둥글게            │   │
 *   │  └───────────┘  └────────────────────────────────────────────┘   │
 *   └───────────────────────────────────────────────────────────────────┘
 *
 *   • Sidebar = back layer  (gray, 윈도우 좌측 가장자리에 깔림)
 *   • Main + SidePanel = foreground card (흰색, 사이드바 위로 떠있는 단일 카드)
 *
 *   foreground card 의 모서리 룰
 *     "background layer 와 만나는 모서리만 둥글게.
 *      윈도우 가장자리에 닿는 쪽은 OS squircle 이 처리하므로 PDS 는 신경 X."
 *
 *   titlebar inset (macOS traffic lights 회피)
 *     좌/우 끝의 *현재 열려있는* 패널 헤더에만 inset 자동 적용.
 *     ex) Sidebar 열림 → SidebarHeader 가 leftInset 흡수
 *         Sidebar 닫힘 → MainHeader 가 leftInset 흡수
 *
 *   상태 모델
 *     open / onOpenChange / defaultOpen,  width / onWidthChange / defaultWidth
 *     모두 controlled / uncontrolled 양쪽 지원 (Radix 패턴).
 * ========================================================================== */

const TITLEBAR_HEIGHT = 44;

/* ──────────────────────────────────────────────────────────────────────────
 * useControllableState — Radix 식 controlled+uncontrolled
 * ────────────────────────────────────────────────────────────────────────── */

function useControllableState<T>(params: {
  prop: T | undefined;
  defaultProp: T;
  onChange?: (value: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void] {
  const { prop, defaultProp, onChange } = params;
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? (prop as T) : uncontrolled;

  // Refs 로 latest 값/플래그/콜백 추적 → setter 자체는 mount 동안 stable.
  // (불안정하면 panel 등록 effect 의 deps 가 매번 변해서 폭주.)
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const isControlledRef = React.useRef(isControlled);
  isControlledRef.current = isControlled;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = React.useCallback((next: T | ((prev: T) => T)) => {
    const resolved = typeof next === "function" ? (next as (p: T) => T)(valueRef.current) : next;
    if (Object.is(resolved, valueRef.current)) return;
    if (!isControlledRef.current) setUncontrolled(resolved);
    onChangeRef.current?.(resolved);
  }, []);

  return [value, setValue];
}

/* ──────────────────────────────────────────────────────────────────────────
 * Drag-to-resize
 * ────────────────────────────────────────────────────────────────────────── */

function useResize(params: {
  getWidth: () => number;
  setWidth: (w: number) => void;
  /** +1: 드래그 우측 = 확장 (좌측 패널). -1: 드래그 우측 = 축소 (우측 패널). */
  direction: 1 | -1;
  min: number;
  max: number;
}) {
  const { getWidth, setWidth, direction, min, max } = params;
  return React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startWidth = getWidth();
      const onMove = (ev: MouseEvent) => {
        const delta = (ev.clientX - startX) * direction;
        const next = Math.min(max, Math.max(min, startWidth + delta));
        setWidth(next);
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [getWidth, setWidth, direction, min, max],
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Context
 * ────────────────────────────────────────────────────────────────────────── */

type PanelRole = "sidebar" | "main" | "sidePanel";

interface RegisteredPanel {
  open: boolean;
  width: number;
  setWidth: (w: number) => void;
  minWidth: number;
  maxWidth: number;
  resizable: boolean;
}

interface AppShellContextValue {
  titlebarHeight: number;
  leftInset: number;
  rightInset: number;
  panels: Partial<Record<PanelRole, RegisteredPanel>>;
  registerPanel: (role: PanelRole, state: RegisteredPanel) => void;
  unregisterPanel: (role: PanelRole) => void;
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null);

function useAppShell() {
  const ctx = React.useContext(AppShellContext);
  if (!ctx) {
    throw new Error("AppShell sub-component must be used inside <AppShell>");
  }
  return ctx;
}

/** 각 패널이 자식들에게 자기 role 을 알려주는 컨텍스트 (Header 가 읽음). */
const PanelRoleContext = React.createContext<PanelRole | null>(null);

function usePanelRole() {
  const role = React.useContext(PanelRoleContext);
  if (!role) {
    throw new Error(
      "AppShell panel header/body must be inside <AppShellSidebar> | <AppShellMain> | <AppShellSidePanel>",
    );
  }
  return role;
}

/** 현재 *열려있는* 패널 기준으로 좌/우 끝이 누구인지. */
function computeEdges(panels: AppShellContextValue["panels"]) {
  const sidebarOpen = !!panels.sidebar?.open;
  const sidePanelOpen = !!panels.sidePanel?.open;
  const leftEdge: PanelRole = sidebarOpen ? "sidebar" : "main";
  const rightEdge: PanelRole = sidePanelOpen ? "sidePanel" : "main";
  return { leftEdge, rightEdge };
}

/* ──────────────────────────────────────────────────────────────────────────
 * <AppShell> — root
 * ────────────────────────────────────────────────────────────────────────── */

const appShell = tv({
  slots: {
    root: [
      "relative h-dvh w-full flex overflow-hidden",
      "bg-[var(--pds-background-normal-alternative,var(--pds-background-normal-normal))]",
      "[--pds-app-shell-titlebar-height:44px]",
    ],
  },
});

interface AppShellProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Titlebar 영역 높이(px). 기본 44.
   * macOS Overlay 모드에서 트래픽 라이트 세이프존을 확보하려는 용도.
   */
  titlebarHeight?: number;
  /**
   * 좌측 패널 헤더가 비워줘야 할 가로 inset(px).
   * macOS 트래픽 라이트 자리 회피용. 제품이 OS 보고 주입.
   * (PDS 는 OS 직접 감지하지 않음 — Tauri API 의존성 회피.)
   */
  leftInset?: number;
  /** 우측 패널 헤더가 비워줘야 할 가로 inset(px). */
  rightInset?: number;
}

/**
 * AppShell — 데스크탑 앱의 3-패널 레이아웃 셸.
 *
 * 레이어 모델:
 *   • {@link AppShellSidebar} = back layer (회색, 좌측)
 *   • {@link AppShellMain} + {@link AppShellSidePanel} = foreground card (흰색)
 *
 * @example
 * ```tsx
 * <AppShell leftInset={130}>
 *   <AppShellSidebar defaultWidth={220}>
 *     <AppShellSidebarHeader>...</AppShellSidebarHeader>
 *     <AppShellSidebarBody>...</AppShellSidebarBody>
 *   </AppShellSidebar>
 *   <AppShellSplitter target="sidebar" />
 *   <AppShellMain>
 *     <AppShellMainHeader>...</AppShellMainHeader>
 *     <AppShellMainBody>...</AppShellMainBody>
 *   </AppShellMain>
 *   <AppShellSplitter target="sidePanel" />
 *   <AppShellSidePanel defaultWidth={360}>
 *     <AppShellSidePanelHeader>...</AppShellSidePanelHeader>
 *     <AppShellSidePanelBody>...</AppShellSidePanelBody>
 *   </AppShellSidePanel>
 * </AppShell>
 * ```
 */
const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  {
    titlebarHeight = TITLEBAR_HEIGHT,
    leftInset = 0,
    rightInset = 0,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const [panels, setPanels] = React.useState<Partial<Record<PanelRole, RegisteredPanel>>>({});

  const registerPanel = React.useCallback((role: PanelRole, state: RegisteredPanel) => {
    setPanels((prev) => {
      const existing = prev[role];
      if (
        existing &&
        existing.open === state.open &&
        existing.width === state.width &&
        existing.minWidth === state.minWidth &&
        existing.maxWidth === state.maxWidth &&
        existing.resizable === state.resizable &&
        existing.setWidth === state.setWidth
      ) {
        return prev;
      }
      return { ...prev, [role]: state };
    });
  }, []);

  const unregisterPanel = React.useCallback((role: PanelRole) => {
    setPanels((prev) => {
      if (!prev[role]) return prev;
      const next = { ...prev };
      delete next[role];
      return next;
    });
  }, []);

  const ctxValue = React.useMemo<AppShellContextValue>(
    () => ({
      titlebarHeight,
      leftInset,
      rightInset,
      panels,
      registerPanel,
      unregisterPanel,
    }),
    [titlebarHeight, leftInset, rightInset, panels, registerPanel, unregisterPanel],
  );

  const styles = appShell();

  return (
    <AppShellContext.Provider value={ctxValue}>
      <div
        ref={ref}
        data-pds-component="app-shell"
        className={cn(styles.root(), className)}
        style={{
          ["--pds-app-shell-titlebar-height" as string]: `${titlebarHeight}px`,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    </AppShellContext.Provider>
  );
});

/* ──────────────────────────────────────────────────────────────────────────
 * Panel base — Sidebar / SidePanel 공용 로직
 * ────────────────────────────────────────────────────────────────────────── */

interface PanelStateOptions {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  defaultWidth?: number;
  width?: number;
  onWidthChange?: (width: number) => void;

  minWidth?: number;
  maxWidth?: number;

  resizable?: boolean;
}

function usePanelState(role: PanelRole, opts: PanelStateOptions) {
  const {
    defaultOpen = true,
    open: openProp,
    onOpenChange,
    defaultWidth = 240,
    width: widthProp,
    onWidthChange,
    minWidth = 200,
    maxWidth = 480,
    resizable = true,
  } = opts;

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [width, setWidth] = useControllableState({
    prop: widthProp,
    defaultProp: defaultWidth,
    onChange: onWidthChange,
  });

  const ctx = useAppShell();
  const { registerPanel, unregisterPanel } = ctx;
  React.useEffect(() => {
    registerPanel(role, {
      open,
      width,
      setWidth,
      minWidth,
      maxWidth,
      resizable,
    });
    return () => unregisterPanel(role);
  }, [registerPanel, unregisterPanel, role, open, width, minWidth, maxWidth, resizable, setWidth]);

  return { open, setOpen, width, setWidth };
}

/* ──────────────────────────────────────────────────────────────────────────
 * <AppShellSidebar> — back layer, 좌측
 * ────────────────────────────────────────────────────────────────────────── */

const sidebarStyles = tv({
  base: [
    "relative shrink-0 h-full flex flex-col overflow-hidden",
    "bg-[var(--pds-background-normal-alternative,var(--pds-fill-normal))]",
    "transition-[width] duration-[var(--pds-duration-fast)] ease-out",
  ],
});

interface AppShellSidebarProps
  extends Omit<React.ComponentPropsWithoutRef<"aside">, "children">,
    PanelStateOptions {
  children?: React.ReactNode;
}

/**
 * Background layer 패널. 좌측에 배치, foreground card 의 *아래*에 깔림.
 *
 * 닫혀도 width 0 으로만 줄어들고 DOM·내부 상태는 보존된다 (스크롤 위치, 입력값 등).
 *
 * @see AppShellMain — foreground card 의 좌측 시작점
 * @see AppShellSidePanel — foreground card 의 우측 끝점
 */
const AppShellSidebar = React.forwardRef<HTMLElement, AppShellSidebarProps>(
  function AppShellSidebar(
    {
      defaultOpen = true,
      open,
      onOpenChange,
      defaultWidth = 240,
      width,
      onWidthChange,
      minWidth = 200,
      maxWidth = 320,
      resizable = true,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const state = usePanelState("sidebar", {
      defaultOpen,
      open,
      onOpenChange,
      defaultWidth,
      width,
      onWidthChange,
      minWidth,
      maxWidth,
      resizable,
    });

    return (
      <PanelRoleContext.Provider value="sidebar">
        <aside
          ref={ref}
          data-pds-component="app-shell-sidebar"
          data-pds-layer="back"
          data-pds-position="leading"
          data-state={state.open ? "open" : "closed"}
          className={cn(sidebarStyles(), className)}
          style={{ width: state.open ? state.width : 0, ...style }}
          {...rest}
        >
          <div
            className="flex h-full flex-col"
            style={{ width: state.width, minWidth: state.width }}
          >
            {children}
          </div>
        </aside>
      </PanelRoleContext.Provider>
    );
  },
);

/* ──────────────────────────────────────────────────────────────────────────
 * <AppShellMain> — foreground card 의 중앙 (+좌측 라운딩 자동)
 * ────────────────────────────────────────────────────────────────────────── */

const mainStyles = tv({
  base: [
    "relative z-[1] flex-1 min-w-0 h-full flex flex-col overflow-hidden",
    "bg-[var(--pds-background-normal-normal)]",
    "border-l border-[var(--pds-line-normal-alternative)]",
    // 사이드바가 좌측에 *존재할 때만* 좌측 라운딩 (data-attr 로 토글)
    "data-[adjacent-back-left=true]:rounded-l-[var(--pds-radius-12)]",
    "data-[adjacent-back-left=false]:border-l-0",
  ],
});

interface AppShellMainProps extends React.ComponentPropsWithoutRef<"main"> {
  children?: React.ReactNode;
}

/**
 * Foreground card 의 좌측 시작점. flex-1 로 가용 공간을 채운다.
 *
 * 좌측 사이드바가 존재하면 좌측 모서리가 자동으로 둥글어진다 (`rounded-l-12`).
 * 사이드바가 없거나 닫혀있으면 윈도우 가장자리에 닿으므로 라운딩 없음 — OS squircle 이 처리.
 */
const AppShellMain = React.forwardRef<HTMLElement, AppShellMainProps>(function AppShellMain(
  { className, children, ...rest },
  ref,
) {
  const ctx = useAppShell();
  const adjacentBackLeft = !!ctx.panels.sidebar?.open;

  return (
    <PanelRoleContext.Provider value="main">
      <main
        ref={ref}
        data-pds-component="app-shell-main"
        data-pds-layer="front"
        data-pds-position="center"
        data-adjacent-back-left={adjacentBackLeft}
        className={cn(mainStyles(), className)}
        {...rest}
      >
        {children}
      </main>
    </PanelRoleContext.Provider>
  );
});

/* ──────────────────────────────────────────────────────────────────────────
 * <AppShellSidePanel> — foreground card 의 우측
 * ────────────────────────────────────────────────────────────────────────── */

const sidePanelStyles = tv({
  base: [
    "relative z-[1] shrink-0 h-full flex flex-col overflow-hidden",
    "bg-[var(--pds-background-normal-normal)]",
    "transition-[width] duration-[var(--pds-duration-fast)] ease-out",
  ],
});

interface AppShellSidePanelProps
  extends Omit<React.ComponentPropsWithoutRef<"aside">, "children">,
    PanelStateOptions {
  children?: React.ReactNode;
}

/**
 * Foreground card 의 우측 끝점. Main 과 같은 흰 카드 평면에 위치.
 *
 * 닫혀도 width 0 으로만 줄어들고 DOM·내부 상태는 보존된다.
 */
const AppShellSidePanel = React.forwardRef<HTMLElement, AppShellSidePanelProps>(
  function AppShellSidePanel(
    {
      defaultOpen = true,
      open,
      onOpenChange,
      defaultWidth = 360,
      width,
      onWidthChange,
      minWidth = 280,
      maxWidth = 560,
      resizable = true,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const state = usePanelState("sidePanel", {
      defaultOpen,
      open,
      onOpenChange,
      defaultWidth,
      width,
      onWidthChange,
      minWidth,
      maxWidth,
      resizable,
    });

    return (
      <PanelRoleContext.Provider value="sidePanel">
        <aside
          ref={ref}
          data-pds-component="app-shell-side-panel"
          data-pds-layer="front"
          data-pds-position="trailing"
          data-state={state.open ? "open" : "closed"}
          className={cn(sidePanelStyles(), className)}
          style={{ width: state.open ? state.width : 0, ...style }}
          {...rest}
        >
          <div
            className="flex h-full flex-col"
            style={{ width: state.width, minWidth: state.width }}
          >
            {children}
          </div>
        </aside>
      </PanelRoleContext.Provider>
    );
  },
);

/* ──────────────────────────────────────────────────────────────────────────
 * Splitter — 패널 사이의 드래그 핸들
 * ────────────────────────────────────────────────────────────────────────── */

const splitterStyles = tv({
  base: [
    "relative w-0 shrink-0 cursor-col-resize",
    "border-l border-transparent",
    // 12px 폭의 드래그 hit-area (보이지 않음)
    "after:content-[''] after:absolute after:inset-y-0 after:-left-[6px] after:-right-[6px]",
    // 호버 시 살짝 강조
    "hover:border-[var(--pds-line-normal-alternative)]",
    "transition-colors duration-[var(--pds-duration-fast)]",
    // resizable=false 일 때 비활성
    "data-[disabled=true]:cursor-default data-[disabled=true]:hover:border-transparent",
  ],
});

interface AppShellSplitterProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onDoubleClick"> {
  /** 어느 패널의 width 를 조절할지. */
  target: "sidebar" | "sidePanel";
  /** 더블클릭 시 width 를 이 값으로 리셋. 미지정 시 더블클릭 비활성. */
  doubleClickResetWidth?: number;
}

/**
 * 두 패널 사이에 두는 드래그 핸들. 폭 조정 + 더블클릭 리셋.
 *
 * `target="sidebar"` 는 좌측 사이드바(드래그 우측 = 확장),
 * `target="sidePanel"` 은 우측 패널(드래그 우측 = 축소) 을 리사이즈.
 *
 * 대상 패널의 `resizable={false}` 면 자동 비활성.
 */
const AppShellSplitter = React.forwardRef<HTMLDivElement, AppShellSplitterProps>(
  function AppShellSplitter({ target, doubleClickResetWidth, className, ...rest }, ref) {
    const ctx = useAppShell();
    const panel = ctx.panels[target];
    const disabled = !panel?.resizable || !panel.open;

    const widthRef = React.useRef(panel?.width ?? 0);
    React.useEffect(() => {
      if (panel) widthRef.current = panel.width;
    }, [panel]);

    const onMouseDown = useResize({
      getWidth: () => widthRef.current,
      setWidth: (w) => panel?.setWidth(w),
      direction: target === "sidebar" ? 1 : -1,
      min: panel?.minWidth ?? 0,
      max: panel?.maxWidth ?? Number.POSITIVE_INFINITY,
    });

    const onDoubleClick = React.useCallback(() => {
      if (disabled || doubleClickResetWidth === undefined) return;
      panel?.setWidth(doubleClickResetWidth);
    }, [disabled, doubleClickResetWidth, panel]);

    return (
      // biome-ignore lint/a11y/useSemanticElements: <hr> 는 정적 분리선용이라 interactive resize handle 역할에 안 맞음
      <div
        ref={ref}
        role="separator"
        aria-orientation="vertical"
        aria-disabled={disabled || undefined}
        aria-valuenow={panel?.width}
        aria-valuemin={panel?.minWidth}
        aria-valuemax={panel?.maxWidth}
        tabIndex={disabled ? -1 : 0}
        data-pds-component="app-shell-splitter"
        data-pds-target={target}
        data-disabled={disabled}
        className={cn(splitterStyles(), className)}
        onMouseDown={disabled ? undefined : onMouseDown}
        onDoubleClick={onDoubleClick}
        {...rest}
      />
    );
  },
);

/* ──────────────────────────────────────────────────────────────────────────
 * Overlay controls — titlebar 영역에 floating 으로 떠있는 컨트롤 슬롯
 *   • 어떤 패널에도 속하지 않고 AppShell 좌상단/우상단에 absolute 로 박힘.
 *   • 사이드바 토글처럼 *접혀도 같은 자리에 있어야 하는* 버튼용.
 *   • leftInset/rightInset 만큼 안쪽으로 들여서 OS 윈도우 컨트롤(트래픽 라이트
 *     / Win min·max) 자리를 침범하지 않음.
 *   • 컨테이너는 pointer-events: none 이라 패널 콘텐츠 클릭 막지 않고,
 *     내부 *인터랙티브 자식만* pointer-events: auto.
 * ────────────────────────────────────────────────────────────────────────── */

const overlayControlsStyles = tv({
  base: [
    "absolute top-0 z-[20] flex items-center gap-[4px] px-[4px]",
    "h-[var(--pds-app-shell-titlebar-height,44px)]",
    "pointer-events-none [&>*]:pointer-events-auto",
  ],
});

/**
 * AppShell 좌상단(트래픽 라이트 우측) 에 floating 으로 띄우는 컨트롤 슬롯.
 *
 * `leftInset` 값만큼 안쪽으로 들여서 위치한다. 사이드바를 접어도 자리가 변하지 않으니
 * 사이드바 토글 같은 *항상 같은 좌표에 있어야 하는* 버튼을 여기 둔다.
 *
 * @example
 * ```tsx
 * <AppShell leftInset={72}>
 *   <AppShellLeadingControls>
 *     <IconButton aria-label="Toggle sidebar" onClick={...}>
 *       <SidebarSimple />
 *     </IconButton>
 *   </AppShellLeadingControls>
 *   <AppShellSidebar>...</AppShellSidebar>
 *   ...
 * </AppShell>
 * ```
 */
const AppShellLeadingControls = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function AppShellLeadingControls({ className, style, ...rest }, ref) {
  const ctx = useAppShell();
  return (
    <div
      ref={ref}
      data-pds-component="app-shell-leading-controls"
      className={cn(overlayControlsStyles(), className)}
      style={{ left: ctx.leftInset, ...style }}
      {...rest}
    />
  );
});

/**
 * AppShell 우상단에 floating 으로 띄우는 컨트롤 슬롯.
 * `rightInset` 값만큼 안쪽으로 들여서 위치한다 (Windows ─⬜✕ 영역 등 회피).
 */
const AppShellTrailingControls = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function AppShellTrailingControls({ className, style, ...rest }, ref) {
  const ctx = useAppShell();
  return (
    <div
      ref={ref}
      data-pds-component="app-shell-trailing-controls"
      className={cn(overlayControlsStyles(), className)}
      style={{ right: ctx.rightInset, ...style }}
      {...rest}
    />
  );
});

/* ──────────────────────────────────────────────────────────────────────────
 * Panel headers (Sidebar / Main / SidePanel) — titlebar 영역 (44px)
 *   • 좌/우 끝의 *현재 열린* 패널 헤더에만 inset 자동 적용.
 *   • drag region 마커 (`data-tauri-drag-region`) 내장.
 * ────────────────────────────────────────────────────────────────────────── */

const panelHeaderStyles = tv({
  base: ["relative shrink-0 flex items-center", "h-[var(--pds-app-shell-titlebar-height,44px)]"],
});

function useHeaderInsets(role: PanelRole) {
  const ctx = useAppShell();
  const { leftEdge, rightEdge } = computeEdges(ctx.panels);
  const paddingLeft = role === leftEdge ? ctx.leftInset : 0;
  const paddingRight = role === rightEdge ? ctx.rightInset : 0;
  return { paddingLeft, paddingRight };
}

interface PanelHeaderBaseProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Tauri 윈도우 드래그 영역으로 표시할지. 기본 true.
   * `data-tauri-drag-region` 속성을 박는다 — 자식이 클릭 이벤트를 먹으면 드래그가 죽으므로,
   * 자식 인터랙티브 요소는 헤더 안에서 제한적으로만 배치할 것.
   */
  tauriDragRegion?: boolean;
}

function makePanelHeader(role: PanelRole, displayName: string) {
  const Component = React.forwardRef<HTMLDivElement, PanelHeaderBaseProps>(function PanelHeader(
    { tauriDragRegion = true, className, style, children, ...rest },
    ref,
  ) {
    const actualRole = usePanelRole();
    if (actualRole !== role) {
      throw new Error(
        `<${displayName}> must be inside <AppShell${role === "sidebar" ? "Sidebar" : role === "main" ? "Main" : "SidePanel"}>`,
      );
    }
    const { paddingLeft, paddingRight } = useHeaderInsets(role);
    return (
      <div
        ref={ref}
        data-pds-component={`app-shell-${role}-header`}
        data-tauri-drag-region={tauriDragRegion ? "" : undefined}
        className={cn(panelHeaderStyles(), className)}
        style={{ paddingLeft, paddingRight, ...style }}
        {...rest}
      >
        {children}
      </div>
    );
  });
  Component.displayName = displayName;
  return Component;
}

/**
 * Sidebar 의 상단 44px 영역. 사이드바가 좌측 끝일 때 leftInset 자동 적용.
 * 트래픽 라이트 회피용 padding 은 사용자가 신경 쓰지 않아도 됨.
 */
const AppShellSidebarHeader = makePanelHeader("sidebar", "AppShellSidebarHeader");

/**
 * Main 의 상단 44px 영역. 사이드바/사이드패널이 닫혔을 때 해당 측 inset 흡수.
 */
const AppShellMainHeader = makePanelHeader("main", "AppShellMainHeader");

/**
 * SidePanel 의 상단 44px 영역. 사이드패널이 우측 끝일 때 rightInset 자동 적용.
 */
const AppShellSidePanelHeader = makePanelHeader("sidePanel", "AppShellSidePanelHeader");

/* ──────────────────────────────────────────────────────────────────────────
 * Panel body / footer — 패널 내부 본문/풋터 (스크롤·flex 보조)
 * ────────────────────────────────────────────────────────────────────────── */

const panelBodyStyles = tv({
  base: "flex-1 min-h-0 overflow-y-auto",
});
const panelFooterStyles = tv({
  base: "shrink-0",
});

const AppShellSidebarBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  function AppShellSidebarBody({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-pds-component="app-shell-sidebar-body"
        className={cn(panelBodyStyles(), className)}
        {...rest}
      />
    );
  },
);

const AppShellSidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function AppShellSidebarFooter({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-pds-component="app-shell-sidebar-footer"
      className={cn(panelFooterStyles(), className)}
      {...rest}
    />
  );
});

const AppShellMainBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  function AppShellMainBody({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-pds-component="app-shell-main-body"
        className={cn(panelBodyStyles(), className)}
        {...rest}
      />
    );
  },
);

const AppShellSidePanelBody = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function AppShellSidePanelBody({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-pds-component="app-shell-side-panel-body"
      className={cn(panelBodyStyles(), className)}
      {...rest}
    />
  );
});

/* ──────────────────────────────────────────────────────────────────────────
 * Exports
 * ────────────────────────────────────────────────────────────────────────── */

export type {
  AppShellMainProps,
  AppShellProps,
  AppShellSidebarProps,
  AppShellSidePanelProps,
  AppShellSplitterProps,
  PanelHeaderBaseProps as AppShellPanelHeaderProps,
};
export {
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
  AppShellSidePanelBody,
  AppShellSidePanelHeader,
  AppShellSplitter,
  AppShellTrailingControls,
};
