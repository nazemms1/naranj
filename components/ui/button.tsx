import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap",
    "font-medium transition-all duration-500 [transition-timing-function:var(--ease-luxe)]",
    "disabled:pointer-events-none disabled:opacity-45",
    "[&_svg]:size-[1.05em] [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Solid brass — the primary call to action */
        gold: [
          "bg-gradient-to-b from-brass-300 to-brass-500 text-ink-900",
          "shadow-[0_10px_30px_-12px_rgba(200,162,90,0.65)]",
          "hover:from-brass-200 hover:to-brass-400",
          "hover:shadow-[0_16px_40px_-12px_rgba(200,162,90,0.8)]",
          "hover:-translate-y-0.5 active:translate-y-0",
        ].join(" "),
        /* Hairline brass frame that fills on hover */
        outline: [
          "border border-brass-500/45 text-brass-200 bg-transparent",
          "hover:border-brass-400 hover:text-brass-100",
          "hover:bg-brass-500/10 hover:-translate-y-0.5 active:translate-y-0",
        ].join(" "),
        ghost: "text-ivory-200/85 hover:text-brass-200 hover:bg-brass-500/8",
        /* Ivory, for use on top of photography */
        light:
          "bg-ivory-100 text-ink-900 hover:bg-white hover:-translate-y-0.5 active:translate-y-0",
        link: "text-brass-300 underline-offset-8 hover:underline hover:text-brass-200 p-0 h-auto",
      },
      size: {
        sm: "h-10 px-5 text-[0.78rem] tracking-[0.16em] uppercase rounded-full",
        md: "h-12 px-7 text-[0.82rem] tracking-[0.18em] uppercase rounded-full",
        lg: "h-14 px-9 text-[0.86rem] tracking-[0.2em] uppercase rounded-full",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Arabic is never uppercased or letter-spaced the way Latin display type is —
 * the `uppercase`/`tracking` utilities above are neutralised for RTL by the
 * `.tracking-luxe` rules in globals.css plus this guard.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          "rtl:normal-case rtl:tracking-normal",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
