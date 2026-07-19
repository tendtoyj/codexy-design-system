"use client";

import {
  Bell,
  CaretDown,
  ChartBar,
  CheckCircle,
  Folders,
  Gear,
  House,
  List,
  MagnifyingGlass,
  Plus,
  TrendUp,
  Users,
} from "@tendtoyj/cds-icons/icons";
import { Button } from "@tendtoyj/cds-ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@tendtoyj/cds-ui/components/dropdown-menu";
import { IconButton } from "@tendtoyj/cds-ui/components/icon-button";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@tendtoyj/cds-ui/components/segmented-control";
import { useState } from "react";
import { profiles } from "../profile-data";
import styles from "../web.module.css";
import { CdsChatComposer, CdsChatConversation } from "./cds-chat-showcase";
import { ProfileIntro } from "./shared-ui";

const tableRows = [
  ["Design system refresh", "김유정", "In progress", "Jul 21"],
  ["Mobile navigation", "서지훈", "Review", "Jul 24"],
  ["Accessibility audit", "박서연", "Complete", "Jul 18"],
];

const rangeOptions = [
  { id: "7d", label: "최근 7일" },
  { id: "30d", label: "최근 30일" },
  { id: "90d", label: "최근 90일" },
];

export function WebShowcase() {
  const [view, setView] = useState("overview");
  const [range, setRange] = useState("30d");

  return (
    <div className={styles.webShowcase}>
      <ProfileIntro {...profiles.web} />
      <section className={styles.webApp} aria-label="Responsive web dashboard preview">
        <header className={styles.webHeader}>
          <div className={styles.webBrand}>
            <span className={styles.brandMark}>C</span>
            <strong>Codexy</strong>
          </div>
          <IconButton
            size="md"
            variant="subtle"
            className={styles.webMenuButton}
            aria-label="내비게이션 열기"
          >
            <List width={18} height={18} />
          </IconButton>
          <div className={styles.webSearch}>
            <MagnifyingGlass width={16} height={16} />
            <span>프로젝트 검색</span>
            <kbd>⌘ K</kbd>
          </div>
          <div className={styles.webHeaderActions}>
            <IconButton size="md" variant="subtle" aria-label="알림">
              <Bell width={18} height={18} />
            </IconButton>
            <Button
              type="button"
              variant="solid"
              size="sm"
              className={styles.webPrimaryButton}
              leadingContent={<Plus width={15} height={15} />}
            >
              <span className={styles.webPrimaryLabel}>새 프로젝트</span>
            </Button>
            <span className={styles.webAvatar}>YK</span>
          </div>
        </header>

        <aside className={styles.webSidebar}>
          <nav aria-label="Web application navigation">
            <a href="#web" className={styles.webNavActive}>
              <House width={16} height={16} /> Overview
            </a>
            <a href="#web">
              <Folders width={16} height={16} /> Projects
            </a>
            <a href="#web">
              <ChartBar width={16} height={16} /> Reports
            </a>
            <a href="#web">
              <Users width={16} height={16} /> Team
            </a>
          </nav>
          <nav aria-label="Secondary navigation">
            <a href="#web">
              <Gear width={16} height={16} /> Settings
            </a>
          </nav>
        </aside>

        <main className={styles.webMain} id="web">
          <div className={styles.webTitleRow}>
            <div>
              <p className={styles.sectionLabel}>Workspace overview</p>
              <h2>안녕하세요, 유정님</h2>
              <p>팀의 디자인 시스템 작업과 최근 진행 상황입니다.</p>
            </div>
            <div className={styles.webTitleControls}>
              <SegmentedControl
                size="sm"
                value={view}
                onValueChange={setView}
                aria-label="대시보드 보기"
              >
                <SegmentedControlItem value="overview">개요</SegmentedControlItem>
                <SegmentedControlItem value="activity">활동</SegmentedControlItem>
              </SegmentedControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outlined"
                    size="sm"
                    trailingContent={<CaretDown width={14} height={14} />}
                  >
                    {rangeOptions.find((option) => option.id === range)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent size="sm" align="end">
                  <DropdownMenuRadioGroup value={range} onValueChange={setRange}>
                    {rangeOptions.map((option) => (
                      <DropdownMenuRadioItem key={option.id} value={option.id}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <article>
              <span>Active projects</span>
              <strong>12</strong>
              <small className={styles.metricPositive}>
                <TrendUp width={13} height={13} /> 8.4%
              </small>
            </article>
            <article>
              <span>Review queue</span>
              <strong>7</strong>
              <small>3 due today</small>
            </article>
            <article>
              <span>Components</span>
              <strong>44</strong>
              <small>2 updated</small>
            </article>
          </div>

          <div className={styles.webContentGrid}>
            <section className={styles.projectSection}>
              <div className={styles.webSectionHeader}>
                <div>
                  <h3>Project activity</h3>
                  <p>현재 진행 중인 주요 작업</p>
                </div>
                <Button type="button" variant="frosted" size="xs">
                  전체 보기
                </Button>
              </div>
              <table className={styles.projectTable}>
                <caption className={styles.srOnly}>Project activity</caption>
                <thead>
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Status</th>
                    <th scope="col">Due</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(([project, owner, status, due]) => (
                    <tr key={project}>
                      <th scope="row">{project}</th>
                      <td>{owner}</td>
                      <td>
                        <span
                          className={
                            status === "Complete" ? styles.completeStatus : styles.openStatus
                          }
                        >
                          {status === "Complete" && <CheckCircle width={13} height={13} />}
                          {status}
                        </span>
                      </td>
                      <td>{due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <aside className={styles.aiChat} aria-label="Web AI chat panel">
              <div className={styles.aiChatHeader}>
                <div>
                  <span>AI workspace</span>
                  <strong>DESIGN.md 검토</strong>
                </div>
                <span className={styles.aiOnline}>Online</span>
              </div>
              <div className={styles.webChatThread}>
                <CdsChatConversation profile="web" showTrace />
              </div>
              <div className={styles.webChatComposer}>
                <CdsChatComposer placeholder="AI와 문서를 검토하세요" />
              </div>
            </aside>
          </div>
        </main>
      </section>
    </div>
  );
}
