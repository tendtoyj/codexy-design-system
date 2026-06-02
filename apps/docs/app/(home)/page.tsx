import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="font-semibold text-4xl tracking-tight">Pluto Design System</h1>
      <p className="max-w-xl text-balance text-fd-muted-foreground">
        토큰 · 프리미티브 · AI 친화 컴포넌트. Pluto 데스크탑 앱의 단일 UI 소스.
      </p>
      <Link
        href="/docs"
        className="inline-flex items-center rounded-md bg-fd-primary px-4 py-2 text-fd-primary-foreground"
      >
        문서 보기 →
      </Link>
    </main>
  );
}
