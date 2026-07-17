"use client";

import { ArrowRight } from "@tendtoyj/cds-icons/icons";
import Link from "next/link";
import { ProfileNavigation } from "./_components/profile-navigation";
import base from "./base.module.css";
import styles from "./index.module.css";
import { type ProfileId, profileIds, profiles } from "./profile-data";

function MiniPreview({ profile }: { profile: ProfileId }) {
  return (
    <div className={`${styles.miniPreview} ${styles[`mini_${profile}`]}`} aria-hidden="true">
      <span className={styles.miniBar} />
      <span className={styles.miniSide} />
      <span className={styles.miniMain} />
      <span className={styles.miniPanel} />
      <span className={styles.miniBubble} />
    </div>
  );
}

export default function DesignMdShowcaseIndex() {
  return (
    <main className={base.indexPage}>
      <ProfileNavigation />
      <section className={styles.indexIntro}>
        <p className={styles.eyebrow}>Codexy Design System</p>
        <h1>Four profiles, one visual language.</h1>
        <p>
          동일한 CDS 색상과 형태가 플랫폼에 따라 어떻게 다른 밀도, 내비게이션, overlay와 AI 작업
          경험으로 번역되는지 비교합니다.
        </p>
      </section>
      <section className={styles.profileGrid} aria-label="DESIGN.md profile showcases">
        {profileIds.map((profile) => {
          const item = profiles[profile];
          return (
            <Link
              key={profile}
              href={`/preview/design-md/${profile}`}
              className={styles.profileCard}
            >
              <MiniPreview profile={profile} />
              <div className={styles.profileCardBody}>
                <p className={styles.eyebrow}>{item.eyebrow}</p>
                <div className={styles.profileCardTitle}>
                  <h2>{item.title}</h2>
                  <ArrowRight aria-hidden="true" width={18} height={18} />
                </div>
                <p>{item.description}</p>
                <ul className={styles.cardTraits}>
                  {item.traits.map((trait) => (
                    <li key={trait}>{trait}</li>
                  ))}
                </ul>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
