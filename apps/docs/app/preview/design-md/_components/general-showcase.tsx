"use client";

import { Bell, Check, Circle, User } from "@tendtoyj/cds-icons/icons";
import { Button } from "@tendtoyj/cds-ui/components/button";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@tendtoyj/cds-ui/components/segmented-control";
import { Switch } from "@tendtoyj/cds-ui/components/switch";
import { useState } from "react";
import styles from "../general.module.css";
import { profiles } from "../profile-data";
import { CdsChatComposer, CdsChatConversation } from "./cds-chat-showcase";
import { ProfileIntro, Surface } from "./shared-ui";

export function GeneralShowcase() {
  const profile = profiles.general;
  const [delivery, setDelivery] = useState("smart");
  const [securityEnabled, setSecurityEnabled] = useState(true);
  const [updatesEnabled, setUpdatesEnabled] = useState(false);

  return (
    <div className={styles.generalShowcase}>
      <ProfileIntro {...profile} />
      <div className={styles.generalGrid}>
        <Surface className={styles.settingsSurface}>
          <div className={styles.surfaceHeading}>
            <div>
              <p className={styles.sectionLabel}>Settings</p>
              <h2>알림 환경 설정</h2>
            </div>
            <span className={styles.statusBadge}>
              <Check aria-hidden="true" width={12} height={12} /> 저장됨
            </span>
          </div>
          <div className={styles.fieldGroup}>
            <span>알림 이메일</span>
            <div className={styles.inputPreview}>
              <User aria-hidden="true" width={16} height={16} />
              hello@codexy.com
            </div>
            <p>중요한 계정 및 보안 알림을 받을 주소입니다.</p>
          </div>
          <div className={styles.deliveryControl}>
            <span>알림 전달 방식</span>
            <SegmentedControl
              size="sm"
              fullWidth
              value={delivery}
              onValueChange={setDelivery}
              aria-label="알림 전달 방식"
            >
              <SegmentedControlItem value="instant">즉시</SegmentedControlItem>
              <SegmentedControlItem value="smart">스마트</SegmentedControlItem>
              <SegmentedControlItem value="digest">요약</SegmentedControlItem>
            </SegmentedControl>
          </div>
          <div className={styles.preferenceList}>
            <div className={styles.preferenceRow}>
              <span className={styles.preferenceIcon}>
                <Bell width={16} height={16} />
              </span>
              <span>
                <strong>보안 및 계정</strong>
                <small>로그인, 권한 및 결제 변경</small>
              </span>
              <Switch
                size="md"
                checked={securityEnabled}
                onCheckedChange={setSecurityEnabled}
                aria-label="보안 및 계정 알림"
              />
            </div>
            <div className={styles.preferenceRow}>
              <span className={styles.preferenceIcon}>
                <Circle width={16} height={16} />
              </span>
              <span>
                <strong>제품 업데이트</strong>
                <small>새 기능과 개선 사항 요약</small>
              </span>
              <Switch
                size="md"
                checked={updatesEnabled}
                onCheckedChange={setUpdatesEnabled}
                aria-label="제품 업데이트 알림"
              />
            </div>
          </div>
          <div className={styles.buttonRow}>
            <Button type="button" variant="outlined" size="md">
              취소
            </Button>
            <Button type="button" variant="solid" size="md">
              변경사항 저장
            </Button>
          </div>
        </Surface>

        <Surface className={styles.aiSurface}>
          <div className={styles.surfaceHeading}>
            <div>
              <p className={styles.sectionLabel}>AI-native content</p>
              <h2>설정 도우미</h2>
            </div>
            <span className={styles.onlineDot}>Online</span>
          </div>
          <div className={styles.conversation}>
            <CdsChatConversation profile="general" />
          </div>
          <div className={styles.generalComposer}>
            <CdsChatComposer
              placeholder="DESIGN.md 전략에 대해 물어보세요"
              attachment="general/DESIGN.md"
            />
          </div>
        </Surface>
      </div>

      <div className={styles.foundationStrip}>
        <div>
          <p className={styles.sectionLabel}>Color identity</p>
          <div className={styles.swatches}>
            <span className={styles.swatchPrimary} />
            <span className={styles.swatchCanvas} />
            <span className={styles.swatchFill} />
            <span className={styles.swatchFocus} />
            <span className={styles.swatchPositive} />
          </div>
        </div>
        <div className={styles.typeSpecimen}>
          <p className={styles.sectionLabel}>Type hierarchy</p>
          <p className={styles.specimenTitle}>Precise and calm.</p>
          <p>콘텐츠가 장식보다 먼저 읽히는 전문적인 제품 인터페이스</p>
        </div>
        <div className={styles.shapeSpecimen}>
          <p className={styles.sectionLabel}>Shape</p>
          <span>6</span>
          <span>8</span>
          <span>12</span>
          <span>16</span>
        </div>
      </div>
    </div>
  );
}
