"use client";

import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const chip = tv({
  slots: {
    root: [
      "inline-flex items-center justify-center align-middle shrink-0 whitespace-nowrap box-border",
      "leading-none select-none",
      "transition-[background-color,color,box-shadow] duration-[var(--cds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--cds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--cds-background-normal-normal)]",
      "data-[interactive=true]:cursor-pointer",
      "disabled:cursor-default disabled:pointer-events-none aria-disabled:pointer-events-none",
    ],
    label: "inline-flex items-center",
    leading: "inline-flex shrink-0 items-center",
    trailing: "inline-flex shrink-0 items-center",
  },
  variants: {
    size: {
      xsmall: {
        root: "rounded-[var(--cds-chip-radius-sm)] px-[var(--cds-chip-pad-x-sm)] py-[var(--cds-chip-pad-y-sm)] gap-[var(--cds-chip-gap-sm)] text-caption2 font-medium",
        label: "px-[1px]",
        leading: "[&_svg]:w-[var(--cds-chip-icon-sm)] [&_svg]:h-[var(--cds-chip-icon-sm)]",
        trailing: "[&_svg]:w-[var(--cds-chip-icon-sm)] [&_svg]:h-[var(--cds-chip-icon-sm)]",
      },
      small: {
        root: "rounded-[var(--cds-chip-radius-md)] px-[var(--cds-chip-pad-x-md)] py-[var(--cds-chip-pad-y-md)] gap-[var(--cds-chip-gap-md)] text-label2 font-medium",
        label: "px-[2px]",
        leading: "[&_svg]:w-[var(--cds-chip-icon-md)] [&_svg]:h-[var(--cds-chip-icon-md)]",
        trailing: "[&_svg]:w-[var(--cds-chip-icon-md)] [&_svg]:h-[var(--cds-chip-icon-md)]",
      },
      medium: {
        root: "rounded-[var(--cds-chip-radius-lg)] px-[var(--cds-chip-pad-x-lg)] py-[var(--cds-chip-pad-y-lg)] gap-[var(--cds-chip-gap-lg)] text-label1 font-medium",
        label: "px-[2px]",
        leading: "[&_svg]:w-[var(--cds-chip-icon-lg)] [&_svg]:h-[var(--cds-chip-icon-lg)]",
        trailing: "[&_svg]:w-[var(--cds-chip-icon-lg)] [&_svg]:h-[var(--cds-chip-icon-lg)]",
      },
      large: {
        root: "rounded-[var(--cds-chip-radius-xl)] px-[var(--cds-chip-pad-x-xl)] py-[var(--cds-chip-pad-y-xl)] gap-[var(--cds-chip-gap-xl)] text-label1 font-medium",
        label: "px-[2px]",
        leading: "[&_svg]:w-[var(--cds-chip-icon-xl)] [&_svg]:h-[var(--cds-chip-icon-xl)]",
        trailing: "[&_svg]:w-[var(--cds-chip-icon-xl)] [&_svg]:h-[var(--cds-chip-icon-xl)]",
      },
    },
    variant: {
      solid: {
        root: [
          "text-[color:var(--cds-label-normal)] bg-[var(--cds-fill-alternative)] shadow-none",
          "hover:bg-[color-mix(in_srgb,var(--cds-label-normal)_8%,var(--cds-fill-alternative))]",
          "data-[active=true]:text-[color:var(--cds-inverse-label)]",
          "data-[active=true]:bg-[var(--cds-inverse-background)]",
          "data-[active=true]:hover:bg-[color-mix(in_srgb,white_8%,var(--cds-inverse-background))]",
          "disabled:text-[color:var(--cds-label-disable)] disabled:bg-[var(--cds-interaction-disable)] disabled:shadow-none",
          "aria-disabled:text-[color:var(--cds-label-disable)] aria-disabled:bg-[var(--cds-interaction-disable)] aria-disabled:shadow-none",
        ],
      },
      outlined: {
        root: [
          "text-[color:var(--cds-label-normal)] bg-transparent",
          "shadow-[inset_0_0_0_1px_var(--cds-line-normal-neutral)]",
          "hover:bg-[var(--cds-fill-alternative)]",
          "data-[active=true]:text-[color:var(--cds-primary-normal)]",
          "data-[active=true]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--cds-primary-normal)_43%,transparent)]",
          "data-[active=true]:hover:bg-transparent",
          "disabled:text-[color:var(--cds-label-disable)] disabled:bg-transparent",
          "disabled:shadow-[inset_0_0_0_1px_var(--cds-line-normal-neutral)]",
          "aria-disabled:text-[color:var(--cds-label-disable)] aria-disabled:bg-transparent",
          "aria-disabled:shadow-[inset_0_0_0_1px_var(--cds-line-normal-neutral)]",
        ],
      },
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "solid",
  },
});

type ChipVariants = VariantProps<typeof chip>;

type ChipProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  size?: ChipVariants["size"];
  variant?: ChipVariants["variant"];
  /** 활성/선택 상태. interactive 일 때 `aria-pressed` 도 함께 연결됨. */
  active?: boolean;
  /**
   * `<button>` 으로 렌더할지 여부. true 면 onClick/disabled/aria-pressed 등 button 시멘틱 적용.
   * 기본 false → `<span>` 으로 렌더되어 trailing 에 별도 버튼(제거 등)을 안전하게 둘 수 있음.
   */
  interactive?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  asChild?: boolean;
};

const Chip = React.forwardRef<HTMLElement, ChipProps>(function Chip(
  {
    className,
    size = "medium",
    variant = "solid",
    active,
    disabled,
    interactive = false,
    leadingContent,
    trailingContent,
    asChild,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const styles = chip({ size, variant });
  const Component = (asChild ? Slot : interactive ? "button" : "span") as React.ElementType;
  const isButton = !asChild && interactive;

  const elementProps: Record<string, unknown> = {
    ...props,
    ref,
    className: cn(styles.root(), className),
    "data-active": active || undefined,
    "data-interactive": interactive || undefined,
    "aria-pressed": isButton && typeof active === "boolean" ? active : undefined,
  };
  if (isButton) {
    elementProps.type = type;
    elementProps.disabled = disabled;
  } else if (disabled) {
    elementProps["aria-disabled"] = true;
  }

  return (
    <Component {...elementProps}>
      {leadingContent ? <span className={styles.leading()}>{leadingContent}</span> : null}
      <span className={styles.label()}>{children}</span>
      {trailingContent ? <span className={styles.trailing()}>{trailingContent}</span> : null}
    </Component>
  );
});

export type { ChipProps };
export { Chip, chip };
