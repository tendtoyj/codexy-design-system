import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import "./global.css";

export const metadata = {
  title: "Codexy Design System",
  description: "CDS — tokens, primitives, and AI-ready components for Codexy apps.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
