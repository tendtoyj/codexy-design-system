"use client";

import * as React from "react";
import { createPortal } from "react-dom";

interface PageHeaderSlotContextValue {
  activeId: string | null;
  register: (id: string) => void;
  setTarget: (target: HTMLDivElement | null) => void;
  target: HTMLDivElement | null;
  unregister: (id: string) => void;
}

const PageHeaderSlotContext = React.createContext<PageHeaderSlotContextValue | null>(null);

interface AppShellPageHeaderProviderProps {
  children?: React.ReactNode;
}

function AppShellPageHeaderProvider({ children }: AppShellPageHeaderProviderProps) {
  const [registrations, setRegistrations] = React.useState<readonly string[]>([]);
  const [target, setTarget] = React.useState<HTMLDivElement | null>(null);

  const register = React.useCallback((id: string) => {
    setRegistrations((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const unregister = React.useCallback((id: string) => {
    setRegistrations((current) =>
      current.includes(id) ? current.filter((registration) => registration !== id) : current,
    );
  }, []);

  const activeId = registrations.at(-1) ?? null;
  const value = React.useMemo<PageHeaderSlotContextValue>(
    () => ({ activeId, register, setTarget, target, unregister }),
    [activeId, register, target, unregister],
  );

  return <PageHeaderSlotContext.Provider value={value}>{children}</PageHeaderSlotContext.Provider>;
}

interface AppShellPageHeaderProps {
  children?: React.ReactNode;
}

/**
 * Renders page-scoped controls in the nearest AppShell main header.
 *
 * Outside AppShellMain, content renders inline. Inside AppShellMain, content
 * waits for the main header slot so the page body never renders a duplicate.
 */
function AppShellPageHeader({ children }: AppShellPageHeaderProps): React.ReactNode {
  const context = React.useContext(PageHeaderSlotContext);
  const id = React.useId();
  const register = context?.register;
  const unregister = context?.unregister;

  React.useEffect(() => {
    if (!register || !unregister) return undefined;
    register(id);
    return () => unregister(id);
  }, [id, register, unregister]);

  if (!context) return <>{children}</>;
  if (context.activeId !== id || !context.target) return null;
  return createPortal(children, context.target);
}

function AppShellPageHeaderSlot() {
  const context = React.useContext(PageHeaderSlotContext);
  if (!context?.activeId) return null;

  return (
    <div
      ref={context.setTarget}
      data-cds-component="app-shell-page-header-slot"
      className="flex min-w-0 flex-1 items-center justify-end gap-[8px] overflow-hidden px-[32px] [&_a]:[-webkit-app-region:no-drag] [&_button]:[-webkit-app-region:no-drag] [&_input]:[-webkit-app-region:no-drag] [&_select]:[-webkit-app-region:no-drag] [&_textarea]:[-webkit-app-region:no-drag]"
    />
  );
}

export type { AppShellPageHeaderProps };
export { AppShellPageHeader, AppShellPageHeaderProvider, AppShellPageHeaderSlot };
