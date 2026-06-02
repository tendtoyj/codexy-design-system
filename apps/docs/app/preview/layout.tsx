import type { ReactNode } from "react";

/**
 * /preview/* 라우트는 docs chrome(사이드바, 네비) 없이
 * 컴포넌트 자체만 viewport 전체에 띄우는 전용 레이아웃.
 */
export default function PreviewLayout({ children }: { children: ReactNode }) {
  return <div className="h-screen w-screen overflow-hidden">{children}</div>;
}
