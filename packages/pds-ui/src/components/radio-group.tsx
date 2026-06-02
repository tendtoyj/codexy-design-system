"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

const radio = tv({
  slots: {
    group: "",
    item: [
      "group/radio relative inline-flex shrink-0 items-center justify-center",
      "rounded-full bg-transparent cursor-pointer",
      "disabled:cursor-default disabled:pointer-events-none disabled:opacity-[0.43]",
    ],
    ring: [
      "relative flex h-full w-full items-center justify-center rounded-full",
      "bg-[var(--pds-background-elevated-normal)]",
      "shadow-[inset_0_0_0_1.5px_var(--pds-line-normal-normal)]",
      "transition-[background-color,box-shadow]",
      "duration-[var(--pds-duration-fast)]",
      "group-data-[state=checked]/radio:bg-[var(--pds-primary-normal)]",
      "group-data-[state=checked]/radio:shadow-none",
      "group-aria-invalid/radio:shadow-[inset_0_0_0_1.5px_var(--pds-status-negative)]",
    ],
    dot: "block rounded-full bg-[var(--pds-color-common-100)]",
  },
  variants: {
    size: {
      sm: {
        item: "w-[16px] h-[16px]",
        dot: "w-[5px] h-[5px]",
      },
      md: {
        item: "w-[20px] h-[20px]",
        dot: "w-[6px] h-[6px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RadioVariants = VariantProps<typeof radio>;
type RadioSize = NonNullable<RadioVariants["size"]>;

const SizeContext = React.createContext<RadioSize>("md");
const useRadioSize = () => React.useContext(SizeContext);

const RADIO_CSS = `
[data-pds-radio] {
  border: 0;
  outline: none;
}
[data-pds-radio][data-pds-radio-size="sm"] { padding: 1px; }
[data-pds-radio][data-pds-radio-size="md"] { padding: 2px; }
[data-pds-radio]::before {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  background-color: transparent;
  pointer-events: none;
  transition: background-color var(--pds-duration-fast) var(--pds-ease-standard);
}
[data-pds-radio]:not(:disabled):hover::before {
  background-color: var(--pds-fill-normal);
}
[data-pds-radio]:not(:disabled):active::before {
  background-color: var(--pds-fill-strong);
}
[data-pds-radio]:disabled::before {
  display: none;
}
[data-pds-radio]:focus-visible > [data-pds-radio-ring] {
  outline: 2px solid var(--pds-focus-ring);
  outline-offset: 2px;
}
`;

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  size?: RadioSize;
};

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(function RadioGroup({ className, size = "md", ...props }, ref) {
  return (
    <SizeContext.Provider value={size}>
      <RadioGroupPrimitive.Root ref={ref} className={cn(className)} {...props} />
    </SizeContext.Provider>
  );
});

type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  size?: RadioSize;
};

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(function RadioGroupItem({ className, size: sizeProp, ...props }, ref) {
  const ctxSize = useRadioSize();
  const size = sizeProp ?? ctxSize;
  const styles = radio({ size });
  return (
    <>
      <style>{RADIO_CSS}</style>
      <RadioGroupPrimitive.Item
        ref={ref}
        data-pds-radio=""
        data-pds-radio-size={size}
        className={cn(styles.item(), className)}
        {...props}
      >
        <span data-pds-radio-ring="" className={styles.ring()}>
          <RadioGroupPrimitive.Indicator className={styles.dot()} />
        </span>
      </RadioGroupPrimitive.Item>
    </>
  );
});

export type { RadioGroupItemProps, RadioGroupProps };
export { RadioGroup, RadioGroupItem, radio };
