import { notFound } from "next/navigation";
import { DesktopShowcase } from "../_components/desktop-showcase";
import { GeneralShowcase } from "../_components/general-showcase";
import { MobileShowcase } from "../_components/mobile-showcase";
import { ProfileNavigation } from "../_components/profile-navigation";
import { WebShowcase } from "../_components/web-showcase";
import styles from "../base.module.css";
import { isProfileId, type ProfileId, profileIds, profiles } from "../profile-data";

export function generateStaticParams() {
  return profileIds.map((profile) => ({ profile }));
}

const showcaseByProfile: Record<ProfileId, React.ComponentType> = {
  general: GeneralShowcase,
  desktop: DesktopShowcase,
  mobile: MobileShowcase,
  web: WebShowcase,
};

export default async function DesignProfilePage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const { profile } = await params;
  if (!isProfileId(profile)) notFound();

  const Showcase = showcaseByProfile[profile];
  const metadata = profiles[profile];

  return (
    <main className={styles.page} data-profile={profile}>
      <ProfileNavigation active={profile} />
      <div className={styles.detailCanvas}>
        <div className={styles.srOnly}>
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
        </div>
        <Showcase />
      </div>
    </main>
  );
}
