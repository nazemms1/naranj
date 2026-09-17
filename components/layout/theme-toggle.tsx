"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A two-state switch rather than a cycling icon button: both options stay
 * visible, so the control reads at a glance in either theme. It renders a
 * neutral shell until mounted, since the resolved theme is only known on the
 * client and a mismatch would flash.
 */
export function ThemeToggle({
  className,
  label,
  labels,
}: {
  className?: string;
  label: string;
  labels: { light: string; dark: string };
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "relative flex h-10 items-center gap-0.5 rounded-full border border-brass-500/25 p-1",
        className,
      )}
    >
      {(["dark", "light"] as const).map((value) => {
        const active = mounted && (value === "light") === isLight;
        const Icon = value === "light" ? Sun : Moon;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={active}
            aria-label={labels[value]}
            title={labels[value]}
            className={cn(
              "relative grid size-8 place-items-center rounded-full transition-colors duration-500",
              active ? "text-ink-950" : "text-stone-400 hover:text-brass-400",
            )}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-brass-300 to-brass-500"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <Icon className="relative size-3.5" />
          </button>
        );
      })}
    </div>
  );
}
