"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as React from "react";

const ACCENT_FOREGROUND_VARS = {
  red: "accent-foreground-red",
  "red-orange": "accent-foreground-red-orange",
  orange: "accent-foreground-orange",
  lime: "accent-foreground-lime",
  green: "accent-foreground-green",
  cyan: "accent-foreground-cyan",
  "light-blue": "accent-foreground-light-blue",
  blue: "accent-foreground-blue",
  violet: "accent-foreground-violet",
  purple: "accent-foreground-purple",
  pink: "accent-foreground-pink",
  positive: "status-positive",
  cautionary: "status-cautionary",
  negative: "status-negative",
} as const;

const NEUTRAL_LABEL_VARS = {
  normal: "label-normal",
  strong: "label-strong",
  neutral: "label-neutral",
  alternative: "label-alternative",
  assistive: "label-assistive",
  disable: "label-disable",
} as const;

type AccentColorToken = keyof typeof ACCENT_FOREGROUND_VARS;
type NeutralColorToken = keyof typeof NEUTRAL_LABEL_VARS;

const badge = tv({
  slots: {
    root: [
      "inline-flex items-center justify-center w-fit h-fit shrink-0 whitespace-nowrap",
      "font-medium select-none",
      "text-[color:var(--pds-badge-color)]",
    ],
    leading: "inline-flex shrink-0 items-center",
    trailing: "inline-flex shrink-0 items-center",
  },
  variants: {
    size: {
      xs: {
        root: "rounded-[8px] px-[6px] py-[3px] gap-[2px] text-[11px] leading-[14px]",
        leading: "[&_svg]:w-[12px] [&_svg]:h-[12px]",
        trailing: "[&_svg]:w-[12px] [&_svg]:h-[12px]",
      },
      sm: {
        root: "rounded-[8px] px-[6px] py-[4px] gap-[4px] text-[12px] leading-[16px]",
        leading: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
        trailing: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
      },
      md: {
        root: "rounded-[10px] px-[8px] py-[5px] gap-[4px] text-[13px] leading-[18px]",
        leading: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
        trailing: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
      },
    },
    variant: {
      solid: {},
      outlined: {
        root: "bg-[var(--pds-background-normal-normal)]",
      },
    },
    color: {
      neutral: {},
      accent: {},
    },
  },
  compoundVariants: [
    // solid: bg = badge-color @ 8% (neutral 만 fill.normal)
    {
      variant: "solid",
      color: "accent",
      class: {
        root: "bg-[color:color-mix(in_srgb,var(--pds-badge-color)_8%,transparent)]",
      },
    },
    {
      variant: "solid",
      color: "neutral",
      class: {
        root: "bg-[var(--pds-fill-normal)]",
      },
    },
    // outlined: border = badge-color @ 43% (neutral 만 line.normal.normal)
    {
      variant: "outlined",
      color: "accent",
      class: {
        root: "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-badge-color)_43%,transparent)]",
      },
    },
    {
      variant: "outlined",
      color: "neutral",
      class: {
        root: "shadow-[inset_0_0_0_1px_var(--pds-line-normal-normal)]",
      },
    },
  ],
  defaultVariants: {
    size: "xs",
    variant: "solid",
    color: "accent",
  },
});

type BadgeVariants = VariantProps<typeof badge>;

type BadgeProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> & {
  size?: BadgeVariants["size"];
  variant?: BadgeVariants["variant"];
  color?: BadgeVariants["color"];
  /** color=accent 일 때 사용할 foreground 토큰 (기본 cyan). */
  accentColor?: AccentColorToken;
  /** color=neutral 일 때 사용할 label 토큰 (기본 alternative). */
  neutralColor?: NeutralColorToken;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className,
    size = "xs",
    variant = "solid",
    color = "accent",
    accentColor = "cyan",
    neutralColor = "alternative",
    leadingContent,
    trailingContent,
    children,
    style,
    ...props
  },
  ref,
) {
  const tokenSuffix =
    color === "neutral" ? NEUTRAL_LABEL_VARS[neutralColor] : ACCENT_FOREGROUND_VARS[accentColor];
  const cssVars = {
    ["--pds-badge-color" as string]: `var(--pds-${tokenSuffix})`,
    ...style,
  } as React.CSSProperties;
  const styles = badge({ size, variant, color });
  return (
    <span ref={ref} className={cn(styles.root(), className)} style={cssVars} {...props}>
      {leadingContent ? <span className={styles.leading()}>{leadingContent}</span> : null}
      {children}
      {trailingContent ? <span className={styles.trailing()}>{trailingContent}</span> : null}
    </span>
  );
});

export type { AccentColorToken, BadgeProps, NeutralColorToken };
export { Badge, badge };
