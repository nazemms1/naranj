import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "h-12 w-full rounded-lg border border-brass-500/20 bg-ink-850/70 px-4",
      "text-[0.95rem] text-ivory-100 placeholder:text-stone-500",
      "transition-colors duration-300 outline-none",
      "hover:border-brass-500/35",
      "focus:border-brass-400/70 focus:bg-ink-800/80",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:border-red-400/60",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-28 w-full resize-y rounded-lg border border-brass-500/20 bg-ink-850/70 px-4 py-3",
      "text-[0.95rem] leading-relaxed text-ivory-100 placeholder:text-stone-500",
      "transition-colors duration-300 outline-none",
      "hover:border-brass-500/35 focus:border-brass-400/70 focus:bg-ink-800/80",
      "aria-invalid:border-red-400/60",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
