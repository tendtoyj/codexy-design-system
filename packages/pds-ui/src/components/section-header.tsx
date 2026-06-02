"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as React from "react";

const sectionHeader = tv({
  slots: {
    // not-prose: MDX/prose 컨테이너 안에서도 내부 h2 의 prose margin 영향 차단.
    root: "not-prose flex w-full items-center gap-[12px]",
    // content gap 은 size variant 에서 결정 (heading ↔ headingContent 사이 간격).
    content: "flex flex-1 items-center min-w-0",
    heading: "min-w-0 m-0 font-bold",
    headingContent: "flex items-center gap-[10px] shrink-0",
    trailingContent: "flex items-center gap-[12px] shrink-0",
  },
  variants: {
    size: {
      xs: {
        root: "text-[color:var(--pds-label-alternative)]",
        heading: "text-label1",
        content: "gap-[4px]",
      },
      sm: {
        root: "text-[color:var(--pds-label-strong)]",
        heading: "text-headline1",
        content: "gap-[6px]",
      },
      md: {
        root: "text-[color:var(--pds-label-strong)]",
        heading: "text-heading1",
        content: "gap-[6px]",
      },
      lg: {
        root: "text-[color:var(--pds-label-strong)]",
        heading: "text-title2",
        content: "gap-[8px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SectionHeaderVariants = VariantProps<typeof sectionHeader>;
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type SectionHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color"> & {
  size?: SectionHeaderVariants["size"];
  /** 시맨틱 헤딩 태그. 기본 "h2". */
  headingAs?: HeadingTag;
  /** 타이틀 우측에 붙는 슬롯 (e.g., Filter Chip, IconButton). */
  headingContent?: React.ReactNode;
  /** 우측 끝 슬롯 (e.g., TextButton, IconButton). */
  trailingContent?: React.ReactNode;
  /** 기본 색을 덮어쓴다. CSS color value 또는 `var(--pds-…)`. 자식 요소가 inherit 한다. */
  color?: string;
  children: React.ReactNode;
};

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(function SectionHeader(
  {
    size = "md",
    headingAs = "h2",
    headingContent,
    trailingContent,
    color,
    className,
    children,
    style,
    ...props
  },
  ref,
) {
  const styles = sectionHeader({ size });
  const HeadingTag = headingAs;
  return (
    <div
      ref={ref}
      data-slot="section-header"
      className={cn(styles.root(), className)}
      style={color ? { color, ...style } : style}
      {...props}
    >
      <div data-slot="section-header-content" className={styles.content()}>
        <HeadingTag data-slot="section-header-heading" className={styles.heading()}>
          {children}
        </HeadingTag>
        {headingContent ? (
          <div data-slot="section-header-heading-content" className={styles.headingContent()}>
            {headingContent}
          </div>
        ) : null}
      </div>
      {trailingContent ? (
        <div data-slot="section-header-trailing-content" className={styles.trailingContent()}>
          {trailingContent}
        </div>
      ) : null}
    </div>
  );
});

export type { SectionHeaderProps };
export { SectionHeader, sectionHeader };
