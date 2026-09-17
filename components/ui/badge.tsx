import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.68rem] font-medium tracking-[0.12em] uppercase rtl:normal-case rtl:tracking-normal",
  {
    variants: {
      variant: {
        gold: "border-brass-500/40 bg-brass-500/10 text-brass-200",
        naranj: "border-naranj-500/40 bg-naranj-500/10 text-naranj-300",
        muted: "border-stone-500/30 bg-stone-500/8 text-stone-400",
        solid: "border-transparent bg-brass-400 text-ink-900",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
