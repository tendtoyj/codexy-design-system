// @vitest-environment jsdom

import { act, type ReactElement, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { AppShellPageHeader as PublicAppShellPageHeader } from "../../index";
import {
  AppShell,
  AppShellMain,
  AppShellMainBody,
  AppShellMainHeader,
  AppShellPageHeader,
  AppShellSidebar,
  AppShellSidebarBody,
  AppShellSidebarHeader,
  AppShellSidePanel,
  AppShellSidePanelBody,
  AppShellSidePanelHeader,
  AppShellSplitter,
} from "../app-shell";

const actGlobal = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean;
};
actGlobal.IS_REACT_ACT_ENVIRONMENT = true;

const roots: Root[] = [];

afterEach(() => {
  for (const root of roots) {
    act(() => root.unmount());
  }
  roots.length = 0;
  document.body.innerHTML = "";
});

describe("AppShellPageHeader", () => {
  it("portals page content into the main header without duplicating it in the body", async () => {
    const view = await renderClient(
      <AppShell>
        <AppShellMain>
          <AppShellMainHeader>
            <span>Leading content</span>
          </AppShellMainHeader>
          <AppShellMainBody>
            <AppShellPageHeader>
              <button type="button">Page action</button>
            </AppShellPageHeader>
            <span>Body content</span>
          </AppShellMainBody>
        </AppShellMain>
      </AppShell>,
    );

    const slot = getSlot(view.container);
    const header = getMainHeader(view.container);
    const body = view.container.querySelector('[data-cds-component="app-shell-main-body"]');

    expect(slot).not.toBeNull();
    expect(header?.contains(slot)).toBe(true);
    expect(header?.firstElementChild?.textContent).toBe("Leading content");
    expect(slot?.textContent).toBe("Page action");
    expect(body?.textContent).toBe("Body content");
    expect(view.container.querySelectorAll("button")).toHaveLength(1);
  });

  it("renders inline outside AppShellMain and stays safe during server rendering", () => {
    const html = renderToString(
      <AppShellPageHeader>
        <span>Inline controls</span>
      </AppShellPageHeader>,
    );

    expect(html).toContain("Inline controls");
  });

  it("does not render an empty slot without an active page header", async () => {
    const view = await renderClient(
      <AppShell>
        <AppShellMain>
          <AppShellMainHeader>Static header</AppShellMainHeader>
          <AppShellMainBody>Body content</AppShellMainBody>
        </AppShellMain>
      </AppShell>,
    );

    expect(getSlot(view.container)).toBeNull();
  });

  it("does not render a duplicate inline fallback before the slot mounts", () => {
    const html = renderToString(
      <AppShell>
        <AppShellMain>
          <AppShellMainHeader />
          <AppShellMainBody>
            <AppShellPageHeader>Header-only controls</AppShellPageHeader>
            <span>Body content</span>
          </AppShellMainBody>
        </AppShellMain>
      </AppShell>,
    );

    expect(html).not.toContain("Header-only controls");
    expect(html).toContain("Body content");
    expect(html).not.toContain("app-shell-page-header-slot");
  });

  it("keeps page header content hidden when AppShellMainHeader is absent", async () => {
    const view = await renderClient(
      <AppShell>
        <AppShellMain>
          <AppShellMainBody>
            <AppShellPageHeader>Header-only controls</AppShellPageHeader>
            <span>Body content</span>
          </AppShellMainBody>
        </AppShellMain>
      </AppShell>,
    );

    expect(view.container.textContent).toBe("Body content");
    expect(getSlot(view.container)).toBeNull();
  });

  it("removes the slot and stale content when the active page header unmounts", async () => {
    const view = await renderClient(<PageHeaderFixture showHeader />);
    expect(getSlot(view.container)?.textContent).toBe("Current page");

    await view.render(<PageHeaderFixture showHeader={false} />);

    expect(getSlot(view.container)).toBeNull();
    expect(view.container.textContent).not.toContain("Current page");
  });

  it("replaces route-scoped content without leaving the previous header behind", async () => {
    const view = await renderClient(<RouteHeaderFixture page="inventory" />);
    expect(getSlot(view.container)?.textContent).toBe("Inventory tabs");

    await view.render(<RouteHeaderFixture page="settings" />);

    expect(getSlot(view.container)?.textContent).toBe("Settings actions");
    expect(view.container.textContent).not.toContain("Inventory tabs");
  });

  it("uses last-mounted-wins and restores the previous instance after cleanup", async () => {
    const view = await renderClient(<MultipleHeaderFixture showSecond />);
    expect(getSlot(view.container)?.textContent).toBe("Second header");
    expect(view.container.textContent).not.toContain("First header");

    await view.render(<MultipleHeaderFixture showSecond={false} />);

    expect(getSlot(view.container)?.textContent).toBe("First header");
    expect(
      view.container.querySelectorAll('[data-cds-component="app-shell-page-header-slot"]'),
    ).toHaveLength(1);
  });

  it("does not duplicate registrations or content in StrictMode", async () => {
    const view = await renderClient(
      <StrictMode>
        <PageHeaderFixture showHeader />
      </StrictMode>,
    );

    expect(
      view.container.querySelectorAll('[data-cds-component="app-shell-page-header-slot"]'),
    ).toHaveLength(1);
    expect(view.container.textContent?.match(/Current page/g)).toHaveLength(1);
  });

  it("isolates nested AppShell page headers in their nearest main slot", async () => {
    const view = await renderClient(
      <AppShell>
        <AppShellMain>
          <AppShellMainHeader data-testid="outer-header" />
          <AppShellMainBody>
            <AppShellPageHeader>Outer controls</AppShellPageHeader>
            <AppShell>
              <AppShellMain>
                <AppShellMainHeader data-testid="inner-header" />
                <AppShellMainBody>
                  <AppShellPageHeader>Inner controls</AppShellPageHeader>
                </AppShellMainBody>
              </AppShellMain>
            </AppShell>
          </AppShellMainBody>
        </AppShellMain>
      </AppShell>,
    );

    const outerHeader = view.container.querySelector('[data-testid="outer-header"]');
    const innerHeader = view.container.querySelector('[data-testid="inner-header"]');
    expect(outerHeader?.textContent).toBe("Outer controls");
    expect(innerHeader?.textContent).toBe("Inner controls");
    expect(
      view.container.querySelectorAll('[data-cds-component="app-shell-page-header-slot"]'),
    ).toHaveLength(2);
  });

  it("preserves the Tauri drag marker and scopes Electron no-drag to interactive descendants", async () => {
    const view = await renderClient(<PageHeaderFixture showHeader />);
    const header = getMainHeader(view.container);
    const slot = getSlot(view.container) as HTMLElement | null;
    const slotStyle = slot?.style as CSSStyleDeclaration & { WebkitAppRegion?: string };

    expect(header?.getAttribute("data-tauri-drag-region")).toBe("");
    expect(slotStyle?.WebkitAppRegion).toBeUndefined();
    expect(slot?.className).toContain("[&_button]:[-webkit-app-region:no-drag]");
    expect(slot?.className).toContain("[&_a]:[-webkit-app-region:no-drag]");
  });

  it("exports the same public component through the package entrypoint", () => {
    expect(PublicAppShellPageHeader).toBe(AppShellPageHeader);
  });
});

describe("AppShell regressions", () => {
  it("keeps controlled panel visibility, width, and structure intact", async () => {
    const view = await renderClient(<ControlledShell sidebarOpen={false} sidebarWidth={260} />);
    let sidebar = view.container.querySelector(
      '[data-cds-component="app-shell-sidebar"]',
    ) as HTMLElement;
    expect(sidebar.dataset.state).toBe("closed");
    expect(sidebar.style.width).toBe("0px");

    await view.render(<ControlledShell sidebarOpen sidebarWidth={280} />);

    sidebar = view.container.querySelector(
      '[data-cds-component="app-shell-sidebar"]',
    ) as HTMLElement;
    expect(sidebar.dataset.state).toBe("open");
    expect(sidebar.style.width).toBe("280px");
    expect(view.container.querySelector('[data-cds-component="app-shell-main"]')).not.toBeNull();
    expect(
      view.container.querySelector('[data-cds-component="app-shell-side-panel"]'),
    ).not.toBeNull();
  });

  it("keeps uncontrolled splitter width updates working", async () => {
    const view = await renderClient(
      <AppShell>
        <AppShellSidebar defaultWidth={220}>
          <AppShellSidebarHeader />
          <AppShellSidebarBody />
        </AppShellSidebar>
        <AppShellSplitter target="sidebar" doubleClickResetWidth={260} />
        <AppShellMain>
          <AppShellMainHeader />
          <AppShellMainBody />
        </AppShellMain>
      </AppShell>,
    );
    const splitter = view.container.querySelector('[data-cds-component="app-shell-splitter"]');

    await act(async () => splitter?.dispatchEvent(new MouseEvent("dblclick", { bubbles: true })));

    const sidebar = view.container.querySelector(
      '[data-cds-component="app-shell-sidebar"]',
    ) as HTMLElement;
    expect(sidebar.style.width).toBe("260px");
  });
});

function PageHeaderFixture({ showHeader }: { showHeader: boolean }) {
  return (
    <AppShell>
      <AppShellMain>
        <AppShellMainHeader />
        <AppShellMainBody>
          {showHeader ? <AppShellPageHeader>Current page</AppShellPageHeader> : null}
          <span>Body content</span>
        </AppShellMainBody>
      </AppShellMain>
    </AppShell>
  );
}

function RouteHeaderFixture({ page }: { page: "inventory" | "settings" }) {
  return (
    <AppShell>
      <AppShellMain>
        <AppShellMainHeader />
        <AppShellMainBody>
          {page === "inventory" ? (
            <AppShellPageHeader key="inventory">Inventory tabs</AppShellPageHeader>
          ) : (
            <AppShellPageHeader key="settings">Settings actions</AppShellPageHeader>
          )}
        </AppShellMainBody>
      </AppShellMain>
    </AppShell>
  );
}

function MultipleHeaderFixture({ showSecond }: { showSecond: boolean }) {
  return (
    <AppShell>
      <AppShellMain>
        <AppShellMainHeader />
        <AppShellMainBody>
          <AppShellPageHeader>First header</AppShellPageHeader>
          {showSecond ? <AppShellPageHeader>Second header</AppShellPageHeader> : null}
        </AppShellMainBody>
      </AppShellMain>
    </AppShell>
  );
}

function ControlledShell({
  sidebarOpen,
  sidebarWidth,
}: {
  sidebarOpen: boolean;
  sidebarWidth: number;
}) {
  return (
    <AppShell>
      <AppShellSidebar open={sidebarOpen} width={sidebarWidth}>
        <AppShellSidebarHeader />
        <AppShellSidebarBody />
      </AppShellSidebar>
      <AppShellMain>
        <AppShellMainHeader />
        <AppShellMainBody />
      </AppShellMain>
      <AppShellSidePanel>
        <AppShellSidePanelHeader />
        <AppShellSidePanelBody />
      </AppShellSidePanel>
    </AppShell>
  );
}

async function renderClient(element: ReactElement) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  roots.push(root);

  const render = async (next: ReactElement) => {
    await act(async () => root.render(next));
  };
  await render(element);
  return { container, render };
}

function getMainHeader(container: HTMLElement) {
  return container.querySelector('[data-cds-component="app-shell-main-header"]');
}

function getSlot(container: HTMLElement) {
  return container.querySelector('[data-cds-component="app-shell-page-header-slot"]');
}
