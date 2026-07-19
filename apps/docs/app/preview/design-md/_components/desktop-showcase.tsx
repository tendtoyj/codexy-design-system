"use client";

import {
  ChatCircle,
  Check,
  ClockCounterClockwise,
  FileText,
  Folder,
  Gear,
  MagnifyingGlass,
  Plus,
  SidebarSimple,
  Sparkle,
} from "@tendtoyj/cds-icons/icons";
import { IconButton } from "@tendtoyj/cds-ui/components/icon-button";
import { type RemovableTab, RemovableTabBar } from "@tendtoyj/cds-ui/components/removable-tab-bar";
import { useState } from "react";
import styles from "../desktop.module.css";
import { profiles } from "../profile-data";
import { CdsChatComposer, CdsChatConversation } from "./cds-chat-showcase";
import { ProfileIntro } from "./shared-ui";

const navItems = [
  { icon: ChatCircle, label: "Sessions", active: true },
  { icon: Folder, label: "Library" },
  { icon: ClockCounterClockwise, label: "History" },
];

const initialTabs: RemovableTab[] = [
  { id: "profile", title: "DESIGN.md profile" },
  { id: "mobile", title: "Mobile audit" },
];

export function DesktopShowcase() {
  const [tabs, setTabs] = useState(initialTabs);
  const [activeId, setActiveId] = useState<string | null>(initialTabs[0]?.id ?? null);

  const closeTab = (id: string) => {
    setTabs((current) => {
      const remaining = current.filter((tab) => tab.id !== id);
      if (activeId === id) setActiveId(remaining[0]?.id ?? null);
      return remaining;
    });
  };

  const addTab = () => {
    const id = `review-${tabs.length + 1}`;
    setTabs((current) => [...current, { id, title: "새 검토" }]);
    setActiveId(id);
  };

  return (
    <div className={styles.desktopShowcase}>
      <ProfileIntro {...profiles.desktop} />
      <section className={styles.desktopWindow} aria-label="Desktop workspace preview">
        <aside className={styles.desktopSidebar}>
          <div className={styles.desktopBrand}>
            <span className={styles.brandMark}>C</span>
            <strong>Codexy</strong>
            <IconButton size="xs" variant="subtle" aria-label="사이드바 접기">
              <SidebarSimple width={15} height={15} />
            </IconButton>
          </div>
          <nav className={styles.desktopNav} aria-label="Workspace navigation">
            {navItems.map(({ icon: Icon, label, active }) => (
              <a key={label} className={active ? styles.desktopNavActive : undefined} href="#main">
                <Icon width={15} height={15} />
                {label}
              </a>
            ))}
          </nav>
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarSectionTitle}>
              <span>Recent</span>
              <Plus width={13} height={13} />
            </div>
            <a href="#main">DESIGN.md 프로필 전략</a>
            <a href="#main">Mobile navigation audit</a>
            <a href="#main">Release 0.3 planning</a>
          </div>
          <div className={styles.sidebarFooter}>
            <Gear width={15} height={15} /> Settings
          </div>
        </aside>

        <main className={styles.desktopMain} id="main">
          <header className={styles.desktopToolbar}>
            <div className={styles.sessionTabs}>
              <RemovableTabBar
                size="sm"
                tabs={tabs}
                activeId={activeId}
                onSwitch={setActiveId}
                onClose={closeTab}
              />
              <IconButton size="xs" variant="subtle" aria-label="새 세션" onClick={addTab}>
                <Plus width={14} height={14} />
              </IconButton>
            </div>
            <IconButton size="xs" variant="subtle" aria-label="검색">
              <MagnifyingGlass width={14} height={14} />
            </IconButton>
          </header>
          <div className={styles.desktopThread}>
            <div className={styles.threadDate}>Today · 10:42</div>
            <CdsChatConversation profile="desktop" showTrace />
          </div>
          <div className={styles.desktopComposerWrap}>
            <CdsChatComposer
              placeholder="메시지를 입력하세요…"
              attachment="desktop/DESIGN.md"
              footerText="Enter to send · Shift + Enter for a new line"
            />
          </div>
        </main>

        <aside className={styles.contextPanel}>
          <div className={styles.contextHeader}>
            <div>
              <span>Context</span>
              <strong>Profile checklist</strong>
            </div>
            <IconButton size="xs" variant="subtle" aria-label="AI 컨텍스트 도구">
              <Sparkle width={14} height={14} />
            </IconButton>
          </div>
          <div className={styles.contextContent}>
            <div className={styles.contextFile}>
              <FileText width={17} height={17} />
              <span>
                <strong>desktop/DESIGN.md</strong>
                <small>258 lines · alpha</small>
              </span>
            </div>
            <h3>Translation status</h3>
            <ul className={styles.checkList}>
              <li>
                <Check width={13} height={13} /> Shared color roles
              </li>
              <li>
                <Check width={13} height={13} /> 14px desktop type
              </li>
              <li>
                <Check width={13} height={13} /> 3-panel shell
              </li>
              <li>
                <Check width={13} height={13} /> Keyboard focus
              </li>
            </ul>
            <div className={styles.contextNote}>
              <strong>SSOT boundary</strong>
              <p>Code remains implementation SSOT. This profile translates its visual intent.</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
