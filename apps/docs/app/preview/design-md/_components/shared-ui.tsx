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
