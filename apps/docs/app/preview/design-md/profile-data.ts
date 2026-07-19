export const profileIds = ["general", "desktop", "mobile", "web"] as const;

export type ProfileId = (typeof profileIds)[number];

export const profiles: Record<
  ProfileId,
  { eyebrow: string; title: string; description: string; traits: string[] }
> = {
  general: {
    eyebrow: "Platform-neutral",
    title: "General theme",
    description: "CDS의 색상, 타입, 형태와 AI 콘텐츠 톤을 플랫폼 가정 없이 보여줍니다.",
    traits: ["Calm neutral", "Content-first", "AI-native"],
  },
  desktop: {
    eyebrow: "Pointer + keyboard",
    title: "Desktop workspace",
    description: "고밀도 내비게이션, 다중 패널과 여러 AI 세션을 갖춘 작업 환경입니다.",
    traits: ["14px body", "3-panel shell", "Dense controls"],
  },
  mobile: {
    eyebrow: "Touch-first",
    title: "Mobile experience",
    description: "단일 스레드, 안전 영역과 44px 이상 터치 타깃을 중심으로 번역합니다.",
    traits: ["16px body", "Single thread", "Safe-area aware"],
  },
  web: {
    eyebrow: "Responsive browser",
    title: "Web product UI",
    description: "compact, medium, wide 구간에서 재배치되는 SaaS 제품 화면입니다.",
    traits: ["Mixed input", "Fluid layout", "Bounded content"],
  },
};

export function isProfileId(value: string): value is ProfileId {
  return profileIds.includes(value as ProfileId);
}
