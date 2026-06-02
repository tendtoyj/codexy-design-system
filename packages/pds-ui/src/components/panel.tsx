"use client";

import { cn, tv } from "@fluxloop-ai/pds-core";
import type { PhosphorIcon } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import { Icon } from "./icon";

/* ============================================================================
 * Panel — bordered cell grid
 * ============================================================================
 *
 * 외곽선·radius·디바이더만 책임지는 cell grid 박스. 셀 내부 콘텐츠는
 * 호출부 자유.
 *
 * 책임
 *   • 외곽선 1px / radius 16 / hairline 디바이더
 *   • CSS Grid columns 균등 분할 (`columns` prop)
 *   • Cell `span` (CSS Grid `grid-column: span N`)
 *   • Cell 내부 padding 20px 사방 고정
 *   • Cell 헤더 슬롯 (icon + title) — 둘 중 하나 또는 둘 다
 *
 * 비책임
 *   • 외부 섹션 타이틀 — 별도 SectionHeader 가 위에 얹힘
 *   • 셀 우상단 보조 meta — 필요해지면 children 으로 자유 조립
 *   • 셀 너비 불균등 (auto 등) — `span` 외 사용 안 함
 *   • 횡스크롤 카드 캐러셀 — 별 컴포넌트 (CardRail)
 *
 * @example
 * ```tsx
 * import { Panel, PanelCell } from "@fluxloop-ai/pds-ui/components/panel";
 * import { Translate, Globe, CalendarCheck } from "@fluxloop-ai/pds-icons/icons";
 *
 * <Panel columns={3}>
 *   <PanelCell title="언어" icon={Translate}>한국어</PanelCell>
 *   <PanelCell title="지역" icon={Globe}>Asia/Seoul</PanelCell>
 *   <PanelCell title="검증날짜" icon={CalendarCheck}>02/28/2026</PanelCell>
 * </Panel>
 *
 * // 2×3 grid (셀 6개)
 * <Panel columns={2}>
 *   <PanelCell title="에이전트">{donut}</PanelCell>
 *   <PanelCell title="Work hours">{heatmap}</PanelCell>
 *   <PanelCell title="Stats">{radar}</PanelCell>
 *   <PanelCell title="Brevity">{histogram}</PanelCell>
 *   <PanelCell title="Response Length">{scatter}</PanelCell>
 *   <PanelCell title="Reply Reflex">{bars}</PanelCell>
 * </Panel>
 *
 * // 세로 stack (columns=1) + span
 * <Panel columns={4}>
 *   <PanelCell span={2} title="요약">...</PanelCell>
 *   <PanelCell title="Avg">47</PanelCell>
 *   <PanelCell title="Median">43</PanelCell>
 * </Panel>
 * ```
 *
 * 디바이더는 grid `gap: 1px` 위로 root background (line color) 가 비치는
 * 방식으로 그려진다. 셀 수·span 변화에 무관하게 동작하며 별도 nth-child
 * 계산이 필요 없다.
 * ========================================================================== */

const panel = tv({
  slots: {
    root: [
      "grid w-full",
      "rounded-[16px] overflow-hidden",
      "border border-[color:var(--pds-line-normal-alternative)]",
      "bg-[color:var(--pds-line-normal-alternative)]",
      "gap-px",
    ],
    cell: [
      "flex flex-col gap-[8px] min-w-0",
      "bg-[color:var(--pds-background-elevated-normal)]",
      "p-[20px]",
    ],
    cellHeader: [
      "flex items-center gap-[6px]",
      "text-[13px] leading-[18px] font-medium",
      "text-[color:var(--pds-label-alternative)]",
    ],
    cellTitle: "min-w-0",
    cellBody: "min-w-0",
  },
});

interface PanelProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Cell grid 의 column 수. children 자식 셀이 columns 단위로 자동 wrap.
   * - `1` → 세로 stack
   * - `2` 이상 → 좌→우 채운 뒤 다음 줄로 wrap
   * 셀 6개 + `columns={3}` → 2×3 grid.
   */
  columns: number;
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { columns, className, style, ...rest },
  ref,
) {
  const styles = panel();
  return (
    <div
      ref={ref}
      data-pds-component="panel"
      data-pds-columns={columns}
      className={cn(styles.root(), className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...style,
      }}
      {...rest}
    />
  );
});

interface PanelCellProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * 셀이 차지할 column 수 (CSS Grid `grid-column: span N`). 기본 1.
   */
  span?: number;
  /**
   * 셀 헤더의 라벨. `icon` 과 조합 가능 — icon-only / label-only /
   * icon+label / 헤더 없음 모두 지원.
   */
  title?: string;
  /**
   * 셀 헤더 좌측 아이콘. PhosphorIcon 또는 호환 SVG 컴포넌트.
   */
  icon?: PhosphorIcon | React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
}

const PanelCell = React.forwardRef<HTMLDivElement, PanelCellProps>(function PanelCell(
  { span, title, icon, children, className, style, ...rest },
  ref,
) {
  const styles = panel();
  const hasHeader = Boolean(title || icon);
  return (
    <div
      ref={ref}
      data-pds-component="panel-cell"
      className={cn(styles.cell(), className)}
      style={{
        ...(span && span > 1 ? { gridColumn: `span ${span} / span ${span}` } : null),
        ...style,
      }}
      {...rest}
    >
      {hasHeader ? (
        <div data-slot="panel-cell-header" className={styles.cellHeader()}>
          {icon ? <Icon icon={icon} size="sm" /> : null}
          {title ? <span className={styles.cellTitle()}>{title}</span> : null}
        </div>
      ) : null}
      {children !== undefined && children !== null ? (
        <div data-slot="panel-cell-body" className={styles.cellBody()}>
          {children}
        </div>
      ) : null}
    </div>
  );
});

export type { PanelCellProps, PanelProps };
export { Panel, PanelCell, panel };
