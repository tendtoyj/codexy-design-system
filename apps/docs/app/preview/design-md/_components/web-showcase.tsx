"use client";

import {
  Bell,
  CaretDown,
  ChartBar,
  ChatCircle,
  CheckCircle,
  DotsThree,
  Folders,
  Gear,
  House,
  List,
  MagnifyingGlass,
  Plus,
  Sparkle,
  TrendUp,
  Users,
} from "@tendtoyj/cds-icons/icons";
import { profiles } from "../profile-data";
import styles from "../web.module.css";
import { ProfileIntro } from "./shared-ui";

const tableRows = [
  ["Design system refresh", "김유정", "In progress", "Jul 21"],
  ["Mobile navigation", "서지훈", "Review", "Jul 24"],
  ["Accessibility audit", "박서연", "Complete", "Jul 18"],
];

export function WebShowcase() {
  return (
    <div className={styles.webShowcase}>
      <ProfileIntro {...profiles.web} />
      <section className={styles.webApp} aria-label="Responsive web dashboard preview">
        <header className={styles.webHeader}>
          <div className={styles.webBrand}>
            <span className={styles.brandMark}>C</span>
            <strong>Codexy</strong>
          </div>
          <button type="button" className={styles.webMenuButton} aria-label="내비게이션 열기">
            <List width={18} height={18} />
          </button>
          <div className={styles.webSearch}>
            <MagnifyingGlass width={16} height={16} />
            <span>프로젝트 검색</span>
            <kbd>⌘ K</kbd>
          </div>
          <div className={styles.webHeaderActions}>
            <button type="button" aria-label="알림">
              <Bell width={18} height={18} />
            </button>
            <button type="button" className={styles.webPrimaryButton}>
              <Plus width={15} height={15} /> 새 프로젝트
            </button>
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
            <button type="button" className={styles.dateControl}>
              최근 30일 <CaretDown width={14} height={14} />
            </button>
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
                <button type="button">전체 보기</button>
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

            <aside className={styles.aiInsight}>
              <div className={styles.aiInsightHeader}>
                <span>
                  <Sparkle width={15} height={15} /> AI insight
                </span>
                <button type="button" aria-label="더보기">
                  <DotsThree width={17} height={17} />
                </button>
              </div>
              <h3>Mobile 문서의 접근성 검토가 필요해요.</h3>
              <p>새로운 bottom sheet 규칙 중 두 항목에 focus 이동 원칙을 추가하면 좋습니다.</p>
              <button type="button" className={styles.insightAction}>
                <ChatCircle width={15} height={15} /> AI와 검토하기
              </button>
            </aside>
          </div>
        </main>
      </section>
    </div>
  );
}
