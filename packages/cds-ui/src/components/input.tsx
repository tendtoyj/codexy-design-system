"use client";

import { cn, tv, type VariantProps } from "@tendtoyj/cds-core";
import { Check, X, XCircle as XCircleFill } from "@tendtoyj/cds-icons/icons";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as React from "react";

const input = tv({
  slots: {
    wrapper: [
      "group relative flex items-center overflow-hidden",
      "bg-[var(--cds-background-transparent-normal)]",
      "[backdrop-filter:blur(32px)]",
      "transition-[box-shadow] duration-200",
    ],
    field: [
      "flex w-full h-full items-center gap-[8px] rounded-[inherit]",
      "shadow-[inset_0_0_0_1px_var(--cds-line-normal-neutral)]",
      "group-focus-within:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--cds-focus-ring)_43%,transparent)]",
      "transition-[box-shadow] duration-200 cursor-text relative",
    ],
    leading: "flex shrink-0 items-center text-[color:var(--cds-interaction-inactive)]",
    input: [
      "flex-1 min-w-0 bg-transparent outline-none border-0 px-[4px]",
      "text-[color:var(--cds-label-normal)]",
      "placeholder:text-[color:var(--cds-label-assistive)]",
      "caret-[color:var(--cds-primary-normal)]",
      "disabled:cursor-default disabled:text-[color:var(--cds-label-alternative)]",
      "disabled:placeholder:text-[color:var(--cds-label-disable)]",
      "read-only:cursor-default",
    ],
    trailing: "flex shrink-0 items-center text-[color:var(--cds-interaction-inactive)]",
    trailingButton: "shrink-0 self-stretch",
    reset: [
      "hidden shrink-0 items-center justify-center",
      "text-[color:var(--cds-interaction-inactive)]",
      "group-focus-within:not(:has(input:placeholder-shown)):flex",
    ],
    invalidIcon: [
      "flex shrink-0 items-center justify-center",
      "text-[color:var(--cds-status-negative)]",
      "group-focus-within:hidden",
    ],
    positiveIcon: [
      "flex shrink-0 items-center justify-center",
      "text-[color:var(--cds-primary-normal)]",
      "group-focus-within:hidden",
    ],
  },
  variants: {
    size: {
      xs: {
        wrapper: "rounded-[8px]",
        field: "h-[28px] px-[8px] rounded-[8px] text-[12px]",
        leading: "[&_svg]:!w-[14px] [&_svg]:!h-[14px]",
        trailing: "[&_svg]:!w-[14px] [&_svg]:!h-[14px]",
        reset: "size-[18px] [&_svg]:w-[12px] [&_svg]:h-[12px]",
        invalidIcon: "size-[18px] [&_svg]:w-[12px] [&_svg]:h-[12px]",
        positiveIcon: "size-[18px] [&_svg]:w-[12px] [&_svg]:h-[12px]",
      },
      sm: {
        wrapper: "rounded-[10px]",
        field: "h-[32px] px-[10px] rounded-[10px] text-[13px]",
        leading: "[&_svg]:!w-[16px] [&_svg]:!h-[16px]",
        trailing: "[&_svg]:!w-[16px] [&_svg]:!h-[16px]",
        reset: "size-[20px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
        invalidIcon: "size-[20px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
        positiveIcon: "size-[20px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
      },
      md: {
        wrapper: "rounded-[12px]",
        field: "h-[36px] px-[12px] rounded-[12px] text-[14px]",
        leading: "[&_svg]:!w-[18px] [&_svg]:!h-[18px]",
        trailing: "[&_svg]:!w-[18px] [&_svg]:!h-[18px]",
        reset: "size-[22px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
        invalidIcon: "size-[22px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
        positiveIcon: "size-[22px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
      },
      lg: {
        wrapper: "rounded-[12px]",
        field: "h-[44px] px-[14px] rounded-[12px] text-[14px]",
        leading: "[&_svg]:!w-[18px] [&_svg]:!h-[18px]",
        trailing: "[&_svg]:!w-[18px] [&_svg]:!h-[18px]",
        reset: "size-[22px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
        invalidIcon: "size-[22px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
        positiveIcon: "size-[22px] [&_svg]:w-[16px] [&_svg]:h-[16px]",
      },
    },
    invalid: {
      true: {
        field: [
          "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--cds-status-negative)_28%,transparent)]",
          "group-focus-within:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--cds-status-negative)_43%,transparent)]",
        ],
      },
      false: {},
    },
    disabled: {
      true: {
        wrapper: "bg-[var(--cds-fill-alternative)] [backdrop-filter:none]",
        field: [
          "shadow-[inset_0_0_0_1px_var(--cds-line-normal-alternative)]",
          "group-focus-within:shadow-[inset_0_0_0_1px_var(--cds-line-normal-alternative)]",
          "cursor-default",
        ],
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "sm",
    invalid: false,
    disabled: false,
  },
});

type InputVariants = VariantProps<typeof input>;

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: InputVariants["size"];
  invalid?: boolean;
  positive?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  trailingButton?: React.ReactNode;
  width?: React.CSSProperties["width"];
  onReset?: (prev: string) => void;
  wrapperClassName?: string;
  wrapperRef?: React.Ref<HTMLDivElement>;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    wrapperClassName,
    wrapperRef,
    size = "sm",
    invalid = false,
    positive = false,
    disabled = false,
    readOnly,
    leadingContent,
    trailingContent,
    trailingButton,
    width,
    style,
    onReset,
    onChange,
    type = "text",
    ...props
  },
  ref,
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(inputRef, ref);
  const styles = input({ size, invalid, disabled });

  const handleReset = () => {
    const el = inputRef.current;
    if (!el) return;
    const prev = el.value;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    setter?.call(el, "");
    el.dispatchEvent(new Event("input", { bubbles: true }));
    onReset?.(prev);
    el.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(styles.wrapper(), wrapperClassName)}
      style={{ width, ...style }}
    >
      <div className={styles.field()}>
        {leadingContent ? <div className={styles.leading()}>{leadingContent}</div> : null}
        <input
          ref={composedRef}
          type={type}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          onChange={onChange}
          className={cn(styles.input(), className)}
          {...props}
        />
        {invalid ? (
          <span className={styles.invalidIcon()} aria-hidden="true">
            <X />
          </span>
        ) : positive ? (
          <span className={styles.positiveIcon()} aria-hidden="true">
            <Check />
          </span>
        ) : null}
        {!readOnly && !disabled ? (
          <button
            type="button"
            onPointerDown={(e) => e.preventDefault()}
            onClick={handleReset}
            tabIndex={-1}
            aria-label="초기화"
            className={cn(styles.reset(), "group-focus-within:flex peer-placeholder-shown:hidden")}
          >
            <XCircleFill weight="fill" />
          </button>
        ) : null}
        {trailingContent ? <div className={styles.trailing()}>{trailingContent}</div> : null}
      </div>
      {trailingButton ? <div className={styles.trailingButton()}>{trailingButton}</div> : null}
    </div>
  );
});

export type { InputProps };
export { Input, input };
