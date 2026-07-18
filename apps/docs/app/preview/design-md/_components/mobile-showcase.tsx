"use client";

import {
  ArrowLeft,
  ChatCircle,
  DotsThree,
  House,
  List,
  MagnifyingGlass,
  User,
} from "@tendtoyj/cds-icons/icons";
import { Button } from "@tendtoyj/cds-ui/components/button";
import { IconButton } from "@tendtoyj/cds-ui/components/icon-button";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@tendtoyj/cds-ui/components/segmented-control";
import { useState } from "react";
import styles from "../mobile.module.css";
import { profiles } from "../profile-data";
import { CdsChatComposer, CdsChatConversation } from "./cds-chat-showcase";
import { ProfileIntro } from "./shared-ui";

export function MobileShowcase() {
  const [mode, setMode] = useState("chat");

  return (
    <div className={styles.mobileShowcase}>
      <ProfileIntro {...profiles.mobile} />
      <div className={styles.mobileStage}>
        <section className={styles.phone} aria-label="Mobile chat preview">
          <div className={styles.phoneStatus}>
            <span>9:41</span>
            <span>● ● ▰</span>
          </div>
          <header className={styles.mobileHeader}>
            <IconButton size="lg" variant="subtle" aria-label="세션 목록으로 돌아가기">
              <ArrowLeft width={20} height={20} />
            </IconButton>
            <span>
              <strong>디자인 시스템 도우미</strong>
              <small>온라인</small>
            </span>
            <IconButton size="lg" variant="subtle" aria-label="대화 메뉴">
              <DotsThree width={21} height={21} />
            </IconButton>
          </header>
          <div className={styles.mobileThread}>
            <p className={styles.mobileDate}>오늘 오전 10:42</p>
            <SegmentedControl
              className={styles.mobileModeControl}
              size="md"
              fullWidth
              value={mode}
              onValueChange={setMode}
              aria-label="모바일 AI 작업 모드"
            >
              <SegmentedControlItem value="chat">대화</SegmentedControlItem>
              <SegmentedControlItem value="task">작업</SegmentedControlItem>
            </SegmentedControl>
            <CdsChatConversation profile="mobile" />
            <div className={styles.mobileSuggestionRow}>
              <Button type="button" variant="outlined" size="md">
                변경사항 보기
              </Button>
              <Button type="button" variant="outlined" size="md">
                되돌리기
              </Button>
            </div>
          </div>
          <div className={styles.mobileComposerWrap}>
            <CdsChatComposer placeholder="메시지" />
          </div>
          <nav className={styles.bottomNavigation} aria-label="Mobile primary navigation">
            <a href="#mobile" className={styles.bottomNavActive}>
              <House width={21} height={21} />홈
            </a>
            <a href="#mobile">
              <ChatCircle width={21} height={21} />
              대화
            </a>
            <a href="#mobile">
              <MagnifyingGlass width={21} height={21} />
              탐색
            </a>
            <a href="#mobile">
              <User width={21} height={21} />
              프로필
            </a>
          </nav>
          <div className={styles.homeIndicator} />
        </section>

        <aside className={styles.mobileNotes}>
          <div>
            <span className={styles.noteNumber}>01</span>
            <h2>Single active task</h2>
            <p>세션 목록에서 하나의 대화로 진입하고, 상단 뒤로가기로 문맥을 보존합니다.</p>
          </div>
          <div>
            <span className={styles.noteNumber}>02</span>
            <h2>Thumb-reachable action</h2>
            <p>composer와 전송 affordance는 가상 키보드와 bottom safe area 위에 유지됩니다.</p>
          </div>
          <div>
            <span className={styles.noteNumber}>03</span>
            <h2>44px minimum</h2>
            <p>아이콘, 메뉴, 내비게이션은 hover 없이도 눌렀을 때 명확한 feedback을 줍니다.</p>
          </div>
          <div className={styles.mobileTranslationTag}>
            <List width={18} height={18} />
            <span>
              <strong>New translation</strong>
              <small>Bottom navigation · Sheet · Safe area</small>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
