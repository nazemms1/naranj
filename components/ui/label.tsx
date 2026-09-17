"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    hint?: string;
  }
>(({ className, children, hint, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "flex items-baseline gap-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-stone-400",
      "rtl:normal-case rtl:tracking-normal rtl:text-[0.8rem]",
      className,
    )}
    {...props}
  >
    {children}
    {hint ? (
      <span className="text-[0.66rem] normal-case tracking-normal text-stone-600">
        {hint}
      </span>
    ) : null}
  </LabelPrimitive.Root>
));
Label.displayName = "Label";
