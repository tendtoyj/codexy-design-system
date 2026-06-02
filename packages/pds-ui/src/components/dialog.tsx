"use client";

import { cn, tv, type VariantProps } from "@fluxloop-ai/pds-core";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { CloseButton } from "./internal/close-button";

const dialog = tv({
  slots: {
    overlay: [
      "fixed inset-0 z-[var(--pds-z-overlay)]",
      "bg-[var(--pds-material-dimmer)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    ],
    content: [
      "fixed z-[var(--pds-z-modal)]",
      "bg-[var(--pds-background-elevated-normal)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "shadow-[var(--pds-shadow-xl)]",
      "flex flex-col outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    ],
    navigation: [
      "flex items-start justify-between gap-[8px] shrink-0",
      "px-[20px] pt-[20px] pb-[4px]",
    ],
    title: "text-[15px] font-semibold text-[color:var(--pds-label-normal)] m-0",
    description: "text-[13px] text-[color:var(--pds-label-alternative)] m-0",
    body: "flex-1 min-h-0 overflow-auto px-[20px] py-[8px]",
    actionArea: [
      "flex items-center justify-end gap-[8px] shrink-0",
      "px-[20px] pt-[8px] pb-[20px]",
      "[&>button]:min-w-[64px]",
    ],
  },
  variants: {
    variant: {
      popup: {
        content: [
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "rounded-[16px]",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        ],
      },
      full: {
        content: ["inset-[24px] rounded-[20px]", "data-[state=open]:slide-in-from-bottom-4"],
      },
    },
    size: {
      sm: { content: "w-[320px] max-w-[calc(100vw-32px)]" },
      md: { content: "w-[400px] max-w-[calc(100vw-32px)]" },
      lg: { content: "w-[520px] max-w-[calc(100vw-32px)]" },
      xl: { content: "w-[680px] max-w-[calc(100vw-32px)]" },
    },
    resize: {
      fixed: { content: "max-h-[min(680px,calc(100vh-48px))]" },
      free: { content: "max-h-[calc(100vh-48px)]" },
    },
  },
  compoundVariants: [{ variant: "full", class: { content: "w-auto max-w-none" } }],
  defaultVariants: {
    variant: "popup",
    size: "sm",
    resize: "fixed",
  },
});

type DialogVariants = VariantProps<typeof dialog>;

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  const styles = dialog();
  return (
    <DialogPrimitive.Overlay ref={ref} className={cn(styles.overlay(), className)} {...props} />
  );
});

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  variant?: DialogVariants["variant"];
  size?: DialogVariants["size"];
  resize?: DialogVariants["resize"];
  overlayClassName?: string;
  autoFocusOnOpen?: boolean;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  {
    className,
    variant = "popup",
    size = "sm",
    resize = "fixed",
    overlayClassName,
    autoFocusOnOpen = true,
    onOpenAutoFocus,
    children,
    ...props
  },
  ref,
) {
  const styles = dialog({ variant, size, resize });
  const handleOpenAutoFocus = (event: Event) => {
    if (!autoFocusOnOpen) {
      event.preventDefault();
    }
    onOpenAutoFocus?.(event);
  };
  return (
    <DialogPortal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(styles.content(), className)}
        onOpenAutoFocus={handleOpenAutoFocus}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

const DialogNavigation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogNavigation({ className, ...props }, ref) {
    const styles = dialog();
    return <div ref={ref} className={cn(styles.navigation(), className)} {...props} />;
  },
);

const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogBody({ className, ...props }, ref) {
    const styles = dialog();
    return <div ref={ref} className={cn(styles.body(), className)} {...props} />;
  },
);

const DialogActionArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogActionArea({ className, ...props }, ref) {
    const styles = dialog();
    return <div ref={ref} className={cn(styles.actionArea(), className)} {...props} />;
  },
);

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  const styles = dialog();
  return <DialogPrimitive.Title ref={ref} className={cn(styles.title(), className)} {...props} />;
});

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  const styles = dialog();
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(styles.description(), className)}
      {...props}
    />
  );
});

type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & {
  size?: "sm" | "md" | "lg";
};

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  DialogCloseProps
>(function DialogClose({ className, asChild, size = "md", children, ...props }, ref) {
  if (asChild) {
    return (
      <DialogPrimitive.Close ref={ref} asChild {...props}>
        {children}
      </DialogPrimitive.Close>
    );
  }
  return (
    <DialogPrimitive.Close asChild {...props}>
      <CloseButton ref={ref as React.Ref<HTMLButtonElement>} size={size} className={className}>
        {children as React.ReactNode}
      </CloseButton>
    </DialogPrimitive.Close>
  );
});

export type { DialogContentProps };
export {
  Dialog,
  DialogActionArea,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogNavigation,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  dialog,
};
