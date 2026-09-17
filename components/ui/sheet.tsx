"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/**
 * A side panel built on the dialog primitive. It always enters from the
 * inline-end edge, so it slides in from the correct side in both Arabic and
 * English without any extra wiring.
 */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      )}
    />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 end-0 z-50 flex h-full w-full max-w-sm flex-col",
        "border-s border-brass-500/20 bg-ink-900 shadow-luxe",
        "transition duration-500 ease-in-out",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "ltr:data-[state=open]:slide-in-from-right ltr:data-[state=closed]:slide-out-to-right",
        "rtl:data-[state=open]:slide-in-from-left rtl:data-[state=closed]:slide-out-to-left",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
