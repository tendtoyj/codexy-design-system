"use client";

import { ArrowLeft, ArrowUpRight } from "@tendtoyj/cds-icons/icons";
import Link from "next/link";
import styles from "../base.module.css";
import { type ProfileId, profileIds, profiles } from "../profile-data";

export function ProfileNavigation({ active }: { active?: ProfileId }) {
  return (
    <header className={styles.navigation}>
      <Link className={styles.backLink} href="/preview/design-md">
        <ArrowLeft aria-hidden="true" width={16} height={16} />
        DESIGN.md showcase
      </Link>
      <nav className={styles.profileTabs} aria-label="DESIGN.md profiles">
        {profileIds.map((profile) => (
          <Link
            key={profile}
            href={`/preview/design-md/${profile}`}
            className={active === profile ? styles.profileTabActive : styles.profileTab}
            aria-current={active === profile ? "page" : undefined}
          >
            {profiles[profile].title.replace(/ .+$/, "")}
          </Link>
        ))}
      </nav>
      {active ? (
        <a
          className={styles.documentLink}
          href={`https://github.com/tendtoyj/codexy-design-system/blob/main/design-md/${active}/DESIGN.md`}
          target="_blank"
          rel="noreferrer"
        >
          Source
          <ArrowUpRight aria-hidden="true" width={14} height={14} />
        </a>
      ) : (
        <span className={styles.documentLinkPlaceholder} aria-hidden="true" />
      )}
    </header>
  );
}
