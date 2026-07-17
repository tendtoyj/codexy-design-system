"use client";

import { ArrowUp, Check, Paperclip, Sparkle } from "@tendtoyj/cds-icons/icons";
import type { ReactNode } from "react";
import styles from "../base.module.css";

export function ProfileIntro({
  eyebrow,
  title,
  description,
  traits,
}: {
  eyebrow: string;
  title: string;
  description: string;
  traits: string[];
}) {
  return (
    <div className={styles.profileIntro}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.profileDescription}>{description}</p>
      </div>
      <ul className={styles.traitList} aria-label="Profile characteristics">
        {traits.map((trait) => (
          <li key={trait}>{trait}</li>
        ))}
      </ul>
    </div>
  );
}

export function AssistantAnswer({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? styles.assistantCompact : styles.assistant}>
      <div className={styles.assistantMark} aria-hidden="true">
        <Sparkle width={14} height={14} />
      </div>
      <div>
        <p>
          알림은 작업의 중요도에 따라 나누는 것이 좋아요. 제품 업데이트는 요약해서 받고, 보안 알림은
          즉시 받도록 설정했습니다.
        </p>
        <ul className={styles.answerList}>
          <li>
            <Check aria-hidden="true" width={13} height={13} /> 보안 알림 · 즉시
          </li>
          <li>
            <Check aria-hidden="true" width={13} height={13} /> 제품 업데이트 · 주간 요약
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Composer({ label = "메시지를 입력하세요" }: { label?: string }) {
  return (
    <fieldset className={styles.composer} aria-label="AI composer preview">
      <button type="button" className={styles.composerIcon} aria-label="파일 첨부">
        <Paperclip width={16} height={16} />
      </button>
      <span>{label}</span>
      <button type="button" className={styles.sendButton} aria-label="메시지 보내기">
        <ArrowUp width={15} height={15} />
      </button>
    </fieldset>
  );
}

export function Surface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`${styles.surface} ${className}`}>{children}</section>;
}

export function Toggle({ checked = false }: { checked?: boolean }) {
  return (
    <span className={checked ? styles.toggleChecked : styles.toggle} aria-hidden="true">
      <span />
    </span>
  );
}
