"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { Buildings, GraduationCap, User } from "@fluxloop-ai/pds-icons/icons";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

const avatar = tv({
  slots: {
    root: [
      "relative inline-flex items-center justify-center overflow-hidden shrink-0",
      "bg-[var(--pds-background-normal-normal)]",
      "after:content-[''] after:absolute after:inset-0 after:rounded-[inherit]",
      "after:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-label-normal)_5%,transparent)]",
      "after:pointer-events-none",
    ],
    image: "h-full w-full rounded-[inherit]",
    fallback: [
      "flex h-full w-full items-center justify-center rounded-[inherit]",
      "bg-[var(--pds-fill-strong)] text-[color:var(--pds-static-white,_#fff)]",
    ],
  },
  variants: {
    size: {
      xs: { root: "w-[20px] h-[20px] text-[13px]" },
      sm: { root: "w-[24px] h-[24px] text-[16px]" },
      md: { root: "w-[32px] h-[32px] text-[21px]" },
      lg: { root: "w-[40px] h-[40px] text-[27px]" },
      xl: { root: "w-[48px] h-[48px] text-[32px]" },
      "2xl": { root: "w-[56px] h-[56px] text-[37px]" },
      "3xl": { root: "w-[64px] h-[64px] text-[43px]" },
      "4xl": { root: "w-[80px] h-[80px] text-[53px]" },
    },
    variant: {
      person: { root: "rounded-full", image: "object-cover" },
      company: { root: "", image: "object-contain" },
      academy: { root: "", image: "object-contain" },
    },
  },
  compoundVariants: [
    { size: "xs", variant: ["company", "academy"], class: { root: "rounded-[4px]" } },
    { size: "sm", variant: ["company", "academy"], class: { root: "rounded-[4px]" } },
    { size: "md", variant: ["company", "academy"], class: { root: "rounded-[6px]" } },
    { size: "lg", variant: ["company", "academy"], class: { root: "rounded-[8px]" } },
    { size: "xl", variant: ["company", "academy"], class: { root: "rounded-[10px]" } },
    { size: "2xl", variant: ["company", "academy"], class: { root: "rounded-[12px]" } },
    { size: "3xl", variant: ["company", "academy"], class: { root: "rounded-[14px]" } },
    { size: "4xl", variant: ["company", "academy"], class: { root: "rounded-[16px]" } },
  ],
  defaultVariants: {
    size: "md",
    variant: "person",
  },
});

type AvatarVariants = VariantProps<typeof avatar>;

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  size?: AvatarVariants["size"];
  variant?: AvatarVariants["variant"];
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
};

const fallbackIconFor = (variant: NonNullable<AvatarVariants["variant"]>) => {
  switch (variant) {
    case "person":
      return <User className="size-[0.6em]" aria-hidden="true" />;
    case "company":
      return <Buildings className="size-[0.6em]" aria-hidden="true" />;
    case "academy":
      return <GraduationCap className="size-[0.6em]" aria-hidden="true" />;
  }
};

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  function Avatar(
    { className, size = "md", variant = "person", src, alt, fallback, children, ...props },
    ref,
  ) {
    const styles = avatar({ size, variant });
    return (
      <AvatarPrimitive.Root ref={ref} className={cn(styles.root(), className)} {...props}>
        {src ? (
          <AvatarPrimitive.Image className={styles.image()} src={src} alt={alt ?? ""} />
        ) : null}
        <AvatarPrimitive.Fallback className={styles.fallback()} delayMs={src ? 300 : 0}>
          {fallback ?? fallbackIconFor(variant)}
        </AvatarPrimitive.Fallback>
        {children}
      </AvatarPrimitive.Root>
    );
  },
);

export type { AvatarProps };
export { Avatar, avatar };
