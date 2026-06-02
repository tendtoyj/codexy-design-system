"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

type FormFieldContextValue = {
  baseId: string;
  labelId: string;
  fieldId: string;
  descriptionId: string;
  errorId: string;
  hasError: boolean;
  hasDescription: boolean;
  setHasError: (v: boolean) => void;
  setHasDescription: (v: boolean) => void;
  orientation: "vertical" | "inline";
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);
const useFormFieldContext = (caller: string): FormFieldContextValue => {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) {
    throw new Error(`<${caller}> must be used inside <FormField>.`);
  }
  return ctx;
};

const form = tv({
  slots: {
    field: "not-prose leading-[1.4]",
    label: [
      "inline-flex items-center gap-[4px] select-none",
      "text-[13px] font-medium text-[color:var(--pds-label-normal)]",
    ],
    description: "text-[12px] text-[color:var(--pds-label-alternative)]",
    error: ["text-[12px] text-[color:var(--pds-status-negative)]", "flex items-center gap-[4px]"],
    required: "text-[color:var(--pds-status-negative)]",
  },
  variants: {
    size: {
      sm: {
        label: "text-[12px]",
        description: "text-[11px]",
        error: "text-[11px]",
      },
      md: {},
    },
    orientation: {
      vertical: {
        field: "flex flex-col gap-[6px]",
        description: "pl-[4px]",
        error: "pl-[4px]",
      },
      inline: {
        field: "grid grid-cols-[auto_1fr] gap-x-[8px] gap-y-[6px] items-center",
        description: "[grid-column:2]",
        error: "[grid-column:2]",
      },
    },
  },
  defaultVariants: { size: "md", orientation: "vertical" },
});

type FormVariants = VariantProps<typeof form>;

type FormFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  size?: FormVariants["size"];
  orientation?: FormVariants["orientation"];
};

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { className, name, size = "md", orientation = "vertical", children, ...props },
  ref,
) {
  const reactId = React.useId();
  const baseId = name ?? reactId;
  const [hasError, setHasError] = React.useState(false);
  const [hasDescription, setHasDescription] = React.useState(false);
  const value = React.useMemo<FormFieldContextValue>(
    () => ({
      baseId,
      labelId: `${baseId}-label`,
      fieldId: `${baseId}-field`,
      descriptionId: `${baseId}-description`,
      errorId: `${baseId}-error`,
      hasError,
      hasDescription,
      setHasError,
      setHasDescription,
      orientation: orientation ?? "vertical",
    }),
    [baseId, hasError, hasDescription, orientation],
  );
  const styles = form({ size, orientation });
  return (
    <FormFieldContext.Provider value={value}>
      <div ref={ref} className={cn(styles.field(), className)} {...props}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
});

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  size?: FormVariants["size"];
};

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(function FormLabel(
  { className, required, size = "md", children, ...props },
  ref,
) {
  const ctx = useFormFieldContext("FormLabel");
  const styles = form({ size, orientation: ctx.orientation });
  return (
    <label
      ref={ref}
      id={ctx.labelId}
      htmlFor={ctx.fieldId}
      className={cn(styles.label(), className)}
      {...props}
    >
      {children}
      {required ? (
        <span className={styles.required()} aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
});

type FormControlProps = {
  children: React.ReactElement;
};

const FormControl = React.forwardRef<HTMLElement, FormControlProps>(function FormControl(
  { children },
  ref,
) {
  const ctx = useFormFieldContext("FormControl");
  const describedBy = [
    ctx.hasDescription ? ctx.descriptionId : null,
    ctx.hasError ? ctx.errorId : null,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Slot
      ref={ref}
      id={ctx.fieldId}
      aria-labelledby={ctx.labelId}
      aria-describedby={describedBy || undefined}
      aria-invalid={ctx.hasError || undefined}
    >
      {children}
    </Slot>
  );
});

type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: FormVariants["size"];
};

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  function FormDescription({ className, size = "md", children, ...props }, ref) {
    const ctx = useFormFieldContext("FormDescription");
    React.useEffect(() => {
      ctx.setHasDescription(true);
      return () => ctx.setHasDescription(false);
    }, [ctx]);
    const styles = form({ size, orientation: ctx.orientation });
    return (
      <p
        ref={ref}
        id={ctx.descriptionId}
        className={cn(styles.description(), className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

type FormErrorMessageProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: FormVariants["size"];
};

const FormErrorMessage = React.forwardRef<HTMLParagraphElement, FormErrorMessageProps>(
  function FormErrorMessage({ className, size = "md", children, ...props }, ref) {
    const ctx = useFormFieldContext("FormErrorMessage");
    const visible = children != null && children !== false && children !== "";
    React.useEffect(() => {
      ctx.setHasError(Boolean(visible));
      return () => ctx.setHasError(false);
    }, [ctx, visible]);
    if (!visible) return null;
    const styles = form({ size, orientation: ctx.orientation });
    return (
      <p
        ref={ref}
        id={ctx.errorId}
        role="alert"
        className={cn(styles.error(), className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

export type { FormDescriptionProps, FormErrorMessageProps, FormFieldProps, FormLabelProps };
export { FormControl, FormDescription, FormErrorMessage, FormField, FormLabel, form };
