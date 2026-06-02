"use client";

import { ArrowRight, Funnel, Plus } from "@fluxloop-ai/pds-icons/icons";
import { Badge } from "@fluxloop-ai/pds-ui/components/badge";
import { Chip } from "@fluxloop-ai/pds-ui/components/chip";
import { IconButton } from "@fluxloop-ai/pds-ui/components/icon-button";
import { SectionHeader } from "@fluxloop-ai/pds-ui/components/section-header";
import { TextButton } from "@fluxloop-ai/pds-ui/components/text-button";

export function SectionHeaderBasicDemo() {
  return (
    <Frame>
      <SectionHeader>최근 작업</SectionHeader>
    </Frame>
  );
}

export function SectionHeaderWithHeadingContentDemo() {
  return (
    <Frame>
      <SectionHeader headingContent={<Chip size="small">필터됨</Chip>}>최근 작업</SectionHeader>
    </Frame>
  );
}

export function SectionHeaderWithTrailingDemo() {
  return (
    <Frame>
      <SectionHeader
        trailingContent={
          <TextButton size="sm">
            전체 보기
            <ArrowRight />
          </TextButton>
        }
      >
        최근 작업
      </SectionHeader>
    </Frame>
  );
}

export function SectionHeaderFullDemo() {
  return (
    <Frame>
      <SectionHeader
        headingContent={
          <IconButton size="sm" variant="subtle" aria-label="필터">
            <Funnel />
          </IconButton>
        }
        trailingContent={
          <>
            <TextButton size="sm">전체 보기</TextButton>
            <IconButton size="sm" variant="subtle" aria-label="추가">
              <Plus />
            </IconButton>
          </>
        }
      >
        최근 작업
      </SectionHeader>
    </Frame>
  );
}

export function SectionHeaderSizesDemo() {
  return (
    <Frame>
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          size="lg"
          headingContent={
            <IconButton size="md" variant="subtle" aria-label="필터">
              <Funnel />
            </IconButton>
          }
          trailingContent={<TextButton size="md">더보기</TextButton>}
        >
          섹션 — Large
        </SectionHeader>
        <SectionHeader
          size="md"
          headingContent={
            <IconButton size="sm" variant="subtle" aria-label="필터">
              <Funnel />
            </IconButton>
          }
          trailingContent={<TextButton size="sm">더보기</TextButton>}
        >
          섹션 — Medium (default)
        </SectionHeader>
        <SectionHeader
          size="sm"
          headingContent={
            <Badge size="sm" color="neutral" neutralColor="alternative">
              12
            </Badge>
          }
          trailingContent={<TextButton size="sm">더보기</TextButton>}
        >
          섹션 — Small
        </SectionHeader>
        <SectionHeader
          size="xs"
          headingContent={
            <Badge size="xs" color="neutral" neutralColor="alternative">
              12
            </Badge>
          }
        >
          오늘
        </SectionHeader>
      </div>
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "20px 24px",
        margin: "16px 0",
        borderRadius: "var(--pds-radius-lg)",
        border: "1px solid var(--pds-line-solid-normal)",
        background: "var(--pds-background-normal-normal)",
      }}
    >
      {children}
    </div>
  );
}
